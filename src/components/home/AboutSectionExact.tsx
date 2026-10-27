import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Leaf,
  FlaskConical,
  Calendar,
  Atom
} from 'lucide-react';
import labPhoto from '../../assets/images/laboratory_qc_chromatography_1792921813996.jpg';
import { FadeInLeft, FadeInRight, StaggerContainer, StaggerItem, FadeInUp } from '../common/animations';

export const AboutSectionExact: React.FC = () => {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-transparent text-[#1E3D2A] selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* =========================================================================
          BACKGROUND BOTANICAL MOTIFS & FLOATING LEAVES & MOLECULAR STRUCTURES
      ========================================================================= */}
      {/* Top-Right Molecular Hexagon & Botanical Leaves Wireframe */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-40 pointer-events-none select-none">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full text-[#5B9A3C]/40">
          <path d="M220 40 L260 65 L260 115 L220 140 L180 115 L180 65 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M180 115 L140 140 L140 190 L180 215 L220 190 L220 140" stroke="currentColor" strokeWidth="1.5" />
          <path d="M260 115 L300 140 L300 190 L260 215 L220 190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="220" cy="40" r="4" fill="#5B9A3C" />
          <circle cx="260" cy="65" r="4" fill="#8CC63F" />
          <circle cx="180" cy="115" r="5" fill="#5B9A3C" />
          <circle cx="220" cy="140" r="4" fill="#8CC63F" />
          <circle cx="140" cy="190" r="4" fill="#5B9A3C" />
        </svg>
      </div>



      {/* Far-Right Vertical Tag (NATURE · SCIENCE · IMPACT) */}
      <div className="hidden 2xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[10px] font-mono tracking-widest text-[#1E3D2A]/45 uppercase select-none">
        <span>NATURE</span>
        <span className="text-[#5B9A3C]">·</span>
        <span>SCIENCE</span>
        <span className="text-[#5B9A3C]">·</span>
        <span>IMPACT</span>
        <div className="w-[1.5px] h-14 bg-[#1E3D2A]/20 mt-1" />
      </div>

      {/* =========================================================================
          MAIN CONTAINER: 2-COLUMN LUXURY GRID
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* -------------------------------------------------------------------
              LEFT COLUMN: CURVED TABLET DISPLAY + OVERLAPPING GLASS CARD
          ------------------------------------------------------------------- */}
          <div className="lg:col-span-5 relative flex flex-col items-start">
            <FadeInLeft className="w-full">
              {/* Elegant Script Header: "From Nature To Better Science" */}
              <div className="font-editorial italic text-2xl sm:text-3xl text-[#2F5233] mb-4 transform -rotate-3 select-none flex items-center gap-2">
                <span>From Nature</span>
                <span className="text-sm font-sans not-italic text-[#8CC63F]">✦</span>
                <span>To Better Science</span>
              </div>

              {/* Visual Frame Wrapper with Orbital Rings */}
              <div className="relative w-full max-w-[480px]">
                
                {/* Delicate Gold Circular Orbital Ring */}
                <div className="absolute -top-10 -right-6 sm:-top-12 sm:-right-8 w-60 h-60 rounded-full border border-[#C9A24B]/35 pointer-events-none select-none" />
                
                {/* Circular Botanical Lens Preview Badge on Ring */}
                <div className="absolute -top-6 -right-2 sm:-top-8 sm:right-2 z-20 w-24 h-24 rounded-full p-1 bg-white/80 backdrop-blur-md shadow-xl border border-[#C9A24B]/40 overflow-hidden hidden sm:block">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#E6EEDF] to-[#C9A24B]/20 flex items-center justify-center p-2 relative">
                    <Leaf className="w-8 h-8 text-[#5B9A3C] opacity-90 animate-pulse" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-white/40" />
                  </div>
                </div>

                {/* Floating 3D Molecule Glass Badge */}
                <div className="absolute top-4 -left-4 z-30 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-emerald-400/30 flex items-center justify-center text-[#5B9A3C]">
                  <Atom className="w-6 h-6 animate-spin-slow" />
                </div>

                {/* Main Tablet Display with HPLC Lab Photo */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#1E3D2A]/15 border-4 border-white bg-white group aspect-[4/3] w-full">
                  <img
                    src={labPhoto}
                    alt="High-Performance Liquid Chromatography QC Lab"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[1.05]"
                  />
                  
                  {/* Soft Gradient Overlay at Bottom of Photo */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Overlapping Glassmorphism Card (From Gujarat, to the World) */}
                <div className="relative sm:absolute sm:-bottom-10 sm:-right-6 mt-4 sm:mt-0 z-30 bg-white/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/90 shadow-2xl shadow-[#1E3D2A]/15 max-w-sm transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[11px] font-mono text-[#5B9A3C] font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-[#5B9A3C]" />
                      <span>ESTABLISHED 2022</span>
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#1E3D2A] leading-snug">
                    From Gujarat, to the World
                  </h3>
                  
                  <p className="text-xs text-[#1E3D2A]/75 mt-1 leading-relaxed font-light">
                    Incorporated in Gujarat, purpose-built for regulated Nicotine extraction and international standards.
                  </p>

                  <div className="mt-3 flex justify-end">
                    <Link
                      to="/about"
                      className="w-8 h-8 rounded-full bg-[#1E3D2A] hover:bg-[#5B9A3C] text-white flex items-center justify-center transition-colors shadow-md group/btn"
                      title="Learn More About Okhai Pharma"
                    >
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </FadeInLeft>
          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN: TYPOGRAPHY, 4 CIRCULAR GAUGES & ROADMAP LINK
          ------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-6">
            <FadeInRight className="w-full">
              {/* Top Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F2E2] border border-[#5B9A3C]/25 text-[#2D5A3C] text-xs font-mono font-semibold mb-4 w-fit shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>ABOUT OKHAI PHARMA</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-medium text-[#1E3D2A] leading-[1.14] text-balance">
                Pioneering botanical extraction with{' '}
                <span className="font-editorial italic font-normal text-[#2D5A3C] pr-1">
                  scientific precision.
                </span>{' '}
                <span className="text-[#C9A24B]">—</span>
              </h2>

              {/* Body Description */}
              <p className="mt-5 text-sm sm:text-base text-[#1E3D2A]/80 leading-relaxed font-light">
                Okhai Pharma Intermediates Pvt. Ltd. is a eminent manufacturer, exporter and supplier of pure nicotine and nicotine derivatives. Based in Gujarat, we combine rich regional agricultural resources with modern chemical engineering to supply verified active intermediates for pharmaceutical formulations, scientific research, and regulated industries worldwide.
              </p>

              {/* 4 Circular Animated Metric Gauges */}
              <StaggerContainer className="mt-8 pt-7 border-t border-[#1E3D2A]/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
                
                {/* Gauge 1: Sulfate Grade */}
                <StaggerItem className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#5B9A3C]/40 bg-[#EAF3E4] flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:border-[#5B9A3C] group-hover:scale-105 transition-all shadow-xs">
                    <Leaf className="w-5 h-5 text-[#5B9A3C]" />
                  </div>
                  <span className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#1E3D2A] leading-none">
                    40%
                  </span>
                  <span className="text-xs text-[#1E3D2A]/70 font-medium mt-1.5">
                    Sulfate Grade
                  </span>
                  <div className="w-10 h-[1.5px] bg-[#1E3D2A]/20 mt-2.5 group-hover:w-14 group-hover:bg-[#5B9A3C] transition-all" />
                </StaggerItem>

                {/* Gauge 2: Alkaloid Grades */}
                <StaggerItem className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#5B9A3C]/40 bg-[#EAF3E4] flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:border-[#5B9A3C] group-hover:scale-105 transition-all shadow-xs">
                    <Atom className="w-5 h-5 text-[#5B9A3C]" />
                  </div>
                  <span className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#1E3D2A] leading-none whitespace-nowrap">
                    90 / 95%
                  </span>
                  <span className="text-xs text-[#1E3D2A]/70 font-medium mt-1.5">
                    Alkaloid Grades
                  </span>
                  <div className="w-10 h-[1.5px] bg-[#1E3D2A]/20 mt-2.5 group-hover:w-14 group-hover:bg-[#5B9A3C] transition-all" />
                </StaggerItem>

                {/* Gauge 3: Refined Capacity */}
                <StaggerItem className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#5B9A3C]/40 bg-[#EAF3E4] flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:border-[#5B9A3C] group-hover:scale-105 transition-all shadow-xs">
                    <FlaskConical className="w-5 h-5 text-[#5B9A3C]" />
                  </div>
                  <span className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#1E3D2A] leading-none">
                    99.5%
                  </span>
                  <span className="text-xs text-[#1E3D2A]/70 font-medium mt-1.5">
                    Refined Capacity
                  </span>
                  <div className="w-10 h-[1.5px] bg-[#1E3D2A]/20 mt-2.5 group-hover:w-14 group-hover:bg-[#5B9A3C] transition-all" />
                </StaggerItem>

                {/* Gauge 4: Established */}
                <StaggerItem className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#5B9A3C]/40 bg-[#EAF3E4] flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:border-[#5B9A3C] group-hover:scale-105 transition-all shadow-xs">
                    <Calendar className="w-5 h-5 text-[#5B9A3C]" />
                  </div>
                  <span className="font-serif text-2xl sm:text-[1.75rem] font-bold text-[#1E3D2A] leading-none">
                    2022
                  </span>
                  <span className="text-xs text-[#1E3D2A]/70 font-medium mt-1.5">
                    Established
                  </span>
                  <div className="w-10 h-[1.5px] bg-[#1E3D2A]/20 mt-2.5 group-hover:w-14 group-hover:bg-[#5B9A3C] transition-all" />
                </StaggerItem>

              </StaggerContainer>

              {/* Bottom Action Link */}
              <div className="mt-10 pt-2 flex items-center">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
                >
                  <span className="w-8 h-8 rounded-full border border-[#1E3D2A]/30 flex items-center justify-center group-hover:bg-[#5B9A3C] group-hover:border-[#5B9A3C] group-hover:text-white transition-all shadow-xs">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span>Read our full company story &amp; facility roadmap</span>
                  <span className="hidden sm:inline-block w-16 h-[1.5px] bg-[#1E3D2A]/30 group-hover:w-24 group-hover:bg-[#5B9A3C] transition-all duration-300" />
                </Link>
              </div>
            </FadeInRight>
          </div>

        </div>
      </div>
    </section>
  );
};
