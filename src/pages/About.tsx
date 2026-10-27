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
  FlaskConical,
  CheckCircle2,
  Microscope,
  Headphones,
  Award,
  Sparkles,
  MapPin,
  X,
  FileCheck2,
  Atom,
  Clock,
  ExternalLink
} from 'lucide-react';

import heroFacilityImg from '../assets/images/about-hero-facility.jpg';
import scientistImg from '../assets/images/about-story-scientist.jpg';
import reactorsImg from '../assets/images/about-facility-reactors.jpg';
import aerialCampusImg from '../assets/images/about-aerial-campus.jpg';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { FadeInLeft, FadeInRight, FadeInUp, StaggerContainer, StaggerItem, ImageReveal } from '../components/common/animations';
import { COMPANY_DETAILS } from '../data/companyData';

interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const MILESTONES: Milestone[] = [
  {
    year: '2012',
    title: 'Incorporation',
    desc: 'Incorporation of Okhai Pharma Intermediates Pvt. Ltd. in Gujarat, laying foundational research.',
    icon: <Building2 className="w-5 h-5 text-[#2E683A]" />
  },
  {
    year: '2015',
    title: 'Commercial Production',
    desc: 'Commercial production of key pharmaceutical intermediates and pure nicotine begins.',
    icon: <FlaskConical className="w-5 h-5 text-[#2E683A]" />
  },
  {
    year: '2018',
    title: 'Capacity Expansion',
    desc: 'Expanded manufacturing capacity and analytical technology upgradation with automated columns.',
    icon: <Sprout className="w-5 h-5 text-[#2E683A]" />
  },
  {
    year: '2021',
    title: 'Global Export Network',
    desc: 'Strengthened international global presence, container logistics and direct export network.',
    icon: <Handshake className="w-5 h-5 text-[#2E683A]" />
  },
  {
    year: '2024+',
    title: 'Continuous Innovation',
    desc: 'Continuous growth with specialized focus on cGMP adherence, assay purity, and sustainability.',
    icon: <Award className="w-5 h-5 text-[#2E683A]" />
  }
];

export const About: React.FC = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState(4); // Default to latest

  return (
    <div className="min-h-screen bg-[#F9FAF6] text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">

      {/* =========================================================================
          1. HERO SECTION: "Committed to Better Healthcare Worldwide."
      ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5]">
        
        {/* Ambient Radial Botanical Lighting */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#8CC63F]/12 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[350px] bg-[#5B9A3C]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Decorative Floating Botanical Leaves (Left & Foreground) */}
        <div className="absolute top-20 left-4 sm:left-10 w-20 sm:w-28 h-20 sm:h-28 pointer-events-none select-none opacity-85 animate-float-slow">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
            <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" fill="#6EA446" fillOpacity="0.8" stroke="#2D5A3C" strokeWidth="1.2" />
            <path d="M15,85 Q50,45 85,15" stroke="#8CC63F" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Cursive Signature Top Right (Matching Exact Mockup) */}
          <div className="flex justify-end mb-2 sm:mb-4">
            <span className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#3A6B48] leading-tight select-none">
              Quality · Innovation · Global Trust
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Eyebrow, Main Heading, Body & CTAs */}
            <FadeInLeft className="lg:col-span-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                  About Okhai Pharma
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-medium text-[#1E3D2A] leading-[1.12] tracking-tight">
                Committed to
                <br />
                Better Healthcare
                <br />
                <span className="italic font-normal text-[#5B9A3C] font-editorial">Worldwide.</span>
              </h1>

              {/* Subtitle Description */}
              <p className="mt-5 text-sm sm:text-[15px] text-[#1E3D2A]/80 leading-relaxed max-w-xl font-light">
                Okhai Pharma Intermediates Pvt. Ltd. is a trusted manufacturer and supplier of pharmaceutical intermediates, specialty chemicals and fine chemicals, serving global markets with a commitment to quality, innovation and sustainability.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                
                {/* Primary Pill Button */}
                <a
                  href="#our-journey"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-md shadow-[#1E3D2A]/20 hover:shadow-lg hover:scale-102"
                >
                  <span>Our Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Secondary Video Button with Pulsing Play Icon */}
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center gap-3 group text-left cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-full bg-white border border-[#5B9A3C]/35 shadow-md flex items-center justify-center text-[#5B9A3C] group-hover:bg-[#5B9A3C] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#1E3D2A] group-hover:text-[#5B9A3C] transition-colors">
                      Watch Our Story
                    </span>
                    <span className="block text-[11px] font-mono text-[#1E3D2A]/60">
                      2:15 min
                    </span>
                  </div>
                </button>

              </div>

            </FadeInLeft>

            {/* Right Column: High-Resolution Facility Showcase Card with Location Badge */}
            <FadeInRight className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#5B9A3C]/20 shadow-2xl shadow-[#1E3D2A]/15 aspect-[16/11] group">
                <img
                  src={heroFacilityImg}
                  alt="Okhai Pharma Gujarat Manufacturing Campus"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />
                
                {/* Glassmorphic Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                {/* Floating Location Badge (Bottom-Right, exactly as in mockup) */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg text-[#1E3D2A]">
                  <div className="w-7 h-7 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                    <MapPin className="w-4 h-4 text-[#5B9A3C]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold leading-tight">Gujarat, India</span>
                    <span className="block text-[10px] font-mono text-[#1E3D2A]/60">our manufacturing hub</span>
                  </div>
                </div>

              </div>
            </FadeInRight>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. OUR STORY: "A modern chemical manufacturing enterprise rooted in Gujarat."
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Eyebrow, Title, Story & Quote */}
              <div className="lg:col-span-6">
                
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Our Story
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium text-[#1E3D2A] leading-[1.18] tracking-tight">
                  A modern chemical
                  <br />
                  manufacturing enterprise
                  <br />
                  rooted in Gujarat.
                </h2>

                <p className="mt-5 text-sm sm:text-[15px] text-[#1E3D2A]/80 leading-relaxed font-light">
                  Okhai Pharma Intermediates Pvt. Ltd. is a prominent manufacturer, exporter and supplier of pure and high-quality intermediates, operated by a team of experienced professionals with a shared vision –
                </p>

                {/* Highlighted Quote in Green Italic Serif */}
                <div className="mt-4 pl-4 border-l-2 border-[#5B9A3C]">
                  <p className="text-base sm:text-lg font-serif italic text-[#3B7347] leading-relaxed">
                    "To be a global leader in specialty chemicals and pharmaceutical intermediates."
                  </p>
                </div>

                <div className="mt-8">
                  <a
                    href="#values"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg"
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {/* Right Column: Scientist Lab Photo with Organic Corner Leaf & Attached Dark Metrics Panel */}
              <div className="lg:col-span-6 relative">
                
                {/* Composite Container */}
                <div className="relative flex flex-col sm:flex-row items-center justify-center">
                  
                  {/* Photo Container with Organic Soft Curve */}
                  <div className="relative w-full sm:w-[65%] rounded-3xl overflow-hidden border border-[#5B9A3C]/20 shadow-xl aspect-[4/3] sm:aspect-[4/4.5] z-10 group">
                    <img
                      src={scientistImg}
                      alt="Okhai Pharma Analytical Chemist in Laboratory"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Corner Botanical Foliage Overlay */}
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 pointer-events-none select-none z-20">
                      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                        <path d="M10,90 Q40,10 90,10 Q90,60 10,90 Z" fill="#5B9A3C" fillOpacity="0.85" stroke="#2D5A3C" strokeWidth="1" />
                        <path d="M10,90 Q50,45 90,10" stroke="#8CC63F" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>

                  {/* Attached Dark Forest Green Panel (3 Rows matching mockup) */}
                  <div className="w-full sm:w-[45%] sm:-ml-8 mt-4 sm:mt-0 bg-[#143521] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/10 z-20 flex flex-col justify-between gap-5">
                    
                    {/* Item 1: Quality */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#8CC63F] group-hover:bg-[#8CC63F] group-hover:text-[#143521] transition-all shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">Quality</h4>
                        <p className="text-xs text-white/60 font-light mt-0.5">In Every Step</p>
                      </div>
                    </div>

                    <div className="h-[1px] w-full bg-white/10" />

                    {/* Item 2: Innovation */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#8CC63F] group-hover:bg-[#8CC63F] group-hover:text-[#143521] transition-all shrink-0">
                        <Atom className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">Innovation</h4>
                        <p className="text-xs text-white/60 font-light mt-0.5">In Every Molecule</p>
                      </div>
                    </div>

                    <div className="h-[1px] w-full bg-white/10" />

                    {/* Item 3: Global */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#8CC63F] group-hover:bg-[#8CC63F] group-hover:text-[#143521] transition-all shrink-0">
                        <Globe2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">Global</h4>
                        <p className="text-xs text-white/60 font-light mt-0.5">In Every Market</p>
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
          3. OUR VALUES: "Built on Trust. Driven by Values." (4 White Pill Cards)
      ========================================================================= */}
      <RevealOnScroll>
        <section id="values" className="relative py-14 sm:py-20 bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading & Intro */}
              <div className="lg:col-span-4">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Our Values
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Built on Trust.
                  <br />
                  Driven by Values.
                </h2>

                <p className="mt-4 text-xs sm:text-sm text-[#1E3D2A]/75 leading-relaxed font-light">
                  Our values are the foundation of everything we do, shaping our culture, decisions and long-term relationships.
                </p>
              </div>

              {/* Right Column: 4 White Pill Value Cards */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  
                  {/* Card 1: Quality */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-center border border-[#1E3D2A]/10 shadow-md hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 group flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">Quality</h4>
                    <span className="text-[11px] font-mono text-[#5B9A3C] mt-1 block">Never Compromised</span>
                  </div>

                  {/* Card 2: Integrity */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-center border border-[#1E3D2A]/10 shadow-md hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 group flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all duration-300">
                      <Handshake className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">Integrity</h4>
                    <span className="text-[11px] font-mono text-[#5B9A3C] mt-1 block">In Every Deal</span>
                  </div>

                  {/* Card 3: Innovation */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-center border border-[#1E3D2A]/10 shadow-md hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 group flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all duration-300">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">Innovation</h4>
                    <span className="text-[11px] font-mono text-[#5B9A3C] mt-1 block">For a Better Tomorrow</span>
                  </div>

                  {/* Card 4: Sustainability */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-center border border-[#1E3D2A]/10 shadow-md hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 group flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all duration-300">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1E3D2A] leading-tight">Sustainability</h4>
                    <span className="text-[11px] font-mono text-[#5B9A3C] mt-1 block">For Future Generations</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          4. WHY CHOOSE OKHAI PHARMA: 6 Features Grid & Bioreactors Image Feature
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Eyebrow, Title, 6 Features Grid & Button */}
              <div className="lg:col-span-7">
                
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Why Choose Okhai Pharma
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Why leading institutions
                  <br />
                  choose Okhai Pharma.
                </h2>

                {/* 6 Feature Items (2 Columns of 3) */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
                  
                  {/* Feature 1 */}
                  <div className="flex flex-col items-start gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#2E683A]">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E3D2A] leading-snug">
                        Precision &amp; Innovation
                      </h4>
                      <p className="text-[11px] text-[#1E3D2A]/70 leading-relaxed mt-0.5">
                        Advanced manufacturing with consistent quality.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col items-start gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#2E683A]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E3D2A] leading-snug">
                        Strict Quality Control
                      </h4>
                      <p className="text-[11px] text-[#1E3D2A]/70 leading-relaxed mt-0.5">
                        Rigorous testing at every stage of production.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col items-start gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#2E683A]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E3D2A] leading-snug">
                        Advanced Facility
                      </h4>
                      <p className="text-[11px] text-[#1E3D2A]/70 leading-relaxed mt-0.5">
                        Modern infrastructure with advanced technology.
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex flex-col items-start gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#2E683A]">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E3D2A] leading-snug">
                        Responsive B2B Service
                      </h4>
                      <p className="text-[11px] text-[#1E3D2A]/70 leading-relaxed mt-0.5">
                        Dedicated support for our global partners.
                      </p>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="flex flex-col items-start gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#2E683A]">
                      <Globe2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E3D2A] leading-snug">
                        Global Export Readiness
                      </h4>
                      <p className="text-[11px] text-[#1E3D2A]/70 leading-relaxed mt-0.5">
                        Well-established logistics and documentation support.
                      </p>
                    </div>
                  </div>

                  {/* Feature 6 */}
                  <div className="flex flex-col items-start gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#2E683A]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E3D2A] leading-snug">
                        International Standards
                      </h4>
                      <p className="text-[11px] text-[#1E3D2A]/70 leading-relaxed mt-0.5">
                        Compliant with global regulatory requirements.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Partner With Us Button */}
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg"
                  >
                    <span>Partner With Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Pharmaceutical Reactor Tanks with Floating Capsule Bar */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#5B9A3C]/25 shadow-2xl aspect-[4/3.5] group">
                  <img
                    src={reactorsImg}
                    alt="Stainless Steel Distillation Columns and Reaction Vessels"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Cursive Text Overlay Top-Right */}
                  <div className="absolute top-4 right-4 text-right">
                    <span className="font-serif italic text-lg sm:text-xl text-white/90 drop-shadow-md">
                      Excellence
                      <br />
                      in Every Batch
                    </span>
                  </div>

                  {/* Bottom Floating White Capsule Bar (Matching exact mockup) */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/95 backdrop-blur-md py-2.5 px-4 flex items-center justify-around gap-2 shadow-lg border border-white/80">
                    
                    <div className="flex items-center gap-2 text-center sm:text-left">
                      <div className="w-7 h-7 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                        <FlaskConical className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#1E3D2A]">High Purity Grades</span>
                    </div>

                    <div className="w-[1px] h-6 bg-[#1E3D2A]/15" />

                    <div className="flex items-center gap-2 text-center sm:text-left">
                      <div className="w-7 h-7 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#1E3D2A]">Consistent Quality</span>
                    </div>

                    <div className="w-[1px] h-6 bg-[#1E3D2A]/15 hidden sm:block" />

                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C] shrink-0">
                        <Globe2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#1E3D2A]">Global Supply</span>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          5. OUR JOURNEY: "Key Institutional Milestones." (Timeline Section)
      ========================================================================= */}
      <RevealOnScroll>
        <section id="our-journey" className="relative py-16 sm:py-20 bg-gradient-to-b from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E6] overflow-hidden">
          
          {/* Subtle World Map Contour Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
            <svg viewBox="0 0 1200 600" fill="none" className="w-full h-full text-[#8CC63F]" xmlns="http://www.w3.org/2000/svg">
              <path d="M 120,80 Q 200,60 280,110 Q 260,180 200,220 Q 140,240 100,180 Z" fill="currentColor" />
              <path d="M 500,100 Q 650,80 720,160 Q 680,240 550,220 Z" fill="currentColor" />
              <path d="M 800,150 Q 980,120 1050,240 Q 950,300 820,240 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Header with Cursive Signature Top Right */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Our Journey
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Key Institutional Milestones.
                </h2>
              </div>

              {/* Script Cursive Text with Botanical Leaf */}
              <div className="relative text-right pr-6 select-none">
                <span className="font-serif italic text-2xl sm:text-3xl text-[#3A6B48] leading-tight">
                  Growing
                  <br />
                  Stronger
                  <br />
                  Together
                </span>
                <div className="absolute -top-3 -right-2 w-10 h-10 pointer-events-none opacity-85">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M5,35 Q20,5 35,5 Q35,25 5,35 Z" fill="#5B9A3C" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Horizontal Timeline Track */}
            <div className="relative">
              
              {/* Dotted Connecting Line */}
              <div className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-[2px] border-t-2 border-dashed border-[#5B9A3C]/40 z-0" />

              {/* 5 Milestone Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 relative z-10">
                {MILESTONES.map((item, index) => {
                  const isActive = activeMilestone === index;
                  return (
                    <div
                      key={item.year}
                      onClick={() => setActiveMilestone(index)}
                      className="cursor-pointer group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-white/60 transition-all duration-300"
                    >
                      {/* Milestone Icon Node */}
                      <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${
                        isActive
                          ? 'bg-[#1E3D2A] border-[#8CC63F] text-white scale-110 shadow-[#1E3D2A]/25'
                          : 'bg-white border-[#5B9A3C]/30 text-[#2E683A] group-hover:scale-105 group-hover:border-[#5B9A3C]'
                      }`}>
                        {item.icon}
                      </div>

                      {/* Year */}
                      <span className={`text-base font-serif font-bold mt-3 transition-colors ${
                        isActive ? 'text-[#5B9A3C]' : 'text-[#1E3D2A]'
                      }`}>
                        {item.year}
                      </span>

                      {/* Subtitle */}
                      <p className="text-xs text-[#1E3D2A]/75 leading-relaxed mt-1 font-light max-w-[200px]">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          6. OUR FACILITIES: "State-of-the-Art Manufacturing" (Aerial Campus + Side Card)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtitle & CTA */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Our Facilities
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  State-of-the-Art
                  <br />
                  Manufacturing
                </h2>

                <p className="mt-4 text-xs sm:text-sm text-[#1E3D2A]/75 leading-relaxed font-light">
                  Our modern manufacturing facility in Gujarat is equipped with advanced technology, ensuring consistent quality, safety and environmental responsibility.
                </p>

                <div className="mt-8">
                  <Link
                    to="/quality-process"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg"
                  >
                    <span>Explore Our Facility</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Aerial Campus Photo with Gujarat Pin & Attached Side Spec Card */}
              <div className="lg:col-span-7 relative">
                
                <div className="relative flex flex-col sm:flex-row items-center">
                  
                  {/* Drone Aerial Campus Photo */}
                  <div className="relative w-full sm:w-[75%] rounded-3xl overflow-hidden border border-[#5B9A3C]/20 shadow-xl aspect-[16/10] group z-10">
                    <img
                      src={aerialCampusImg}
                      alt="Modern Aerial Chemical Processing Facility in Gujarat"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Pin Badge on Photo */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono border border-white/20">
                      <MapPin className="w-3.5 h-3.5 text-[#8CC63F]" />
                      <span>Gujarat, India</span>
                    </div>
                  </div>

                  {/* Attached Side Mint Card (4 Rows matching mockup) */}
                  <div className="w-full sm:w-[40%] sm:-ml-8 mt-4 sm:mt-0 bg-[#EAF2E5]/95 backdrop-blur-md text-[#1E3D2A] rounded-2xl p-5 sm:p-6 shadow-xl border border-white z-20 flex flex-col gap-4">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5B9A3C] shadow-xs shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold">Modern Infrastructure</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5B9A3C] shadow-xs shrink-0">
                        <Microscope className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold">Advanced Equipment</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5B9A3C] shadow-xs shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold">Safe &amp; Compliant</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5B9A3C] shadow-xs shrink-0">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold">Environment Focused</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          7. OUR GLOBAL REACH: "From Gujarat to the World" (Light Botanical Theme)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-16 sm:py-24 bg-gradient-to-br from-[#FAFBF8] via-[#F4F8F1] to-[#EAEFE6] text-[#1E3D2A] overflow-hidden border-t border-[#1E3D2A]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          
          {/* Luminous Botanical Radial Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8CC63F]/12 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-0 right-10 w-[450px] h-[320px] bg-[#5B9A3C]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Decorative Corner Foliage */}
          <div className="absolute top-6 left-6 w-24 h-24 pointer-events-none select-none opacity-40 animate-float-slow hidden md:block">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
              <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" fill="#6EA446" fillOpacity="0.4" stroke="#2D5A3C" strokeWidth="1" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading, Subtitle & Button */}
              <div className="lg:col-span-4">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Our Global Reach
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium text-[#1E3D2A] leading-tight">
                  From Gujarat to
                  <br />
                  <span className="italic font-normal text-[#5B9A3C] font-editorial">the World</span>
                </h2>

                <p className="mt-4 text-xs sm:text-sm text-[#1E3D2A]/80 leading-relaxed font-light">
                  We are proud to serve customers across multiple countries, building long-term partnerships based on trust, quality and shared growth.
                </p>

                <div className="mt-8">
                  <Link
                    to="/export"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-xl hover:scale-102 active:scale-98"
                  >
                    <span>View Export Markets</span>
                    <ArrowRight className="w-4 h-4 text-[#8CC63F]" />
                  </Link>
                </div>
              </div>

              {/* Center Map Vector with Radiating Connection Arcs from Gujarat */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                
                <div className="relative w-full aspect-[16/11] max-w-[480px]">
                  
                  {/* World Map Outline SVG */}
                  <svg viewBox="0 0 800 500" fill="none" className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                    {/* North America */}
                    <path d="M 80,70 Q 150,50 200,90 Q 220,160 170,200 Q 110,210 70,160 Z" fill="#6EA446" fillOpacity="0.4" stroke="#5B9A3C" strokeWidth="0.8" strokeOpacity="0.5" />
                    {/* South America */}
                    <path d="M 180,240 Q 240,260 210,360 Q 170,420 150,340 Z" fill="#6EA446" fillOpacity="0.35" stroke="#5B9A3C" strokeWidth="0.8" strokeOpacity="0.5" />
                    {/* Europe */}
                    <path d="M 370,80 Q 450,70 480,120 Q 420,160 360,130 Z" fill="#6EA446" fillOpacity="0.5" stroke="#5B9A3C" strokeWidth="0.8" strokeOpacity="0.5" />
                    {/* Africa */}
                    <path d="M 380,170 Q 480,180 470,290 Q 420,380 370,280 Z" fill="#6EA446" fillOpacity="0.4" stroke="#5B9A3C" strokeWidth="0.8" strokeOpacity="0.5" />
                    {/* Asia */}
                    <path d="M 480,70 Q 650,60 700,160 Q 640,260 520,200 Z" fill="#6EA446" fillOpacity="0.5" stroke="#5B9A3C" strokeWidth="0.8" strokeOpacity="0.5" />
                    {/* Australia */}
                    <path d="M 640,300 Q 720,290 730,360 Q 670,400 630,350 Z" fill="#6EA446" fillOpacity="0.35" stroke="#5B9A3C" strokeWidth="0.8" strokeOpacity="0.5" />

                    {/* Radiating Arcs from Gujarat (approx x: 520, y: 195) */}
                    {/* Arc to Europe */}
                    <path d="M 520,195 Q 460,110 400,110" stroke="#2E683A" strokeWidth="1.8" strokeDasharray="4 4" className="animate-pulse" />
                    {/* Arc to North America */}
                    <path d="M 520,195 Q 320,60 180,110" stroke="#2E683A" strokeWidth="1.8" strokeDasharray="5 5" />
                    {/* Arc to Middle East & Africa */}
                    <path d="M 520,195 Q 460,200 420,230" stroke="#2E683A" strokeWidth="1.5" />
                    {/* Arc to East Asia */}
                    <path d="M 520,195 Q 600,140 680,150" stroke="#2E683A" strokeWidth="1.8" strokeDasharray="4 4" />
                    {/* Arc to Australia */}
                    <path d="M 520,195 Q 600,280 670,330" stroke="#2E683A" strokeWidth="1.5" strokeDasharray="5 5" />
                  </svg>

                  {/* Pulsing Origin Marker on Gujarat */}
                  <div className="absolute top-[40%] left-[64%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-[#5B9A3C]/40 animate-ping absolute" />
                      <span className="w-4 h-4 rounded-full bg-[#2E683A] shadow-md shadow-[#2E683A]/40 relative z-10" />
                    </div>

                    {/* Origin Badge */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-[#1E3D2A] text-[10px] font-mono font-bold shadow-lg border border-[#5B9A3C]/25">
                      <MapPin className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Gujarat, India</span>
                      <span className="text-[9px] text-[#5B9A3C] block font-semibold">(Our Origin)</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column: 3 Metric Cards */}
              <div className="lg:col-span-3 flex flex-col gap-3.5">
                
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xs hover:shadow-md hover:border-[#5B9A3C]/45 hover:bg-white hover:-translate-y-0.5 transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/20 flex items-center justify-center text-[#2E683A] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all shrink-0">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1E3D2A] leading-tight group-hover:text-[#2E683A] transition-colors">Global</h4>
                    <p className="text-xs text-[#1E3D2A]/65 mt-0.5">Markets</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xs hover:shadow-md hover:border-[#5B9A3C]/45 hover:bg-white hover:-translate-y-0.5 transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/20 flex items-center justify-center text-[#2E683A] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all shrink-0">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1E3D2A] leading-tight group-hover:text-[#2E683A] transition-colors">Trusted</h4>
                    <p className="text-xs text-[#1E3D2A]/65 mt-0.5">Partnerships</p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#5B9A3C]/20 shadow-xs hover:shadow-md hover:border-[#5B9A3C]/45 hover:bg-white hover:-translate-y-0.5 transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/20 flex items-center justify-center text-[#2E683A] group-hover:bg-[#1E3D2A] group-hover:text-white transition-all shrink-0">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1E3D2A] leading-tight group-hover:text-[#2E683A] transition-colors">Sustainable</h4>
                    <p className="text-xs text-[#1E3D2A]/65 mt-0.5">Growth</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          8. VIDEO MODAL (Opens on 'Watch Our Story')
      ========================================================================= */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#143521] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#5B9A3C]/30">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#8CC63F]" />
                <h3 className="text-sm font-semibold text-white">
                  Okhai Pharma — Corporate Facility &amp; Extraction Journey (2:15 min)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Mockup / Embed Preview */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={heroFacilityImg}
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
                  Automated fractional distillation columns, cGMP extraction suites, and HPLC quality validation laboratories.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/40 flex items-center justify-between text-xs text-white/70">
              <span>Duration: 2 mins 15 secs · 1080p Full HD</span>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium transition-colors"
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
