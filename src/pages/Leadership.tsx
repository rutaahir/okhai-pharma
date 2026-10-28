import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Play,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sprout,
  Lightbulb,
  Handshake,
  Building2,
  CheckCircle2,
  Award,
  X,
  MapPin,
  GraduationCap,
  Briefcase
} from 'lucide-react';

import realFactoryImg from '../assets/images/real-factory-exterior.jpg';
import parthImg from '../assets/images/real-parth-visana.png';
import lakhamanImg from '../assets/images/real-lakhaman-odedra.jpg';
import satyenImg from '../assets/images/real-satyen-chudasama.png';
import heroFacilityImg from '../assets/images/about-hero-facility.jpg';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { FadeInLeft, FadeInRight, FadeInUp, StaggerContainer, StaggerItem } from '../components/common/animations';
import { COMPANY_DETAILS } from '../data/companyData';

interface LeaderData {
  id: string;
  num: string;
  name: string;
  role: string;
  bio: string;
  qualification: string;
  strengths: string;
  rolesHeld: string[];
  img: string;
}

const LEADERS: LeaderData[] = [
  {
    id: 'parth-visana',
    num: '01',
    name: 'Mr. Parth Visana',
    role: 'Director',
    bio: 'With expertise in food processing and technology, he brings industrial excellence and strategic direction to Okhai Pharma.',
    qualification: 'Graduate in Food Processing & Technology (A.D. Patel Institute of Technology)',
    strengths: 'Strategic enterprise planning, corporate governance, and capital allocation.',
    rolesHeld: [
      'Founder and Partner, Neja Associates',
      'Founder and Partner, Neja Healthcare Hospitals LLP',
      'Proprietor, Parth Roadways'
    ],
    img: parthImg
  },
  {
    id: 'lakhaman-odedra',
    num: '02',
    name: 'Mr. Lakhaman Odedra',
    role: 'Director',
    bio: 'A seasoned leader with deep industry knowledge and a strong focus on growth, innovation and operational excellence.',
    qualification: 'Veteran Industrialist & Agricultural Commodity Governance Specialist',
    strengths: 'Raw material procurement network, corporate partnerships, and operational governance.',
    rolesHeld: [
      'Director, Okhai Pharma Intermediates Pvt. Ltd.',
      'Extensive leadership in agricultural market governance'
    ],
    img: lakhamanImg
  },
  {
    id: 'satyen-chudasama',
    num: '03',
    name: 'Mr. Satyen Chudasama',
    role: 'General Manager, Operations',
    bio: 'Brings over 30 years of hands-on experience in chemical processing, plant operations and regulatory compliance.',
    qualification: 'B.Sc. Chemistry & Diploma in Chemical Technology',
    strengths: 'Fractional distillation, continuous extraction suites, and environmental compliance.',
    rolesHeld: [
      'Over three decades of technical plant operations across Gujarat chemical belts',
      'Specialist in dangerous goods protocols and cGMP processing standards'
    ],
    img: satyenImg
  }
];

export const Leadership: React.FC = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<LeaderData | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFBF8] text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">

      {/* =========================================================================
          1. HERO SECTION: "The visionaries behind Okhai. Three partners. One purpose."
      ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5]">
        
        {/* Ambient Radial Botanical Lighting */}
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
          
          {/* Cursive Signature Top Right (Matching Exact Mockup) */}
          <div className="flex justify-end mb-2 sm:mb-4">
            <span className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#3A6B48] leading-tight select-none">
              Together for a Healthier Tomorrow
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Eyebrow, Main Heading, Subtitle & 3 Pill Badges */}
            <FadeInLeft className="lg:col-span-5">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                  Our Leadership
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-medium text-[#1E3D2A] leading-[1.12] tracking-tight">
                The visionaries
                <br />
                behind Okhai.
              </h1>

              {/* Subtitle in Green Serif Italic */}
              <p className="font-serif italic text-xl sm:text-2xl text-[#3B7347] mt-3">
                Three partners. One purpose.
              </p>

              {/* Descriptive Paragraph */}
              <p className="mt-5 text-sm sm:text-[15px] text-[#1E3D2A]/80 leading-relaxed font-light max-w-lg">
                With shared values, deep industry expertise and a long-term vision, our leadership team drives Okhai Pharma towards continued growth, innovation and global excellence.
              </p>

              {/* 3 Circular Pill Badges Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#5B9A3C]/25 shadow-xs text-xs text-[#1E3D2A]">
                  <div className="w-5 h-5 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C]">
                    <Leaf className="w-3 h-3" />
                  </div>
                  <span className="font-medium">Integrity in Action</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#5B9A3C]/25 shadow-xs text-xs text-[#1E3D2A]">
                  <div className="w-5 h-5 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C]">
                    <Handshake className="w-3 h-3" />
                  </div>
                  <span className="font-medium">Long Term Partnerships</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#5B9A3C]/25 shadow-xs text-xs text-[#1E3D2A]">
                  <div className="w-5 h-5 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C]">
                    <Globe2 className="w-3 h-3" />
                  </div>
                  <span className="font-medium">Global Mindset</span>
                </div>

              </div>

            </FadeInLeft>

            {/* Right Column: 3 Circular Portrait Nodes with Glowing Halo Rings & Leaf Accents */}
            <FadeInRight className="lg:col-span-7 relative">
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-start relative">
                
                {LEADERS.map((leader) => (
                  <StaggerItem key={leader.id}>
                    <div
                      onClick={() => setSelectedLeader(leader)}
                      className="flex flex-col items-center text-center group cursor-pointer"
                    >
                      
                      {/* Portrait Frame with Halo Gradient Ring */}
                      <div className="relative mb-4">
                        
                        {/* Outer Glowing Halo Ring */}
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#8CC63F]/40 via-[#5B9A3C]/20 to-transparent blur-md group-hover:blur-lg transition-all" />
                        
                        {/* Portrait Container */}
                        <div className="relative w-36 h-36 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-[#5B9A3C]/40 bg-[#EAF2E5] shadow-xl group-hover:scale-105 group-hover:border-[#5B9A3C] transition-all duration-300">
                          <img
                            src={leader.img}
                            alt={leader.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
                          />
                        </div>

                        {/* Small Corner Botanical Leaf Indicator */}
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[#5B9A3C] border border-[#5B9A3C]/30">
                          <Leaf className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-base sm:text-[17px] font-serif font-bold text-[#1E3D2A] mt-1 group-hover:text-[#5B9A3C] transition-colors leading-tight">
                        {leader.name}
                      </h3>

                      {/* Role */}
                      <span className="text-xs font-mono font-medium text-[#5B9A3C] mt-1 block">
                        {leader.role}
                      </span>

                      {/* Short Bio */}
                      <p className="text-xs text-[#1E3D2A]/75 leading-relaxed font-light mt-2 max-w-[220px]">
                        {leader.bio}
                      </p>

                      <span className="mt-2 text-[11px] font-mono font-semibold text-[#5B9A3C] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>View Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>

                    </div>
                  </StaggerItem>
                ))}

              </StaggerContainer>

            </FadeInRight>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. WHY OKHAI PHARMA: Asymmetrical Real Factory Card + "Built on Trust" 4 Pillars
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Asymmetrical Real Factory Building Card with Stamped Text & Video Button */}
              <div className="lg:col-span-6 relative">
                
                <div className="relative rounded-3xl overflow-hidden border border-[#5B9A3C]/20 shadow-2xl aspect-[16/11] group">
                  <img
                    src={realFactoryImg}
                    alt="Okhai Pharma Manufacturing Facility Gujarat"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                  {/* Top-Right Floating Leaf Accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 pointer-events-none opacity-85 select-none">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path d="M5,35 Q20,5 35,5 Q35,25 5,35 Z" fill="#5B9A3C" />
                    </svg>
                  </div>

                  {/* Bottom Left: Cursive Stamped "Quality Builds Trust" */}
                  <div className="absolute bottom-5 left-5 text-left select-none">
                    <span className="font-serif italic text-2xl sm:text-3xl text-white/95 leading-tight drop-shadow-lg block">
                      Quality
                      <br />
                      Builds
                      <br />
                      Trust
                    </span>
                  </div>

                  {/* Bottom Right: Interactive "Our Journey / Watch Video" Play Button */}
                  <div className="absolute bottom-5 right-5">
                    <button
                      type="button"
                      onClick={() => setShowVideoModal(true)}
                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-lg text-[#1E3D2A] hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#5B9A3C] text-white flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-bold leading-tight">Our Journey</span>
                        <span className="block text-[10px] font-mono text-[#1E3D2A]/60">Watch Video</span>
                      </div>
                    </button>
                  </div>

                </div>

              </div>

              {/* Right Column: "WHY OKHAI PHARMA" & "Built on Trust. Driven by Values." + 4 Pillars */}
              <div className="lg:col-span-6">
                
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Why Okhai Pharma
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium text-[#1E3D2A] leading-[1.18] tracking-tight">
                  Built on Trust.
                  <br />
                  Driven by Values.
                </h2>

                <p className="mt-4 text-sm sm:text-[15px] text-[#1E3D2A]/80 leading-relaxed font-light">
                  Our values are the foundation of everything we do, shaping our culture, decisions and long-term relationships.
                </p>

                {/* 4 Pillars Grid (Matching Mockup exactly) */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  
                  {/* Pillar 1: Quality */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-md hover:border-[#5B9A3C]/40 transition-all flex flex-col items-center justify-center group">
                    <div className="w-10 h-10 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-2 group-hover:bg-[#5B9A3C] group-hover:text-white transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-serif font-bold text-[#1E3D2A] leading-tight">Quality</h4>
                    <span className="text-[10px] font-mono text-[#5B9A3C] mt-1 block">Never Compromised</span>
                  </div>

                  {/* Pillar 2: Integrity */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-md hover:border-[#5B9A3C]/40 transition-all flex flex-col items-center justify-center group">
                    <div className="w-10 h-10 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-2 group-hover:bg-[#5B9A3C] group-hover:text-white transition-colors">
                      <Handshake className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-serif font-bold text-[#1E3D2A] leading-tight">Integrity</h4>
                    <span className="text-[10px] font-mono text-[#5B9A3C] mt-1 block">In Every Deal</span>
                  </div>

                  {/* Pillar 3: Innovation */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-md hover:border-[#5B9A3C]/40 transition-all flex flex-col items-center justify-center group">
                    <div className="w-10 h-10 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-2 group-hover:bg-[#5B9A3C] group-hover:text-white transition-colors">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-serif font-bold text-[#1E3D2A] leading-tight">Innovation</h4>
                    <span className="text-[10px] font-mono text-[#5B9A3C] mt-1 block">For a Better Tomorrow</span>
                  </div>

                  {/* Pillar 4: Sustainability */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-md hover:border-[#5B9A3C]/40 transition-all flex flex-col items-center justify-center group">
                    <div className="w-10 h-10 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-2 group-hover:bg-[#5B9A3C] group-hover:text-white transition-colors">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-serif font-bold text-[#1E3D2A] leading-tight">Sustainability</h4>
                    <span className="text-[10px] font-mono text-[#5B9A3C] mt-1 block">For Future Generations</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          3. DIRECTORATE PHILOSOPHY & 3 FROSTED GLASS LEADER CARDS (Deep Forest Theme)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#133220] via-[#0E2618] to-[#07160D] text-white overflow-hidden border-t border-[#8CC63F]/20">
          
          {/* Ambient Emerald Lighting */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[450px] bg-[#5B9A3C]/12 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Big Quotes, Philosophy Statement, Directorate Signature */}
              <div className="lg:col-span-5">
                
                {/* Large Decorative Quotes */}
                <div className="text-4xl sm:text-5xl font-serif text-[#8CC63F] leading-none mb-4 select-none opacity-90">
                  “
                </div>

                <blockquote className="text-lg sm:text-xl lg:text-[22px] font-serif italic text-white/95 leading-relaxed font-light">
                  "Industrial excellence in specialized chemical intermediate manufacturing requires unbending discipline: respect for safety, uncompromising verification of the chromatography bench, and transparent long-term relationships with every global client."
                </blockquote>

                <div className="mt-8 flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-[#8CC63F]" />
                  <span className="text-xs uppercase tracking-widest font-mono font-semibold text-[#8CC63F]">
                    Okhai Pharma Directorate
                  </span>
                </div>

              </div>

              {/* Right Column: 3 Frosted Glass Angled Leader Portrait Cards */}
              <div className="lg:col-span-7">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {LEADERS.map((leader) => (
                    <div
                      key={leader.id}
                      onClick={() => setSelectedLeader(leader)}
                      className="group cursor-pointer rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-3 shadow-xl hover:bg-white/15 hover:border-[#8CC63F]/50 transition-all duration-300 flex flex-col"
                    >
                      {/* Photo */}
                      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#1E3D2A] mb-3">
                        <img
                          src={leader.img}
                          alt={leader.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-106"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Card Label */}
                      <div className="px-1 pb-1">
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-white group-hover:text-[#8CC63F] transition-colors leading-tight">
                          {leader.name}
                        </h4>
                        <span className="text-[10px] font-mono text-white/70 block mt-0.5 truncate">
                          {leader.role}
                        </span>
                      </div>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          4. "LET'S BUILD TOGETHER": "Partner with us for a healthier future."
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading, Subtitle & Get in Touch Button */}
              <div className="lg:col-span-5">
                
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Let's Build Together
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium text-[#1E3D2A] leading-tight">
                  Partner with us
                  <br />
                  for a healthier future.
                </h2>

                <p className="mt-4 text-xs sm:text-sm text-[#1E3D2A]/75 leading-relaxed font-light">
                  We welcome collaborations, partnerships and long-term relationships with clients, suppliers and stakeholders across the globe.
                </p>

                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg hover:scale-102"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Stadium / Eye-Shaped Capsule Factory Photo */}
              <div className="lg:col-span-7 relative">
                
                <div className="relative rounded-[40px] sm:rounded-[60px] overflow-hidden border border-[#5B9A3C]/25 shadow-2xl aspect-[16/9] group">
                  <img
                    src={heroFacilityImg}
                    alt="Okhai Pharma Gujarat Facility"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Botanical Foliage */}
                  <div className="absolute -bottom-4 -right-4 w-28 h-28 pointer-events-none select-none">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                      <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.85" stroke="#2D5A3C" strokeWidth="1" />
                      <path d="M10,90 Q50,45 90,10" stroke="#8CC63F" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          5. LEADER DETAIL DOSSIER MODAL (Opens on click)
      ========================================================================= */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#5B9A3C]/30 text-[#1E3D2A]">
            
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#183B27] to-[#0F2618] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8CC63F] bg-white shrink-0">
                  <img src={selectedLeader.img} alt={selectedLeader.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">{selectedLeader.name}</h3>
                  <span className="text-xs font-mono text-[#8CC63F]">{selectedLeader.role}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs sm:text-sm text-[#1E3D2A]/80 max-h-[70vh] overflow-y-auto">
              
              <div>
                <span className="font-semibold text-[#1E3D2A] block mb-1">Executive Profile:</span>
                <p className="leading-relaxed font-light">{selectedLeader.bio}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 flex items-start gap-2.5">
                <GraduationCap className="w-5 h-5 text-[#5B9A3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E3D2A] block text-xs">Academic &amp; Technical Qualification:</span>
                  <p className="text-xs text-[#1E3D2A]/70 mt-0.5">{selectedLeader.qualification}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 flex items-start gap-2.5">
                <Award className="w-5 h-5 text-[#5B9A3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E3D2A] block text-xs">Strategic &amp; Executive Focus:</span>
                  <p className="text-xs text-[#1E3D2A]/70 mt-0.5">{selectedLeader.strengths}</p>
                </div>
              </div>

              {selectedLeader.rolesHeld.length > 0 && (
                <div>
                  <span className="font-semibold text-[#1E3D2A] block mb-2">Directorial &amp; Enterprise Engagements:</span>
                  <ul className="space-y-1.5 text-xs text-[#1E3D2A]/75">
                    {selectedLeader.rolesHeld.map((r, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F8F9F4] border-t border-[#1E3D2A]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                className="px-5 py-2 rounded-full bg-[#1E3D2A] text-white text-xs font-semibold hover:bg-[#2C573C] transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          6. CORPORATE VIDEO MODAL (Opens on 'Watch Video')
      ========================================================================= */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#143521] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#5B9A3C]/30">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#8CC63F]" />
                <h3 className="text-sm font-semibold text-white">
                  Okhai Pharma — Leadership &amp; Manufacturing Journey
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Mockup / Embed Preview */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={realFactoryImg}
                alt="Corporate Overview Video Preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40">
                <div className="w-16 h-16 rounded-full bg-[#5B9A3C] text-white flex items-center justify-center shadow-2xl mb-3">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-serif font-medium text-white">
                  Okhai Pharma Manufacturing Facility, Kasor, Gujarat
                </h4>
                <p className="text-xs text-white/70 max-w-md mt-1">
                  High-capacity extraction, cGMP intermediate synthesis, and analytical validation.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/40 flex items-center justify-between text-xs text-white/70">
              <span>Duration: 2 mins 15 secs · 1080p Full HD</span>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium transition-colors cursor-pointer"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
