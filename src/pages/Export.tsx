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
  Compass,
  Plus,
  Minus,
  FileDown,
  Anchor,
  Plane,
  Ship,
  Sparkles,
  Clock,
  Award,
  Check
} from 'lucide-react';

import nicotineAirCargoImg from '../assets/images/nicotine-air-cargo.jpg';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { FadeInLeft, FadeInRight, FadeInUp, ScaleReveal, StaggerContainer, StaggerItem } from '../components/common/animations';

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
    q: 'Which documents are required for export consignments?',
    a: 'Every export consignment is accompanied by a full regulatory dossier: Lot-specific Certificate of Analysis (CoA) with HPLC/GC assays, Safety Data Sheet (SDS/MSDS compliant with GHS), Commercial Invoice, Packing List, Certificate of Origin (COO), and UN-certified Dangerous Goods Declaration (DGD).'
  },
  {
    q: 'How long does the export delivery process take?',
    a: 'Standard dispatch lead times are 7 to 14 business days from order confirmation and regulatory verification. Ocean freight from Mundra / Kandla ports to European and North American ports typically takes 18 to 28 days, while air freight via Ahmedabad Air Cargo arrives in 3 to 5 business days.'
  },
  {
    q: 'Do you provide support for regulatory requirements in other countries?',
    a: 'Yes. Our dedicated regulatory affairs desk provides technical support including DMF (Drug Master File) documentation, heavy metal impurity profiles, residual solvent limits, and compliance declarations tailored to destination country pharmacopeia (USP, EP, JP, IP).'
  },
  {
    q: 'What are the packaging options for international shipments?',
    a: 'We supply our products in UN-certified 200-liter fluorinated HDPE drums, lacquered steel drums, or ISO-standard chemical containers. All drums are sealed under high-purity inert dry nitrogen blankets, palletized on ISPM-15 heat-treated fumigated pallets, and reinforced with tamper-evident security banding.'
  }
];

interface Destination {
  id: string;
  region: string;
  name: string;
  ports: string;
  oceanTransit: string;
  airTransit: string;
  standards: string;
  x: number; // SVG coordinate %
  y: number; // SVG coordinate %
}

const DESTINATIONS: Destination[] = [
  {
    id: 'usa',
    region: 'North America',
    name: 'North America (USA & Canada)',
    ports: 'New York, Los Angeles, Savannah, Montreal',
    oceanTransit: '22-26 Days Ocean',
    airTransit: '2-3 Days Air Express',
    standards: 'USP, FDA cGMP, CFR 21',
    x: 18,
    y: 35
  },
  {
    id: 'eu',
    region: 'Europe',
    name: 'European Union & UK',
    ports: 'Rotterdam, Antwerp, Hamburg, Felixstowe',
    oceanTransit: '18-22 Days Ocean',
    airTransit: '2 Days Air Cargo',
    standards: 'EP (Ph. Eur.), REACH, CEP Compliant',
    x: 48,
    y: 28
  },
  {
    id: 'me',
    region: 'Middle East',
    name: 'Middle East & GCC',
    ports: 'Jebel Ali (Dubai), Dammam, Doha, Sohar',
    oceanTransit: '4-7 Days Ocean',
    airTransit: '24-48 Hours Air',
    standards: 'GCC DR, SFDA, MoH Compliant',
    x: 58,
    y: 44
  },
  {
    id: 'japan',
    region: 'East Asia',
    name: 'Japan & South Korea',
    ports: 'Yokohama, Busan, Tokyo, Incheon',
    oceanTransit: '14-18 Days Ocean',
    airTransit: '2 Days Air Cargo',
    standards: 'JP (Japanese Pharmacopoeia), MFDS',
    x: 82,
    y: 36
  },
  {
    id: 'sea',
    region: 'Southeast Asia',
    name: 'Southeast Asia Hubs',
    ports: 'Singapore, Port Klang, Bangkok, Jakarta',
    oceanTransit: '8-12 Days Ocean',
    airTransit: '1-2 Days Air',
    standards: 'ASEAN Harmonized, HSA, NPRA',
    x: 75,
    y: 62
  }
];

export const Export: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeDest, setActiveDest] = useState<Destination>(DESTINATIONS[0]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredDestinations = selectedRegion === 'all' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.region.toLowerCase().includes(selectedRegion.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FAFBF8] text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">

      {/* =========================================================================
          1. HERO SECTION: "Global export readiness. Directly from Gujarat."
          (Clean, Expanded Layout without the photo card or scroll pill)
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            
            {/* Left Column: Eyebrow, Main Heading, Subtitle, Metric Pills, Action Buttons */}
            <FadeInLeft className="lg:col-span-5 flex flex-col justify-center">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#5B9A3C]/30 shadow-xs mb-4 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-ping" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                  Global Export Operations
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
                Strategically positioned in Gujarat, India, Okhai Pharma facilitates international pharmaceutical supply chains through multi-port maritime access, rapid air freight dispatch, and rigorous UN-certified packaging standards.
              </p>

              {/* 3 High-Impact Floating Metric Cards */}
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xs hover:border-[#5B9A3C]/50 hover:shadow-md transition-all group">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#1E3D2A] group-hover:text-[#5B9A3C] transition-colors">50+</div>
                  <div className="text-[11px] text-[#1E3D2A]/70 font-medium leading-tight mt-0.5">Countries Supplied</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xs hover:border-[#5B9A3C]/50 hover:shadow-md transition-all group">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#1E3D2A] group-hover:text-[#5B9A3C] transition-colors">99.4%</div>
                  <div className="text-[11px] text-[#1E3D2A]/70 font-medium leading-tight mt-0.5">On-Time Dispatch</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xs hover:border-[#5B9A3C]/50 hover:shadow-md transition-all group">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#1E3D2A] group-hover:text-[#5B9A3C] transition-colors">Class 6.1</div>
                  <div className="text-[11px] text-[#1E3D2A]/70 font-medium leading-tight mt-0.5">UN DG Certified</div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-xl hover:scale-102 flex items-center gap-2 group cursor-pointer active:scale-98"
                >
                  <span>Request Export Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#8CC63F]" />
                </Link>

                <a
                  href="#export-protocol"
                  className="px-5 py-3 rounded-full bg-white/95 hover:bg-white border border-[#1E3D2A]/15 hover:border-[#5B9A3C] text-[#1E3D2A] text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 hover:scale-102 active:scale-98"
                >
                  <Compass className="w-4 h-4 text-[#5B9A3C]" />
                  <span>View Export Protocol</span>
                </a>
              </div>

              {/* Script Cursive Text with Botanical Flourish */}
              <div className="mt-8 select-none">
                <span className="font-serif italic text-2xl sm:text-3xl text-[#3A6B48] leading-tight block">
                  Quality Chemicals
                  <br />
                  for a Healthier World
                </span>
              </div>

            </FadeInLeft>

            {/* Right Column: Expanded Ultra-Premium Interactive World Logistics Map */}
            <FadeInRight className="lg:col-span-7 relative">
              
              <div className="relative rounded-3xl overflow-hidden bg-white/85 backdrop-blur-xl border border-[#5B9A3C]/25 shadow-2xl p-5 sm:p-7">
                
                {/* Header bar inside map card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1E3D2A]/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5B9A3C] animate-pulse" />
                    <span className="text-xs font-serif font-bold text-[#1E3D2A]">Okhai Global Dispatch Network</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['all', 'North America', 'Europe', 'Middle East', 'East Asia'].map((regionKey) => (
                      <button
                        key={regionKey}
                        onClick={() => setSelectedRegion(regionKey)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                          selectedRegion === regionKey
                            ? 'bg-[#1E3D2A] text-[#8CC63F] font-bold shadow-xs'
                            : 'bg-[#FAFBF8] text-[#1E3D2A]/70 hover:bg-[#EAF2E5] hover:text-[#1E3D2A]'
                        }`}
                      >
                        {regionKey === 'all' ? 'All Gateways' : regionKey}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stylized World Map Vector */}
                <div className="relative bg-[#FAFBF8]/80 rounded-2xl p-2 border border-[#5B9A3C]/15 overflow-hidden">
                  <svg viewBox="0 0 800 420" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="exportHeroDots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.2" fill="#5B9A3C" fillOpacity="0.16" />
                      </pattern>
                      <linearGradient id="routeHeroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.5" />
                      </linearGradient>
                      <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="glow" />
                        <feComposite in="SourceGraphic" in2="glow" operator="over" />
                      </filter>
                    </defs>

                    {/* Dotted grid background */}
                    <rect width="800" height="420" fill="url(#exportHeroDots)" />

                    {/* Continent Silhouettes (Pale Soft Mint) */}
                    <path d="M 80,60 Q 160,40 220,80 Q 230,150 180,180 Q 120,190 70,140 Z" fill="#E6EEDF" fillOpacity="0.8" />
                    <path d="M 180,220 Q 240,240 210,330 Q 160,370 140,300 Z" fill="#E6EEDF" fillOpacity="0.65" />
                    <path d="M 370,70 Q 460,60 480,120 Q 420,150 360,120 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 380,150 Q 480,160 460,260 Q 410,340 370,250 Z" fill="#E6EEDF" fillOpacity="0.7" />
                    <path d="M 480,60 Q 660,50 710,150 Q 640,240 520,180 Z" fill="#E6EEDF" fillOpacity="0.85" />
                    <path d="M 640,270 Q 720,260 740,330 Q 670,360 630,320 Z" fill="#E6EEDF" fillOpacity="0.7" />

                    {/* Arcs Radiating from Gujarat (530, 185) */}
                    <path d="M 530,185 Q 440,90 380,100" stroke="url(#routeHeroGrad)" strokeWidth="2.2" strokeDasharray="5 5" className="animate-flow-dash" />
                    <path d="M 530,185 Q 320,50 170,100" stroke="url(#routeHeroGrad)" strokeWidth="2.2" strokeDasharray="6 6" className="animate-flow-dash" />
                    <path d="M 530,185 Q 460,190 430,220" stroke="url(#routeHeroGrad)" strokeWidth="2" strokeDasharray="4 4" className="animate-flow-dash" />
                    <path d="M 530,185 Q 610,130 680,140" stroke="url(#routeHeroGrad)" strokeWidth="2.2" strokeDasharray="5 5" className="animate-flow-dash" />
                    <path d="M 530,185 Q 600,260 660,300" stroke="url(#routeHeroGrad)" strokeWidth="2" strokeDasharray="5 5" className="animate-flow-dash" />

                    {/* Radiating Beacon from Gujarat */}
                    <circle cx="530" cy="185" r="22" fill="#8CC63F" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="530" cy="185" r="9" fill="#5B9A3C" filter="url(#glowFilter)" />
                    <circle cx="530" cy="185" r="4" fill="#FFFFFF" />

                    {/* Gujarat Origin Label */}
                    <g transform="translate(530, 215)">
                      <rect x="-46" y="0" width="92" height="22" rx="11" fill="#1E3D2A" />
                      <text x="0" y="15" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fill="#8CC63F" textAnchor="middle">Gujarat, India</text>
                    </g>

                    {/* Destination Pins on Map */}
                    <g
                      className="cursor-pointer group/pin"
                      transform="translate(170, 95)"
                      onClick={() => setActiveDest(DESTINATIONS[0])}
                    >
                      <circle cx="0" cy="0" r="7" fill={activeDest.id === 'usa' ? '#5B9A3C' : '#1E3D2A'} className="group-hover/pin:fill-[#5B9A3C] transition-colors" />
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                      <text x="12" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">North America</text>
                    </g>

                    <g
                      className="cursor-pointer group/pin"
                      transform="translate(380, 95)"
                      onClick={() => setActiveDest(DESTINATIONS[1])}
                    >
                      <circle cx="0" cy="0" r="7" fill={activeDest.id === 'eu' ? '#5B9A3C' : '#1E3D2A'} className="group-hover/pin:fill-[#5B9A3C] transition-colors" />
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                      <text x="12" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">European Union</text>
                    </g>

                    <g
                      className="cursor-pointer group/pin"
                      transform="translate(425, 215)"
                      onClick={() => setActiveDest(DESTINATIONS[2])}
                    >
                      <circle cx="0" cy="0" r="7" fill={activeDest.id === 'me' ? '#5B9A3C' : '#1E3D2A'} className="group-hover/pin:fill-[#5B9A3C] transition-colors" />
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                      <text x="12" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">Middle East</text>
                    </g>

                    <g
                      className="cursor-pointer group/pin"
                      transform="translate(680, 135)"
                      onClick={() => setActiveDest(DESTINATIONS[3])}
                    >
                      <circle cx="0" cy="0" r="7" fill={activeDest.id === 'japan' ? '#5B9A3C' : '#1E3D2A'} className="group-hover/pin:fill-[#5B9A3C] transition-colors" />
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                      <text x="12" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">Japan &amp; East Asia</text>
                    </g>

                    <g
                      className="cursor-pointer group/pin"
                      transform="translate(650, 295)"
                      onClick={() => setActiveDest(DESTINATIONS[4])}
                    >
                      <circle cx="0" cy="0" r="7" fill={activeDest.id === 'sea' ? '#5B9A3C' : '#1E3D2A'} className="group-hover/pin:fill-[#5B9A3C] transition-colors" />
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                      <text x="12" y="4" fontSize="11" fontFamily="Fraunces, serif" fontWeight="600" fill="#1E3D2A">Southeast Asia</text>
                    </g>
                  </svg>
                </div>

                {/* Active Corridor Card inside Hero Map */}
                <div className="mt-4 p-4 rounded-2xl bg-[#EAF2E5]/90 border border-[#5B9A3C]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1E3D2A]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#5B9A3C] flex items-center justify-center shrink-0 shadow-xs">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold font-serif text-sm text-[#1E3D2A]">{activeDest.name}</div>
                      <div className="text-[#1E3D2A]/75 text-[11px] mt-0.5">Ports: {activeDest.ports}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="px-2.5 py-1 rounded-full bg-white text-[#5B9A3C] font-mono text-[11px] font-semibold shadow-xs">
                      {activeDest.airTransit}
                    </span>
                    <span className="text-[#1E3D2A]/80 text-[11px] font-medium hidden md:inline">
                      {activeDest.standards}
                    </span>
                  </div>
                </div>

              </div>

            </FadeInRight>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. FROM OUR FACILITY TO YOUR DESTINATION (4-Step Export Timeline + Freight Photo)
      ========================================================================= */}
      <RevealOnScroll>
        <section id="export-protocol" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
              
              {/* Left Column: Heading & Subtitle */}
              <FadeInLeft className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Seamless Export Process
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  From Our Facility
                  <br />
                  <span className="italic font-normal text-[#5B9A3C] font-editorial">to Your Destination</span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-[#1E3D2A]/80 font-light leading-relaxed max-w-lg">
                  A tightly coordinated protocol ensuring uncompromised purity, rigorous UN-certified packaging, compliant customs documentation, and reliable global delivery schedules.
                </p>

                {/* Assurance Badges */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#5B9A3C]/20 text-[11px] font-semibold text-[#1E3D2A]">
                    <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    Inert Nitrogen Blanketing
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#5B9A3C]/20 text-[11px] font-semibold text-[#1E3D2A]">
                    <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    Tamper-Evident Seals
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#5B9A3C]/20 text-[11px] font-semibold text-[#1E3D2A]">
                    <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    Full Analytical Dossier
                  </span>
                </div>
              </FadeInLeft>

              {/* Right Column: Nicotine Air Cargo Dispatch Visual (2:1 aspect ratio to prevent left text crop) */}
              <FadeInRight className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#5B9A3C]/25 shadow-2xl aspect-[2/1] group bg-[#EBF2E5]">
                  <img
                    src={nicotineAirCargoImg}
                    alt="Nicotine Air Cargo - Palletized UN 1654 Class 6.1 drums loading into cargo airliner"
                    className="w-full h-full object-cover object-left group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Leaf Accent */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 pointer-events-none select-none">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                      <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.85" stroke="#2D5A3C" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-[#1E3D2A] text-[11px] font-semibold shadow-md backdrop-blur-xs">
                    <Plane className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>UN 1654 Class 6.1 Dangerous Goods Certified · Air Cargo Dispatch</span>
                  </div>
                </div>
              </FadeInRight>

            </div>

            {/* 4-Step Horizontal Timeline Track */}
            <StaggerContainer className="relative">
              
              {/* Dotted Connecting Line */}
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#5B9A3C]/35 z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                
                {/* Step 01: Order Confirmation */}
                <StaggerItem className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1E3D2A]/10 hover:border-[#5B9A3C]/50 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">01</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    Order &amp; Verification
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1.5 max-w-[210px]">
                    Contractual review, pharmacopeial alignment (USP/EP), and reserved batch allocation.
                  </p>
                </StaggerItem>

                {/* Step 02: Quality & Documentation */}
                <StaggerItem className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1E3D2A]/10 hover:border-[#5B9A3C]/50 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">02</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    Quality &amp; Dossier
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1.5 max-w-[210px]">
                    Lot-specific HPLC assays, Certificate of Analysis (CoA), GHS SDS &amp; export customs clearance.
                  </p>
                </StaggerItem>

                {/* Step 03: Secure Packaging & Dispatch */}
                <StaggerItem className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1E3D2A]/10 hover:border-[#5B9A3C]/50 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <Package className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">03</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    UN Packaging &amp; Inerting
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1.5 max-w-[210px]">
                    Inert N2 purging, fluorinated UN drums, ISPM-15 fumigated pallets &amp; tamper seals.
                  </p>
                </StaggerItem>

                {/* Step 04: On-Time Delivery */}
                <StaggerItem className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1E3D2A]/10 hover:border-[#5B9A3C]/50 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#5B9A3C]/40 shadow-md flex items-center justify-center text-[#2E683A] group-hover:scale-110 group-hover:border-[#5B9A3C] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-sm text-[#5B9A3C] font-semibold mt-3">04</span>
                  <h4 className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] mt-1 leading-snug">
                    Multimodal Dispatch
                  </h4>
                  <p className="text-xs text-[#1E3D2A]/70 leading-relaxed font-light mt-1.5 max-w-[210px]">
                    Direct container sailings from Mundra/Kandla &amp; expedited air cargo from Ahmedabad.
                  </p>
                </StaggerItem>

              </div>

            </StaggerContainer>

          </div>
        </section>
      </RevealOnScroll>



      {/* =========================================================================
          4. YOUR QUESTIONS, ANSWERED (Export & Logistics FAQ Accordion)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column: Heading & Subtitle */}
              <FadeInLeft className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Export &amp; Logistics FAQ
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Your Questions,
                  <br />
                  <span className="italic font-normal text-[#5B9A3C] font-editorial">Answered</span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-[#1E3D2A]/80 font-light leading-relaxed max-w-md">
                  Everything you need to know about our international dangerous goods compliance, customs clearance documentation, and lead times.
                </p>

                {/* Direct Assistance Card */}
                <div className="mt-8 p-5 rounded-2xl bg-white/90 border border-[#5B9A3C]/25 shadow-xs max-w-md">
                  <div className="text-xs font-serif font-bold text-[#1E3D2A]">Have a specific pharmacopeia inquiry?</div>
                  <p className="text-[11px] text-[#1E3D2A]/70 mt-1 leading-relaxed">
                    Our technical and regulatory compliance specialists can furnish sample CoAs, impurity profiles, and customized drum configurations.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B9A3C] hover:text-[#1E3D2A] mt-3 group"
                  >
                    <span>Connect with Export Regulatory Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Corner Botanical Foliage Accent */}
                <div className="mt-8 w-24 h-24 pointer-events-none select-none opacity-85">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                    <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.85" stroke="#2D5A3C" strokeWidth="1" />
                    <path d="M10,90 Q50,45 90,10" stroke="#8CC63F" strokeWidth="1" />
                  </svg>
                </div>
              </FadeInLeft>

              {/* Right Column: 5 Accordion Items with Stagger Animation */}
              <StaggerContainer className="lg:col-span-7 space-y-3.5">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <StaggerItem
                      key={faq.q}
                      className="rounded-2xl bg-white/95 backdrop-blur-md border border-[#1E3D2A]/10 shadow-xs hover:border-[#5B9A3C]/40 transition-all overflow-hidden group"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="text-sm sm:text-[15px] font-serif font-bold text-[#1E3D2A] group-hover:text-[#5B9A3C] transition-colors leading-snug">
                          {faq.q}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isOpen ? 'bg-[#1E3D2A] text-white' : 'bg-[#EAF2E5] text-[#5B9A3C]'
                        }`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1E3D2A]/80 font-light leading-relaxed border-t border-[#1E3D2A]/5 animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          5. PRE-FOOTER CTA: "READY TO EXPORT? Let's Build Global Partnerships"
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-18 sm:py-28 bg-gradient-to-br from-[#FAFBF8] via-[#F4F8F1] to-[#EAEFE6] text-[#1E3D2A] overflow-hidden border-t border-[#1E3D2A]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          
          {/* Ambient Botanical Radial Lights */}
          <div className="absolute top-0 right-1/4 w-[550px] h-[380px] bg-[#8CC63F]/12 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[480px] h-[350px] bg-[#5B9A3C]/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Outlined Brand Typography "OKHAI PHARMA" */}
              <FadeInLeft className="lg:col-span-6 select-none opacity-25 hover:opacity-35 transition-opacity pointer-events-none">
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
              </FadeInLeft>

              {/* Right Column: Sleek Frosted Ivory Card with Dual Action Buttons */}
              <FadeInRight className="lg:col-span-6">
                
                <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl border border-[#5B9A3C]/25 p-7 sm:p-10 shadow-xl shadow-[#1E3D2A]/6 overflow-hidden group hover:border-[#5B9A3C]/50 transition-all duration-500">
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
                      <span>Ready to Export</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                      Let's Build Global
                      <br />
                      <span className="italic font-normal text-[#5B9A3C] font-editorial">Partnerships</span>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#1E3D2A]/80 max-w-md font-light leading-relaxed">
                      Partner with Okhai Pharma for reliable, high-purity and international pharmacopeia-compliant chemical supply chains.
                    </p>

                    {/* Dual Action Buttons */}
                    <div className="mt-7 flex flex-wrap items-center gap-3.5">
                      <Link
                        to="/contact"
                        className="px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-xl hover:scale-102 flex items-center gap-2 group/btn cursor-pointer active:scale-98"
                      >
                        <span>Request Export Quote</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 text-[#8CC63F]" />
                      </Link>

                      <Link
                        to="/downloads"
                        className="px-5 py-3 rounded-full bg-white hover:bg-[#FAFBF8] border border-[#1E3D2A]/15 hover:border-[#5B9A3C] text-[#1E3D2A] text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 hover:scale-102 active:scale-98"
                      >
                        <FileDown className="w-4 h-4 text-[#5B9A3C]" />
                        <span>Download Dossier</span>
                      </Link>
                    </div>

                    {/* 3 Trust Markers */}
                    <div className="mt-6 pt-5 border-t border-[#1E3D2A]/10 grid grid-cols-3 gap-2 text-[11px] text-[#1E3D2A]/75">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>CoA with Every Batch</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>Sample Dispatch</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>Direct Seaport Access</span>
                      </div>
                    </div>

                  </div>

                </div>

              </FadeInRight>

            </div>

          </div>
        </section>
      </RevealOnScroll>

    </div>
  );
};
