import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Microscope,
  ChevronRight,
  Layers,
  Sparkles,
  Phone
} from 'lucide-react';
import { HeroWithDualSwapper } from '../components/hero/HeroWithDualSwapper';
import { AboutSectionExact } from '../components/home/AboutSectionExact';
import { CoreFormulationsExact } from '../components/home/CoreFormulationsExact';
import { PurposeVisionExact } from '../components/home/PurposeVisionExact';
import { WhyPartnerExact } from '../components/home/WhyPartnerExact';
import { PeopleBehindOkhaiExact } from '../components/home/PeopleBehindOkhaiExact';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../components/common/animations';
import { COMPANY_DETAILS, PRODUCTS, LEADERSHIP, PROCESS_STEPS } from '../data/companyData';
import partnerNicotraceLogo from '../assets/images/partner-nicotrace-logo.png';

export const Home: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#1E3D2A] relative overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* =========================================================================
          PERSISTENT MASTER BOTANICAL CANVAS:
          - Stable #FAFBF7 warm ivory backdrop throughout the entire page
          - Subtle radial ambient glows spaced along the vertical scroll
          - Continuous floating 3D botanical leaves on left & right margins
          - Subtle topographical contour wave vectors
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Ambient Radial Luminous Glows */}
        <div className="absolute top-[650px] left-1/4 w-[750px] h-[450px] bg-[#8CC63F]/8 rounded-full blur-[140px]" />
        <div className="absolute top-[1700px] right-6 w-[650px] h-[550px] bg-[#5B9A3C]/6 rounded-full blur-[150px]" />
        <div className="absolute top-[3000px] left-10 w-[700px] h-[550px] bg-[#8CC63F]/7 rounded-full blur-[160px]" />
        <div className="absolute top-[4400px] right-1/4 w-[650px] h-[500px] bg-[#5B9A3C]/6 rounded-full blur-[140px]" />
        <div className="absolute top-[5800px] left-1/3 w-[600px] h-[500px] bg-[#8CC63F]/7 rounded-full blur-[150px]" />



        {/* Continuous Topographical Contour Waves */}
        <svg viewBox="0 0 1440 3200" fill="none" className="w-full h-full opacity-30 select-none">
          <path d="M-100 450 C 300 350, 700 620, 1100 420 C 1300 320, 1500 480, 1600 500" stroke="#8CC63F" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <path d="M-50 1100 C 400 980, 850 1220, 1200 1050 C 1400 950, 1550 1100, 1650 1120" stroke="#5B9A3C" strokeWidth="1" opacity="0.3" />
          <path d="M-100 1800 C 350 1680, 800 1950, 1250 1750 C 1450 1650, 1600 1820, 1700 1850" stroke="#8CC63F" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
          <path d="M-50 2500 C 450 2380, 900 2650, 1300 2480" stroke="#5B9A3C" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>

      {/* =========================================================================
          1. WORLD-CLASS CINEMATIC HERO + CONNECTED OVERLAPPING DUAL SWAPPER
      ========================================================================= */}
      <HeroWithDualSwapper />

      {/* =========================================================================
          3. ABOUT OKHAI PHARMA
      ========================================================================= */}
      <RevealOnScroll variant="fade-up">
        <AboutSectionExact />
      </RevealOnScroll>

      {/* =========================================================================
          4. CORE FORMULATIONS BENTO SHOWCASE (3 Product Suite)
      ========================================================================= */}
      <RevealOnScroll variant="scale">
        <CoreFormulationsExact />
      </RevealOnScroll>

      {/* =========================================================================
          5. PURPOSE & STRATEGIC VISION (Interlocking Botanical Portals)
      ========================================================================= */}
      <RevealOnScroll variant="fade-up">
        <PurposeVisionExact />
      </RevealOnScroll>

      {/* =========================================================================
          6. WHY PARTNER WITH US (Interactive 5-Step Accordion & Facility Cards)
      ========================================================================= */}
      <RevealOnScroll variant="fade-up">
        <WhyPartnerExact />
      </RevealOnScroll>

      {/* =========================================================================
          7. PROCESS TEASER (5-Step Quality Journey)
      ========================================================================= */}
      <section className="pt-10 sm:pt-14 pb-4 sm:pb-6 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <FadeInUp>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 lg:mb-16">
            
            {/* Header Monograph Pill with Flanking Lines */}
            <div className="inline-flex items-center gap-3 mb-2.5">
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#5B9A3C]">
                EXTRACTION &amp; QUALITY JOURNEY
              </span>
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1E3D2A] leading-tight tracking-tight">
              From botanical harvest to <span className="italic font-serif text-[#4E8A32]">sealed export drum.</span>
            </h2>

            {/* Action Link Centered */}
            <div className="mt-4 flex justify-center">
              <Link
                to="/quality-process"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono font-semibold text-[#5B9A3C] hover:text-[#4E8A32] group"
              >
                <span>Explore analytical validation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {PROCESS_STEPS.map((step, idx) => (
            <StaggerItem key={step.step} className="h-full">
              <div
                onClick={() => setActiveStep(idx)}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer h-full flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-white border-[#5B9A3C] shadow-xl shadow-[#5B9A3C]/12 ring-2 ring-[#5B9A3C]/20 -translate-y-1'
                    : 'bg-white/80 backdrop-blur-sm border-[#1E3D2A]/10 hover:bg-white hover:border-[#5B9A3C]/50 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${activeStep === idx ? 'text-[#5B9A3C]' : 'text-[#1E3D2A]/40'}`}>
                      {step.step}
                    </span>
                    {activeStep === idx && (
                      <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-base font-serif font-semibold text-[#1E3D2A] mt-3 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>



      {/* =========================================================================
          9. THE PEOPLE BEHIND OKHAI PHARMA (Leadership & Partners)
      ========================================================================= */}
      <PeopleBehindOkhaiExact />

      {/* =========================================================================
          10. FINAL HIGH-IMPACT LUXURY BOTANICAL CTA & MARKETING PARTNER SECTION
      ========================================================================= */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-br from-[#EFF6EB] via-[#F8FAF5] to-[#E5F0E1] text-[#143823] relative overflow-hidden border-t border-[#5B9A3C]/20 shadow-sm">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#8CC63F]/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[400px] h-[250px] bg-[#5B9A3C]/12 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column (6 cols): Sourcing & Contract Inquiries */}
            <FadeInLeft className="lg:col-span-6 text-center lg:text-left flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143823]/8 border border-[#5B9A3C]/25 text-[#143823] text-xs font-mono font-bold tracking-wider uppercase mb-3.5 mx-auto lg:mx-0 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Commercial Inquiries &amp; Custom Contracts</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#143823] leading-tight tracking-tight">
                Source with certainty.
                <br />
                <span className="text-[#3A7528] italic font-normal">Partner with Okhai Pharma.</span>
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-[#4F6456] max-w-xl leading-relaxed font-normal mx-auto lg:mx-0">
                Connect with our commercial engineering team in Gujarat for lot chromatography profiles, custom UN packaging options, and direct international dispatch quotations.
              </p>

              {/* 3 Quick Benefit Pills */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#5B9A3C]/25 text-[11px] font-mono font-semibold text-[#143823] shadow-2xs">
                  ✓ WHO-GMP Principles
                </span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#5B9A3C]/25 text-[11px] font-mono font-semibold text-[#143823] shadow-2xs">
                  ✓ Nitrogen Blanket Purged
                </span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#5B9A3C]/25 text-[11px] font-mono font-semibold text-[#143823] shadow-2xs">
                  ✓ Global Reach
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-full bg-[#143823] hover:bg-[#1E4D35] text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-xl shadow-[#143823]/25 flex items-center justify-center gap-2 group hover:scale-102 cursor-pointer"
                >
                  <span>Request Commercial Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="px-5 py-3.5 rounded-full bg-white hover:bg-[#FAFBF7] text-[#143823] font-semibold text-xs sm:text-sm border border-[#CBDCC5] hover:border-[#5B9A3C] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                >
                  <Phone className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="font-mono">{COMPANY_DETAILS.phone}</span>
                </a>
              </div>
            </FadeInLeft>

            {/* Right Column (6 cols): Marketing Partner Animated Showcase - Open, Containerless, Premium */}
            <FadeInRight className="lg:col-span-6 w-full">
              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left py-2">
                
                {/* Ambient Multi-layer Botanical & Golden Aura Glows */}
                <div className="absolute -top-16 -right-16 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/25 via-[#8CC63F]/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#5B9A3C]/15 rounded-full blur-2xl pointer-events-none" />

                {/* Prestige Floating Badges Row */}
                <div className="relative z-10 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143823] text-white text-xs font-mono font-bold shadow-md shadow-[#143823]/25 border border-[#8CC63F]/40">
                    <span className="w-2 h-2 rounded-full bg-[#8CC63F] animate-ping" />
                    <span className="tracking-wider uppercase text-[#8CC63F]">Marketing Partner</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#5B9A3C]/30 text-[11px] font-mono uppercase tracking-widest text-[#143823] font-bold shadow-2xs">
                    Global Distribution
                  </span>
                </div>

                {/* NicoTrace SOLUTIONS Large Hero Logo - Prominent & Containerless */}
                <div className="relative z-10 w-full flex items-center justify-center lg:justify-start py-3 group">
                  <img
                    src={partnerNicotraceLogo}
                    alt="NicoTrace SOLUTIONS - Authorized Global Marketing Partner"
                    className="h-44 sm:h-56 md:h-64 lg:h-76 w-auto max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(20,56,35,0.18)] transition-all duration-700 group-hover:scale-105 group-hover:drop-shadow-[0_25px_50px_rgba(20,56,35,0.25)] cursor-pointer"
                  />
                </div>

                {/* Partner Details & Value Proposition */}
                <div className="relative z-10 mt-5 w-full">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#143823] tracking-tight">
                      NicoTrace Solutions
                    </h3>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5B9A3C]/20 text-[#5B9A3C]" title="Verified Global Alliance">
                      <CheckCircle2 className="w-4 h-4 text-[#5B9A3C]" />
                    </span>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-[#3E5545] leading-relaxed font-normal max-w-lg mx-auto lg:mx-0">
                    Authorized global marketing and strategic distribution partner facilitating licensed commercial allocations, worldwide contract sourcing, and documentation desk.
                  </p>

                  {/* 3 Value Pillars */}
                  <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    <span className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-sm border border-[#5B9A3C]/20 text-[11px] font-mono text-[#143823] font-medium shadow-2xs">
                      ✓ Commercial Allocations
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-sm border border-[#5B9A3C]/20 text-[11px] font-mono text-[#143823] font-medium shadow-2xs">
                      ✓ Global Contract Sourcing
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-sm border border-[#5B9A3C]/20 text-[11px] font-mono text-[#143823] font-medium shadow-2xs">
                      ✓ Regulatory Desk
                    </span>
                  </div>

                  {/* Strategic Alliance Footer Action */}
                  <div className="mt-6 pt-4 border-t border-[#143823]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-xs text-[#5B9A3C] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
                      <span>Strategic Alliance</span>
                    </span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#143823] hover:bg-[#1E4D35] text-white font-semibold text-xs shadow-md shadow-[#143823]/20 hover:shadow-lg transition-all group/btn cursor-pointer hover:scale-102"
                    >
                      <span>Inquire via Partner Desk</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

              </div>
            </FadeInRight>

          </div>
        </div>
      </section>

    </div>
  );
};
