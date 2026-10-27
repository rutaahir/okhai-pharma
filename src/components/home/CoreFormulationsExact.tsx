import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Leaf,
  FileText,
  Droplets,
  Microscope,
  Box,
  ShieldCheck,
  Wind,
  FlaskConical,
  Globe2
} from 'lucide-react';

import sulfatePkgImg from '../../assets/images/product-nicotine-sulfate-pkg.jpg';
import alkaloidPkgImg from '../../assets/images/product-nicotine-alkaloid-pkg.jpg';
import pureNicotinePkgImg from '../../assets/images/product-pure-nicotine-pkg.jpg';
import { StaggerContainer, StaggerItem, FadeInUp } from '../common/animations';

export const CoreFormulationsExact: React.FC = () => {
  return (
    <section className="relative py-12 lg:py-16 bg-transparent overflow-hidden text-[#1E3D2A] selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* Curved Stream Lines Vector (Right Side) */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[450px] pointer-events-none opacity-45 select-none overflow-hidden">
        <svg viewBox="0 0 500 450" fill="none" className="w-full h-full text-[#8CC63F]">
          <path d="M0,150 C150,80 300,250 500,100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M0,180 C180,100 320,280 500,130" stroke="#5B9A3C" strokeWidth="1.2" />
          <path d="M0,210 C200,120 350,310 500,160" stroke="currentColor" strokeWidth="1.0" />
          <path d="M50,240 C220,150 370,330 500,190" stroke="#5B9A3C" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Curved Stream Lines Vector (Bottom Left Side) */}
      <div className="absolute bottom-4 left-0 w-[400px] h-[300px] pointer-events-none opacity-40 select-none overflow-hidden">
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full text-[#5B9A3C]">
          <path d="M-50,200 C80,100 220,280 400,120" stroke="currentColor" strokeWidth="1.2" />
          <path d="M-50,230 C100,130 250,300 400,150" stroke="#8CC63F" strokeWidth="1.0" strokeDasharray="4 4" />
          <path d="M-50,260 C120,160 270,320 400,180" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Floating Green Bokeh Spheres (Bottom Right) */}
      <div className="absolute bottom-8 right-16 w-8 h-8 rounded-full bg-[#8CC63F]/40 filter blur-[2px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-36 w-5 h-5 rounded-full bg-[#5B9A3C]/40 filter blur-[1.5px] pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#5B9A3C]">
                  OUR CORE FORMULATIONS
                </span>
                <span className="h-[1px] w-16 sm:w-24 bg-[#5B9A3C]/35" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-medium text-[#1E3D2A] leading-[1.12] tracking-tight">
                Refined intermediates for <span className="italic font-serif text-[#4E8A32]">global industry.</span>
              </h2>

              <p className="text-sm sm:text-[15px] text-[#1E3D2A]/75 mt-2.5 font-light leading-relaxed max-w-2xl">
                High-purity nicotine intermediates. Consistent specifications. Global supply.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono font-semibold text-[#1E3D2A]/85 hover:text-[#4E8A32] transition-colors self-start md:self-end pb-1 group"
            >
              <span>Compare specifications</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </FadeInUp>

        {/* CORE FORMULATIONS (3 HIGH-PURITY GRADES) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          
          {/* =====================================================================
              CARD 1: NICOTINE SULFATE 40%
          ===================================================================== */}
          <StaggerItem className="h-full">
            <div className="rounded-[2.25rem] bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(30,61,42,0.08)] hover:shadow-[0_25px_60px_rgba(30,61,42,0.13)] transition-all duration-500 p-5 sm:p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden group h-full">
              {/* Ambient Background Aura */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#8CC63F]/12 via-transparent to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-115 transition-transform duration-700" />

              <div>
                {/* Product Orb Showcase (Increased Size & Impressive Styling) */}
                <div className="relative shrink-0 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full border border-[#8CC63F]/40 scale-110 pointer-events-none" />
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(30,61,42,0.18)] bg-white aspect-square">
                    <img
                      src={sulfatePkgImg}
                      alt="Nicotine Sulphate 40% Drum and Canister Packaging"
                      className="w-full h-full object-cover rounded-full aspect-square transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col text-left w-full">
                  {/* Pill Tag: CAS 65-30-5 • UN 1658 */}
                  <div className="self-start inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#F3F8F0] border border-[#5B9A3C]/20 text-[10px] sm:text-[11px] font-mono font-semibold text-[#2D5A3C]">
                    <span className="font-bold">CAS</span>
                    <span>65-30-5</span>
                    <span className="text-[#8CC63F] font-bold">•</span>
                    <span>UN 1658</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl xl:text-[1.45rem] font-serif font-bold text-[#1E3D2A] mt-2.5 leading-snug">
                    Nicotine Sulfate 40%
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#1E3D2A]/75 mt-2.5 leading-relaxed font-light">
                    Water-soluble formulation specifically developed for scientific research, pharmacological receptor studies, and as a starting material for high-purity nicotine refining.
                  </p>

                  {/* 3 Feature Pills */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-medium text-[#1E3D2A]/80">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <Droplets className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Water Miscible</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <FlaskConical className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Research Reagent</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <Box className="w-3 h-3 text-[#5B9A3C]" />
                      <span>UN-Rated 200L Drums</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action Strip */}
              <div className="mt-6 pt-5 border-t border-[#1E3D2A]/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/products/nicotine-sulfate-40"
                  className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#1E3D2A] hover:text-[#4E8A32] transition-colors group/link shrink-0"
                >
                  <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Explore specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F3F8F0] border border-[#5B9A3C]/35 text-xs font-semibold text-[#1E3D2A] shadow-xs hover:border-[#5B9A3C] transition-all hover:shadow shrink-0"
                >
                  <FileText className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Request quote</span>
                </Link>
              </div>
            </div>
          </StaggerItem>

          {/* =====================================================================
              CARD 2: NICOTINE ALKALOID 90% / 95%
          ===================================================================== */}
          <StaggerItem className="h-full">
            <div className="rounded-[2.25rem] bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(30,61,42,0.08)] hover:shadow-[0_25px_60px_rgba(30,61,42,0.13)] transition-all duration-500 p-5 sm:p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden group h-full">
              {/* Ambient Background Aura */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#DCEBF7]/35 via-transparent to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-115 transition-transform duration-700" />

              <div>
                {/* Product Orb Showcase (Increased Size & Impressive Styling) */}
                <div className="relative shrink-0 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full border border-sky-400/40 scale-110 pointer-events-none" />
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(30,61,42,0.18)] bg-white aspect-square">
                    <img
                      src={alkaloidPkgImg}
                      alt="Nicotine Alkaloid 90% / 95% Drum and Canister Packaging"
                      className="w-full h-full object-cover rounded-full aspect-square transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col text-left w-full">
                  {/* Pill Tag: CAS 54-11-5 • UN 1654 */}
                  <div className="self-start inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#F3F8F0] border border-[#5B9A3C]/20 text-[10px] sm:text-[11px] font-mono font-semibold text-[#2D5A3C]">
                    <span className="font-bold">CAS</span>
                    <span>54-11-5</span>
                    <span className="text-[#8CC63F] font-bold">•</span>
                    <span>UN 1654</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl xl:text-[1.45rem] font-serif font-bold text-[#1E3D2A] mt-2.5 leading-snug">
                    Nicotine Alkaloid 90% / 95%
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#1E3D2A]/75 mt-2.5 leading-relaxed font-light">
                    Naturally extracted from Indian Nicotiana tabacum under strict chromatographic control. The fundamental building block for Nicotine Replacement Therapies (NRT) and precision formulations.
                  </p>

                  {/* 3 Feature Pills */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-medium text-[#1E3D2A]/80">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <Microscope className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Pharma API Grade</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Low Residue Fraction</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <Wind className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Nitrogen Blanket Purged</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action Strip */}
              <div className="mt-6 pt-5 border-t border-[#1E3D2A]/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/products/nicotine-alkaloid-90-95"
                  className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#1E3D2A] hover:text-[#4E8A32] transition-colors group/link shrink-0"
                >
                  <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Explore specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F3F8F0] border border-[#5B9A3C]/35 text-xs font-semibold text-[#1E3D2A] shadow-xs hover:border-[#5B9A3C] transition-all hover:shadow shrink-0"
                >
                  <FileText className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Request quote</span>
                </Link>
              </div>
            </div>
          </StaggerItem>

          {/* =====================================================================
              CARD 3: PURE NICOTINE USP/EP 99.5%+
          ===================================================================== */}
          <StaggerItem className="h-full md:col-span-2 xl:col-span-1 md:max-w-md md:mx-auto md:w-full xl:max-w-none">
            <div className="rounded-[2.25rem] bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(30,61,42,0.08)] hover:shadow-[0_25px_60px_rgba(30,61,42,0.13)] transition-all duration-500 p-5 sm:p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden group h-full">
              {/* Ambient Background Aura */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#8CC63F]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-115 transition-transform duration-700" />

              <div>
                {/* Product Orb Showcase (Increased Size & Impressive Styling) */}
                <div className="relative shrink-0 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full border border-[#8CC63F]/40 scale-110 pointer-events-none" />
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(30,61,42,0.18)] bg-white aspect-square">
                    <img
                      src={pureNicotinePkgImg}
                      alt="Pure Nicotine USP/EP 99.5%+ Canister and Bottle Packaging"
                      className="w-full h-full object-cover rounded-full aspect-square transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col text-left w-full">
                  {/* Pill Tag: CAS 54-11-5 • UN 1654 • USP/EP */}
                  <div className="self-start inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#F3F8F0] border border-[#5B9A3C]/20 text-[10px] sm:text-[11px] font-mono font-semibold text-[#2D5A3C]">
                    <span className="font-bold">CAS</span>
                    <span>54-11-5</span>
                    <span className="text-[#8CC63F] font-bold">•</span>
                    <span>UN 1654</span>
                    <span className="text-[#8CC63F] font-bold">•</span>
                    <span className="text-[#4E8A32] font-bold">USP/EP</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl xl:text-[1.45rem] font-serif font-bold text-[#1E3D2A] mt-2.5 leading-snug">
                    Pure Nicotine USP/EP 99.5%+
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#1E3D2A]/75 mt-2.5 leading-relaxed font-light">
                    Supernic's Pure Nicotine is colorless and odorless, delivering a neutral base for your formulations. Its unmatched stability guarantees long-term consistency and reliability in every use.
                  </p>

                  {/* 3 Feature Pills */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-medium text-[#1E3D2A]/80">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <Droplets className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Colorless</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <Wind className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Odorless</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1E3D2A]/10 shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-[#5B9A3C]" />
                      <span>USP/EP Stable</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action Strip */}
              <div className="mt-6 pt-5 border-t border-[#1E3D2A]/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/products/pure-nicotine-usp-ep-99-5"
                  className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#1E3D2A] hover:text-[#4E8A32] transition-colors group/link shrink-0"
                >
                  <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Explore specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F3F8F0] border border-[#5B9A3C]/35 text-xs font-semibold text-[#1E3D2A] shadow-xs hover:border-[#5B9A3C] transition-all hover:shadow shrink-0"
                >
                  <FileText className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Request quote</span>
                </Link>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

      </div>
    </section>
  );
};
