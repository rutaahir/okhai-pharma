import React from 'react';
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
  FlaskConical
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';
import { FadeInLeft, FadeInRight, FadeInUp, StaggerContainer, StaggerItem } from '../components/common/animations';

export const QualityProcess: React.FC = () => {
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

      {/* 5-Step Process Timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <FadeInUp>
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
              Standard Operating Procedure
            </span>
            <h2 className="text-3xl font-serif font-medium text-[#1E3D2A] mt-1">
              The 5-Step Manufacturing &amp; Testing Lifecycle
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
    </div>
  );
};
