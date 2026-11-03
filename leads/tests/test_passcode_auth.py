import time
from django.test import TestCase, Client
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from datetime import timedelta
from leads.models import LeadAccessPasscode, LeadAccessLog

class LeadPasscodeAuthTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_pin = "889900"
        self.passcode = LeadAccessPasscode.objects.create(
            label="Headquarters Desk PIN",
            passcode_hash=make_password(self.test_pin),
            is_active=True
        )

    def test_successful_unlock(self):
        resp = self.client.post(
            '/api/lead/unlock/',
            data={'passcode': self.test_pin},
            content_type='application/json'
        )
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertTrue(data['success'])
        self.assertIn('token', data)
        self.assertEqual(data['label'], "Headquarters Desk PIN")

        # Verify access log was recorded
        log = LeadAccessLog.objects.filter(success=True).first()
        self.assertIsNotNone(log)
        self.assertEqual(log.passcode_label, "Headquarters Desk PIN")

    def test_invalid_passcode_fails(self):
        resp = self.client.post(
            '/api/lead/unlock/',
            data={'passcode': '000000'},
            content_type='application/json'
        )
        self.assertEqual(resp.status_code, 401)
        data = resp.json()
        self.assertIn('attempts_remaining', data)
        self.assertEqual(data['attempts_remaining'], 4)

    def test_rate_limiting_and_lockout(self):
        # Fire 5 failed attempts
        for i in range(5):
            r = self.client.post(
                '/api/lead/unlock/',
                data={'passcode': f'wrong_{i}'},
                content_type='application/json'
            )

        # 6th attempt should be blocked with 429 Too Many Requests
        lockout_resp = self.client.post(
            '/api/lead/unlock/',
            data={'passcode': self.test_pin},
            content_type='application/json'
        )
        self.assertEqual(lockout_resp.status_code, 429)
        data = lockout_resp.json()
        self.assertTrue(data['locked'])
        self.assertGreater(data['lockout_seconds'], 0)

    def test_inactive_passcode_rejected(self):
        self.passcode.is_active = False
        self.passcode.save()

        resp = self.client.post(
            '/api/lead/unlock/',
            data={'passcode': self.test_pin},
            content_type='application/json'
        )
        self.assertEqual(resp.status_code, 401)

    def test_expired_passcode_rejected(self):
        self.passcode.expires_at = timezone.now() - timedelta(days=1)
        self.passcode.save()

        resp = self.client.post(
            '/api/lead/unlock/',
            data={'passcode': self.test_pin},
            content_type='application/json'
        )
        self.assertEqual(resp.status_code, 401)

