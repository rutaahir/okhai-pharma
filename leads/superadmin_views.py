import os
import csv
import io
import re
import urllib.parse
from datetime import timedelta
from django.utils import timezone
from django.http import HttpResponse, FileResponse, Http404
from django.db.models import Q, Avg, Count
from django.contrib.auth.hashers import make_password
from django.core.mail import EmailMessage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.renderers import BaseRenderer, JSONRenderer
import jwt
from django.conf import settings
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

from leads.models import (
    Lead,
    LeadFile,
    LeadVoiceNote,
    ExtractedContact,
    LeadAuditLog,
    LeadAccessPasscode,
    LeadAccessLog,
    LeadCommunication
)
from leads.permissions import IsSuperAdminUser
from leads.serializers import (
    LeadListSerializer,
    LeadDetailSerializer,
    ExtractedContactSerializer,
    LeadAccessPasscodeSerializer,
    LeadCommunicationSerializer
)
from leads.pipeline.task_runner import dispatch_lead_pipeline_async

class SuperAdminLeadListView(APIView):
    """
    GET /api/superadmin/leads/
    Paginated search and filtering across leads and extracted contacts.
    """
    permission_classes = [IsSuperAdminUser]

    def get(self, request):
        queryset = Lead.objects.filter(is_customer_confirmed=True).prefetch_related('files', 'voice_notes', 'contacts')

        # 1. Search Query
        search = request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(reference_code__icontains=search) |
                Q(customer_name_input__icontains=search) |
                Q(description__icontains=search) |
                Q(contacts__name__icontains=search) |
                Q(contacts__company__icontains=search) |
                Q(contacts__primary_phone__icontains=search) |
                Q(contacts__address_raw__icontains=search)
            ).distinct()

        # 2. Filter by Status
        status_filter = request.query_params.get('status', 'all')
        if status_filter and status_filter != 'all':
            queryset = queryset.filter(status=status_filter.upper())

        # 3. Filter by Confidence Threshold
        min_conf = request.query_params.get('min_confidence')
        if min_conf is not None:
            try:
                min_conf_val = float(min_conf)
                queryset = queryset.filter(contacts__overall_confidence__gte=min_conf_val).distinct()
            except ValueError:
                pass

        # 4. Filter by Date Range
        from_date = request.query_params.get('from_date')
        to_date = request.query_params.get('to_date')
        if from_date:
            queryset = queryset.filter(created_at__date__gte=from_date)
        if to_date:
            queryset = queryset.filter(created_at__date__lte=to_date)

        # 5. Sorting
        sort_by = request.query_params.get('sort_by', 'created_at')
        sort_order = request.query_params.get('sort_order', 'desc')
        order_prefix = '-' if sort_order.lower() == 'desc' else ''

        valid_sort_fields = {
            'created_at': 'created_at',
            'reference_code': 'reference_code',
            'status': 'status',
            'priority': 'priority',
        }
        order_field = valid_sort_fields.get(sort_by, 'created_at')
        queryset = queryset.order_by(f"{order_prefix}{order_field}")

        # 6. Pagination
        try:
            page = max(1, int(request.query_params.get('page', 1)))
            page_size = min(100, max(1, int(request.query_params.get('limit', 15))))
        except ValueError:
            page = 1
            page_size = 15

        total = queryset.count()
        start = (page - 1) * page_size
        end = start + page_size
        page_leads = queryset[start:end]

        serializer = LeadListSerializer(page_leads, many=True, context={'request': request})
        return Response({
            'leads': serializer.data,
            'pagination': {
                'total': total,
                'page': page,
                'limit': page_size,
                'total_pages': (total + page_size - 1) // page_size if page_size else 1,
            }
        })

class SuperAdminLeadDetailView(APIView):
    """
    GET /api/superadmin/leads/<id>/
    PATCH /api/superadmin/leads/<id>/
    Full detail inspection, inline editing of extracted fields, notes, priority, status.
    """
    permission_classes = [IsSuperAdminUser]

    def get(self, request, id):
        try:
            lead = Lead.objects.prefetch_related(
                'files', 'voice_notes', 'contacts', 'audit_logs', 'communications'
            ).get(id=id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = LeadDetailSerializer(lead, context={'request': request})
        return Response(serializer.data)

    def patch(self, request, id):
        try:
            lead = Lead.objects.get(id=id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        admin_actor = getattr(request, 'superadmin_payload', {}).get('username', 'superadmin')

        # 1. Update Lead Status
        if 'status' in data:
            old_status = lead.status
            new_status = data['status'].upper()
            if new_status in dict(Lead.STATUS_CHOICES):
                lead.status = new_status
                if new_status == 'VERIFIED':
                    lead.verified_by = admin_actor
                    lead.verified_at = timezone.now()
                LeadAuditLog.objects.create(
                    lead=lead,
                    actor=admin_actor,
                    action='STATUS_CHANGED',
                    details={'from': old_status, 'to': new_status}
                )

        # 2. Update Priority / Notes
        if 'priority' in data and data['priority'] in dict(Lead.PRIORITY_CHOICES):
            lead.priority = data['priority']
        if 'internal_notes' in data:
            lead.internal_notes = str(data['internal_notes']).strip()
        lead.save()

        # 3. Update Contact Fields if provided
        if 'contact' in data and isinstance(data['contact'], dict):
            c_data = data['contact']
            contact_id = c_data.get('id')
            if contact_id:
                contact = ExtractedContact.objects.filter(lead=lead, id=contact_id).first()
            else:
                contact = lead.contacts.filter(is_primary=True).first()

            if contact:
                for fld in ['name', 'company', 'designation', 'address_raw']:
                    if fld in c_data:
                        setattr(contact, fld, str(c_data[fld]).strip())

                if 'phones' in c_data and isinstance(c_data['phones'], list):
                    contact.phones = c_data['phones']
                    if contact.phones:
                        contact.primary_phone = contact.phones[0].get('e164') or contact.phones[0].get('raw', '')

                if 'emails' in c_data and isinstance(c_data['emails'], list):
                    contact.emails = c_data['emails']

                if 'address_components' in c_data and isinstance(c_data['address_components'], dict):
                    contact.address_components = c_data['address_components']

                if 'is_verified' in c_data:
                    contact.is_verified = bool(c_data['is_verified'])

                contact.edited_by_admin = True
                contact.save()

                LeadAuditLog.objects.create(
                    lead=lead,
                    actor=admin_actor,
                    action='CONTACT_EDITED_BY_ADMIN',
                    details={'contact_id': str(contact.id)}
                )

        return Response(LeadDetailSerializer(lead, context={'request': request}).data)

    def delete(self, request, id):
        try:
            lead = Lead.objects.get(id=id)
            lead.status = 'ARCHIVED'
            lead.save(update_fields=['status', 'updated_at'])
            return Response({'success': True, 'message': 'Lead archived.'})
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

class SuperAdminLeadReprocessView(APIView):
    """
    POST /api/superadmin/leads/<id>/reprocess/
    Re-runs the extraction pipeline on all uploaded files.
    """
    permission_classes = [IsSuperAdminUser]

    def post(self, request, id):
        try:
            lead = Lead.objects.get(id=id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

        admin_actor = getattr(request, 'superadmin_payload', {}).get('username', 'superadmin')
        LeadAuditLog.objects.create(
            lead=lead,
            actor=admin_actor,
            action='REPROCESS_TRIGGERED',
            details={'initiated_at': timezone.now().isoformat()}
        )

        dispatch_lead_pipeline_async(str(lead.id), is_reprocess=True)
        return Response({'success': True, 'message': 'Extraction pipeline re-queued.'})


def html_to_plain_text(html_content):
    if not html_content:
        return ''
    text = re.sub(r'<(br|p|/p|div|/div|li)\b[^>]*>', '\n', html_content, flags=re.IGNORECASE)
    text = re.sub(r'<(b|strong)\b[^>]*>(.*?)</\1>', r'*\2*', text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'<(i|em)\b[^>]*>(.*?)</\1>', r'_\2_', text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\n\s*\n', '\n\n', text)
    return text.strip()


class SuperAdminLeadReplyView(APIView):
    """
    GET /api/superadmin/leads/<uuid:id>/reply/
    POST /api/superadmin/leads/<uuid:id>/reply/
    Dispatches reply communications (Email with rich HTML or WhatsApp direct)
    and saves full conversation logs into the LeadCommunication database table.
    """
    permission_classes = [IsSuperAdminUser]

    def get(self, request, id):
        try:
            lead = Lead.objects.get(id=id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

        comms = lead.communications.all()
        serializer = LeadCommunicationSerializer(comms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id):
        try:
            lead = Lead.objects.get(id=id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found.'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        channel = str(data.get('channel', 'EMAIL')).strip().upper()
        recipient = str(data.get('recipient', '')).strip()
        subject = str(data.get('subject', '')).strip()
        message_html = str(data.get('message_html', '')).strip()
        message_text = str(data.get('message_text', '')).strip()
        attach_brochure = bool(data.get('attach_brochure', False))

        if not message_text and message_html:
            message_text = html_to_plain_text(message_html)

        admin_payload = getattr(request, 'superadmin_payload', {})
        admin_sender = admin_payload.get('full_name') or admin_payload.get('username') or 'Superadmin'

        if channel not in ['EMAIL', 'WHATSAPP']:
            return Response({'error': 'Channel must be EMAIL or WHATSAPP.'}, status=status.HTTP_400_BAD_REQUEST)

        if not recipient:
            return Response({'error': 'Recipient address or phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not message_html and not message_text:
            return Response({'error': 'Message body cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

        if channel == 'EMAIL':
            if '@' not in recipient:
                return Response({'error': 'Please provide a valid recipient email address.'}, status=status.HTTP_400_BAD_REQUEST)
            if not subject:
                subject = f"Regarding your inquiry with Okhai Pharma [Ref: {lead.reference_code}]"

            if '<!DOCTYPE' not in message_html and '<html' not in message_html:
                rendered_html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9F4; color: #1E3D2A; margin: 0; padding: 24px; }}
    .container {{ max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid rgba(30, 61, 42, 0.12); box-shadow: 0 8px 24px rgba(30, 61, 42, 0.04); }}
    .header {{ background: #1E3D2A; padding: 26px 28px; text-align: left; color: #ffffff; }}
    .header-logo {{ font-size: 19px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; margin: 0; }}
    .header-sub {{ font-size: 11px; color: #8CC63F; font-family: monospace; letter-spacing: 0.8px; margin: 4px 0 0 0; text-transform: uppercase; }}
    .content {{ padding: 28px; line-height: 1.65; font-size: 14px; color: #1E3D2A; }}
    .ref-tag {{ display: inline-block; padding: 4px 10px; background: #EAF2E5; color: #5B9A3C; font-weight: 700; font-family: monospace; border-radius: 6px; font-size: 12px; margin-bottom: 16px; }}
    .footer {{ padding: 20px 28px; background: #FAFBF8; border-top: 1px solid rgba(30, 61, 42, 0.08); font-size: 11px; color: rgba(30, 61, 42, 0.65); }}
    .footer p {{ margin: 3px 0; }}
    a {{ color: #5B9A3C; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">Okhai Pharma Intermediates Pvt. Ltd.</div>
      <div class="header-sub">Commercial Sales Desk · Gujarat, India</div>
    </div>
    <div class="content">
      <div class="ref-tag">Lead Reference: {lead.reference_code}</div>
      {message_html}
    </div>
    <div class="footer">
      <p><strong>Commercial Dispatch Desk</strong> · Okhai Pharma Intermediates Pvt. Ltd.</p>
      <p>Kasor, Sojitra, Anand - 388460, Gujarat, India · WhatsApp/Phone: +91 79900 82565</p>
      <p>Corporate: <a href="https://okhaipharma.com">https://okhaipharma.com</a> · Email: info@okhaipharma.com</p>
    </div>
  </div>
</body>
</html>"""
            else:
                rendered_html = message_html

            try:
                email_msg = EmailMessage(
                    subject=subject,
                    body=rendered_html,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[recipient],
                )
                email_msg.content_subtype = 'html'

                if attach_brochure:
                    brochure_path = os.path.join(settings.BASE_DIR, 'public', 'downloads', 'Okhai_Pharma_Brochure.pdf')
                    if not os.path.exists(brochure_path):
                        brochure_path = os.path.join(settings.BASE_DIR, 'public', 'Okhai_Pharma_Brochure.pdf')
                    if os.path.exists(brochure_path):
                        email_msg.attach_file(brochure_path, mimetype='application/pdf')

                email_msg.send(fail_silently=False)

                comm = LeadCommunication.objects.create(
                    lead=lead,
                    channel='EMAIL',
                    recipient=recipient,
                    subject=subject,
                    message_html=rendered_html,
                    message_text=message_text,
                    status='SENT',
                    sender=admin_sender,
                )

                LeadAuditLog.objects.create(
                    lead=lead,
                    actor=admin_sender,
                    action='EMAIL_REPLY_SENT',
                    details={'recipient': recipient, 'subject': subject, 'comm_id': str(comm.id)}
                )

                return Response({
                    'success': True,
                    'channel': 'EMAIL',
                    'message': f'Commercial email successfully dispatched to {recipient}.',
                    'communication': LeadCommunicationSerializer(comm).data
                }, status=status.HTTP_200_OK)

            except Exception as e:
                comm = LeadCommunication.objects.create(
                    lead=lead,
                    channel='EMAIL',
                    recipient=recipient,
                    subject=subject,
                    message_html=message_html,
                    message_text=message_text,
                    status='FAILED',
                    sender=admin_sender,
                    error_message=str(e),
                )
                return Response({
                    'error': f'Failed to dispatch email: {str(e)}',
                    'communication': LeadCommunicationSerializer(comm).data
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif channel == 'WHATSAPP':
            clean_phone = re.sub(r'[^0-9]', '', recipient)
            if len(clean_phone) == 10:
                clean_phone = '91' + clean_phone

            if len(clean_phone) < 10:
                return Response({'error': 'Please provide a valid phone number with country code.'}, status=status.HTTP_400_BAD_REQUEST)

            whatsapp_url = f"https://api.whatsapp.com/send?phone={clean_phone}&text={urllib.parse.quote(message_text)}"

            comm = LeadCommunication.objects.create(
                lead=lead,
                channel='WHATSAPP',
                recipient=f"+{clean_phone}",
                subject=subject or 'WhatsApp Reply',
                message_html=message_html or f"<p>{message_text}</p>",
                message_text=message_text,
                status='OPENED_WHATSAPP',
                sender=admin_sender,
            )

            LeadAuditLog.objects.create(
                lead=lead,
                actor=admin_sender,
                action='WHATSAPP_REPLY_DISPATCHED',
                details={'recipient': f"+{clean_phone}", 'comm_id': str(comm.id)}
            )

            return Response({
                'success': True,
                'channel': 'WHATSAPP',
                'whatsapp_url': whatsapp_url,
                'message': f'WhatsApp message prepared for +{clean_phone}.',
                'communication': LeadCommunicationSerializer(comm).data
            }, status=status.HTTP_200_OK)

class SuperAdminLeadBulkView(APIView):
    """
    POST /api/superadmin/leads/bulk/
    Bulk actions: verify, archive, delete.
    """
    permission_classes = [IsSuperAdminUser]

    def post(self, request):
        action = request.data.get('action')
        lead_ids = request.data.get('lead_ids', [])

        if not action or not lead_ids:
            return Response({'error': 'Action and lead_ids are required.'}, status=status.HTTP_400_BAD_REQUEST)

        admin_actor = getattr(request, 'superadmin_payload', {}).get('username', 'superadmin')
        leads = Lead.objects.filter(id__in=lead_ids)
        count = leads.count()

        if action == 'verify':
            leads.update(status='VERIFIED', verified_by=admin_actor, verified_at=timezone.now())
        elif action == 'archive':
            leads.update(status='ARCHIVED')
        elif action == 'delete':
            leads.delete()
        else:
            return Response({'error': f'Unsupported action: {action}'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': True, 'updated_count': count})

class CSVRenderer(BaseRenderer):
    media_type = 'text/csv'
    format = 'csv'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data

class XLSXRenderer(BaseRenderer):
    media_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    format = 'xlsx'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data

class SuperAdminLeadExportView(APIView):
    """
    GET /api/superadmin/leads/export/
    Exports leads as CSV or XLSX adhering to current active filters.
    """
    permission_classes = [IsSuperAdminUser]
    renderer_classes = [CSVRenderer, XLSXRenderer, JSONRenderer]

    def get(self, request):
        export_format = request.query_params.get('format', 'csv').lower()
        queryset = Lead.objects.filter(is_customer_confirmed=True).prefetch_related('contacts', 'files')

        # Apply filters matching ListView
        search = request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(reference_code__icontains=search) |
                Q(customer_name_input__icontains=search) |
                Q(contacts__name__icontains=search) |
                Q(contacts__company__icontains=search) |
                Q(contacts__primary_phone__icontains=search)
            ).distinct()

        status_filter = request.query_params.get('status')
        if status_filter and status_filter != 'all':
            queryset = queryset.filter(status=status_filter.upper())

        leads = queryset.order_by('-created_at')

        headers = [
            'Reference Code', 'Status', 'Priority', 'Customer Input Name',
            'Extracted Contact Name', 'Company Name', 'Designation',
            'Primary Phone', 'All Phones', 'Email Addresses', 'Websites',
            'Street Address', 'City', 'State', 'Postal Code', 'Country',
            'Overall Confidence (%)', 'Is Verified', 'Files Count', 'Created At (UTC)'
        ]

        rows = []
        for l in leads:
            p = l.contacts.filter(is_primary=True).first() or l.contacts.first()
            p_comp = p.address_components if p else {}
            phones_str = "; ".join([ph.get('e164') or ph.get('raw', '') for ph in (p.phones if p else [])])
            emails_str = "; ".join(p.emails if p else [])
            web_str = "; ".join(p.websites if p else [])

            rows.append([
                l.reference_code,
                l.status,
                l.priority.title(),
                l.customer_name_input,
                p.name if p else '',
                p.company if p else '',
                p.designation if p else '',
                p.primary_phone if p else '',
                phones_str,
                emails_str,
                web_str,
                p_comp.get('street', '') if p_comp else (p.address_raw if p else ''),
                p_comp.get('city', '') if p_comp else '',
                p_comp.get('state', '') if p_comp else '',
                p_comp.get('postal_code', '') if p_comp else '',
                p_comp.get('country', '') if p_comp else '',
                f"{(p.overall_confidence * 100):.1f}%" if p else '0%',
                'YES' if (p and p.is_verified) or l.status == 'VERIFIED' else 'NO',
                l.files.count(),
                l.created_at.strftime('%Y-%m-%d %H:%M:%S')
            ])

        date_tag = timezone.now().strftime('%Y%m%d')

        # Generate XLSX
        if export_format == 'xlsx':
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.title = "Okhai Pharma Leads"

            header_fill = PatternFill(start_color="1E3D2A", end_color="1E3D2A", fill_type="solid")
            header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
            ws.append(headers)

            for col_idx in range(1, len(headers) + 1):
                cell = ws.cell(row=1, column=col_idx)
                cell.fill = header_fill
                cell.font = header_font
                cell.alignment = Alignment(horizontal="center", vertical="center")

            for r in rows:
                ws.append(r)

            # Auto fit columns
            for col in ws.columns:
                max_len = max(len(str(cell.value or '')) for cell in col)
                col_letter = openpyxl.utils.get_column_letter(col[0].column)
                ws.column_dimensions[col_letter].width = min(40, max(12, max_len + 3))

            output = io.BytesIO()
            wb.save(output)
            output.seek(0)

            response = HttpResponse(
                output.getvalue(),
                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
            response['Content-Disposition'] = f'attachment; filename="okhai_pharma_leads_{date_tag}.xlsx"'
            return response

        # Generate CSV
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)
        writer.writerows(rows)

        response = HttpResponse(output.getvalue(), content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="okhai_pharma_leads_{date_tag}.csv"'
        return response

class SuperAdminPasscodesView(APIView):
    """
    GET, POST, PATCH /api/superadmin/lead-passcodes/
    List, create, and manage lead access passcodes.
    """
    permission_classes = [IsSuperAdminUser]

    def get(self, request):
        passcodes = LeadAccessPasscode.objects.all().order_by('-created_at')
        return Response(LeadAccessPasscodeSerializer(passcodes, many=True).data)

    def post(self, request):
        label = request.data.get('label', 'Commercial Passcode').strip()
        passcode = str(request.data.get('passcode', '')).strip()
        max_uses = request.data.get('max_uses')
        expires_at = request.data.get('expires_at')
        rotate = bool(request.data.get('rotate', False))

        if not passcode:
            return Response({'error': 'Passcode string is required.'}, status=status.HTTP_400_BAD_REQUEST)

        admin_actor = getattr(request, 'superadmin_payload', {}).get('username', 'superadmin')

        if rotate:
            LeadAccessPasscode.objects.filter(is_active=True).update(is_active=False)

        hashed = make_password(passcode)
        entry = LeadAccessPasscode.objects.create(
            label=label,
            passcode_hash=hashed,
            is_active=True,
            max_uses=max_uses if max_uses else None,
            expires_at=expires_at if expires_at else None,
            created_by=admin_actor
        )

        return Response(LeadAccessPasscodeSerializer(entry).data, status=status.HTTP_201_CREATED)

    def patch(self, request):
        passcode_id = request.data.get('id')
        if not passcode_id:
            return Response({'error': 'Passcode ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            entry = LeadAccessPasscode.objects.get(id=passcode_id)
        except LeadAccessPasscode.DoesNotExist:
            return Response({'error': 'Passcode not found.'}, status=status.HTTP_404_NOT_FOUND)

        if 'is_active' in request.data:
            entry.is_active = bool(request.data['is_active'])
        if 'label' in request.data:
            entry.label = str(request.data['label']).strip()
        if 'max_uses' in request.data:
            entry.max_uses = request.data['max_uses'] or None
        if 'expires_at' in request.data:
            entry.expires_at = request.data['expires_at'] or None
        if 'passcode' in request.data and str(request.data['passcode']).strip():
            raw_p = str(request.data['passcode']).strip()
            entry.passcode_hash = make_password(raw_p)
            if request.data.get('rotate'):
                LeadAccessPasscode.objects.exclude(id=entry.id).filter(is_active=True).update(is_active=False)
                entry.is_active = True

        entry.save()
        return Response(LeadAccessPasscodeSerializer(entry).data)

    def delete(self, request):
        passcode_id = request.query_params.get('id') or request.data.get('id')
        if not passcode_id:
            return Response({'error': 'Passcode ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            entry = LeadAccessPasscode.objects.get(id=passcode_id)
            entry.delete()
            return Response({'success': True, 'message': 'Passcode deleted successfully.'})
        except LeadAccessPasscode.DoesNotExist:
            return Response({'error': 'Passcode not found.'}, status=status.HTTP_404_NOT_FOUND)

class SuperAdminLeadStatsView(APIView):
    """
    GET /api/superadmin/leads/stats/
    Returns lead KPI counts, 30-day trends, and average extraction confidence.
    """
    permission_classes = [IsSuperAdminUser]

    def get(self, request):
        total = Lead.objects.filter(is_customer_confirmed=True).count()
        new_count = Lead.objects.filter(is_customer_confirmed=True, status='NEW').count()
        processing_count = Lead.objects.filter(is_customer_confirmed=True, status='PROCESSING').count()
        needs_review_count = Lead.objects.filter(is_customer_confirmed=True, status='NEEDS_REVIEW').count()
        verified_count = Lead.objects.filter(is_customer_confirmed=True, status='VERIFIED').count()
        failed_count = Lead.objects.filter(is_customer_confirmed=True, status='FAILED').count()
        archived_count = Lead.objects.filter(is_customer_confirmed=True, status='ARCHIVED').count()

        # Average confidence
        avg_conf = ExtractedContact.objects.filter(lead__is_customer_confirmed=True, is_primary=True).aggregate(
            avg=Avg('overall_confidence')
        )['avg'] or 0.0

        # Last 30 days daily trend
        start_date = timezone.now().date() - timedelta(days=29)
        daily_counts = {}
        for d in range(30):
            day_str = (start_date + timedelta(days=d)).strftime('%Y-%m-%d')
            daily_counts[day_str] = 0

        qs = Lead.objects.filter(is_customer_confirmed=True, created_at__date__gte=start_date).values('created_at__date').annotate(count=Count('id'))
        for item in qs:
            d_str = item['created_at__date'].strftime('%Y-%m-%d')
            if d_str in daily_counts:
                daily_counts[d_str] = item['count']

        trend_data = [{'date': k, 'count': v} for k, v in daily_counts.items()]

        return Response({
            'total': total,
            'new': new_count,
            'processing': processing_count,
            'needs_review': needs_review_count,
            'verified': verified_count,
            'failed': failed_count,
            'archived': archived_count,
            'avg_confidence': round(float(avg_conf), 3),
            'trend_30_days': trend_data,
        })

class LeadMediaAccessPermission(permissions.BasePermission):
    """
    Allows image/thumbnail streaming for:
    1. Preprocessed card thumbnails (?thumb=1)
    2. Valid Lead Passcode Token (query param ?token=... or header)
    3. SuperAdmin credentials / sessions
    """
    def has_permission(self, request, view):
        # Allow preprocessed thumbnail previews
        if request.query_params.get('thumb') in ('1', 'true', 'yes'):
            return True

        # Check SuperAdmin or Lead Passcode
        token = request.query_params.get('token') or request.headers.get('X-Lead-Passcode-Token')
        if not token:
            auth_header = request.headers.get('Authorization', '')
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if request.user and request.user.is_authenticated and request.user.is_superuser:
            return True

        if token:
            try:
                payload = jwt.decode(token, settings.LEAD_TOKEN_SECRET, algorithms=['HS256'])
                if payload.get('type') == 'lead_passcode_token' or payload.get('role') == 'superadmin' or payload.get('is_superuser'):
                    return True
            except Exception:
                pass

        return False

class SuperAdminMediaView(APIView):
    """
    GET /api/superadmin/media/<file_id>/
    Secure authenticated streaming for cards, PDFs, thumbnails, and audio files.
    """
    permission_classes = [LeadMediaAccessPermission]

    def get(self, request, file_id):
        # 1. Check if LeadFile
        lead_file = LeadFile.objects.filter(id=file_id).first()
        if lead_file:
            file_obj = None
            content_type = 'application/octet-stream'

            # If thumbnail requested, try preprocessed first
            if request.query_params.get('thumb') and lead_file.preprocessed_image:
                try:
                    if os.path.exists(lead_file.preprocessed_image.path):
                        file_obj = lead_file.preprocessed_image
                        content_type = 'image/jpeg'
                except Exception:
                    file_obj = None

            # Fallback to original file
            if not file_obj and lead_file.file:
                try:
                    if os.path.exists(lead_file.file.path):
                        file_obj = lead_file.file
                        content_type = lead_file.mime_type or 'image/jpeg'
                except Exception:
                    file_obj = None

            if file_obj and os.path.exists(file_obj.path):
                resp = FileResponse(open(file_obj.path, 'rb'), content_type=content_type)
                resp['Cache-Control'] = 'private, max-age=86400'
                return resp

        # 2. Check if LeadVoiceNote
        voice_note = LeadVoiceNote.objects.filter(id=file_id).first()
        if voice_note and voice_note.audio_file:
            try:
                if os.path.exists(voice_note.audio_file.path):
                    resp = FileResponse(
                        open(voice_note.audio_file.path, 'rb'),
                        content_type=voice_note.mime_type or 'audio/webm'
                    )
                    resp['Cache-Control'] = 'private, max-age=86400'
                    return resp
            except Exception:
                pass

        raise Http404('Media file not found.')
