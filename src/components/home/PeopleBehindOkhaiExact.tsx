import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Globe2,
  ShieldCheck,
  Settings,
  ArrowLeft,
  ArrowRight,
  Play,
  X,
  CheckCircle2,
  Award,
  Building2,
  ExternalLink,
  ChevronRight,
  Droplets,
  Layers,
  Leaf
} from 'lucide-react';

import parthImg from '../../assets/images/real-parth-visana.png';
import lakhamanImg from '../../assets/images/real-lakhaman-odedra.jpg';
import satyenImg from '../../assets/images/real-satyen-chudasama.png';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../common/animations';

interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  country: string;
  countryCode: string;
  qualification: string;
  bio: string;
  strength: string;
  img: string;
  rolesHeld: string[];
}

const LEADERS: LeaderProfile[] = [
  {
    id: 'parth-visana',
    name: 'Mr. Parth Visana',
    role: 'Director',
    country: 'INDIA',
    countryCode: '🇮🇳',
    qualification: 'Graduate in Food Processing and Technology (A.D. Patel Institute of Technology)',
    bio: 'Experienced industrialist with an extensive operational background in bulk raw-material supply for the cement industry and the managed processing of treated hazardous chemical waste streams.',
    strength: 'Strategic long-term planning, enterprise governance, and robust financial literacy.',
    img: parthImg,
    rolesHeld: [
      'Founder and Partner, Neja Associates',
      'Founder and Partner, Neja Healthcare Hospitals LLP',
      'Proprietor, Parth Roadways'
    ]
  },
  {
    id: 'lakhaman-odedra',
    name: 'Mr. Lakhaman Odedra',
    role: 'Director',
    country: 'INDIA',
    countryCode: '🇮🇳',
    qualification: 'Bachelor of Arts',
    bio: 'Seasoned commercial leader and authorized signatory for Saurashtra Cement. Brings extensive institutional and agricultural procurement governance as Chairman of the Agricultural Produce Market Committee (APMC).',
    strength: 'Deep-rooted regional agricultural planning, logistical network execution, and operational management.',
    img: lakhamanImg,
    rolesHeld: [
      'Chairman, APMC (Porbandar District)',
      'Authorized Signatory & Transporter, Saurashtra Cement',
      'Founder and Partner, Okhai Enterprise',
      'Founder and Partner, Divine Project & Subh Enterprise'
    ]
  },
  {
    id: 'satyen-chudasama',
    name: 'Mr. Satyen Chudasama',
    role: 'General Manager, Operations',
    country: 'INDIA',
    countryCode: '🇮🇳',
    qualification: 'B.Sc. Chemistry, Post-Diploma in Industrial Safety, Post-Diploma in Environment Technology & Management',
    bio: 'Accomplished chemical operations veteran with over 30 years of hands-on expertise in the chemical processing sector, specializing in dye intermediates, plant engineering, hazardous safety compliance, and regulatory practices.',
    strength: 'Process engineering, occupational safety systems, environmental compliance, and plant scale-up.',
    img: satyenImg,
    rolesHeld: [
      'Over 30 Years Technical Leadership in Hazardous Chemical Manufacturing',
      'Specialized in Pure Nicotine and Soluble Alkaloid Fractional Extraction',
      'Head of Regulatory Compliance, GPCB and Factory Inspectorate Liaison'
    ]
  }
];

const ESTEEMED_PARTNERS = [
  {
    name: 'Saurashtra Cement',
    tagline: 'Building a stronger future',
    icon: <Sprout className="w-4 h-4 text-[#5B9A3C]" />
  },
  {
    name: 'APMC',
    tagline: 'Agriculture & Trade',
    icon: <Layers className="w-4 h-4 text-[#5B9A3C]" />
  },
  {
    name: 'Chemical Industry',
    tagline: 'Global Supply Chain',
    icon: <Settings className="w-4 h-4 text-[#5B9A3C]" />
  },
  {
    name: 'Dye Intermediates',
    tagline: 'Speciality Chemicals',
    icon: <Droplets className="w-4 h-4 text-[#5B9A3C]" />
  },
  {
    name: 'Global Traders',
    tagline: 'International Business',
    icon: <Globe2 className="w-4 h-4 text-[#5B9A3C]" />
  }
];

export const PeopleBehindOkhaiExact: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);

  const totalSlides = 5;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="relative py-8 lg:py-10 bg-transparent text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* =========================================================================
          ATMOSPHERIC WORLD MAP BACKGROUND & GLOWING NETWORK ROUTES
      ========================================================================= */}
      {/* Luminous Green World Map Silhouette in Background */}
      <div className="absolute top-4 left-1/4 right-0 h-[480px] pointer-events-none opacity-30 sm:opacity-40 select-none overflow-hidden">
        <svg viewBox="0 0 1200 600" fill="none" className="w-full h-full text-[#8CC63F]" xmlns="http://www.w3.org/2000/svg">
          {/* North America */}
          <path
            d="M 120,80 Q 200,60 280,110 Q 260,180 200,220 Q 140,240 100,180 Q 80,120 120,80 Z"
            fill="url(#map-green-grad)"
          />
          {/* South America */}
          <path
            d="M 220,240 Q 280,260 270,350 Q 240,440 210,480 Q 180,410 190,320 Z"
            fill="url(#map-green-grad)"
          />
          {/* Europe */}
          <path
            d="M 460,90 Q 560,70 580,130 Q 520,180 470,160 Q 440,120 460,90 Z"
            fill="url(#map-green-grad)"
          />
          {/* Africa */}
          <path
            d="M 470,180 Q 580,170 590,260 Q 560,370 520,410 Q 460,360 450,250 Z"
            fill="url(#map-green-grad)"
          />
          {/* Asia */}
          <path
            d="M 590,80 Q 820,60 920,140 Q 880,250 780,270 Q 690,230 630,160 Z"
            fill="url(#map-green-grad)"
          />
          {/* India Subcontinent Focus */}
          <path
            d="M 680,190 Q 730,195 725,260 Q 700,310 675,250 Z"
            fill="url(#map-green-grad)"
          />
          {/* Australia */}
          <path
            d="M 880,330 Q 980,320 990,390 Q 940,460 870,430 Q 840,370 880,330 Z"
            fill="url(#map-green-grad)"
          />

          {/* Network Arcs */}
          {/* India to Europe */}
          <path d="M 695,245 Q 580,150 510,130" stroke="#5B9A3C" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
          {/* India to North America */}
          <path d="M 695,245 Q 450,60 240,140" stroke="#8CC63F" strokeWidth="1.2" strokeDasharray="3 3" />
          {/* India to East Asia */}
          <path d="M 695,245 Q 780,170 860,190" stroke="#5B9A3C" strokeWidth="1.2" strokeDasharray="4 4" />
          {/* India to Australia */}
          <path d="M 695,245 Q 810,290 910,360" stroke="#8CC63F" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Pulsing Nodes */}
          {/* Gujarat, India (Okhai Origin Hub) */}
          <circle cx="695" cy="245" r="5" fill="#5B9A3C" />
          <circle cx="695" cy="245" r="10" stroke="#8CC63F" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '695px 245px' }} />
          
          <circle cx="510" cy="130" r="3.5" fill="#5B9A3C" />
          <circle cx="240" cy="140" r="3.5" fill="#5B9A3C" />
          <circle cx="860" cy="190" r="3.5" fill="#5B9A3C" />
          <circle cx="910" cy="360" r="3.5" fill="#5B9A3C" />

          <defs>
            <linearGradient id="map-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A2D65B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Botanical Leaf: Near Header */}
      <div className="absolute top-20 left-[28%] sm:left-[24%] w-12 sm:w-16 h-12 sm:h-16 pointer-events-none select-none z-20 animate-float-slow">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full drop-shadow-md">
          <path d="M10,65 C20,30 50,15 75,10 C65,45 45,70 10,65 Z" fill="url(#leaf-head-grad)" />
          <path d="M10,65 Q45,40 75,10" stroke="#2B5720" strokeWidth="1" />
          <defs>
            <linearGradient id="leaf-head-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2E6022" />
              <stop offset="60%" stopColor="#67AB3D" />
              <stop offset="100%" stopColor="#96D44D" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Botanical Foliage: Moved to Upper Side Corner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none select-none z-20 rotate-180 opacity-90">
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-md">
          <path
            d="M110,110 C80,80 75,40 100,10 C120,40 125,85 110,110 Z"
            fill="url(#botanical-partner-top-1)"
          />
          <path d="M110,110 Q95,70 100,10" stroke="#254F1D" strokeWidth="1" />
          <path
            d="M110,110 C80,95 45,95 25,115 C55,125 90,120 110,110 Z"
            fill="url(#botanical-partner-top-2)"
          />
          <path d="M110,110 Q75,105 25,115" stroke="#254F1D" strokeWidth="1" />
          <defs>
            <linearGradient id="botanical-partner-top-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7EBF3F" />
              <stop offset="50%" stopColor="#53962F" />
              <stop offset="100%" stopColor="#254F1D" />
            </linearGradient>
            <linearGradient id="botanical-partner-top-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8CC63F" />
              <stop offset="70%" stopColor="#4A8728" />
              <stop offset="100%" stopColor="#1E3E17" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            TOP SECTION: Eyebrow, Main Title, Subtitle, 3 Value Badges, Script Title
        ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12 sm:mb-16">
          
          {/* Left Column: Heading & Value Badges */}
          <FadeInLeft className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] font-mono font-semibold text-[#5B9A3C]">
                <Sprout className="w-4 h-4 text-[#5B9A3C]" />
                <span>Our Valued Partners</span>
              </div>
              <div className="h-[1px] w-24 bg-gradient-to-r from-[#5B9A3C]/40 to-transparent" />
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-normal text-[#1E3D2A] leading-[1.15] tracking-tight">
              The people behind
              <br />
              Okhai Pharma.
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-[#415C49] leading-relaxed max-w-xl font-normal">
              We are proud to work with trusted partners and experienced professionals who share our vision for a healthier, safer and more sustainable tomorrow.
            </p>

            {/* 3 Horizontal Value Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              {/* Badge 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#5B9A3C]/20 shadow-sm flex items-center justify-center text-[#5B9A3C]">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">Strong Partnerships</h4>
                  <p className="text-[11px] text-[#415C49]/80 font-medium">Built on Trust</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#5B9A3C]/20 shadow-sm flex items-center justify-center text-[#5B9A3C]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">Global Network</h4>
                  <p className="text-[11px] text-[#415C49]/80 font-medium">Stronger Together</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#5B9A3C]/20 shadow-sm flex items-center justify-center text-[#5B9A3C]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">Shared Vision</h4>
                  <p className="text-[11px] text-[#415C49]/80 font-medium">A Healthier Future</p>
                </div>
              </div>
            </div>
          </FadeInLeft>

          {/* Right Column: Cursive Script Branding */}
          <FadeInRight className="lg:text-right pt-2 lg:pt-6">
            <span className="font-serif italic font-light text-2xl sm:text-3xl lg:text-4xl text-[#3A6348] tracking-wide block">
              Global Partnerships
            </span>
            <span className="font-serif italic font-light text-xl sm:text-2xl lg:text-3xl text-[#4A7A57] tracking-wide block mt-1">
              for a Healthier Tomorrow
            </span>
            <div className="flex items-center justify-start lg:justify-end gap-1.5 mt-2">
              <div className="w-12 h-[1.5px] bg-[#5B9A3C]/40 rounded-full" />
              <div className="w-2 h-2 rounded-full border border-[#5B9A3C] bg-white" />
            </div>
          </FadeInRight>

        </div>

        {/* =========================================================================
            MAIN CAROUSEL ROW:
            - Left Pod: "Our Partners Our Strength" + 01/05 controls
            - 3 Leader Profile Cards: Mr. Parth Visana, Mr. Lakhaman Odedra, Mr. Satyen Chudasama
            - Right Card: "Building Stronger Partnerships Worldwide"
        ========================================================================= */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          
          {/* -----------------------------------------------------------------------
              FAR LEFT DARK GREEN POD BANNER
          ----------------------------------------------------------------------- */}
          <StaggerItem className="h-full flex flex-col">
            <div className="rounded-[28px] bg-gradient-to-br from-[#163520] via-[#1A3825] to-[#122A1A] p-5 sm:p-6 text-white relative overflow-hidden shadow-lg flex flex-col justify-between h-full">
              {/* Background Botanical Silhouette */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#8CC63F]">
                  <path d="M10,80 Q50,10 90,10 Q90,60 10,80 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8CC63F]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Top Text Content */}
              <div className="relative z-10">
                <span className="font-serif italic font-light text-2xl sm:text-3xl text-[#CDE6B8] block leading-tight">
                  Our Partners
                </span>
                <span className="font-serif italic font-light text-2xl sm:text-3xl text-white block leading-tight mt-0.5">
                  Our Strength
                </span>

                <p className="mt-4 text-xs sm:text-[13px] text-white/75 leading-relaxed font-light">
                  Collaborating with industry leaders, we create value across the globe.
                </p>
              </div>

              {/* Bottom Controls / Pagination */}
              <div className="relative z-10 pt-5 flex items-center justify-between border-t border-white/10 mt-6">
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#8CC63F]">
                  <span>0{currentIndex + 1}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">0{totalSlides}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all active:scale-95"
                    aria-label="Previous profile"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all active:scale-95"
                    aria-label="Next profile"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* -----------------------------------------------------------------------
              LEADER PROFILE CARD 1: Mr. Parth Visana
          ----------------------------------------------------------------------- */}
          <StaggerItem className="h-full flex flex-col">
            <div
              onClick={() => setSelectedLeader(LEADERS[0])}
              className="rounded-[28px] bg-white border border-[#1E3D2A]/10 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full"
            >
            <div>
              {/* Circular Portrait with Glowing Halo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3.5">
                <div className="absolute inset-0 rounded-full bg-[#8CC63F]/25 blur-md group-hover:blur-lg transition-all" />
                <div className="relative w-full h-full rounded-full overflow-hidden p-1 bg-gradient-to-br from-white via-[#EBF3E5] to-[#CDE6B8] ring-2 ring-[#5B9A3C]/30 shadow-sm">
                  <img
                    src={LEADERS[0].img}
                    alt={LEADERS[0].name}
                    className="w-full h-full rounded-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Botanical Corner Leaf Badge matching Leadership page */}
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[#5B9A3C] border border-[#5B9A3C]/30 z-10">
                  <Leaf className="w-3 h-3" />
                </div>
              </div>

              {/* Country Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#5B9A3C] uppercase mb-1">
                <span>{LEADERS[0].countryCode}</span>
                <span>{LEADERS[0].country}</span>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-serif font-bold text-[#1E3D2A] text-center group-hover:text-[#285A34] transition-colors leading-snug">
                {LEADERS[0].name}
              </h3>
              <p className="text-xs font-mono font-semibold text-[#5B9A3C] text-center mt-0.5">
                {LEADERS[0].role}
              </p>

              {/* Qualification */}
              <p className="text-[11px] text-[#1E3D2A]/60 italic text-center mt-1.5 leading-snug">
                {LEADERS[0].qualification}
              </p>

              {/* Bio */}
              <p className="text-xs text-[#3E5646] mt-2.5 leading-relaxed font-normal">
                {LEADERS[0].bio}
              </p>
            </div>

            {/* Core Strength Bottom Highlight */}
            <div className="mt-4 pt-3 border-t border-[#1E3D2A]/10">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D2A]">
                <Settings className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Core Strength</span>
              </div>
              <p className="text-[11px] text-[#415C49] mt-1 leading-relaxed">
                {LEADERS[0].strength}
              </p>
            </div>
          </div>
          </StaggerItem>

          {/* -----------------------------------------------------------------------
              LEADER PROFILE CARD 2: Mr. Lakhaman Odedra
          ----------------------------------------------------------------------- */}
          <StaggerItem className="h-full flex flex-col">
          <div
            onClick={() => setSelectedLeader(LEADERS[1])}
            className="rounded-[28px] bg-white border border-[#1E3D2A]/10 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full"
          >
            <div>
              {/* Circular Portrait with Glowing Halo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3.5">
                <div className="absolute inset-0 rounded-full bg-[#8CC63F]/25 blur-md group-hover:blur-lg transition-all" />
                <div className="relative w-full h-full rounded-full overflow-hidden p-1 bg-gradient-to-br from-white via-[#EBF3E5] to-[#CDE6B8] ring-2 ring-[#5B9A3C]/30 shadow-sm">
                  <img
                    src={LEADERS[1].img}
                    alt={LEADERS[1].name}
                    className="w-full h-full rounded-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Botanical Corner Leaf Badge matching Leadership page */}
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[#5B9A3C] border border-[#5B9A3C]/30 z-10">
                  <Leaf className="w-3 h-3" />
                </div>
              </div>

              {/* Country Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#5B9A3C] uppercase mb-1">
                <span>{LEADERS[1].countryCode}</span>
                <span>{LEADERS[1].country}</span>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-serif font-bold text-[#1E3D2A] text-center group-hover:text-[#285A34] transition-colors leading-snug">
                {LEADERS[1].name}
              </h3>
              <p className="text-xs font-mono font-semibold text-[#5B9A3C] text-center mt-0.5">
                {LEADERS[1].role}
              </p>

              {/* Qualification */}
              <p className="text-[11px] text-[#1E3D2A]/60 italic text-center mt-1.5 leading-snug">
                {LEADERS[1].qualification}
              </p>

              {/* Bio */}
              <p className="text-xs text-[#3E5646] mt-2.5 leading-relaxed font-normal">
                {LEADERS[1].bio}
              </p>
            </div>

            {/* Core Strength Bottom Highlight */}
            <div className="mt-4 pt-3 border-t border-[#1E3D2A]/10">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D2A]">
                <Settings className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Core Strength</span>
              </div>
              <p className="text-[11px] text-[#415C49] mt-1 leading-relaxed">
                {LEADERS[1].strength}
              </p>
            </div>
          </div>
          </StaggerItem>

          {/* -----------------------------------------------------------------------
              LEADER PROFILE CARD 3: Mr. Satyen Chudasama
          ----------------------------------------------------------------------- */}
          <StaggerItem className="h-full flex flex-col">
          <div
            onClick={() => setSelectedLeader(LEADERS[2])}
            className="rounded-[28px] bg-white border border-[#1E3D2A]/10 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full"
          >
            <div>
              {/* Circular Portrait with Glowing Halo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3.5">
                <div className="absolute inset-0 rounded-full bg-[#8CC63F]/25 blur-md group-hover:blur-lg transition-all" />
                <div className="relative w-full h-full rounded-full overflow-hidden p-1 bg-gradient-to-br from-white via-[#EBF3E5] to-[#CDE6B8] ring-2 ring-[#5B9A3C]/30 shadow-sm">
                  <img
                    src={LEADERS[2].img}
                    alt={LEADERS[2].name}
                    className="w-full h-full rounded-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Botanical Corner Leaf Badge matching Leadership page */}
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[#5B9A3C] border border-[#5B9A3C]/30 z-10">
                  <Leaf className="w-3 h-3" />
                </div>
              </div>

              {/* Country Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#5B9A3C] uppercase mb-1">
                <span>{LEADERS[2].countryCode}</span>
                <span>{LEADERS[2].country}</span>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-serif font-bold text-[#1E3D2A] text-center group-hover:text-[#285A34] transition-colors leading-snug">
                {LEADERS[2].name}
              </h3>
              <p className="text-xs font-mono font-semibold text-[#5B9A3C] text-center mt-0.5">
                {LEADERS[2].role}
              </p>

              {/* Qualification */}
              <p className="text-[11px] text-[#1E3D2A]/60 italic text-center mt-1.5 leading-snug">
                {LEADERS[2].qualification}
              </p>

              {/* Bio */}
              <p className="text-xs text-[#3E5646] mt-2.5 leading-relaxed font-normal">
                {LEADERS[2].bio}
              </p>
            </div>

            {/* Core Strength Bottom Highlight */}
            <div className="mt-4 pt-3 border-t border-[#1E3D2A]/10">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D2A]">
                <Settings className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Core Strength</span>
              </div>
              <p className="text-[11px] text-[#415C49] mt-1 leading-relaxed">
                {LEADERS[2].strength}
              </p>
            </div>
          </div>
          </StaggerItem>

        </StaggerContainer>



      </div>

      {/* =========================================================================
          LEADER FULL PROFILE MODAL (Opens on card click)
      ========================================================================= */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#5B9A3C]/30 text-[#1E3D2A]">
            
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-[#183825] to-[#254C34] text-white flex items-center gap-5">
              <img
                src={selectedLeader.img}
                alt={selectedLeader.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top border-2 border-[#8CC63F] shadow-lg flex-shrink-0"
              />
              <div className="flex-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8CC63F] font-semibold">
                  {selectedLeader.countryCode} {selectedLeader.country} · {selectedLeader.role}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white leading-tight mt-1">
                  {selectedLeader.name}
                </h3>
                <p className="text-xs text-white/80 italic mt-1">
                  {selectedLeader.qualification}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h4 className="text-xs uppercase font-mono font-semibold tracking-wider text-[#5B9A3C] mb-2">
                  Executive Background
                </h4>
                <p className="text-xs sm:text-sm text-[#3E5646] leading-relaxed">
                  {selectedLeader.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono font-semibold tracking-wider text-[#5B9A3C] mb-2">
                  Key Institutional &amp; Industry Positions
                </h4>
                <div className="space-y-2">
                  {selectedLeader.rolesHeld.map((role) => (
                    <div key={role} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8FAF5] border border-[#1E3D2A]/8 text-xs font-medium text-[#1E3D2A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5B9A3C] flex-shrink-0" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EBF4E5] border border-[#5B9A3C]/30 text-xs text-[#1E3D2A]">
                <span className="font-bold">Core Strength: </span>
                {selectedLeader.strength}
              </div>

              <div className="flex items-center justify-end pt-3 border-t border-[#1E3D2A]/10">
                <button
                  type="button"
                  onClick={() => setSelectedLeader(null)}
                  className="px-6 py-2 rounded-full bg-[#1E3D2A] text-white text-xs font-medium hover:bg-[#2A5239] transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
