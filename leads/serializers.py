import os
from rest_framework import serializers
from leads.models import (
    LeadAccessPasscode,
    LeadAccessLog,
    Lead,
    LeadFile,
    LeadVoiceNote,
    ExtractedContact,
    LeadAuditLog,
    LeadProcessingJob
)

class LeadAccessPasscodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadAccessPasscode
        fields = [
            'id', 'label', 'is_active', 'expires_at', 'max_uses',
            'uses_count', 'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'uses_count', 'created_at', 'updated_at']

class ExtractedContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtractedContact
        fields = [
            'id', 'source_file', 'source_type', 'name', 'company',
            'designation', 'phones', 'primary_phone', 'emails', 'websites',
            'address_raw', 'address_components', 'confidence',
            'overall_confidence', 'bounding_boxes', 'is_primary',
            'is_verified', 'edited_by_admin', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

def _append_token_to_url(url, request):
    if not request or not url:
        return url
    token = None
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    elif 'token' in request.query_params:
        token = request.query_params['token']
    elif hasattr(request, 'headers') and 'X-Lead-Passcode-Token' in request.headers:
        token = request.headers['X-Lead-Passcode-Token']
    
    if token:
        sep = '&' if '?' in url else '?'
        return f"{url}{sep}token={token}"
    return url

class LeadFileSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = LeadFile
        fields = [
            'id', 'original_filename', 'mime_type', 'size', 'sha256',
            'kind', 'page_count', 'processing_status', 'error_message',
            'raw_ocr_text', 'ocr_engine', 'download_url', 'thumbnail_url',
            'created_at'
        ]

    def get_download_url(self, obj):
        url = f"/api/superadmin/media/{obj.id}/"
        return _append_token_to_url(url, self.context.get('request'))

    def get_thumbnail_url(self, obj):
        if obj.preprocessed_image:
            url = f"/api/superadmin/media/{obj.id}/?thumb=1"
        else:
            url = f"/api/superadmin/media/{obj.id}/"
        return _append_token_to_url(url, self.context.get('request'))

class LeadVoiceNoteSerializer(serializers.ModelSerializer):
    stream_url = serializers.SerializerMethodField()

    class Meta:
        model = LeadVoiceNote
        fields = [
            'id', 'duration_seconds', 'mime_type', 'size',
            'transcript', 'transcript_language', 'transcription_status',
            'stream_url', 'created_at'
        ]

    def get_stream_url(self, obj):
        url = f"/api/superadmin/media/voice/{obj.id}/"
        return _append_token_to_url(url, self.context.get('request'))

class LeadAuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadAuditLog
        fields = ['id', 'actor', 'action', 'details', 'timestamp']

class LeadProcessingJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadProcessingJob
        fields = [
            'id', 'status', 'current_step', 'progress_percent',
            'attempts', 'max_retries', 'error_message', 'created_at', 'updated_at'
        ]

class LeadListSerializer(serializers.ModelSerializer):
    primary_contact = serializers.SerializerMethodField()
    files_count = serializers.IntegerField(source='files.count', read_only=True)
    voice_notes_count = serializers.IntegerField(source='voice_notes.count', read_only=True)
    first_card_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Lead
        fields = [
            'id', 'reference_code', 'customer_name_input', 'description',
            'status', 'priority', 'tags', 'created_at', 'updated_at',
            'primary_contact', 'files_count', 'voice_notes_count',
            'first_card_thumbnail'
        ]

    def get_primary_contact(self, obj):
        primary = obj.contacts.filter(is_primary=True).first() or obj.contacts.first()
        if primary:
            return {
                'id': str(primary.id),
                'name': primary.name,
                'company': primary.company,
                'designation': primary.designation,
                'phone': primary.primary_phone,
                'email': primary.emails[0] if primary.emails else '',
                'address': primary.address_raw,
                'overall_confidence': primary.overall_confidence,
                'is_verified': primary.is_verified,
            }
        return None

    def get_first_card_thumbnail(self, obj):
        f = obj.files.first()
        if f:
            if f.preprocessed_image:
                url = f"/api/superadmin/media/{f.id}/?thumb=1"
            else:
                url = f"/api/superadmin/media/{f.id}/"
            return _append_token_to_url(url, self.context.get('request'))
        return None

class LeadDetailSerializer(serializers.ModelSerializer):
    files = LeadFileSerializer(many=True, read_only=True)
    voice_notes = LeadVoiceNoteSerializer(many=True, read_only=True)
    contacts = ExtractedContactSerializer(many=True, read_only=True)
    audit_logs = LeadAuditLogSerializer(many=True, read_only=True)
    job = LeadProcessingJobSerializer(read_only=True)

    class Meta:
        model = Lead
        fields = [
            'id', 'reference_code', 'customer_name_input', 'description',
            'status', 'priority', 'tags', 'source_ip', 'user_agent',
            'verified_by', 'verified_at', 'internal_notes',
            'created_at', 'updated_at', 'files', 'voice_notes',
            'contacts', 'audit_logs', 'job'
        ]

