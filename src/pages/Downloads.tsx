import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  FileDown,
  Lock,
  FileText,
  CheckCircle2,
  X,
  AlertCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import { DOCUMENTS } from '../data/companyData';
import { DocumentItem } from '../types';
import { FadeInUp, StaggerContainer, StaggerItem } from '../components/common/animations';

export const Downloads: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPurpose, setFormPurpose] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleDownloadClick = (doc: DocumentItem) => {
    if (doc.requiresRequest) {
      setSelectedDoc(doc);
      setFormSubmitted(false);
      setFormError('');
      setRequestModalOpen(true);
    } else {
      // Mock instant file download
      setDownloadSuccess(`Initiated download: ${doc.title}`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCompany || !formEmail.includes('@') || !formPurpose) {
      setFormError('Please complete all fields with a valid corporate email.');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setRequestModalOpen(false);
      setDownloadSuccess(`Verified access granted for: ${selectedDoc?.title}`);
      setTimeout(() => setDownloadSuccess(null), 5000);
      setFormName('');
      setFormCompany('');
      setFormEmail('');
      setFormPurpose('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9F4] text-[#1E3D2A] pb-24">
      {/* Breadcrumb & Hero */}
      <section className="pt-10 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E3D2A]/60 mb-6">
          <Link to="/" className="hover:text-[#5B9A3C]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5B9A3C]">Downloads</span>
        </div>

        <FadeInUp>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
              Technical Library
            </span>
            <h1 className="text-[clamp(2.5rem,4.5vw,4.25rem)] font-serif font-medium text-[#1E3D2A] mt-2 leading-[1.1]">
              Technical dossiers &amp; brochures.{' '}
              <span className="italic font-normal text-[#5B9A3C] font-editorial">Verified</span> documentation.
            </h1>
            <p className="mt-4 text-base text-[#1E3D2A]/75 font-light leading-relaxed">
              Access official technical data sheets, representative analytical Certificates of Analysis (CoA), corporate brochures, and regulatory filings for our nicotine intermediates.
            </p>
          </div>
        </FadeInUp>

        {/* Global Toast for download */}
        {downloadSuccess && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-fadeIn max-w-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </section>

      {/* Documents Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc) => (
            <StaggerItem key={doc.id} className="h-full">
              <div
                className="p-7 rounded-3xl bg-white border hairline-border shadow-xs hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#E6EEDF] text-[#5B9A3C] text-[10px] font-mono font-bold uppercase">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#1E3D2A]/50">
                        {doc.format} · {doc.size}
                      </span>
                    </div>

                    {doc.requiresRequest && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Lock className="w-3 h-3" />
                        <span>Protected</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif font-medium text-lg text-[#1E3D2A] leading-snug">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 mt-2.5 leading-relaxed font-light">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t hairline-border">
                  <button
                    onClick={() => handleDownloadClick(doc)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      doc.requiresRequest
                        ? 'bg-[#F8F9F4] text-[#1E3D2A] border hairline-border hover:bg-[#E6EEDF]/40'
                        : 'bg-[#5B9A3C] text-white hover:bg-[#4E8A32] shadow-xs'
                    }`}
                  >
                    {doc.requiresRequest ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>Request Access (Protected)</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Download Document</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Protected Document Request Modal */}
      {requestModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border hairline-border max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setRequestModalOpen(false)}
              className="absolute top-6 right-6 text-[#1E3D2A]/40 hover:text-[#1E3D2A]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#5B9A3C] uppercase tracking-wider font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Restricted Chemical Document</span>
            </div>

            <h3 className="text-xl font-serif font-medium text-[#1E3D2A]">
              Request {selectedDoc.title}
            </h3>
            <p className="text-xs text-[#1E3D2A]/70 mt-1 leading-relaxed">
              Due to regulatory protocols regarding hazardous chemical formulations, please confirm your corporate identity to download this dossier.
            </p>

            {formError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSubmitted ? (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-semibold text-emerald-950 text-base">Request Approved</h4>
                <p className="text-xs text-emerald-800">
                  Your corporate authorization has been recorded. Document download is initiating...
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-[#1E3D2A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Dr. Alexander Ward"
                    className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#5B9A3C]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#1E3D2A] mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="e.g. MedVance Therapeutics"
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#5B9A3C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#1E3D2A] mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. name@company.com"
                      className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#5B9A3C]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1E3D2A] mb-1">Intended Application / Purpose *</label>
                  <select
                    value={formPurpose}
                    onChange={(e) => setFormPurpose(e.target.value)}
                    className="w-full bg-[#F8F9F4] border hairline-border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#5B9A3C]"
                    required
                  >
                    <option value="">Select commercial purpose...</option>
                    <option value="Pharmaceutical NRT Formulation">Pharmaceutical NRT Formulation</option>
                    <option value="Academic / Neuroscience Research">Academic / Neuroscience Research</option>
                    <option value="Chemical Intermediate Synthesis">Chemical Intermediate Synthesis</option>
                    <option value="Regulatory / Import Verification">Regulatory / Import Verification</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#5B9A3C] text-white font-semibold hover:bg-[#4E8A32] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit &amp; Download Document</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
