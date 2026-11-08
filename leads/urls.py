from django.urls import path
from leads.views import (
    LeadUnlockView,
    LeadVerifySessionView,
    LeadSubmitView,
    LeadStatusView,
    LeadCustomerContactUpdateView,
    LeadSendBrochureEmailView
)
from leads.superadmin_views import (
    SuperAdminLeadListView,
    SuperAdminLeadDetailView,
    SuperAdminLeadReprocessView,
    SuperAdminLeadBulkView,
    SuperAdminLeadExportView,
    SuperAdminPasscodesView,
    SuperAdminLeadStatsView,
    SuperAdminMediaView
)

urlpatterns = [
    # =========================================================================
    # PUBLIC LEAD ENDPOINTS (Passcode-protected)
    # =========================================================================
    path('lead/unlock/', LeadUnlockView.as_view(), name='lead-unlock'),
    path('lead/verify-session/', LeadVerifySessionView.as_view(), name='lead-verify-session'),
    path('lead/submit/', LeadSubmitView.as_view(), name='lead-submit'),
    path('lead/status/<uuid:id>/', LeadStatusView.as_view(), name='lead-status'),
    path('lead/contact/<uuid:id>/', LeadCustomerContactUpdateView.as_view(), name='lead-customer-contact-update'),
    path('lead/send-brochure-email/', LeadSendBrochureEmailView.as_view(), name='lead-send-brochure-email'),

    # =========================================================================
    # SUPERADMIN ENDPOINTS
    # =========================================================================
    path('superadmin/leads/', SuperAdminLeadListView.as_view(), name='superadmin-leads-list'),
    path('superadmin/leads/stats/', SuperAdminLeadStatsView.as_view(), name='superadmin-leads-stats'),
    path('superadmin/leads/export/', SuperAdminLeadExportView.as_view(), name='superadmin-leads-export'),
    path('superadmin/leads/bulk/', SuperAdminLeadBulkView.as_view(), name='superadmin-leads-bulk'),
    path('superadmin/leads/<uuid:id>/', SuperAdminLeadDetailView.as_view(), name='superadmin-lead-detail'),
    path('superadmin/leads/<uuid:id>/reprocess/', SuperAdminLeadReprocessView.as_view(), name='superadmin-lead-reprocess'),
    path('superadmin/lead-passcodes/', SuperAdminPasscodesView.as_view(), name='superadmin-passcodes'),
    path('superadmin/media/<uuid:file_id>/', SuperAdminMediaView.as_view(), name='superadmin-media-file'),
    path('superadmin/media/voice/<uuid:file_id>/', SuperAdminMediaView.as_view(), name='superadmin-media-voice'),
]
