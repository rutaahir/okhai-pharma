import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Building,
  User,
  Phone,
  MapPin,
  Sparkles,
  Loader2,
  FileText,
  RotateCcw,
  ShieldCheck,
  Pencil,
  Save,
  Mail,
  MessageSquare,
  Download,
  ExternalLink,
  Volume2,
  X,
  Share2,
  CheckCircle
} from 'lucide-react';
import {
  pollLeadStatus,
  updateCustomerLeadContact,
  sendLeadBrochureEmail,
  getAuthenticatedMediaUrl
} from '../../services/leadApi';
import { LeadStatusPollResponse, ExtractedContact } from '../../types/lead';

interface LeadExtractionTrackerProps {
  leadId: string;
  referenceCode: string;
  onReset: () => void;
}

export const LeadExtractionTracker: React.FC<LeadExtractionTrackerProps> = ({
  leadId,
  referenceCode,
  onReset,
}) => {
  const [leadStatus, setLeadStatus] = useState<LeadStatusPollResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editable Contact State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isConfirmedLocally, setIsConfirmedLocally] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({
    name: '',
    company: '',
    designation: '',
    phone: '',
    email: '',
    address: '',
  });

  // Action Modals State
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState<boolean>(false);

  const [showWhatsAppModal, setShowWhatsAppModal] = useState<boolean>(false);
  const [copiedWhatsAppMsg, setCopiedWhatsAppMsg] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;

    const checkStatus = async () => {
      try {
        const data = await pollLeadStatus(leadId);
        if (isMounted) {
          setLeadStatus(data);

          // Populate edit form when preview is available and user hasn't edited yet
          if (data.extracted_preview && !isEditing) {
            const p = data.extracted_preview;
            setEditForm((prev) => ({
              name: prev.name || p.name || '',
              company: prev.company || p.company || '',
              designation: prev.designation || p.designation || '',
              phone: prev.phone || p.primary_phone || (p.phones?.[0]?.e164 || p.phones?.[0]?.raw) || '',
              email: prev.email || (p.emails && p.emails[0]) || '',
              address: prev.address || p.address_raw || '',
            }));
            if (p.emails && p.emails[0] && !emailInput) {
              setEmailInput(p.emails[0]);
            }
          }

          // If complete or failed, stop polling
          if (data.status !== 'PROCESSING' && data.job?.status === 'COMPLETED') {
            if (pollInterval) clearInterval(pollInterval);
          }
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Status check error');
      }
    };

    // Immediate check + interval
    checkStatus();
    pollInterval = setInterval(checkStatus, 2500);

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [leadId]);

  const copyRefCode = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCompleted =
    leadStatus?.job?.status === 'COMPLETED' ||
    leadStatus?.status === 'VERIFIED' ||
    leadStatus?.status === 'NEEDS_REVIEW';
  const isLeadConfirmed = Boolean(leadStatus?.is_customer_confirmed || isConfirmedLocally);
  const progressPercent = leadStatus?.job?.progress_percent ?? 15;
  const currentStep = leadStatus?.job?.current_step || 'Initializing AI optical pipeline...';
  const contact = leadStatus?.extracted_preview;

  // Save edited fields to backend database & immediately update SuperAdmin columns
  const handleSaveContact = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await updateCustomerLeadContact(leadId, editForm);
      if (res.success && res.contact) {
        setIsEditing(false);
        setIsConfirmedLocally(true);
        setSaveSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSaveSuccess(false), 3500);

        // Update local status preview
        setLeadStatus((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            is_customer_confirmed: true,
            customer_name_input: editForm.name,
            extracted_preview: {
              ...(prev.extracted_preview || ({} as ExtractedContact)),
              ...res.contact,
              name: editForm.name,
              company: editForm.company,
              designation: editForm.designation,
              primary_phone: editForm.phone,
              emails: editForm.email ? [editForm.email] : [],
              address_raw: editForm.address,
              is_verified: true,
            },
          };
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save updated contact details.');
    } finally {
      setIsSaving(false);
    }
  };

  // WhatsApp Handler
  const handleOpenWhatsApp = () => {
    const rawPhone = editForm.phone || contact?.primary_phone || '';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    const recipientPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const contactName = editForm.name || contact?.name || 'Valued Partner';
    const contactCo = editForm.company || contact?.company || 'Commercial Partner';
    const contactLoc = editForm.address || contact?.address_raw || 'India';

    const message = `Dear ${contactName},

Thank you for connecting with Okhai Pharma Intermediates Pvt. Ltd.!

We have successfully registered your commercial inquiry under Reference Tracking ID: ${referenceCode}.

Registered Details:
• Name: ${contactName}
• Organization: ${contactCo}
• Phone: ${rawPhone}
• Location: ${contactLoc}

Official Corporate Product Brochure (Pure Nicotine 99.5% USP/EP, Nicotine Sulphate 40%, Nicotine Alkaloid 90/95%):
https://okhaipharma.com/downloads/Okhai_Pharma_Brochure.pdf

Our technical sales desk in Anand, Gujarat will connect with you shortly.

Best regards,
Okhai Pharma Commercial Sales Desk
Kasor, Sojitra, Anand - 388460, Gujarat, India
Call / WhatsApp: +91 79900 82565
Web: https://okhaipharma.com`;

    setShowWhatsAppModal(true);
    if (recipientPhone) {
      const waUrl = `https://wa.me/${recipientPhone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    }
  };

  // Email Dispatch Handler
  const handleSendEmail = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      setError('Please provide a valid corporate email address.');
      return;
    }

    setIsSendingEmail(true);
    setError(null);
    try {
      const res = await sendLeadBrochureEmail({
        lead_id: leadId,
        reference_code: referenceCode,
        email: emailInput,
        name: editForm.name || contact?.name || 'Valued Partner',
        company: editForm.company || contact?.company || '',
        phone: editForm.phone || contact?.primary_phone || '',
        location: editForm.address || contact?.address_raw || '',
      });

      if (res.success) {
        setEmailSentSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch confirmation email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-16">
      
      {/* =====================================================================
          1. SUCCESS CONFIRMATION BANNER (ONLY SHOWN AFTER SAVING PREVIEW)
      ===================================================================== */}
      {isLeadConfirmed ? (
        <div className="p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#1E3D2A]/10 shadow-xl shadow-[#1E3D2A]/5 text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#5B9A3C] via-[#8CC63F] to-[#2D5A3C]" />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EAF2E5] text-[#5B9A3C] mb-4 shadow-sm animate-bounce">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3D2A] tracking-tight">
            Commercial Lead Confirmed
          </h3>
          <p className="text-xs sm:text-sm text-[#1E3D2A]/70 mt-1 max-w-md mx-auto">
            Your documentation and verified contact details are securely registered with Okhai Pharma's commercial desk in Gujarat.
          </p>

          {/* Copyable Reference Code Box */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 p-3 sm:px-5 sm:py-2.5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/12 shadow-inner">
            <span className="text-xs font-mono uppercase tracking-wider text-[#1E3D2A]/60">
              Reference Tracking ID:
            </span>
            <span className="font-mono text-base sm:text-lg font-extrabold text-[#1E3D2A] tracking-wider">
              {referenceCode}
            </span>
            <button
              type="button"
              onClick={copyRefCode}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-xs font-semibold text-[#1E3D2A] hover:border-[#5B9A3C] hover:text-[#5B9A3C] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Copy reference code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span className="text-[#5B9A3C]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Status strip shown while reviewing preview before saving */
        <div className="px-5 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#1E3D2A]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F4F9F1] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-serif font-bold text-[#1E3D2A]">
                AI Optical Extraction &amp; Verification
              </h4>
              <p className="text-[11px] text-[#1E3D2A]/60">
                Please verify or edit the contact details below, then click <strong className="text-[#5B9A3C]">Save Details</strong> to confirm.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs font-mono shrink-0">
            <span className="text-[#1E3D2A]/50">Ref ID:</span>
            <span className="font-bold text-[#1E3D2A]">{referenceCode}</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="p-1 hover:text-red-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-[#EAF2E5] border border-[#5B9A3C]/30 text-[#1E3D2A] text-xs flex items-center gap-2.5 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-[#5B9A3C] shrink-0" />
          <span className="font-semibold">
            Contact details successfully updated and synchronized with SuperAdmin columns!
          </span>
        </div>
      )}

      {/* =====================================================================
          2. EXTRACTION STATUS & PROGRESS BAR
      ===================================================================== */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#1E3D2A]/10 shadow-lg shadow-[#1E3D2A]/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isCompleted ? (
              <Loader2 className="w-4 h-4 text-[#5B9A3C] animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#5B9A3C]" />
            )}
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
              {!isCompleted ? 'AI Optical Extraction in Progress' : 'Extraction Complete'}
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-[#5B9A3C]">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-[#F0F2EB] rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#5B9A3C] to-[#8CC63F] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-[#1E3D2A]/70 font-mono">
          {currentStep}
        </p>

        {/* ===================================================================
            3. VERIFIED CONTACT PREVIEW (WITH EDIT IN EVERY FIELD & SAVE)
        =================================================================== */}
        {contact ? (
          <div className="mt-4 p-5 sm:p-6 rounded-3xl bg-[#F8F9F4] border border-[#5B9A3C]/25 shadow-xs space-y-5 animate-in fade-in slide-in-from-bottom-2">
            
            {/* Header with Edit / Save button */}
            <div className="flex items-center justify-between border-b border-[#1E3D2A]/10 pb-3.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]/70 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5B9A3C]" />
                <span>Verified Contact Preview</span>
              </span>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#EAF2E5] text-[#5B9A3C] border border-[#5B9A3C]/30 shadow-2xs">
                  {((contact.overall_confidence || 0.8) * 100).toFixed(0)}% Confidence
                </span>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 rounded-xl bg-white border border-[#1E3D2A]/15 text-xs font-semibold text-[#1E3D2A] hover:border-[#5B9A3C] hover:text-[#5B9A3C] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Edit Details</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSaveContact}
                    className="px-4 py-1.5 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>Save Details</span>
                  </button>
                )}
              </div>
            </div>

            {/* Editable or View-Only Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Name Field */}
              <div className="p-3 rounded-2xl bg-white border border-[#1E3D2A]/8 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#1E3D2A]/50 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#5B9A3C]" />
                    <span>Contact Person Name</span>
                  </span>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-[#1E3D2A]/40 hover:text-[#5B9A3C]"
                      title="Edit Name"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/20 text-xs font-semibold text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                  />
                ) : (
                  <div className="font-semibold text-[#1E3D2A] text-sm">
                    {editForm.name || contact.name || 'Direct Commercial Contact'}
                  </div>
                )}
              </div>

              {/* Company / Organization */}
              <div className="p-3 rounded-2xl bg-white border border-[#1E3D2A]/8 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#1E3D2A]/50 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#5B9A3C]" />
                    <span>Company / Organization</span>
                  </span>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-[#1E3D2A]/40 hover:text-[#5B9A3C]"
                      title="Edit Organization"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    placeholder="Company or Firm Name"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/20 text-xs font-semibold text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                  />
                ) : (
                  <div className="font-semibold text-[#1E3D2A] text-sm">
                    {editForm.company || contact.company || 'Not Specified'}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="p-3 rounded-2xl bg-white border border-[#1E3D2A]/8 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#1E3D2A]/50 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#5B9A3C]" />
                    <span>Phone Number</span>
                  </span>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-[#1E3D2A]/40 hover:text-[#5B9A3C]"
                      title="Edit Phone"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/20 text-xs font-mono font-semibold text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                  />
                ) : (
                  <a
                    href={`tel:${editForm.phone || contact.primary_phone}`}
                    className="font-mono font-semibold text-[#5B9A3C] hover:underline block"
                  >
                    {editForm.phone || contact.primary_phone || 'None provided'}
                  </a>
                )}
              </div>

              {/* Email Address */}
              <div className="p-3 rounded-2xl bg-white border border-[#1E3D2A]/8 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#1E3D2A]/50 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#5B9A3C]" />
                    <span>Corporate Email</span>
                  </span>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-[#1E3D2A]/40 hover:text-[#5B9A3C]"
                      title="Edit Email"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => {
                      setEditForm({ ...editForm, email: e.target.value });
                      setEmailInput(e.target.value);
                    }}
                    placeholder="contact@company.com"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/20 text-xs font-mono text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                  />
                ) : (
                  <div className="font-mono text-[#1E3D2A]/90 truncate">
                    {editForm.email || (contact.emails && contact.emails[0]) || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Location / Address (Full Width) */}
              <div className="sm:col-span-2 p-3 rounded-2xl bg-white border border-[#1E3D2A]/8 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#1E3D2A]/50 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#5B9A3C]" />
                    <span>Registered Location / Address</span>
                  </span>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-[#1E3D2A]/40 hover:text-[#5B9A3C]"
                      title="Edit Address"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <textarea
                    rows={2}
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    placeholder="Street, Industrial Area, City, State, PIN"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/20 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                  />
                ) : (
                  <div className="text-[#1E3D2A]/85 leading-relaxed">
                    {editForm.address || contact.address_raw || 'Gujarat, India'}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Save / Confirmation Status Bar */}
            {!isLeadConfirmed ? (
              <div className="pt-4 border-t border-[#1E3D2A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#EAF2E5]/70 p-4 rounded-2xl border border-[#5B9A3C]/30 animate-in fade-in">
                <div>
                  <h5 className="text-xs font-bold text-[#1E3D2A] flex items-center gap-1.5">
                    <Save className="w-4 h-4 text-[#5B9A3C]" />
                    <span>Confirm &amp; Save Details</span>
                  </h5>
                  <p className="text-[11px] text-[#1E3D2A]/70 mt-0.5">
                    Verify or edit your contact details above and click Save to register this lead with our commercial desk and unlock instant brochure delivery.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveContact}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#5B9A3C]/25 disabled:opacity-50 shrink-0"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Details</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-[#1E3D2A]/10 flex items-center justify-between text-xs text-[#5B9A3C] bg-[#EAF2E5]/50 px-4 py-2.5 rounded-xl border border-[#5B9A3C]/20">
                <span className="flex items-center gap-2 font-bold text-[#1E3D2A]">
                  <CheckCircle className="w-4 h-4 text-[#5B9A3C]" />
                  <span>Contact Details Saved &amp; Synchronized with Commercial Desk</span>
                </span>
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-semibold text-[#5B9A3C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit Details</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 rounded-lg border border-[#1E3D2A]/20 text-xs font-medium text-[#1E3D2A] hover:bg-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveContact}
                      className="px-4 py-1 rounded-lg bg-[#5B9A3C] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          !isCompleted && (
            <div className="mt-4 p-5 rounded-2xl bg-[#F8F9F4] text-center text-xs text-[#1E3D2A]/60 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#5B9A3C]" />
              <span>Scanning card bounding boxes, logos, and QR codes...</span>
            </div>
          )
        )}

        {/* ===================================================================
            4. ATTACHED DOCUMENTS & VOICE RECORDINGS SHOWCASE
        =================================================================== */}
        {((leadStatus?.files && leadStatus.files.length > 0) ||
          (leadStatus?.voice_notes && leadStatus.voice_notes.length > 0)) && (
          <div className="mt-6 pt-5 border-t border-[#1E3D2A]/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E3D2A]/70 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Attached Files &amp; Voice Notes</span>
              </span>
              <span className="text-[10px] font-mono text-[#5B9A3C]">
                {leadStatus.files?.length || 0} file(s) · {leadStatus.voice_notes?.length || 0} audio
              </span>
            </div>

            {/* Files Grid */}
            {leadStatus.files && leadStatus.files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {leadStatus.files.map((file, idx) => {
                  const authThumb = getAuthenticatedMediaUrl(file.thumbnail_url || file.download_url);
                  const isPdf = file.mime_type?.includes('pdf') || file.original_filename?.toLowerCase().endsWith('.pdf');
                  return (
                    <div
                      key={file.id}
                      className="p-2 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 flex items-center gap-2.5 overflow-hidden"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-[#1E3D2A]/10 shrink-0 flex items-center justify-center">
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
                      </div>
                      <div className="min-w-0 flex-1 text-[11px]">
                        <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-[#1E3D2A]/10 text-[#1E3D2A]">
                          {file.kind}
                        </span>
                        <p className="font-semibold text-[#1E3D2A] truncate mt-0.5" title={file.original_filename}>
                          {file.original_filename}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Voice Notes Audio Streamer */}
            {leadStatus.voice_notes && leadStatus.voice_notes.length > 0 && (
              <div className="space-y-2 pt-2">
                {leadStatus.voice_notes.map((vn, idx) => (
                  <div key={vn.id} className="p-3 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span className="font-bold text-[#1E3D2A]">Voice Note #{idx + 1}</span>
                        <span className="font-mono text-[10px] text-[#1E3D2A]/50">({vn.duration_seconds.toFixed(1)}s)</span>
                      </div>
                      <span className="text-[9px] font-mono uppercase text-[#5B9A3C] font-bold">
                        {vn.transcription_status}
                      </span>
                    </div>
                    <audio controls className="w-full h-8 rounded-lg" src={getAuthenticatedMediaUrl(vn.stream_url)} />
                    {vn.transcript && (
                      <p className="text-[11px] italic text-[#1E3D2A]/80 bg-white p-2 rounded-xl border border-[#1E3D2A]/8">
                        "{vn.transcript}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            5. CORPORATE ACTIONS BAR: SEND TO WHATSAPP & MAIL WITH BROCHURE
            (ONLY VISIBLE AFTER CUSTOMER CONFIRMS / CLICKS SAVE DETAILS)
        =================================================================== */}
        {isLeadConfirmed && (
          <div className="mt-6 pt-5 border-t border-[#1E3D2A]/10 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#1E3D2A]/60 font-semibold">
                Commercial Follow-up &amp; Brochure Dispatch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="px-4 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-[#25D366]/20"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send to WhatsApp</span>
              </button>

              {/* Email Brochure Button */}
              <button
                type="button"
                onClick={() => setShowEmailModal(true)}
                className="px-4 py-3.5 rounded-2xl bg-[#1E3D2A] hover:bg-[#295439] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-[#1E3D2A]/20"
              >
                <Mail className="w-4 h-4 text-[#8CC63F]" />
                <span>Send via Email</span>
              </button>
            </div>

            {/* Download Brochure Link */}
            <div className="flex items-center justify-center gap-4 pt-1">
              <a
                href="/downloads/Okhai_Pharma_Brochure.pdf"
                download="Okhai_Pharma_Corporate_Brochure.pdf"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5B9A3C] hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Okhai Pharma Brochure (PDF, 3.8 MB)</span>
              </a>
            </div>
          </div>
        )}

        {/* Reset & Submit Another Lead Button */}
        <div className="pt-4 border-t border-[#1E3D2A]/10 flex justify-end">
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl border border-[#1E3D2A]/20 hover:border-[#5B9A3C] text-xs font-semibold text-[#1E3D2A] hover:bg-[#F4F9F1] transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#5B9A3C]" />
            <span>Submit Another Lead</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          6. EMAIL CONFIRMATION MODAL WITH ATTACHED BROCHURE
      ===================================================================== */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#1E3D2A]/10 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-[#1E3D2A]/10 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#5B9A3C]" />
                <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
                  Email Corporate Brochure &amp; Thank You Note
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowEmailModal(false);
                  setEmailSentSuccess(false);
                }}
                className="p-1.5 rounded-xl hover:bg-[#F8F9F4] text-[#1E3D2A]/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {emailSentSuccess ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#EAF2E5] text-[#5B9A3C] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1E3D2A]">Thank You! Confirmation Sent</h4>
                  <p className="text-xs text-[#1E3D2A]/70 mt-1">
                    An official thank you email with all registered details and the attached corporate product brochure has been dispatched to:
                  </p>
                  <p className="font-mono text-sm font-bold text-[#5B9A3C] mt-1">{emailInput}</p>
                </div>

                {/* Brochure card */}
                <div className="p-4 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-left flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-red-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#1E3D2A]">Okhai_Pharma_Brochure.pdf</p>
                      <p className="text-[10px] text-[#1E3D2A]/60">Pure Nicotine 99.5% USP/EP · Nicotine Sulphate · Alkaloids</p>
                    </div>
                  </div>
                  <a
                    href="/downloads/Okhai_Pharma_Brochure.pdf"
                    download="Okhai_Pharma_Corporate_Brochure.pdf"
                    className="p-2 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#5B9A3C] hover:bg-[#EAF2E5]"
                    title="Download Copy"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailSentSuccess(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1E3D2A] text-white text-xs font-semibold hover:bg-[#2d593e]"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-[#1E3D2A]/70">
                  Send a formal thank-you confirmation along with Okhai Pharma's official Product Brochure (PDF) directly to this contact:
                </p>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#1E3D2A]/70">
                    Recipient Email Address:
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="partner@company.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/20 text-xs font-mono text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                  />
                </div>

                {/* Attached File Preview Badge */}
                <div className="p-3 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-red-600" />
                    <div>
                      <span className="font-semibold text-[#1E3D2A] block">Attached: Okhai_Pharma_Brochure.pdf</span>
                      <span className="text-[10px] text-[#1E3D2A]/50">4-page pharmaceutical spec sheet (3.8 MB)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-green-100 text-green-800">
                    Ready
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#1E3D2A]/15 text-xs font-semibold text-[#1E3D2A] hover:bg-[#F8F9F4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isSendingEmail}
                    onClick={handleSendEmail}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3D2A] hover:bg-[#2d593e] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSendingEmail ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#8CC63F]" />
                    ) : (
                      <Mail className="w-4 h-4 text-[#8CC63F]" />
                    )}
                    <span>Send Thank You &amp; Brochure</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* =====================================================================
          7. WHATSAPP CONFIRMATION MODAL WITH BROCHURE LINK
      ===================================================================== */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#1E3D2A]/10 space-y-4 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-[#1E3D2A]/10 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
                  WhatsApp Commercial Chat Launched
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWhatsAppModal(false)}
                className="p-1.5 rounded-xl hover:bg-[#F8F9F4] text-[#1E3D2A]/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#1E3D2A]/80 leading-relaxed">
              WhatsApp has been launched with the thank-you greeting and download link for the official corporate brochure.
            </p>

            {/* Brochure File Download Box */}
            <div className="p-3.5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-7 h-7 text-red-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#1E3D2A]">Okhai_Pharma_Brochure.pdf</p>
                  <p className="text-[10px] text-[#1E3D2A]/60">Pure Nicotine 99.5% USP/EP · 4 Pages</p>
                </div>
              </div>

              <a
                href="/downloads/Okhai_Pharma_Brochure.pdf"
                download="Okhai_Pharma_Corporate_Brochure.pdf"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-xs font-mono font-bold text-[#5B9A3C] hover:bg-[#EAF2E5] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* Direct Plant WhatsApp Contact */}
            <div className="p-3 rounded-2xl bg-[#EAF2E5] border border-[#5B9A3C]/30 text-xs text-[#1E3D2A] flex items-center justify-between">
              <div>
                <span className="font-bold block">Need immediate assistance?</span>
                <span className="text-[11px] text-[#1E3D2A]/70">Call or chat with Okhai Pharma Sales Desk:</span>
              </div>
              <a
                href="https://wa.me/917990082565?text=Hello%20Okhai%20Pharma,%20I%20am%20inquiring%20about%20Pure%20Nicotine%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#25D366] text-white font-mono font-bold text-[11px] hover:bg-[#20ba59]"
              >
                +91 79900 82565
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowWhatsAppModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#1E3D2A] text-white text-xs font-semibold hover:bg-[#2d593e]"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
