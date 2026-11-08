from django.contrib import admin
from .models import (
    LeadAccessPasscode,
    LeadAccessLog,
    Lead,
    LeadFile,
    LeadVoiceNote,
    ExtractedContact,
    LeadAuditLog,
    LeadProcessingJob
)

@admin.register(LeadAccessPasscode)
class LeadAccessPasscodeAdmin(admin.ModelAdmin):
    list_display = ('label', 'is_active', 'uses_count', 'max_uses', 'expires_at', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('label',)

@admin.register(LeadAccessLog)
class LeadAccessLogAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'success', 'passcode_label', 'created_at')
    list_filter = ('success', 'created_at')
    search_fields = ('ip_address', 'passcode_label')

class LeadFileInline(admin.TabularInline):
    model = LeadFile
    extra = 0
    fields = ('original_filename', 'kind', 'processing_status', 'page_count', 'size')
    readonly_fields = fields

class LeadVoiceNoteInline(admin.TabularInline):
    model = LeadVoiceNote
    extra = 0
    fields = ('duration_seconds', 'transcription_status', 'transcript')
    readonly_fields = ('duration_seconds', 'transcription_status')

class ExtractedContactInline(admin.StackedInline):
    model = ExtractedContact
    extra = 0

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'status', 'priority', 'customer_name_input', 'created_at')
    list_filter = ('status', 'priority', 'created_at')
    search_fields = ('reference_code', 'customer_name_input', 'description')
    inlines = [LeadFileInline, LeadVoiceNoteInline, ExtractedContactInline]

@admin.register(ExtractedContact)
class ExtractedContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'primary_phone', 'overall_confidence', 'is_primary', 'is_verified')
    list_filter = ('is_primary', 'is_verified', 'source_type')
    search_fields = ('name', 'company', 'primary_phone', 'address_raw')

@admin.register(LeadAuditLog)
class LeadAuditLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'lead', 'actor', 'action')
    list_filter = ('action', 'timestamp')
    search_fields = ('lead__reference_code', 'actor', 'action')

@admin.register(LeadProcessingJob)
class LeadProcessingJobAdmin(admin.ModelAdmin):
    list_display = ('lead', 'status', 'current_step', 'progress_percent', 'attempts', 'updated_at')
    list_filter = ('status',)

