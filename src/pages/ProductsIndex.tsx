import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  FileText,
  ArrowRight,
  ShieldCheck,
  Globe2,
  FlaskConical,
  Atom,
  CheckCircle2,
  Pill,
  GraduationCap,
  Droplet,
  Layers,
  Settings2,
  FileDown,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Microscope,
  Activity,
  Calculator,
  Eye,
  Info,
  Wind,
  Droplets,
  Award,
  Box
} from 'lucide-react';

import sulfatePkgImg from '../assets/images/product-nicotine-sulfate-pkg.jpg';
import alkaloidPkgImg from '../assets/images/product-nicotine-alkaloid-pkg.jpg';
import pureNicotinePkgImg from '../assets/images/product-pure-nicotine-pkg.jpg';
import tobaccoLeavesImg from '../assets/images/tobacco-leaves.png';
import labQcImg from '../assets/images/laboratory_qc_chromatography_1792921813996.jpg';
import { RevealOnScroll } from '../components/common/RevealOnScroll';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../components/common/animations';
import { COMPANY_DETAILS } from '../data/companyData';
import { HplcChromatogramModal } from '../components/products/HplcChromatogramModal';
import { CommercialQuoteModal } from '../components/products/CommercialQuoteModal';

export const ProductsIndex: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pharma' | 'research'>('all');
  const [tableTab, setTableTab] = useState<'general' | 'pharmacopeia' | 'logistics'>('general');

  // Modals state
  const [hplcOpen, setHplcOpen] = useState(false);
  const [hplcData, setHplcData] = useState<{ name: string; cas: string; purity: string }>({
    name: 'Nicotine Sulfate 40%',
    cas: '54-11-5 / 65-30-5',
    purity: '99.82%'
  });

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<'Nicotine Sulfate 40%' | 'Nicotine Alkaloid 90%' | 'Nicotine Alkaloid 95%' | 'Pure Nicotine USP/EP 99.5%+'>('Nicotine Sulfate 40%');

  // Interactive molecule hover tooltip
  const [hoveredMoleculePart, setHoveredMoleculePart] = useState<string | null>(null);

  const openHplc = (name: string, cas: string, purity: string) => {
    setHplcData({ name, cas, purity });
    setHplcOpen(true);
  };

  const openQuote = (product: 'Nicotine Sulfate 40%' | 'Nicotine Alkaloid 90%' | 'Nicotine Alkaloid 95%' | 'Pure Nicotine USP/EP 99.5%+') => {
    setQuoteProduct(product);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF8] text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">

      {/* HPLC Chromatogram Modal */}
      <HplcChromatogramModal
        isOpen={hplcOpen}
        onClose={() => setHplcOpen(false)}
        productName={hplcData.name}
        casNumber={hplcData.cas}
        purityScore={hplcData.purity}
      />

      {/* Commercial Quotation Calculator Modal */}
      <CommercialQuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultProduct={quoteProduct}
      />

      {/* =========================================================================
          1. HERO SECTION: "Standardized nicotine intermediates. Chromatographically certified."
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
            
            {/* Left Column: Eyebrow, Main Heading, Subtitle & Filter Pills */}
            <FadeInLeft className="lg:col-span-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                  Our Products
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-medium text-[#1E3D2A] leading-[1.12] tracking-tight">
                Standardized nicotine
                <br />
                intermediates.
                <br />
                <span className="italic font-normal text-[#5B9A3C] font-editorial">Chromatographically certified.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-sm sm:text-[15px] text-[#1E3D2A]/80 leading-relaxed font-light max-w-lg">
                We offer high-purity nicotine intermediates with consistent quality, precise composition and reliable supply for pharmaceutical, NRT and research applications.
              </p>

              {/* Category Filter Tabs with Dynamic Count Badges & Micro-animations */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 p-1.5 bg-white/70 backdrop-blur-md rounded-full border border-[#1E3D2A]/10 shadow-xs max-w-fit">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    filter === 'all'
                      ? 'bg-[#1E3D2A] text-white shadow-md shadow-[#1E3D2A]/25'
                      : 'text-[#1E3D2A]/75 hover:text-[#1E3D2A] hover:bg-white/80'
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${filter === 'all' ? 'text-[#8CC63F]' : 'text-[#5B9A3C]'}`} />
                  <span>All Formulations</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${filter === 'all' ? 'bg-white/20 text-white' : 'bg-[#EAF2E5] text-[#2E683A]'}`}>
                    2
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilter('pharma')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    filter === 'pharma'
                      ? 'bg-[#1E3D2A] text-white shadow-md shadow-[#1E3D2A]/25'
                      : 'text-[#1E3D2A]/75 hover:text-[#1E3D2A] hover:bg-white/80'
                  }`}
                >
                  <FlaskConical className={`w-3.5 h-3.5 ${filter === 'pharma' ? 'text-[#8CC63F]' : 'text-[#5B9A3C]'}`} />
                  <span>Pharma &amp; API Grade</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${filter === 'pharma' ? 'bg-white/20 text-white' : 'bg-[#EAF2E5] text-[#2E683A]'}`}>
                    1
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilter('research')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    filter === 'research'
                      ? 'bg-[#1E3D2A] text-white shadow-md shadow-[#1E3D2A]/25'
                      : 'text-[#1E3D2A]/75 hover:text-[#1E3D2A] hover:bg-white/80'
                  }`}
                >
                  <Atom className={`w-3.5 h-3.5 ${filter === 'research' ? 'text-[#8CC63F]' : 'text-[#5B9A3C]'}`} />
                  <span>Research &amp; Technical</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${filter === 'research' ? 'bg-white/20 text-white' : 'bg-[#EAF2E5] text-[#2E683A]'}`}>
                    1
                  </span>
                </button>
              </div>

            </FadeInLeft>

            {/* Right Column: Analytical HPLC Lab with Crystallization Powder Dish & Interactive Waveform Badge */}
            <FadeInRight className="lg:col-span-6 relative">
              
              <div className="relative rounded-3xl overflow-hidden bg-white/75 backdrop-blur-md border border-[#5B9A3C]/25 shadow-2xl p-6 sm:p-8 flex flex-col items-center">
                
                {/* Background Lab Vignette */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img src={labQcImg} alt="HPLC Analytical Laboratory" className="w-full h-full object-cover" />
                </div>

                {/* Molecular Node SVG Header */}
                <div className="relative z-10 flex items-center justify-between w-full mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C]">
                      <Atom className="w-5 h-5 animate-spin" style={{ animationDuration: '18s' }} />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#5B9A3C] font-semibold">
                      Analytical Validation
                    </span>
                  </div>

                  <span className="text-xs font-mono text-[#1E3D2A]/60">Kasor Lab, Gujarat</span>
                </div>

                {/* Center Glass Dish with White Pure Crystalline Powder & 3D Interactive Specular Glow */}
                <div 
                  onClick={() => openHplc('Nicotine Intermediates', '54-11-5', '99.85%')}
                  className="relative w-56 h-56 sm:w-64 sm:h-64 my-2 group cursor-pointer"
                  title="Click to view interactive HPLC chromatogram trace"
                >
                  {/* Glowing Ambient Halo */}
                  <div className="absolute -inset-3 rounded-full bg-[#8CC63F]/25 blur-xl group-hover:bg-[#8CC63F]/40 transition-all duration-500" />
                  
                  {/* Botanical Raw Material Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/95 shadow-2xl bg-white transition-transform duration-700 group-hover:scale-105 flex items-center justify-center p-3 sm:p-3.5">
                    <img
                      src={tobaccoLeavesImg}
                      alt="Natural Selected Tobacco Leaves Botanical Intermediate Raw Material"
                      className="w-full h-full object-contain scale-105 group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Glass sheen highlight */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none rounded-full" />
                  </div>

                  {/* Corner Leaf Florets */}
                  <div className="absolute -top-2 -left-2 w-10 h-10 pointer-events-none select-none">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path d="M5,35 Q20,5 35,5 Q35,25 5,35 Z" fill="#5B9A3C" />
                    </svg>
                  </div>

                  {/* Hover Inspect Tooltip */}
                  <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#1E3D2A]/90 text-white text-[10px] font-mono backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3 h-3 text-[#8CC63F]" />
                      <span>Inspect Spectrum</span>
                    </span>
                  </div>
                </div>

                {/* Floating Waveform HPLC Quality Pill (Interactive Click Trigger) */}
                <button
                  type="button"
                  onClick={() => openHplc('Nicotine Intermediates', '54-11-5', '99.85%')}
                  className="relative z-10 mt-3 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 hover:bg-white backdrop-blur-md border border-[#5B9A3C]/35 shadow-lg text-[#1E3D2A] hover:border-[#5B9A3C] transition-all cursor-pointer group/pill"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#EAF2E5] group-hover/pill:bg-[#5B9A3C] group-hover/pill:text-white flex items-center justify-center text-[#2E683A] shrink-0 transition-colors">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold leading-tight flex items-center gap-1">
                      Purity 99.5%+
                      <Sparkles className="w-3 h-3 text-[#8CC63F]" />
                    </span>
                    <span className="block text-[10px] font-mono text-[#5B9A3C] group-hover/pill:underline">
                      HPLC Certified · Click to Inspect Trace →
                    </span>
                  </div>
                </button>

              </div>

            </FadeInRight>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. PRODUCT SHOWCASE 1: "Nicotine Sulfate 40%" (Left Dish, Right Details)
      ========================================================================= */}
      {(filter === 'all' || filter === 'pharma') && (
        <RevealOnScroll>
          <section className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden border-b border-[#1E3D2A]/8 animate-fadeIn">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Column: Round Glass Dish with Powder & Botanical Framing */}
                <FadeInLeft className="lg:col-span-5 relative flex items-center justify-center">
                  
                  <div 
                    onClick={() => openHplc('Nicotine Sulfate 40%', '65-30-5', '99.78%')}
                    className="relative w-64 h-64 sm:w-80 sm:h-80 group cursor-pointer"
                    title="Click to view analytical HPLC peak trace for Nicotine Sulfate"
                  >
                    {/* Glowing Green Halo */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#8CC63F]/30 to-transparent blur-2xl group-hover:bg-[#8CC63F]/45 transition-all" />
                    
                    {/* Glass Dish */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-2xl bg-white transition-transform duration-700 group-hover:scale-104 flex items-center justify-center p-8 sm:p-10">
                      <img
                        src={sulfatePkgImg}
                        alt="Pure Nicotine Sulfate 40% Drum and Canister Packaging"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none" />
                    </div>

                    {/* Circular CAS Badge on Top-Right */}
                    <div className="absolute top-2 right-4 w-14 h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#5B9A3C]/30 shadow-lg flex flex-col items-center justify-center text-[#1E3D2A] group-hover:scale-110 transition-transform">
                      <span className="text-[9px] font-mono uppercase text-[#5B9A3C] font-semibold">CAS</span>
                      <span className="text-[11px] font-mono font-bold">65-30-5</span>
                    </div>

                    {/* Fresh Green Tobacco Leaves Framing (Left Edge) */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 pointer-events-none select-none">
                      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-md">
                        <path d="M110,110 C80,80 75,40 100,10 C120,40 125,85 110,110 Z" fill="#6EA446" />
                        <path d="M110,110 Q95,70 100,10" stroke="#2D5A3C" strokeWidth="1" />
                        <path d="M110,110 C80,95 45,95 25,115 C55,125 90,120 110,110 Z" fill="#5B9A3C" />
                        <path d="M110,110 Q75,105 25,115" stroke="#2D5A3C" strokeWidth="1" />
                      </svg>
                    </div>

                    {/* Quick Inspect Pill */}
                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-[#1E3D2A]/90 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-lg">
                        <Activity className="w-3 h-3 text-[#8CC63F]" />
                        <span>Inspect HPLC Trace</span>
                      </span>
                    </div>
                  </div>

                </FadeInLeft>

                {/* Right Column: Specification Details & Key Pillars */}
                <FadeInRight className="lg:col-span-7">
                  
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-xs font-mono font-semibold text-[#1E3D2A] mb-3">
                    <FlaskConical className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Pharma &amp; Research Reagent · CAS 65-30-5 · UN 1658 (PG II)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                    Nicotine Sulfate 40%
                  </h3>

                  {/* 3 Core Badges */}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold">
                      <Droplets className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Water Miscible</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold">
                      <FlaskConical className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Research Reagent</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold">
                      <Box className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>UN-Rated 200L Drums</span>
                    </span>
                  </div>

                  {/* Meta Strip */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-mono text-[#1E3D2A]/70">
                    <span>CAS: 65-30-5</span>
                    <span className="text-[#1E3D2A]/30">|</span>
                    <span>Formula: C₁₀H₁₄N₂ · H₂SO₄</span>
                    <span className="text-[#1E3D2A]/30">|</span>
                    <span className="text-[#5B9A3C] font-semibold">Assay: 40.0% ± 0.5% (w/w)</span>
                  </div>

                  {/* Product Description */}
                  <p className="mt-4 text-sm sm:text-[15px] text-[#1E3D2A]/80 font-light leading-relaxed">
                    High-purity, water-soluble compound specifically formulated for pharmaceutical research, toxicology studies and nicotine replacement therapy (NRT) applications. Produced under strict analytical quality control to guarantee batch-to-batch consistency and high bioavailability.
                  </p>

                  {/* Target Applications */}
                  <div className="mt-5 space-y-2 text-xs text-[#1E3D2A]/75">
                    <span className="font-mono text-[#5B9A3C] uppercase text-[10px] tracking-wider font-semibold block">
                      Target Applications:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>Pharmaceutical research &amp; development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>Nicotine Replacement Therapy (NRT) formulations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>Toxicology and receptor binding studies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>High-purity nicotine intermediate refining</span>
                      </li>
                    </ul>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      to="/products/nicotine-sulfate-40"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors py-2"
                    >
                      <FileText className="w-4 h-4 text-[#5B9A3C]" />
                      <span>View Full Specifications &amp; CoA →</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => openQuote('Nicotine Sulfate 40%')}
                      className="px-5 py-2.5 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#8CC63F]" />
                      <span>Request Quote →</span>
                    </button>
                  </div>

                </FadeInRight>

              </div>

            </div>
          </section>
        </RevealOnScroll>
      )}

      {/* =========================================================================
          3. PRODUCT SHOWCASE 2: "Nicotine Alkaloid 90% / 95%" (Left Details, Right Visual)
      ========================================================================= */}
      {(filter === 'all' || filter === 'research') && (
        <RevealOnScroll>
          <section className="relative py-16 sm:py-24 bg-[#F4F8F1]/70 overflow-hidden border-b border-[#1E3D2A]/8">
            
            {/* Ambient Background Radial Glows */}
            <div className="absolute top-1/2 left-[-120px] w-[500px] h-[500px] bg-[#8CC63F]/12 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-[-100px] w-[450px] h-[450px] bg-[#5B9A3C]/10 rounded-full blur-[110px] pointer-events-none" />

            {/* Subtle Floating Decorative Leaf */}
            <div className="absolute top-8 right-12 w-20 h-20 pointer-events-none select-none opacity-40 animate-float-slow hidden sm:block">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#5B9A3C]">
                <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" fill="#6EA446" fillOpacity="0.4" stroke="#2D5A3C" strokeWidth="1" />
              </svg>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Column: Specification Details & Key Pillars (Order 2 on mobile, Order 1 on Desktop) */}
                <FadeInLeft className="lg:col-span-7 order-2 lg:order-1">
                  
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/35 text-xs font-mono font-semibold text-[#1E3D2A] mb-3.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-ping inline-block" />
                    <Atom className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Active Pharmaceutical Intermediate · CAS 54-11-5 · UN 1654 (PG II)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium text-[#1E3D2A] leading-tight">
                    Nicotine Alkaloid 90% / 95%
                  </h3>

                  {/* 3 Core Badges */}
                  <div className="mt-4 flex flex-wrap gap-2.5 text-xs font-medium">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold hover:border-[#5B9A3C] hover:bg-white hover:scale-102 transition-all shadow-xs">
                      <Atom className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Pharma API Grade</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold hover:border-[#5B9A3C] hover:bg-white hover:scale-102 transition-all shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Low Residue Fraction</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold hover:border-[#5B9A3C] hover:bg-white hover:scale-102 transition-all shadow-xs">
                      <Wind className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Nitrogen Blanket Purged</span>
                    </span>
                  </div>

                  {/* Meta Strip */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-[#1E3D2A]/75 bg-white/40 px-3 py-1.5 rounded-lg border border-[#1E3D2A]/5 max-w-fit">
                    <span>CAS: <strong className="text-[#1E3D2A]">54-11-5</strong></span>
                    <span className="text-[#1E3D2A]/25">|</span>
                    <span>Formula: C₁₀H₁₄N₂</span>
                    <span className="text-[#1E3D2A]/25">|</span>
                    <span className="text-[#2E683A] font-semibold">Assay: 90.0% / 95.0% (min)</span>
                  </div>

                  {/* Product Description */}
                  <p className="mt-4 text-sm sm:text-[15px] text-[#1E3D2A]/85 font-light leading-relaxed">
                    High-concentration natural nicotine alkaloid liquid processed through multi-stage fractional molecular distillation. Suitable for active pharmaceutical ingredient synthesis, transdermal delivery systems, and precision chemical formulation under strict nitrogen blanket control.
                  </p>

                  {/* Target Applications */}
                  <div className="mt-5 space-y-2 text-xs text-[#1E3D2A]/75">
                    <span className="font-mono text-[#5B9A3C] uppercase text-[10px] tracking-wider font-semibold block">
                      Target Applications:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/60 transition-colors">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>Active pharmaceutical ingredient (API) intermediate</span>
                      </li>
                      <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/60 transition-colors">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>Transdermal therapeutic patch synthesis</span>
                      </li>
                      <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/60 transition-colors">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>Controlled delivery formulations &amp; inhaler delivery</span>
                      </li>
                      <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/60 transition-colors">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                        <span>Specialized chemical research &amp; custom synthesis</span>
                      </li>
                    </ul>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="mt-7 flex flex-wrap items-center gap-3.5">
                    <Link
                      to="/products/nicotine-alkaloid-90-95"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-all hover:translate-x-1 py-2"
                    >
                      <FileText className="w-4 h-4 text-[#5B9A3C]" />
                      <span>View Full Specifications &amp; CoA →</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => openQuote('Nicotine Alkaloid 95%')}
                      className="px-6 py-2.5 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-xl hover:scale-102 flex items-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#8CC63F]" />
                      <span>Request Quote →</span>
                    </button>
                  </div>

                </FadeInLeft>

                {/* Right Column: Round Molecular Visual with Halo (Order 1 on mobile, Order 2 on Desktop) */}
                <FadeInRight className="lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center">
                  
                  <div 
                    onClick={() => openHplc('Nicotine Alkaloid 95% API', '54-11-5', '99.88%')}
                    className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-88 lg:h-88 group cursor-pointer"
                    title="Click to view analytical HPLC peak trace for Nicotine Alkaloid"
                  >
                    {/* Glowing Green Halos with Ambient Breath */}
                    <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#8CC63F]/35 via-[#5B9A3C]/20 to-transparent blur-2xl group-hover:bg-[#8CC63F]/55 group-hover:scale-108 transition-all duration-700 animate-pulse" />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8CC63F]/40 to-[#2E683A]/40 blur-md group-hover:blur-lg transition-all" />
                    
                    {/* Glass Dish / Visual */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_20px_60px_rgba(30,61,42,0.18)] bg-white transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_25px_70px_rgba(91,154,60,0.3)] flex items-center justify-center p-8 sm:p-11 lg:p-12">
                      <img
                        src={alkaloidPkgImg}
                        alt="Pure Nicotine Alkaloid Drum and Canister Packaging"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none group-hover:opacity-60 transition-opacity" />
                    </div>

                    {/* Circular CAS Badge on Top-Right */}
                    <div className="absolute top-2 right-4 w-14 h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#5B9A3C]/35 shadow-lg flex flex-col items-center justify-center text-[#1E3D2A] group-hover:scale-110 group-hover:border-[#5B9A3C] transition-transform">
                      <span className="text-[9px] font-mono uppercase text-[#5B9A3C] font-bold">CAS</span>
                      <span className="text-[11px] font-mono font-bold">54-11-5</span>
                    </div>

                    {/* Fresh Green Tobacco Leaves Framing (Right/Bottom Edge) */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none select-none transition-transform duration-700 group-hover:rotate-6 group-hover:scale-105">
                      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-md">
                        <path d="M110,110 C80,80 75,40 100,10 C120,40 125,85 110,110 Z" fill="#6EA446" />
                        <path d="M110,110 Q95,70 100,10" stroke="#2D5A3C" strokeWidth="1" />
                        <path d="M110,110 C80,95 45,95 25,115 C55,125 90,120 110,110 Z" fill="#5B9A3C" />
                        <path d="M110,110 Q75,105 25,115" stroke="#2D5A3C" strokeWidth="1" />
                      </svg>
                    </div>

                    {/* Quick Inspect Pill */}
                    <div className="absolute inset-x-0 bottom-5 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#1E3D2A]/95 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-xl backdrop-blur-sm border border-white/20">
                        <Activity className="w-3.5 h-3.5 text-[#8CC63F] animate-pulse" />
                        <span className="font-semibold">Inspect HPLC Trace</span>
                      </span>
                    </div>
                  </div>

                </FadeInRight>

              </div>

            </div>
          </section>
        </RevealOnScroll>
      )}

      {/* =========================================================================
          4. PRODUCT SHOWCASE 3: "Pure Nicotine USP/EP 99.5%+" (Left Dish, Right Details)
      ========================================================================= */}
      {(filter === 'all' || filter === 'pharma') && (
        <RevealOnScroll>
          <section className="relative py-14 sm:py-20 bg-white overflow-hidden border-b border-[#1E3D2A]/8 animate-fadeIn">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Column: Round Crystal Flask with High-Purity Halo */}
                <FadeInLeft className="lg:col-span-5 relative flex items-center justify-center">
                  
                  <div 
                    onClick={() => openHplc('Pure Nicotine USP/EP 99.5%+', '54-11-5', '99.92%')}
                    className="relative w-64 h-64 sm:w-80 sm:h-80 group cursor-pointer"
                    title="Click to view analytical HPLC peak trace for Pure Nicotine USP/EP"
                  >
                    {/* Glowing Emerald Halo */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#8CC63F]/40 to-[#5B9A3C]/20 blur-2xl group-hover:bg-[#8CC63F]/55 transition-all" />
                    
                    {/* Crystal Vial Visual */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-2xl bg-white transition-transform duration-700 group-hover:scale-104 flex items-center justify-center p-8 sm:p-10">
                      <img
                        src={pureNicotinePkgImg}
                        alt="Pure Nicotine USP/EP 99.5%+ Canister and Bottle Packaging"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
                    </div>

                    {/* Circular USP/EP Badge on Top-Right */}
                    <div className="absolute top-2 right-4 w-14 h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#5B9A3C]/40 shadow-lg flex flex-col items-center justify-center text-[#1E3D2A] group-hover:scale-110 transition-transform">
                      <span className="text-[9px] font-mono uppercase text-[#5B9A3C] font-bold">GRADE</span>
                      <span className="text-[11px] font-mono font-bold text-[#1E3D2A]">USP/EP</span>
                    </div>

                    {/* Fresh Green Tobacco Leaves Framing (Left Edge) */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 pointer-events-none select-none">
                      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-md">
                        <path d="M110,110 C80,80 75,40 100,10 C120,40 125,85 110,110 Z" fill="#6EA446" />
                        <path d="M110,110 Q95,70 100,10" stroke="#2D5A3C" strokeWidth="1" />
                        <path d="M110,110 C80,95 45,95 25,115 C55,125 90,120 110,110 Z" fill="#5B9A3C" />
                        <path d="M110,110 Q75,105 25,115" stroke="#2D5A3C" strokeWidth="1" />
                      </svg>
                    </div>

                    {/* Quick Inspect Pill */}
                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-[#1E3D2A]/90 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-lg">
                        <Activity className="w-3 h-3 text-[#8CC63F]" />
                        <span>Inspect HPLC Trace</span>
                      </span>
                    </div>
                  </div>

                </FadeInLeft>

                {/* Right Column: Specification Details & Key Pillars */}
                <FadeInRight className="lg:col-span-7">
                  
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-xs font-mono font-semibold text-[#1E3D2A] mb-3">
                    <Award className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>USP / EP Compendial Monograph · CAS 54-11-5 · UN 1654 (PG II)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                    Pure Nicotine USP/EP 99.5%+
                  </h3>

                  {/* The 3 Core Badges matching reference: Colorless, Odorless, Stable */}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold">
                      <Droplets className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Colorless</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold">
                      <Wind className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Odorless</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#5B9A3C]/30 text-[#1E3D2A] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>USP/EP Stable</span>
                    </span>
                  </div>

                  {/* Meta Strip */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-mono text-[#1E3D2A]/70">
                    <span>CAS: 54-11-5</span>
                    <span className="text-[#1E3D2A]/30">|</span>
                    <span>Formula: C₁₀H₁₄N₂</span>
                    <span className="text-[#1E3D2A]/30">|</span>
                    <span className="text-[#5B9A3C] font-semibold">Assay: ≥ 99.5% (USP/EP)</span>
                  </div>

                  {/* Product Description */}
                  <p className="mt-4 text-sm sm:text-[15px] text-[#1E3D2A]/80 font-light leading-relaxed">
                    Supernic's Pure Nicotine is colorless and odorless, delivering a neutral base for your formulations. Its unmatched stability guarantees long-term consistency and reliability in every use. Manufactured using the finest tobacco leaves from trusted suppliers, it complies strictly with both USP and EP compendial standards.
                  </p>

                  {/* Target Applications */}
                  <div className="mt-5 space-y-2 text-xs text-[#1E3D2A]/75">
                    <span className="font-mono text-[#5B9A3C] uppercase text-[10px] tracking-wider font-semibold block">
                      Target Applications:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>Nicotine Replacement Therapy (NRT) patches &amp; gums</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>Active Pharmaceutical Ingredient (API) medicines</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>Modern oral pouches requiring zero odor</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                        <span>High-precision analytical chemistry &amp; reference standards</span>
                      </li>
                    </ul>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      to="/products/pure-nicotine-usp-ep-99-5"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors py-2"
                    >
                      <FileText className="w-4 h-4 text-[#5B9A3C]" />
                      <span>View Full Specifications &amp; CoA →</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => openQuote('Pure Nicotine USP/EP 99.5%+')}
                      className="px-5 py-2.5 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#8CC63F]" />
                      <span>Request Quote →</span>
                    </button>
                  </div>

                </FadeInRight>

              </div>

            </div>
          </section>
        </RevealOnScroll>
      )}

      {/* =========================================================================
          4. PRODUCT SPECIFICATIONS & COMPARISON (Interactive Table with Tabs)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Header with Subtitle on Right & Interactive Table Tab Switcher */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                    Technical Comparison
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                  Product Specifications &amp; Comparison
                </h2>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#1E3D2A]/15 shadow-xs">
                <button
                  type="button"
                  onClick={() => setTableTab('general')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    tableTab === 'general'
                      ? 'bg-[#1E3D2A] text-white shadow-xs'
                      : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                  }`}
                >
                  General Assay
                </button>
                <button
                  type="button"
                  onClick={() => setTableTab('pharmacopeia')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    tableTab === 'pharmacopeia'
                      ? 'bg-[#1E3D2A] text-white shadow-xs'
                      : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                  }`}
                >
                  USP / EP Parameters
                </button>
                <button
                  type="button"
                  onClick={() => setTableTab('logistics')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    tableTab === 'logistics'
                      ? 'bg-[#1E3D2A] text-white shadow-xs'
                      : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                  }`}
                >
                  UN Logistics &amp; Transport
                </button>
              </div>
            </div>

            {/* Technical Comparison Table */}
            <div className="rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md border border-[#1E3D2A]/10 shadow-lg animate-fadeIn">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  {/* Table Head */}
                  <thead>
                    <tr className="bg-[#F3F8F0] border-b border-[#1E3D2A]/10 text-[#1E3D2A]">
                      <th className="py-4 px-6 font-mono uppercase text-xs tracking-wider text-[#5B9A3C] font-semibold">Parameter</th>
                      <th className="py-4 px-6 font-serif font-bold text-sm text-[#1E3D2A]">Nicotine Sulfate 40%</th>
                      <th className="py-4 px-6 font-serif font-bold text-sm text-[#1E3D2A]">Nicotine Alkaloid 90%</th>
                      <th className="py-4 px-6 font-serif font-bold text-sm text-[#1E3D2A]">Nicotine Alkaloid 95%</th>
                      <th className="py-4 px-6 font-serif font-bold text-sm text-[#1E3D2A] bg-[#EBF5E5]/60">Pure Nicotine USP/EP 99.5%+</th>
                    </tr>
                  </thead>

                  {/* Dynamic Table Body according to Tab */}
                  <tbody className="divide-y divide-[#1E3D2A]/5 text-[#1E3D2A]/80">
                    {tableTab === 'general' && (
                      <>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">CAS Number</td>
                          <td className="py-3.5 px-6 font-mono">65-30-5 (Soluble)</td>
                          <td className="py-3.5 px-6 font-mono">54-11-5</td>
                          <td className="py-3.5 px-6 font-mono">54-11-5</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C] bg-[#EBF5E5]/30">54-11-5 (USP/EP)</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Assay (purity)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C]">40.0% ± 0.5% (w/w)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C]">90.0% (min)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C]">95.0% (min)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#2E683A] bg-[#EBF5E5]/30">≥ 99.5% (Anhydrous Basis)</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Appearance</td>
                          <td className="py-3.5 px-6">Dark amber to pale brown aqueous solution</td>
                          <td className="py-3.5 px-6">Pale yellow to amber oily liquid</td>
                          <td className="py-3.5 px-6">Colorless to pale straw pure liquid</td>
                          <td className="py-3.5 px-6 font-medium text-[#1E3D2A] bg-[#EBF5E5]/30">Colorless &amp; odorless crystal clear liquid</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Solubility</td>
                          <td className="py-3.5 px-6">Completely miscible with water</td>
                          <td className="py-3.5 px-6">Miscible with water, alcohol, ether</td>
                          <td className="py-3.5 px-6">Miscible with water, alcohol, ether</td>
                          <td className="py-3.5 px-6 bg-[#EBF5E5]/30">Miscible with water, alcohol, ether</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Grade Classification</td>
                          <td className="py-3.5 px-6 font-medium">Pharma &amp; API Grade</td>
                          <td className="py-3.5 px-6 font-medium">Research &amp; Technical</td>
                          <td className="py-3.5 px-6 font-medium">Pharmaceutical API Grade</td>
                          <td className="py-3.5 px-6 font-bold text-[#2E683A] bg-[#EBF5E5]/30">USP &amp; EP Compendial API Standard</td>
                        </tr>
                      </>
                    )}

                    {tableTab === 'pharmacopeia' && (
                      <>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Analytical Identification</td>
                          <td className="py-3.5 px-6 font-mono">Infrared Absorption / HPLC RT</td>
                          <td className="py-3.5 px-6 font-mono">GC-FID / HPLC UV 260nm</td>
                          <td className="py-3.5 px-6 font-mono">HPLC UV 260nm (EP / USP Conform)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#2E683A] bg-[#EBF5E5]/30">HPLC UV 260nm &amp; IR (USP/EP Certified)</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Optical Rotation [α]D²⁰</td>
                          <td className="py-3.5 px-6 font-mono">-78.0° to -84.0°</td>
                          <td className="py-3.5 px-6 font-mono">-135.0° to -145.0°</td>
                          <td className="py-3.5 px-6 font-mono">-140.0° to -148.0° (S-isomer)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#2E683A] bg-[#EBF5E5]/30">-140.0° to -152.0° (S-Enantiomer)</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Non-Nicotine Alkaloids</td>
                          <td className="py-3.5 px-6 font-mono">&lt; 1.0% w/w</td>
                          <td className="py-3.5 px-6 font-mono">&lt; 0.8% w/w</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#2E683A]">&lt; 0.3% w/w (EP Monograph)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#2E683A] bg-[#EBF5E5]/30">&lt; 0.3% (Indiv.) / &lt; 0.5% (Total)</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Heavy Metals (Pb, As, Cd)</td>
                          <td className="py-3.5 px-6 font-mono">&lt; 10 ppm (ICP-MS)</td>
                          <td className="py-3.5 px-6 font-mono">&lt; 10 ppm (ICP-MS)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#2E683A]">&lt; 5 ppm (ICP-MS)</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#2E683A] bg-[#EBF5E5]/30">&lt; 5 ppm (Strict ICP-MS Screened)</td>
                        </tr>
                      </>
                    )}

                    {tableTab === 'logistics' && (
                      <>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">UN Dangerous Goods Number</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C]">UN 1658</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C]">UN 1654</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C]">UN 1654</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-[#5B9A3C] bg-[#EBF5E5]/30">UN 1654 (Class 6.1, PG II)</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Hazard Class &amp; Packing Group</td>
                          <td className="py-3.5 px-6">Class 6.1 (Toxic), PG II</td>
                          <td className="py-3.5 px-6">Class 6.1 (Toxic), PG II</td>
                          <td className="py-3.5 px-6">Class 6.1 (Toxic), PG II</td>
                          <td className="py-3.5 px-6 bg-[#EBF5E5]/30">Class 6.1 (Toxic Liquid), PG II</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Inert Blanketing Gas</td>
                          <td className="py-3.5 px-6">Headspace Nitrogen Blanketed</td>
                          <td className="py-3.5 px-6">Ultra-pure Dry N₂ Sealed</td>
                          <td className="py-3.5 px-6">Ultra-pure Dry N₂ Purged</td>
                          <td className="py-3.5 px-6 font-medium text-[#2E683A] bg-[#EBF5E5]/30">Ultra-pure Dry Nitrogen Blanket</td>
                        </tr>
                        <tr className="hover:bg-[#F9FAF6] transition-colors">
                          <td className="py-3.5 px-6 font-mono font-semibold text-[#1E3D2A]">Approved UN Containers</td>
                          <td className="py-3.5 px-6">50L / 200L Fluorinated HDPE Drums</td>
                          <td className="py-3.5 px-6">25L / 50L / 200L UN Rated Drums</td>
                          <td className="py-3.5 px-6">Passivated Stainless Steel / UN Drums</td>
                          <td className="py-3.5 px-6 font-medium bg-[#EBF5E5]/30">Passivated Stainless Steel / UN Fluorinated Canisters</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Action */}
              <div className="p-4 bg-[#F8F9F4] border-t border-[#1E3D2A]/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="text-[#1E3D2A]/60">
                  Detailed batch Certificates of Analysis (CoA) provided with every export container.
                </span>
                <button
                  type="button"
                  onClick={() => openHplc('Nicotine Intermediates', '54-11-5', '99.85%')}
                  className="inline-flex items-center gap-1.5 font-mono text-[#5B9A3C] font-semibold hover:underline cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Inspect HPLC Analytical Graph →</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          5. WHERE OUR PRODUCTS MAKE AN IMPACT (5 Application Cards)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E6] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4 text-[#5B9A3C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#5B9A3C]">
                  Key Applications
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                Where Our Products Make an Impact
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#1E3D2A]/70 font-light">
                Tailored molecular specifications addressing diverse therapeutic, industrial, and investigative sectors.
              </p>
            </div>

            {/* 5 Column Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {/* Card 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-sm">
                  <Pill className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Pharmaceutical /
                  <br />
                  NRT
                </h4>
                <span className="text-[10px] font-mono text-[#5B9A3C] mt-2 block">Patches &amp; Gums</span>
              </div>

              {/* Card 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Research &amp;
                  <br />
                  Academia
                </h4>
                <span className="text-[10px] font-mono text-[#5B9A3C] mt-2 block">Receptor Studies</span>
              </div>

              {/* Card 3 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-sm">
                  <Droplet className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  E-liquid
                  <br />
                  Manufacturing
                </h4>
                <span className="text-[10px] font-mono text-[#5B9A3C] mt-2 block">Neutral Sensory</span>
              </div>

              {/* Card 4 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-sm">
                  <Atom className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Chemical
                  <br />
                  Intermediates
                </h4>
                <span className="text-[10px] font-mono text-[#5B9A3C] mt-2 block">Organic Synthesis</span>
              </div>

              {/* Card 5 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center border border-[#1E3D2A]/10 shadow-xs hover:shadow-xl hover:border-[#5B9A3C]/40 transition-all duration-300 flex flex-col items-center justify-center group hover:-translate-y-1 col-span-2 sm:col-span-1">
                <div className="w-12 h-12 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#2E683A] mb-3 group-hover:scale-110 group-hover:bg-[#5B9A3C] group-hover:text-white transition-all shadow-sm">
                  <Settings2 className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1E3D2A] leading-tight">
                  Custom
                  <br />
                  Specifications
                </h4>
                <span className="text-[10px] font-mono text-[#5B9A3C] mt-2 block">Bespoke Assays</span>
              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          6. "LET'S DISCUSS YOUR REQUIREMENTS" (Custom Solution Banner)
      ========================================================================= */}
      <RevealOnScroll>
        <section className="relative py-12 sm:py-16 bg-[#FAFBF8] overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-[#5B9A3C]/25 shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Left Photo: Laboratory Microscope & Reagent Flasks */}
              <div className="relative w-full md:w-56 h-36 rounded-2xl overflow-hidden border border-[#1E3D2A]/10 shrink-0">
                <img
                  src={labQcImg}
                  alt="Laboratory Analytical Quality Control"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Center Text */}
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B9A3C] font-semibold block mb-1">
                  Need a Custom Solution?
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1E3D2A]">
                  Let's discuss your requirements.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#1E3D2A]/75 font-light max-w-xl">
                  Our technical team is here to help you with product selection, specifications, documentation and custom formulations.
                </p>
                <div className="mt-3 flex items-center justify-center md:justify-start gap-1">
                  <span className="h-[1px] w-12 bg-[#5B9A3C]/40" />
                  <Leaf className="w-3 h-3 text-[#5B9A3C]" />
                  <span className="h-[1px] w-12 bg-[#5B9A3C]/40" />
                </div>
              </div>

              {/* Right CTA Button */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openQuote('Nicotine Alkaloid 95%')}
                  className="px-6 py-3.5 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/20 hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#8CC63F]" />
                  <span>Instant Commercial Quote</span>
                </button>
              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* =========================================================================
          7. PRE-FOOTER BANNER: "READY TO ORDER? Let's Build Global Partnerships" (Light Theme)
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
                      <span>Ready to Order?</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight">
                      Let's Build Global
                      <br />
                      <span className="italic font-normal text-[#5B9A3C] font-editorial">Partnerships</span>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#1E3D2A]/75 max-w-md font-light leading-relaxed">
                      Partner with Okhai Pharma for reliable, high-purity and chromatographically certified nicotine intermediates.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => openQuote('Nicotine Alkaloid 95%')}
                        className="px-6 py-3 rounded-full bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#1E3D2A]/15 hover:shadow-xl hover:scale-102 flex items-center gap-2 group/btn cursor-pointer active:scale-98"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 text-[#8CC63F]" />
                      </button>

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
