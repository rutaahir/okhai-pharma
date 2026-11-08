import time
import os
import jwt
from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from django.db import transaction
from django.contrib.auth.hashers import check_password
from django.core.mail import EmailMessage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from leads.models import (
    LeadAccessPasscode,
    LeadAccessLog,
    Lead,
    LeadFile,
    LeadVoiceNote,
    LeadProcessingJob,
    LeadAuditLog,
    ExtractedContact
)
from leads.permissions import HasLeadPasscodeToken
from leads.pipeline.ingestion import compute_sha256, validate_magic_bytes, IngestionValidationError
from leads.pipeline.task_runner import dispatch_lead_pipeline_async
from leads.serializers import (
    ExtractedContactSerializer,
    LeadFileSerializer,
    LeadVoiceNoteSerializer
)

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip or '127.0.0.1'

class LeadUnlockView(APIView):
    """
    POST /api/lead/unlock/
    Verifies 6-digit or alphanumeric commercial passcode.
    Rate limits to 5 failed attempts per IP, locking out for 15 minutes.
    Returns 2-hour signed JWT session token.
    """
    authentication_classes = []
    parser_classes = [JSONParser, FormParser]

    def post(self, request):
        ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')[:255]
        raw_passcode = str(request.data.get('passcode', '')).strip()

        # 1. Rate Limiting & Lockout Check
        lockout_window = timezone.now() - timedelta(seconds=settings.LEAD_RATE_LIMIT_LOCKOUT_SECONDS)
        recent_fails = LeadAccessLog.objects.filter(
            ip_address=ip,
            success=False,
            created_at__gte=lockout_window
        ).order_by('-created_at')

        fail_count = recent_fails.count()
        if fail_count >= settings.LEAD_RATE_LIMIT_ATTEMPTS:
            oldest_fail_in_window = recent_fails[settings.LEAD_RATE_LIMIT_ATTEMPTS - 1]
            elapsed = (timezone.now() - oldest_fail_in_window.created_at).total_seconds()
            remaining_lockout = max(1, int(settings.LEAD_RATE_LIMIT_LOCKOUT_SECONDS - elapsed))

            LeadAccessLog.objects.create(
                ip_address=ip,
                user_agent=user_agent,
                success=False,
                reason='Rate limit lockout active'
            )
            return Response({
                'error': 'Too many failed passcode attempts. Access is locked.',
                'lockout_seconds': remaining_lockout,
                'locked': True
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)

        if not raw_passcode:
            return Response({'error': 'Passcode is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Verify against active passcodes using constant-time check_password
        matched_passcode = None
        active_passcodes = LeadAccessPasscode.objects.filter(is_active=True)

        for p_entry in active_passcodes:
            if p_entry.is_valid() and check_password(raw_passcode, p_entry.passcode_hash):
                matched_passcode = p_entry
                break

        # 3. Handle Failed Verification
        if not matched_passcode:
            LeadAccessLog.objects.create(
                ip_address=ip,
                user_agent=user_agent,
                success=False,
                reason='Invalid passcode'
            )
            new_fail_count = fail_count + 1
            attempts_remaining = max(0, settings.LEAD_RATE_LIMIT_ATTEMPTS - new_fail_count)
            return Response({
                'error': 'Invalid passcode. Please verify with our commercial team.',
                'attempts_remaining': attempts_remaining,
                'locked': attempts_remaining == 0,
                'lockout_seconds': settings.LEAD_RATE_LIMIT_LOCKOUT_SECONDS if attempts_remaining == 0 else 0
            }, status=status.HTTP_401_UNAUTHORIZED)

        # 4. Handle Successful Verification
        matched_passcode.uses_count += 1
        matched_passcode.save(update_fields=['uses_count'])

        LeadAccessLog.objects.create(
            ip_address=ip,
            user_agent=user_agent,
            success=True,
            passcode_label=matched_passcode.label,
            reason='Verified successfully'
        )

        # Generate 2-hour signed JWT
        now_ts = int(time.time())
        token_payload = {
            'type': 'lead_passcode_token',
            'passcode_id': matched_passcode.id,
            'label': matched_passcode.label,
            'ip': ip,
            'iat': now_ts,
            'exp': now_ts + settings.LEAD_TOKEN_EXPIRY_SECONDS,
        }
        signed_token = jwt.encode(token_payload, settings.LEAD_TOKEN_SECRET, algorithm='HS256')

        return Response({
            'success': True,
            'token': signed_token,
            'label': matched_passcode.label,
            'expires_in': settings.LEAD_TOKEN_EXPIRY_SECONDS
        }, status=status.HTTP_200_OK)

class LeadVerifySessionView(APIView):
    """
    POST /api/lead/verify-session/
    Validates a passcode session token immediately.
    Returns { valid: True, label: "...", expires_in: ... } or 401 if expired/invalid/rotated.
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        token = request.data.get('token') or request.headers.get('X-Lead-Passcode-Token')
        if not token:
            auth_header = request.headers.get('Authorization', '')
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return Response({'valid': False, 'error': 'No token provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(
                token,
                settings.LEAD_TOKEN_SECRET,
                algorithms=['HS256']
            )
            if payload.get('type') != 'lead_passcode_token':
                return Response({'valid': False, 'error': 'Invalid token type.'}, status=status.HTTP_401_UNAUTHORIZED)

            # Check if underlying passcode is still active
            passcode_id = payload.get('passcode_id')
            if passcode_id:
                try:
                    p_entry = LeadAccessPasscode.objects.get(id=passcode_id)
                    if not p_entry.is_valid():
                        return Response({'valid': False, 'error': 'Passcode has been rotated or deactivated.'}, status=status.HTTP_401_UNAUTHORIZED)
                except LeadAccessPasscode.DoesNotExist:
                    return Response({'valid': False, 'error': 'Passcode record not found.'}, status=status.HTTP_401_UNAUTHORIZED)

            remaining_seconds = max(0, int(payload.get('exp', 0) - time.time()))
            return Response({
                'valid': True,
                'label': payload.get('label', 'Commercial Lead Access'),
                'expires_in': remaining_seconds
            }, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            return Response({'valid': False, 'error': 'Passcode session expired.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({'valid': False, 'error': 'Invalid or corrupted session token.'}, status=status.HTTP_401_UNAUTHORIZED)

class LeadSubmitView(APIView):
    """
    POST /api/lead/submit/
    Customer submission of business cards, brochures, flyers, QR codes, voice notes, and description.
    Protected by short-lived signed passcode token.
    Validates files, generates human-friendly reference code, and dispatches extraction asynchronously.
    """
    authentication_classes = []
    permission_classes = [HasLeadPasscodeToken]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        customer_name = request.data.get('customer_name_input', '').strip()
        description = request.data.get('description', '').strip()

        # Files list
        files = request.FILES.getlist('files')
        voice_notes = request.FILES.getlist('voice_notes')

        if not files and not voice_notes and not description:
            return Response({
                'error': 'Please provide at least one document/card image, voice note, or description.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Limit caps
        if len(files) > 10:
            return Response({'error': 'Maximum 10 files allowed per lead submission.'}, status=status.HTTP_400_BAD_REQUEST)
        if len(voice_notes) > 10:
            return Response({'error': 'Maximum 10 voice notes allowed per lead submission.'}, status=status.HTTP_400_BAD_REQUEST)

        # Atomic lead creation
        try:
            with transaction.atomic():
                ref_code = Lead.generate_reference_code()
                lead = Lead.objects.create(
                    reference_code=ref_code,
                    customer_name_input=customer_name,
                    description=description,
                    status='PROCESSING',
                    source_ip=ip,
                    user_agent=user_agent
                )

                # Process uploaded document files
                for f in files:
                    file_bytes = f.read()
                    f.seek(0)
                    sha = compute_sha256(file_bytes)
                    mime = validate_magic_bytes(file_bytes, f.name)

                    # Deduplication check inside this lead
                    if LeadFile.objects.filter(lead=lead, sha256=sha).exists():
                        continue

                    LeadFile.objects.create(
                        lead=lead,
                        file=f,
                        original_filename=f.name,
                        mime_type=mime,
                        size=f.size,
                        sha256=sha,
                        processing_status='PENDING'
                    )

                # Process uploaded/recorded voice notes
                for v in voice_notes:
                    LeadVoiceNote.objects.create(
                        lead=lead,
                        audio_file=v,
                        mime_type=getattr(v, 'content_type', 'audio/webm') or 'audio/webm',
                        size=v.size,
                        transcription_status='PENDING'
                    )

                # Create processing job record
                LeadProcessingJob.objects.create(
                    lead=lead,
                    status='PENDING',
                    current_step='Enqueued for AI analysis',
                    progress_percent=0
                )

                # Audit log
                LeadAuditLog.objects.create(
                    lead=lead,
                    actor='customer',
                    action='LEAD_SUBMITTED',
                    details={
                        'files_count': len(files),
                        'voice_notes_count': len(voice_notes),
                        'customer_name': customer_name,
                    }
                )

        except IngestionValidationError as val_err:
            return Response({'error': str(val_err)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Failed to save lead: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Dispatch async background worker
        dispatch_lead_pipeline_async(str(lead.id))

        return Response({
            'success': True,
            'lead_id': str(lead.id),
            'reference_code': lead.reference_code,
            'status': lead.status,
            'message': 'Lead received and queued for extraction.'
        }, status=status.HTTP_201_CREATED)

class LeadStatusView(APIView):
    """
    GET /api/lead/status/<id>/
    Customer live progress tracking, full attached files preview, and extracted contact details.
    """
    authentication_classes = []

    def get(self, request, id):
        try:
            lead = Lead.objects.prefetch_related('files', 'voice_notes', 'contacts').get(id=id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

        job = getattr(lead, 'job', None)
        contacts = lead.contacts.filter(is_primary=True)
        if not contacts.exists():
            contacts = lead.contacts.all()

        contacts_data = ExtractedContactSerializer(contacts, many=True).data
        files_data = LeadFileSerializer(lead.files.all(), many=True, context={'request': request}).data
        voice_notes_data = LeadVoiceNoteSerializer(lead.voice_notes.all(), many=True, context={'request': request}).data

        return Response({
            'id': str(lead.id),
            'reference_code': lead.reference_code,
            'status': lead.status,
            'is_customer_confirmed': getattr(lead, 'is_customer_confirmed', False),
            'created_at': lead.created_at,
            'description': lead.description,
            'customer_name_input': lead.customer_name_input,
            'job': {
                'status': job.status if job else 'UNKNOWN',
                'current_step': job.current_step if job else '',
                'progress_percent': job.progress_percent if job else 100,
            },
            'files_count': lead.files.count(),
            'voice_notes_count': lead.voice_notes.count(),
            'files': files_data,
            'voice_notes': voice_notes_data,
            'extracted_preview': contacts_data[0] if contacts_data else None,
            'contacts': contacts_data,
        }, status=status.HTTP_200_OK)

class LeadCustomerContactUpdateView(APIView):
    """
    POST /api/lead/contact/<uuid:id>/
    Allows customer to edit and save extracted contact fields (name, company, phone, email, address).
    Synchronizes immediately with SuperAdmin dashboard columns.
    """
    authentication_classes = []
    permission_classes = [HasLeadPasscodeToken]

    def post(self, request, id):
        try:
            lead = Lead.objects.prefetch_related('contacts').get(id=id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        name = str(data.get('name', '')).strip()
        company = str(data.get('company', '')).strip()
        designation = str(data.get('designation', '')).strip()
        phone = str(data.get('phone', '')).strip()
        email = str(data.get('email', '')).strip()
        address = str(data.get('address', '')).strip()

        # Update or create ExtractedContact
        contact = lead.contacts.filter(is_primary=True).first() or lead.contacts.first()
        if not contact:
            contact = ExtractedContact.objects.create(
                lead=lead,
                name=name,
                company=company,
                designation=designation,
                primary_phone=phone,
                emails=[email] if email else [],
                address_raw=address,
                is_primary=True,
                source_type='MANUAL',
                is_verified=True,
                overall_confidence=0.99
            )
        else:
            if name: contact.name = name
            if company: contact.company = company
            if designation is not None: contact.designation = designation
            if phone:
                contact.primary_phone = phone
                phones_list = contact.phones or []
                phones_list = [p for p in phones_list if p.get('raw') != phone and p.get('e164') != phone]
                phones_list.insert(0, {'raw': phone, 'e164': phone, 'country': 'IN', 'type': 'mobile'})
                contact.phones = phones_list
            if email:
                contact.emails = [email]
            if address:
                contact.address_raw = address
            contact.edited_by_admin = False
            contact.is_verified = True
            contact.overall_confidence = max(contact.overall_confidence, 0.95)
            contact.save()

        # Mark lead as confirmed by customer and update status for SuperAdmin display
        lead.is_customer_confirmed = True
        lead.status = 'VERIFIED'
        if name:
            lead.customer_name_input = name
        lead.save(update_fields=['is_customer_confirmed', 'status', 'customer_name_input', 'updated_at'])

        LeadAuditLog.objects.create(
            lead=lead,
            actor='Customer (Passcode Verified)',
            action='CUSTOMER_EDITED_DETAILS',
            details={
                'name': name,
                'company': company,
                'phone': phone,
                'email': email,
                'address': address
            }
        )

        serializer = ExtractedContactSerializer(contact)
        return Response({
            'success': True,
            'is_customer_confirmed': True,
            'message': 'Contact details updated and synchronized with commercial desk.',
            'contact': serializer.data
        }, status=status.HTTP_200_OK)

class LeadSendBrochureEmailView(APIView):
    """
    POST /api/lead/send-brochure-email/
    Dispatches a professional thank you email with all details and attaches the corporate brochure PDF.
    """
    authentication_classes = []
    permission_classes = [HasLeadPasscodeToken]

    def post(self, request):
        data = request.data
        lead_id = data.get('lead_id')
        reference_code = data.get('reference_code', 'LD-OKHAI')
        recipient_email = str(data.get('email', '')).strip()
        recipient_name = str(data.get('name', 'Valued Commercial Partner')).strip()
        company = str(data.get('company', '')).strip()
        phone = str(data.get('phone', '')).strip()
        location = str(data.get('location', '')).strip()

        if not recipient_email or '@' not in recipient_email:
            return Response({'error': 'A valid recipient email address is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Build corporate HTML body
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9F4; color: #1E3D2A; margin: 0; padding: 24px; }}
            .container {{ max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(30, 61, 42, 0.12); box-shadow: 0 10px 25px rgba(30, 61, 42, 0.05); }}
            .header {{ background: #1E3D2A; padding: 32px 28px; text-align: center; color: #ffffff; }}
            .header h1 {{ margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }}
            .header p {{ margin: 0; font-size: 13px; color: #8CC63F; font-family: monospace; }}
            .content {{ padding: 32px 28px; line-height: 1.6; font-size: 14px; }}
            .ref-badge {{ display: inline-block; padding: 6px 14px; background: #EAF2E5; color: #5B9A3C; font-weight: 700; font-family: monospace; border-radius: 8px; font-size: 13px; margin: 8px 0; }}
            .details-card {{ background: #F8F9F4; border: 1px solid rgba(30, 61, 42, 0.1); border-radius: 14px; padding: 18px; margin: 20px 0; }}
            .details-row {{ display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(30, 61, 42, 0.08); }}
            .details-row:last-child {{ border-bottom: none; }}
            .details-label {{ color: rgba(30, 61, 42, 0.6); font-size: 12px; font-family: monospace; text-transform: uppercase; }}
            .details-val {{ font-weight: 600; color: #1E3D2A; font-size: 13px; }}
            .brochure-card {{ background: linear-gradient(135deg, #1E3D2A 0%, #2D5A3C 100%); color: #ffffff; border-radius: 14px; padding: 20px; margin: 22px 0; }}
            .brochure-card h3 {{ margin: 0 0 6px 0; font-size: 16px; color: #8CC63F; }}
            .brochure-card p {{ margin: 0 0 14px 0; font-size: 12px; opacity: 0.9; }}
            .btn {{ display: inline-block; background: #8CC63F; color: #1E3D2A; font-weight: 700; padding: 10px 22px; border-radius: 10px; text-decoration: none; font-size: 12px; font-family: monospace; }}
            .footer {{ padding: 24px 28px; background: #FAFBF8; border-top: 1px solid rgba(30, 61, 42, 0.08); font-size: 11px; color: rgba(30, 61, 42, 0.6); text-align: center; }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Okhai Pharma Intermediates</h1>
              <p>PURE NICOTINE. PRECISELY MADE. · GUJARAT, INDIA</p>
            </div>
            <div class="content">
              <p>Dear <strong>{recipient_name}</strong>,</p>
              <p>Thank you for connecting with <strong>Okhai Pharma Intermediates Pvt. Ltd.</strong> We have successfully received and registered your commercial inquiry on our digital portal.</p>
              
              <div style="text-align: center; margin: 16px 0;">
                <span class="ref-badge">Tracking ID: {reference_code}</span>
              </div>

              <div class="details-card">
                <div class="details-row">
                  <span class="details-label">Contact Person</span>
                  <span class="details-val">{recipient_name}</span>
                </div>
                {f'<div class="details-row"><span class="details-label">Organization</span><span class="details-val">{company}</span></div>' if company else ''}
                {f'<div class="details-row"><span class="details-label">Phone Number</span><span class="details-val">{phone}</span></div>' if phone else ''}
                <div class="details-row">
                  <span class="details-label">Corporate Email</span>
                  <span class="details-val">{recipient_email}</span>
                </div>
                {f'<div class="details-row"><span class="details-label">Registered Location</span><span class="details-val">{location}</span></div>' if location else ''}
              </div>

              <div class="brochure-card">
                <h3>Attached: Corporate Product Brochure</h3>
                <p>Contains full analytical specifications for Pure Nicotine (99.5% USP/EP), Nicotine Sulphate 40%, Nicotine Alkaloid 90/95%, regulatory certifications, HPLC/GC analysis, and packaging options.</p>
                <a href="https://okhaipharma.com/downloads/Okhai_Pharma_Brochure.pdf" class="btn">View & Download Brochure Online</a>
              </div>

              <p>Our commercial desk in Anand, Gujarat is currently reviewing your documentation. A dedicated sales manager will reach out directly to discuss your requirements, custom batch specifications, and dispatch timelines.</p>

              <p style="margin-top: 24px;">Warm regards,<br>
              <strong>Commercial Sales Desk</strong><br>
              Okhai Pharma Intermediates Pvt. Ltd.<br>
              Kasor, Sojitra, Anand - 388460, Gujarat, India<br>
              Phone / WhatsApp: +91 79900 82565 | Email: info@okhaipharma.com
              </p>
            </div>
            <div class="footer">
              This message was dispatched from Okhai Pharma's verified Commercial Lead Intake Suite.
            </div>
          </div>
        </body>
        </html>
        """

        try:
            email_msg = EmailMessage(
                subject=f"Commercial Inquiry Confirmation & Corporate Brochure [Ref #{reference_code}] - Okhai Pharma",
                body=html_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[recipient_email],
            )
            email_msg.content_subtype = 'html'

            # Attach the PDF Brochure
            brochure_path = os.path.join(settings.BASE_DIR, 'public', 'downloads', 'Okhai_Pharma_Brochure.pdf')
            if not os.path.exists(brochure_path):
                brochure_path = os.path.join(settings.BASE_DIR, 'public', 'Okhai_Pharma_Brochure.pdf')

            if os.path.exists(brochure_path):
                email_msg.attach_file(brochure_path, mimetype='application/pdf')

            email_msg.send(fail_silently=False)

            if lead_id:
                try:
                    lead = Lead.objects.get(id=lead_id)
                    LeadAuditLog.objects.create(
                        lead=lead,
                        actor='Customer Portal',
                        action='BROCHURE_EMAIL_SENT',
                        details={'to': recipient_email, 'reference_code': reference_code}
                    )
                except Exception:
                    pass

            return Response({
                'success': True,
                'message': f'Thank you email with attached corporate brochure successfully sent to {recipient_email}.'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': f'Failed to dispatch email: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

