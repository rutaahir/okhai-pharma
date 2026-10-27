import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileDown,
  ShieldCheck,
  Globe2,
  Leaf,
  Droplet,
  FlaskConical,
  Download,
  CheckCircle2,
  Package,
  Sparkles,
  MapPin,
  Microscope,
  Eye,
  Activity
} from 'lucide-react';

import factoryBg from '../../assets/images/about-hero-facility.jpg';

// 3 Original packaging photos of products (Left Swapper)
import pureNicotinePkgImg from '../../assets/images/product-pure-nicotine-pkg.jpg';
import sulfatePkgImg from '../../assets/images/product-nicotine-sulfate-pkg.jpg';
import alkaloidPkgImg from '../../assets/images/product-nicotine-alkaloid-pkg.jpg';

// Facility Images (Right Swapper)
// 1st swap: Self Farming (1 image)
import selfFarmingMapImg from '../../assets/images/facility-self-farming-map.png';
// 2nd swap: Clean Rooms (1 image)
import cleanroomImg from '../../assets/images/facility-cleanroom.jpg';
// 3rd swap: GC, HPLC, Titration (3 images)
import labGcImg from '../../assets/images/facility-lab-gc.jpg';
import labHplcImg from '../../assets/images/facility-lab-hplc.png';
import labTitrationImg from '../../assets/images/facility-lab-titration.jpg';

import { LUXURY_EASE } from '../common/animations/variants';
import { HplcChromatogramModal } from '../products/HplcChromatogramModal';
import { CommercialQuoteModal } from '../products/CommercialQuoteModal';

// ============================================================================
// DATA STRUCTURES
// ============================================================================

interface ProductItem {
  id: string;
  name: string;
  tabLabel: string;
  badge: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  featuredImage: string;
  link: string;
  cas: string;
  purity: string;
  appearance: string;
  standard: string;
}

interface FacilitySwapItem {
  id: string;
  step: string;
  tabLabel: string;
  title: string;
  tag: string;
  subtitle: string;
  type: 'single' | 'triple';
  image?: string;
  subImages?: {
    id: string;
    title: string;
    sub: string;
    image: string;
    tag: string;
    isModal?: boolean;
  }[];
  highlights: string[];
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'pure-nicotine',
    name: 'Pure Nicotine USP/EP 99.5%+',
    tabLabel: 'Pure Nicotine 99.5%+',
    badge: 'USP/EP 99.5%+',
    eyebrow: 'PHARMACEUTICAL API GRADE',
    subtitle: 'High purity. Consistent quality. Global compendial monograph.',
    description: 'Naturally extracted, fractional vacuum-distilled nicotine with pharmaceutical grade purity for transdermal delivery systems, NRT formulations, and regulated global therapies.',
    featuredImage: pureNicotinePkgImg,
    link: '/products/pure-nicotine-usp-ep-99-5',
    cas: '54-11-5',
    purity: '99.5%+',
    appearance: 'Clear to pale liquid',
    standard: 'USP / EP Monograph'
  },
  {
    id: 'nicotine-sulfate',
    name: 'Nicotine Sulphate 40%',
    tabLabel: 'Nicotine Sulphate 40%',
    badge: '40% Active · UN 1658',
    eyebrow: 'CALIBRATED RESEARCH INTERMEDIATE',
    subtitle: 'High-purity water-miscible intermediate for precise formulations.',
    description: 'Calibrated 40% active assay intermediate specifically formulated for high-potency chemical synthesis, toxicology kinetics, and regulated scientific research.',
    featuredImage: sulfatePkgImg,
    link: '/products/nicotine-sulfate-40',
    cas: '65-30-5',
    purity: '≥ 40.0% w/w',
    appearance: 'Dark amber aqueous solution',
    standard: 'UN 1658 (PG II)'
  },
  {
    id: 'nicotine-alkaloid',
    name: 'Nicotine Alkaloid 90% / 95%',
    tabLabel: 'Nicotine Alkaloid 90%/95%',
    badge: '90% / 95% API',
    eyebrow: 'VACUUM-DISTILLED API BASE',
    subtitle: 'High-concentration natural alkaloid intermediate with minimal residues.',
    description: 'Precision-distilled natural nicotine alkaloid liquid offering consistent assay, rapid solvency, and ultra-low foreign alkaloid fraction under nitrogen blanket purge.',
    featuredImage: alkaloidPkgImg,
    link: '/products/nicotine-alkaloid-90-95',
    cas: '54-11-5',
    purity: '≥ 95.0% USP/EP',
    appearance: 'Pale Viscous Liquid',
    standard: 'WHO-GMP Principles'
  }
];

const FACILITY_SWAPS: FacilitySwapItem[] = [
  {
    id: 'self-farming',
    step: '01',
    tabLabel: 'Self Farming',
    title: 'Self Farming & Contract Agronomy',
    tag: 'GUJARAT AGRO-CLIMATIC BELT · 100% TRACEABLE LEAF',
    subtitle: 'Direct contract tobacco farming across Saurashtra & North Gujarat under dedicated agronomist supervision.',
    type: 'single',
    image: selfFarmingMapImg,
    highlights: [
      'Saurashtra & North Gujarat Farming Zones',
      'Direct Farm-to-Plant Batch Traceability',
      'Zero Adulteration & Optimal Alkaloids'
    ]
  },
  {
    id: 'clean-rooms',
    step: '02',
    tabLabel: 'Clean Rooms',
    title: 'Class 100,000 Cleanroom Distillation',
    tag: 'GRADE D STERILE SUITE · FRACTIONAL MOLECULAR DISTILLATION',
    subtitle: 'High-vacuum multi-stage SS 316L reactors under continuous nitrogen blanket protection.',
    type: 'single',
    image: cleanroomImg,
    highlights: [
      'Positive-Pressure HEPA Filtration',
      'SS 316L Molecular Distillation Units',
      'Automated PLC & Nitrogen Blanket Purge'
    ]
  },
  {
    id: 'qc-testing',
    step: '03',
    tabLabel: 'GC, HPLC & Titration',
    title: 'Advanced QC: GC, HPLC & Titration',
    tag: 'GLP ANALYTICAL LABORATORY · TRIPLE BATCH RELEASE',
    subtitle: 'Comprehensive batch verification utilizing Gas Chromatography, HPLC, and Potentiometric Titration.',
    type: 'triple',
    subImages: [
      {
        id: 'gc',
        title: 'GC Testing',
        sub: 'Gas Chromatography (Volatiles)',
        image: labGcImg,
        tag: 'GC-FID / GC-MS'
      },
      {
        id: 'hplc',
        title: 'HPLC Analysis',
        sub: 'High-Performance Liquid Chromatography',
        image: labHplcImg,
        tag: 'Purity ≥ 99.5%',
        isModal: true
      },
      {
        id: 'titration',
        title: 'Titration',
        sub: 'Potentiometric Monograph Titration',
        image: labTitrationImg,
        tag: 'USP / EP Monograph'
      }
    ],
    highlights: [
      'Gas Chromatography (GC) Impurity Profiling',
      'HPLC Purity & Peak Monograph Validation',
      'Non-Aqueous Potentiometric Titration Assay'
    ]
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const HeroWithDualSwapper: React.FC = () => {
  const [productIdx, setProductIdx] = useState<number>(0);
  const [facilityIdx, setFacilityIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Modals
  const [hplcModalOpen, setHplcModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const currentProduct = PRODUCTS_DATA[productIdx];
  const currentFacility = FACILITY_SWAPS[facilityIdx];

  // Automatic synchronized swapping timer (every 4 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setProductIdx((prev) => (prev + 1) % PRODUCTS_DATA.length);
      setFacilityIdx((prev) => (prev + 1) % FACILITY_SWAPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Master Navigation handlers (rotates both swappers)
  const handlePrev = () => {
    setProductIdx((prev) => (prev === 0 ? PRODUCTS_DATA.length - 1 : prev - 1));
    setFacilityIdx((prev) => (prev === 0 ? FACILITY_SWAPS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setProductIdx((prev) => (prev + 1) % PRODUCTS_DATA.length);
    setFacilityIdx((prev) => (prev + 1) % FACILITY_SWAPS.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getModalProduct = (id: string): 'Nicotine Sulfate 40%' | 'Nicotine Alkaloid 90%' | 'Nicotine Alkaloid 95%' | 'Pure Nicotine USP/EP 99.5%+' => {
    if (id === 'pure-nicotine') return 'Pure Nicotine USP/EP 99.5%+';
    if (id === 'nicotine-sulfate') return 'Nicotine Sulfate 40%';
    return 'Nicotine Alkaloid 95%';
  };

  return (
    <>
      <HplcChromatogramModal
        isOpen={hplcModalOpen}
        onClose={() => setHplcModalOpen(false)}
        productName={currentProduct.name}
        casNumber={currentProduct.cas}
        purityScore={currentProduct.purity}
      />

      <CommercialQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={getModalProduct(currentProduct.id)}
      />

      {/* =======================================================================
          MASTER HERO SECTION WITH INCREASED CINEMATIC HEIGHT
      ======================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#FAFBF7]">

        {/* ---------------------------------------------------------------------
            1. INCREASED CINEMATIC HERO BACKGROUND
        --------------------------------------------------------------------- */}
        <div className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[800px] flex flex-col justify-between overflow-hidden text-white pt-28 sm:pt-36 lg:pt-40">
          
          {/* Background Factory Photograph Layer */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
            <img
              src={factoryBg}
              alt="Okhai Pharma Manufacturing Facility Gujarat"
              className="w-full h-full object-cover object-[56%_center] sm:object-[58%_center] lg:object-[60%_center] brightness-[1.02] contrast-[1.02]"
            />

            {/* Left Scrim: Ensures text is sharp and legible */}
            <div className="absolute inset-y-0 left-0 w-full md:w-[56%] lg:w-[46%] bg-gradient-to-r from-black/88 via-black/55 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
          </div>

          {/* Hero Left Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pb-20 sm:pb-24 lg:pb-32">
            <div className="max-w-xl lg:max-w-2xl flex flex-col text-left">

              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: LUXURY_EASE }}
                className="flex items-center gap-2 mb-3 sm:mb-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#8CC63F]/40 shadow-lg text-xs font-mono font-medium text-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC63F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CC63F]" />
                  </span>
                  <span>BOTANICAL ORIGIN · GLOBAL SUPPLY</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
                className="text-[clamp(2.4rem,4.5vw,4.1rem)] font-serif font-medium tracking-tight text-white leading-[1.08] text-balance drop-shadow-md"
              >
                Pure Nicotine.{' '}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8CC63F] via-emerald-300 to-teal-200 pr-1">
                  Precisely Engineered.
                </span>
              </motion.h1>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
                className="mt-3.5 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed font-light drop-shadow-sm"
              >
                High quality nicotine and nicotine intermediates manufactured in India for global pharmaceutical, nutrition and industrial applications.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: LUXURY_EASE }}
                className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3.5"
              >
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8CC63F] to-[#5B9A3C] text-[#05140B] font-semibold text-xs sm:text-sm hover:brightness-110 transition-all duration-300 shadow-xl shadow-[#8CC63F]/25 hover:shadow-[#8CC63F]/40 hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  <span>Explore Our Ingredients</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/downloads"
                  className="px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 text-white font-medium text-xs sm:text-sm border border-white/25 hover:border-emerald-400/50 backdrop-blur-md transition-all duration-300 flex items-center gap-2 group"
                >
                  <FileDown className="w-4 h-4 text-[#8CC63F] transition-transform group-hover:-translate-y-0.5" />
                  <span>Download Product Portfolio</span>
                </Link>
              </motion.div>

            </div>
          </div>

          {/* -------------------------------------------------------------------
              2. FOUR TRUST INDICATORS ROW
          ------------------------------------------------------------------- */}
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full mb-3 lg:mb-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: LUXURY_EASE }}
              className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 py-3 px-4 rounded-2xl bg-black/45 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <span className="text-[11px] sm:text-xs text-white/90 font-medium">USP / EP Compendial Quality</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Leaf className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <span className="text-[11px] sm:text-xs text-white/90 font-medium">100% Botanical Origin</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <span className="text-[11px] sm:text-xs text-white/90 font-medium">Global Regulatory Compliance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <span className="text-[11px] sm:text-xs text-white/90 font-medium">Full Batch Traceability</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* =====================================================================
            3. DEDICATED DUAL SWAPPER PANEL:
               - Left: Product Swapper (3 products with upper heading & active status)
               - Right: Facility Swapper (1st: Self Farming, 2nd: Clean Rooms, 3rd: GC, HPLC & Titration)
        ===================================================================== */}
        <div className="relative z-30 -mt-14 sm:-mt-18 lg:-mt-22 w-full max-w-[1440px] mx-auto px-2 sm:px-5 lg:px-7 pb-16 select-none">
          
          {/* Outer Organic Card with Wave Glass Ribbon */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative w-full rounded-[2.25rem] sm:rounded-[3.25rem] bg-gradient-to-r from-[#EFF6EB] via-[#F8FAF5] to-[#E9F3E4] backdrop-blur-3xl border-2 border-white/95 shadow-[0_25px_60px_rgba(18,61,41,0.18)] p-5 sm:p-7 lg:py-7 lg:px-8 overflow-hidden"
          >

            {/* Glowing Organic Top Wave Ribbon */}
            <div className="absolute top-0 inset-x-0 h-16 pointer-events-none overflow-hidden select-none opacity-80">
              <svg
                viewBox="0 0 1440 60"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,25 C250,5 500,45 750,20 C1000,5 1250,35 1440,15 L1440,0 L0,0 Z"
                  fill="url(#wave-gradient-prod)"
                  opacity="0.6"
                />
                <path
                  d="M0,25 C250,5 500,45 750,20 C1000,5 1250,35 1440,15"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  opacity="0.8"
                />
                <defs>
                  <linearGradient id="wave-gradient-prod" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#5B9A3C" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Decorative Floating Green Leaves */}
            <div className="absolute top-8 left-[34%] w-6 h-6 pointer-events-none opacity-85 select-none drop-shadow-sm rotate-12 hidden md:block">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <path d="M5,35 Q20,5 35,5 Q35,25 5,35 Z" fill="#5B9A3C" />
                <path d="M5,35 Q20,20 35,5" stroke="#8CC63F" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="absolute bottom-5 left-[50%] -translate-x-1/2 w-8 h-8 pointer-events-none opacity-90 select-none drop-shadow-md -rotate-45 hidden md:block">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <path d="M5,35 Q20,5 35,5 Q35,25 5,35 Z" fill="#5B9A3C" />
                <path d="M5,35 Q20,20 35,5" stroke="#8CC63F" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="absolute top-7 right-[32%] w-5 h-5 pointer-events-none opacity-80 select-none drop-shadow-sm rotate-45 hidden md:block">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <path d="M5,35 Q20,5 35,5 Q35,25 5,35 Z" fill="#70AD35" />
              </svg>
            </div>

            {/* -----------------------------------------------------------------
                TOP HEADER BAR: Product Badge & Infrastructure Badge + Master Controls
            ----------------------------------------------------------------- */}
            <div className="relative z-20 flex items-center justify-between gap-4 mb-4 sm:mb-5">
              
              {/* Left Side Label */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143823] text-white shadow-md text-xs font-semibold">
                  <Package className="w-3.5 h-3.5 text-[#8CC63F]" />
                  <span>Our Products &amp; Infrastructure</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-pulse" />
                </div>
              </div>

              {/* Prev / Next Circular Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Showcase"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#CBDCC5] hover:border-[#5B9A3C] text-[#143823] hover:bg-white flex items-center justify-center transition-all shadow-xs hover:scale-105 cursor-pointer"
                  title="Previous (Arrow Left)"
                >
                  <ChevronLeft className="w-4 h-4 text-[#143823]" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Showcase"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#143823] hover:bg-[#1E4D35] text-white flex items-center justify-center transition-all shadow-md hover:scale-105 cursor-pointer"
                  title="Next (Arrow Right)"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>

            {/* -----------------------------------------------------------------
                SWAPPER BODY: UNIFIED LUXURY ORGANIC SHOWCASE (NO NESTED BOXES)
            ----------------------------------------------------------------- */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
              
              {/* Subtle Elegant Desktop Center Divider */}
              <div className="hidden lg:block absolute left-1/2 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-[#5B9A3C]/25 to-transparent pointer-events-none -translate-x-1/2" />

              {/* ===============================================================
                  SWAPPER 1 (LEFT): PRODUCT SWAPPER (3 Products with Upper Heading & Active Status)
              =============================================================== */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                
                <div>
                  {/* 1. Heading in Upper Side (Name of Products Prominently Displayed) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, y: -14, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                      transition={{ duration: 0.5, ease: LUXURY_EASE }}
                      className="mb-3.5"
                    >
                      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-[#143823] leading-tight tracking-tight">
                        {currentProduct.name}
                      </h2>
                      <p className="mt-1 text-xs sm:text-[13px] text-[#4F6456] font-light leading-relaxed">
                        {currentProduct.subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* 3. Interactive Active Status Navigation Pill Tabs */}
                  <div className="flex items-center gap-2 mb-4 p-1 rounded-2xl bg-white/70 border border-[#143823]/10 overflow-x-auto shadow-2xs">
                    {PRODUCTS_DATA.map((prod, idx) => {
                      const isActive = productIdx === idx;
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => setProductIdx(idx)}
                          className={`relative overflow-hidden px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                            isActive
                              ? 'bg-[#143823] text-white shadow-md shadow-[#143823]/25 scale-102 ring-1 ring-[#8CC63F]/40'
                              : 'text-[#143823]/70 hover:text-[#143823] hover:bg-white'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8CC63F] animate-pulse' : 'bg-[#143823]/30'}`} />
                          <span className="truncate max-w-[120px] sm:max-w-none">{prod.tabLabel}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#EBF4E7] text-[#5B9A3C]'}`}>
                            0{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Product Body: Terrarium Dome & 4 Specification Pills */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 my-1">
                  
                  {/* Terrarium Dome Packaging Visual (Increased Size & Impressive Luxury Styling) */}
                  <div className="relative shrink-0 w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 xl:w-64 xl:h-64 flex items-center justify-center">
                    {/* Glowing Emerald Multi-layer Aura */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8CC63F]/40 via-[#5B9A3C]/25 to-transparent blur-3xl pointer-events-none animate-pulse" />
                    <div className="absolute -inset-2 rounded-full bg-[#8CC63F]/15 blur-xl pointer-events-none" />

                    <div className="relative w-full h-full rounded-full border-[5px] border-white shadow-[0_20px_50px_rgba(18,61,41,0.22)] overflow-hidden bg-gradient-to-b from-white via-[#F9FBF8] to-[#EEF5EB] aspect-square group">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentProduct.id}
                          initial={{ opacity: 0, scale: 0.84, rotate: -5, y: 14, filter: 'blur(5px)' }}
                          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, scale: 1.08, rotate: 5, y: -14, filter: 'blur(5px)' }}
                          transition={{ duration: 0.55, ease: LUXURY_EASE }}
                          className="w-full h-full flex items-center justify-center p-3 sm:p-4 relative"
                        >
                          <img
                            src={currentProduct.featuredImage}
                            alt={currentProduct.name}
                            className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(20,56,35,0.22)] transition-transform duration-700 group-hover:scale-108"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Glass Glare */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/15 to-white/60 pointer-events-none" />

                      {/* Monograph Badge */}
                      <div className="absolute bottom-3 inset-x-3 text-center">
                        <span className="inline-block max-w-[90%] truncate text-[10px] sm:text-[11px] font-mono font-bold text-[#143823] bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#5B9A3C]/35 shadow-md">
                          {currentProduct.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Technical Specification Pills */}
                  <div className="flex-1 w-full flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentProduct.id}
                        initial={{ opacity: 0, x: 12, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
                        transition={{ duration: 0.48, ease: LUXURY_EASE }}
                        className="grid grid-cols-2 gap-2"
                      >
                        {/* Purity */}
                        <div className="p-2.5 rounded-xl bg-white/95 border border-[#5B9A3C]/15 shadow-2xs">
                          <div className="flex items-center gap-1.5 text-[#5B9A3C] mb-0.5">
                            <Leaf className="w-3 h-3 text-[#5B9A3C]" />
                            <span className="text-[9px] uppercase font-mono tracking-wider text-[#143823]/60 font-medium">Purity</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#143823] block truncate">{currentProduct.purity}</span>
                        </div>

                        {/* Appearance */}
                        <div className="p-2.5 rounded-xl bg-white/95 border border-[#5B9A3C]/15 shadow-2xs">
                          <div className="flex items-center gap-1.5 text-[#5B9A3C] mb-0.5">
                            <Droplet className="w-3 h-3 text-[#5B9A3C]" />
                            <span className="text-[9px] uppercase font-mono tracking-wider text-[#143823]/60 font-medium">Appearance</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#143823] block truncate">{currentProduct.appearance}</span>
                        </div>

                        {/* CAS No. */}
                        <div className="p-2.5 rounded-xl bg-white/95 border border-[#5B9A3C]/15 shadow-2xs">
                          <div className="flex items-center gap-1.5 text-[#5B9A3C] mb-0.5">
                            <FlaskConical className="w-3 h-3 text-[#5B9A3C]" />
                            <span className="text-[9px] uppercase font-mono tracking-wider text-[#143823]/60 font-medium">CAS No.</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#143823] block truncate">{currentProduct.cas}</span>
                        </div>

                        {/* Standard */}
                        <div className="p-2.5 rounded-xl bg-white/95 border border-[#5B9A3C]/15 shadow-2xs">
                          <div className="flex items-center gap-1.5 text-[#5B9A3C] mb-0.5">
                            <ShieldCheck className="w-3 h-3 text-[#5B9A3C]" />
                            <span className="text-[9px] uppercase font-mono tracking-wider text-[#143823]/60 font-medium">Standard</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#5B9A3C] block truncate">{currentProduct.standard}</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Action Buttons Row */}
                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      <Link
                        to={currentProduct.link}
                        className="px-4 py-2 rounded-full bg-[#143823] hover:bg-[#1E4D35] text-white text-xs font-semibold transition-all duration-300 shadow-sm flex items-center gap-1.5 group/btn cursor-pointer"
                      >
                        <span>View Product Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>

              {/* ===============================================================
                  SWAPPER 2 (RIGHT): FACILITY & INFRASTRUCTURE SWAPPER
                  - 1st swap: Self Farming (1 image: Gujarat Map)
                  - 2nd swap: Clean Rooms (1 image: Class 100,000 Plant)
                  - 3rd swap: GC, HPLC & Titration (3 images)
                  Clean, Impressive, No Clutter / No Tick Boxes
              =============================================================== */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                
                <div>
                  {/* 1. Heading in Upper Side (Name of Infrastructure Prominently Displayed) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentFacility.id}
                      initial={{ opacity: 0, y: -14, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                      transition={{ duration: 0.5, ease: LUXURY_EASE }}
                      className="mb-3.5"
                    >
                      <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-[#143823] leading-tight tracking-tight">
                        {currentFacility.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-[13px] text-[#4F6456] font-light leading-relaxed">
                        {currentFacility.subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* 3. Interactive Active Status Navigation Pill Tabs */}
                  <div className="flex items-center gap-2 mb-4 p-1 rounded-2xl bg-white/70 border border-[#143823]/10 overflow-x-auto shadow-2xs">
                    {FACILITY_SWAPS.map((fac, idx) => {
                      const isActive = facilityIdx === idx;
                      return (
                        <button
                          key={fac.id}
                          type="button"
                          onClick={() => setFacilityIdx(idx)}
                          className={`relative overflow-hidden px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                            isActive
                              ? 'bg-[#143823] text-white shadow-md shadow-[#143823]/25 scale-102 ring-1 ring-[#8CC63F]/40'
                              : 'text-[#143823]/70 hover:text-[#143823] hover:bg-white'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8CC63F] animate-pulse' : 'bg-[#143823]/30'}`} />
                          <span>{fac.tabLabel}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#EBF4E7] text-[#5B9A3C]'}`}>
                            0{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Facility Body: Custom Visuals for the 3 States (Clean & Prominent Showcase) */}
                <div className="my-1">
                  <AnimatePresence mode="wait">
                    {/* SWAP 1: SELF FARMING (1 Image: Gujarat Origin & Sourcing Map) */}
                    {facilityIdx === 0 && (
                      <motion.div
                        key="self-farming"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.04, filter: 'blur(5px)' }}
                        transition={{ duration: 0.52, ease: LUXURY_EASE }}
                        className="w-full"
                      >
                        <div className="relative w-full h-60 sm:h-72 lg:h-[280px] rounded-2xl overflow-hidden bg-[#E8F3F7] border border-[#CBDCC5] shadow-xs group">
                          <img
                            src={selfFarmingMapImg}
                            alt="Okhai Pharma Gujarat Contract Farming Origin Map"
                            className="w-full h-full object-cover object-[center_40%] transition-transform duration-700 group-hover:scale-103"
                          />
                          {/* Origin Tag */}
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#143823]/90 backdrop-blur-md text-white text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-md">
                            <MapPin className="w-3.5 h-3.5 text-[#8CC63F]" />
                            <span>Gujarat Agronomy Belt</span>
                          </div>

                          {/* Traceable Origin Tag */}
                          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#143823] text-[11px] font-mono font-semibold border border-[#5B9A3C]/30 shadow-md flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#5B9A3C]" />
                            <span>100% Traceable Direct Agronomy</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* SWAP 2: CLEAN ROOMS (1 Image: Cleanroom Distillation Plant) */}
                    {facilityIdx === 1 && (
                      <motion.div
                        key="clean-rooms"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.04, filter: 'blur(5px)' }}
                        transition={{ duration: 0.52, ease: LUXURY_EASE }}
                        className="w-full"
                      >
                        <div className="relative w-full h-56 sm:h-64 lg:h-[268px] rounded-2xl overflow-hidden bg-[#0A1A10] border border-[#CBDCC5] shadow-xs group">
                          <img
                            src={cleanroomImg}
                            alt="Class 100,000 Cleanroom Distillation Plant"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />
                          
                          {/* Top Badge */}
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-white/10 shadow-md">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#8CC63F]" />
                            <span>Class 100,000 Cleanroom Suite</span>
                          </div>

                          {/* Bottom Overlay Info */}
                          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white">
                            <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[11px] font-mono font-medium border border-white/10">
                              SS 316L Fractional Molecular Distillation
                            </span>
                            <span className="text-[11px] font-mono text-[#8CC63F] bg-[#143823]/80 px-2.5 py-0.5 rounded-full border border-[#8CC63F]/30 hidden sm:inline">
                              Continuous N₂ Blanketed
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* SWAP 3: GC, HPLC & TITRATION (3 Analytical Images) */}
                    {facilityIdx === 2 && (
                      <motion.div
                        key="qc-testing"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.04, filter: 'blur(5px)' }}
                        transition={{ duration: 0.52, ease: LUXURY_EASE }}
                        className="w-full"
                      >
                        {/* 3 Analytical Sub-Images */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 h-56 sm:h-64 lg:h-[268px]">
                          {currentFacility.subImages?.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => {
                                if (item.isModal) setHplcModalOpen(true);
                              }}
                              className="group relative rounded-2xl overflow-hidden bg-white border border-[#CBDCC5] hover:border-[#5B9A3C] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                              title={`Inspect ${item.title}`}
                            >
                              <div className="relative w-full h-[145px] sm:h-[165px] lg:h-[185px] overflow-hidden bg-[#FAFBF7]">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-white font-bold border border-white/10">
                                  {item.tag}
                                </div>
                              </div>
                              <div className="p-2 sm:p-2.5 text-left bg-white flex-1 flex flex-col justify-center">
                                <h4 className="text-xs sm:text-[13px] font-bold text-[#143823] truncate group-hover:text-[#5B9A3C] transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-[10px] sm:text-[11px] text-[#4F6456] truncate font-light leading-tight mt-0.5">
                                  {item.sub}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>
    </>
  );
};
