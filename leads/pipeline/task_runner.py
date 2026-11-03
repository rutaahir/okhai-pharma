import os
import io
import time
import logging
from concurrent.futures import ThreadPoolExecutor
from django.db import transaction, close_old_connections
from django.core.files.base import ContentFile
from PIL import Image

from leads.models import Lead, LeadFile, LeadVoiceNote, ExtractedContact, LeadProcessingJob, LeadAuditLog
from .ingestion import validate_magic_bytes, normalize_image, rasterize_pdf_pages
from .qr_detector import detect_qr_codes
from .ocr_engine import extract_text_from_image
from .vision_fallback import run_vision_llm_fallback
from .parser import parse_card_text
from .audio_processor import process_voice_note
from .merger import merge_and_save_contacts

logger = logging.getLogger(__name__)

# Dedicated thread pool for async lead extraction (max 2 concurrent pipelines to respect SQLite concurrency)
PIPELINE_EXECUTOR = ThreadPoolExecutor(max_workers=2, thread_name_prefix="LeadPipelineWorker")

def update_job_progress(job: LeadProcessingJob, step: str, progress: int, status: str = 'RUNNING'):
    """Atomically updates job progress percent and status message."""
    try:
        job.current_step = step
        job.progress_percent = progress
        job.status = status
        job.save(update_fields=['current_step', 'progress_percent', 'status', 'updated_at'])
    except Exception as e:
        logger.warning(f"Could not update job progress: {e}")

def execute_lead_pipeline_task(lead_id: str, is_reprocess: bool = False):
    """
    Background worker thread function.
    Safely executes ingestion -> QR detection -> OCR -> NLP parsing -> voice notes -> merge.
    Handles retries and DB connection management for SQLite concurrency.
    """
    close_old_connections()
    try:
        lead = Lead.objects.get(id=lead_id)
    except Lead.DoesNotExist:
        return

    job, _ = LeadProcessingJob.objects.get_or_create(lead=lead)
    job.attempts += 1
    job.save(update_fields=['attempts', 'updated_at'])

    update_job_progress(job, "Initializing extraction pipeline", 5)

    lead.status = 'PROCESSING'
    lead.save(update_fields=['status', 'updated_at'])

    extracted_candidates = []

    try:
        files = list(lead.files.all())
        voice_notes = list(lead.voice_notes.all())
        total_items = max(1, len(files) + len(voice_notes))

        # =====================================================================
        # Step 1: Process Files (Cards, Brochures, PDFs, QR Images)
        # =====================================================================
        for f_idx, lead_file in enumerate(files):
            step_progress = int(10 + (f_idx / total_items) * 60)
            update_job_progress(
                job,
                f"Analyzing file {f_idx + 1}/{len(files)}: {lead_file.original_filename}",
                step_progress
            )

            lead_file.processing_status = 'PROCESSING'
            lead_file.save(update_fields=['processing_status'])

            try:
                if not lead_file.file or not os.path.exists(lead_file.file.path):
                    lead_file.processing_status = 'FAILED'
                    lead_file.error_message = "File does not exist on disk"
                    lead_file.save(update_fields=['processing_status', 'error_message'])
                    continue

                with open(lead_file.file.path, 'rb') as f:
                    file_bytes = f.read()

                # Validate magic bytes
                mime = validate_magic_bytes(file_bytes, lead_file.original_filename)
                lead_file.mime_type = mime

                # Determine if PDF or Image
                is_pdf = mime in ('application/pdf', 'application/x-pdf') or lead_file.original_filename.lower().endswith('.pdf')

                if is_pdf:
                    lead_file.kind = 'PDF'
                    # Rasterize PDF pages at 300 DPI
                    pages = rasterize_pdf_pages(file_bytes, dpi=300)
                    lead_file.page_count = len(pages)
                    lead_file.save(update_fields=['kind', 'page_count', 'mime_type'])

                    pdf_texts = []
                    for page_num, (page_img, native_txt) in enumerate(pages):
                        # 1. QR Detection on page
                        qrs = detect_qr_codes(page_img)
                        for q in qrs:
                            q['source_file'] = lead_file
                            extracted_candidates.append(q)

                        # 2. OCR on page
                        ocr_txt, boxes, conf, engine, preproc_img = extract_text_from_image(page_img)
                        full_txt = f"{native_txt}\n{ocr_txt}".strip()
                        if full_txt:
                            pdf_texts.append(full_txt)
                            parsed = parse_card_text(full_txt, base_ocr_confidence=max(conf, 0.85))
                            parsed['source_file'] = lead_file
                            parsed['bounding_boxes'] = boxes
                            extracted_candidates.append(parsed)

                        # Save first page preprocessed preview
                        if page_num == 0:
                            thumb_io = io.BytesIO()
                            preproc_img.save(thumb_io, format='JPEG', quality=85)
                            lead_file.preprocessed_image.save(
                                f"pdf_thumb_{lead_file.id}.jpg",
                                ContentFile(thumb_io.getvalue()),
                                save=False
                            )

                    lead_file.raw_ocr_text = "\n\n--- Page Break ---\n\n".join(pdf_texts)
                    lead_file.ocr_engine = 'PyMuPDF + RapidOCR'
                    lead_file.processing_status = 'DONE'
                    lead_file.save(update_fields=['raw_ocr_text', 'ocr_engine', 'processing_status', 'preprocessed_image'])

                else:
                    # Single Image (Card, Brochure, QR)
                    norm_img = normalize_image(file_bytes)

                    # 1. QR Detection (Run First)
                    qrs = detect_qr_codes(norm_img)
                    has_qr = len(qrs) > 0
                    for q in qrs:
                        q['source_file'] = lead_file
                        extracted_candidates.append(q)

                    # 2. OCR Extraction
                    ocr_txt, boxes, ocr_conf, engine, preproc_img = extract_text_from_image(norm_img)

                    # Save preprocessed thumbnail
                    thumb_io = io.BytesIO()
                    preproc_img.save(thumb_io, format='JPEG', quality=85)
                    lead_file.preprocessed_image.save(
                        f"img_prep_{lead_file.id}.jpg",
                        ContentFile(thumb_io.getvalue()),
                        save=False
                    )

                    lead_file.raw_ocr_text = ocr_txt
                    lead_file.ocr_engine = engine

                    # Classify Kind
                    if has_qr and not ocr_txt:
                        lead_file.kind = 'QR'
                    elif len(ocr_txt.splitlines()) > 15:
                        lead_file.kind = 'BROCHURE'
                    else:
                        lead_file.kind = 'CARD'

                    # Rule-based NLP parsing
                    parsed = parse_card_text(ocr_txt, base_ocr_confidence=ocr_conf)
                    parsed['source_file'] = lead_file
                    parsed['bounding_boxes'] = boxes

                    # Optional Vision LLM fallback for low confidence images (< 0.75) if key available
                    if parsed['overall_confidence'] < 0.75:
                        vision_result = run_vision_llm_fallback(norm_img)
                        if vision_result:
                            # Merge vision results
                            if vision_result.get('name') and not parsed.get('name'):
                                parsed['name'] = vision_result['name']
                            if vision_result.get('company') and not parsed.get('company'):
                                parsed['company'] = vision_result['company']
                            if vision_result.get('phones'):
                                for p in vision_result['phones']:
                                    parsed['phones'].append({'raw': p, 'e164': p, 'type': 'mobile', 'source': 'vision_llm'})
                            if vision_result.get('address_raw') and not parsed.get('address_raw'):
                                parsed['address_raw'] = vision_result['address_raw']
                            parsed['overall_confidence'] = max(parsed['overall_confidence'], 0.90)
                            lead_file.ocr_engine = f"{engine} + Vision LLM Fallback"

                    extracted_candidates.append(parsed)
                    lead_file.processing_status = 'DONE'
                    lead_file.save(update_fields=['kind', 'raw_ocr_text', 'ocr_engine', 'processing_status', 'preprocessed_image'])

            except Exception as file_err:
                logger.exception(f"Error processing lead file {lead_file.id}: {file_err}")
                lead_file.processing_status = 'FAILED'
                lead_file.error_message = str(file_err)
                lead_file.save(update_fields=['processing_status', 'error_message'])

        # =====================================================================
        # Step 2: Process Voice Notes
        # =====================================================================
        for v_idx, voice_note in enumerate(voice_notes):
            update_job_progress(
                job,
                f"Transcribing voice note {v_idx + 1}/{len(voice_notes)}",
                75 + int((v_idx / max(1, len(voice_notes))) * 15)
            )
            try:
                if voice_note.audio_file and os.path.exists(voice_note.audio_file.path):
                    res = process_voice_note(voice_note.audio_file.path)
                    voice_note.duration_seconds = res['duration_seconds']
                    voice_note.transcript = res['transcript']
                    voice_note.transcript_language = res['transcript_language']
                    voice_note.transcription_status = res['transcription_status']
                    voice_note.save(update_fields=[
                        'duration_seconds', 'transcript', 'transcript_language',
                        'transcription_status'
                    ])

                    # If transcript has contact mentions
                    if res.get('extracted_contact'):
                        c = res['extracted_contact']
                        c['source_file'] = None
                        extracted_candidates.append(c)
            except Exception as voice_err:
                logger.exception(f"Error processing voice note {voice_note.id}: {voice_err}")
                voice_note.transcription_status = 'FAILED'
                voice_note.save(update_fields=['transcription_status'])

        # =====================================================================
        # Step 3: Consolidate and Merge
        # =====================================================================
        update_job_progress(job, "Consolidating and deduplicating contacts", 92)
        saved_contacts = merge_and_save_contacts(
            lead=lead,
            extracted_items=extracted_candidates,
            audit_actor='pipeline_worker' if not is_reprocess else 'admin_reprocess'
        )

        update_job_progress(job, "Extraction completed successfully", 100, status='COMPLETED')

    except Exception as pipeline_err:
        logger.exception(f"Pipeline error for lead {lead.id}: {pipeline_err}")
        job.error_message = str(pipeline_err)
        job.status = 'FAILED'
        job.current_step = f"Pipeline failed: {str(pipeline_err)[:100]}"
        job.save(update_fields=['error_message', 'status', 'current_step', 'updated_at'])
        lead.status = 'FAILED'
        lead.save(update_fields=['status', 'updated_at'])

    finally:
        close_old_connections()

def dispatch_lead_pipeline_async(lead_id: str, is_reprocess: bool = False):
    """Enqueues lead for background execution via ThreadPoolExecutor."""
    PIPELINE_EXECUTOR.submit(execute_lead_pipeline_task, lead_id, is_reprocess)

