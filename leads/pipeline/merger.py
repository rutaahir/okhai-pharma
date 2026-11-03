import copy
from leads.models import Lead, LeadFile, ExtractedContact, LeadAuditLog

def merge_and_save_contacts(lead: Lead, extracted_items: list[dict], audit_actor: str = 'system') -> list[ExtractedContact]:
    """
    Consolidates raw extraction results across multiple files, QR codes, and voice notes into
    ExtractedContact database records.
    - Idempotent: deletes or updates prior non-manually edited contacts for this lead.
    - Deduplicates contacts sharing phone numbers or emails.
    - Sets primary contact flag.
    - Decides whether Lead.status is VERIFIED or NEEDS_REVIEW.
    """
    if not extracted_items:
        lead.status = 'NEEDS_REVIEW'
        lead.save(update_fields=['status', 'updated_at'])
        LeadAuditLog.objects.create(
            lead=lead,
            actor=audit_actor,
            action='EXTRACTION_NO_CONTACTS_FOUND',
            details={'message': 'No contacts were detected in submitted documents.'}
        )
        return []

    # Preserve any existing contacts that were edited by admin
    admin_edited_contacts = list(ExtractedContact.objects.filter(lead=lead, edited_by_admin=True))

    # Clear prior automated contacts
    ExtractedContact.objects.filter(lead=lead, edited_by_admin=False).delete()

    consolidated = []
    seen_phones = {}

    for item in extracted_items:
        source_file = item.get('source_file')
        source_type = item.get('source_type', 'OCR')
        name = item.get('name', '').strip()
        company = item.get('company', '').strip()
        designation = item.get('designation', '').strip()
        phones = item.get('phones', [])
        emails = item.get('emails', [])
        websites = item.get('websites', [])
        address_raw = item.get('address_raw', '').strip()
        address_components = item.get('address_components', {})
        conf_dict = item.get('confidence', {})
        overall_conf = item.get('overall_confidence', 0.0)
        bounding_boxes = item.get('bounding_boxes', [])

        primary_phone = phones[0]['e164'] if phones else ''

        # Check deduplication with already consolidated contacts by phone
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
            boosted_conf = min(0.99, existing['overall_confidence'] + 0.15)
            existing['overall_confidence'] = round(boosted_conf, 3)
            existing['confidence']['cross_source_agreement'] = 0.99
        else:
            # New unique contact entry
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

    # Determine Lead status based on threshold and required fields
    # Required: Name + Phone or Address, and overall_confidence >= 0.80
    if saved_contacts:
        primary = saved_contacts[0]
        has_essential_fields = bool(primary.name and primary.primary_phone)
        meets_threshold = primary.overall_confidence >= 0.80

        if has_essential_fields and meets_threshold:
            lead.status = 'VERIFIED'
        else:
            lead.status = 'NEEDS_REVIEW'
    else:
        lead.status = 'NEEDS_REVIEW'

    lead.save(update_fields=['status', 'updated_at'])

    LeadAuditLog.objects.create(
        lead=lead,
        actor=audit_actor,
        action='EXTRACTION_MERGE_COMPLETED',
        details={
            'contacts_count': len(saved_contacts),
            'top_confidence': saved_contacts[0].overall_confidence if saved_contacts else 0.0,
            'lead_status': lead.status,
        }
    )

    return saved_contacts

