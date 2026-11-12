import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Eye,
  Code,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  Phone,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Link2,
  Eraser,
  RefreshCw,
} from 'lucide-react';
import { LeadDetailItem, LeadCommunicationItem } from '../../types/lead';
import { sendSuperAdminLeadReply, getSuperAdminLeadCommunications } from '../../services/leadApi';
import { useAdminAuth } from '../../context/AdminAuthContext';

// Real Official WhatsApp Brand SVG Icon
const RealWhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Real Official Email / Gmail Brand SVG Icon
const RealEmailIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M22 6.5l-10 6.5L2 6.5V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6.5z"/>
    <path fill="#34A853" d="M22 6.5V6c0-1.1-.9-2-2-2h-3l-5 4-5-4H4c-1.1 0-2 .9-2 2v.5l10 6.5 10-6.5z"/>
    <path fill="#EA4335" d="M20 4H4c-1.1 0-2 .9-2 2v1.5l10 6.5 10-6.5V6c0-1.1-.9-2-2-2z"/>
    <path fill="#FBBC05" d="M2 7v1l10 6.5L22 8V7l-10 6.5L2 7z" opacity="0.3"/>
  </svg>
);

interface LeadReplyComposerProps {
  lead: LeadDetailItem;
  onCommunicationSent?: (comm: LeadCommunicationItem) => void;
}

// Clean and validate real human name, preventing "E-mail ID" or OCR label artifacts
export function getCleanCustomerName(lead: LeadDetailItem): string {
  const contactName = lead.contacts?.[0]?.name?.trim() || '';
  const isGarbage = !contactName || /^(e-?mail(\s*id)?|phone(\s*no)?|name|contact|unknown|null|undefined)$/i.test(contactName);

  if (!isGarbage) {
    return contactName;
  }
  const custInput = lead.customer_name_input?.trim() || '';
  if (custInput && !/^(unknown|null|undefined|e-?mail(\s*id)?)$/i.test(custInput)) {
    return custInput;
  }
  const company = lead.contacts?.[0]?.company?.trim() || '';
  if (company) {
    return company;
  }
  return 'Valued Commercial Partner';
}

export const LeadReplyComposer: React.FC<LeadReplyComposerProps> = ({ lead, onCommunicationSent }) => {
  const { authFetch } = useAdminAuth();

  // Active Channel: 'EMAIL' or 'WHATSAPP'
  const [channel, setChannel] = useState<'EMAIL' | 'WHATSAPP'>('EMAIL');

  // Editor View Mode: 'visual' (WYSIWYG) | 'code' (HTML source) | 'preview' (Live preview)
  const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'preview'>('visual');

  // Resolved dynamic values
  const primaryContact = lead.contacts?.[0];
  const defaultEmail = primaryContact?.emails?.[0] || '';
  const defaultPhone = primaryContact?.primary_phone || primaryContact?.phones?.[0]?.raw || '';
  const customerName = getCleanCustomerName(lead);
  const defaultCompany = primaryContact?.company || '';

  // Form states
  const [recipient, setRecipient] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [attachBrochure, setAttachBrochure] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [mailtoFallbackUrl, setMailtoFallbackUrl] = useState<string | null>(null);

  // Communications history
  const [communications, setCommunications] = useState<LeadCommunicationItem[]>(lead.communications || []);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [expandedCommId, setExpandedCommId] = useState<string | null>(null);

  const visualEditorRef = useRef<HTMLDivElement>(null);

  // Sync recipient and initial template when channel or lead changes
  useEffect(() => {
    if (channel === 'EMAIL') {
      setRecipient(defaultEmail);
      setSubject(`Commercial Inquiries & Specifications [Ref: ${lead.reference_code}] - Okhai Pharma`);
      if (!htmlContent || htmlContent.trim() === '' || htmlContent.includes('E-mail ID') || htmlContent.includes('Rutvik Ahir')) {
        loadTemplate('quotation');
      }
    } else {
      setRecipient(defaultPhone);
      if (!htmlContent || htmlContent.trim() === '' || htmlContent.includes('E-mail ID') || htmlContent.includes('Rutvik Ahir')) {
        loadTemplate('whatsapp_quick');
      }
    }
  }, [channel, lead.id]);

  // Keep contentEditable synced when switching between code/preview and visual
  useEffect(() => {
    if (editorMode === 'visual' && visualEditorRef.current) {
      if (visualEditorRef.current.innerHTML !== htmlContent) {
        visualEditorRef.current.innerHTML = htmlContent;
      }
    }
  }, [editorMode]);

  // Fetch communication history
  const refreshCommunications = async () => {
    try {
      setIsLoadingHistory(true);
      const data = await getSuperAdminLeadCommunications(authFetch, lead.id);
      setCommunications(data);
    } catch (e) {
      console.error('Failed to load communications history', e);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Pre-made SaaS Templates without any personal names
  const loadTemplate = (templateType: 'quotation' | 'brochure' | 'meeting' | 'whatsapp_quick') => {
    const custName = customerName;
    const compName = defaultCompany ? ` at ${defaultCompany}` : '';
    const refCode = lead.reference_code;

    if (templateType === 'quotation') {
      const tpl = `<p>Dear <strong>${custName}</strong>,</p>
<p>Thank you for connecting with <strong>Okhai Pharma Intermediates Pvt. Ltd.</strong> regarding your commercial nicotine intermediate requirements${compName}.</p>
<p>We have cataloged your file under commercial dossier reference <strong>${refCode}</strong>. Our state-of-the-art cGMP facility located in Anand, Gujarat produces high-purity chemical intermediates and pharmaceutical compounds under rigorous ISO and GLP compliance.</p>
<h3>Commercial Specifications &amp; Supply Grades:</h3>
<ul>
  <li><strong>Pure Nicotine 99.5%+ USP / EP:</strong> Pharmaceutical research &amp; active pharmaceutical intermediate grade with verified zero-impurity chromatographic resolution.</li>
  <li><strong>Nicotine Sulfate 40% Solution:</strong> High-miscibility technical &amp; research formulation grade.</li>
  <li><strong>Nicotine Alkaloid 90% &amp; 95%:</strong> Analytical and formulation intermediate grade.</li>
</ul>
<p>Attached to this communication is our corporate product brochure with complete HPLC/GC chromatograms, packaging dimensions (UN-certified fluorinated drums with dry nitrogen blanketing), and FOB/CIF delivery terms for Mundra/Nhava Sheva ports.</p>
<p>Kindly reply with your projected quantity, target delivery timeline, and delivery port so our sales engineering team can issue a formal pro-forma quotation.</p>
<p>Warm regards,<br>
<strong>Commercial Sales Desk</strong><br>
Okhai Pharma Intermediates Pvt. Ltd.<br>
<span style="color: #5B9A3C;">Gujarat, India · info@okhaipharma.com · +91 79900 82565</span></p>`;
      setHtmlContent(tpl);
      if (visualEditorRef.current) visualEditorRef.current.innerHTML = tpl;
    } else if (templateType === 'brochure') {
      const tpl = `<p>Dear <strong>${custName}</strong>,</p>
<p>Thank you for submitting your documentation on our digital commercial portal (Ref: <strong>${refCode}</strong>).</p>
<p>As requested, we are pleased to transmit the official <strong>Okhai Pharma Corporate Product Brochure &amp; Analytical Dossier</strong>. This document outlines our botanical extraction methodology, nitrogen-purged packaging, and certified batch analytical limits.</p>
<p>You may also directly access our live compliance portal here: <a href="https://okhaipharma.com/downloads/Okhai_Pharma_Brochure.pdf">https://okhaipharma.com/downloads/Okhai_Pharma_Brochure.pdf</a></p>
<p>Please let us know if your quality control team requires a sample batch Certificate of Analysis (CoA) or custom analytical testing parameters.</p>
<p>Best regards,<br>
<strong>Commercial Sales Desk</strong><br>
Okhai Pharma Intermediates Pvt. Ltd.</p>`;
      setHtmlContent(tpl);
      if (visualEditorRef.current) visualEditorRef.current.innerHTML = tpl;
    } else if (templateType === 'meeting') {
      const tpl = `<p>Dear <strong>${custName}</strong>,</p>
<p>I hope this email finds you well.</p>
<p>Following up on your commercial lead submission (<strong>${refCode}</strong>), our executive commercial team would welcome the opportunity to schedule a brief 15-minute briefing call or technical consultation.</p>
<p>During the briefing, we can review:</p>
<ul>
  <li>Your required batch assay parameters and compliance documentation</li>
  <li>Custom synthesis and packaging requirements (UN-certified drums)</li>
  <li>Sample dispatch timelines and logistics feasibility</li>
</ul>
<p>Please let us know what day and time works best for your schedule, or feel free to message us on WhatsApp at <strong>+91 79900 82565</strong>.</p>
<p>Warm regards,<br>
<strong>Commercial Sales Desk</strong><br>
Okhai Pharma Intermediates Pvt. Ltd.</p>`;
      setHtmlContent(tpl);
      if (visualEditorRef.current) visualEditorRef.current.innerHTML = tpl;
    } else if (templateType === 'whatsapp_quick') {
      const tpl = `Hello *${custName}*,\n\nGreetings from *Okhai Pharma Intermediates Pvt. Ltd.* (Gujarat, India).\n\nThank you for reaching out to us. We have registered your commercial inquiry under Reference: *${refCode}*.\n\nWe manufacture:\n• Pure Nicotine (99.5% USP/EP Grade)\n• Nicotine Sulfate 40% Solution\n• Nicotine Alkaloid 90% & 95%\n\nYou can review our full corporate brochure and analytical specifications online:\nhttps://okhaipharma.com/downloads/Okhai_Pharma_Brochure.pdf\n\nCould you please share your target volume requirements and destination port so we can share the best commercial quotation with you?\n\nBest regards,\n*Commercial Sales Desk*\nOkhai Pharma Intermediates Pvt. Ltd.`;
      setHtmlContent(tpl);
      if (visualEditorRef.current) visualEditorRef.current.innerText = tpl;
    }
  };

  // Variable chip insertion
  const insertVariable = (variable: string) => {
    let val = '';
    if (variable === 'ContactName') val = customerName;
    else if (variable === 'Company') val = defaultCompany || 'Your Organization';
    else if (variable === 'LeadRef') val = lead.reference_code;
    else if (variable === 'Email') val = defaultEmail;
    else if (variable === 'Phone') val = defaultPhone;
    else if (variable === 'BrochureLink') val = 'https://okhaipharma.com/downloads/Okhai_Pharma_Brochure.pdf';

    if (editorMode === 'visual' && visualEditorRef.current) {
      document.execCommand('insertText', false, val);
      setHtmlContent(visualEditorRef.current.innerHTML);
    } else {
      setHtmlContent((prev) => prev + ' ' + val);
    }
  };

  // WYSIWYG formatting execCommand helper
  const execFormat = (command: string, value: string | undefined = undefined) => {
    if (editorMode !== 'visual') return;
    document.execCommand(command, false, value);
    if (visualEditorRef.current) {
      setHtmlContent(visualEditorRef.current.innerHTML);
    }
  };

  // Convert HTML to clean plain text for WhatsApp or fallback
  const getPlainText = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText || div.textContent || '';
  };

  // Send Reply Handler
  const handleSendReply = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setMailtoFallbackUrl(null);

    const cleanRecipient = recipient.trim();
    if (!cleanRecipient) {
      setErrorMsg(`Please enter a recipient ${channel === 'EMAIL' ? 'email address' : 'phone number'}.`);
      return;
    }

    if (channel === 'EMAIL' && !cleanRecipient.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (channel === 'EMAIL' && !subject.trim()) {
      setErrorMsg('Please provide an email subject line.');
      return;
    }

    const currentContent = editorMode === 'visual' && visualEditorRef.current
      ? visualEditorRef.current.innerHTML
      : htmlContent;

    if (!currentContent.trim()) {
      setErrorMsg('Message content cannot be empty.');
      return;
    }

    try {
      setIsSending(true);

      const plainText = getPlainText(currentContent);

      const res = await sendSuperAdminLeadReply(authFetch, lead.id, {
        channel,
        recipient: cleanRecipient,
        subject: channel === 'EMAIL' ? subject.trim() : 'WhatsApp Reply',
        message_html: currentContent,
        message_text: plainText,
        attach_brochure: channel === 'EMAIL' ? attachBrochure : false,
      });

      setSuccessMsg(res.message || 'Reply processed successfully.');
      if (res.mailto_url) {
        setMailtoFallbackUrl(res.mailto_url);
      }

      if (res.communication) {
        setCommunications((prev) => [res.communication, ...prev]);
        if (onCommunicationSent) {
          onCommunicationSent(res.communication);
        }
      }

      // If WhatsApp, launch the link directly in a new window/tab
      if (channel === 'WHATSAPP' && res.whatsapp_url) {
        window.open(res.whatsapp_url, '_blank', 'noopener,noreferrer');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to dispatch reply. Please check connection.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-[#1E3D2A]/12 shadow-sm overflow-hidden space-y-0 transition-all">
      {/* 1. Header with SaaS Channel Switcher Tabs */}
      <div className="bg-[#FAFBF8] border-b border-[#1E3D2A]/10 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1E3D2A] text-[#8CC63F] flex items-center justify-center shadow-xs">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1E3D2A] flex items-center gap-2">
                Commercial Reply &amp; Dispatch Center
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#EAF2E5] text-[#5B9A3C] uppercase tracking-normal">
                  SaaS Dispatch
                </span>
              </h3>
              <p className="text-xs text-[#1E3D2A]/60">
                Direct client correspondence via verified corporate SMTP email and instant WhatsApp deep links.
              </p>
            </div>
          </div>
        </div>

        {/* Real Brand Icon Segmented Buttons */}
        <div className="inline-flex p-1 rounded-2xl bg-[#1E3D2A]/8 border border-[#1E3D2A]/10 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setChannel('EMAIL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              channel === 'EMAIL'
                ? 'bg-white text-[#1E3D2A] shadow-xs'
                : 'text-[#1E3D2A]/65 hover:text-[#1E3D2A]'
            }`}
          >
            <RealEmailIcon className="w-4 h-4 shrink-0" />
            <span>Email</span>
            {channel === 'EMAIL' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setChannel('WHATSAPP')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              channel === 'WHATSAPP'
                ? 'bg-[#25D366] text-white shadow-xs font-bold'
                : 'text-[#1E3D2A]/65 hover:text-[#1E3D2A]'
            }`}
          >
            <RealWhatsAppIcon className={`w-4 h-4 shrink-0 ${channel === 'WHATSAPP' ? 'text-white' : 'text-[#25D366]'}`} />
            <span>WhatsApp</span>
            {channel === 'WHATSAPP' && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Composer Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Recipient Input Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-3">
            <label className="block text-[11px] font-mono font-bold uppercase text-[#1E3D2A]/70">
              {channel === 'EMAIL' ? 'Recipient Email Address' : 'Recipient Phone Number'}
            </label>
            <span className="text-[10px] text-[#1E3D2A]/50">
              {channel === 'EMAIL' ? 'Primary contact mailbox' : 'International mobile format'}
            </span>
          </div>

          <div className="md:col-span-9 flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {channel === 'EMAIL' ? (
                  <RealEmailIcon className="w-4 h-4" />
                ) : (
                  <RealWhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                )}
              </div>
              <input
                type={channel === 'EMAIL' ? 'email' : 'text'}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={channel === 'EMAIL' ? 'customer@example.com' : '+91 98765 43210'}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs font-mono text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C] transition-colors"
              />
            </div>

            {/* Quick Fill from Extracted Contacts Chips */}
            {lead.contacts && lead.contacts.length > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                {channel === 'EMAIL' && primaryContact?.emails?.[0] && (
                  <button
                    type="button"
                    onClick={() => setRecipient(primaryContact.emails[0])}
                    className="px-2.5 py-1.5 rounded-lg bg-[#EAF2E5] hover:bg-[#d8e8d1] text-[10px] font-mono font-semibold text-[#5B9A3C] transition-colors"
                    title="Use Extracted Email"
                  >
                    Auto-Fill Email
                  </button>
                )}
                {channel === 'WHATSAPP' && (primaryContact?.primary_phone || primaryContact?.phones?.[0]?.raw) && (
                  <button
                    type="button"
                    onClick={() => setRecipient(primaryContact?.primary_phone || primaryContact?.phones?.[0]?.raw || '')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#EAF2E5] hover:bg-[#d8e8d1] text-[10px] font-mono font-semibold text-[#5B9A3C] transition-colors"
                    title="Use Extracted Phone"
                  >
                    Auto-Fill Phone
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Subject Line (For Email) */}
        {channel === 'EMAIL' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-3">
              <label className="block text-[11px] font-mono font-bold uppercase text-[#1E3D2A]/70">
                Subject Line
              </label>
              <span className="text-[10px] text-[#1E3D2A]/50">
                Corporate reference included
              </span>
            </div>
            <div className="md:col-span-9">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject of the email response..."
                className="w-full px-3 py-2 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C] transition-colors font-medium"
              />
            </div>
          </div>
        )}

        {/* 3. Pre-made SaaS Templates & Variable Chips Bar */}
        <div className="p-3.5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#5B9A3C]" />
              <span className="text-[11px] font-mono font-bold uppercase text-[#1E3D2A]/80">
                SaaS Templates:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {channel === 'EMAIL' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => loadTemplate('quotation')}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF2E5] border border-[#1E3D2A]/12 text-[10px] font-medium text-[#1E3D2A] transition-colors shadow-2xs"
                    >
                      Commercial Quotation
                    </button>
                    <button
                      type="button"
                      onClick={() => loadTemplate('brochure')}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF2E5] border border-[#1E3D2A]/12 text-[10px] font-medium text-[#1E3D2A] transition-colors shadow-2xs"
                    >
                      Brochure &amp; Dossier
                    </button>
                    <button
                      type="button"
                      onClick={() => loadTemplate('meeting')}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF2E5] border border-[#1E3D2A]/12 text-[10px] font-medium text-[#1E3D2A] transition-colors shadow-2xs"
                    >
                      Technical Briefing Call
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => loadTemplate('whatsapp_quick')}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EAF2E5] border border-[#1E3D2A]/12 text-[10px] font-medium text-[#1E3D2A] transition-colors shadow-2xs"
                  >
                    Standard WhatsApp Intro &amp; Brochure
                  </button>
                )}
              </div>
            </div>

            {/* View Mode Segment */}
            <div className="inline-flex p-0.5 rounded-xl bg-white border border-[#1E3D2A]/12 shadow-2xs text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setEditorMode('visual')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  editorMode === 'visual'
                    ? 'bg-[#1E3D2A] text-white font-bold'
                    : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                }`}
              >
                Visual Editor
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('code')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  editorMode === 'code'
                    ? 'bg-[#1E3D2A] text-white font-bold'
                    : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                }`}
              >
                <Code className="w-3 h-3" />
                HTML Source
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('preview')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  editorMode === 'preview'
                    ? 'bg-[#1E3D2A] text-white font-bold'
                    : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                }`}
              >
                <Eye className="w-3 h-3" />
                Live Preview
              </button>
            </div>
          </div>

          {/* Dynamic Smart Variables */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#1E3D2A]/8">
            <span className="text-[10px] font-mono text-[#1E3D2A]/60">Insert Variable:</span>
            {[
              { label: '{{ContactName}}', key: 'ContactName', desc: customerName },
              { label: '{{Company}}', key: 'Company', desc: defaultCompany || 'Org' },
              { label: '{{LeadRef}}', key: 'LeadRef', desc: lead.reference_code },
              { label: '{{BrochureLink}}', key: 'BrochureLink', desc: 'Direct URL' },
            ].map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => insertVariable(v.key)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-[#1E3D2A]/15 text-[10px] font-mono text-[#1E3D2A] hover:bg-[#5B9A3C]/10 hover:border-[#5B9A3C]/40 transition-colors"
                title={`Insert: ${v.desc}`}
              >
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. HTML Rich Editor Toolbar (Visible only in Visual mode) */}
        {editorMode === 'visual' && (
          <div className="flex flex-wrap items-center gap-1 p-2 rounded-xl bg-[#FAFBF8] border border-[#1E3D2A]/10 text-[#1E3D2A]">
            <button
              type="button"
              onClick={() => execFormat('bold')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execFormat('italic')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execFormat('underline')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Underline"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-[#1E3D2A]/15 mx-1" />

            <button
              type="button"
              onClick={() => execFormat('formatBlock', '<h2>')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Heading 2"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execFormat('formatBlock', '<h3>')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Heading 3"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-[#1E3D2A]/15 mx-1" />

            <button
              type="button"
              onClick={() => execFormat('insertUnorderedList')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execFormat('insertOrderedList')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execFormat('formatBlock', '<blockquote>')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Quote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-[#1E3D2A]/15 mx-1" />

            <button
              type="button"
              onClick={() => {
                const url = prompt('Enter link URL:');
                if (url) execFormat('createLink', url);
              }}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Insert Link"
            >
              <Link2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execFormat('removeFormat')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-[#1E3D2A] transition-colors"
              title="Clear Formatting"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 5. Editor Workspace Area */}
        <div className="relative rounded-2xl border border-[#1E3D2A]/15 overflow-hidden bg-white">
          {/* A. VISUAL WYSIWYG MODE */}
          {editorMode === 'visual' && (
            <div
              ref={visualEditorRef}
              contentEditable
              onInput={(e) => setHtmlContent(e.currentTarget.innerHTML)}
              className="min-h-[220px] max-h-[380px] p-4 overflow-y-auto focus:outline-none text-xs leading-relaxed text-[#1E3D2A] prose prose-sm max-w-none"
              style={{ minHeight: '220px' }}
            />
          )}

          {/* B. RAW HTML SOURCE CODE MODE */}
          {editorMode === 'code' && (
            <textarea
              rows={12}
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="w-full p-4 font-mono text-[11px] leading-relaxed text-[#8CC63F] bg-[#0A160F] focus:outline-none resize-y min-h-[220px]"
              placeholder="Write or edit raw HTML tags here..."
            />
          )}

          {/* C. LIVE PREVIEW MODE */}
          {editorMode === 'preview' && (
            <div className="p-4 bg-[#F8F9F4] min-h-[220px] max-h-[380px] overflow-y-auto">
              <div className="max-w-[560px] mx-auto bg-white rounded-xl border border-[#1E3D2A]/10 shadow-xs overflow-hidden">
                <div className="bg-[#1E3D2A] p-3.5 text-white">
                  <div className="text-xs font-bold">Okhai Pharma Intermediates Pvt. Ltd.</div>
                  <div className="text-[10px] text-[#8CC63F] font-mono">Commercial Sales Desk · Gujarat, India</div>
                </div>
                <div className="p-4 text-xs text-[#1E3D2A] leading-relaxed">
                  <div className="text-[10px] font-mono text-[#5B9A3C] font-semibold mb-2">
                    Ref: {lead.reference_code}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="prose prose-xs max-w-none text-[#1E3D2A]"
                  />
                </div>
                <div className="p-3 bg-[#FAFBF8] border-t border-[#1E3D2A]/8 text-[9px] text-[#1E3D2A]/60">
                  Dispatched via verified commercial SMTP engine · Kasor, Sojitra, Gujarat
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 6. Action Controls & Dispatch Options */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {/* Options */}
          <div className="flex items-center gap-3">
            {channel === 'EMAIL' && (
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#1E3D2A]/80 select-none">
                <input
                  type="checkbox"
                  checked={attachBrochure}
                  onChange={(e) => setAttachBrochure(e.target.checked)}
                  className="rounded border-[#1E3D2A]/30 text-[#5B9A3C] focus:ring-[#5B9A3C]"
                />
                <Paperclip className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Attach Corporate Brochure (PDF, 3.4 MB)</span>
              </label>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isSending}
              onClick={handleSendReply}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                channel === 'EMAIL'
                  ? 'bg-[#1E3D2A] text-white hover:bg-[#152c1e]'
                  : 'bg-[#25D366] text-white hover:bg-[#1EBE5D]'
              }`}
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : channel === 'EMAIL' ? (
                <>
                  <RealEmailIcon className="w-4 h-4 shrink-0" />
                  <span>Send Commercial Email</span>
                </>
              ) : (
                <>
                  <RealWhatsAppIcon className="w-4 h-4 shrink-0 text-white" />
                  <span>Send via WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/30 text-xs text-[#1E3D2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#5B9A3C] shrink-0" />
              <span className="font-medium">{successMsg}</span>
            </div>
            {mailtoFallbackUrl && (
              <a
                href={mailtoFallbackUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E3D2A] text-white text-[11px] font-mono hover:bg-[#152c1e] transition-colors shrink-0"
              >
                <ExternalLink className="w-3 h-3 text-[#8CC63F]" />
                <span>Open in Mail App (Outlook / Gmail)</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* 7. Sent Communications Timeline & Database Log */}
      <div className="border-t border-[#1E3D2A]/10 bg-[#FAFBF8] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5B9A3C]" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
              Sent Communications &amp; Conversation Trail ({communications.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={refreshCommunications}
            disabled={isLoadingHistory}
            className="flex items-center gap-1.5 text-[10px] font-mono text-[#5B9A3C] hover:underline cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingHistory ? 'animate-spin' : ''}`} />
            <span>Refresh Log</span>
          </button>
        </div>

        {communications.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-[#1E3D2A]/10 text-center space-y-1">
            <p className="text-xs font-medium text-[#1E3D2A]/60">
              No previous replies dispatched for this lead yet.
            </p>
            <p className="text-[11px] text-[#1E3D2A]/40">
              Use the composer above to send your first email or WhatsApp message. Every transmission is recorded into the database.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
            {communications.map((comm) => {
              const isExpanded = expandedCommId === comm.id;
              const isEmail = comm.channel === 'EMAIL';
              return (
                <div
                  key={comm.id}
                  className="rounded-2xl bg-white border border-[#1E3D2A]/10 p-3.5 space-y-2 transition-all hover:border-[#1E3D2A]/25"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          isEmail
                            ? 'bg-[#EAF2E5] text-[#5B9A3C]'
                            : 'bg-[#25D366]/15 text-[#1b8c44]'
                        }`}
                      >
                        {isEmail ? <RealEmailIcon className="w-3.5 h-3.5" /> : <RealWhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />}
                        {comm.channel}
                      </span>

                      <span className="text-xs font-bold text-[#1E3D2A]">
                        {comm.recipient}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase ${
                          comm.status === 'SENT' || comm.status === 'OPENED_WHATSAPP'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : comm.status === 'LOGGED'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {comm.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#1E3D2A]/50">
                        {new Date(comm.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(comm.created_at).toLocaleDateString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedCommId(isExpanded ? null : comm.id)}
                        className="p-1 rounded-lg hover:bg-[#F8F9F4] text-[#1E3D2A]/60 hover:text-[#1E3D2A] transition-colors"
                        title={isExpanded ? 'Collapse' : 'Inspect Message'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary Row */}
                  <div className="flex items-center justify-between text-[11px] text-[#1E3D2A]/70">
                    <span className="truncate max-w-[70%] font-medium">
                      {comm.subject || 'Direct Message'}
                    </span>
                    <span className="text-[10px] font-mono text-[#1E3D2A]/50">
                      by <strong className="text-[#5B9A3C]">{comm.sender && !comm.sender.includes('Rutvik') ? comm.sender : 'Okhai Pharma'}</strong>
                    </span>
                  </div>

                  {/* Expanded Body Drawer */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-[#1E3D2A]/8 space-y-2">
                      {comm.error_message && (
                        <div className="p-2 rounded-lg bg-amber-50 text-[11px] text-amber-800 font-mono">
                          Status note: {comm.error_message}
                        </div>
                      )}
                      <div className="p-3 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/8 text-xs text-[#1E3D2A] leading-relaxed max-h-[220px] overflow-y-auto">
                        {comm.message_html ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: comm.message_html }}
                            className="prose prose-xs max-w-none"
                          />
                        ) : (
                          <p className="whitespace-pre-wrap font-mono text-[11px]">{comm.message_text}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default LeadReplyComposer;
