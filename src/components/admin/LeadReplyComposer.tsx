import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
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
  User,
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
  FileText,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { LeadDetailItem, LeadCommunicationItem } from '../../types/lead';
import { sendSuperAdminLeadReply, getSuperAdminLeadCommunications } from '../../services/leadApi';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface LeadReplyComposerProps {
  lead: LeadDetailItem;
  onCommunicationSent?: (comm: LeadCommunicationItem) => void;
}

export const LeadReplyComposer: React.FC<LeadReplyComposerProps> = ({ lead, onCommunicationSent }) => {
  const { authFetch, admin } = useAdminAuth();

  // Active Channel: 'EMAIL' or 'WHATSAPP'
  const [channel, setChannel] = useState<'EMAIL' | 'WHATSAPP'>('EMAIL');

  // Editor View Mode: 'visual' (WYSIWYG) | 'code' (HTML source) | 'preview' (Live preview)
  const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'preview'>('visual');

  // Lead contact extraction defaults
  const primaryContact = lead.contacts?.[0];
  const defaultEmail = primaryContact?.emails?.[0] || '';
  const defaultPhone = primaryContact?.primary_phone || primaryContact?.phones?.[0]?.raw || '';
  const defaultName = primaryContact?.name || lead.customer_name_input || 'Valued Partner';
  const defaultCompany = primaryContact?.company || '';

  // Form states
  const [recipient, setRecipient] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [attachBrochure, setAttachBrochure] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Communications history
  const [communications, setCommunications] = useState<LeadCommunicationItem[]>(lead.communications || []);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [expandedCommId, setExpandedCommId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const visualEditorRef = useRef<HTMLDivElement>(null);

  // Sync recipient and initial template when channel or lead changes
  useEffect(() => {
    if (channel === 'EMAIL') {
      setRecipient(defaultEmail);
      setSubject(`Commercial Inquiries & Specifications [Ref: ${lead.reference_code}] - Okhai Pharma`);
      if (!htmlContent || htmlContent.trim() === '') {
        loadTemplate('quotation');
      }
    } else {
      setRecipient(defaultPhone);
      if (!htmlContent || htmlContent.trim() === '') {
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

  // Pre-made SaaS Templates
  const loadTemplate = (templateType: 'quotation' | 'brochure' | 'meeting' | 'whatsapp_quick') => {
    const custName = defaultName || 'Valued Partner';
    const compName = defaultCompany ? ` at ${defaultCompany}` : '';
    const refCode = lead.reference_code;

    if (templateType === 'quotation') {
      const tpl = `<p>Dear <strong>${custName}</strong>,</p>
<p>Thank you for connecting with <strong>Okhai Pharma Intermediates Pvt. Ltd.</strong> regarding your commercial nicotine intermediate requirements${compName}.</p>
<p>We have cataloged your file under commercial dossier reference <strong>${refCode}</strong>. Our state-of-the-art cGMP facility located in Anand, Gujarat produces high-purity chemical intermediates and pharmaceutical compounds under rigorous ISO and GLP compliance.</p>
<h3>Commercial Specifications & Supply Grades:</h3>
<ul>
  <li><strong>Pure Nicotine 99.5%+ USP / EP:</strong> Pharmaceutical research & active pharmaceutical intermediate grade with verified zero-impurity chromatographic resolution.</li>
  <li><strong>Nicotine Sulfate 40% Solution:</strong> High-miscibility technical & research formulation grade.</li>
  <li><strong>Nicotine Alkaloid 90% &amp; 95%:</strong> Analytical and formulation intermediate grade.</li>
</ul>
<p>Attached to this communication is our comprehensive corporate product brochure with complete HPLC/GC chromatograms, packaging dimensions (UN-certified fluorinated drums with dry nitrogen blanketing), and FOB/CIF delivery terms for Mundra/Nhava Sheva ports.</p>
<p>Kindly reply with your projected quantity, target delivery timeline, and delivery port so our sales engineering team can issue a formal pro-forma quotation.</p>
<p>Warm regards,<br>
<strong>${admin?.full_name || 'Commercial Sales Desk'}</strong><br>
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
<strong>Okhai Pharma Commercial Desk</strong></p>`;
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
<strong>${admin?.full_name || 'Commercial Desk'}</strong><br>
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
    if (variable === 'ContactName') val = defaultName;
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
      if (res.communication) {
        setCommunications((prev) => [res.communication, ...prev]);
        if (onCommunicationSent) {
          onCommunicationSent(res.communication);
        }
      }

      // If WhatsApp, launch the link
      if (channel === 'WHATSAPP' && res.whatsapp_url) {
        window.open(res.whatsapp_url, '_blank', 'noopener,noreferrer');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to dispatch reply. Please check your credentials and connection.');
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

        {/* Channel Segmented Buttons */}
        <div className="inline-flex p-1 rounded-2xl bg-[#1E3D2A]/8 border border-[#1E3D2A]/10 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setChannel('EMAIL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              channel === 'EMAIL'
                ? 'bg-white text-[#1E3D2A] shadow-xs'
                : 'text-[#1E3D2A]/60 hover:text-[#1E3D2A]'
            }`}
          >
            <Mail className={`w-3.5 h-3.5 ${channel === 'EMAIL' ? 'text-[#5B9A3C]' : ''}`} />
            <span>Email (SMTP)</span>
            {channel === 'EMAIL' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C] animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setChannel('WHATSAPP')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              channel === 'WHATSAPP'
                ? 'bg-[#25D366] text-white shadow-xs font-bold'
                : 'text-[#1E3D2A]/60 hover:text-[#1E3D2A]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
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
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1E3D2A]/40">
                {channel === 'EMAIL' ? <Mail className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
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
                    title="Use OCR Extracted Email"
                  >
                    Auto-Fill Email
                  </button>
                )}
                {channel === 'WHATSAPP' && (primaryContact?.primary_phone || primaryContact?.phones?.[0]?.raw) && (
                  <button
                    type="button"
                    onClick={() => setRecipient(primaryContact?.primary_phone || primaryContact?.phones?.[0]?.raw || '')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#EAF2E5] hover:bg-[#d8e8d1] text-[10px] font-mono font-semibold text-[#5B9A3C] transition-colors"
                    title="Use OCR Extracted Phone"
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
              { label: '{{ContactName}}', key: 'ContactName', desc: defaultName },
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
              className="w-full p-4 font-mono text-[11px] leading-relaxed text-[#1E3D2A] bg-[#0A160F] text-[#8CC63F] focus:outline-none resize-y min-h-[220px]"
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

        {/* 6. WhatsApp Live Preview Bubble (Shown when in WhatsApp Mode) */}
        {channel === 'WHATSAPP' && (
          <div className="p-3.5 rounded-2xl bg-[#EFEAE2] border border-[#1E3D2A]/10 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#1E3D2A]/60">
              <span className="flex items-center gap-1 font-semibold text-[#1E3D2A]">
                <MessageSquare className="w-3 h-3 text-[#25D366]" />
                WhatsApp Message Preview
              </span>
              <span>Recipient: {recipient || '+91 ...'}</span>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[90%] sm:max-w-[80%] rounded-xl rounded-tr-none bg-[#E7FFDB] p-3 shadow-2xs text-xs text-[#111B21] whitespace-pre-wrap leading-relaxed">
                {getPlainText(htmlContent)}
                <div className="text-[9px] text-[#667781] text-right mt-1 font-mono">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. Action Controls & Dispatch Options */}
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
                  <Send className="w-3.5 h-3.5 text-[#8CC63F]" />
                  <span>Send Commercial Email</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open WhatsApp &amp; Log Reply</span>
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
          <div className="p-3 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/30 text-xs text-[#1E3D2A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B9A3C] shrink-0" />
            <span className="font-medium">{successMsg}</span>
          </div>
        )}
      </div>

      {/* 8. Sent Communications Timeline & Database Log */}
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
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          isEmail
                            ? 'bg-[#EAF2E5] text-[#5B9A3C]'
                            : 'bg-[#25D366]/15 text-[#1b8c44]'
                        }`}
                      >
                        {isEmail ? <Mail className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
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
                      by <strong className="text-[#5B9A3C]">{comm.sender || 'superadmin'}</strong>
                    </span>
                  </div>

                  {/* Expanded Body Drawer */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-[#1E3D2A]/8 space-y-2">
                      {comm.error_message && (
                        <div className="p-2 rounded-lg bg-red-50 text-[11px] text-red-700 font-mono">
                          Error: {comm.error_message}
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
