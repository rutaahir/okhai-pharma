import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Save,
  RotateCw,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  FileText,
  Volume2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Building,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  Plus,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileCheck,
  Download,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  getSuperAdminLeadDetail,
  updateSuperAdminLead,
  reprocessSuperAdminLead,
  getAuthenticatedMediaUrl
} from '../../services/leadApi';
import {
  LeadDetailItem,
  ExtractedContact,
  LeadFileItem,
  LeadVoiceNoteItem
} from '../../types/lead';

export const AdminLeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authFetch, admin } = useAdminAuth();

  const [lead, setLead] = useState<LeadDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isReprocessing, setIsReprocessing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Selected File for Viewer
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [showRawOcr, setShowRawOcr] = useState<boolean>(false);

  // Editable Contact State
  const [contactForm, setContactForm] = useState<Partial<ExtractedContact>>({});
  const [leadStatus, setLeadStatus] = useState<string>('NEEDS_REVIEW');
  const [priority, setPriority] = useState<string>('normal');
  const [internalNotes, setInternalNotes] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load Lead Detail
  const fetchLead = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await getSuperAdminLeadDetail(authFetch, id);
      setLead(data);
      setLeadStatus(data.status);
      setPriority(data.priority);
      setInternalNotes(data.internal_notes || '');

      const primary = data.contacts?.find((c) => c.is_primary) || data.contacts?.[0] || {};
      setContactForm({
        id: primary.id,
        name: primary.name || '',
        company: primary.company || '',
        designation: primary.designation || '',
        phones: primary.phones ? [...primary.phones] : [],
        emails: primary.emails ? [...primary.emails] : [],
        websites: primary.websites ? [...primary.websites] : [],
        address_raw: primary.address_raw || '',
        address_components: primary.address_components ? { ...primary.address_components } : {},
        is_verified: primary.is_verified || false,
      });
    } catch (err: any) {
      showToast(err.message || 'Error loading lead details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  // Keyboard Shortcuts (Ctrl+S to save, Ctrl+Shift+V to verify, Esc to return)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        handleVerifyLead();
      } else if (e.key === 'Escape') {
        navigate('/admin/leads');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contactForm, leadStatus, priority, internalNotes]);

  // Save changes
  const handleSave = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      const updated = await updateSuperAdminLead(authFetch, id, {
        status: leadStatus,
        priority,
        internal_notes: internalNotes,
        contact: contactForm,
      });
      setLead(updated);
      showToast('Lead changes saved successfully.');
    } catch (err: any) {
      showToast(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  // One-click Verify
  const handleVerifyLead = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      const updated = await updateSuperAdminLead(authFetch, id, {
        status: 'VERIFIED',
        contact: {
          ...contactForm,
          is_verified: true,
        },
      });
      setLead(updated);
      setLeadStatus('VERIFIED');
      setContactForm((prev) => ({ ...prev, is_verified: true }));
      showToast('Lead marked as VERIFIED.');
    } catch (err: any) {
      showToast(err.message || 'Verification failed');
    } finally {
      setIsSaving(false);
    }
  };

  // Re-run extraction pipeline
  const handleReprocess = async () => {
    if (!id) return;
    setIsReprocessing(true);
    try {
      const res = await reprocessSuperAdminLead(authFetch, id);
      showToast(res.message || 'Extraction pipeline re-queued.');
      // Refresh lead after 4 seconds
      setTimeout(fetchLead, 4000);
    } catch (err: any) {
      showToast(err.message || 'Reprocess failed');
    } finally {
      setIsReprocessing(false);
    }
  };

  // Helpers for editing phone list
  const handlePhoneChange = (idx: number, field: string, val: string) => {
    const list = [...(contactForm.phones || [])];
    list[idx] = { ...list[idx], [field]: val };
    setContactForm({ ...contactForm, phones: list });
  };

  const handleAddPhone = () => {
    const list = [...(contactForm.phones || [])];
    list.push({ raw: '', e164: '', country: 'IN', type: 'mobile' });
    setContactForm({ ...contactForm, phones: list });
  };

  const handleRemovePhone = (idx: number) => {
    const list = [...(contactForm.phones || [])].filter((_, i) => i !== idx);
    setContactForm({ ...contactForm, phones: list });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-[#1E3D2A]/60">
        <Loader2 className="w-8 h-8 animate-spin text-[#5B9A3C]" />
        <span className="text-xs font-mono">Loading lead details and document viewer...</span>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-8 text-center text-[#1E3D2A]/60">
        <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
        <h3 className="text-base font-bold text-[#1E3D2A]">Lead not found</h3>
        <Link to="/admin/leads" className="text-xs text-[#5B9A3C] underline mt-2 inline-block">
          Return to Leads Table
        </Link>
      </div>
    );
  }

  const activeFile: LeadFileItem | undefined = lead.files?.[selectedFileIdx];
  const primaryContact = lead.contacts?.find((c) => c.is_primary) || lead.contacts?.[0];
  const confidence = primaryContact?.confidence || {};

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-[#1E3D2A] text-white shadow-2xl border border-white/15 text-xs flex items-center gap-3 animate-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-[#8CC63F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          TOP ACTION BAR
      ===================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#1E3D2A]/10 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/leads')}
            className="p-2 rounded-xl border border-[#1E3D2A]/15 hover:bg-[#F8F9F4] text-[#1E3D2A] transition-colors cursor-pointer"
            title="Back to leads (Esc)"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-[#1E3D2A]">
                {lead.reference_code}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                leadStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {leadStatus}
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#1E3D2A]/50 mt-0.5">
              Submitted on {new Date(lead.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              {lead.verified_by && ` · Verified by ${lead.verified_by}`}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <button
            type="button"
            disabled={isReprocessing}
            onClick={handleReprocess}
            className="px-3.5 py-2 rounded-xl border border-[#1E3D2A]/15 bg-white hover:bg-[#F8F9F4] text-xs font-semibold text-[#1E3D2A] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Re-run OCR and extraction pipeline"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#5B9A3C] ${isReprocessing ? 'animate-spin' : ''}`} />
            <span>Re-run Extraction</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="px-4 py-2 rounded-xl border border-[#1E3D2A]/20 bg-white hover:bg-[#F4F9F1] text-xs font-semibold text-[#1E3D2A] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Save changes (Ctrl+S)"
          >
            <Save className="w-3.5 h-3.5 text-[#5B9A3C]" />
            <span>Save</span>
          </button>

          <button
            type="button"
            disabled={isSaving || leadStatus === 'VERIFIED'}
            onClick={handleVerifyLead}
            className="px-4 py-2 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            title="Verify lead (Ctrl+Shift+V)"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Verify Lead</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          SPLIT VIEW: DOCUMENT VIEWER (LEFT) & INLINE EDITABLE FORM (RIGHT)
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ===================================================================
            LEFT PANEL: INTERACTIVE DOCUMENT & CARD VIEWER (Col 6)
        =================================================================== */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#1E3D2A]/10 shadow-xs space-y-4">
            
            {/* Viewer Header & File Tabs */}
            <div className="flex items-center justify-between border-b border-[#1E3D2A]/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#5B9A3C]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
                  Uploaded Documents ({lead.files.length})
                </h3>
              </div>

              {/* View Raw OCR Text Toggle */}
              <button
                type="button"
                onClick={() => setShowRawOcr(!showRawOcr)}
                className="text-[11px] font-mono text-[#5B9A3C] font-semibold hover:underline cursor-pointer"
              >
                {showRawOcr ? 'Show Card Image' : 'Show Raw OCR Text'}
              </button>
            </div>

            {/* Document Thumbnail Strip (Always visible for all uploaded files) */}
            {lead.files && lead.files.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#1E3D2A]/60">
                  <span>SELECT DOCUMENT TO INSPECT:</span>
                  <span>{selectedFileIdx + 1} of {lead.files.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {lead.files.map((file, idx) => {
                    const isSelected = selectedFileIdx === idx;
                    const authThumb = getAuthenticatedMediaUrl(file.thumbnail_url || file.download_url);
                    const isPdf = file.mime_type?.includes('pdf') || file.original_filename?.toLowerCase().endsWith('.pdf');

                    return (
                      <button
                        key={file.id}
                        type="button"
                        onClick={() => {
                          setSelectedFileIdx(idx);
                          setZoomLevel(1.0);
                          setRotation(0);
                          setShowRawOcr(false);
                        }}
                        className={`flex items-center gap-2.5 p-2 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF2E5] border-[#5B9A3C] shadow-xs ring-2 ring-[#5B9A3C]/20'
                            : 'bg-[#F8F9F4] border-[#1E3D2A]/10 hover:border-[#1E3D2A]/30 hover:bg-white'
                        }`}
                      >
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-[#1E3D2A]/10 shrink-0 flex items-center justify-center relative">
                          {isPdf ? (
                            <FileText className="w-5 h-5 text-red-600" />
                          ) : (
                            <img
                              src={authThumb}
                              alt={file.original_filename}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          )}
                          <span className="absolute bottom-0 right-0 px-1 py-0.2 bg-[#1E3D2A] text-white text-[8px] font-mono rounded-tl">
                            #{idx + 1}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#1E3D2A]/10 text-[#1E3D2A]">
                              {file.kind}
                            </span>
                            {file.page_count > 1 && (
                              <span className="text-[9px] font-mono text-[#1E3D2A]/50">
                                {file.page_count}p
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-semibold text-[#1E3D2A] truncate mt-0.5" title={file.original_filename}>
                            {file.original_filename}
                          </p>
                          <span className="text-[10px] font-mono text-[#1E3D2A]/50">
                            {(file.size / 1024).toFixed(0)} KB
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Viewer Toolbar (Zoom In/Out, Rotate, Reset, Download, Open Tab) */}
            <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-[#F8F9F4] text-xs text-[#1E3D2A]/70 gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.2))}
                  className="p-1.5 rounded-lg hover:bg-white text-[#1E3D2A] cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-[11px] w-12 text-center">
                  {(zoomLevel * 100).toFixed(0)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(3.0, z + 0.2))}
                  className="p-1.5 rounded-lg hover:bg-white text-[#1E3D2A] cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-1.5 rounded-lg hover:bg-white text-[#1E3D2A] ml-1 cursor-pointer"
                  title="Rotate 90° Clockwise"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoomLevel(1.0);
                    setRotation(0);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white text-[10px] font-mono ml-1 cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* External Actions */}
              {activeFile && (
                <div className="flex items-center gap-2">
                  <a
                    href={getAuthenticatedMediaUrl(activeFile.download_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-white text-[#1E3D2A] flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                    title="Open full resolution in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Open</span>
                  </a>

                  <a
                    href={getAuthenticatedMediaUrl(activeFile.download_url)}
                    download={activeFile.original_filename}
                    className="p-1.5 rounded-lg hover:bg-white text-[#1E3D2A] flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                    title="Download file"
                  >
                    <Download className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Download</span>
                  </a>
                </div>
              )}
            </div>

            {/* Interactive Image Display Area */}
            <div className="w-full h-[450px] rounded-2xl bg-[#1E3D2A]/5 border border-[#1E3D2A]/10 overflow-hidden flex items-center justify-center relative p-4">
              {showRawOcr ? (
                <div className="w-full h-full overflow-y-auto bg-white p-4 rounded-xl font-mono text-xs text-[#1E3D2A] leading-relaxed whitespace-pre-wrap select-text">
                  {activeFile?.raw_ocr_text || 'No raw OCR text available.'}
                </div>
              ) : activeFile ? (
                <div className="w-full h-full flex items-center justify-center overflow-auto">
                  {activeFile.mime_type?.includes('pdf') || activeFile.original_filename?.toLowerCase().endsWith('.pdf') ? (
                    <div className="text-center p-6 space-y-3">
                      <FileText className="w-16 h-16 text-red-600 mx-auto" />
                      <p className="text-xs font-semibold text-[#1E3D2A]">{activeFile.original_filename}</p>
                      <p className="text-[11px] text-[#1E3D2A]/60">PDF Document ({activeFile.page_count} pages)</p>
                      <a
                        href={getAuthenticatedMediaUrl(activeFile.download_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E3D2A] text-white text-xs font-semibold hover:bg-[#2d593e] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View / Open PDF</span>
                      </a>
                    </div>
                  ) : (
                    <img
                      src={getAuthenticatedMediaUrl(activeFile.thumbnail_url || activeFile.download_url)}
                      alt={activeFile.original_filename}
                      style={{
                        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                        transition: 'transform 0.2s ease-out',
                      }}
                      className="max-w-full max-h-full object-contain shadow-md rounded-lg"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = getAuthenticatedMediaUrl(activeFile.download_url);
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="text-xs text-[#1E3D2A]/40">No file attached</div>
              )}
            </div>

            {/* File Details & OCR Engine provenance */}
            {activeFile && (
              <div className="p-3 rounded-xl bg-[#F8F9F4] text-[11px] font-mono text-[#1E3D2A]/70 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-[#1E3D2A]">Engine: </span>
                  <span>{activeFile.ocr_engine || 'PaddleOCR (RapidOCR ONNX)'}</span>
                </div>
                <div>
                  <span className="font-bold text-[#1E3D2A]">File SHA256: </span>
                  <span className="truncate">{activeFile.sha256.slice(0, 16)}...</span>
                </div>
              </div>
            )}
          </div>

          {/* ===================================================================
              VOICE BRIEFINGS & AUDIO NOTES HUB (Directly in Left Column)
          =================================================================== */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#1E3D2A]/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E3D2A]/10 pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#5B9A3C]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
                  Voice Briefings &amp; Audio Notes ({lead.voice_notes?.length || 0})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#5B9A3C] font-semibold">
                {lead.voice_notes?.length ? `${lead.voice_notes.length} recording(s)` : '0 recordings'}
              </span>
            </div>

            {/* Customer Submitted Description */}
            {lead.description && (
              <div className="p-3.5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/8 text-xs text-[#1E3D2A]/85">
                <span className="text-[10px] font-mono font-bold text-[#5B9A3C] uppercase block mb-1">
                  Customer Submitted Notes / Description:
                </span>
                <p className="whitespace-pre-wrap leading-relaxed font-sans">{lead.description}</p>
              </div>
            )}

            {/* Voice notes list with authenticated audio playback */}
            {lead.voice_notes && lead.voice_notes.length > 0 ? (
              <div className="space-y-3">
                {lead.voice_notes.map((vn, idx) => {
                  const authAudioUrl = getAuthenticatedMediaUrl(vn.stream_url);
                  return (
                    <div key={vn.id} className="p-4 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#5B9A3C]/10 flex items-center justify-center text-[#5B9A3C]">
                            <Volume2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-[#1E3D2A]">
                            Voice Memo #{idx + 1}
                          </span>
                          <span className="text-[10px] font-mono text-[#1E3D2A]/50">
                            ({vn.duration_seconds.toFixed(1)}s)
                          </span>
                        </div>

                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase ${
                          vn.transcription_status === 'DONE'
                            ? 'bg-green-100 text-green-800'
                            : vn.transcription_status === 'SKIPPED'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {vn.transcription_status === 'DONE' ? 'Transcribed' : vn.transcription_status}
                        </span>
                      </div>

                      {/* HTML5 Audio Player with Authenticated Token */}
                      <audio controls className="w-full h-9 rounded-lg" src={authAudioUrl} preload="metadata" />

                      {/* Transcript Box */}
                      {vn.transcript ? (
                        <div className="p-3 rounded-xl bg-white border border-[#1E3D2A]/8 text-xs text-[#1E3D2A]/90 leading-relaxed">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-mono font-bold text-[#5B9A3C] uppercase">
                              AI Transcript ({vn.transcript_language || 'Auto'}):
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(vn.transcript || '');
                                showToast('Transcript copied to clipboard');
                              }}
                              className="text-[10px] font-mono text-[#5B9A3C] hover:underline cursor-pointer"
                            >
                              Copy
                            </button>
                          </div>
                          <p className="italic">"{vn.transcript}"</p>
                        </div>
                      ) : (
                        <div className="text-[11px] font-mono text-[#1E3D2A]/50 italic">
                          Audio recording stored securely. Transcription was skipped or unavailable.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-[#1E3D2A]/40 text-center py-4 bg-[#F8F9F4] rounded-2xl border border-dashed border-[#1E3D2A]/10">
                No voice memos recorded for this lead submission.
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            RIGHT PANEL: INLINE-EDITABLE EXTRACTED FIELDS (Col 6)
        =================================================================== */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#1E3D2A]/10 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#1E3D2A]/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5B9A3C]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
                  Extracted Contact Model
                </h3>
              </div>

              {primaryContact && (
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                  primaryContact.overall_confidence >= 0.80
                    ? 'bg-[#EAF2E5] text-[#5B9A3C] border border-[#5B9A3C]/30'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {(primaryContact.overall_confidence * 100).toFixed(0)}% Overall Confidence
                </span>
              )}
            </div>

            {/* Status & Priority Controls */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/8">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#1E3D2A]/60 mb-1">
                  Lead Status
                </label>
                <select
                  value={leadStatus}
                  onChange={(e) => setLeadStatus(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-xs font-bold text-[#1E3D2A]"
                >
                  <option value="NEW">NEW</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="NEEDS_REVIEW">NEEDS REVIEW</option>
                  <option value="VERIFIED">VERIFIED</option>
                  <option value="FAILED">FAILED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#1E3D2A]/60 mb-1">
                  Commercial Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-xs font-semibold text-[#1E3D2A]"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Field: Full Name */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Contact Person Name</span>
                </label>
                {confidence.name !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    confidence.name >= 0.8 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {(confidence.name * 100).toFixed(0)}% conf
                  </span>
                )}
              </div>
              <input
                type="text"
                value={contactForm.name || ''}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Full Name"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#1E3D2A] border ${
                  (confidence.name || 1) < 0.8 ? 'border-amber-300 bg-amber-50/30' : 'border-[#1E3D2A]/15 bg-[#F8F9F4]'
                } focus:outline-none focus:border-[#5B9A3C]`}
              />
            </div>

            {/* Field: Company & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Company Name</span>
                  </label>
                  {confidence.company !== undefined && (
                    <span className="text-[10px] font-mono text-gray-500">
                      {(confidence.company * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={contactForm.company || ''}
                  onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                  placeholder="Organization or Trading Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={contactForm.designation || ''}
                  onChange={(e) => setContactForm({ ...contactForm, designation: e.target.value })}
                  placeholder="e.g. Director, Plant Head"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                />
              </div>
            </div>

            {/* Field: Phone Numbers List */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Phone Number(s)</span>
                </label>

                <button
                  type="button"
                  onClick={handleAddPhone}
                  className="text-[10px] font-mono font-bold text-[#5B9A3C] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Phone</span>
                </button>
              </div>

              <div className="space-y-2">
                {(contactForm.phones || []).map((ph, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={ph.e164 || ph.raw}
                      onChange={(e) => handlePhoneChange(idx, 'e164', e.target.value)}
                      placeholder="+91 98250 12345"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 font-mono text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    />

                    <select
                      value={ph.type || 'mobile'}
                      onChange={(e) => handlePhoneChange(idx, 'type', e.target.value)}
                      className="px-2.5 py-2 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-[11px] font-mono text-[#1E3D2A]"
                    >
                      <option value="mobile">Mobile</option>
                      <option value="landline">Landline</option>
                      <option value="other">Other</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleRemovePhone(idx)}
                      className="p-2 text-[#1E3D2A]/40 hover:text-red-600 rounded-lg"
                      title="Remove phone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Field: Email & Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Corporate Email</span>
                </label>
                <input
                  type="email"
                  value={contactForm.emails?.[0] || ''}
                  onChange={(e) => setContactForm({ ...contactForm, emails: [e.target.value] })}
                  placeholder="contact@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Website URL</span>
                </label>
                <input
                  type="text"
                  value={contactForm.websites?.[0] || ''}
                  onChange={(e) => setContactForm({ ...contactForm, websites: [e.target.value] })}
                  placeholder="https://company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                />
              </div>
            </div>

            {/* Field: Address & Components */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Address &amp; Location Details</span>
                </label>
                {confidence.address !== undefined && (
                  <span className="text-[10px] font-mono text-gray-500">
                    {(confidence.address * 100).toFixed(0)}%
                  </span>
                )}
              </div>
              <textarea
                rows={2}
                value={contactForm.address_raw || ''}
                onChange={(e) => setContactForm({ ...contactForm, address_raw: e.target.value })}
                placeholder="Full address string"
                className="w-full p-3 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
              />

              {/* Structured components preview */}
              {contactForm.address_components && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <input
                    type="text"
                    value={contactForm.address_components.city || ''}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        address_components: { ...contactForm.address_components, city: e.target.value },
                      })
                    }
                    placeholder="City (e.g. Ankleshwar)"
                    className="px-2.5 py-1.5 rounded-lg bg-[#F8F9F4] border border-[#1E3D2A]/10 text-[11px] text-[#1E3D2A]"
                  />
                  <input
                    type="text"
                    value={contactForm.address_components.state || ''}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        address_components: { ...contactForm.address_components, state: e.target.value },
                      })
                    }
                    placeholder="State (e.g. Gujarat)"
                    className="px-2.5 py-1.5 rounded-lg bg-[#F8F9F4] border border-[#1E3D2A]/10 text-[11px] text-[#1E3D2A]"
                  />
                  <input
                    type="text"
                    value={contactForm.address_components.postal_code || ''}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        address_components: { ...contactForm.address_components, postal_code: e.target.value },
                      })
                    }
                    placeholder="PIN Code"
                    className="px-2.5 py-1.5 rounded-lg bg-[#F8F9F4] border border-[#1E3D2A]/10 text-[11px] font-mono text-[#1E3D2A]"
                  />
                </div>
              )}
            </div>

            {/* Field: Internal Admin Notes */}
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-[#1E3D2A]/75 mb-1">
                Internal Commercial Notes
              </label>
              <textarea
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Internal verification notes, follow-up comments..."
                className="w-full p-3 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

