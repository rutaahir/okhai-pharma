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
  Sparkles,
  FlaskConical,
  Globe2,
  CheckCircle2,
  Leaf,
  Atom,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

import facilityBuildingImg from '../assets/images/about-facility-building.jpg';
import { LUXURY_EASE } from '../components/common/animations/variants';

interface BenefitCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: 'high-quality-product',
    title: 'High-Quality Product',
    badge: 'Purity & Control',
    description:
      'Our Nicotine Sulfate 40% is manufactured under strict quality controls to ensure superior effectiveness in pest management.',
    icon: ShieldCheck
  },
  {
    id: 'fast-action',
    title: 'Fast Action',
    badge: 'Immediate Relief',
    description:
      'It provides rapid pest control, offering immediate relief for your crops and plants.',
    icon: Zap
  },
  {
    id: 'expert-support',
    title: 'Expert Support',
    badge: 'Technical Guidance',
    description:
      'Our team offers professional guidance on proper usage and application to maximize results.',
    icon: Headphones
  },
  {
    id: 'reliable-delivery',
    title: 'Reliable Delivery',
    badge: 'Timely Logistics',
    description:
      'Timely and efficient delivery to ensure you get the product when you need it most.',
    icon: Truck
  },
  {
    id: 'cost-effective',
    title: 'Cost-Effective',
    badge: 'Practical Value',
    description:
      'Our product offers excellent value with a high concentration of active ingredients for long-lasting results.',
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
          1. CINEMATIC HERO SECTION WITH REAL FACILITY PHOTOGRAPH AS BACKGROUND
      ========================================================================= */}
      <section className="relative pt-32 sm:pt-36 lg:pt-42 pb-20 sm:pb-24 lg:pb-32 overflow-hidden text-white min-h-[620px] lg:min-h-[700px] flex items-center">
        
        {/* Full-bleed Real Facility Photograph Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
          <img
            src={facilityBuildingImg}
            alt="Okhai Pharma Intermediates Pvt. Ltd. Manufacturing Facility Building, Gujarat"
            className="w-full h-full object-cover object-[58%_top] sm:object-[60%_top] lg:object-[62%_center] brightness-[1.02] contrast-[1.02]"
          />

          {/* Deep Forest Green Gradient Scrim (Guarantees supreme text contrast while showcasing the building facade) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B10]/95 via-[#0D2819]/88 to-[#0D2819]/45 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-[52%] bg-gradient-to-r from-[#071B10]/98 via-[#0A2215]/90 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F8FAF5] via-[#F8FAF5]/40 to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
              className="lg:col-span-8 flex flex-col items-start text-left"
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#8CC63F]/40 text-[#8CC63F] text-xs font-mono font-semibold tracking-wider uppercase mb-5 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC63F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CC63F]" />
                </span>
                <span>Why Choose Us</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.35rem] font-medium text-white leading-[1.12] tracking-tight drop-shadow-md">
                Quality You Can Trust.{' '}
                <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8CC63F] via-emerald-300 to-teal-200 mt-1">
                  Batch After Batch.
                </span>
              </h1>

              {/* Verified Intro Content */}
              <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl font-light drop-shadow-sm">
                Okhai Pharma stands as a trusted name in the manufacturing and supply of Nicotine Sulphate 40%, delivering high quality, consistency, and reliability. With years of expertise in nicotine chemistry, we offer pharmaceutical-grade formulations developed under stringent quality controls and regulatory compliance. Our product is crafted using premium raw materials in advanced facilities, ensuring high purity, solubility, and stability.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8CC63F] to-[#5B9A3C] text-[#05140B] text-xs sm:text-sm font-semibold shadow-xl shadow-[#8CC63F]/25 hover:shadow-[#8CC63F]/40 hover:brightness-110 transition-all duration-300 group cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={scrollToBenefits}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-xs sm:text-sm font-medium border border-white/25 hover:border-emerald-400/50 backdrop-blur-md transition-all duration-300 cursor-pointer group"
                >
                  <span>Explore Our Quality</span>
                  <ChevronDown className="w-4 h-4 text-[#8CC63F] group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right Pillar Badge & Quick Highlights Plinth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.2, ease: LUXURY_EASE }}
              className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 items-start lg:items-end justify-center"
            >
              {/* Floating Quality Assurance Plinth */}
              <div className="w-full sm:max-w-xs p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8CC63F] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-200">
                    Precision • Quality • Reliability
                  </span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  Active intermediate synthesis under direct cGMP compliance at our dedicated Kasor, Anand plant.
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-300">
                  <span>Assay: ≥ 40.0% w/w</span>
                  <span>UN 1658 · Class 6.1</span>
                </div>
              </div>

              {/* Facility Location Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono">
                <Building2 className="w-4 h-4 text-[#8CC63F]" />
                <span>Kasor, Sojitra, Anand, Gujarat</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PRECISION, SAFETY & INNOVATION NARRATIVE SECTION
      ========================================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white border-b border-[#2F7D32]/10 overflow-hidden">
        {/* Subtle Ambient Leaf Watermark */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none select-none opacity-5">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#123D28]">
            <polygon points="100,20 150,50 150,110 100,140 50,110 50,50" stroke="currentColor" strokeWidth="2" />
            <polygon points="150,50 200,80 200,140 150,170 100,140 100,80" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Narrative Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: LUXURY_EASE }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E5] border border-[#2F7D32]/20 text-[#123D28] text-[11px] font-mono font-semibold tracking-wider uppercase mb-4">
                <Sparkles className="w-3 h-3 text-[#2F7D32]" />
                <span>Precision, Safety &amp; Innovation</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123D28] leading-tight tracking-tight">
                Supporting Accurate &amp; Reproducible Results
              </h2>

              <p className="mt-5 text-sm sm:text-base text-[#52645A] leading-relaxed font-normal">
                What sets Okhai Pharma apart is our commitment to precision, safety, and innovation—key factors for pharmaceutical and research applications. Whether for drug development, toxicology studies, or scientific research, our Nicotine Sulphate 40% supports accurate and reproducible results. We also prioritize eco-conscious manufacturing practices, offering a biodegradable and safe formulation.
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#52645A] leading-relaxed font-normal">
                With responsive customer service, global export capabilities, and adherence to international standards, Okhai Pharma is the preferred partner for institutions and companies seeking dependable nicotine derivatives. Choose Okhai Pharma for quality you can trust, batch after batch.
              </p>

              {/* 3 Pillar Highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#2F7D32]/15">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF3E5] text-[#2F7D32] flex items-center justify-center mb-2.5">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#123D28]">Research Standard</h4>
                  <p className="text-[11px] text-[#52645A] mt-1">Drug discovery &amp; receptor assays</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#2F7D32]/15">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF3E5] text-[#2F7D32] flex items-center justify-center mb-2.5">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#123D28]">Eco-Conscious</h4>
                  <p className="text-[11px] text-[#52645A] mt-1">Responsible green chemistry</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#2F7D32]/15">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF3E5] text-[#2F7D32] flex items-center justify-center mb-2.5">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#123D28]">Global Export</h4>
                  <p className="text-[11px] text-[#52645A] mt-1">International documentation</p>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Plinth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-[#F8FAF5] via-white to-[#EAF3E5] p-6 sm:p-8 border-2 border-white shadow-[0_20px_50px_rgba(18,61,40,0.1)] ring-1 ring-[#2F7D32]/15">
                <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#2F7D32] block mb-2">
                  Chemical Verification Dossier
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#123D28] leading-snug">
                  Nicotine Sulphate 40% Solution
                </h3>
                <p className="text-xs text-[#52645A] mt-2 leading-relaxed">
                  High-purity aqueous formulation produced through steam-distilled botanical nicotine extraction from Indian Gujarat tobacco cultivators.
                </p>

                {/* Key Specification Matrix */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#2F7D32]/10 text-xs font-mono">
                    <span className="text-[#52645A]">CAS Registry Number</span>
                    <span className="font-bold text-[#123D28]">65-30-5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#2F7D32]/10 text-xs font-mono">
                    <span className="text-[#52645A]">Active Concentration</span>
                    <span className="font-bold text-[#2F7D32]">≥ 40.0% w/w</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#2F7D32]/10 text-xs font-mono">
                    <span className="text-[#52645A]">Regulatory Classification</span>
                    <span className="font-bold text-[#123D28]">UN 1658 · Class 6.1</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#2F7D32]/10 text-xs font-mono">
                    <span className="text-[#52645A]">Quality Standard</span>
                    <span className="font-bold text-[#123D28]">cGMP Monitored</span>
                  </div>
                </div>

                {/* Direct Link to Technical Specification */}
                <div className="mt-6 pt-4 border-t border-[#2F7D32]/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#52645A]">Explore Technical Specs</span>
                  <Link
                    to="/products/nicotine-sulfate-40"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F7D32] hover:text-[#123D28] transition-colors"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHAT SETS US APART: 5 BENEFIT CARDS (Verbatim User Content)
      ========================================================================= */}
      <section
        id="what-sets-us-apart"
        className="relative py-16 sm:py-20 lg:py-26 bg-[#F8FAF5] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF3E5] border border-[#2F7D32]/20 text-[#123D28] text-[11px] font-mono font-semibold tracking-wider uppercase mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2F7D32]" />
              <span>Core Advantages</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123D28] tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#52645A] leading-relaxed">
              Manufactured with strict quality controls and backed by responsive customer support.
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

                    {/* Micro Badge */}
                    <span className="text-[10px] font-mono font-semibold text-[#2F7D32] uppercase tracking-wider block mb-1">
                      {card.badge}
                    </span>

                    {/* Short Prominent Heading */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#123D28] group-hover:text-[#2F7D32] transition-colors duration-200 mb-2 leading-snug">
                      {card.title}
                    </h3>

                    {/* Concise Verbatim Description */}
                    <p className="text-xs sm:text-[13px] text-[#52645A] leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Subtle Card Accent Line */}
                  <div className="w-8 h-[2px] bg-[#2F7D32]/20 mt-5 group-hover:w-14 group-hover:bg-[#2F7D32] transition-all duration-300" />
                </motion.div>
              );
            })}
          </div>

          {/* =========================================================================
              4. SLIM & ELEGANT CALL-TO-ACTION BANNER
          ========================================================================= */}
          <div className="mt-14 sm:mt-18">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="relative rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#0C2417] via-[#123D28] to-[#1A4F34] text-white p-6 sm:p-8 lg:p-9 shadow-[0_18px_45px_rgba(18,61,40,0.22)] border border-[#2F7D32]/40 overflow-hidden"
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
                  <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                    Choose Okhai Pharma for quality you can trust, batch after batch.
                  </p>
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
