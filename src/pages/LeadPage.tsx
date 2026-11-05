import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Send,
  Loader2,
  FileCheck2,
  Sparkles,
  LogOut,
  Building2,
  CheckCircle,
  HelpCircle,
  FileSpreadsheet,
  Lock,
  Eye,
  EyeOff,
  X,
  AlertCircle
} from 'lucide-react';
import { PasscodeGate } from '../components/lead/PasscodeGate';
import { FileUploadZone } from '../components/lead/FileUploadZone';
import { VoiceNotesHub, VoiceNoteDraft } from '../components/lead/VoiceNotesHub';
import { LeadExtractionTracker } from '../components/lead/LeadExtractionTracker';
import {
  getLeadPasscodeToken,
  clearLeadPasscodeToken,
  getLeadPasscodeLabel,
  isLeadTokenExpired,
  verifyLeadSession,
  unlockLeadPasscode,
  submitLead
} from '../services/leadApi';

export const LeadPage: React.FC = () => {
  const [isVerifyingSession, setIsVerifyingSession] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionLabel, setSessionLabel] = useState<string>('');

  // Form State (in-memory draft only for privacy)
  const [customerName, setCustomerName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNoteDraft[]>([]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{ id: string; refCode: string } | null>(null);

  // Quick In-place Re-authentication Modal (prevents losing draft on session expiry)
  const [showQuickReauthModal, setShowQuickReauthModal] = useState<boolean>(false);
  const [reauthPasscode, setReauthPasscode] = useState<string>('');
  const [showReauthPin, setShowReauthPin] = useState<boolean>(false);
  const [isReauthing, setIsReauthing] = useState<boolean>(false);
  const [reauthError, setReauthError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Check initial session immediately on page load
  useEffect(() => {
    let isMounted = true;

    const checkInitialSession = async () => {
      // 1. Check local storage token first (purges expired tokens immediately)
      const token = getLeadPasscodeToken();
      if (!token) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsVerifyingSession(false);
        }
        return;
      }

      // 2. Validate token against backend to ensure passcode wasn't revoked or rotated
      try {
        const check = await verifyLeadSession();
        if (!isMounted) return;
        if (check.valid) {
          setIsAuthenticated(true);
          setSessionLabel(check.label || getLeadPasscodeLabel());
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (isMounted) {
          if (!isLeadTokenExpired(token)) {
            setIsAuthenticated(true);
            setSessionLabel(getLeadPasscodeLabel());
          } else {
            setIsAuthenticated(false);
          }
        }
      } finally {
        if (isMounted) {
          setIsVerifyingSession(false);
        }
      }
    };

    checkInitialSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUnlockSuccess = (label: string) => {
    setIsAuthenticated(true);
    setSessionLabel(label);
  };

  const handleSignOut = () => {
    clearLeadPasscodeToken();
    setIsAuthenticated(false);
    setSessionLabel('');
    setSubmittedLead(null);
  };

  const executeSubmit = async (): Promise<boolean> => {
    if (files.length === 0 && voiceNotes.length === 0 && !description.trim()) {
      setSubmitError('Please attach at least one business card/brochure, record a voice note, or provide a written briefing.');
      return false;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const formData = new FormData();
      if (customerName.trim()) {
        formData.append('customer_name_input', customerName.trim());
      }
      if (description.trim()) {
        formData.append('description', description.trim());
      }

      // Append files
      files.forEach((file) => {
        formData.append('files', file);
      });

      // Append voice note blobs
      voiceNotes.forEach((vn, idx) => {
        const ext = vn.blob.type.includes('mp4') ? 'mp4' : (vn.blob.type.includes('wav') ? 'wav' : 'webm');
        const filename = `${vn.name.replace(/\s+/g, '_')}_${idx + 1}.${ext}`;
        formData.append('voice_notes', vn.blob, filename);
      });

      const res = await submitLead(formData, abortController.signal);

      // If token expired right at submission: KEEP FORM SAFE and prompt inline PIN
      if (res.auth_required) {
        setShowQuickReauthModal(true);
        setReauthError(res.error || 'Your commercial session has expired. Please enter passcode to confirm and submit.');
        return false;
      }

      if (res.success && res.lead_id && res.reference_code) {
        setSubmittedLead({
          id: res.lead_id,
          refCode: res.reference_code,
        });
        // Clear draft files only on verified success
        setFiles([]);
        setVoiceNotes([]);
        setDescription('');
        setCustomerName('');
        return true;
      } else {
        setSubmitError(res.error || 'Submission failed. Please check your files and try again.');
        return false;
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setSubmitError(err.message || 'Network interruption while submitting. Please retry.');
      }
      return false;
    } finally {
      setIsSubmitting(false);
      abortControllerRef.current = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Check if token expired before starting
    const token = getLeadPasscodeToken();
    if (!token) {
      setShowQuickReauthModal(true);
      setReauthError('Session expired. Please enter passcode to submit your lead.');
      return;
    }

    await executeSubmit();
  };

  const handleQuickReauthAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reauthPasscode.trim() || isReauthing) return;

    setIsReauthing(true);
    setReauthError(null);

    try {
      const res = await unlockLeadPasscode(reauthPasscode.trim());
      if (res.success && res.token) {
        setIsAuthenticated(true);
        setSessionLabel(res.label || 'Commercial Lead Access');
        setShowQuickReauthModal(false);
        setReauthPasscode('');
        // Automatically proceed with submitting the preserved lead
        await executeSubmit();
      } else {
        setReauthError(res.error || 'Invalid passcode. Please enter the correct PIN.');
      }
    } catch (err: any) {
      setReauthError(err.message || 'Failed to authenticate passcode. Please try again.');
    } finally {
      setIsReauthing(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setSubmitError(null);
  };

  // If currently verifying initial session, display sleek indicator
  if (isVerifyingSession) {
    return (
      <div className="min-h-screen bg-[#F8F9F4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-[#5B9A3C]" />
          <span className="text-xs font-mono text-[#1E3D2A]/60">Checking commercial desk credentials...</span>
        </div>
      </div>
    );
  }

  // If not authenticated (or expired on access), immediately show passcode gate
  if (!isAuthenticated) {
    return <PasscodeGate onUnlockSuccess={handleUnlockSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9F4] text-[#1E3D2A] pb-24 pt-28 sm:pt-32 relative">
      {/* Background Soft Aurora */}
      <div className="absolute inset-0 aurora-mesh pointer-events-none opacity-45" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Authorized Session Bar */}
        <div className="flex items-center justify-between p-3.5 sm:px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1E3D2A]/10 shadow-xs mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B9A3C] animate-pulse" />
            <span className="text-xs font-mono font-semibold text-[#1E3D2A]">
              Session: <span className="text-[#5B9A3C]">{sessionLabel}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3D2A]/60 hover:text-red-600 transition-colors cursor-pointer"
            title="Lock session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Portal</span>
          </button>
        </div>

        {/* If submitted, show live tracking and extraction preview */}
        {submittedLead ? (
          <LeadExtractionTracker
            leadId={submittedLead.id}
            referenceCode={submittedLead.refCode}
            onReset={handleReset}
          />
        ) : (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EEDF]/80 text-[#1E3D2A] text-[11px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Commercial Lead &amp; Inquiry Intake</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#1E3D2A]">
                Share Your Commercial Lead
              </h1>

              <p className="text-xs sm:text-sm text-[#1E3D2A]/70 max-w-xl mx-auto leading-relaxed">
                Upload business cards, brochures, flyers, or recorded voice notes. Our extraction pipeline recognizes contact info, WhatsApp numbers, company titles, and Gujarat GIDC addresses.
              </p>

              {/* 3-Step Visual Indicator */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto pt-4">
                <div className="p-2.5 rounded-2xl bg-white border border-[#1E3D2A]/10 text-center shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-[#5B9A3C] block">STEP 1</span>
                  <span className="text-xs font-semibold text-[#1E3D2A] block mt-0.5">Upload Cards</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-[#1E3D2A]/10 text-center shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-[#5B9A3C] block">STEP 2</span>
                  <span className="text-xs font-semibold text-[#1E3D2A] block mt-0.5">Voice Briefing</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-[#1E3D2A]/10 text-center shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-[#5B9A3C] block">STEP 3</span>
                  <span className="text-xs font-semibold text-[#1E3D2A] block mt-0.5">Instant Extract</span>
                </div>
              </div>
            </div>

            {/* Main Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. File Upload Zone */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#1E3D2A]/10 shadow-lg shadow-[#1E3D2A]/5 space-y-4">
                <div className="flex items-center gap-2 border-b border-[#1E3D2A]/10 pb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#5B9A3C] text-white text-xs font-bold font-mono flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
                    Upload Documents, Business Cards &amp; QR Codes
                  </h3>
                </div>

                <FileUploadZone
                  files={files}
                  onFilesChange={setFiles}
                  maxFiles={10}
                />
              </div>

              {/* 2. Voice Notes Hub */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#1E3D2A]/10 shadow-lg shadow-[#1E3D2A]/5 space-y-4">
                <div className="flex items-center gap-2 border-b border-[#1E3D2A]/10 pb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#5B9A3C] text-white text-xs font-bold font-mono flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
                    Voice Briefing &amp; Audio Notes
                  </h3>
                </div>

                <VoiceNotesHub
                  voiceNotes={voiceNotes}
                  onVoiceNotesChange={setVoiceNotes}
                  maxNotes={10}
                />
              </div>

              {/* 3. Description & Customer Details */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#1E3D2A]/10 shadow-lg shadow-[#1E3D2A]/5 space-y-5">
                <div className="flex items-center gap-2 border-b border-[#1E3D2A]/10 pb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#5B9A3C] text-white text-xs font-bold font-mono flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
                    Written Briefing &amp; Commercial Context
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1E3D2A]/75 mb-1.5">
                      Your Name / Representative (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rutvik Ahir (Okhai Commercial)"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C] focus:ring-1 focus:ring-[#5B9A3C]/30"
                    />
                  </div>

                  <div className="sm:self-end">
                    <p className="text-[11px] text-[#1E3D2A]/60 leading-normal">
                      Card photos and audio notes are automatically parsed. You can use this field to specify target quantities, annual contracts, or urgent export timelines.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E3D2A]/75">
                      Commercial Notes &amp; Specifications
                    </label>
                    <span className="text-[11px] font-mono text-[#1E3D2A]/50">
                      {description.length} / 2000 chars
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    maxLength={2000}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter commercial details (e.g. Met at CPHI exhibition, interested in 500 kg Pure Nicotine USP 99.5% monthly, requires Dahej CIF quotation...)"
                    className="w-full p-4 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C] focus:ring-1 focus:ring-[#5B9A3C]/30 resize-y"
                  />
                </div>
              </div>

              {/* Error Notice */}
              {submitError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuickReauthModal(true);
                      setReauthError(null);
                    }}
                    className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-900 font-semibold rounded-xl text-xs shrink-0 transition-colors cursor-pointer"
                  >
                    Renew Session
                  </button>
                </div>
              )}

              {/* Review & Submit Strip */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1E3D2A] to-[#2D5A3C] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    Ready to Submit Lead?
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-white/70 mt-0.5">
                    <span>{files.length} card/document{files.length === 1 ? '' : 's'}</span>
                    <span>·</span>
                    <span>{voiceNotes.length} voice briefing{voiceNotes.length === 1 ? '' : 's'}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (files.length === 0 && voiceNotes.length === 0 && !description.trim())}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-black/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting &amp; Enqueuing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Lead for Extraction</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>

      {/* =====================================================================
          QUICK INLINE RE-AUTHENTICATION MODAL (Preserves in-progress lead)
      ===================================================================== */}
      {showQuickReauthModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#1E3D2A]/10 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3D2A]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-[#1E3D2A]">
                    Session Renewal Required
                  </h3>
                  <p className="text-[11px] text-[#1E3D2A]/60">
                    Your attached files and notes are safely kept.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickReauthModal(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#1E3D2A]/75 leading-relaxed">
                Your commercial desk session timed out while drafting. Enter your commercial passcode to verify and submit your lead without losing any of your attached documents or notes.
              </p>

              <form onSubmit={handleQuickReauthAndSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showReauthPin ? 'text' : 'password'}
                    maxLength={12}
                    value={reauthPasscode}
                    onChange={(e) => {
                      setReauthPasscode(e.target.value);
                      setReauthError(null);
                    }}
                    placeholder="Enter commercial passcode"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-sm font-mono tracking-wider focus:outline-none focus:border-[#5B9A3C] focus:ring-1 focus:ring-[#5B9A3C]/30"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowReauthPin(!showReauthPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showReauthPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {reauthError && (
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{reauthError}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowQuickReauthModal(false)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isReauthing || !reauthPasscode.trim()}
                    className="px-5 py-2.5 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-bold tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isReauthing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>Unlock &amp; Submit Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

