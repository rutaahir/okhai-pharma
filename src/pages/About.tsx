import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Headphones,
  Truck,
  Scale,
  ArrowRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

import facilityBuildingImg from '../assets/images/about-facility-building.jpg';
import { LUXURY_EASE } from '../components/common/animations/variants';

interface BenefitCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: 'high-quality-product',
    title: 'High-Quality Product',
    description:
      'Manufactured with strict quality controls to support consistent product quality and dependable performance.',
    icon: ShieldCheck
  },
  {
    id: 'fast-action',
    title: 'Fast Action',
    description:
      'Designed for intended pest-management applications, subject to appropriate product specifications and directions.',
    icon: Zap
  },
  {
    id: 'expert-support',
    title: 'Expert Support',
    description:
      'Professional guidance on product specifications, handling, and appropriate application.',
    icon: Headphones
  },
  {
    id: 'reliable-delivery',
    title: 'Reliable Delivery',
    description:
      'Reliable order coordination and timely supply to support your business requirements.',
    icon: Truck
  },
  {
    id: 'cost-effective',
    title: 'Cost-Effective',
    description:
      'A concentrated formulation designed to deliver practical value for suitable applications.',
    icon: Scale
  }
];

export const About: React.FC = () => {
  const scrollToBenefits = () => {
    const section = document.getElementById('what-sets-us-apart');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] text-[#123D28] overflow-hidden selection:bg-[#2F7D32]/20 selection:text-[#123D28]">

      {/* =========================================================================
          HERO SECTION: TWO-COLUMN PHARMACEUTICAL PRESENTATION
      ========================================================================= */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        {/* Ambient Subtle Botanical Aura */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[360px] bg-[#EAF3E5] rounded-full blur-[90px] pointer-events-none opacity-70" />
        <div className="absolute top-1/3 left-0 w-[420px] h-[320px] bg-[#EAF3E5]/60 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* -------------------------------------------------------------------
                LEFT COLUMN: WHY CHOOSE OKHAI PHARMA & VALUE PROPOSITION
            ------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: LUXURY_EASE }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E5] border border-[#2F7D32]/20 text-[#123D28] text-[11px] font-mono font-semibold tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F7D32]" />
                <span>WHY CHOOSE OKHAI PHARMA</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#123D28] leading-[1.18] tracking-tight">
                Quality You Can Trust.{' '}
                <span className="block font-serif italic font-normal text-[#2F7D32] mt-1">
                  Batch After Batch.
                </span>
              </h1>

              {/* Supporting Content */}
              <p className="mt-6 text-base sm:text-lg text-[#52645A] leading-relaxed max-w-xl font-normal">
                Okhai Pharma Intermediates Pvt. Ltd. manufactures and supplies Nicotine Sulphate 40%, backed by expertise in nicotine chemistry. Our focus on quality control, regulatory compliance, premium raw materials, and advanced manufacturing processes supports consistent product quality and dependable supply.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#123D28] hover:bg-[#2F7D32] text-white text-sm font-semibold shadow-[0_10px_25px_rgba(18,61,40,0.18)] hover:shadow-[0_14px_30px_rgba(47,125,50,0.25)] transition-all duration-300 group cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#8CC63F] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={scrollToBenefits}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#EAF3E5]/70 text-[#123D28] hover:text-[#2F7D32] text-sm font-semibold border border-[#2F7D32]/25 shadow-xs hover:border-[#2F7D32] transition-all duration-300 cursor-pointer group"
                >
                  <span>Explore Our Quality</span>
                  <ChevronDown className="w-4 h-4 text-[#2F7D32] group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------------
                RIGHT COLUMN: REAL MANUFACTURING FACILITY WITH CURVED DIVIDER & BADGE
            ------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: LUXURY_EASE, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              {/* Organic Curved Architectural Divider (Between Columns) */}
              <div className="hidden lg:block absolute -left-7 top-1/2 -translate-y-1/2 w-8 h-72 pointer-events-none select-none opacity-40">
                <svg viewBox="0 0 32 288" fill="none" className="w-full h-full text-[#2F7D32]">
                  <path
                    d="M24 16C12 64 6 112 18 160C28 200 16 248 8 272"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                  />
                  <circle cx="24" cy="16" r="3" fill="#2F7D32" />
                  <circle cx="8" cy="272" r="2.5" fill="#2F7D32" />
                </svg>
              </div>

              {/* Elevated Facility Image Frame */}
              <div className="relative rounded-3xl lg:rounded-[2.25rem] bg-white p-2.5 sm:p-3 border-2 border-white shadow-[0_20px_50px_rgba(18,61,40,0.14)] ring-1 ring-[#2F7D32]/15 group overflow-hidden">
                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[430px] rounded-2xl lg:rounded-[1.75rem] overflow-hidden bg-[#FAFBF7]">
                  <img
                    src={facilityBuildingImg}
                    alt="Okhai Pharma Intermediates Pvt. Ltd. Manufacturing Facility Building, Gujarat"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123D28]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Pillar Badge: "Precision • Quality • Reliability" */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#2F7D32]/25 shadow-[0_10px_25px_rgba(18,61,40,0.18)] flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F7D32] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F7D32]" />
                    </span>
                    <span className="text-[11px] font-mono font-bold tracking-wider text-[#123D28] uppercase whitespace-nowrap">
                      Precision • Quality • Reliability
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT SETS US APART: 5 BENEFIT CARDS SECTION
      ========================================================================= */}
      <section
        id="what-sets-us-apart"
        className="relative py-16 sm:py-20 lg:py-24 bg-[#FAFBF7] border-t border-[#2F7D32]/10 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3E5] border border-[#2F7D32]/20 text-[#123D28] text-[11px] font-mono font-semibold tracking-wider uppercase mb-3.5">
              <Sparkles className="w-3 h-3 text-[#2F7D32]" />
              <span>CORE ADVANTAGES</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123D28] tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#52645A] leading-relaxed">
              Designed with pharmaceutical rigor, delivering dependable performance and expert support.
            </p>
          </div>

          {/* 5 Benefit Cards: Single Row on Desktop (5 Columns) & Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {BENEFIT_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: LUXURY_EASE }}
                  className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-[#2F7D32]/15 shadow-[0_4px_16px_rgba(18,61,40,0.04)] hover:shadow-[0_12px_30px_rgba(18,61,40,0.10)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    {/* Soft Pale-Green Icon Background */}
                    <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] border border-[#2F7D32]/20 flex items-center justify-center text-[#2F7D32] mb-5 group-hover:bg-[#2F7D32] group-hover:text-white transition-colors duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Short Prominent Heading */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#123D28] group-hover:text-[#2F7D32] transition-colors duration-200 mb-2 leading-snug">
                      {card.title}
                    </h3>

                    {/* Concise Description */}
                    <p className="text-xs sm:text-[13px] text-[#52645A] leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Subtle Card Accent Line */}
                  <div className="w-8 h-[2px] bg-[#2F7D32]/20 mt-5 group-hover:w-12 group-hover:bg-[#2F7D32] transition-all duration-300" />
                </motion.div>
              );
            })}
          </div>

          {/* =========================================================================
              SLIM & ELEGANT CALL-TO-ACTION BANNER
          ========================================================================= */}
          <div className="mt-14 sm:mt-18">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="relative rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#123D28] via-[#164730] to-[#1E5238] text-white p-6 sm:p-8 lg:p-9 shadow-[0_18px_45px_rgba(18,61,40,0.22)] border border-[#2F7D32]/40 overflow-hidden"
            >
              {/* Subtle Ambient Leaf Watermark */}
              <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none select-none opacity-10">
                <svg viewBox="0 0 200 120" fill="none" className="w-full h-full text-white">
                  <path d="M10,100 Q100,10 190,30 Q140,110 10,100 Z" fill="currentColor" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#8CC63F] block mb-1.5">
                    Direct Manufacturer Partnership
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-white leading-tight">
                    Looking for a Dependable Nicotine Derivative Supplier?
                  </h3>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#EAF3E5] text-[#123D28] text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 shrink-0 group cursor-pointer"
                >
                  <span>Discuss Your Requirements</span>
                  <ArrowRight className="w-4 h-4 text-[#2F7D32] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
};
