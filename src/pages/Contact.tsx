import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Send,
  Building2,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS, PRODUCTS, LEADERSHIP } from '../data/companyData';
import { FadeInLeft, FadeInRight, FadeInUp } from '../components/common/animations';

export const Contact: React.FC = () => {
  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('Nicotine Sulfate 40%');
  const [quantity, setQuantity] = useState('');
  const [entityType, setEntityType] = useState<'business' | 'residential'>('business');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Status & Validation
  const [submitting, setSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !company || !email.includes('@') || !phone || !quantity) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please acknowledge the B2B hazardous handling terms.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          company,
          email,
          phone,
          quantity,
          product,
          entityType,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setInquiryId(data.inquiryId);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Server connection error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactFaqs = [
    {
      q: "Who are the owners and directors of Okhai Pharma?",
      a: "Okhai Pharma Intermediates Pvt. Ltd. was founded and is directed by Mr. Parth Visana and Mr. Lakhaman Odedra, with Mr. Satyen Chudasama leading plant operations as General Manager."
    },
    {
      q: "What products are manufactured at the Gujarat plant?",
      a: "Our core commercial production lines specialize in Nicotine Sulfate 40% (water-soluble intermediate) and high-purity Nicotine Alkaloid 90% and 95% (pharmaceutical API grade)."
    },
    {
      q: "Where is the physical extraction facility located?",
      a: "The plant is situated at Sr No. 538, Ashapuri-Changa Road, Vill-Kasor, Ta-Sojitra, Dist-Anand, Gujarat 388460, India."
    },
    {
      q: "What is the minimum order quantity (MOQ)?",
      a: "Standard MOQs depend on packaging format and hazardous transport regulations. For specific production allocation details, contact our commercial desk at +91 87583 23513."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F4] text-[#1E3D2A] pb-24">
      {/* Breadcrumb & Hero */}
      <section className="pt-10 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E3D2A]/60 mb-6">
          <Link to="/" className="hover:text-[#5B9A3C]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5B9A3C]">Contact &amp; Quotation</span>
        </div>

        <FadeInUp>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
              Commercial Desk
            </span>
            <h1 className="text-[clamp(2.5rem,4.5vw,4.25rem)] font-serif font-medium text-[#1E3D2A] mt-2 leading-[1.1]">
              Direct sourcing quote.{' '}
              <span className="italic font-normal text-[#5B9A3C] font-editorial">Fast, compliant</span> response.
            </h1>
            <p className="mt-4 text-base text-[#1E3D2A]/75 font-light leading-relaxed">
              Submit your technical batch requirements, packaging specifications, or export inquiry below. Our commercial desk coordinates directly with licensed enterprises worldwide.
            </p>
          </div>
        </FadeInUp>
      </section>

      {/* Split Layout: Left Form + Right Info Cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form (7 cols) */}
          <FadeInLeft className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border hairline-border shadow-xl">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fadeIn">
                {/* Leaf Blooms Success Animation */}
                <div className="w-20 h-20 rounded-full bg-[#E6EEDF] flex items-center justify-center text-[#5B9A3C] shadow-inner">
                  <svg viewBox="0 0 40 40" className="w-12 h-12 animate-bounce" fill="currentColor">
                    <path d="M20 38C19 25 24 16 38 12C28 10 20 18 19 25C18 14 10 8 2 12C14 16 19 25 20 38Z" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 text-xs font-mono font-bold text-[#2E683A]">
                  <span>Ref ID: #OKHAI-{inquiryId || 'NEW'}</span>
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#1E3D2A]">
                  Quotation Request Received &amp; Dispatched
                </h3>
                <p className="text-sm text-[#1E3D2A]/75 max-w-md leading-relaxed font-light">
                  Thank you, {firstName}. Your requirement for <strong className="font-semibold text-[#1E3D2A]">{product}</strong> ({quantity}) has been saved to our commercial database and an instant notification has been dispatched to Superadmin Rutvik Ahir (<strong className="text-[#5B9A3C]">rutvikaahir30@gmail.com</strong>).
                </p>
                <div className="p-3.5 rounded-xl bg-[#FAFBF8] border hairline-border text-xs text-[#1E3D2A]/80 max-w-md text-left space-y-1">
                  <div className="font-semibold text-[#1E3D2A]">What happens next?</div>
                  <div className="font-light text-[11px] leading-relaxed">
                    1. Commercial sales desk verifies batch availability &amp; packaging format.<br />
                    2. Lot-specific Certificate of Analysis (CoA) &amp; formal quote sent to <span className="font-mono text-[#5B9A3C]">{email}</span> within 24 hours.
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                      setInquiryId(null);
                    }}
                    className="px-6 py-2.5 rounded-xl border hairline-border text-xs font-semibold text-[#1E3D2A] hover:bg-[#F8F9F4] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b hairline-border">
                  <h3 className="text-xl font-serif font-medium text-[#1E3D2A]">
                    Request a Formal Quote
                  </h3>
                  <span className="text-xs font-mono text-[#5B9A3C]">* B2B Licensed Entities</span>
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Rahul"
                      required
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Sharma"
                      required
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    />
                  </div>
                </div>

                {/* Company & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. BioSynthetix Labs"
                      required
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    />
                  </div>
                </div>

                {/* Phone & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">Direct Phone / Mobile *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 / +1 ..."
                      required
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">Estimated Quantity (kg / L) *</label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 500 Liters / 200 kg"
                      required
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    />
                  </div>
                </div>

                {/* Product Dropdown & Residential/Business Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">Product Formulation *</label>
                    <select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                    >
                      <option value="Nicotine Sulfate 40%">Nicotine Sulfate 40% (Water-Soluble)</option>
                      <option value="Nicotine Alkaloid 90%">Nicotine Alkaloid 90% (High Purity)</option>
                      <option value="Nicotine Alkaloid 95%">Nicotine Alkaloid 95% (Pharma API)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E3D2A] mb-1">Delivery Address Type</label>
                    <div className="flex rounded-xl p-1 bg-[#F8F9F4] border hairline-border">
                      <button
                        type="button"
                        onClick={() => setEntityType('business')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          entityType === 'business'
                            ? 'bg-white text-[#5B9A3C] shadow-xs font-semibold'
                            : 'text-[#1E3D2A]/60'
                        }`}
                      >
                        Commercial / Lab
                      </button>
                      <button
                        type="button"
                        onClick={() => setEntityType('residential')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          entityType === 'residential'
                            ? 'bg-white text-amber-800 shadow-xs font-semibold'
                            : 'text-[#1E3D2A]/60'
                        }`}
                      >
                        Residential (Restricted)
                      </button>
                    </div>
                  </div>
                </div>

                {entityType === 'residential' && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    Notice: Pure nicotine intermediates cannot be shipped to residential addresses under Indian &amp; international dangerous goods statutes. Commercial/institutional dispatch only.
                  </p>
                )}

                {/* Message with 180-character counter */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-[#1E3D2A]">Technical Specifications / Destination Port</label>
                    <span className="text-[10px] font-mono text-[#1E3D2A]/50">{message.length}/180</span>
                  </div>
                  <textarea
                    maxLength={180}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Enter required packaging drum size, destination customs port, or specific analytical assay requirements..."
                    className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C]"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#5B9A3C] focus:ring-[#5B9A3C]"
                  />
                  <label htmlFor="consent" className="text-xs text-[#1E3D2A]/75 leading-relaxed font-light">
                    I confirm that our organization is a licensed commercial, pharmaceutical, or research entity authorized to receive Class 6.1 toxic substances.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#5B9A3C] hover:bg-[#4E8A32] text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-98"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Request &amp; Alerting Superadmin...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quotation Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </FadeInLeft>

          {/* Right Info Cards (5 cols) */}
          <FadeInRight className="lg:col-span-5 space-y-6">
            {/* Direct Contacts Card */}
            <div className="p-7 rounded-3xl bg-white border hairline-border shadow-xs space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B9A3C] font-semibold">
                Direct Contact Channels
              </span>

              <div className="space-y-3.5 text-xs text-[#1E3D2A]">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#5B9A3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Commercial Inquiries:</span>
                    <a href={`tel:${COMPANY_DETAILS.phone}`} className="font-mono text-sm font-semibold text-[#1E3D2A] hover:text-[#5B9A3C]">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>


                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#5B9A3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Official Email:</span>
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-sm hover:text-[#5B9A3C]">
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#5B9A3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Operational Hours:</span>
                    <span className="text-[#1E3D2A]/70">Mon - Sat: 09:00 - 18:00 IST</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#128C7E] text-xs font-semibold hover:bg-[#25D366]/25 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Plant Address & Styled Light Map Card */}
            <div className="p-7 rounded-3xl bg-white border hairline-border shadow-xs space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B9A3C] font-semibold">
                Manufacturing Facility
              </span>

              <div className="flex items-start gap-2.5 text-xs text-[#1E3D2A]/80 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#5B9A3C] shrink-0 mt-0.5" />
                <p>{COMPANY_DETAILS.address}</p>
              </div>

              {/* Live Interactive Google Map */}
              <div className="mt-4 rounded-2xl overflow-hidden border border-[#5B9A3C]/25 aspect-[16/10] relative shadow-xs group bg-[#F4F9F1]">
                <iframe
                  title="Okhai Pharma Kasor Anand Plant Location"
                  src="https://maps.google.com/maps?q=Sr+No.+538,+Ashapuri-Changa+Road,+Vill-Kasor,+Ta-Sojitra,+Dist-Anand,+Gujarat+388460&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Floating Map Info Bar */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#5B9A3C]/25 shadow-md flex items-center gap-1.5 pointer-events-auto">
                    <MapPin className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                    <span className="text-[11px] font-mono font-bold text-[#143823] truncate">
                      Kasor, Sojitra, Anand, Gujarat
                    </span>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Sr+No.+538,+Ashapuri-Changa+Road,+Vill-Kasor,+Ta-Sojitra,+Dist-Anand,+Gujarat+388460"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#143823] hover:bg-[#1E4D35] text-white text-[11px] font-semibold shadow-md flex items-center gap-1 pointer-events-auto transition-transform hover:scale-102"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3 text-[#8CC63F]" />
                  </a>
                </div>
              </div>
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* FAQ Strip */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <FadeInUp>
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
              Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1E3D2A] mt-1">
              Frequently Asked Commercial Questions
            </h2>
          </div>
        </FadeInUp>

        <div className="space-y-3">
          {contactFaqs.map((faq, i) => (
            <div key={i} className="border hairline-border rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-4 px-6 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1E3D2A] hover:bg-[#F8F9F4] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#5B9A3C] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-xs sm:text-sm text-[#1E3D2A]/80 leading-relaxed font-light border-t hairline-border pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
