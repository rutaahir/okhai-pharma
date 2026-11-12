import uuid
import os
from django.db import models
from django.utils import timezone
from django.conf import settings

def lead_file_upload_path(instance, filename):
    lead_id = str(instance.lead.id)
    ext = os.path.splitext(filename)[1].lower()
    unique_name = f"{uuid.uuid4().hex}{ext}"
    return os.path.join('files', lead_id, unique_name)

def lead_preprocessed_upload_path(instance, filename):
    lead_id = str(instance.lead.id)
    ext = os.path.splitext(filename)[1].lower()
    unique_name = f"prep_{uuid.uuid4().hex}{ext}"
    return os.path.join('preprocessed', lead_id, unique_name)

def lead_voice_upload_path(instance, filename):
    lead_id = str(instance.lead.id)
    ext = os.path.splitext(filename)[1].lower() or '.webm'
    unique_name = f"voice_{uuid.uuid4().hex}{ext}"
    return os.path.join('voice', lead_id, unique_name)

class LeadAccessPasscode(models.Model):
    label = models.CharField(max_length=100)
    passcode_hash = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    max_uses = models.IntegerField(null=True, blank=True)
    uses_count = models.IntegerField(default=0)
    created_by = models.CharField(max_length=150, default='system')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def is_valid(self):
        if not self.is_active:
            return False
        if self.expires_at and timezone.now() > self.expires_at:
            return False
        if self.max_uses is not None and self.uses_count >= self.max_uses:
            return False
        return True

    def __str__(self):
        return f"{self.label} ({'Active' if self.is_active else 'Inactive'})"

class LeadAccessLog(models.Model):
    ip_address = models.GenericIPAddressField(null=True, blank=True, db_index=True)
    user_agent = models.TextField(blank=True, default='')
    success = models.BooleanField(default=False)
    passcode_label = models.CharField(max_length=100, blank=True, default='')
    reason = models.CharField(max_length=255, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.ip_address} - {'Success' if self.success else 'Failed'} at {self.created_at}"

class Lead(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'New'),
        ('PROCESSING', 'Processing'),
        ('NEEDS_REVIEW', 'Needs Review'),
        ('VERIFIED', 'Verified'),
        ('PARTIAL', 'Partial'),
        ('FAILED', 'Failed'),
        ('ARCHIVED', 'Archived'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('normal', 'Normal'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_code = models.CharField(max_length=32, unique=True, db_index=True)
    customer_name_input = models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW', db_index=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='normal')
    tags = models.JSONField(default=list, blank=True)
    source_ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True, default='')
    is_customer_confirmed = models.BooleanField(default=False, db_index=True)
    verified_by = models.CharField(max_length=150, blank=True, default='')
    verified_at = models.DateTimeField(null=True, blank=True)
    internal_notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['reference_code']),
        ]

    def __str__(self):
        return f"{self.reference_code} [{self.status}]"

    @classmethod
    def generate_reference_code(cls):
        year = timezone.now().year
        prefix = f"LD-{year}-"
        # Find highest sequence for current year
        last_lead = cls.objects.filter(reference_code__startswith=prefix).order_by('-reference_code').first()
        if last_lead:
            try:
                last_seq = int(last_lead.reference_code.split('-')[-1])
                seq = last_seq + 1
            except (ValueError, IndexError):
                seq = cls.objects.filter(reference_code__startswith=prefix).count() + 1
        else:
            seq = 1
        return f"{prefix}{seq:06d}"

class LeadFile(models.Model):
    KIND_CHOICES = [
        ('CARD', 'Business Card'),
        ('BROCHURE', 'Brochure'),
        ('QR', 'QR Code'),
        ('PDF', 'PDF Document'),
        ('OTHER', 'Other'),
    ]

    PROCESSING_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('DONE', 'Done'),
        ('FAILED', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to=lead_file_upload_path, max_length=500)
    original_filename = models.CharField(max_length=255)
    mime_type = models.CharField(max_length=100)
    size = models.BigIntegerField()
    sha256 = models.CharField(max_length=64, db_index=True)
    kind = models.CharField(max_length=20, choices=KIND_CHOICES, default='OTHER')
    page_count = models.IntegerField(default=1)
    processing_status = models.CharField(max_length=20, choices=PROCESSING_STATUS_CHOICES, default='PENDING')
    error_code = models.CharField(max_length=50, blank=True, default='')
    error_message = models.TextField(blank=True, default='')
    raw_ocr_text = models.TextField(blank=True, default='')
    ocr_engine = models.CharField(max_length=100, blank=True, default='')
    preprocessed_image = models.FileField(upload_to=lead_preprocessed_upload_path, null=True, blank=True, max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.original_filename} ({self.kind}) - {self.processing_status}"

class LeadVoiceNote(models.Model):
    TRANSCRIPTION_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('DONE', 'Done'),
        ('SKIPPED', 'Skipped'),
        ('FAILED', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='voice_notes')
    audio_file = models.FileField(upload_to=lead_voice_upload_path, max_length=500)
    duration_seconds = models.FloatField(default=0.0)
    mime_type = models.CharField(max_length=100)
    size = models.BigIntegerField()
    transcript = models.TextField(null=True, blank=True)
    transcript_language = models.CharField(max_length=20, blank=True, default='')
    transcription_status = models.CharField(max_length=20, choices=TRANSCRIPTION_STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"VoiceNote {self.id} ({self.duration_seconds}s)"

class ExtractedContact(models.Model):
    SOURCE_TYPE_CHOICES = [
        ('OCR', 'OCR'),
        ('QR', 'QR Code'),
        ('VCARD', 'vCard'),
        ('MANUAL', 'Manual'),
        ('VOICE', 'Voice Note'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='contacts')
    source_file = models.ForeignKey(LeadFile, on_delete=models.SET_NULL, null=True, blank=True, related_name='contacts')
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPE_CHOICES, default='OCR')
    name = models.CharField(max_length=255, blank=True, default='', db_index=True)
    company = models.CharField(max_length=255, blank=True, default='')
    designation = models.CharField(max_length=255, blank=True, default='')
    phones = models.JSONField(default=list, blank=True)
    primary_phone = models.CharField(max_length=50, blank=True, default='', db_index=True)
    emails = models.JSONField(default=list, blank=True)
    websites = models.JSONField(default=list, blank=True)
    address_raw = models.TextField(blank=True, default='')
    address_components = models.JSONField(default=dict, blank=True)
    confidence = models.JSONField(default=dict, blank=True)
    overall_confidence = models.FloatField(default=0.0, db_index=True)
    bounding_boxes = models.JSONField(default=list, blank=True)
    is_primary = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    edited_by_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_primary', '-overall_confidence']
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['primary_phone']),
            models.Index(fields=['overall_confidence']),
        ]

    def __str__(self):
        return f"{self.name or 'Unknown'} ({self.company or 'No Org'}) - Conf: {self.overall_confidence:.2f}"

class LeadAuditLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='audit_logs')
    actor = models.CharField(max_length=150, default='system')
    action = models.CharField(max_length=100)
    details = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"[{self.timestamp}] {self.actor}: {self.action} on {self.lead.reference_code}"

class LeadProcessingJob(models.Model):
    JOB_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('QUEUED', 'Queued'),
        ('RUNNING', 'Running'),
        ('PROCESSING', 'Processing'),
        ('SUCCEEDED', 'Succeeded'),
        ('COMPLETED', 'Completed'),
        ('PARTIAL', 'Partial'),
        ('FAILED', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.OneToOneField(Lead, on_delete=models.CASCADE, related_name='job')
    status = models.CharField(max_length=20, choices=JOB_STATUS_CHOICES, default='PENDING', db_index=True)
    current_step = models.CharField(max_length=100, default='Queued')
    progress_percent = models.IntegerField(default=0)
    attempts = models.IntegerField(default=0)
    max_retries = models.IntegerField(default=3)
    error_message = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Job for {self.lead.reference_code} [{self.status} {self.progress_percent}%]"


class LeadCommunication(models.Model):
    CHANNEL_CHOICES = [
        ('EMAIL', 'Email'),
        ('WHATSAPP', 'WhatsApp'),
    ]
    STATUS_CHOICES = [
        ('SENT', 'Sent'),
        ('OPENED_WHATSAPP', 'Opened in WhatsApp'),
        ('FAILED', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='communications')
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES, db_index=True)
    recipient = models.CharField(max_length=255)
    subject = models.CharField(max_length=255, blank=True, default='')
    message_html = models.TextField(blank=True, default='')
    message_text = models.TextField(blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SENT')
    sender = models.CharField(max_length=150, default='superadmin')
    error_message = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.channel} to {self.recipient} [{self.status}]"
