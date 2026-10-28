import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Atom,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

import sulfatePkgImg from '../../assets/images/product-nicotine-sulfate-pkg.jpg';
import alkaloidPkgImg from '../../assets/images/product-nicotine-alkaloid-pkg.jpg';
import pureNicotinePkgImg from '../../assets/images/product-pure-nicotine-pkg.jpg';
import flaskImg from '../../assets/images/round-slide-1-flask.jpg';
import blueFlasksImg from '../../assets/images/round-thumb-flasks.jpg';
import liquidImg from '../../assets/images/round-thumb-liquid.jpg';
import shipImg from '../../assets/images/round-thumb-ship.jpg';

interface ProductSlide {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  image: string;
  link: string;
  cas: string;
  assay: string;
  appearance: string;
  standard: string;
  badge: string;
  features: {
    title: string;
    desc: string;
    icon: 'quality' | 'purity' | 'compliance';
  }[];
}

const PRODUCTS_SLIDES: ProductSlide[] = [
  {
    id: 'pure-nicotine-usp-ep-99-5',
    name: 'Pure Nicotine USP/EP 99.5%+',
    subtitle: 'Colorless, Odorless & High-Stability API',
    tagline: 'Supernic & Okhai pure nicotine delivers a neutral, colorless, and odorless base with unmatched stability for global formulations.',
    image: pureNicotinePkgImg,
    link: '/products/pure-nicotine-usp-ep-99-5',
    cas: '54-11-5',
    assay: '≥ 99.5% w/w',
    appearance: 'Colorless Clear Liquid',
    standard: 'USP / EP Monograph · UN 1654',
    badge: 'USP/EP 99.5%+ Grade',
    features: [
      { title: 'Colorless & Odorless', desc: 'Neutral Base Profile', icon: 'quality' },
      { title: 'Unmatched Stability', desc: 'Long-term Consistency', icon: 'purity' },
      { title: 'USP / EP Standard', desc: 'Pharmacopeia Monograph', icon: 'compliance' }
    ]
  },
  {
    id: 'nicotine-sulfate-40',
    name: 'Nicotine Sulfate 40%',
    subtitle: 'High-Purity Aqueous Intermediate',
    tagline: 'High purity, water-soluble, verified active nicotine intermediate for global industry.',
    image: sulfatePkgImg,
    link: '/products/nicotine-sulfate-40',
    cas: '65-30-5',
    assay: '≥ 40.0% w/w',
    appearance: 'Dark Amber Solution',
    standard: 'UN 1658 · Class 6.1',
    badge: 'Pharma / Research Grade',
    features: [
      { title: 'Pharma Grade', desc: 'Quality Verified', icon: 'quality' },
      { title: 'High Purity', desc: '≥ 40.0% Active', icon: 'purity' },
      { title: 'Global Standard', desc: 'Export Ready', icon: 'compliance' }
    ]
  },
  {
    id: 'nicotine-alkaloid-90-95',
    name: 'Nicotine Alkaloid 90% / 95%',
    subtitle: 'Active Pharmaceutical Ingredient (API)',
    tagline: 'Naturally extracted, vacuum-distilled nicotine with pharmaceutical grade purity.',
    image: alkaloidPkgImg,
    link: '/products/nicotine-alkaloid-90-95',
    cas: '54-11-5',
    assay: '≥ 95.0% USP/EP',
    appearance: 'Pale Viscous Liquid',
    standard: 'WHO-GMP Principles',
    badge: 'API Grade USP / EP',
    features: [
      { title: 'API Standard', desc: 'USP / EP Monograph', icon: 'quality' },
      { title: 'Ultra Purity', desc: '≥ 95.0% Assay', icon: 'purity' },
      { title: 'Inert Packaged', desc: 'N2 Sealed Drums', icon: 'compliance' }
    ]
  }
];

interface RoundSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  badge: string;
  step: string;
}

const ROUND_SLIDES: RoundSlide[] = [
  {
    id: 0,
    title: 'Botanical Extraction & Pipette',
    subtitle: 'Steam Vacuum Distillation',
    image: flaskImg,
    category: 'Botanical Extraction',
    badge: 'Phase 01',
    step: '01'
  },
  {
    id: 1,
    title: 'High Purity Liquid Intermediate',
    subtitle: 'USP / EP Standard Refinement',
    image: liquidImg,
    category: 'API Refining',
    badge: 'Phase 02',
    step: '02'
  },
  {
    id: 2,
    title: 'Analytical Laboratory Testing',
    subtitle: 'HPLC & GC Chromatography Verified',
    image: blueFlasksImg,
    category: 'Quality Control',
    badge: 'Phase 03',
    step: '03'
  },
  {
    id: 3,
    title: 'Global Export Logistics',
    subtitle: 'UN-Certified Hazardous Supply Chain',
    image: shipImg,
    category: 'Export Delivery',
    badge: 'Phase 04',
    step: '04'
  }
];

// Symmetrical 4-quadrant orbital coordinates (in degrees)
// -45°: Top-Right, 45°: Bottom-Right, 135°: Bottom-Left, 225°: Top-Left
const ORBIT_ANGLES = [-45, 45, 135, 225];

export const AttachedProductShowcase: React.FC = () => {
  const [productIndex, setProductIndex] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Synchronized Auto Slider with smooth progress counter
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 4800; // 4.8 seconds per slide
    const updateRate = 50; // update progress every 50ms
    const step = (updateRate / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setProductIndex((p) => (p + 1) % PRODUCTS_SLIDES.length);
          setRoundIndex((r) => (r + 1) % ROUND_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, updateRate);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSelectSlide = (idx: number) => {
    setProductIndex(idx % PRODUCTS_SLIDES.length);
    setRoundIndex(idx % ROUND_SLIDES.length);
    setProgress(0);
  };

  const currentProduct = PRODUCTS_SLIDES[productIndex];
  const currentRound = ROUND_SLIDES[roundIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-30 -mt-16 sm:-mt-20 lg:-mt-24 w-full pl-2 sm:pl-4 lg:pl-6 pr-0 mr-0 pointer-events-auto overflow-visible select-none"
    >
      {/* Outer Wrapper ensuring 100% width and zero gap on right */}
      <div className="relative w-full ml-auto mr-0 pr-0">
        
        {/* =========================================================================
            CAPSULE MAIN BODY:
            - Left: Curved capsule (rounded-l-[3.5rem] / rounded-l-full)
            - Right: Perfectly flush to device screen (rounded-r-none, border-r-0)
            - After Pseudo-element: Infinitely touches device right line with zero gap
            - Background: Rich botanical glassmorphic gradient with delicate aurora
        ========================================================================= */}
        <div className="relative w-full rounded-l-[3.25rem] sm:rounded-l-full rounded-r-none bg-gradient-to-r from-white via-[#F7FAF4] to-[#EFF6EB] backdrop-blur-3xl border-2 border-r-0 border-white shadow-[0_25px_60px_rgba(30,61,42,0.18)] p-4 sm:p-6 lg:py-6 lg:pl-7 lg:pr-6 flex flex-col xl:flex-row items-center justify-between gap-6 lg:gap-8 overflow-visible mr-0 after:content-[''] after:absolute after:top-[-2px] after:bottom-[-2px] after:left-[99%] after:w-[150vw] after:bg-gradient-to-r after:from-[#EFF6EB] after:to-[#EFF6EB] after:border-t-2 after:border-b-2 after:border-white after:backdrop-blur-3xl after:pointer-events-none">
          
          {/* -------------------------------------------------------------------
              BACKGROUND BOTANICAL WATERMARKS (Fills the card with organic elegance)
          ------------------------------------------------------------------- */}
          <div className="absolute inset-0 overflow-hidden rounded-l-[3.25rem] sm:rounded-l-full pointer-events-none opacity-30">
            {/* Molecular Hexagon Lattice in Top-Center */}
            <svg
              className="absolute left-1/3 -top-10 w-64 h-64 text-[#5B9A3C]/25"
              viewBox="0 0 200 200"
              fill="none"
            >
              <polygon points="100,20 150,50 150,110 100,140 50,110 50,50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="150,50 200,80 200,140 150,170 100,140 100,80" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="100" cy="20" r="3" fill="#5B9A3C" />
              <circle cx="150" cy="50" r="3" fill="#8CC63F" />
              <circle cx="100" cy="140" r="3" fill="#5B9A3C" />
            </svg>

            {/* Botanical Leaf Silhouette in Lower Center */}
            <svg
              className="absolute left-1/2 bottom-2 w-48 h-32 text-[#8CC63F]/20"
              viewBox="0 0 100 60"
              fill="none"
            >
              <path d="M10,50 Q50,0 90,10 Q60,55 10,50 Z" fill="currentColor" />
            </svg>
          </div>

          {/* -------------------------------------------------------------------
              LEFT: 100% CIRCULAR PRODUCT ORB WITH FLOATING SPECS BADGE
          ------------------------------------------------------------------- */}
          <div className="relative shrink-0 flex items-center justify-center">
            {/* Outer Subtle Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-[#8CC63F]/35 scale-110 animate-pulse pointer-events-none" />
            
            {/* Main Product Orb */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(30,61,42,0.18)] bg-white aspect-square group flex items-center justify-center p-5 sm:p-6">
              <img
                key={currentProduct.id}
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Floating Slide Counter Pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-[9px] font-mono text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-ping" />
                  0{productIndex + 1} / 03
                </span>
              </div>

              {/* Bottom Quality Monograph Stamp */}
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="inline-block max-w-[90%] truncate text-[8px] sm:text-[9px] font-mono font-semibold text-[#1E3D2A] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#5B9A3C]/30 shadow-sm">
                  {currentProduct.badge}
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              CENTER: PRODUCT DOSSIER & TECHNICAL SPECIFICATIONS (Fills Center!)
          ------------------------------------------------------------------- */}
          <div className="flex-1 flex flex-col justify-center text-left text-[#1E3D2A] min-w-0 w-full">
            
            {/* Category Tag & Live Status Indicator */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-[#5B9A3C]">
                <Sparkles className="w-3 h-3 text-[#8CC63F]" />
                OUR PRODUCTS · ACTIVE INTERMEDIATES
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-pulse" />
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#1E3D2A]/50 bg-[#1E3D2A]/5 px-2 py-0.5 rounded-md">
                WHO-GMP Principles · ISO 9001
              </span>
            </div>

            {/* Product Title */}
            <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-serif font-bold text-[#1E3D2A] leading-tight">
              {currentProduct.name}
            </h3>

            {/* Subtitle / Tagline */}
            <p className="text-xs sm:text-[13px] text-[#1E3D2A]/75 mt-0.5 leading-relaxed font-light line-clamp-1">
              {currentProduct.tagline}
            </p>

            {/* 4-Column Technical Specification Grid (Fills Empty Dead Space) */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-[#1E3D2A]/10">
              <div className="p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#5B9A3C]/15 backdrop-blur-sm flex flex-col">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#1E3D2A]/55 font-medium">CAS Number</span>
                <span className="text-xs font-mono font-bold text-[#1E3D2A] mt-0.5">{currentProduct.cas}</span>
              </div>
              <div className="p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#5B9A3C]/15 backdrop-blur-sm flex flex-col">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#1E3D2A]/55 font-medium">Active Assay</span>
                <span className="text-xs font-mono font-bold text-[#2D5A3C] mt-0.5">{currentProduct.assay}</span>
              </div>
              <div className="p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#5B9A3C]/15 backdrop-blur-sm flex flex-col">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#1E3D2A]/55 font-medium">Form</span>
                <span className="text-xs font-mono font-semibold text-[#1E3D2A] mt-0.5 truncate">{currentProduct.appearance}</span>
              </div>
              <div className="p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#5B9A3C]/15 backdrop-blur-sm flex flex-col">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#1E3D2A]/55 font-medium">Standard</span>
                <span className="text-xs font-mono font-semibold text-[#5B9A3C] mt-0.5 truncate">{currentProduct.standard}</span>
              </div>
            </div>

            {/* Action Row & Auto-Slider Navigation Strip */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link
                  to={currentProduct.link}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#2D5A3C] hover:bg-[#5B9A3C] text-white text-xs font-semibold transition-all duration-300 shadow-md shadow-[#2D5A3C]/20 hover:shadow-lg hover:shadow-[#5B9A3C]/30 hover:-translate-y-0.5 group/btn"
                >
                  <span>Explore Product Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>

                {/* Play / Pause Autoplay State Indicator */}
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[10px] font-mono text-[#1E3D2A]/70 border border-[#1E3D2A]/10 transition-colors"
                  title={isPaused ? 'Resume auto-slider' : 'Pause auto-slider'}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-2.5 h-2.5 text-[#5B9A3C]" />
                      <span>Paused</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-2.5 h-2.5 text-[#5B9A3C]" />
                      <span>Auto</span>
                    </>
                  )}
                </button>
              </div>

              {/* Interactive Slide Selector Tabs with Live Progress Bar */}
              <div className="flex items-center gap-1.5 bg-black/5 p-1 rounded-xl">
                {PRODUCTS_SLIDES.map((slide, idx) => {
                  const isActive = productIndex === idx;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => handleSelectSlide(idx)}
                      className={`relative px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-[#1E3D2A] font-bold shadow-sm'
                          : 'text-[#1E3D2A]/60 hover:text-[#1E3D2A] hover:bg-white/50'
                      }`}
                    >
                      <span className="relative z-10">0{idx + 1}</span>
                      {isActive && (
                        <div
                          style={{ width: `${progress}%` }}
                          className="absolute bottom-0 left-0 h-0.5 bg-[#5B9A3C] rounded-full transition-all duration-75"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* -------------------------------------------------------------------
              RIGHT: THE ROUND SHAPE SLIDER (CENTRAL SHOWPIECE + 4 ORBITING IMAGES)
              - 100% Round Border Orbit
              - 4 Symmetrically Spaced Circular Thumbnails
              - Elevated Visual Depth with Multi-Layered Rings
          ------------------------------------------------------------------- */}
          <div className="relative shrink-0 flex items-center justify-center pr-2 sm:pr-4 lg:pr-6">
            
            {/* The Circular Orbit Container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-76 lg:h-76 flex items-center justify-center">
              
              {/* Outer Ambient Aurora Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8CC63F]/15 via-[#5B9A3C]/10 to-transparent blur-xl pointer-events-none" />

              {/* The Round Dashed Orbital Border with Smooth Slow Spin */}
              <div className="absolute inset-3.5 rounded-full border-2 border-dashed border-[#5B9A3C]/45 animate-spin-slow pointer-events-none" />

              {/* Precision Compass Notches (Micro Scientific Detail) */}
              <div className="absolute inset-2 rounded-full border border-[#5B9A3C]/15 pointer-events-none" />

              {/* Central Main Featured Circular Image (100% Round Circle) */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-54 lg:h-54 rounded-full border-4 border-white shadow-[0_20px_50px_rgba(30,61,42,0.22)] overflow-hidden bg-white aspect-square group">
                <img
                  key={currentRound.id}
                  src={currentRound.image}
                  alt={currentRound.title}
                  className="w-full h-full object-cover rounded-full aspect-square transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Inner Emerald Vignette Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 pointer-events-none" />

                {/* Top Micro-Tag */}
                <div className="absolute top-2 inset-x-0 text-center pointer-events-none">
                  <span className="inline-flex items-center gap-1 text-[8px] font-mono uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/20">
                    <span className="w-1 h-1 rounded-full bg-[#8CC63F] animate-pulse" />
                    {currentRound.category}
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-2.5 text-center pointer-events-none px-2">
                  <span className="inline-block max-w-[92%] truncate text-[9px] sm:text-[10px] font-mono font-medium text-white bg-black/75 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/20 shadow-md">
                    {currentRound.title}
                  </span>
                </div>
              </div>

              {/* 4 Orbiting Round Thumbnail Slides: Mounted DIRECTLY ON the round border! */}
              {ROUND_SLIDES.map((slide, idx) => {
                const angle = ORBIT_ANGLES[idx];
                const rad = (angle * Math.PI) / 180;
                // Calculate position exactly along the circular dashed border (at radius ~44%)
                const leftPos = 50 + Math.cos(rad) * 44;
                const topPos = 50 + Math.sin(rad) * 44;
                const isSelected = roundIndex === idx;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => {
                      setRoundIndex(idx);
                      setProductIndex(idx % PRODUCTS_SLIDES.length);
                      setProgress(0);
                    }}
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full aspect-square border-2 transition-all duration-300 overflow-hidden shadow-xl hover:scale-120 group/thumb ${
                      isSelected
                        ? 'border-[#5B9A3C] ring-4 ring-[#8CC63F]/70 scale-115 shadow-[0_0_20px_rgba(140,198,63,0.5)]'
                        : 'border-white opacity-90 hover:opacity-100 hover:scale-110'
                    }`}
                    title={`${slide.step}: ${slide.title}`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-full aspect-square"
                    />

                    {/* Step Number Indicator */}
                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-black/75 text-[7px] font-mono text-white flex items-center justify-center font-bold">
                      {slide.step}
                    </span>

                    {/* Active Glow Overlay */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-[#5B9A3C]/20 border-2 border-[#5B9A3C]" />
                    )}
                  </button>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
