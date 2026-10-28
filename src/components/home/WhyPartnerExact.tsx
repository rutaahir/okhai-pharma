import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  FlaskConical,
  Handshake,
  Globe2,
  ArrowRight,
  Play,
  Settings,
  X,
  CheckCircle2,
  ExternalLink,
  Award,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

import tobaccoLeavesImg from '../../assets/images/tobacco-leaves.png';
import globeImg from '../../assets/images/partner-globe-network.jpg';
import researchImg from '../../assets/images/partner-research-labs.jpg';
import manufacturingImg from '../../assets/images/partner-manufacturing.jpg';
import warehouseImg from '../../assets/images/partner-warehouse.jpg';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../common/animations';

interface StepItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepItem[] = [
  {
    id: 'sourcing',
    number: '01',
    title: 'Trusted Sourcing',
    desc: 'Raw tobacco sourced directly from certified producers across monitored agricultural zones in India.',
    icon: Sprout
  },
  {
    id: 'quality',
    number: '02',
    title: 'Strict Quality Control',
    desc: 'Every batch evaluated via HPLC and GC chromatography for active assay and impurity profile.',
    icon: ShieldCheck
  },
  {
    id: 'formats',
    number: '03',
    title: 'Versatile Formats',
    desc: 'From water-soluble 40% sulfate solution to concentrated 95% alkaloid API grade.',
    icon: FlaskConical
  },
  {
    id: 'handling',
    number: '04',
    title: 'Handling Support',
    desc: 'Comprehensive SDS, technical dossiers, and regulatory export documentation provided.',
    icon: Handshake
  },
  {
    id: 'service',
    number: '05',
    title: 'Dedicated Service',
    desc: 'Direct commercial coordination with MOQ guidance and flexible international Incoterms.',
    icon: Globe2
  }
];

const PARTNERS = [
  { name: 'Pharma Companies', icon: <Sprout className="w-5 h-5" /> },
  { name: 'Research Institutes', icon: <FlaskConical className="w-5 h-5" /> },
  { name: 'Distributors', icon: <Handshake className="w-5 h-5" /> },
  { name: 'Global Traders', icon: <Globe2 className="w-5 h-5" /> },
  { name: 'Regulatory Bodies', icon: <ShieldCheck className="w-5 h-5" /> }
];

const FACILITY_CARDS = [
  {
    id: 'research',
    title: 'Research & Labs',
    subtitle: 'ISO 17025 Compliant Analytical QC',
    icon: <FlaskConical className="w-3.5 h-3.5" />,
    img: researchImg,
    badgeText: 'Research & Labs',
    specs: ['HPLC & GC Testing', 'Impurity Profiling <0.1%', 'Batch Assay Certification', 'GLP Cleanrooms']
  },
  {
    id: 'manufacturing',
    title: 'Quality Manufacturing',
    subtitle: 'Automated cGMP Solvent Extraction',
    icon: <Settings className="w-3.5 h-3.5" />,
    img: manufacturingImg,
    badgeText: 'Quality Manufacturing',
    specs: ['SS-316L Reactor Trains', 'Fractional Vacuum Distillation', 'Nitrogen Blanketed Storage', 'Automated Safety Controls']
  },
  {
    id: 'supply',
    title: 'Global Supply',
    subtitle: 'Dangerous Goods Certified International Freight',
    icon: <Globe2 className="w-3.5 h-3.5" />,
    img: warehouseImg,
    badgeText: 'Global Supply',
    specs: ['UN-Certified Steel Drums', 'Temperature Regulated Storage', 'Port of Nhava Sheva & Mundra', 'Door-to-Port Delivery']
  }
];

export const WhyPartnerExact: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<typeof FACILITY_CARDS[0] | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  // Auto-hover / auto-cycle through each point one by one every 2 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative py-12 lg:py-16 bg-transparent text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* =========================================================================
          BACKGROUND BOTANICAL AESTHETICS & SUBTLE CONTOURS
      ========================================================================= */}
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#8CC63F]/12 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#5B9A3C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Flowing Organic Curve Background SVGs */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden">
        <svg viewBox="0 0 1440 900" fill="none" className="w-full h-full preserve-3d" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-100 250 C 300 150, 700 420, 1100 220 C 1300 120, 1500 280, 1600 300"
            stroke="url(#contour-green-1)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M-50 480 C 400 380, 850 620, 1200 450 C 1400 350, 1550 500, 1650 520"
            stroke="url(#contour-green-2)"
            strokeWidth="1"
          />
          <path
            d="M200 800 C 600 700, 1000 850, 1500 720"
            stroke="url(#contour-green-1)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <defs>
            <linearGradient id="contour-green-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#5B9A3C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8CC63F" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="contour-green-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5B9A3C" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#5B9A3C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8CC63F" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>



      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            HEADER ROW: Eyebrow Badge, Main Title, Subtitle
        ========================================================================= */}
        <FadeInUp>
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            
            {/* Header Monograph Pill with Flanking Lines */}
            <div className="inline-flex items-center gap-3 mb-2.5">
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#5B9A3C]">
                WHY PARTNER WITH US
              </span>
              <span className="h-[1px] w-10 sm:w-16 bg-[#5B9A3C]/40" />
            </div>

            {/* Main Title matching exact font styling */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1E3D2A] leading-tight tracking-tight">
              Why leading research &amp; <span className="italic font-serif text-[#4E8A32]">pharma buyers partner with us.</span>
            </h2>

            {/* Subtitle paragraph */}
            <p className="text-sm sm:text-base text-[#1E3D2A]/75 mt-2.5 font-light leading-relaxed max-w-2xl mx-auto">
              We build long-term partnerships by delivering consistent quality, regulatory compliance and dependable supply — helping global businesses grow with confidence.
            </p>
          </div>
        </FadeInUp>

        {/* =========================================================================
            MAIN SECTION BODY:
            Left: 5-step numbered list + action buttons
            Center: Circular Petri Dish + Glowing 3D Earth Globe
            Right: Arc/Segmented 3 facility cards + "From our facilities to your markets"
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* -----------------------------------------------------------------------
              LEFT COLUMN: 5 Timeline / Feature Steps & Call-to-Action Buttons
          ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 relative pr-0 sm:pr-4">
            <FadeInLeft className="w-full">
            
            {/* Continuous Vertical Guide Line behind icons */}
            <div className="absolute left-[26px] top-7 bottom-10 w-[1.5px] bg-gradient-to-b from-[#5B9A3C]/50 via-[#8CC63F]/35 to-[#5B9A3C]/10 pointer-events-none" />

            <div className="space-y-4 sm:space-y-5 relative">
              {STEPS.map((step, idx) => {
                const isSelected = activeStep === idx;
                const IconComp = step.icon;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => {
                      setIsPaused(true);
                      setActiveStep(idx);
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`group relative flex items-start gap-4 sm:gap-5 p-3 sm:p-3.5 rounded-2xl transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? 'bg-white/95 shadow-lg shadow-[#1E3D2A]/10 ring-2 ring-[#5B9A3C]/40 border-l-4 border-l-[#5B9A3C] translate-x-2'
                        : 'bg-white/30 hover:bg-white/60 opacity-80 hover:opacity-100 hover:translate-x-1'
                    }`}
                  >
                    {/* Active Pulse Pill Indicator */}
                    {isSelected && (
                      <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#5B9A3C] shadow-md animate-ping" />
                    )}

                    {/* Icon circular badge */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all duration-500 ${
                        isSelected
                          ? 'bg-[#143823] text-[#8CC63F] shadow-lg shadow-[#143823]/30 ring-4 ring-[#8CC63F]/35 scale-110'
                          : 'bg-gradient-to-br from-white via-[#F4F9F1] to-[#E5F1DF] text-[#2E5E3A] border border-[#5B9A3C]/25 shadow-sm group-hover:scale-105 group-hover:border-[#5B9A3C]'
                      }`}>
                        <IconComp className={`w-5 h-5 transition-colors duration-300 ${isSelected ? 'text-[#8CC63F]' : 'text-[#2E5E3A]'}`} />
                      </div>
                    </div>

                    {/* Number + Content */}
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center gap-2.5">
                        <span className={`font-mono text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 ${
                          isSelected ? 'text-[#3A7528]' : 'text-[#669B4D]'
                        }`}>
                          {step.number}
                        </span>
                        <h3 className={`font-serif font-semibold text-base sm:text-lg leading-snug transition-colors duration-300 ${
                          isSelected ? 'text-[#143823] font-bold' : 'text-[#1E3D2A] group-hover:text-[#285A34]'
                        }`}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs sm:text-[13px] text-[#425B4B] leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons Below the 5 Steps */}
            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 pt-3">
              {/* Primary Dark Green Button */}
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1A3825] hover:bg-[#254F34] text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-md shadow-[#1A3825]/20 hover:shadow-lg hover:shadow-[#1A3825]/30 hover:-translate-y-0.5"
              >
                <span>Let's Build a Stronger Partnership</span>
                <ArrowRight className="w-4 h-4 text-[#8CC63F] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Play Button with Action */}
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-medium text-[#1E3D2A]/85 hover:text-[#5B9A3C] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-white border border-[#1E3D2A]/15 shadow-sm flex items-center justify-center text-[#5B9A3C] group-hover:border-[#5B9A3C] group-hover:scale-105 group-hover:shadow transition-all">
                  <Play className="w-3.5 h-3.5 fill-[#5B9A3C] ml-0.5" />
                </span>
                <span>Learn More About Our Capabilities</span>
              </button>
            </div>
            </FadeInLeft>
          </div>

          {/* -----------------------------------------------------------------------
              CENTER & RIGHT VISUAL CLUSTER:
              - Left circle: High-purity white powder in Petri Dish with QUALITY seal
              - Center globe: Glowing translucent green 3D Earth globe with network routes
              - Right fan: 3 Segmented Facility Cards under cursive script header
          ----------------------------------------------------------------------- */}
          <FadeInRight className="lg:col-span-7 relative flex flex-col items-center justify-center mt-8 lg:mt-0">
            
            {/* Top Script Header above Right Cards */}
            <div className="w-full flex justify-end pr-4 sm:pr-8 mb-2 sm:mb-4">
              <div className="inline-block text-right">
                <span className="font-serif italic font-light text-2xl sm:text-3xl text-[#3A6348] tracking-wide block">
                  From our facilities to your markets
                </span>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <div className="w-8 h-[1.5px] bg-[#5B9A3C]/40 rounded-full" />
                  <div className="w-2 h-2 rounded-full border border-[#5B9A3C] bg-white" />
                </div>
              </div>
            </div>

            {/* Interactive Visual Stage */}
            <div className="relative w-full max-w-[680px] h-[380px] sm:h-[420px] lg:h-[440px] flex items-center justify-center">

              {/* 1. CIRCULAR BOTANICAL RAW MATERIAL (Center-Left) */}
              <div className="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-br from-white via-[#F5FAF2] to-[#DDF0D6] shadow-[0_20px_50px_rgba(30,61,42,0.18)] ring-1 ring-[#5B9A3C]/30 group">
                  
                  {/* Outer Glass Rim Glow */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/90 pointer-events-none" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5B9A3C]/10 via-transparent to-white/40 pointer-events-none" />
                  
                  {/* Photo container */}
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-white flex items-center justify-center p-2.5">
                    <img
                      src={tobaccoLeavesImg}
                      alt="Natural Selected Tobacco Leaves Botanical Intermediate Raw Material"
                      className="w-full h-full object-contain scale-105 group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Subtle glass reflection highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#1E3D2A]/10 pointer-events-none rounded-full" />
                  </div>

                  {/* Overlaid Badge: "QUALITY | TRUST | GLOBAL REACH" */}
                  <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 z-30">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/95 backdrop-blur-md border border-[#5B9A3C]/30 shadow-lg shadow-[#1E3D2A]/10 flex flex-col items-center justify-center text-center p-2 group-hover:rotate-6 transition-transform duration-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C] mb-1" />
                      <Sprout className="w-3.5 h-3.5 text-[#5B9A3C] mb-1" />
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-[#1E3D2A] uppercase leading-tight">
                        Quality
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-[#5B9A3C] uppercase leading-tight">
                        Trust
                      </span>
                      <span className="text-[7px] sm:text-[8px] font-mono font-semibold tracking-wider text-[#1E3D2A]/70 uppercase leading-tight">
                        Global Reach
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GLOWING 3D EARTH GLOBE WITH NETWORK ROUTES (Center) */}
              <div className="absolute left-[34%] sm:left-[35%] top-1/2 -translate-y-1/2 z-10 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
                {/* Globe Back Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8CC63F]/25 via-[#5B9A3C]/35 to-[#3D8028]/20 blur-2xl animate-pulse-glow pointer-events-none" />
                
                {/* Globe Container with smooth mask */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_60px_rgba(40,80,45,0.25)] border border-white/60">
                  <img
                    src={globeImg}
                    alt="Global Green Supply Network Globe"
                    className="w-full h-full object-cover scale-110 animate-ken-burns"
                  />
                  {/* Subtle holographic emerald filter overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3D2A]/40 via-[#5B9A3C]/10 to-transparent mix-blend-overlay pointer-events-none" />
                  
                  {/* SVG Animated Glowing Network Arcs & Nodes */}
                  <svg viewBox="0 0 300 300" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Geodesic flight arc 1: India -> Europe */}
                    <path
                      d="M170 145 Q 140 100 110 120"
                      stroke="#8CC63F"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="animate-pulse"
                    />
                    {/* Geodesic flight arc 2: India -> North America */}
                    <path
                      d="M170 145 Q 120 70 70 130"
                      stroke="#A6E22E"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    {/* Geodesic flight arc 3: India -> East Asia */}
                    <path
                      d="M170 145 Q 210 120 240 150"
                      stroke="#8CC63F"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />

                    {/* Glowing Pulse Nodes */}
                    {/* India Origin Hub */}
                    <circle cx="170" cy="145" r="4" fill="#FFFFFF" />
                    <circle cx="170" cy="145" r="7" stroke="#8CC63F" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '170px 145px' }} />
                    
                    {/* Europe Hub */}
                    <circle cx="110" cy="120" r="3" fill="#FFFFFF" />
                    <circle cx="110" cy="120" r="5" stroke="#A6E22E" strokeWidth="1" className="animate-pulse" />

                    {/* North America Hub */}
                    <circle cx="70" cy="130" r="3" fill="#FFFFFF" />
                    <circle cx="70" cy="130" r="5" stroke="#8CC63F" strokeWidth="1" className="animate-pulse" />

                    {/* East Asia Hub */}
                    <circle cx="240" cy="150" r="3" fill="#FFFFFF" />
                    <circle cx="240" cy="150" r="5" stroke="#8CC63F" strokeWidth="1" className="animate-pulse" />
                  </svg>
                </div>
              </div>

              {/* 3. RADIAL FAN SEGMENTED CARDS (Right Side Arc) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 sm:gap-3.5 w-44 sm:w-56 md:w-64">
                
                {/* Card 1: Research & Labs (Top Arc) */}
                <div
                  onClick={() => setSelectedFacility(FACILITY_CARDS[0])}
                  className="group relative h-[105px] sm:h-[115px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white/90 hover:border-[#5B9A3C] transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-x-1"
                >
                  <img
                    src={FACILITY_CARDS[0].img}
                    alt={FACILITY_CARDS[0].title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  
                  {/* Floating Pill Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183925]/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium border border-white/20 shadow-sm group-hover:bg-[#204930] transition-colors">
                      <span className="text-[#8CC63F]">{FACILITY_CARDS[0].icon}</span>
                      <span>{FACILITY_CARDS[0].title}</span>
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

                {/* Card 2: Quality Manufacturing (Middle Arc) */}
                <div
                  onClick={() => setSelectedFacility(FACILITY_CARDS[1])}
                  className="group relative h-[105px] sm:h-[115px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white/90 hover:border-[#5B9A3C] transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-x-1"
                >
                  <img
                    src={FACILITY_CARDS[1].img}
                    alt={FACILITY_CARDS[1].title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  
                  {/* Floating Pill Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183925]/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium border border-white/20 shadow-sm group-hover:bg-[#204930] transition-colors">
                      <span className="text-[#8CC63F]">{FACILITY_CARDS[1].icon}</span>
                      <span>{FACILITY_CARDS[1].title}</span>
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

                {/* Card 3: Global Supply (Bottom Arc) */}
                <div
                  onClick={() => setSelectedFacility(FACILITY_CARDS[2])}
                  className="group relative h-[105px] sm:h-[115px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white/90 hover:border-[#5B9A3C] transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-x-1"
                >
                  <img
                    src={FACILITY_CARDS[2].img}
                    alt={FACILITY_CARDS[2].title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  
                  {/* Floating Pill Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183925]/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium border border-white/20 shadow-sm group-hover:bg-[#204930] transition-colors">
                      <span className="text-[#8CC63F]">{FACILITY_CARDS[2].icon}</span>
                      <span>{FACILITY_CARDS[2].title}</span>
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </FadeInRight>

        </div>

      </div>

      {/* =========================================================================
          FACILITY DETAIL MODAL (Opens when clicking any of the 3 facility cards)
      ========================================================================= */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#5B9A3C]/30 text-[#1E3D2A]">
            
            {/* Modal Image Header */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={selectedFacility.img}
                alt={selectedFacility.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8CC63F] text-[#1E3D2A] text-xs font-mono font-bold uppercase mb-2">
                  {selectedFacility.badgeText}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  {selectedFacility.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                  {selectedFacility.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Specs & Description */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs uppercase font-mono font-semibold tracking-wider text-[#5B9A3C] mb-3">
                  Technical Standards &amp; Validations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedFacility.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAF5] border border-[#1E3D2A]/8 text-xs font-medium text-[#1E3D2A]">
                      <CheckCircle2 className="w-4 h-4 text-[#5B9A3C] flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1E3D2A]/10">
                <Link
                  to="/quality-process"
                  onClick={() => setSelectedFacility(null)}
                  className="text-xs font-mono font-semibold text-[#5B9A3C] hover:underline flex items-center gap-1"
                >
                  <span>Explore full analytical laboratory specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedFacility(null)}
                  className="px-5 py-2.5 rounded-full bg-[#1E3D2A] text-white text-xs font-medium hover:bg-[#2C553B] transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          VIDEO / CAPABILITY MODAL (Opens when clicking "Learn More About Our Capabilities")
      ========================================================================= */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#5B9A3C]/30 text-[#1E3D2A]">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#183825] to-[#254C34] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#8CC63F] uppercase tracking-wider font-semibold">
                  Okhai Technical Capabilities
                </span>
                <h3 className="text-2xl font-serif font-bold mt-1 text-white">
                  State-of-the-Art Extraction &amp; Global Distribution
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Showcase / Interactive Walkthrough */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1E3D2A] border border-[#5B9A3C]/20 shadow-inner flex items-center justify-center">
                <img
                  src={manufacturingImg}
                  alt="Factory Manufacturing Walkthrough"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                
                <div className="relative z-10 text-center max-w-md px-4">
                  <div className="w-16 h-16 rounded-full bg-[#8CC63F] text-[#1E3D2A] mx-auto flex items-center justify-center shadow-lg shadow-[#8CC63F]/30 mb-3 animate-pulse">
                    <Play className="w-6 h-6 fill-[#1E3D2A] ml-1" />
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-white">
                    Virtual Tour: Kasor, Anand Manufacturing Plant
                  </h4>
                  <p className="text-xs text-white/80 mt-1">
                    Watch our automated SS-316L solvent extraction, fractional vacuum distillation, and Class 100,000 cleanroom packaging in action.
                  </p>
                </div>
              </div>

              {/* Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#1E3D2A]/8">
                  <Award className="w-5 h-5 text-[#5B9A3C] mb-2" />
                  <h5 className="text-sm font-serif font-bold text-[#1E3D2A]">GMP &amp; ISO Certified</h5>
                  <p className="text-xs text-[#1E3D2A]/70 mt-1">Rigorous adherence to international cGMP and pharmacopeial standards.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#1E3D2A]/8">
                  <TrendingUp className="w-5 h-5 text-[#5B9A3C] mb-2" />
                  <h5 className="text-sm font-serif font-bold text-[#1E3D2A]">Scale &amp; Capacity</h5>
                  <p className="text-xs text-[#1E3D2A]/70 mt-1">10,000+ liters monthly production capacity with consistent assay purity.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#1E3D2A]/8">
                  <FileCheck2 className="w-5 h-5 text-[#5B9A3C] mb-2" />
                  <h5 className="text-sm font-serif font-bold text-[#1E3D2A]">Complete Dossiers</h5>
                  <p className="text-xs text-[#1E3D2A]/70 mt-1">Full DMF ready documentation, SDS, COA, and export clearance.</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E3D2A]/10">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-6 py-2.5 rounded-full bg-[#1E3D2A] text-white text-xs font-medium hover:bg-[#2A5239] transition-colors"
                >
                  Close Tour
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
