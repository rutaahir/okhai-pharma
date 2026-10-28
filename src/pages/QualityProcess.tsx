import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileText,
  Activity,
  ShieldCheck,
  Leaf,
  FlaskConical,
  Eye,
  Sparkles,
  Microscope
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';
import { FadeInLeft, FadeInRight, FadeInUp, StaggerContainer, StaggerItem } from '../components/common/animations';

import labGcImg from '../assets/images/facility-lab-gc.jpg';
import labHplcImg from '../assets/images/facility-lab-hplc.png';
import labTitrationImg from '../assets/images/facility-lab-titration.jpg';
import { HplcChromatogramModal } from '../components/products/HplcChromatogramModal';

export const QualityProcess: React.FC = () => {
  const [hplcModalOpen, setHplcModalOpen] = useState(false);

  const QC_TEST_CARDS = [
    {
      id: 'gc',
      tag: 'GC-FID / GC-MS',
      title: 'GC Testing',
      sub: 'Gas Chromatography (Volatiles)',
      image: labGcImg,
      desc: 'Identification and quantification of volatile alkaloids, residual solvents, and related organic impurities under calibrated GLP capillary columns.',
      specs: [
        'Gas Chromatography (GC) Impurity Profiling',
        'Residual solvent screening (ICH Q3C)',
        'Trace volatile detection (<0.05%)'
      ],
      pill: 'GLP Calibrated'
    },
    {
      id: 'hplc',
      tag: 'Purity ≥ 99.5%',
      title: 'HPLC Analysis',
      sub: 'High-Performance Liquid Chromatography',
      image: labHplcImg,
      desc: 'Precision reverse-phase liquid chromatography validating exact nicotine alkaloid concentration, peak symmetry, and USP/EP monograph purity.',
      specs: [
        'HPLC Purity & Peak Monograph Validation',
        'Impurity related substances <0.1%',
        'Validated retention time profiling'
      ],
      pill: 'Interactive Peak Readout',
      isInteractive: true
    },
    {
      id: 'titration',
      tag: 'USP / EP Monograph',
      title: 'Titration',
      sub: 'Potentiometric Monograph Titration',
      image: labTitrationImg,
      desc: 'Automated non-aqueous potentiometric endpoint titration measuring acid neutrality, absolute stoichiometric purity, and chemical consistency.',
      specs: [
        'Non-Aqueous Potentiometric Titration Assay',
        'Stoichiometric endpoint verification',
        'Assay range 99.0% - 101.0%'
      ],
      pill: 'Compendial Assay'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F4] text-[#1E3D2A] pb-24">
      {/* Breadcrumb & Hero */}
      <section className="pt-10 pb-16 px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-mono text-[#1E3D2A]/60 mb-6">
          <Link to="/" className="hover:text-[#5B9A3C]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5B9A3C]">Quality &amp; Process</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <FadeInLeft className="lg:col-span-8">
            <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
              Quality Assurance &amp; Methodology
            </span>
            <h1 className="text-[clamp(2.5rem,4.5vw,4.25rem)] font-serif font-medium text-[#1E3D2A] mt-2 leading-[1.1]">
              Analytical rigor from harvest to release.{' '}
              <span className="italic font-normal text-[#5B9A3C] font-editorial">Every batch</span> verified.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#1E3D2A]/75 font-light leading-relaxed max-w-2xl">
              Our quality assurance protocols couple traditional botanical cultivation expertise with calibrated High-Performance Liquid Chromatography (HPLC) and Gas Chromatography (GC) profiling.
            </p>
          </FadeInLeft>

          <FadeInRight className="lg:col-span-4">
            {/* Lab-style SVG Chromatogram Card */}
            <div className="p-6 rounded-3xl bg-white border hairline-border shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#5B9A3C] font-semibold">HPLC Chromatogram</span>
                <span className="text-[10px] font-mono text-[#1E3D2A]/50">Retention Time: 4.82 min</span>
              </div>

              {/* Animated Chromatogram SVG Line */}
              <div className="h-32 w-full bg-[#F8F9F4] rounded-xl p-2 relative flex items-end overflow-hidden border hairline-border">
                <svg className="w-full h-full" viewBox="0 0 300 100" fill="none">
                  <path
                    d="M 10 90 L 60 90 L 80 87 L 90 90 L 130 90 L 145 20 L 155 90 L 210 90 L 220 84 L 230 90 L 290 90"
                    stroke="#5B9A3C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="10" y1="90" x2="290" y2="90" stroke="#1E3D2A" strokeOpacity="0.15" strokeWidth="1" />
                </svg>
                <div className="absolute top-3 left-4 text-[10px] font-mono text-[#5B9A3C]">
                  Peak: Nicotine (≥95.0%)
                </div>
              </div>
              <p className="text-[11px] text-[#1E3D2A]/60 mt-2 text-center">
                Representative analytical detection readout (HPLC / GC)
              </p>
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* =========================================================================
          ANALYTICAL QC TESTING SUITE: GC, HPLC & TITRATION
          Placed immediately above the 5-Step Manufacturing Lifecycle
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative">
        <FadeInUp>
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12 sm:mb-14">
            {/* Header Monograph Pill with Flanking Lines */}
            <div className="inline-flex items-center gap-3 mb-2.5">
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#5B9A3C]">
                GLP ANALYTICAL LABORATORY · TRIPLE BATCH RELEASE
              </span>
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
            </div>

            {/* Main Title - Single Line on Desktop */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-medium text-[#1E3D2A] leading-tight tracking-tight whitespace-normal sm:whitespace-nowrap">
              Advanced QC: <span className="italic font-serif text-[#4E8A32]">GC, HPLC &amp; Titration Testing.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#1E3D2A]/75 mt-3 font-light leading-relaxed max-w-2xl mx-auto">
              Every production lot undergoes rigorous analytical validation across three validated methodologies before certificate of analysis (CoA) issuance.
            </p>
          </div>
        </FadeInUp>

        {/* 3 Testing Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {QC_TEST_CARDS.map((card) => (
            <StaggerItem key={card.id} className="h-full">
              <div
                onClick={() => {
                  if (card.isInteractive) setHplcModalOpen(true);
                }}
                className={`group h-full flex flex-col justify-between rounded-3xl bg-white border border-[#CBDCC5]/80 hover:border-[#5B9A3C] shadow-sm hover:shadow-xl hover:shadow-[#5B9A3C]/12 transition-all duration-400 overflow-hidden ${
                  card.isInteractive ? 'cursor-pointer' : ''
                } hover:-translate-y-1.5`}
              >
                {/* Upper Image Section */}
                <div>
                  <div className="relative w-full h-52 sm:h-56 lg:h-60 overflow-hidden bg-[#FAFBF7]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    
                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-white font-bold tracking-wide border border-white/10 shadow-md">
                      {card.tag}
                    </div>

                    {/* Interactive indicator for HPLC */}
                    {card.isInteractive && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#5B9A3C]/90 backdrop-blur-md text-white text-[10px] font-mono font-semibold flex items-center gap-1 shadow-md group-hover:bg-[#4E8A32] transition-colors">
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </div>
                    )}

                    {/* Gradient subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#143823] group-hover:text-[#5B9A3C] transition-colors tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-mono text-[#5B9A3C] font-semibold mt-1">
                      {card.sub}
                    </p>

                    <p className="text-xs sm:text-sm text-[#1E3D2A]/75 font-light leading-relaxed mt-3">
                      {card.desc}
                    </p>

                    {/* Key Specs Checklist */}
                    <ul className="mt-4 space-y-2 pt-3 border-t border-[#1E3D2A]/8">
                      {card.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#1E3D2A]/85 font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Pill / CTA */}
                <div className="px-6 pb-6 pt-0">
                  {card.isInteractive ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHplcModalOpen(true);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#143823] text-white hover:bg-[#5B9A3C] text-xs font-semibold shadow-sm transition-all group-hover:shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#8CC63F]" />
                      <span>Inspect HPLC Chromatogram</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#1E3D2A]/60 px-3 py-2 rounded-xl bg-[#F8F9F4] border border-[#CBDCC5]/60">
                      <span>Standard Assay</span>
                      <span className="font-semibold text-[#5B9A3C]">{card.pill}</span>
                    </div>
                  )}
                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5-Step Process Timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <FadeInUp>
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-3 mb-2.5">
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#5B9A3C]">
                STANDARD OPERATING PROCEDURE
              </span>
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-medium text-[#1E3D2A] leading-tight tracking-tight whitespace-normal sm:whitespace-nowrap">
              The 5-Step <span className="italic font-serif text-[#4E8A32]">Manufacturing &amp; Testing Lifecycle.</span>
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="space-y-6">
          {PROCESS_STEPS.map((step, idx) => (
            <StaggerItem key={step.step}>
              <div
                className="p-8 rounded-3xl bg-white border hairline-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#5B9A3C]/40 transition-colors"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#E6EEDF] flex items-center justify-center text-[#5B9A3C] font-mono font-bold text-lg shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#5B9A3C]">
                      {step.tagline}
                    </span>
                    <h3 className="text-xl font-serif font-medium text-[#1E3D2A] mt-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1E3D2A]/75 mt-2 max-w-2xl font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  <span className="text-xs font-mono text-[#1E3D2A]/50 bg-[#F8F9F4] px-3 py-1.5 rounded-lg border hairline-border">
                    Step {idx + 1} of 5
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Quality Control Panel & Analytical Benchmarks */}
      <section className="bg-white py-20 border-y hairline-border mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
                Batch Verification Standard
              </span>
              <h2 className="text-3xl font-serif font-medium text-[#1E3D2A] mt-2 leading-tight">
                Every release backed by lot-specific chromatography.
              </h2>
              <p className="mt-4 text-sm text-[#1E3D2A]/75 font-light leading-relaxed">
                Prior to dispatch, our analytical chemists verify every batch to confirm purity thresholds and ensure non-nicotine alkaloid (NNA) residuals remain strictly below specified tolerances.
              </p>
              <div className="mt-6">
                <Link
                  to="/downloads"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B9A3C] hover:text-[#4E8A32]"
                >
                  <span>Download sample CoA document</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-[#F8F9F4] border hairline-border">
                <h4 className="text-xs uppercase tracking-widest font-mono text-[#1E3D2A]/60 font-semibold mb-4">
                  Standard Analytical Testing Parameters
                </h4>
                <div className="divide-y hairline-border text-xs sm:text-sm">
                  <div className="py-3 flex justify-between">
                    <span className="font-medium text-[#1E3D2A]">Active Nicotine Assay</span>
                    <span className="font-mono text-[#5B9A3C]">40.0% min (Sulfate) / 95.0% min (Alkaloid)</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="font-medium text-[#1E3D2A]">Related Alkaloid Impurities</span>
                    <span className="font-mono text-[#1E3D2A]/80">[to be confirmed by Okhai]</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="font-medium text-[#1E3D2A]">Moisture Content (Karl Fischer)</span>
                    <span className="font-mono text-[#1E3D2A]/80">[to be confirmed by Okhai]</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="font-medium text-[#1E3D2A]">Appearance &amp; Clarity</span>
                    <span className="font-mono text-[#1E3D2A]/80">Visual verification vs reference lot</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="font-medium text-[#1E3D2A]">Refractive Index / Specific Gravity</span>
                    <span className="font-mono text-[#1E3D2A]/80">[to be confirmed by Okhai]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid (Locked Placeholder Tiles strictly complying with rules) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="max-w-2xl mb-8">
          <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
            Compliance &amp; Certifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1E3D2A] mt-1">
            Statutory &amp; Quality Documentation
          </h2>
          <p className="text-xs text-[#1E3D2A]/60 mt-1">
            Certifications and registration filings available upon verification to qualified enterprise partners.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "ISO Facility Certification", status: "[to be confirmed]" },
            { name: "GMP Guidelines Alignment", status: "[to be confirmed]" },
            { name: "Sample Lot CoA", status: "Available in Downloads" },
            { name: "16-Section GHS SDS", status: "On-Request Form" },
            { name: "IEC Export Registration", status: "DGFT Approved" },
            { name: "GST Tax Registration", status: "Gujarat State" }
          ].map((tile, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white border hairline-border flex flex-col justify-between text-center min-h-[140px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#E6EEDF] flex items-center justify-center mx-auto text-[#5B9A3C]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-serif font-semibold text-xs text-[#1E3D2A] leading-snug">{tile.name}</h5>
                <span className="text-[10px] font-mono text-[#5B9A3C] block mt-1">{tile.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety, Health & Environment (SHE) + Sustainability */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border hairline-border">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B9A3C] font-semibold">
              Safety, Health &amp; Environment (SHE)
            </span>
            <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mt-2">
              Responsible Hazardous Material Stewardship
            </h3>
            <p className="text-xs sm:text-sm text-[#1E3D2A]/80 mt-3 leading-relaxed font-light">
              Because nicotine compounds carry acute toxicity, our facility enforces stringent engineering containment: dedicated negative-pressure extraction bays, certified PPE protocols for personnel, continuous VOC monitoring, and authorized hazardous waste disposal through state-accredited environmental infrastructure in Gujarat.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#E6EEDF]/40 border hairline-border">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B9A3C] font-semibold">
              Sustainability Approach
            </span>
            <h3 className="text-2xl font-serif font-medium text-[#1E3D2A] mt-2">
              Responsible Agrarian Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-[#1E3D2A]/80 mt-3 leading-relaxed font-light">
              We partner directly with certified Indian tobacco growers to foster transparent cultivation practices, utilizing tobacco by-products efficiently and minimizing chemical processing waste through closed-loop solvent recovery systems.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/downloads"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5B9A3C] text-white text-xs font-semibold hover:bg-[#4E8A32] transition-colors"
          >
            <span>Request a Sample Certificate of Analysis (CoA)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Interactive HPLC Chromatogram Modal */}
      <HplcChromatogramModal
        isOpen={hplcModalOpen}
        onClose={() => setHplcModalOpen(false)}
      />
    </div>
  );
};
