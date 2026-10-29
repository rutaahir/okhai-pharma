import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  FileDown,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  AlertTriangle,
  Layers,
  Sparkles,
  Gauge,
  Activity,
  FileCheck,
  Package,
  Leaf,
  Calculator,
  CheckCircle2,
  Lock,
  Wind,
  Thermometer,
  ShieldCheck,
  Beaker
} from 'lucide-react';
import { PRODUCTS, COMPANY_DETAILS } from '../data/companyData';
import alkaloidPkgImg from '../assets/images/product-nicotine-alkaloid-pkg.jpg';
import labQcImg from '../assets/images/laboratory_qc_chromatography_1792921813996.jpg';
import { HplcChromatogramModal } from '../components/products/HplcChromatogramModal';
import { CommercialQuoteModal } from '../components/products/CommercialQuoteModal';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';
import { FadeInLeft, FadeInRight } from '../components/common/animations';

export const ProductNicotineAlkaloid: React.FC = () => {
  const product = PRODUCTS[1]; // Nicotine Alkaloid 90% / 95%
  const [selectedGrade, setSelectedGrade] = useState<'90' | '95'>('95');
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'hplc' | 'applications' | 'storage' | 'safety' | 'downloads'>('overview');
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [hplcModalOpen, setHplcModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9F4] text-[#1E3D2A] pb-10 sm:pb-12 selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* Interactive Modals */}
      <HplcChromatogramModal
        isOpen={hplcModalOpen}
        onClose={() => setHplcModalOpen(false)}
        productName={`Nicotine Alkaloid ${selectedGrade}%`}
        casNumber="54-11-5"
        purityScore={selectedGrade === '95' ? '99.88%' : '94.20%'}
      />

      <CommercialQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedGrade === '95' ? 'Nicotine Alkaloid 95%' : 'Nicotine Alkaloid 90%'}
      />

      {/* High-Resolution Packaging Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={alkaloidPkgImg}
        imageAlt="Nicotine Alkaloid 90% / 95% Packaging"
        title={`Nicotine Alkaloid ${selectedGrade}%`}
        subtitle="Active Pharmaceutical Intermediate · CAS 54-11-5 · UN 1654 (PG II)"
        badge={`${selectedGrade}% API`}
      />

      {/* =========================================================================
          1. BREADCRUMB & HERO SECTION
      ========================================================================= */}
      <section className="pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E3D2A]/60 mb-3 sm:mb-4">
          <Link to="/" className="hover:text-[#5B9A3C] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-[#5B9A3C] transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5B9A3C] font-semibold">Nicotine Alkaloid {selectedGrade}%</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Grade Toggle & CTAs */}
          <FadeInLeft className="lg:col-span-7">
            {/* Hazard notice chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-mono mb-4">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Toxic Liquid · UN 1654 · Class 6.1 (PG II) · Commercial B2B Only</span>
            </div>

            <h1 className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-serif font-medium text-[#1E3D2A] leading-[1.1] tracking-tight">
              Nicotine Alkaloid {selectedGrade}%
            </h1>

            {/* Interactive Grade Toggle Switch with Pill Highlight */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1E3D2A]/60 font-semibold">Select Grade:</span>
              <div className="inline-flex p-1 bg-white rounded-2xl border hairline-border shadow-xs">
                <button
                  type="button"
                  onClick={() => setSelectedGrade('90')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedGrade === '90'
                      ? 'bg-[#1E3D2A] text-white shadow-sm'
                      : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                  }`}
                >
                  90% Technical Grade
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGrade('95')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedGrade === '95'
                      ? 'bg-[#1E3D2A] text-white shadow-sm'
                      : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                  }`}
                >
                  95% Pharmaceutical API Grade
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#1E3D2A]/80 font-light leading-relaxed max-w-2xl">
              {selectedGrade === '95'
                ? "Calibrated 95% active assay intermediate specifically purified through fractional molecular distillation for pharmaceutical active substance (API) synthesis, transdermal therapeutic patches, and regulated medicinal preparations."
                : "High-grade 90% natural nicotine alkaloid liquid offering consistent concentration, rapid solvency, and low foreign residue for precision technical formulations and e-liquid applications."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2D5A3C] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-[#1E3D2A]/20 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#8CC63F]" />
                <span>Get A Free Quote ({selectedGrade}%)</span>
              </button>

              <button
                type="button"
                onClick={() => setHplcModalOpen(true)}
                className="px-5 py-3 rounded-full bg-white text-xs font-semibold text-[#1E3D2A] border hairline-border hover:border-[#5B9A3C] transition-all flex items-center gap-2 shadow-xs cursor-pointer group"
              >
                <Activity className="w-4 h-4 text-[#5B9A3C] group-hover:scale-110 transition-transform" />
                <span>Inspect HPLC Trace</span>
              </button>
            </div>
          </FadeInLeft>

          {/* Right Column: Radial Purity Gauge & Powder Dish Card */}
          <FadeInRight className="lg:col-span-5 flex flex-col items-center">
            <div className="p-6 rounded-3xl bg-white border hairline-border shadow-xl space-y-4 w-full max-w-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#5B9A3C] uppercase tracking-wider font-semibold">
                  Analytical Assay Gauge
                </span>
                <span className="text-xs font-mono text-[#1E3D2A]/60">HPLC / GC-FID</span>
              </div>

              {/* Animated Purity Gauge Dial */}
              <div className="flex flex-col items-center py-2">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-[#E6EEDF]"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-[#5B9A3C] transition-all duration-700 ease-out"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * (selectedGrade === '95' ? 0.95 : 0.90))}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-serif font-bold text-[#1E3D2A] tabular-nums">
                      {selectedGrade}%
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B9A3C] font-semibold">
                      Min Purity
                    </span>
                  </div>
                </div>
                <p className="text-xs text-center text-[#1E3D2A]/70 mt-3 font-medium">
                  {selectedGrade === '95' ? "High Purity Pharmaceutical API" : "Standard High Concentration Grade"}
                </p>
              </div>

              {/* Product Packaging Showcase (Click to Open Full Image) */}
              <div 
                onClick={() => setLightboxOpen(true)}
                className="p-3.5 rounded-2xl bg-[#F8F9F4] border hairline-border hover:border-[#5B9A3C] transition-all flex items-center gap-3.5 relative z-10 cursor-pointer group shadow-2xs hover:shadow-md"
                title="Click to view full high-resolution image"
              >
                <img
                  src={alkaloidPkgImg}
                  alt="Nicotine Alkaloid 90% / 95% Drum and Canister Packaging"
                  className="w-16 h-16 rounded-xl object-contain p-1 bg-white shrink-0 border border-white shadow-xs group-hover:scale-105 transition-transform"
                />
                <div className="text-xs space-y-0.5">
                  <span className="font-semibold text-[#1E3D2A] block">25 KG Drum &amp; 5 KG Can</span>
                  <p className="text-[#1E3D2A]/70 text-[11px]">
                    Direct factory packaging with tamper-evident seal and N₂ purge.
                  </p>
                  <span className="text-[10px] font-mono text-[#5B9A3C] block font-medium">Nitrogen Blanket Purged</span>
                </div>
              </div>

              <div className="pt-3 border-t hairline-border text-[11px] text-[#1E3D2A]/70 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Produced in cleanroom environment in Gujarat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Packaged under ultra-pure dry nitrogen blanket</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>CAS 54-11-5 · UN 1654 Class 6.1 (PG II)</span>
                </div>
              </div>
            </div>
          </FadeInRight>

        </div>
      </section>

      {/* =========================================================================
          2. ELEVATED TABS NAVIGATION
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border hairline-border shadow-sm flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Extraction', icon: Leaf },
            { id: 'specs', label: 'Specifications & CoA', icon: FileCheck },
            { id: 'hplc', label: 'HPLC Spectrum & QC', icon: Activity },
            { id: 'applications', label: 'Applications', icon: Sparkles },
            { id: 'storage', label: 'Storage & Nitrogen Protocol', icon: Package },
            { id: 'safety', label: 'Safety & GHS SDS', icon: ShieldAlert },
            { id: 'downloads', label: 'Technical Downloads', icon: FileDown }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3D2A] text-white shadow-md shadow-[#1E3D2A]/20 font-semibold'
                    : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A] hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#8CC63F]' : 'text-[#5B9A3C]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. TAB CONTENT PANELS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8">
            
            {/* 1. OVERVIEW & EXTRACTION */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm">
                  <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mb-4">
                    Overview &amp; Extraction Integrity
                  </h3>
                  <p className="text-sm sm:text-base text-[#1E3D2A]/80 leading-relaxed font-light">
                    {product.overview}
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-[#E6EEDF]/40 border hairline-border">
                  <h4 className="text-lg font-serif font-semibold text-[#1E3D2A] mb-2">
                    Quality Assurance &amp; Facility Standard
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1E3D2A]/80 leading-relaxed font-light">
                    Produced in our purpose-built Gujarat plant operating under strict cleanroom controls and ISO-approved facility standards. Proprietary fractional molecular refining isolates natural nicotine alkaloids with exceptionally low non-nicotine alkaloid (NNA) residues, verified through high-performance liquid chromatography (HPLC) and gas chromatography (GC) on every production release.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feat, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white border hairline-border shadow-xs hover:border-[#5B9A3C]/40 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF2E5] text-[#5B9A3C] flex items-center justify-center font-mono text-xs font-bold mb-3">
                        0{i + 1}
                      </div>
                      <h5 className="font-serif font-semibold text-sm text-[#1E3D2A]">{feat.title}</h5>
                      <p className="text-xs text-[#1E3D2A]/70 mt-1.5 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm animate-fadeIn space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b hairline-border">
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-[#1E3D2A]">
                      Chemical &amp; Chromatographic Parameters
                    </h3>
                    <p className="text-xs text-[#1E3D2A]/60 mt-1">EP / USP Monograph Compliance &amp; Assay Specifications</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHplcModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#EAF2E5] text-[#2E683A] text-xs font-mono font-semibold hover:bg-[#5B9A3C] hover:text-white transition-colors flex items-center gap-1.5 self-start cursor-pointer"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Inspect Peak Trace</span>
                  </button>
                </div>

                <div className="divide-y hairline-border text-xs sm:text-sm">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-[#FAFBF8] px-2 rounded-lg transition-colors">
                      <span className="text-[#1E3D2A]/70 font-medium">{spec.parameter}</span>
                      <span className="font-mono text-[#1E3D2A] font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. HPLC & QC TRACE */}
            {activeTab === 'hplc' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B9A3C] font-bold">
                      Reverse Phase Chromatographic Profile
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#EAF2E5] text-[#2E683A] text-xs font-mono font-semibold">
                      Assay: {selectedGrade === '95' ? '99.88%' : '94.20%'} Area
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mb-3">
                    HPLC UV 260nm Analytical Validation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E3D2A]/75 font-light leading-relaxed mb-6">
                    Nicotine alkaloid liquid resolved on C18 stationary column with sharp peak symmetry and low non-nicotine alkaloid trace quantification.
                  </p>

                  <div className="p-6 rounded-3xl bg-[#0F2116] text-white border border-[#2D5A3C] shadow-inner relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="text-[#8CC63F] font-bold flex items-center gap-2">
                        <Activity className="w-4 h-4 animate-pulse" />
                        Nicotine Alkaloid Active Trace ({selectedGrade}%)
                      </span>
                      <span className="text-white/60">RT: 4.82 min · Flow: 1.0 mL/min</span>
                    </div>

                    <div className="relative w-full h-48 my-2">
                      <svg viewBox="0 0 800 200" fill="none" className="w-full h-full">
                        <line x1="40" y1="170" x2="760" y2="170" stroke="#2D5A3C" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1="40" y1="20" x2="40" y2="170" stroke="#2D5A3C" strokeWidth="1.5" />
                        
                        <path
                          d="M40,170 L140,170 L150,160 L160,170 L360,170 C375,170 384,25 388,25 C392,25 401,170 416,170 L760,170 Z"
                          fill="#8CC63F"
                          fillOpacity="0.25"
                        />

                        <path
                          d="M40,170 L140,170 Q145,170 150,160 Q155,170 160,170 L360,170 C375,170 384,25 388,25 C392,25 401,170 416,170 L760,170"
                          stroke="#8CC63F"
                          strokeWidth="2.5"
                          fill="none"
                        />

                        <circle cx="388" cy="25" r="4" fill="#8CC63F" />
                        <rect x="400" y="30" width="160" height="36" rx="6" fill="#1E3D2A" stroke="#8CC63F" strokeWidth="1" />
                        <text x="410" y="45" fill="#8CC63F" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          RT: 4.82 min
                        </text>
                        <text x="410" y="58" fill="#EAF2E5" fontSize="9" fontFamily="sans-serif">
                          Purity: {selectedGrade === '95' ? '99.88%' : '94.20%'} Area
                        </text>
                      </svg>
                    </div>

                    <div className="pt-2 border-t border-[#2D5A3C]/60 flex items-center justify-between text-[11px] font-mono text-white/70">
                      <span>Detector: Photodiode Array 260 nm · Temp: 25°C</span>
                      <button
                        type="button"
                        onClick={() => setHplcModalOpen(true)}
                        className="text-[#8CC63F] hover:underline cursor-pointer"
                      >
                        Enlarge Interactive Viewer →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm">
                  <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mb-4">
                    Key Applications for Nicotine Alkaloid
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.applications.map((app, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-[#F8F9F4] border hairline-border flex items-start gap-3 hover:border-[#5B9A3C]/35 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#E6EEDF] flex items-center justify-center text-[#5B9A3C] font-mono text-xs font-bold shrink-0 mt-0.5">
                          0{i + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-[#1E3D2A] font-medium leading-relaxed">
                          {app}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. STORAGE & NITROGEN PROTOCOL */}
            {activeTab === 'storage' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm animate-fadeIn space-y-6">
                <div className="flex items-center gap-2 text-amber-800 bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                  <span>
                    Controlled Storage Directive: Nicotine Alkaloid is photosensitive and susceptible to atmospheric oxidation. Maintain inert gas blanket at all times.
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mb-4">
                  Storage, Nitrogen Purge &amp; Handling Protocol
                </h3>

                <div className="space-y-3">
                  {product.storageHandling.map((item, idx) => (
                    <div key={idx} className="border hairline-border rounded-2xl overflow-hidden bg-[#F8F9F4]">
                      <button
                        onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                        className="w-full py-3.5 px-5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1E3D2A] hover:bg-white transition-colors cursor-pointer"
                      >
                        <span>{item.title}</span>
                        <ChevronDown className={`w-4 h-4 text-[#5B9A3C] transition-transform ${openAccordion === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openAccordion === idx && (
                        <div className="px-5 pb-4 text-xs text-[#1E3D2A]/80 leading-relaxed font-light border-t hairline-border pt-3 bg-white">
                          {item.instruction}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SAFETY & GHS SDS */}
            {activeTab === 'safety' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm animate-fadeIn space-y-6">
                <div className="flex items-center justify-between pb-4 border-b hairline-border">
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-[#1E3D2A]">
                      GHS Classification &amp; Safety Data
                    </h3>
                    <p className="text-xs text-[#1E3D2A]/60 mt-1">UN 1654 Class 6.1 Toxic Liquid · Packing Group II</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-900 text-xs font-mono font-bold">
                    UN 1654 PG II
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-[#F8F9F4] border hairline-border text-center">
                    <ShieldAlert className="w-6 h-6 text-red-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block">GHS 06: Fatal if Swallowed</span>
                    <span className="text-[10px] text-[#1E3D2A]/60 font-mono">H300 · Acute Toxicity Oral</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8F9F4] border hairline-border text-center">
                    <ShieldAlert className="w-6 h-6 text-red-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block">GHS 06: Fatal in Contact with Skin</span>
                    <span className="text-[10px] text-[#1E3D2A]/60 font-mono">H310 · Acute Toxicity Dermal</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8F9F4] border hairline-border text-center">
                    <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block">GHS 09: Toxic to Aquatic Life</span>
                    <span className="text-[10px] text-[#1E3D2A]/60 font-mono">H411 · Aquatic Chronic</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[#1E3D2A]/60">16-Section Safety Data Sheet available on corporate verification</span>
                  <Link
                    to="/downloads"
                    className="px-5 py-2.5 rounded-full bg-[#1E3D2A] text-white text-xs font-semibold hover:bg-[#2D5A3C] transition-colors"
                  >
                    Request Verified SDS →
                  </Link>
                </div>
              </div>
            )}

            {/* 7. DOWNLOADS */}
            {activeTab === 'downloads' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm animate-fadeIn space-y-4">
                <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mb-4">
                  Technical Documentation for Nicotine Alkaloid {selectedGrade}%
                </h3>
                <div className="p-5 rounded-2xl bg-[#F8F9F4] border hairline-border flex items-center justify-between gap-4">
                  <div>
                    <h5 className="font-serif font-semibold text-sm text-[#1E3D2A]">Technical Spec Sheet (PDF)</h5>
                    <p className="text-xs text-[#1E3D2A]/60 mt-0.5">Assay parameters, nitrogen seal guidelines &amp; UN 1654 packaging</p>
                  </div>
                  <Link
                    to="/downloads"
                    className="px-4 py-2 rounded-xl bg-[#5B9A3C] text-white text-xs font-semibold hover:bg-[#4E8A32]"
                  >
                    Download
                  </Link>
                </div>
                <div className="p-5 rounded-2xl bg-[#F8F9F4] border hairline-border flex items-center justify-between gap-4">
                  <div>
                    <h5 className="font-serif font-semibold text-sm text-[#1E3D2A]">Safety Data Sheet (16-Section GHS)</h5>
                    <p className="text-xs text-[#1E3D2A]/60 mt-0.5">Available for accredited B2B commercial entities</p>
                  </div>
                  <Link
                    to="/downloads"
                    className="px-4 py-2 rounded-xl bg-white text-xs font-semibold text-[#1E3D2A] border hairline-border hover:border-[#5B9A3C]"
                  >
                    Request SDS
                  </Link>
                </div>
              </div>
            )}

            {/* Product FAQs */}
            <div className="mt-10 p-8 rounded-3xl bg-white border hairline-border shadow-sm">
              <h4 className="text-xl font-serif font-medium text-[#1E3D2A] mb-4">
                Frequently Asked Technical Questions
              </h4>
              <div className="space-y-4 text-xs sm:text-sm">
                {product.faqs.map((faq, i) => (
                  <div key={i} className="pb-4 border-b hairline-border last:border-b-0 last:pb-0">
                    <p className="font-semibold text-[#1E3D2A]">{faq.question}</p>
                    <p className="text-[#1E3D2A]/75 mt-1.5 leading-relaxed font-light">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Commercial Desk Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-3xl bg-white border hairline-border shadow-xl space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5B9A3C] animate-pulse" />
                <h4 className="font-serif font-semibold text-base text-[#1E3D2A]">Commercial Sourcing Desk</h4>
              </div>
              
              <p className="text-xs text-[#1E3D2A]/75 leading-relaxed font-light">
                Request commercial batch quotes, sample CoAs, or reserved dispatch schedules directly from our plant in Gujarat.
              </p>

              <div className="p-3.5 bg-[#F8F9F4] rounded-2xl border hairline-border text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Selected Grade:</span>
                  <span className="font-mono font-semibold text-[#5B9A3C]">{selectedGrade}% Alkaloid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Packaging Type:</span>
                  <span className="font-mono font-semibold">Fluorinated UN Drum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Direct MOQ Tel:</span>
                  <a href={`tel:${COMPANY_DETAILS.moqPhone}`} className="font-mono text-[#5B9A3C] font-semibold">
                    {COMPANY_DETAILS.moqPhone}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="w-full py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2D5A3C] text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#8CC63F]" />
                <span>Instant Batch Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => setHplcModalOpen(true)}
                className="w-full py-2.5 rounded-full bg-[#EAF2E5] text-[#2E683A] text-xs font-semibold hover:bg-[#5B9A3C] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Inspect Official CoA Spectrum</span>
              </button>

              {/* Related Product Links */}
              <div className="pt-4 border-t hairline-border space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-mono text-[#1E3D2A]/50 block mb-2">
                  Related Intermediates
                </span>
                <Link
                  to="/products/pure-nicotine-usp-ep-99-5"
                  className="block p-3 rounded-xl bg-[#F8F9F4] hover:bg-[#E6EEDF]/40 border hairline-border transition-colors text-xs"
                >
                  <span className="font-semibold text-[#1E3D2A] block">Pure Nicotine USP/EP 99.5%+</span>
                  <span className="text-[11px] text-[#5B9A3C] font-mono">Colorless &amp; Odorless USP/EP API →</span>
                </Link>
                <Link
                  to="/products/nicotine-sulfate-40"
                  className="block p-3 rounded-xl bg-[#F8F9F4] hover:bg-[#E6EEDF]/40 border hairline-border transition-colors text-xs"
                >
                  <span className="font-semibold text-[#1E3D2A] block">Nicotine Sulfate 40%</span>
                  <span className="text-[11px] text-[#5B9A3C] font-mono">Water-Soluble Solution →</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
