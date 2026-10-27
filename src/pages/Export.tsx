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
  CheckCircle2,
  FlaskConical,
  Atom,
  Handshake,
  Compass,
  ChevronDown,
  Plus,
  Minus,
  FileDown,
  Anchor,
  Plane,
  Ship,
  Sparkles,
  Mouse
} from 'lucide-react';

import heroFacilityImg from '../assets/images/about-hero-facility.jpg';
import realFactoryImg from '../assets/images/real-factory-exterior.jpg';
import cargoShipImg from '../assets/images/export-maritime-air-cargo.jpg';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { FadeInLeft, FadeInRight, FadeInUp, StaggerContainer, StaggerItem } from '../components/common/animations';
import { COMPANY_DETAILS } from '../data/companyData';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What are the major export markets for Okhai Pharma?',
    a: 'We regularly export our pharmaceutical intermediates and specialty chemicals to North America (USA & Canada), European Union nations (Germany, France, Italy, Poland), the United Kingdom, Japan, South Korea, the Middle East (UAE, Saudi Arabia), and key Southeast Asian chemical hubs.'
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
    a: 'Yes. Our dedicated regulatory affairs desk provides technical support including DMF (Drug Master File) documentation, heavy metal impurity profiles, residual solvent limits, and compliance declarations tailored to destination country pharmacopeia (USP, EP, IP).'
  },
  {
    q: 'What are the packaging options for international shipments?',
    a: 'We supply our products in UN-certified 200-liter fluorinated HDPE drums, lacquered steel drums, or ISO-standard chemical containers. All drums are sealed under high-purity inert dry nitrogen blankets, palletized on ISPM-15 heat-treated fumigated pallets, and reinforced with tamper-evident security banding.'
  }
];

interface Destination {
  id: string;
  name: string;
  ports: string;
  transitTime: string;
  x: number; // SVG coordinate %
  y: number; // SVG coordinate %
}

const DESTINATIONS: Destination[] = [
  {
    id: 'usa',
    name: 'North America (USA)',
    ports: 'New York, Los Angeles, Savannah',
    transitTime: '22-26 Days Ocean / 3 Days Air',
    x: 18,
    y: 35
  },
  {
    id: 'eu',
    name: 'Europe (EU)',
    ports: 'Rotterdam, Antwerp, Hamburg',
    transitTime: '18-22 Days Ocean / 2 Days Air',
    x: 48,
    y: 28
  },
  {
    id: 'me',
    name: 'Middle East',
    ports: 'Jebel Ali, Dammam, Doha',
    transitTime: '4-7 Days Ocean / 1 Day Air',
    x: 58,
    y: 44
  },
  {
    id: 'japan',
    name: 'Japan & East Asia',
    ports: 'Yokohama, Busan, Shanghai',
    transitTime: '14-18 Days Ocean / 2 Days Air',
    x: 82,
    y: 36
  },
  {
    id: 'sea',
    name: 'Southeast Asia',
    ports: 'Singapore, Port Klang, Bangkok',
    transitTime: '8-12 Days Ocean / 1-2 Days Air',
    x: 75,
    y: 62
  }
];

export const Export: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDest, setActiveDest] = useState<Destination | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF8] text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">

      {/* =========================================================================
          1. HERO SECTION: "Global export readiness. Directly from Gujarat."
      ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E6]">
        
        {/* Ambient Radial Lights */}
        <div className="absolute top-0 right-1/4 w-[650px] h-[450px] bg-[#8CC63F]/12 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[550px] h-[380px] bg-[#5B9A3C]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Decorative Floating Leaves on Edges */}
        <div className="absolute top-16 left-6 sm:left-12 w-20 sm:w-28 h-20 sm:h-28 pointer-events-none select-none opacity-85 animate-float-slow">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
            <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" fill="#6EA446" fillOpacity="0.8" stroke="#2D5A3C" strokeWidth="1.2" />
            <path d="M15,85 Q50,45 85,15" stroke="#8CC63F" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Eyebrow, Main Heading, Subtitle, Pill Badge, Cursive Text */}
            <FadeInLeft className="lg:col-span-5">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                  International Logistics
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-medium text-[#1E3D2A] leading-[1.12] tracking-tight">
                Global export
                <br />
                readiness.
                <br />
                <span className="italic font-normal text-[#5B9A3C] font-editorial">Directly from Gujarat.</span>
              </h1>

              {/* Description */}
              <p className="mt-5 text-sm sm:text-[15px] text-[#1E3D2A]/80 leading-relaxed font-light max-w-lg">
                Strategically connected from Gujarat, India, Okhai Pharma supports international trade through established logistics infrastructure and carefully coordinated export operations.
              </p>

              {/* Origin Pill Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#5B9A3C]/30 shadow-xs text-xs text-[#1E3D2A]">
                <MapPin className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span className="font-semibold">Origin:</span>
                <span className="font-mono text-[#5B9A3C]">Gujarat, India</span>
              </div>

              {/* Script Cursive Text with Botanical Flourish */}
              <div className="mt-8 relative select-none">
                <span className="font-serif italic text-2xl sm:text-3xl text-[#3A6B48] leading-tight block">
                  Quality Chemicals
                  <br />
                  for a Healthier World
                </span>
              </div>

            </FadeInLeft>

            {/* Right Column: Interactive Faint World Map + Okhai Pharma Plant Facility photo */}
            <FadeInRight className="lg:col-span-7 relative">
              
              {/* Faint Interactive World Map with Route Nodes */}
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xl p-4 sm:p-6 mb-4">
                
                {/* Stylized World Map Vector */}
                <svg viewBox="0 0 800 420" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle Grid Dotted Background */}
                  <defs>
                    <pattern id="exportHeroDots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.2" fill="#5B9A3C" fillOpacity="0.15" />
                    </pattern>
                    <linearGradient id="routeHeroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  <rect width="800" height="420" fill="url(#exportHeroDots)" />

                  {/* Continent Silhouettes (Pale Soft Mint) */}
                  <path d="M 80,60 Q 160,40 220,80 Q 230,150 180,180 Q 120,190 70,140 Z" fill="#E6EEDF" fillOpacity="0.75" />
                  <path d="M 180,220 Q 240,240 210,330 Q 160,370 140,300 Z" fill="#E6EEDF" fillOpacity="0.6" />
                  <path d="M 370,70 Q 460,60 480,120 Q 420,150 360,120 Z" fill="#E6EEDF" fillOpacity="0.8" />
                  <path d="M 380,150 Q 480,160 460,260 Q 410,340 370,250 Z" fill="#E6EEDF" fillOpacity="0.6" />
                  <path d="M 480,60 Q 660,50 710,150 Q 640,240 520,180 Z" fill="#E6EEDF" fillOpacity="0.8" />
                  <path d="M 640,270 Q 720,260 740,330 Q 670,360 630,320 Z" fill="#E6EEDF" fillOpacity="0.6" />

                  {/* Arcs Radiating from Gujarat (530, 185) */}
                  <path d="M 530,185 Q 440,90 380,100" stroke="url(#routeHeroGrad)" strokeWidth="1.8" strokeDasharray="4 4" />
                  <path d="M 530,185 Q 320,50 170,100" stroke="url(#routeHeroGrad)" strokeWidth="1.8" strokeDasharray="5 5" />
                  <path d="M 530,185 Q 460,190 430,220" stroke="url(#routeHeroGrad)" strokeWidth="1.5" />
                  <path d="M 530,185 Q 610,130 680,140" stroke="url(#routeHeroGrad)" strokeWidth="1.8" strokeDasharray="4 4" />
                  <path d="M 530,185 Q 600,260 660,300" stroke="url(#routeHeroGrad)" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Radiating Beacon from Gujarat */}
                  <circle cx="530" cy="185" r="16" fill="#8CC63F" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="530" cy="185" r="7" fill="#5B9A3C" />
                  <circle cx="530" cy="185" r="3" fill="#FFFFFF" />

                  {/* Destination Pins on Map */}
                  <g className="cursor-pointer" transform="translate(170, 90)">
                    <circle cx="0" cy="0" r="5" fill="#1E3D2A" />
                    <text x="8" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">North America (USA)</text>
                  </g>

                  <g className="cursor-pointer" transform="translate(380, 95)">
                    <circle cx="0" cy="0" r="5" fill="#1E3D2A" />
                    <text x="8" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">European Union</text>
                  </g>

                  <g className="cursor-pointer" transform="translate(425, 215)">
                    <circle cx="0" cy="0" r="5" fill="#1E3D2A" />
                    <text x="8" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">Middle East</text>
                  </g>

                  <g className="cursor-pointer" transform="translate(680, 135)">
                    <circle cx="0" cy="0" r="5" fill="#1E3D2A" />
                    <text x="8" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">Japan &amp; East Asia</text>
                  </g>

                  <g className="cursor-pointer" transform="translate(650, 295)">
                    <circle cx="0" cy="0" r="5" fill="#1E3D2A" />
                    <text x="8" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">Southeast Asia</text>
                  </g>

                  {/* Gujarat Origin Label */}
                  <g transform="translate(530, 210)">
                    <rect x="-42" y="0" width="84" height="20" rx="10" fill="#1E3D2A" />
                    <text x="0" y="14" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fill="#8CC63F" textAnchor="middle">Gujarat, India</text>
                  </g>
                </svg>

              </div>

              {/* Plant Exterior Photo with Modern Trucks Loading (Bottom of Hero) */}
              <div className="relative rounded-3xl overflow-hidden border border-[#5B9A3C]/25 shadow-2xl aspect-[16/7.5] group">
                <img
                  src={realFactoryImg}
                  alt="Okhai Pharma Manufacturing & Export Dispatch Hub"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-[#1E3D2A] text-xs font-semibold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-pulse" />
                  <span>Scheduled Ocean &amp; Air Freight Dispatch</span>
                </div>
              </div>

            </FadeInRight>

          </div>

          {/* Bottom Center Scroll Pill (Matching Mockup exactly) */}
          <div className="mt-12 flex justify-center">
            <a
              href="#capabilities"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 border border-[#1E3D2A]/15 text-xs font-mono font-medium text-[#1E3D2A] shadow-xs hover:border-[#5B9A3C] hover:text-[#5B9A3C] transition-all hover:shadow"
            >
              <Mouse className="w-4 h-4 text-[#5B9A3C] animate-bounce" />
              <span>EXPLORE OUR GLOBAL REACH</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. DELIVERING EXCELLENCE ACROSS THE GLOBE (5 Capability Columns)
      ========================================================================= */}
      <RevealOnScroll>
        <section id="capabilities" className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Header Row with Cursive Signature Top Right */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Our Export Capabilities
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Delivering Excellence
                  <br />
                  Across the Globe
                </h2>
                <p className="mt-3 text-sm text-[#1E3D2A]/75 max-w-xl font-light">
                  We export high-quality pharmaceutical intermediates and chemicals to global markets with a focus on compliance, consistency and long-term partnerships.
                </p>
              </div>

              {/* Script Cursive Text: "Trusted Quality Worldwide" */}
              <div className="text-right pr-4 select-none">
                <span className="font-serif italic text-2xl sm:text-3xl text-[#3A6B48] leading-tight block">
                  Trusted Quality
                  <br />
                  Worldwide
                </span>
              </div>
            </div>

            {/* 5 Capability Columns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {/* Card 1: API & Intermediates */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  API &amp;
                  <br />
                  Intermediates
                </h4>
              </div>

              {/* Card 2: Specialty Chemicals */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all">
                  <Atom className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Specialty
                  <br />
                  Chemicals
                </h4>
              </div>

              {/* Card 3: Regulatory Compliance */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Regulatory
                  <br />
                  Compliance
                </h4>
              </div>

              {/* Card 4: Global Distribution */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Global
                  <br />
                  Distribution
                </h4>
              </div>

              {/* Card 5: Reliable Partnerships */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group col-span-2 sm:col-span-1">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all">
                  <Handshake className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Reliable
                  <br />
                  Partnerships
                </h4>
              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          3. FROM OUR FACILITY TO YOUR DESTINATION (4-Step Export Timeline + Freight Photo)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14">
              
              {/* Left Column: Heading & Subtitle */}
              <div className="lg:col-span-6">
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

                <p className="mt-4 text-sm text-[#1E3D2A]/75 font-light leading-relaxed max-w-lg">
                  A well-coordinated process to ensure safe, compliant and timely delivery of our products worldwide.
                </p>
              </div>

              {/* Right Column: Ocean Freight & Air Cargo Visual */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#5B9A3C]/25 shadow-2xl aspect-[16/9.5] group">
                  <img
                    src={cargoShipImg}
                    alt="Ocean Container Ship and Air Cargo Delivery"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Leaf Accent */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 pointer-events-none select-none">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                      <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.85" stroke="#2D5A3C" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-[#1E3D2A] text-xs font-semibold shadow-md">
                    <Ship className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Mundra Port (JNPT) &amp; Ahmedabad Air Cargo</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 4-Step Horizontal Timeline Track (Matching mockup exactly) */}
            <div className="relative">
              
              {/* Dotted Connecting Line */}
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#5B9A3C]/35 z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                
                {/* Step 01: Order Confirmation */}
                <div className="flex flex-col items-center text-center p-3 group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">01</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    Order Confirmation
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1 max-w-[200px]">
                    We receive and verify your requirements.
                  </p>
                </div>

                {/* Step 02: Quality & Documentation */}
                <div className="flex flex-col items-center text-center p-3 group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">02</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    Quality &amp; Documentation
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1 max-w-[200px]">
                    Products are tested and export documents are prepared.
                  </p>
                </div>

                {/* Step 03: Secure Packaging & Dispatch */}
                <div className="flex flex-col items-center text-center p-3 group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <Package className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">03</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    Secure Packaging &amp; Dispatch
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1 max-w-[200px]">
                    Packed with care and shipped via trusted logistics partners.
                  </p>
                </div>

                {/* Step 04: On-Time Delivery */}
                <div className="flex flex-col items-center text-center p-3 group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">04</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    On-Time Delivery
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1 max-w-[200px]">
                    Reaches your destination safely and on schedule.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          4. CONNECTED TO GLOBAL MARKETS (Interactive World Routes & Container Ship)
      ========================================================================= */}
      <RevealOnScroll>
        <section id="trade-routes" className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading, Subtitle & Interactive Button + Ship Vignette */}
              <div className="lg:col-span-4">
                
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
                  Our export network reaches key regions across the world, supported by strong logistics and trusted international partners.
                </p>

                {/* Explore Destinations Pill Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveDest(DESTINATIONS[0])}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] hover:border-[#5B9A3C] hover:bg-[#E6EEDF]/40 transition-all shadow-xs group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1E3D2A] text-white flex items-center justify-center shrink-0 group-hover:bg-[#5B9A3C] transition-colors">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold">Explore Export Destinations</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5B9A3C] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Container Ship Ocean Vignette with Lush Corner Foliage */}
                <div className="mt-8 relative rounded-2xl overflow-hidden border border-[#5B9A3C]/20 shadow-lg aspect-[16/9]">
                  <img
                    src={cargoShipImg}
                    alt="Ocean Shipping Container Vessel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Botanical Corner Flourish */}
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 pointer-events-none select-none">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                      <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.9" stroke="#2D5A3C" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Pale Green Route Map */}
              <div className="lg:col-span-8 relative">
                
                <div className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md border border-[#5B9A3C]/25 shadow-xl p-5 sm:p-8">
                  
                  <svg viewBox="0 0 850 480" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="routesDotGrid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.3" fill="#5B9A3C" fillOpacity="0.14" />
                      </pattern>
                      <linearGradient id="routeArcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    <rect width="850" height="480" fill="url(#routesDotGrid)" />

                    {/* Continents Silhouettes */}
                    <path d="M 90,70 Q 180,50 240,90 Q 250,170 190,200 Q 130,210 80,150 Z" fill="#E6EEDF" fillOpacity="0.8" />
                    <path d="M 200,240 Q 260,260 230,360 Q 170,400 150,330 Z" fill="#E6EEDF" fillOpacity="0.6" />
                    <path d="M 400,80 Q 500,70 520,130 Q 450,170 390,140 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 410,170 Q 510,180 490,290 Q 430,380 390,280 Z" fill="#E6EEDF" fillOpacity="0.65" />
                    <path d="M 520,70 Q 720,60 770,170 Q 690,270 560,200 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 690,300 Q 780,290 800,370 Q 720,410 680,360 Z" fill="#E6EEDF" fillOpacity="0.65" />

                    {/* Trade Arcs Originating from Gujarat (580, 210) */}
                    <path d="M 580,210 Q 480,100 420,110" stroke="url(#routeArcGlow)" strokeWidth="2" strokeDasharray="5 5" />
                    <path d="M 580,210 Q 360,60 190,120" stroke="url(#routeArcGlow)" strokeWidth="2" strokeDasharray="6 6" />
                    <path d="M 580,210 Q 500,220 460,250" stroke="url(#routeArcGlow)" strokeWidth="1.8" />
                    <path d="M 580,210 Q 670,140 750,160" stroke="url(#routeArcGlow)" strokeWidth="2" strokeDasharray="5 5" />
                    <path d="M 580,210 Q 660,290 730,340" stroke="url(#routeArcGlow)" strokeWidth="1.8" strokeDasharray="5 5" />

                    {/* Pulsing Origin Marker on Gujarat */}
                    <circle cx="580" cy="210" r="18" fill="#8CC63F" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="580" cy="210" r="7" fill="#5B9A3C" />
                    <circle cx="580" cy="210" r="3" fill="#FFFFFF" />

                    {/* Origin Badge */}
                    <g transform="translate(580, 235)">
                      <rect x="-45" y="0" width="90" height="22" rx="11" fill="#1E3D2A" />
                      <text x="0" y="15" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fill="#8CC63F" textAnchor="middle">Gujarat, India</text>
                    </g>

                    {/* Destination Clickable Nodes */}
                    {DESTINATIONS.map((dest) => (
                      <g
                        key={dest.id}
                        className="cursor-pointer group/pin"
                        onClick={() => setActiveDest(dest)}
                      >
                        <circle
                          cx={`${dest.x}%`}
                          cy={`${dest.y}%`}
                          r="6"
                          fill="#1E3D2A"
                          className="group-hover/pin:fill-[#5B9A3C] transition-colors"
                        />
                        <text
                          x={`${dest.x}%`}
                          y={`${dest.y - 3}%`}
                          fontSize="12"
                          fontFamily="Fraunces, serif"
                          fontWeight="bold"
                          fill="#1E3D2A"
                          textAnchor="middle"
                          className="group-hover/pin:fill-[#5B9A3C] transition-colors"
                        >
                          {dest.name}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Destination Info Box (Active state) */}
                  {activeDest && (
                    <div className="mt-4 p-4 rounded-2xl bg-[#EAF2E5] border border-[#5B9A3C]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1E3D2A]">
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#5B9A3C] shrink-0" />
                        <div>
                          <span className="font-bold">{activeDest.name}:</span>
                          <span className="text-[#1E3D2A]/80 ml-1.5">Direct Entry Ports: {activeDest.ports}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[#5B9A3C] font-semibold">Transit: {activeDest.transitTime}</span>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          5. YOUR QUESTIONS, ANSWERED (Export & Logistics FAQ Accordion)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column: Heading & Subtitle */}
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

                {/* Corner Botanical Foliage Accent */}
                <div className="mt-8 w-24 h-24 pointer-events-none select-none opacity-85">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                    <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.85" stroke="#2D5A3C" strokeWidth="1" />
                    <path d="M10,90 Q50,45 90,10" stroke="#8CC63F" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Right Column: 5 Accordion Items */}
              <div className="lg:col-span-7 space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-2xl bg-white/95 backdrop-blur-md border border-[#1E3D2A]/10 shadow-xs hover:border-[#5B9A3C]/40 transition-all overflow-hidden"
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
          6. PRE-FOOTER CTA: "READY TO EXPORT? Let's Build Global Partnerships" (Light Theme)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-24 bg-gradient-to-br from-[#FAFBF8] via-[#F4F8F1] to-[#EAEFE6] text-[#1E3D2A] overflow-hidden border-t border-[#1E3D2A]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          
          {/* Ambient Botanical Radial Lights */}
          <div className="absolute top-0 right-1/4 w-[550px] h-[380px] bg-[#8CC63F]/12 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[480px] h-[350px] bg-[#5B9A3C]/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Decorative Corner Foliage */}
          <div className="absolute top-6 left-6 w-24 h-24 pointer-events-none select-none opacity-40 animate-float-slow hidden md:block">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
              <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" fill="#6EA446" fillOpacity="0.4" stroke="#2D5A3C" strokeWidth="1" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Outlined Typography "OKHAI PHARMA" */}
              <div className="lg:col-span-6 select-none opacity-25 hover:opacity-35 transition-opacity pointer-events-none">
                <span
                  className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-serif font-black tracking-tight leading-[0.95] text-transparent block"
                  style={{
                    WebkitTextStroke: '1.5px #2E683A'
                  }}
                >
                  OKHAI
                </span>
                <span
                  className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-serif font-black tracking-tight leading-[0.95] text-transparent block -mt-3 sm:-mt-5"
                  style={{
                    WebkitTextStroke: '1.5px #2E683A'
                  }}
                >
                  PHARMA
                </span>
              </div>

              {/* Right Column: Sleek Frosted Ivory Card with Dual Action Buttons */}
              <div className="lg:col-span-6">
                
                <div className="relative rounded-3xl bg-white/85 backdrop-blur-xl border border-[#5B9A3C]/25 p-7 sm:p-9 shadow-xl shadow-[#1E3D2A]/6 overflow-hidden group hover:border-[#5B9A3C]/45 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#8CC63F]/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Corner Botanical Foliage */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none select-none opacity-60">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
                      <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#8CC63F" fillOpacity="0.4" stroke="#2D5A3C" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-widest text-[#5B9A3C] mb-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-ping" />
                      <span>Ready to Export?</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                      Let's Build Global
                      <br />
                      <span className="italic font-normal text-[#5B9A3C] font-editorial">Partnerships</span>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#1E3D2A]/75 max-w-md font-light leading-relaxed">
                      Partner with Okhai Pharma for reliable, high-quality and compliant export solutions.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3.5">
                      <Link
                        to="/contact"
                        className="px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-xl hover:scale-102 flex items-center gap-2 group/btn cursor-pointer active:scale-98"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 text-[#8CC63F]" />
                      </Link>

                      <Link
                        to="/downloads"
                        className="px-5 py-3 rounded-full bg-white hover:bg-[#FAFBF8] border border-[#1E3D2A]/15 hover:border-[#5B9A3C] text-[#1E3D2A] text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 hover:scale-102 active:scale-98"
                      >
                        <FileDown className="w-4 h-4 text-[#5B9A3C]" />
                        <span>Download Brochure</span>
                      </Link>
                    </div>

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
