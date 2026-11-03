import io
import qrcode
from PIL import Image, ImageDraw, ImageFont
from django.test import TestCase
from leads.models import Lead, LeadFile, ExtractedContact
from leads.pipeline.qr_detector import detect_qr_codes, is_safe_public_url, parse_vcard_payload, parse_mecard_payload
from leads.pipeline.ocr_engine import extract_text_from_image
from leads.pipeline.merger import merge_and_save_contacts

class QRAndPipelineTests(TestCase):
    def test_ssrf_protection(self):
        """Validates that SSRF guard actively blocks loopback, private, and metadata IPs."""
        self.assertFalse(is_safe_public_url('http://127.0.0.1:8000/admin'))
        self.assertFalse(is_safe_public_url('http://localhost:5000/'))
        self.assertFalse(is_safe_public_url('http://169.254.169.254/latest/meta-data/'))
        self.assertFalse(is_safe_public_url('http://192.168.1.1/router'))
        self.assertFalse(is_safe_public_url('http://10.0.0.1/internal'))
        self.assertFalse(is_safe_public_url('http://0.0.0.0/'))

    def test_vcard_and_mecard_parsers(self):
        vcard = """BEGIN:VCARD
VERSION:3.0
FN:Dr. Rutvik Ahir
ORG:Okhai Pharma Intermediates
TITLE:Commercial Director
TEL;TYPE=WORK,VOICE:+919825011223
EMAIL;TYPE=PREF,INTERNET:rutvik@okhaipharma.com
URL:https://okhaipharma.com
ADR;TYPE=WORK:;;Plot 42 GIDC;Ankleshwar;Gujarat;393002;India
END:VCARD"""
        data = parse_vcard_payload(vcard)
        self.assertEqual(data['name'], "Dr. Rutvik Ahir")
        self.assertEqual(data['company'], "Okhai Pharma Intermediates")
        self.assertEqual(data['designation'], "Commercial Director")
        self.assertEqual(data['phones'][0]['raw'], "+919825011223")
        self.assertEqual(data['emails'][0], "rutvik@okhaipharma.com")
        self.assertEqual(data['address_components'].get('postal_code'), "393002")

        mecard = "MECARD:N:Patel,Rajesh;ORG:Gujarat Agro;TEL:+919824012345;EMAIL:rajesh@agro.com;;"
        m_data = parse_mecard_payload(mecard)
        self.assertEqual(m_data['name'], "Patel Rajesh")
        self.assertEqual(m_data['company'], "Gujarat Agro")
        self.assertEqual(m_data['phones'][0]['raw'], "+919824012345")

    def test_synthetic_qr_detection(self):
        """Generates synthetic QR code containing vCard and verifies QR detector extracts it."""
        vcard_text = """BEGIN:VCARD
VERSION:3.0
FN:Satyen Chudasama
ORG:Okhai Quality Labs
TEL:+919898099887
EMAIL:satyen@okhaipharma.com
END:VCARD"""
        qr_img = qrcode.make(vcard_text)
        pil_img = qr_img.convert('RGB')

        detected = detect_qr_codes(pil_img)
        self.assertGreaterEqual(len(detected), 1)
        qr_contact = detected[0]
        self.assertEqual(qr_contact['name'], "Satyen Chudasama")
        self.assertEqual(qr_contact['company'], "Okhai Quality Labs")
        self.assertTrue(any("+919898099887" in p['raw'] for p in qr_contact['phones']))

    def test_synthetic_card_ocr_and_merger(self):
        """Generates synthetic business card image and runs complete OCR and merger pipeline."""
        card = Image.new('RGB', (800, 480), color=(255, 255, 255))
        draw = ImageDraw.Draw(card)

        # Draw clear card text lines
        draw.text((40, 40), "OKHAI PHARMA CHEMICALS PVT LTD", fill=(30, 61, 42))
        draw.text((40, 80), "Dr. Lakhaman Odedra", fill=(0, 0, 0))
        draw.text((40, 115), "Managing Director", fill=(91, 154, 60))
        draw.text((40, 170), "National Highway 8B, GIDC Ranavav", fill=(60, 60, 60))
        draw.text((40, 200), "Porbandar, Gujarat - 360550", fill=(60, 60, 60))
        draw.text((40, 250), "Mob: +91 99099 22334", fill=(0, 0, 0))
        draw.text((40, 280), "Email: contact@okhaipharma.com", fill=(0, 0, 0))
        draw.text((40, 310), "www.okhaipharma.com", fill=(0, 0, 0))

        # Run OCR
        ocr_txt, boxes, conf, engine, prep_img = extract_text_from_image(card)
        self.assertTrue(len(ocr_txt) > 0)

        # Test Idempotent Merger
        lead = Lead.objects.create(
            reference_code="LD-2026-999999",
            status="PROCESSING"
        )
        candidates = [{
            'source_file': None,
            'source_type': 'OCR',
            'name': 'Dr. Lakhaman Odedra',
            'company': 'OKHAI PHARMA CHEMICALS PVT LTD',
            'designation': 'Managing Director',
            'phones': [{'raw': '+91 99099 22334', 'e164': '+919909922334', 'type': 'mobile'}],
            'primary_phone': '+919909922334',
            'emails': ['contact@okhaipharma.com'],
            'websites': ['https://okhaipharma.com'],
            'address_raw': 'National Highway 8B, GIDC Ranavav, Gujarat - 360550',
            'address_components': {'city': 'Porbandar', 'state': 'Gujarat', 'postal_code': '360550', 'country': 'India'},
            'confidence': {'name': 0.95, 'phones': 0.98, 'address': 0.95, 'company': 0.95},
            'overall_confidence': 0.96
        }]

        contacts = merge_and_save_contacts(lead, candidates)
        self.assertEqual(len(contacts), 1)
        c = contacts[0]
        self.assertEqual(c.primary_phone, "+919909922334")
        self.assertEqual(c.company, "OKHAI PHARMA CHEMICALS PVT LTD")
        self.assertTrue(c.is_primary)
        self.assertEqual(lead.status, "VERIFIED")

