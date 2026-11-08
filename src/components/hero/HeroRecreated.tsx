import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileDown,
  ShieldCheck
} from 'lucide-react';
import factoryBg from '../../assets/images/factory-bg.jpg';

export const HeroRecreated: React.FC = () => {
  return (
    <section
      className="relative w-full h-screen min-h-[580px] max-h-[1080px] flex flex-col justify-between overflow-hidden text-white selection:bg-[#8CC63F]/30 selection:text-white"
    >
      {/* =========================================================================
          1. BACKGROUND LAYER: REAL FACTORY PHOTOGRAPH
          Positioned with object-[84%_center] so the building facade, blue sky,
          and "Okhai Pharma Intermediates Pvt. Ltd." logo sit clearly on the RIGHT,
          with ZERO overlap behind the text on the LEFT!
      ========================================================================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          src={factoryBg}
          alt="Okhai Pharma Manufacturing Facility, Gujarat"
          className="w-full h-full object-cover object-[88%_center] sm:object-[84%_center] lg:object-[82%_center] filter brightness-[1.0] contrast-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Soft, Directional Left-Side Gradient Scrim ONLY on the text half:
            Guarantees typography is 100% razor-sharp and legible,
            while leaving the entire right-half facility building, roof, and Okhai Pharma logo
            100% clear, bright, sunny, and unobstructed! */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-[48%] bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          2. MAIN CONTENT AREA: CENTERED, STREAMLINED & PROPERLY VISIBLE
      ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20 lg:pt-24 pb-2">
        {/* Left Content Column */}
        <div className="max-w-xl lg:max-w-2xl flex flex-col justify-center text-left">
          
          {/* 1. Live Plant Status Badge (Eyebrow reveals first) */}
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#8CC63F]/40 shadow-lg text-xs font-mono font-medium text-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC63F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CC63F]" />
              </span>
              <span>Live Extraction Plant · Gujarat, India</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-white/80 px-2.5 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8CC63F]" />
              <span>WHO-GMP Principles · ISO 9001:2015</span>
            </div>
          </div>

          {/* 2. Main Hero Headline (Reveals smoothly with editorial poise) */}
          <h1 className="text-[clamp(2.2rem,4vw,3.75rem)] font-serif font-medium tracking-tight text-white leading-[1.08] text-balance drop-shadow-md animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 fill-mode-both">
            Pure Nicotine.{' '}
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8CC63F] via-emerald-300 to-teal-200 pr-1">
              Precisely
            </span>{' '}
            Engineered.
          </h1>

          {/* 3. Subtitle (Reveals after headline) */}
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed font-light drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300 fill-mode-both">
            Leading manufacturer, bulk exporter, and technical supplier of{' '}
            <strong className="font-semibold text-emerald-300">Nicotine Sulfate 40%</strong> and{' '}
            <strong className="font-semibold text-emerald-300">Nicotine Alkaloid 90% / 95%</strong> from Gujarat, India. Engineered for high-standard pharmaceutical intermediates, academic research, and accredited global chemical synthesis.
          </p>

          {/* 4. Action Buttons (Staggered entrance) */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-450 fill-mode-both">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8CC63F] to-[#5B9A3C] text-[#05140B] font-semibold text-xs sm:text-sm hover:brightness-110 transition-all duration-300 shadow-xl shadow-[#8CC63F]/25 hover:shadow-[#8CC63F]/40 hover:-translate-y-0.5 flex items-center gap-2 group animate-shimmer"
            >
              <span>Request Commercial Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/downloads"
              className="px-5 py-3 rounded-xl bg-black/40 hover:bg-black/60 text-white font-medium text-xs sm:text-sm border border-white/25 hover:border-emerald-400/50 backdrop-blur-md transition-all duration-300 flex items-center gap-2 group"
            >
              <FileDown className="w-4 h-4 text-[#8CC63F] transition-transform group-hover:-translate-y-0.5" />
              <span>Download Brochure &amp; COA</span>
            </Link>
          </div>

          {/* 5. Sleek Metric Cards (Staggered sequence) */}
          <div className="mt-5 sm:mt-6 pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-700 delay-600 fill-mode-both">
            <div className="p-2 sm:p-2.5 rounded-xl bg-black/45 border border-white/15 backdrop-blur-md hover:border-[#8CC63F]/40 transition-colors">
              <span className="font-mono text-base sm:text-lg font-bold text-white block">40.0%</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/80 mt-0.5 block font-mono">Nicotine Sulfate</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-black/45 border border-white/15 backdrop-blur-md hover:border-[#8CC63F]/40 transition-colors">
              <span className="font-mono text-base sm:text-lg font-bold text-white block">90 / 95%</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/80 mt-0.5 block font-mono">Pure Alkaloids</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-black/45 border border-white/15 backdrop-blur-md hover:border-[#8CC63F]/40 transition-colors">
              <span className="font-mono text-base sm:text-lg font-bold text-[#8CC63F] block">HPLC &amp; GC</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/80 mt-0.5 block font-mono">Lot Tested</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-black/45 border border-white/15 backdrop-blur-md hover:border-[#8CC63F]/40 transition-colors">
              <span className="font-mono text-base sm:text-lg font-bold text-white block">25+ Ports</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/80 mt-0.5 block font-mono">Global Dispatch</span>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. INTEGRATED BOTTOM MARQUEE VELOCITY STRIP (FITS WITHIN 100vh)
      ========================================================================= */}
      <div className="relative z-20 w-full h-9 sm:h-10 bg-black/75 backdrop-blur-md border-t border-white/15 overflow-hidden flex items-center select-none shrink-0">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] sm:text-xs font-mono tracking-widest text-white/90 font-medium uppercase">
          <span>Nicotine Sulfate 40%</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>Nicotine Alkaloid 90% / 95%</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>Made in Gujarat, India</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>Export Ready Packaging</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>HPLC &amp; GC Tested Every Batch</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>CAS 65-30-5 &amp; CAS 54-11-5</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>WHO-GMP Principles</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>Nicotine Sulfate 40%</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>Nicotine Alkaloid 90% / 95%</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>Made in Gujarat, India</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>Export Ready Packaging</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>HPLC &amp; GC Tested Every Batch</span>
          <span className="text-[#8CC63F]">✦</span>
          <span>CAS 65-30-5 &amp; CAS 54-11-5</span>
          <span className="text-[#8CC63F]">✦</span>
        </div>
      </div>
    </section>
  );
};
