import io
import jwt
from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings
from django.contrib.auth.hashers import make_password
from leads.models import (
    Lead,
    LeadFile,
    ExtractedContact,
    LeadAccessPasscode
)

class ApiAndSuperAdminTests(TestCase):
    def setUp(self):
        self.client = Client()
        # Seed passcode
        self.passcode = LeadAccessPasscode.objects.create(
            label="Test Passcode",
            passcode_hash=make_password("112233"),
            is_active=True
        )

        # Generate customer passcode token
        unlock_resp = self.client.post('/api/lead/unlock/', {'passcode': '112233'}, content_type='application/json')
        self.customer_token = unlock_resp.json()['token']

        # Generate Superadmin JWT
        self.admin_jwt = jwt.encode(
            {
                'id': 1,
                'username': 'superadmin',
                'email': 'admin@okhaipharma.com',
                'role': 'superadmin'
            },
            settings.LEAD_TOKEN_SECRET,
            algorithm='HS256'
        )

    def test_submit_lead_with_file_and_voice(self):
        # Create small test image
        img_bytes = io.BytesIO()
        from PIL import Image
        img = Image.new('RGB', (100, 100), color=(255, 255, 255))
        img.save(img_bytes, format='JPEG')
        img_bytes.seek(0)

        upload_file = SimpleUploadedFile(
            "business_card.jpg",
            img_bytes.getvalue(),
            content_type="image/jpeg"
        )

        voice_file = SimpleUploadedFile(
            "voice_note.webm",
            b"RIFF\x24\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00D\xac\x00\x00\x88X\x01\x00\x02\x00\x10\x00data\x00\x00\x00\x00",
            content_type="audio/webm"
        )

        resp = self.client.post(
            '/api/lead/submit/',
            {
                'customer_name_input': 'Mr. Rutvik Ahir',
                'description': 'Looking for 200 MT Pure Nicotine USP 99.5% annual contract.',
                'files': [upload_file],
                'voice_notes': [voice_file],
            },
            HTTP_X_LEAD_PASSCODE_TOKEN=self.customer_token
        )

        if resp.status_code != 201:
            print("ERROR IN SUBMIT:", resp.status_code, resp.content)

        self.assertEqual(resp.status_code, 201)
        data = resp.json()
        self.assertTrue(data['success'])
        self.assertIn('reference_code', data)
        self.assertTrue(data['reference_code'].startswith('LD-2026-'))

        lead_id = data['lead_id']

        # Verify status polling endpoint
        status_resp = self.client.get(f'/api/lead/status/{lead_id}/')
        self.assertEqual(status_resp.status_code, 200)
        s_data = status_resp.json()
        self.assertEqual(s_data['files_count'], 1)
        self.assertEqual(s_data['voice_notes_count'], 1)

    def test_superadmin_permission_denied_without_auth(self):
        # Unauthenticated request to superadmin leads list must be rejected
        resp = self.client.get('/api/superadmin/leads/')
        self.assertEqual(resp.status_code, 403)

    def test_superadmin_lead_list_and_filters(self):
        # Create lead with contact (confirmed)
        lead = Lead.objects.create(
            reference_code="LD-2026-000001",
            status="NEW",
            is_customer_confirmed=True
        )
        ExtractedContact.objects.create(
            lead=lead,
            name="Amit Patel",
            company="Gujarat Alkalies",
            primary_phone="+919825000000",
            overall_confidence=0.92,
            is_primary=True
        )

        # Create unconfirmed lead - must NOT be returned in superadmin
        unconfirmed = Lead.objects.create(
            reference_code="LD-2026-000099",
            status="PROCESSING",
            is_customer_confirmed=False
        )

        resp = self.client.get(
            '/api/superadmin/leads/',
            HTTP_AUTHORIZATION=f'Bearer {self.admin_jwt}'
        )
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn('leads', data)
        codes = [l['reference_code'] for l in data['leads']]
        self.assertIn("LD-2026-000001", codes)
        self.assertNotIn("LD-2026-000099", codes)

    def test_superadmin_patch_contact(self):
        lead = Lead.objects.create(
            reference_code="LD-2026-000002",
            status="NEEDS_REVIEW"
        )
        contact = ExtractedContact.objects.create(
            lead=lead,
            name="Initial Name",
            primary_phone="+919825011111",
            overall_confidence=0.75,
            is_primary=True
        )

        # Patch name and verify
        patch_resp = self.client.patch(
            f'/api/superadmin/leads/{lead.id}/',
            data={
                'status': 'VERIFIED',
                'priority': 'urgent',
                'contact': {
                    'id': str(contact.id),
                    'name': 'Verified Correct Name',
                    'is_verified': True
                }
            },
            content_type='application/json',
            HTTP_AUTHORIZATION=f'Bearer {self.admin_jwt}'
        )
        self.assertEqual(patch_resp.status_code, 200)
        updated_lead = Lead.objects.get(id=lead.id)
        self.assertEqual(updated_lead.status, 'VERIFIED')
        self.assertEqual(updated_lead.priority, 'urgent')
        updated_contact = ExtractedContact.objects.get(id=contact.id)
        self.assertEqual(updated_contact.name, 'Verified Correct Name')
        self.assertTrue(updated_contact.is_verified)
        self.assertTrue(updated_contact.edited_by_admin)

    def test_superadmin_exports_csv_and_xlsx(self):
        # CSV Export
        csv_resp = self.client.get(
            '/api/superadmin/leads/export/?format=csv',
            HTTP_AUTHORIZATION=f'Bearer {self.admin_jwt}'
        )
        self.assertEqual(csv_resp.status_code, 200)
        self.assertEqual(csv_resp['Content-Type'], 'text/csv')

        # XLSX Export
        xlsx_resp = self.client.get(
            '/api/superadmin/leads/export/?format=xlsx',
            HTTP_AUTHORIZATION=f'Bearer {self.admin_jwt}'
        )
        self.assertEqual(xlsx_resp.status_code, 200)
        self.assertIn('spreadsheetml', xlsx_resp['Content-Type'])
