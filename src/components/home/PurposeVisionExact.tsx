import React from 'react';
import {
  Target,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  Lightbulb,
  Globe2,
  Handshake,
  FlaskConical,
  Users,
  Sprout,
  HardHat
} from 'lucide-react';

import pipetteImg from '../../assets/images/purpose-mission-pipette.jpg';
import globeImg from '../../assets/images/purpose-vision-globe.jpg';
import { FadeInLeft, FadeInRight, ScaleReveal, FadeInUp } from '../common/animations';

export const PurposeVisionExact: React.FC = () => {
  return (
    <section className="relative py-12 lg:py-16 bg-transparent overflow-hidden text-[#1E3D2A] selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* =========================================================================
          ATMOSPHERIC BOTANICAL BACKGROUND:
          - Rolling organic green gradient ribbons & waves
          - Floating 3D leaves with depth-of-field blur
          - Floating molecular crystal nodes
      ========================================================================= */}

      {/* Top-Left Organic Wavy Flow Ribbon */}
      <div className="absolute -top-12 -left-20 w-[600px] h-[450px] pointer-events-none opacity-40 select-none overflow-hidden">
        <svg viewBox="0 0 600 450" fill="none" className="w-full h-full text-[#8CC63F]">
          <path d="M-50,150 C150,50 350,220 600,80 L600,0 L-50,0 Z" fill="url(#grad-mint-1)" />
          <defs>
            <linearGradient id="grad-mint-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top-Right Organic Wavy Flow Ribbon */}
      <div className="absolute -top-10 -right-20 w-[650px] h-[450px] pointer-events-none opacity-40 select-none overflow-hidden">
        <svg viewBox="0 0 650 450" fill="none" className="w-full h-full text-[#5B9A3C]">
          <path d="M0,80 C250,220 450,50 650,150 L650,0 L0,0 Z" fill="url(#grad-mint-2)" />
          <defs>
            <linearGradient id="grad-mint-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B9A3C" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#8CC63F" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>



      {/* =========================================================================
          MAIN CONTAINER
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* -----------------------------------------------------------------------
            SECTION HEADER
            —— INSTITUTIONAL VALUES ——
            Our Purpose & Strategic Vision
            Driven by responsibility. Focused on a healthier tomorrow.
        ----------------------------------------------------------------------- */}
        <FadeInUp>
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            
            {/* Header Monograph Pill with Flanking Lines */}
            <div className="inline-flex items-center gap-3 mb-2.5">
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#5B9A3C]">
                INSTITUTIONAL VALUES
              </span>
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
            </div>

            {/* Main Title: "Our Purpose & Strategic Vision" */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1E3D2A] leading-tight tracking-tight">
              Our Purpose &amp; <span className="italic font-serif text-[#4E8A32]">Strategic Vision</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#1E3D2A]/75 mt-2.5 font-light leading-relaxed">
              Driven by responsibility. Focused on a healthier tomorrow.
            </p>
          </div>
        </FadeInUp>

        {/* -----------------------------------------------------------------------
            MAIN CONTENT GRID:
            LEFT: OUR MISSION (Quality Today. Health Tomorrow.)
            CENTER: INTERLOCKING INFINITY BOTANICAL RINGS (Pipette & Globe)
            RIGHT: OUR VISION (Global Leadership in Nicotine Innovation.)
        ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* =====================================================================
              LEFT COLUMN: OUR MISSION (span 4 cols)
          ===================================================================== */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <FadeInLeft className="w-full">
              {/* Highlighted Mission Pill Badge with Icon directly adjacent */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#143823] to-[#1E4D35] text-white border border-[#8CC63F]/40 shadow-lg shadow-[#143823]/20 mb-4 group hover:scale-[1.02] transition-all">
                <div className="w-8 h-8 rounded-full bg-[#8CC63F]/20 text-[#8CC63F] flex items-center justify-center ring-2 ring-[#8CC63F]/40 shrink-0">
                  <Target className="w-4 h-4 text-[#8CC63F]" />
                </div>
                <div className="flex items-center gap-2 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8CC63F]">
                    OUR MISSION
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3D2A] leading-tight">
                Quality Today. <br />
                <span className="italic font-serif text-[#4E8A32]">Health Tomorrow.</span>
              </h3>

              {/* Paragraph */}
              <p className="text-xs sm:text-[13px] text-[#1E3D2A]/80 mt-3 leading-relaxed font-light">
                Manufacture and supply high-purity nicotine and derivatives with an uncompromising focus on quality, safety protocols, and environmental responsibility.
              </p>

              {/* 3 Pillar Micro Badges (Precision, Safety, Environmental Stewardship) */}
              <div className="mt-6 flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-[#1E3D2A]/10 w-full">
                
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EAF3E5] flex items-center justify-center text-[#2D5A3C] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#1E3D2A] leading-tight">Precision</span>
                    <span className="text-[9px] font-mono text-[#1E3D2A]/60">in Every Batch</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EAF3E5] flex items-center justify-center text-[#2D5A3C] shrink-0">
                    <HardHat className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#1E3D2A] leading-tight">Safety</span>
                    <span className="text-[9px] font-mono text-[#1E3D2A]/60">in All Processes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EAF3E5] flex items-center justify-center text-[#2D5A3C] shrink-0">
                    <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#1E3D2A] leading-tight">Environmental</span>
                    <span className="text-[9px] font-mono text-[#1E3D2A]/60">Stewardship</span>
                  </div>
                </div>

              </div>
            </FadeInLeft>
          </div>

          {/* =====================================================================
              CENTER COLUMN: INTERLOCKING INFINITY BOTANICAL RINGS (span 4 cols)
              - Left Circle: Dropper Pipette dripping into green test tube
              - Right Circle: Glass Earth Globe on forest moss in sunlight
              - Intersection: Green Leaf Badge
              - Underneath: "Better Chemistry FOR A BRIGHTER FUTURE"
          ===================================================================== */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center my-4 lg:my-0 relative select-none">
            <ScaleReveal>
              {/* Molecular Cluster Illustration Above Right Circle */}
              <div className="absolute -top-10 right-4 w-32 h-32 pointer-events-none opacity-70 select-none">
                <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[#8CC63F]">
                  <line x1="40" y1="50" x2="70" y2="30" stroke="#5B9A3C" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="70" y1="30" x2="100" y2="40" stroke="#8CC63F" strokeWidth="2" />
                  <circle cx="40" cy="50" r="8" fill="#5B9A3C" fillOpacity="0.8" />
                  <circle cx="70" cy="30" r="10" fill="#8CC63F" fillOpacity="0.9" />
                  <circle cx="100" cy="40" r="6" fill="#4E8A32" />
                  <circle cx="65" cy="15" r="4" fill="#8CC63F" />
                </svg>
              </div>

              {/* The Interlocking Dual Circular Portals */}
              <div className="relative flex items-center justify-center">
                
                {/* Left Circular Portal: Mission Lab Pipette */}
                <div className="relative z-10 w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full p-1.5 sm:p-2 bg-gradient-to-tr from-[#8CC63F] via-[#5B9A3C] to-[#8CC63F] shadow-[0_15px_40px_rgba(30,61,42,0.22)] aspect-square group">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
                    <img
                      src={pipetteImg}
                      alt="Botanical Extraction Pipette into Test Tube"
                      className="w-full h-full object-cover rounded-full aspect-square transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Right Circular Portal: Vision Crystal Earth Globe (Interlocking with -ml-7 sm:-ml-10 lg:-ml-12) */}
                <div className="relative z-0 -ml-7 sm:-ml-10 lg:-ml-12 w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full p-1.5 sm:p-2 bg-gradient-to-tr from-[#5B9A3C] via-[#8CC63F] to-[#5B9A3C] shadow-[0_15px_40px_rgba(30,61,42,0.22)] aspect-square group">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
                    <img
                      src={globeImg}
                      alt="Glass Earth Globe Resting on Moss in Sunlight"
                      className="w-full h-full object-cover rounded-full aspect-square transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Center Intersecting Junction Leaf Badge */}
                <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-[#5B9A3C] shadow-lg flex items-center justify-center text-[#5B9A3C]">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B9A3C] fill-[#8CC63F]/30" />
                </div>

              </div>

              {/* Underneath Calligraphic Script: "Better Chemistry FOR A BRIGHTER FUTURE" */}
              <div className="mt-5 text-center flex flex-col items-center">
                <span className="font-serif italic text-2xl sm:text-3xl text-[#4E8A32] tracking-tight">
                  Better Chemistry
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#1E3D2A]/60 font-semibold uppercase mt-0.5">
                  FOR A BRIGHTER FUTURE
                </span>
              </div>
            </ScaleReveal>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: OUR VISION (span 4 cols)
          ===================================================================== */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <FadeInRight className="w-full">
            
            {/* Highlighted Vision Pill Badge with Icon directly adjacent */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#143823] to-[#1E4D35] text-white border border-[#8CC63F]/40 shadow-lg shadow-[#143823]/20 mb-4 group hover:scale-[1.02] transition-all">
              <div className="w-8 h-8 rounded-full bg-[#8CC63F]/20 text-[#8CC63F] flex items-center justify-center ring-2 ring-[#8CC63F]/40 shrink-0">
                <Eye className="w-4 h-4 text-[#8CC63F]" />
              </div>
              <div className="flex items-center gap-2 pr-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8CC63F]">
                  OUR VISION
                </span>
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3D2A] leading-tight">
              Global Leadership <br />
              <span className="italic font-serif text-[#4E8A32]">in Nicotine Innovation.</span>
            </h3>

            {/* Paragraph */}
            <p className="text-xs sm:text-[13px] text-[#1E3D2A]/80 mt-3 leading-relaxed font-light">
              Become a globally trusted leader in nicotine manufacturing, recognised for precision engineering, technological innovation, and responsible manufacturing practices.
            </p>

            {/* 3 Pillar Micro Badges (Innovation, Global Reach, Trust) */}
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-[#1E3D2A]/10 w-full">
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EAF3E5] flex items-center justify-center text-[#2D5A3C] shrink-0">
                  <Lightbulb className="w-3.5 h-3.5 text-[#5B9A3C]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#1E3D2A] leading-tight">Innovation</span>
                  <span className="text-[9px] font-mono text-[#1E3D2A]/60">for Better Solutions</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EAF3E5] flex items-center justify-center text-[#2D5A3C] shrink-0">
                  <Globe2 className="w-3.5 h-3.5 text-[#5B9A3C]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#1E3D2A] leading-tight">Global Reach</span>
                  <span className="text-[9px] font-mono text-[#1E3D2A]/60">for Greater Impact</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EAF3E5] flex items-center justify-center text-[#2D5A3C] shrink-0">
                  <Handshake className="w-3.5 h-3.5 text-[#5B9A3C]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#1E3D2A] leading-tight">Trust</span>
                  <span className="text-[9px] font-mono text-[#1E3D2A]/60">in Every Partnership</span>
                </div>
              </div>

            </div>
            </FadeInRight>

          </div>

        </div>

      </div>
    </section>
  );
};
