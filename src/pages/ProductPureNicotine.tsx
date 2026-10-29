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
  Droplets,
  Beaker,
  Award
} from 'lucide-react';
import { PRODUCTS, COMPANY_DETAILS } from '../data/companyData';
import pureNicotinePkgImg from '../assets/images/product-pure-nicotine-pkg.jpg';
import labQcImg from '../assets/images/laboratory_qc_chromatography_1792921813996.jpg';
import { HplcChromatogramModal } from '../components/products/HplcChromatogramModal';
import { CommercialQuoteModal } from '../components/products/CommercialQuoteModal';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';
import { FadeInLeft, FadeInRight, FadeInUp } from '../components/common/animations';

export const ProductPureNicotine: React.FC = () => {
  const product = PRODUCTS[2]; // Pure Nicotine USP/EP 99.5%+
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'applications' | 'storage' | 'safety' | 'downloads'>('overview');
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [hplcModalOpen, setHplcModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9F4] text-[#1E3D2A] pb-24 selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* Interactive Modals */}
      <HplcChromatogramModal
        isOpen={hplcModalOpen}
        onClose={() => setHplcModalOpen(false)}
        productName="Pure Nicotine USP/EP 99.5%+"
        casNumber="54-11-5"
        purityScore="99.92%"
      />

      <CommercialQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct="Pure Nicotine USP/EP 99.5%+"
      />

      {/* High-Resolution Packaging Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={pureNicotinePkgImg}
        imageAlt="Pure Nicotine USP/EP 99.5%+ Packaging"
        title="Pure Nicotine USP/EP 99.5%+"
        subtitle="United States & European Pharmacopoeia · CAS 54-11-5 · UN 1654"
        badge="≥99.5% USP/EP"
      />

      {/* =========================================================================
          1. BREADCRUMB & HERO SECTION
      ========================================================================= */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E3D2A]/60 mb-6">
          <Link to="/" className="hover:text-[#5B9A3C] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-[#5B9A3C] transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5B9A3C] font-semibold">Pure Nicotine USP/EP 99.5%+</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Grade Badge & Description */}
          <FadeInLeft className="lg:col-span-7">
            {/* Hazard notice chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-mono mb-4">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Toxic Liquid · UN 1654 · Class 6.1 (PG II) · Commercial B2B Only</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/40 text-xs font-mono font-bold text-[#1E3D2A]">
                <Award className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>USP &amp; EP Monograph Standard</span>
              </span>
              <span className="text-xs font-mono text-[#5B9A3C] font-semibold">CAS 54-11-5</span>
            </div>

            <h1 className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-serif font-medium text-[#1E3D2A] leading-[1.1] tracking-tight">
              Pure Nicotine USP/EP 99.5%+
            </h1>

            {/* The 3 Core Pillars: Colorless, Odorless, Stable */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#5B9A3C]/25 shadow-xs">
                <span className="w-7 h-7 rounded-full bg-[#EBF5E5] flex items-center justify-center text-[#5B9A3C]">
                  <Droplets className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-[#1E3D2A]">Colorless</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#5B9A3C]/25 shadow-xs">
                <span className="w-7 h-7 rounded-full bg-[#EBF5E5] flex items-center justify-center text-[#5B9A3C]">
                  <Wind className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-[#1E3D2A]">Odorless</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#5B9A3C]/25 shadow-xs">
                <span className="w-7 h-7 rounded-full bg-[#EBF5E5] flex items-center justify-center text-[#5B9A3C]">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-[#1E3D2A]">Stable</span>
              </div>
            </div>

            <p className="mt-5 text-sm sm:text-base text-[#1E3D2A]/85 font-light leading-relaxed max-w-2xl">
              Supernic's Pure Nicotine is colorless and odorless, delivering a neutral base for your formulations. Its unmatched stability guarantees long-term consistency and reliability in every use. Manufactured using the finest tobacco leaves from trusted suppliers, it boasts an ultra-low impurity profile with rigorous chromatographic verification (HPLC/GC).
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2D5A3C] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-[#1E3D2A]/20 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#8CC63F]" />
                <span>Get A Free Quote (99.5%+)</span>
              </button>

              <button
                type="button"
                onClick={() => setHplcModalOpen(true)}
                className="px-5 py-3 rounded-full bg-white text-xs font-semibold text-[#1E3D2A] border hairline-border hover:border-[#5B9A3C] transition-all flex items-center gap-2 shadow-xs cursor-pointer group"
              >
                <Activity className="w-4 h-4 text-[#5B9A3C] group-hover:scale-110 transition-transform" />
                <span>Inspect HPLC Trace (99.92%)</span>
              </button>
            </div>
          </FadeInLeft>

          {/* Right Column: Radial Purity Gauge & Crystal Vial Card */}
          <FadeInRight className="lg:col-span-5 flex flex-col items-center">
            <div className="p-6 rounded-3xl bg-white border hairline-border shadow-xl space-y-5 w-full max-w-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#8CC63F]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-[#5B9A3C] uppercase tracking-wider font-semibold">
                  Analytical Assay Gauge
                </span>
                <span className="text-xs font-mono text-[#1E3D2A]/60">USP / EP Compendial</span>
              </div>

              {/* Animated Purity Gauge Dial */}
              <div className="flex flex-col items-center py-2 relative z-10">
                <div className="relative w-40 h-40 flex items-center justify-center">
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
                      strokeDashoffset={251.2 - (251.2 * 0.995)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-serif font-bold text-[#1E3D2A] tabular-nums">
                      ≥ 99.5%
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B9A3C] font-semibold">
                      Anhydrous Assay
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-mono font-medium text-[#1E3D2A]/70 block">
                    Total Impurities: &lt; 0.5% w/w
                  </span>
                  <span className="text-[11px] font-mono text-[#5B9A3C] block mt-0.5 font-semibold">
                    Anabasine, Anatabine &amp; Cotinine &lt; 0.3%
                  </span>
                </div>
              </div>

              {/* Product Vial Showcase (Click to Open Full Image) */}
              <div 
                onClick={() => setLightboxOpen(true)}
                className="p-3.5 rounded-2xl bg-[#F8F9F4] border hairline-border hover:border-[#5B9A3C] transition-all flex items-center gap-3.5 relative z-10 cursor-pointer group shadow-2xs hover:shadow-md"
                title="Click to view full high-resolution image"
              >
                <img
                  src={pureNicotinePkgImg}
                  alt="Pure Nicotine USP/EP 99.5%+ Canister and Bottle Packaging"
                  className="w-16 h-16 rounded-xl object-contain p-1 bg-white shrink-0 border border-white shadow-xs group-hover:scale-105 transition-transform"
                />
                <div className="text-xs space-y-0.5">
                  <span className="font-semibold text-[#1E3D2A] block">25 KG Drum &amp; 5 KG Can</span>
                  <p className="text-[#1E3D2A]/70 text-[11px]">
                    Validated per United States Pharmacopeia &amp; European Pharmacopoeia.
                  </p>
                  <span className="text-[10px] font-mono text-[#5B9A3C] block font-medium">Nitrogen Blanket Purged</span>
                </div>
              </div>

              {/* Cleanroom Standards Checklist */}
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border hairline-border shadow-sm flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'overview', label: 'Product Overview', icon: Layers },
            { id: 'specs', label: 'Specifications & CoA', icon: FileCheck },
            { id: 'applications', label: 'Formulation Applications', icon: Sparkles },
            { id: 'storage', label: 'Storage & Handling', icon: Lock },
            { id: 'safety', label: 'Regulatory & Safety', icon: ShieldAlert },
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
          3. TAB CONTENT PANELS & COMMERCIAL SOURCING DESK
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Tab Panel Column */}
          <div className="lg:col-span-8">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm">
                  <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mb-4">
                    The Gold Standard in High-Purity Nicotine Formulations
                  </h3>
                  <p className="text-sm sm:text-base text-[#1E3D2A]/80 font-light leading-relaxed mb-6">
                    {product.overview}
                  </p>

                  {/* 3 Core Advantage Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                    <div className="p-5 rounded-2xl bg-[#F8F9F4] border hairline-border">
                      <div className="w-10 h-10 rounded-xl bg-[#EBF5E5] text-[#5B9A3C] flex items-center justify-center mb-3">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#1E3D2A]">Colorless Clarity</h4>
                      <p className="text-xs text-[#1E3D2A]/70 font-light mt-1.5 leading-relaxed">
                        Advanced fractional molecular distillation removes all dark tobacco resin remnants, producing crystal-clear transparency that will not tint your final product.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F8F9F4] border hairline-border">
                      <div className="w-10 h-10 rounded-xl bg-[#EBF5E5] text-[#5B9A3C] flex items-center justify-center mb-3">
                        <Wind className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#1E3D2A]">Odorless Profile</h4>
                      <p className="text-xs text-[#1E3D2A]/70 font-light mt-1.5 leading-relaxed">
                        Virtually imperceptible tobacco scent delivers an exceptionally neutral base, giving pharmaceutical flavorists and formulators total creative freedom.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F8F9F4] border hairline-border">
                      <div className="w-10 h-10 rounded-xl bg-[#EBF5E5] text-[#5B9A3C] flex items-center justify-center mb-3">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#1E3D2A]">Unmatched Stability</h4>
                      <p className="text-xs text-[#1E3D2A]/70 font-light mt-1.5 leading-relaxed">
                        Superior anti-oxidative stability ensures your formulations retain their assayed potency, clear appearance, and chemical integrity throughout their 24-month shelf life.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border hairline-border shadow-xs flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#E6EEDF] flex items-center justify-center shrink-0 text-[#5B9A3C]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#1E3D2A]">{feat.title}</h4>
                        <p className="text-xs text-[#1E3D2A]/70 font-light mt-1 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-[#1E3D2A]">Compendial Certificate of Specifications</h3>
                    <p className="text-xs text-[#1E3D2A]/60 font-light mt-0.5">Pharmacopeial Standards: USP Monograph &amp; European Pharmacopoeia (EP 10.0+)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHplcModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#EAF2E5] text-[#2E683A] text-xs font-semibold hover:bg-[#5B9A3C] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>View Lot Chromatogram</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9F4] text-[#1E3D2A]/80 font-mono uppercase text-[11px] border-b hairline-border">
                      <tr>
                        <th className="py-3 px-4">Test Parameter</th>
                        <th className="py-3 px-4">Compendial Standard</th>
                        <th className="py-3 px-4">Analytical Method</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y hairline-border font-light">
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className="hover:bg-[#F8F9F4]/50 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-[#1E3D2A]">{spec.parameter}</td>
                          <td className="py-3.5 px-4 font-mono text-[#5B9A3C] font-semibold">{spec.value}</td>
                          <td className="py-3.5 px-4 text-[#1E3D2A]/60 font-mono">USP / EP / HPLC</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#5B9A3C] font-semibold">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Conforms</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm">
                  <h3 className="text-xl font-serif font-medium text-[#1E3D2A] mb-3">
                    Qualified Industrial &amp; Pharmaceutical Applications
                  </h3>
                  <p className="text-sm text-[#1E3D2A]/70 font-light mb-6">
                    Pure Nicotine USP/EP 99.5%+ provides a dependable, high-integrity raw material for regulated medicinal and alternative delivery applications globally:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.applications.map((app, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#F8F9F4] border hairline-border flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#5B9A3C] mt-1.5 shrink-0" />
                        <p className="text-xs text-[#1E3D2A]/85 font-light leading-relaxed">{app}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: STORAGE & HANDLING */}
            {activeTab === 'storage' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-serif font-medium text-[#1E3D2A]">Cold Storage &amp; Inert Gas Handling Protocols</h3>
                  <p className="text-xs text-[#1E3D2A]/60 font-light mt-1">
                    Due to high chemical purity, preservation against atmospheric oxygen and UV radiation is critical to prevent color darkening.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.storageHandling.map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#F8F9F4] border hairline-border space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3D2A]">
                        <Lock className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-[#1E3D2A]/75 font-light leading-relaxed">{item.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: REGULATORY SAFETY */}
            {activeTab === 'safety' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900">
                  <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold block">Hazard Identification: UN 1654, Class 6.1 (PG II)</span>
                    <p className="font-light">
                      Pure Nicotine is an acutely toxic substance. Dermal absorption or ingestion can be lethal. Sold exclusively to licensed corporate B2B entities with verified regulatory permits.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#F8F9F4] border hairline-border">
                    <span className="font-mono text-[#5B9A3C] font-semibold block mb-1">GHS Signal Word</span>
                    <span className="text-lg font-bold text-red-600 block">DANGER</span>
                    <span className="text-[#1E3D2A]/60 text-[11px] mt-1 block">Fatal in contact with skin (H310), Toxic if swallowed (H301)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8F9F4] border hairline-border">
                    <span className="font-mono text-[#5B9A3C] font-semibold block mb-1">Transport Classification</span>
                    <span className="text-sm font-bold text-[#1E3D2A] block">ADR / RID / IMDG / ICAO</span>
                    <span className="text-[#1E3D2A]/60 text-[11px] mt-1 block">Class 6.1 Toxic Substances, Packing Group II</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8F9F4] border hairline-border">
                    <span className="font-mono text-[#5B9A3C] font-semibold block mb-1">Environmental Hazard</span>
                    <span className="text-sm font-bold text-[#1E3D2A] block">Marine Pollutant</span>
                    <span className="text-[#1E3D2A]/60 text-[11px] mt-1 block">Toxic to aquatic life with long lasting effects (H411)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: DOWNLOADS */}
            {activeTab === 'downloads' && (
              <div className="p-8 rounded-3xl bg-white border hairline-border shadow-sm space-y-4 animate-fadeIn">
                <h3 className="text-xl font-serif font-medium text-[#1E3D2A]">Technical Documentation &amp; CoAs</h3>
                <p className="text-xs text-[#1E3D2A]/60 font-light mb-4">Official pharmaceutical compliance files for registered enterprise clients:</p>

                <div className="divide-y hairline-border">
                  {[
                    { title: "Safety Data Sheet (SDS / e-SDS) — Pure Nicotine USP/EP", format: "PDF · GHS Rev 9", size: "380 KB" },
                    { title: "Technical Data Sheet (TDS) — Pharmacopeia Specifications", format: "PDF · Official Spec Sheet", size: "220 KB" },
                    { title: "Sample Certificate of Analysis (CoA) — Lot Verified Chromatogram", format: "PDF · HPLC/GC", size: "410 KB" },
                    { title: "B2B Export Compliance & Handling Guide", format: "PDF · Regulatory Brief", size: "540 KB" }
                  ].map((doc, idx) => (
                    <div key={idx} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-semibold text-[#1E3D2A]">{doc.title}</h4>
                        <span className="text-[11px] text-[#1E3D2A]/50 font-mono">{doc.format} · {doc.size}</span>
                      </div>
                      <Link
                        to="/downloads"
                        className="px-4 py-2 rounded-full bg-[#F8F9F4] hover:bg-[#5B9A3C] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Request PDF</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product FAQs */}
            <div className="mt-10 p-8 rounded-3xl bg-white border hairline-border shadow-sm">
              <h4 className="text-xl font-serif font-medium text-[#1E3D2A] mb-4">
                Frequently Asked Questions: Pure Nicotine USP/EP 99.5%+
              </h4>
              <div className="space-y-4 text-xs sm:text-sm">
                {product.faqs.map((faq, idx) => (
                  <div key={idx} className="pb-4 border-b hairline-border last:border-b-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                      className="w-full text-left flex items-center justify-between gap-4 font-semibold text-[#1E3D2A] cursor-pointer hover:text-[#5B9A3C] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-[#5B9A3C] shrink-0 transition-transform ${openAccordion === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openAccordion === idx && (
                      <div className="text-[#1E3D2A]/75 mt-2 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Commercial Sourcing Desk Column */}
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
                  <span className="font-mono font-semibold text-[#5B9A3C]">Pure Nicotine ≥99.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Monograph:</span>
                  <span className="font-mono font-semibold">USP / EP Compendial</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Packaging Type:</span>
                  <span className="font-mono font-semibold">Fluorinated UN Drum / Can</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E3D2A]/60">Direct MOQ Tel:</span>
                  <a href={`tel:${COMPANY_DETAILS.moqPhone}`} className="font-mono text-[#5B9A3C] font-semibold hover:underline">
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

              {/* Related Products Links: Shows the other two products */}
              <div className="pt-4 border-t hairline-border space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-mono text-[#1E3D2A]/50 block mb-2">
                  Other Core Formulations
                </span>
                <Link
                  to="/products/nicotine-sulfate-40"
                  className="block p-3 rounded-xl bg-[#F8F9F4] hover:bg-[#E6EEDF]/40 border hairline-border transition-colors text-xs"
                >
                  <span className="font-semibold text-[#1E3D2A] block">Nicotine Sulfate 40%</span>
                  <span className="text-[11px] text-[#5B9A3C] font-mono">Water-Soluble Intermediate →</span>
                </Link>
                <Link
                  to="/products/nicotine-alkaloid-90-95"
                  className="block p-3 rounded-xl bg-[#F8F9F4] hover:bg-[#E6EEDF]/40 border hairline-border transition-colors text-xs"
                >
                  <span className="font-semibold text-[#1E3D2A] block">Nicotine Alkaloid 90% / 95%</span>
                  <span className="text-[11px] text-[#5B9A3C] font-mono">Pharma API Vacuum Distilled →</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
