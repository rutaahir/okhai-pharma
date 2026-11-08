import os
import io
import time
import logging
from concurrent.futures import ThreadPoolExecutor
from django.db import transaction, close_old_connections
from django.core.files.base import ContentFile
from PIL import Image

from leads.models import Lead, LeadFile, LeadVoiceNote, ExtractedContact, LeadProcessingJob, LeadAuditLog
from .ingestion import validate_magic_bytes, rasterize_pdf_pages
from .image_preprocessor import (
    normalize_image,
    evaluate_quality_gate,
    detect_card_quads,
    scan_all_qrs,
    pil_to_cv2,
    cv2_to_pil,
)
from .ocr_engine import extract_text_from_image
from .vision_extractor import VisionExtractor
from .parser import parse_card_text
from .audio_processor import process_voice_note
from .merger import merge_and_save_contacts

logger = logging.getLogger(__name__)

# Dedicated thread pool for async lead extraction (max 2 concurrent pipelines)
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
    Background worker thread executing the camera-robust pipeline:
    1. EXIF normalization & Quality gate
    2. Card detection & Quadrilateral perspective crop
    3. Multiscale QR detection
    4. Dual engine: Vision LLM primary + Local RapidOCR parallel cross-check
    5. Reconciliation & Post-validation
    6. Audio voice notes transcription & extraction
    7. Truthful consolidation (SUCCEEDED / PARTIAL / FAILED)
    """
    close_old_connections()
    try:
        lead = Lead.objects.get(id=lead_id)
    except Lead.DoesNotExist:
        return

    job, _ = LeadProcessingJob.objects.get_or_create(lead=lead)
    job.attempts += 1
    job.save(update_fields=['attempts', 'updated_at'])

    update_job_progress(job, "Initializing extraction pipeline", 5, status='RUNNING')
    lead.status = 'PROCESSING'
    lead.save(update_fields=['status', 'updated_at'])

    extracted_candidates = []
    vision_extractor = VisionExtractor()

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
                f"Analyzing document {f_idx + 1}/{len(files)}: {lead_file.original_filename}",
                step_progress,
                status='RUNNING'
            )

            lead_file.processing_status = 'PROCESSING'
            lead_file.save(update_fields=['processing_status'])

            try:
                if not lead_file.file or not os.path.exists(lead_file.file.path):
                    lead_file.processing_status = 'FAILED'
                    lead_file.error_code = 'FILE_NOT_FOUND'
                    lead_file.error_message = "File does not exist on disk"
                    lead_file.save(update_fields=['processing_status', 'error_code', 'error_message'])
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
                    pages = rasterize_pdf_pages(file_bytes, dpi=300)
                    lead_file.page_count = len(pages)
                    lead_file.save(update_fields=['kind', 'page_count', 'mime_type'])

                    pdf_texts = []
                    for page_num, (page_img, native_txt) in enumerate(pages):
                        # 1. QR Scan
                        page_cv = pil_to_cv2(page_img)
                        qrs = scan_all_qrs(page_cv)
                        for q in qrs:
                            extracted_candidates.append({
                                'source_file': lead_file,
                                'source_type': 'QR',
                                'notes': f"QR Code: {q.get('text', '')}"
                            })

                        # 2. Local OCR
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
                    # Single Image (Camera Card Photo, Brochure, QR)
                    # 1. Normalize
                    update_job_progress(job, "Correcting orientation and lighting...", step_progress + 5)
                    norm_pil = normalize_image(file_bytes)
                    cv_img = pil_to_cv2(norm_pil)

                    # 2. Quality Gate
                    quality_res = evaluate_quality_gate(cv_img)
                    if quality_res['warnings']:
                        lead_file.error_message = "; ".join(quality_res['warnings'])

                    # 3. Card Detection & Perspective Quadrilateral Crop
                    update_job_progress(job, "Detecting business card boundaries...", step_progress + 10)
                    card_crops = detect_card_quads(cv_img)

                    # 4. QR Scan on full image and crops
                    qrs = scan_all_qrs(cv_img)
                    for q in qrs:
                        extracted_candidates.append({
                            'source_file': lead_file,
                            'source_type': 'QR',
                            'notes': f"QR Code: {q.get('text', '')}"
                        })

                    # Process each detected card crop (or full image if no crop found)
                    for crop_idx, card_info in enumerate(card_crops):
                        crop_cv = card_info['crop']
                        crop_pil = cv2_to_pil(crop_cv)

                        # Save cropped card preview as the primary preprocessed image
                        if crop_idx == 0:
                            thumb_io = io.BytesIO()
                            crop_pil.save(thumb_io, format='JPEG', quality=85)
                            lead_file.preprocessed_image.save(
                                f"card_crop_{lead_file.id}.jpg",
                                ContentFile(thumb_io.getvalue()),
                                save=False
                            )

                        # 5. Parallel Local OCR
                        update_job_progress(job, "Reading card text and cross-verifying...", step_progress + 15)
                        ocr_txt, boxes, ocr_conf, engine, _ = extract_text_from_image(crop_pil)
                        ocr_lines = [l.strip() for l in ocr_txt.splitlines() if l.strip()]

                        # 6. Primary Reader: Vision LLM with Local OCR Reconciliation
                        reconciled = vision_extractor.extract_and_reconcile(
                            pil_image=crop_pil,
                            ocr_lines=ocr_lines,
                            image_sha256=lead_file.sha256
                        )

                        if reconciled:
                            for rec_c in reconciled:
                                rec_c['source_file'] = lead_file
                                rec_c['bounding_boxes'] = boxes
                                extracted_candidates.append(rec_c)
                            lead_file.ocr_engine = f"Gemini Vision + {engine} Cross-Check"
                        else:
                            # Rule-based fallback if Vision LLM unavailable
                            parsed = parse_card_text(ocr_txt, base_ocr_confidence=ocr_conf)
                            parsed['source_file'] = lead_file
                            parsed['bounding_boxes'] = boxes
                            extracted_candidates.append(parsed)
                            lead_file.ocr_engine = engine

                        lead_file.raw_ocr_text = ocr_txt

                    lead_file.kind = 'CARD' if len(card_crops) > 0 else 'OTHER'
                    lead_file.processing_status = 'DONE'
                    lead_file.save(update_fields=['kind', 'raw_ocr_text', 'ocr_engine', 'processing_status', 'preprocessed_image', 'error_message'])

            except Exception as file_err:
                logger.exception(f"Error processing lead file {lead_file.id}: {file_err}")
                lead_file.processing_status = 'FAILED'
                lead_file.error_code = 'PROCESSING_EXCEPTION'
                lead_file.error_message = str(file_err)
                lead_file.save(update_fields=['processing_status', 'error_code', 'error_message'])

        # =====================================================================
        # Step 2: Process Voice Notes
        # =====================================================================
        for v_idx, voice_note in enumerate(voice_notes):
            update_job_progress(
                job,
                f"Transcribing voice briefing {v_idx + 1}/{len(voice_notes)}...",
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

                    if res.get('extracted_contact'):
                        c = res['extracted_contact']
                        c['source_file'] = None
                        extracted_candidates.append(c)
            except Exception as voice_err:
                logger.exception(f"Error processing voice note {voice_note.id}: {voice_err}")
                voice_note.transcription_status = 'FAILED'
                voice_note.save(update_fields=['transcription_status'])

        # =====================================================================
        # Step 3: Consolidate and Truthfully Merge Contacts
        # =====================================================================
        update_job_progress(job, "Finalizing structured contact verification...", 95)
        saved_contacts = merge_and_save_contacts(
            lead=lead,
            extracted_items=extracted_candidates,
            audit_actor='pipeline_worker' if not is_reprocess else 'admin_reprocess'
        )

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
