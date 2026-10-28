import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Globe2,
  FileText,
  Package,
  Truck,
  FlaskConical,
  Atom,
  Handshake,
  Compass,
  Plus,
  Minus,
  FileDown,
  Clock,
  Award,
  CheckCircle2,
  Anchor,
  Plane,
  Ship,
  Sparkles
} from 'lucide-react';

import realFactoryImg from '../assets/images/real-factory-exterior.jpg';
import cargoShipImg from '../assets/images/export-maritime-air-cargo.jpg';
import portSunsetImg from '../assets/images/export-port-sunset.jpg';
import handshakeGlobalImg from '../assets/images/export-handshake-global.jpg';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { FadeInLeft, FadeInRight, FadeInUp, StaggerContainer, StaggerItem } from '../components/common/animations';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What are the major export markets for Okhai Pharma?',
    a: 'We regularly export our pharmaceutical intermediates and specialty chemicals to North America (USA & Canada), European Union nations (Germany, France, Italy, Poland), the United Kingdom, Japan, South Korea, the Middle East (UAE, Saudi Arabia), and key Southeast Asian chemical manufacturing hubs.'
  },
  {
    q: 'Which documents are required for export?',
    a: 'Every export consignment is accompanied by a full regulatory dossier: Lot-specific Certificate of Analysis (CoA) with HPLC/GC assays, Safety Data Sheet (SDS/MSDS compliant with GHS), Commercial Invoice, Packing List, Certificate of Origin (COO), and UN-certified Dangerous Goods Declaration (DGD).'
  },
  {
    q: 'How long does the export process take?',
    a: 'Standard dispatch lead times are 7 to 14 business days from order confirmation and regulatory verification. Ocean freight from Mundra / Kandla ports to European and North American ports typically takes 18 to 28 days, while air freight via Ahmedabad Air Cargo arrives in 3 to 5 business days.'
  },
  {
    q: 'Do you provide support for regulatory requirements in other countries?',
    a: 'Yes. Our dedicated regulatory affairs desk provides technical support including DMF (Drug Master File) documentation, heavy metal impurity profiles, residual solvent limits, and compliance declarations tailored to destination country pharmacopeias (USP, EP, IP).'
  },
  {
    q: 'What are the packaging options for international shipments?',
    a: 'We supply our products in UN-certified 200-liter fluorinated HDPE drums, lacquered steel drums, or ISO-standard chemical containers. All drums are sealed under high-purity inert dry nitrogen blankets, palletized on ISPM-15 heat-treated fumigated pallets, and reinforced with tamper-evident security banding.'
  }
];

export const Export: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeMarket, setActiveMarket] = useState<string>('all');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF8] text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">

      {/* =========================================================================
          1. HERO SECTION: "Global Export Readiness. Directly from Gujarat."
      ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E6]">
        {/* Ambient Radial Lights */}
        <div className="absolute top-0 right-1/4 w-[650px] h-[450px] bg-[#8CC63F]/12 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[550px] h-[380px] bg-[#5B9A3C]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Decorative Floating Leaves */}
        <div className="absolute top-16 left-6 sm:left-12 w-20 sm:w-28 h-20 sm:h-28 pointer-events-none select-none opacity-85 animate-float-slow">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
            <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" fill="#6EA446" fillOpacity="0.8" stroke="#2D5A3C" strokeWidth="1.2" />
            <path d="M15,85 Q50,45 85,15" stroke="#8CC63F" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Description, 3 Metrics, Buttons */}
            <FadeInLeft className="lg:col-span-5">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                  International Logistics
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#1E3D2A] leading-[1.08] tracking-tight">
                Global Export
                <br />
                Readiness.
                <br />
                <span className="italic font-normal text-[#5B9A3C] font-editorial block mt-1">
                  Directly from Gujarat.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-[15px] text-[#1E3D2A]/80 leading-relaxed font-light max-w-lg">
                Strategically located in Gujarat, Okhai Pharma supports international trade through reliable logistics infrastructure and carefully coordinated export operations.
              </p>

              {/* 3 Metrics Row */}
              <div className="mt-7 flex flex-wrap items-center gap-5 sm:gap-6 pt-5 border-t border-[#1E3D2A]/10">
                {/* Metric 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] shrink-0">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-serif font-bold text-[#1E3D2A] block leading-tight">50+</span>
                    <span className="text-[11px] text-[#1E3D2A]/70 leading-tight">Countries Supplied</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-serif font-bold text-[#1E3D2A] block leading-tight">99%</span>
                    <span className="text-[11px] text-[#1E3D2A]/70 leading-tight">On-Time Dispatch</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-serif font-bold text-[#1E3D2A] block leading-tight">Trusted</span>
                    <span className="text-[11px] text-[#1E3D2A]/70 leading-tight">Global Partnerships</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#trade-routes"
                  className="px-6 py-3 rounded-full bg-[#183424] text-white text-xs font-semibold hover:bg-[#234B34] shadow-md shadow-[#183424]/15 hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Export Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8CC63F] group-hover:translate-x-0.5 transition-transform" />
                </a>

                <Link
                  to="/downloads"
                  className="px-5 py-3 rounded-full bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] text-xs font-semibold hover:border-[#5B9A3C] hover:text-[#5B9A3C] shadow-xs hover:shadow transition-all flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4 text-[#5B9A3C]" />
                  <span>Download Brochure</span>
                </Link>
              </div>
            </FadeInLeft>

            {/* Right Column: Composite World Map Background with Real Factory Foreground */}
            <FadeInRight className="lg:col-span-7 relative">
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xl p-4 sm:p-6 pb-2">
                
                {/* Upper Half: Vector World Map with Radiating Export Trajectories */}
                <div className="relative h-44 sm:h-52 w-full">
                  <svg viewBox="0 0 800 360" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="exportHeroDots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.1" fill="#5B9A3C" fillOpacity="0.16" />
                      </pattern>
                      <linearGradient id="routeHeroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.45" />
                      </linearGradient>
                    </defs>

                    <rect width="800" height="360" fill="url(#exportHeroDots)" />

                    {/* Continents Silhouettes */}
                    <path d="M 80,40 Q 160,20 220,60 Q 230,130 180,160 Q 120,170 70,120 Z" fill="#E6EEDF" fillOpacity="0.8" />
                    <path d="M 180,180 Q 240,200 210,290 Q 160,330 140,260 Z" fill="#E6EEDF" fillOpacity="0.6" />
                    <path d="M 370,50 Q 460,40 480,100 Q 420,130 360,100 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 380,130 Q 480,140 460,240 Q 410,320 370,230 Z" fill="#E6EEDF" fillOpacity="0.6" />
                    <path d="M 480,40 Q 660,30 710,130 Q 640,220 520,160 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 640,230 Q 720,220 740,290 Q 670,320 630,280 Z" fill="#E6EEDF" fillOpacity="0.6" />

                    {/* Radiating Green Trajectories from Gujarat (530, 160) */}
                    <path d="M 530,160 Q 440,75 380,85" stroke="url(#routeHeroGrad)" strokeWidth="1.8" strokeDasharray="4 4" />
                    <path d="M 530,160 Q 320,35 170,80" stroke="url(#routeHeroGrad)" strokeWidth="1.8" strokeDasharray="5 5" />
                    <path d="M 530,160 Q 460,165 430,195" stroke="url(#routeHeroGrad)" strokeWidth="1.5" />
                    <path d="M 530,160 Q 610,110 680,115" stroke="url(#routeHeroGrad)" strokeWidth="1.8" strokeDasharray="4 4" />
                    <path d="M 530,160 Q 600,220 660,260" stroke="url(#routeHeroGrad)" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Pulsing Origin Marker on Gujarat */}
                    <circle cx="530" cy="160" r="16" fill="#8CC63F" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="530" cy="160" r="7" fill="#5B9A3C" />
                    <circle cx="530" cy="160" r="3" fill="#FFFFFF" />

                    {/* Destination Pill Overlays */}
                    <g transform="translate(140, 45)">
                      <rect x="0" y="0" width="105" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">North America</text>
                    </g>

                    <g transform="translate(370, 55)">
                      <rect x="0" y="0" width="70" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Europe</text>
                    </g>

                    <g transform="translate(410, 160)">
                      <rect x="0" y="0" width="85" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Middle East</text>
                    </g>

                    <g transform="translate(635, 75)">
                      <rect x="0" y="0" width="125" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Japan &amp; East Asia</text>
                    </g>

                    <g transform="translate(640, 220)">
                      <rect x="0" y="0" width="105" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Southeast Asia</text>
                    </g>

                    {/* Gujarat Origin Label */}
                    <g transform="translate(485, 175)">
                      <rect x="0" y="0" width="90" height="22" rx="11" fill="#183424" />
                      <text x="45" y="15" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fill="#8CC63F" textAnchor="middle">Gujarat, India</text>
                    </g>
                  </svg>

                  {/* Top Right Floating Card: Global Reach */}
                  <div className="absolute top-2 right-2 px-3 py-1.5 rounded-2xl bg-white/95 border border-[#5B9A3C]/25 shadow-md flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C]">
                      <Globe2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-serif font-bold text-[#1E3D2A] block leading-tight">Global Reach</span>
                      <span className="text-[9px] font-mono text-[#5B9A3C] block leading-tight">From Gujarat to the World</span>
                    </div>
                  </div>
                </div>

                {/* Lower Foreground: Real Factory Facility Photo */}
                <div className="relative rounded-2xl overflow-hidden border border-[#5B9A3C]/25 shadow-xl aspect-[16/8.5] group mt-1">
                  <img
                    src={realFactoryImg}
                    alt="Okhai Pharma Facility in Gujarat, India"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-[#1E3D2A] text-[11px] font-semibold shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-pulse" />
                    <span>State-of-the-Art Formulation &amp; Export Facility</span>
                  </div>
                </div>

              </div>
            </FadeInRight>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. DARK EMERALD CAPABILITIES SECTION ("Delivering Excellence Across the Globe")
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#0D2418] via-[#122A1E] to-[#0A1A11] text-white overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-1/3 w-[500px] h-[350px] bg-[#5B9A3C]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-[#8CC63F]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4 text-[#8CC63F]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#8CC63F]">
                  Our Export Capabilities
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white leading-tight">
                Delivering Excellence
                <br />
                Across the Globe
              </h2>
              <p className="mt-3.5 text-sm sm:text-[15px] text-white/70 leading-relaxed font-light">
                We export high-quality pharmaceutical intermediates and chemicals to global markets with a focus on compliance, consistency and long-term partnerships.
              </p>
            </div>

            {/* 5 Capability Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Card 1: API & Intermediates */}
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 p-5 text-center flex flex-col items-center justify-between group hover:border-[#8CC63F]/50 hover:bg-white/[0.09] transition-all duration-300">
                <div className="w-12 h-12 rounded-full border border-[#8CC63F]/40 bg-white/5 flex items-center justify-center text-[#8CC63F] mb-4 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-inner">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white mb-2 leading-snug">
                    API &amp; Intermediates
                  </h4>
                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    Wide range of pharmaceutical intermediates
                  </p>
                </div>
              </div>

              {/* Card 2: Specialty Chemicals */}
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 p-5 text-center flex flex-col items-center justify-between group hover:border-[#8CC63F]/50 hover:bg-white/[0.09] transition-all duration-300">
                <div className="w-12 h-12 rounded-full border border-[#8CC63F]/40 bg-white/5 flex items-center justify-center text-[#8CC63F] mb-4 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-inner">
                  <Atom className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white mb-2 leading-snug">
                    Specialty Chemicals
                  </h4>
                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    High-purity chemical solutions for global industries
                  </p>
                </div>
              </div>

              {/* Card 3: Regulatory Compliance */}
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 p-5 text-center flex flex-col items-center justify-between group hover:border-[#8CC63F]/50 hover:bg-white/[0.09] transition-all duration-300">
                <div className="w-12 h-12 rounded-full border border-[#8CC63F]/40 bg-white/5 flex items-center justify-center text-[#8CC63F] mb-4 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white mb-2 leading-snug">
                    Regulatory Compliance
                  </h4>
                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    Meeting international quality and regulatory standards
                  </p>
                </div>
              </div>

              {/* Card 4: Global Distribution */}
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 p-5 text-center flex flex-col items-center justify-between group hover:border-[#8CC63F]/50 hover:bg-white/[0.09] transition-all duration-300">
                <div className="w-12 h-12 rounded-full border border-[#8CC63F]/40 bg-white/5 flex items-center justify-center text-[#8CC63F] mb-4 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-inner">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white mb-2 leading-snug">
                    Global Distribution
                  </h4>
                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    Reliable supply chain across continents
                  </p>
                </div>
              </div>

              {/* Card 5: Reliable Partnerships */}
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 p-5 text-center flex flex-col items-center justify-between group hover:border-[#8CC63F]/50 hover:bg-white/[0.09] transition-all duration-300">
                <div className="w-12 h-12 rounded-full border border-[#8CC63F]/40 bg-white/5 flex items-center justify-center text-[#8CC63F] mb-4 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-inner">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white mb-2 leading-snug">
                    Reliable Partnerships
                  </h4>
                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    Building long-term relationships with our global clients
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          3. EXPORT PROCESS ("From Our Facility to Your Destination")
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E6] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Top Row: Heading on Left & Cargo Ship Photo on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
              
              {/* Left Column: Heading, Subtitle, CTA Button */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Export Process
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  From Our Facility
                  <br />
                  to Your Destination
                </h2>

                <p className="mt-4 text-sm text-[#1E3D2A]/75 font-light leading-relaxed max-w-md">
                  A well-structured export process ensures safe, compliant and timely delivery of our products worldwide.
                </p>

                <div className="mt-6">
                  <a
                    href="#process-steps"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183424] text-white text-xs font-semibold hover:bg-[#234B34] shadow-sm hover:shadow transition-all group cursor-pointer"
                  >
                    <span>Our Export Process</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8CC63F] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Column: Cargo Ship & Airplane Image */}
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#5B9A3C]/25 shadow-2xl aspect-[16/8.5] group">
                  <img
                    src={cargoShipImg}
                    alt="International Maritime Ocean Vessel and Air Cargo Transport"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-[#1E3D2A] text-xs font-semibold shadow-md">
                    <Ship className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Mundra &amp; Kandla Seaports · Ahmedabad Air Freight</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: 4 Process Steps in Single Unified White Box */}
            <div id="process-steps" className="rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-sm p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center p-2 group relative">
                  <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:bg-[#183424] group-hover:text-white transition-all shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1E3D2A]">
                    1. Order Confirmation
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 font-light mt-1 max-w-[210px] leading-relaxed">
                    We receive and verify your requirements.
                  </p>
                  
                  {/* Arrow to Next Step (Desktop) */}
                  <div className="hidden lg:flex absolute top-6 -right-3 text-[#1E3D2A]/25 pointer-events-none">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center p-2 group relative">
                  <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:bg-[#183424] group-hover:text-white transition-all shadow-xs">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1E3D2A]">
                    2. Quality &amp; Documentation
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 font-light mt-1 max-w-[210px] leading-relaxed">
                    Product batch testing and export documentation.
                  </p>

                  {/* Arrow to Next Step (Desktop) */}
                  <div className="hidden lg:flex absolute top-6 -right-3 text-[#1E3D2A]/25 pointer-events-none">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center p-2 group relative">
                  <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:bg-[#183424] group-hover:text-white transition-all shadow-xs">
                    <Package className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1E3D2A]">
                    3. Secure Packaging &amp; Dispatch
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 font-light mt-1 max-w-[210px] leading-relaxed">
                    Shipment prepared as per international standards.
                  </p>

                  {/* Arrow to Next Step (Desktop) */}
                  <div className="hidden lg:flex absolute top-6 -right-3 text-[#1E3D2A]/25 pointer-events-none">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center p-2 group">
                  <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] mb-3 group-hover:bg-[#183424] group-hover:text-white transition-all shadow-xs">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1E3D2A]">
                    4. On-Time Delivery
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 font-light mt-1 max-w-[210px] leading-relaxed">
                    Safe and timely delivery to global destinations.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          4. CONNECTED TO GLOBAL MARKETS (Trade Routes, Port Sunset & Interactive Map)
      ========================================================================= */}
      <RevealOnScroll>
        <section id="trade-routes" className="relative py-16 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Heading, Subtitle, Button, Sunset Port Card */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Major International Trade Routes
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Connected to
                  <br />
                  Global Markets
                </h2>

                <p className="mt-4 text-sm text-[#1E3D2A]/75 font-light leading-relaxed">
                  Our export network reaches key regions across the world, supported by strong logistics and efficient trade routes.
                </p>

                {/* Explore Destinations Button */}
                <div className="mt-6">
                  <a
                    href="#world-map-view"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#183424] text-white text-xs font-semibold hover:bg-[#234B34] shadow-sm hover:shadow transition-all group cursor-pointer"
                  >
                    <span>Explore Export Destinations</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8CC63F] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* Seaport Terminal Photo at Golden Hour Sunset with Floating Badge */}
                <div className="mt-8 relative rounded-2xl overflow-hidden border border-[#5B9A3C]/20 shadow-lg aspect-[16/9.5] group">
                  <img
                    src={portSunsetImg}
                    alt="International Container Seaport Hub in Gujarat"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Location Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#5B9A3C]/20 flex items-center gap-2.5 shadow-md">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1E3D2A] block leading-tight">Strategic Location</span>
                      <span className="text-[10px] text-[#1E3D2A]/70 block leading-tight font-mono">Gujarat, India · Connecting Global Markets</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: World Map Graphic + 4 Bottom Stats Bar */}
              <div id="world-map-view" className="lg:col-span-7 flex flex-col gap-4">
                
                {/* World Map Container */}
                <div className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md border border-[#5B9A3C]/20 shadow-md p-4 sm:p-6">
                  <svg viewBox="0 0 820 440" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="routesDotGrid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.2" fill="#5B9A3C" fillOpacity="0.14" />
                      </pattern>
                      <linearGradient id="routeArcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    <rect width="820" height="440" fill="url(#routesDotGrid)" />

                    {/* Continent Outlines */}
                    <path d="M 90,60 Q 180,40 240,80 Q 250,160 190,190 Q 130,200 80,140 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 200,230 Q 260,250 230,350 Q 170,390 150,320 Z" fill="#E6EEDF" fillOpacity="0.65" />
                    <path d="M 400,70 Q 500,60 520,120 Q 450,160 390,130 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 410,160 Q 510,170 490,280 Q 430,370 390,270 Z" fill="#E6EEDF" fillOpacity="0.65" />
                    <path d="M 520,60 Q 720,50 770,160 Q 690,260 560,190 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 690,290 Q 780,280 800,360 Q 720,400 680,350 Z" fill="#E6EEDF" fillOpacity="0.65" />

                    {/* Trade Arcs Originating from Gujarat (550, 195) */}
                    <path d="M 550,195 Q 460,90 410,100" stroke="url(#routeArcGlow)" strokeWidth="1.8" strokeDasharray="5 5" />
                    <path d="M 550,195 Q 340,50 170,105" stroke="url(#routeArcGlow)" strokeWidth="1.8" strokeDasharray="6 6" />
                    <path d="M 550,195 Q 300,220 200,280" stroke="url(#routeArcGlow)" strokeWidth="1.6" strokeDasharray="5 5" />
                    <path d="M 550,195 Q 480,205 450,235" stroke="url(#routeArcGlow)" strokeWidth="1.6" />
                    <path d="M 550,195 Q 460,280 430,310" stroke="url(#routeArcGlow)" strokeWidth="1.6" strokeDasharray="5 5" />
                    <path d="M 550,195 Q 650,130 720,150" stroke="url(#routeArcGlow)" strokeWidth="1.8" strokeDasharray="5 5" />
                    <path d="M 550,195 Q 640,275 700,320" stroke="url(#routeArcGlow)" strokeWidth="1.6" strokeDasharray="5 5" />

                    {/* Pulsing Origin Marker on Gujarat */}
                    <circle cx="550" cy="195" r="16" fill="#8CC63F" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="550" cy="195" r="7" fill="#5B9A3C" />
                    <circle cx="550" cy="195" r="3" fill="#FFFFFF" />

                    {/* Origin Badge */}
                    <g transform="translate(505, 215)">
                      <rect x="0" y="0" width="90" height="22" rx="11" fill="#183424" />
                      <text x="45" y="15" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fill="#8CC63F" textAnchor="middle">Gujarat, India</text>
                    </g>

                    {/* Destination Pill Markers */}
                    <g transform="translate(130, 85)">
                      <rect x="0" y="0" width="105" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">North America</text>
                    </g>

                    <g transform="translate(150, 290)">
                      <rect x="0" y="0" width="105" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">South America</text>
                    </g>

                    <g transform="translate(370, 85)">
                      <rect x="0" y="0" width="70" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Europe</text>
                    </g>

                    <g transform="translate(425, 205)">
                      <rect x="0" y="0" width="85" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Middle East</text>
                    </g>

                    <g transform="translate(410, 290)">
                      <rect x="0" y="0" width="65" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Africa</text>
                    </g>

                    <g transform="translate(680, 115)">
                      <rect x="0" y="0" width="125" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Japan &amp; East Asia</text>
                    </g>

                    <g transform="translate(675, 275)">
                      <rect x="0" y="0" width="105" height="22" rx="11" fill="white" stroke="#1E3D2A" strokeOpacity="0.15" />
                      <circle cx="12" cy="11" r="3.5" fill="#5B9A3C" />
                      <text x="22" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1E3D2A">Southeast Asia</text>
                    </g>
                  </svg>
                </div>

                {/* 4 Bottom Stats Bar */}
                <div className="rounded-2xl bg-white border border-[#1E3D2A]/10 p-4 sm:p-5 shadow-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Stat 1 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                        <Globe2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-serif font-bold text-[#1E3D2A] block leading-tight">50+</span>
                        <span className="text-[10px] text-[#1E3D2A]/65 block leading-tight">Countries Supplied</span>
                      </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-serif font-bold text-[#1E3D2A] block leading-tight">6+</span>
                        <span className="text-[10px] text-[#1E3D2A]/65 block leading-tight">Global Regions</span>
                      </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-serif font-bold text-[#1E3D2A] block leading-tight">1000+</span>
                        <span className="text-[10px] text-[#1E3D2A]/65 block leading-tight">Tons Exported</span>
                      </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                        <Handshake className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-serif font-bold text-[#1E3D2A] block leading-tight">Trusted</span>
                        <span className="text-[10px] text-[#1E3D2A]/65 block leading-tight">By International Clients</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          5. FAQ SECTION ("Your Questions, Answered")
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E5] overflow-hidden">
          {/* Decorative Corner Foliage */}
          <div className="absolute top-10 left-6 w-24 h-24 pointer-events-none select-none opacity-40">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
              <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" fill="#6EA446" fillOpacity="0.4" stroke="#2D5A3C" strokeWidth="1" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Export &amp; Logistics FAQ
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Your Questions,
                  <br />
                  Answered
                </h2>

                <p className="mt-4 text-sm text-[#1E3D2A]/75 font-light leading-relaxed max-w-md">
                  Find quick answers to common queries about our export process, documentation, logistics and more.
                </p>

                {/* Botanical Corner Flourish */}
                <div className="mt-8 w-20 h-20 pointer-events-none select-none opacity-80">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
                    <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.85" stroke="#2D5A3C" strokeWidth="1" />
                    <path d="M10,90 Q50,45 90,10" stroke="#8CC63F" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Right Column: 5 FAQ Accordion Items */}
              <div className="lg:col-span-7 space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs hover:border-[#5B9A3C]/40 transition-all overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] leading-snug">
                          {faq.q}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1E3D2A]/75 font-light leading-relaxed border-t border-[#1E3D2A]/5 animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          6. BOTTOM CTA BANNER: "Let's Build Global Partnerships"
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-24 bg-gradient-to-r from-[#07160E] via-[#0E2419] to-[#081810] text-white overflow-hidden">
          {/* Overlaid Image with Gradient Mask */}
          <div className="absolute inset-0 opacity-30 mix-blend-luminosity pointer-events-none">
            <img
              src={handshakeGlobalImg}
              alt="Global Corporate Partnerships"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07160E] via-[#0E2419]/90 to-[#081810]/85 pointer-events-none" />

          {/* Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#5B9A3C]/18 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading, Subtitle & Action Buttons */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#8CC63F]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#8CC63F]">
                    Ready to Export?
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-medium text-white leading-tight">
                  Let's Build
                  <br />
                  Global <span className="italic font-normal text-[#8CC63F] font-editorial">Partnerships</span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-lg">
                  Partner with Okhai Pharma for reliable, high-quality and compliant export solutions.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Link
                    to="/contact"
                    className="px-7 py-3.5 rounded-full bg-[#5B9A3C] hover:bg-[#4E8532] text-white text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    to="/downloads"
                    className="px-6 py-3.5 rounded-full bg-white text-[#1E3D2A] text-xs font-semibold tracking-wide hover:bg-[#FAFBF8] transition-all shadow-xs flex items-center gap-2"
                  >
                    <FileDown className="w-4 h-4 text-[#5B9A3C]" />
                    <span>Download Brochure</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: 3 Floating White Pill Cards */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                
                {/* Card 1 */}
                <div className="p-4 rounded-2xl bg-white shadow-lg flex items-center gap-3.5 border border-white/20 transition-transform hover:scale-102">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1E3D2A] leading-tight">Quality Products</h5>
                    <p className="text-[11px] text-[#1E3D2A]/70 leading-tight mt-0.5">Consistent supply</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-4 rounded-2xl bg-white shadow-lg flex items-center gap-3.5 border border-white/20 transition-transform hover:scale-102">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1E3D2A] leading-tight">Global Markets</h5>
                    <p className="text-[11px] text-[#1E3D2A]/70 leading-tight mt-0.5">Wide network</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-4 rounded-2xl bg-white shadow-lg flex items-center gap-3.5 border border-white/20 transition-transform hover:scale-102">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1E3D2A] leading-tight">Long-Term Partnerships</h5>
                    <p className="text-[11px] text-[#1E3D2A]/70 leading-tight mt-0.5">Mutual growth</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </RevealOnScroll>

    </div>
  );
};
