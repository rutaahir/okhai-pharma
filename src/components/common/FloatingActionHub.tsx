import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  X,
  Sparkles,
  Building2,
  ShieldCheck,
  FlaskConical
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { COMPANY_DETAILS } from '../../data/companyData';
import { LUXURY_EASE } from './animations/variants';

export const FloatingActionHub: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_DETAILS.address)}`;

  return (
    <>
      {/* =========================================================================
          FLOATING BOTTOM-RIGHT ACTION BUTTONS
      ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Quick Info & Desk Trigger Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#143823] to-[#1E4D35] text-white shadow-[0_12px_30px_rgba(20,56,35,0.35)] border border-[#8CC63F]/40 cursor-pointer backdrop-blur-md"
          title="Direct Plant Contact & Products Desk"
        >
          {/* Breathing ambient ring */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC63F] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8CC63F]" />
          </span>

          <Building2 className="w-4 h-4 text-[#8CC63F]" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
            Quick Desk
          </span>

          {/* Hover Pill Tooltip / Label */}
          <span className="hidden sm:inline-block text-[10px] font-mono font-semibold text-[#8CC63F] bg-[#143823]/90 px-2 py-0.5 rounded-full border border-[#8CC63F]/30">
            Contact &amp; Products
          </span>
        </motion.button>

        {/* Scroll To Top Button (Appears when scrolled down) */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#143823] hover:text-[#5B9A3C] border-2 border-[#5B9A3C]/35 shadow-[0_10px_25px_rgba(20,56,35,0.2)] flex items-center justify-center cursor-pointer transition-colors group"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5 text-[#143823] group-hover:text-[#5B9A3C] transition-transform group-hover:-translate-y-0.5" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>

      {/* =========================================================================
          IMPRESSIVE & ELEGANT QUICK DESK MODAL / DRAWER
      ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#FAFBF8] via-white to-[#F2F7F0] border-2 border-white shadow-[0_25px_70px_rgba(20,56,35,0.3)] p-6 sm:p-8 z-10 text-[#143823]"
            >
              {/* Soft Ambient Light Aura inside card */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-[#8CC63F]/20 via-[#5B9A3C]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Header Row */}
              <div className="relative z-10 flex items-start justify-between gap-4 pb-5 border-b border-[#143823]/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#5B9A3C]/25 shadow-xs p-1.5 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/image_7ccf5a84.png"
                      alt="Okhai Pharma"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-serif font-bold text-[#143823]">
                        Okhai Pharma
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-[#5B9A3C]" />
                    </div>
                    <p className="text-[11px] font-mono text-[#5B9A3C] font-semibold uppercase tracking-wider">
                      Direct Plant &amp; Commercial Desk
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#143823]/5 hover:bg-[#143823]/10 text-[#143823] flex items-center justify-center transition-all cursor-pointer hover:rotate-90"
                  aria-label="Close desk"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Content */}
              <div className="relative z-10 mt-6 space-y-5">
                
                {/* 1. Address Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#5B9A3C]/20 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF4E7] text-[#143823] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#5B9A3C]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#5B9A3C] font-bold block mb-1">
                        Manufacturing Facility &amp; Registered Office
                      </span>
                      <p className="text-xs sm:text-[13px] font-serif font-medium text-[#143823] leading-relaxed">
                        {COMPANY_DETAILS.address}
                      </p>

                      {/* Action buttons */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={handleCopyAddress}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAFBF7] hover:bg-[#EAF4E7] border border-[#5B9A3C]/25 text-[#143823] font-mono text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#5B9A3C]" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#5B9A3C]" />
                              <span>Copy Address</span>
                            </>
                          )}
                        </button>

                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#143823] hover:bg-[#1E4D35] text-white font-mono text-[11px] font-semibold transition-colors shadow-2xs"
                        >
                          <span>Open in Maps</span>
                          <ExternalLink className="w-3 h-3 text-[#8CC63F]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Phone, Email & Working Hours Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Phone */}
                  <div className="p-4 rounded-2xl bg-white/95 border border-[#5B9A3C]/20 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF4E7] text-[#143823] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#5B9A3C]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#5B9A3C] font-bold block">
                        Commercial Phone
                      </span>
                      <a
                        href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                        className="text-xs sm:text-sm font-mono font-bold text-[#143823] hover:text-[#5B9A3C] transition-colors"
                      >
                        {COMPANY_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="p-4 rounded-2xl bg-white/95 border border-[#5B9A3C]/20 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF4E7] text-[#143823] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#5B9A3C]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#5B9A3C] font-bold block">
                        Dispatch Email
                      </span>
                      <a
                        href={`mailto:${COMPANY_DETAILS.email}`}
                        className="text-xs sm:text-sm font-mono font-bold text-[#143823] hover:text-[#5B9A3C] transition-colors"
                      >
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>

                </div>

                {/* Plant Hours Banner */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#143823]/5 border border-[#143823]/10 text-xs text-[#143823]">
                  <Clock className="w-3.5 h-3.5 text-[#5B9A3C] shrink-0" />
                  <span className="font-mono text-[11px]">
                    Plant Operations: <strong>09:00 AM - 06:00 PM IST (Mon - Sat)</strong>
                  </span>
                </div>

                {/* 3. Products Quick Navigation Links */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#143823] font-bold flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-[#5B9A3C]" />
                      <span>Product Specifications &amp; Monograph Links</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#5B9A3C] font-semibold">
                      3 Formulations
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Product 1: Nicotine Sulfate 40% */}
                    <Link
                      to="/products/nicotine-sulfate-40"
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/90 hover:bg-[#EAF4E7] border border-[#5B9A3C]/20 hover:border-[#5B9A3C] transition-all shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#5B9A3C]" />
                        <div>
                          <h4 className="text-xs font-serif font-bold text-[#143823] group-hover:text-[#1E4D35]">
                            Nicotine Sulfate 40%
                          </h4>
                          <span className="text-[10px] font-mono text-[#4F6456]">
                            Water-Soluble Intermediate · UN 1658 · CAS 65-30-5
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5B9A3C] group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Product 2: Nicotine Alkaloid 90% / 95% */}
                    <Link
                      to="/products/nicotine-alkaloid-90-95"
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/90 hover:bg-[#EAF4E7] border border-[#5B9A3C]/20 hover:border-[#5B9A3C] transition-all shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#5B9A3C]" />
                        <div>
                          <h4 className="text-xs font-serif font-bold text-[#143823] group-hover:text-[#1E4D35]">
                            Nicotine Alkaloid 90% / 95%
                          </h4>
                          <span className="text-[10px] font-mono text-[#4F6456]">
                            Pharma API &amp; Concentrated Intermediate · UN 1654
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5B9A3C] group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Product 3: Pure Nicotine USP/EP 99.5%+ */}
                    <Link
                      to="/products/pure-nicotine-usp-ep-99-5"
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/90 hover:bg-[#EAF4E7] border border-[#5B9A3C]/20 hover:border-[#5B9A3C] transition-all shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#8CC63F]" />
                        <div>
                          <h4 className="text-xs font-serif font-bold text-[#143823] group-hover:text-[#1E4D35]">
                            Pure Nicotine USP/EP 99.5%+
                          </h4>
                          <span className="text-[10px] font-mono text-[#4F6456]">
                            Global Compendial Monograph · Analytical Active API
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5B9A3C] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#143823] hover:bg-[#1E4D35] text-white text-xs font-semibold text-center transition-all shadow-md flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Request Official Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  <Link
                    to="/downloads"
                    onClick={() => setIsOpen(false)}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-[#FAFBF7] border border-[#CBDCC5] text-[#143823] text-xs font-semibold text-center transition-colors"
                  >
                    Technical Dossiers
                  </Link>
                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
