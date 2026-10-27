import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldAlert, FileText, AlertTriangle } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

export const Legal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="min-h-screen bg-[#F8F9F4] text-[#1E3D2A] pb-24">
      {/* Breadcrumb & Hero */}
      <section className="pt-10 pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E3D2A]/60 mb-6">
          <Link to="/" className="hover:text-[#5B9A3C]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5B9A3C]">Legal &amp; Regulatory</span>
        </div>

        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
            Compliance &amp; Governance
          </span>
          <h1 className="text-[clamp(2.25rem,4vw,3.75rem)] font-serif font-medium text-[#1E3D2A] mt-2 leading-[1.1]">
            Legal, Privacy &amp; Regulatory Notices
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#1E3D2A]/60 font-mono">
            [Draft legal provisions — subject to formal legal review and jurisdictional counsel]
          </p>
        </div>

        {/* Tab switch */}
        <div className="mt-8 flex gap-2 border-b hairline-border pb-1">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'bg-white text-[#5B9A3C] shadow-xs border hairline-border'
                : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'terms'
                ? 'bg-white text-[#5B9A3C] shadow-xs border hairline-border'
                : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
            }`}
          >
            Terms &amp; Disclaimer
          </button>
        </div>
      </section>

      {/* Mandatory Hazardous Notice Strip */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Mandatory Chemical Regulatory Warning:</strong>
            Nicotine and its intermediate derivatives are toxic chemical substances (Class 6.1, UN 1658 / UN 1654). They are manufactured and supplied strictly for licensed B2B pharmaceutical, academic research, and accredited chemical synthesis. All purchasers must maintain valid dangerous goods storage permits and handle products strictly in adherence to the official Safety Data Sheet (SDS) and applicable local and international environmental legislation.
          </div>
        </div>
      </section>

      {/* Main Content with Sticky TOC */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Table of Contents (3 cols) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-3xl bg-white border hairline-border shadow-xs space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5B9A3C] font-semibold block">
                Table of Contents
              </span>
              <ul className="space-y-2 text-xs text-[#1E3D2A]/75">
                {activeTab === 'privacy' ? (
                  <>
                    <li><a href="#data-collection" className="hover:text-[#5B9A3C]">1. Commercial Data Collection</a></li>
                    <li><a href="#use-of-info" className="hover:text-[#5B9A3C]">2. Purpose &amp; Processing</a></li>
                    <li><a href="#compliance-records" className="hover:text-[#5B9A3C]">3. Hazardous Regulatory Records</a></li>
                    <li><a href="#data-security" className="hover:text-[#5B9A3C]">4. Information Security</a></li>
                    <li><a href="#contact-officer" className="hover:text-[#5B9A3C]">5. Data Privacy Officer</a></li>
                  </>
                ) : (
                  <>
                    <li><a href="#b2b-restriction" className="hover:text-[#5B9A3C]">1. Strict B2B Commercial Scope</a></li>
                    <li><a href="#product-disclaimer" className="hover:text-[#5B9A3C]">2. Chemical Warranty Disclaimer</a></li>
                    <li><a href="#regulatory-compliance" className="hover:text-[#5B9A3C]">3. Purchaser Legal Obligations</a></li>
                    <li><a href="#intellectual-property" className="hover:text-[#5B9A3C]">4. Intellectual Property</a></li>
                    <li><a href="#jurisdiction" className="hover:text-[#5B9A3C]">5. Governing Jurisdiction (Gujarat)</a></li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Legal Text Body (8 cols) */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border hairline-border shadow-xs leading-relaxed space-y-8 text-xs sm:text-sm text-[#1E3D2A]/85 font-light">
            {activeTab === 'privacy' ? (
              <>
                <div>
                  <h3 id="data-collection" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    1. Commercial Data Collection
                  </h3>
                  <p>
                    Okhai Pharma Intermediates Pvt. Ltd. collects information submitted through quotation requests, technical specification downloads, and commercial inquiries. This includes corporate entity name, representative name, business contact details, delivery addresses, and commercial tax/regulatory identifiers.
                  </p>
                </div>

                <div>
                  <h3 id="use-of-info" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    2. Purpose &amp; Processing
                  </h3>
                  <p>
                    Collected data is processed solely for preparing commercial quotations, arranging authorized chemical logistics, fulfilling statutory Dangerous Goods Declarations, and maintaining required transaction records under Government of India export regulations.
                  </p>
                </div>

                <div>
                  <h3 id="compliance-records" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    3. Hazardous Regulatory Records
                  </h3>
                  <p>
                    Under national and international poison control laws, records pertaining to the dispatch and receipt of Class 6.1 chemical intermediates may be preserved for regulatory audit by customs, pollution control boards, and maritime authorities.
                  </p>
                </div>

                <div>
                  <h3 id="data-security" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    4. Information Security
                  </h3>
                  <p>
                    All corporate identity information is protected using administrative, technical, and physical safeguards. We never sell, lease, or distribute commercial contact details to consumer marketing brokers.
                  </p>
                </div>

                <div>
                  <h3 id="contact-officer" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    5. Compliance &amp; Privacy Officer
                  </h3>
                  <p>
                    For inquiries regarding corporate data or to update your commercial records, contact: <br />
                    <span className="font-mono text-[#5B9A3C]">{COMPANY_DETAILS.email}</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 id="b2b-restriction" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    1. Strict B2B Commercial Scope
                  </h3>
                  <p>
                    Products listed on this website (including Nicotine Sulfate 40% and Nicotine Alkaloid 90% and 95%) are strictly intended for sale to verified corporate entities, pharmaceutical formulation laboratories, and accredited research institutes. No retail consumer transactions will be entertained.
                  </p>
                </div>

                <div>
                  <h3 id="product-disclaimer" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    2. Chemical Warranty Disclaimer
                  </h3>
                  <p>
                    Technical data and specifications provided on this website and accompanying literature are based on controlled laboratory batch analyses. While Okhai Pharma warrants that products conform to the analytical Certificate of Analysis released with each specific production lot, the purchaser is responsible for confirming suitability for their proprietary synthesis or formulation processes.
                  </p>
                </div>

                <div>
                  <h3 id="regulatory-compliance" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    3. Purchaser Legal Obligations
                  </h3>
                  <p>
                    The purchaser represents that it holds all necessary federal, state, and local licenses required to purchase, transport, store, and utilize toxic chemical intermediates. The purchaser indemnifies Okhai Pharma Intermediates Pvt. Ltd. against improper storage, unauthorized diversion, or negligent handling.
                  </p>
                </div>

                <div>
                  <h3 id="intellectual-property" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    4. Intellectual Property
                  </h3>
                  <p>
                    All trademarks, corporate marks, logos, technical dossiers, and chromatographic imagery displayed on this domain are the exclusive property of Okhai Pharma Intermediates Pvt. Ltd.
                  </p>
                </div>

                <div>
                  <h3 id="jurisdiction" className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    5. Governing Jurisdiction
                  </h3>
                  <p>
                    Any disputes arising out of commercial contracts or technical supply agreements shall be subject to the exclusive jurisdiction of the competent courts in Anand / Ahmedabad, Gujarat, India.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
