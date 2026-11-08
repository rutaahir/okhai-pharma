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
  Building2,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

import facilityBuildingImg from '../assets/images/about-facility-building.jpg';
import { LUXURY_EASE } from '../components/common/animations/variants';
import { COMPANY_DETAILS } from '../data/companyData';

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
    <div className="min-h-screen bg-[#FAFBF8] text-[#1E3D2A] overflow-hidden selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">

      {/* =========================================================================
          1. HERO SECTION: LIGHT BOTANICAL HARMONY WITH REAL FACILITY BACKGROUND
      ========================================================================= */}
      <section className="relative pt-28 sm:pt-32 lg:pt-38 pb-16 sm:pb-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5]">
        
        {/* Full-width Real Facility Photograph Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
          <img
            src={facilityBuildingImg}
            alt="Okhai Pharma Intermediates Pvt. Ltd. Manufacturing Facility Building, Gujarat"
            className="w-full h-full object-cover object-[62%_center] sm:object-[60%_center] lg:object-[58%_center] brightness-[1.02] contrast-[1.01]"
          />

          {/* Luminous Botanical Light Mist (Matches exact color system of the website) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF8] via-[#FAFBF8]/95 sm:via-[#FAFBF8]/90 via-55% to-[#FAFBF8]/25 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#EAF2E5] via-[#EAF2E5]/60 to-transparent pointer-events-none" />
        </div>

        {/* Ambient Subtle Radial Botanical Glows */}
        <div className="absolute top-0 right-1/4 w-[650px] h-[450px] bg-[#8CC63F]/12 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[550px] h-[380px] bg-[#5B9A3C]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: LUXURY_EASE }}
              className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-left"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#5B9A3C]/30 text-[#1E3D2A] text-xs font-mono font-semibold tracking-wider uppercase mb-5 shadow-2xs">
                <Leaf className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span className="text-[#5B9A3C]">Why Choose Us</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold text-[#143823] leading-[1.14] tracking-tight">
                Quality You Can Trust.{' '}
                <span className="block font-serif italic font-normal text-[#3A7528] mt-1">
                  Batch After Batch.
                </span>
              </h1>

              {/* Verified Content Paragraph 1 */}
              <p className="mt-5 text-sm sm:text-base lg:text-[17px] text-[#4F6456] leading-relaxed max-w-2xl font-normal">
                Okhai Pharma stands as a trusted name in the manufacturing and supply of Nicotine Sulphate 40%, delivering high quality, consistency, and reliability. With years of expertise in nicotine chemistry, we offer pharmaceutical-grade formulations developed under stringent quality controls and regulatory compliance. Our product is crafted using premium raw materials in advanced facilities, ensuring high purity, solubility, and stability.
              </p>

              {/* Action Buttons Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-full bg-[#143823] hover:bg-[#1E4D35] text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-xl shadow-[#143823]/22 flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#8CC63F] transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={scrollToBenefits}
                  className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#143823] font-semibold text-xs sm:text-sm border border-[#CBDCC5] hover:border-[#5B9A3C] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 group"
                >
                  <span>Explore Our Quality</span>
                  <ChevronDown className="w-4 h-4 text-[#5B9A3C] group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right Pillar Badge & Quick Highlights Plinth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: LUXURY_EASE }}
              className="lg:col-span-5 xl:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 items-start lg:items-end justify-center"
            >
              {/* Floating Quality Assurance Plinth */}
              <div className="w-full sm:max-w-xs p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(20,56,35,0.12)] ring-1 ring-[#5B9A3C]/20 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B9A3C] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5B9A3C]" />
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#143823]">
                    Precision • Quality • Reliability
                  </span>
                </div>
                <p className="text-xs text-[#4F6456] leading-relaxed font-normal">
                  Active intermediate synthesis under direct cGMP compliance at our dedicated Kasor, Anand plant.
                </p>
                <div className="mt-4 pt-3.5 border-t border-[#5B9A3C]/15 flex items-center justify-between text-[11px] font-mono font-medium text-[#143823]">
                  <span>Assay: ≥ 40.0% w/w</span>
                  <span className="text-[#5B9A3C]">UN 1658 · Class 6.1</span>
                </div>
              </div>

              {/* Facility Location Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#5B9A3C]/25 text-[#143823] text-xs font-mono shadow-sm">
                <Building2 className="w-4 h-4 text-[#5B9A3C]" />
                <span className="font-medium">Kasor, Sojitra, Anand, Gujarat</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PRECISION, SAFETY & INNOVATION NARRATIVE SECTION
      ========================================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white border-b border-[#CBDCC5]/60 overflow-hidden">
        {/* Subtle Ambient Leaf Watermark */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none select-none opacity-5">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#143823]">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E5] border border-[#5B9A3C]/25 text-[#143823] text-[11px] font-mono font-semibold tracking-wider uppercase mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Precision, Safety &amp; Innovation</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143823] leading-tight tracking-tight">
                Supporting Accurate &amp;{' '}
                <span className="italic font-normal text-[#3A7528]">Reproducible Results</span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-[#4F6456] leading-relaxed font-normal">
                What sets Okhai Pharma apart is our commitment to precision, safety, and innovation—key factors for pharmaceutical and research applications. Whether for drug development, toxicology studies, or scientific research, our Nicotine Sulphate 40% supports accurate and reproducible results. We also prioritize eco-conscious manufacturing practices, offering a biodegradable and safe formulation.
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#4F6456] leading-relaxed font-normal">
                With responsive customer service, global export capabilities, and adherence to international standards, Okhai Pharma is the preferred partner for institutions and companies seeking dependable nicotine derivatives. Choose Okhai Pharma for quality you can trust, batch after batch.
              </p>

              {/* 3 Pillar Highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#CBDCC5]/70 hover:border-[#5B9A3C]/40 transition-colors shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF3E5] text-[#5B9A3C] flex items-center justify-center mb-2.5">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#143823]">Research Standard</h4>
                  <p className="text-[11px] text-[#4F6456] mt-1 leading-snug">Drug discovery &amp; receptor assays</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#CBDCC5]/70 hover:border-[#5B9A3C]/40 transition-colors shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF3E5] text-[#5B9A3C] flex items-center justify-center mb-2.5">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#143823]">Eco-Conscious</h4>
                  <p className="text-[11px] text-[#4F6456] mt-1 leading-snug">Responsible green chemistry</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#CBDCC5]/70 hover:border-[#5B9A3C]/40 transition-colors shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF3E5] text-[#5B9A3C] flex items-center justify-center mb-2.5">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#143823]">Global Export</h4>
                  <p className="text-[11px] text-[#4F6456] mt-1 leading-snug">International documentation</p>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Specification Plinth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-[#FAFBF8] via-[#F3F8F0] to-[#EAF2E5] p-6 sm:p-8 border-2 border-white shadow-[0_20px_50px_rgba(20,56,35,0.08)] ring-1 ring-[#5B9A3C]/20">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#5B9A3C] block mb-1.5">
                  Chemical Verification Matrix
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143823] leading-snug">
                  Nicotine Sulphate 40% Solution
                </h3>
                <p className="text-xs text-[#4F6456] mt-2 leading-relaxed font-normal">
                  High-purity aqueous formulation produced through steam-distilled botanical nicotine extraction from Indian Gujarat tobacco cultivators.
                </p>

                {/* Specification Table */}
                <div className="mt-6 space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/95 border border-[#CBDCC5]/60 text-xs font-mono shadow-2xs">
                    <span className="text-[#4F6456]">CAS Registry</span>
                    <span className="font-bold text-[#143823]">65-30-5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/95 border border-[#CBDCC5]/60 text-xs font-mono shadow-2xs">
                    <span className="text-[#4F6456]">Active Concentration</span>
                    <span className="font-bold text-[#3A7528]">≥ 40.0% w/w</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/95 border border-[#CBDCC5]/60 text-xs font-mono shadow-2xs">
                    <span className="text-[#4F6456]">Classification</span>
                    <span className="font-bold text-[#143823]">UN 1658 · Class 6.1</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/95 border border-[#CBDCC5]/60 text-xs font-mono shadow-2xs">
                    <span className="text-[#4F6456]">Standards</span>
                    <span className="font-bold text-[#143823]">cGMP Monitored</span>
                  </div>
                </div>

                {/* Direct Link to Technical Dossier */}
                <div className="mt-6 pt-4 border-t border-[#5B9A3C]/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#4F6456]">Explore Technical Specs</span>
                  <Link
                    to="/products/nicotine-sulfate-40"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A7528] hover:text-[#143823] transition-colors"
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
        className="relative py-16 sm:py-20 lg:py-26 bg-[#F4F8F1] scroll-mt-24 border-b border-[#CBDCC5]/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#5B9A3C]/25 text-[#143823] text-[11px] font-mono font-semibold tracking-wider uppercase mb-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5B9A3C]" />
              <span>Core Advantages</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143823] tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4F6456] leading-relaxed">
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
                  className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-[#5B9A3C]/20 shadow-[0_4px_16px_rgba(20,56,35,0.04)] hover:shadow-[0_12px_30px_rgba(20,56,35,0.10)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    {/* Soft Pale-Green Icon Background */}
                    <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] border border-[#5B9A3C]/20 flex items-center justify-center text-[#5B9A3C] mb-5 group-hover:bg-[#143823] group-hover:text-white transition-colors duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Micro Badge */}
                    <span className="text-[10px] font-mono font-bold text-[#5B9A3C] uppercase tracking-wider block mb-1">
                      {card.badge}
                    </span>

                    {/* Short Prominent Heading */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#143823] group-hover:text-[#3A7528] transition-colors duration-200 mb-2 leading-snug">
                      {card.title}
                    </h3>

                    {/* Concise Verbatim Description */}
                    <p className="text-xs sm:text-[13px] text-[#4F6456] leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Subtle Card Accent Line */}
                  <div className="w-8 h-[2px] bg-[#5B9A3C]/20 mt-5 group-hover:w-14 group-hover:bg-[#5B9A3C] transition-all duration-300" />
                </motion.div>
              );
            })}
          </div>

          {/* =========================================================================
              4. ELEGANT BOTANICAL CALL-TO-ACTION BANNER (Aligned with Site Style)
          ========================================================================= */}
          <div className="mt-14 sm:mt-18">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="relative rounded-3xl bg-gradient-to-r from-white via-[#F7FAF4] to-[#EFF6EB] border-2 border-white shadow-[0_20px_50px_rgba(20,56,35,0.08)] p-6 sm:p-8 lg:p-9 overflow-hidden"
            >
              {/* Decorative Subtle Background Silhouette */}
              <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none select-none opacity-20">
                <svg viewBox="0 0 200 120" fill="none" className="w-full h-full text-[#5B9A3C]">
                  <path d="M10,100 Q100,10 190,30 Q140,110 10,100 Z" fill="currentColor" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E5] border border-[#5B9A3C]/20 text-[#143823] text-[10px] font-mono font-semibold tracking-wider uppercase mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
                    <span>Direct Manufacturer Partnership</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-bold text-[#143823] leading-tight">
                    Looking for a Dependable Nicotine Derivative Supplier?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4F6456] mt-1.5 font-normal">
                    Choose Okhai Pharma for quality you can trust, batch after batch.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#143823] hover:bg-[#1E4D35] text-white text-xs sm:text-sm font-semibold shadow-xl shadow-[#143823]/20 transition-all duration-300 group hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Discuss Your Requirements</span>
                    <ArrowRight className="w-4 h-4 text-[#8CC63F] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#FAFBF7] text-[#143823] text-xs sm:text-sm font-semibold border border-[#CBDCC5] hover:border-[#5B9A3C] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer font-mono"
                  >
                    <Phone className="w-4 h-4 text-[#5B9A3C]" />
                    <span>{COMPANY_DETAILS.phone}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
};
