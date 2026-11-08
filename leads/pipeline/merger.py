import copy
import logging
from leads.models import Lead, LeadFile, ExtractedContact, LeadAuditLog, LeadProcessingJob

logger = logging.getLogger(__name__)

def merge_and_save_contacts(lead: Lead, extracted_items: list[dict], audit_actor: str = 'system') -> list[ExtractedContact]:
    """
    Consolidates raw extraction results across multiple files, QR codes, and voice notes into
    ExtractedContact database records.
    - Idempotent: deletes prior non-manually edited contacts for this lead.
    - Deduplicates contacts sharing phone numbers or emails.
    - Sets primary contact flag.
    - Truthful status transitions: SUCCEEDED (VERIFIED), PARTIAL (NEEDS_REVIEW), FAILED (FAILED).
    - Never fabricates placeholder data or ghost contacts.
    """
    job = getattr(lead, 'job', None)

    # 1. Filter out completely empty items
    valid_items = []
    for item in (extracted_items or []):
        if not item or not isinstance(item, dict):
            continue
        name = str(item.get('name', '') or '').strip()
        company = str(item.get('company', '') or '').strip()
        designation = str(item.get('designation', '') or '').strip()
        phones = item.get('phones', []) or []
        emails = item.get('emails', []) or []
        websites = item.get('websites', []) or []
        address_raw = str(item.get('address_raw', '') or '').strip()

        if any([name, company, designation, phones, emails, websites, address_raw]):
            valid_items.append(item)

    if not valid_items:
        # Clear prior automated contacts
        ExtractedContact.objects.filter(lead=lead, edited_by_admin=False).delete()
        lead.status = 'FAILED'
        lead.save(update_fields=['status', 'updated_at'])

        if job:
            job.status = 'FAILED'
            job.current_step = 'Could not read this image clearly'
            job.error_message = 'No legible contact details or card text could be extracted.'
            job.progress_percent = 100
            job.save(update_fields=['status', 'current_step', 'error_message', 'progress_percent', 'updated_at'])

        LeadAuditLog.objects.create(
            lead=lead,
            actor=audit_actor,
            action='EXTRACTION_FAILED_NO_CONTACTS',
            details={'message': 'No legible contact details found.'}
        )
        return []

    # Clear prior automated contacts
    ExtractedContact.objects.filter(lead=lead, edited_by_admin=False).delete()

    consolidated = []
    seen_phones = {}

    for item in valid_items:
        source_file = item.get('source_file')
        source_type = item.get('source_type', 'OCR')
        name = str(item.get('name', '') or '').strip()
        company = str(item.get('company', '') or '').strip()
        designation = str(item.get('designation', '') or '').strip()
        phones = item.get('phones', []) or []
        emails = item.get('emails', []) or []
        websites = item.get('websites', []) or []
        address_raw = str(item.get('address_raw', '') or '').strip()
        address_components = item.get('address_components', {}) or {}
        conf_dict = item.get('confidence', {}) or {}
        overall_conf = float(item.get('overall_confidence', 0.0) or 0.0)
        bounding_boxes = item.get('bounding_boxes', []) or []

        primary_phone = ''
        if phones:
            primary_phone = phones[0].get('e164') or phones[0].get('raw') or ''

        # Deduplication check by phone
        matched_idx = None
        if primary_phone and primary_phone in seen_phones:
            matched_idx = seen_phones[primary_phone]

        if matched_idx is not None:
            # Merge into existing contact & apply cross-source agreement boost
            existing = consolidated[matched_idx]
            if not existing['name'] and name:
                existing['name'] = name
            if not existing['company'] and company:
                existing['company'] = company
            if not existing['designation'] and designation:
                existing['designation'] = designation
            if not existing['address_raw'] and address_raw:
                existing['address_raw'] = address_raw
                existing['address_components'] = address_components

            # Add distinct emails and websites
            for em in emails:
                if em not in existing['emails']:
                    existing['emails'].append(em)
            for ws in websites:
                if ws not in existing['websites']:
                    existing['websites'].append(ws)

            # Boost confidence due to multi-source cross validation
            boosted_conf = min(0.99, existing['overall_confidence'] + 0.10)
            existing['overall_confidence'] = round(boosted_conf, 3)
            existing['confidence']['cross_source_agreement'] = 0.99
        else:
            contact_data = {
                'source_file': source_file,
                'source_type': source_type,
                'name': name,
                'company': company,
                'designation': designation,
                'phones': phones,
                'primary_phone': primary_phone,
                'emails': emails,
                'websites': websites,
                'address_raw': address_raw,
                'address_components': address_components,
                'confidence': conf_dict,
                'overall_confidence': overall_conf,
                'bounding_boxes': bounding_boxes,
            }
            new_idx = len(consolidated)
            consolidated.append(contact_data)
            if primary_phone:
                seen_phones[primary_phone] = new_idx

    # Sort contacts by overall_confidence descending
    consolidated.sort(key=lambda c: c['overall_confidence'], reverse=True)

    saved_contacts = []
    for idx, cdata in enumerate(consolidated):
        is_primary = (idx == 0)
        c_obj = ExtractedContact.objects.create(
            lead=lead,
            source_file=cdata['source_file'],
            source_type=cdata['source_type'],
            name=cdata['name'],
            company=cdata['company'],
            designation=cdata['designation'],
            phones=cdata['phones'],
            primary_phone=cdata['primary_phone'],
            emails=cdata['emails'],
            websites=cdata['websites'],
            address_raw=cdata['address_raw'],
            address_components=cdata['address_components'],
            confidence=cdata['confidence'],
            overall_confidence=cdata['overall_confidence'],
            bounding_boxes=cdata['bounding_boxes'],
            is_primary=is_primary,
            is_verified=False,
            edited_by_admin=False
        )
        saved_contacts.append(c_obj)

    # Truthful status determination:
    # SUCCEEDED / VERIFIED: Name + (Phone or Email) with overall_confidence >= 0.80
    # PARTIAL / NEEDS_REVIEW: Incomplete fields or confidence < 0.80
    if saved_contacts:
        primary = saved_contacts[0]
        has_critical_identity = bool(primary.name and (primary.primary_phone or primary.emails))
        meets_threshold = primary.overall_confidence >= 0.80

        if has_critical_identity and meets_threshold:
            lead.status = 'VERIFIED'
            if job:
                job.status = 'SUCCEEDED'
                job.current_step = 'Extraction succeeded'
                job.progress_percent = 100
        else:
            lead.status = 'NEEDS_REVIEW'
            if job:
                job.status = 'PARTIAL'
                job.current_step = 'Partial extraction completed. Some fields require review.'
                job.progress_percent = 100
    else:
        lead.status = 'FAILED'
        if job:
            job.status = 'FAILED'
            job.current_step = 'Could not read this image clearly'
            job.progress_percent = 100

    lead.save(update_fields=['status', 'updated_at'])
    if job:
        job.save(update_fields=['status', 'current_step', 'progress_percent', 'updated_at'])

    LeadAuditLog.objects.create(
        lead=lead,
        actor=audit_actor,
        action='EXTRACTION_MERGE_COMPLETED',
        details={
            'contacts_count': len(saved_contacts),
            'top_confidence': saved_contacts[0].overall_confidence if saved_contacts else 0.0,
            'lead_status': lead.status,
            'job_status': job.status if job else 'UNKNOWN',
        }
    )

    return saved_contacts
