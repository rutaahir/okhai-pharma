import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronUp,
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Package,
  Layers,
  Send
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { COMPANY_DETAILS } from '../../data/companyData';
import pureNicotinePkgImg from '../../assets/images/product-pure-nicotine-pkg.jpg';
import sulfatePkgImg from '../../assets/images/product-nicotine-sulfate-pkg.jpg';
import alkaloidPkgImg from '../../assets/images/product-nicotine-alkaloid-pkg.jpg';

export const FloatingActionHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for scroll-to-top visibility
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

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const BRIEF_PRODUCTS = [
    {
      id: 'pure-nicotine-usp-ep-99-5',
      name: 'Pure Nicotine USP/EP 99.5%+',
      tag: 'Pharma API · ≥99.5%',
      cas: 'CAS 54-11-5 · UN 1654',
      image: pureNicotinePkgImg,
      link: '/products/pure-nicotine-usp-ep-99-5'
    },
    {
      id: 'nicotine-sulfate-40',
      name: 'Nicotine Sulfate 40%',
      tag: 'Water-Soluble · 40% Active',
      cas: 'CAS 65-30-5 · UN 1658',
      image: sulfatePkgImg,
      link: '/products/nicotine-sulfate-40'
    },
    {
      id: 'nicotine-alkaloid-90-95',
      name: 'Nicotine Alkaloid 90% / 95%',
      tag: 'Natural Base · Distilled',
      cas: 'CAS 54-11-5 · UN 1654',
      image: alkaloidPkgImg,
      link: '/products/nicotine-alkaloid-90-95'
    }
  ];

  return (
    <>
      {/* Background Dimmer Backdrop on Mobile Viewports */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 sm:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>

      <div ref={panelRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto">
        
        {/* =======================================================================
            1. ELEVATED FLOATING POPUP DRAWER
        ======================================================================= */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 14, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="absolute bottom-14 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[84vh] bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#5B9A3C]/35 shadow-[0_25px_60px_rgba(20,56,35,0.25)] flex flex-col overflow-hidden text-[#1E3D2A] z-40"
            >
            {/* Header: Brand Identity & Close Button */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-[#143823] via-[#1E4D35] to-[#143823] text-white flex items-center justify-between shrink-0">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#8CC63F]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-[#8CC63F]/40 flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#8CC63F]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base tracking-tight leading-tight flex items-center gap-1.5">
                    <span>Okhai Pharma Desk</span>
                    <span className="w-2 h-2 rounded-full bg-[#8CC63F] animate-pulse" />
                  </h3>
                  <p className="text-[11px] font-mono text-white/75 mt-0.5">
                    Kasor, Gujarat · Direct Manufacturer
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer relative z-10"
                aria-label="Close desk"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[calc(82vh-130px)] divide-y divide-[#1E3D2A]/8">
              
              {/* --- ACTION GRID: Call, WhatsApp, Email, Get Quote --- */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#F8FBF6] hover:bg-[#EEF7EB] border border-[#5B9A3C]/20 hover:border-[#5B9A3C] transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#143823] text-[#8CC63F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#5B9A3C] uppercase tracking-wider block font-semibold">Direct Call</span>
                    <span className="text-xs font-bold text-[#143823] truncate block">{COMPANY_DETAILS.phone}</span>
                  </div>
                </a>

                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#F4FAF2] hover:bg-[#EBF7E8] border border-[#25D366]/30 hover:border-[#25D366] transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#1E7E34] uppercase tracking-wider block font-semibold">WhatsApp</span>
                    <span className="text-xs font-bold text-[#143823] truncate block">Instant Chat</span>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#F8FBF6] hover:bg-[#EEF7EB] border border-[#5B9A3C]/20 hover:border-[#5B9A3C] transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#143823] text-[#8CC63F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#5B9A3C] uppercase tracking-wider block font-semibold">Email Desk</span>
                    <span className="text-xs font-bold text-[#143823] truncate block">{COMPANY_DETAILS.email}</span>
                  </div>
                </a>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-gradient-to-r from-[#143823] to-[#1E4D35] text-white hover:opacity-95 transition-all group shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/15 text-[#8CC63F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Send className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#8CC63F] uppercase tracking-wider block font-semibold">RFQ Portal</span>
                    <span className="text-xs font-bold text-white truncate block">Request Quote →</span>
                  </div>
                </Link>
              </div>

              {/* --- BRIEF PRODUCTS SHOWCASE WITH PACKAGING THUMBNAILS --- */}
              <div className="pt-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#143823] uppercase tracking-wider">
                    <Package className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Core Products (3)</span>
                  </div>
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="text-[11px] font-mono font-semibold text-[#5B9A3C] hover:text-[#4E8A32] flex items-center gap-1"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2">
                  {BRIEF_PRODUCTS.map((prod) => (
                    <Link
                      key={prod.id}
                      to={prod.link}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-3 p-2.5 rounded-2xl bg-[#F8F9F4] hover:bg-white border border-[#1E3D2A]/10 hover:border-[#5B9A3C] transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-14 h-14 rounded-xl bg-white border border-[#CBDCC5] overflow-hidden shrink-0 p-1 flex items-center justify-center shadow-2xs group-hover:border-[#5B9A3C] transition-colors">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
                        />
                      </div>

                      {/* Product Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs sm:text-[13px] font-serif font-bold text-[#143823] truncate group-hover:text-[#5B9A3C] transition-colors">
                            {prod.name}
                          </h4>
                        </div>
                        <p className="text-[10px] font-mono text-[#5B9A3C] font-semibold mt-0.5 truncate">
                          {prod.tag}
                        </p>
                        <p className="text-[10px] font-mono text-[#1E3D2A]/60 mt-0.5 truncate">
                          {prod.cas}
                        </p>
                      </div>

                      <div className="w-6 h-6 rounded-full bg-white text-[#143823] group-hover:bg-[#143823] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* --- FACILITY & HEADQUARTERS ADDRESS --- */}
              <div className="pt-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#143823] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#5B9A3C]" />
                    <span>Manufacturing Plant &amp; HQ</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Kasor+Sojitra+Anand+Gujarat+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-[#5B9A3C] hover:text-[#4E8A32] flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs text-[#1E3D2A]/85 leading-relaxed font-light">
                  <p>{COMPANY_DETAILS.address}</p>

                  <div className="mt-2.5 pt-2 border-t border-[#1E3D2A]/8 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#5B9A3C] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#5B9A3C]" />
                      <span>Licensed B2B Facility</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#143823] hover:text-[#5B9A3C] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-[#5B9A3C]" />
                          <span className="text-[#5B9A3C]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Monograph Footer */}
            <div className="px-5 py-2.5 bg-[#FAFBF8] border-t border-[#1E3D2A]/10 text-center shrink-0">
              <span className="text-[10px] font-mono text-[#1E3D2A]/65 block">
                ⚡ Commercial desk replies within 4 business hours
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================================================
          2. FLOATING ACTION CONTROLS (STACKED IN BOTTOM RIGHT)
      ======================================================================= */}
      <div className="flex flex-col items-end gap-2.5">
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
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-[#143823] hover:text-[#5B9A3C] border-2 border-[#5B9A3C]/35 shadow-[0_8px_20px_rgba(20,56,35,0.18)] flex items-center justify-center cursor-pointer transition-colors group"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#143823] group-hover:text-[#5B9A3C] transition-transform group-hover:-translate-y-0.5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Master Impressive Floating Action Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.94 }}
          className="relative group cursor-pointer focus:outline-hidden"
          title={isOpen ? "Close desk" : "Open Okhai Pharma Commercial Desk & Catalog"}
          aria-label="Commercial desk & products"
        >
          {/* Ambient Glowing Aura */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8CC63F] via-[#5B9A3C] to-[#D4AF37] opacity-60 blur-md group-hover:opacity-90 animate-pulse transition-opacity" />

          {/* Luxury Button Body */}
          <div className="relative px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-[#143823] via-[#1E4D35] to-[#143823] text-white border border-[#8CC63F]/50 shadow-[0_12px_35px_rgba(20,56,35,0.35)] flex items-center gap-2 sm:gap-2.5">
            {/* Animated Icon */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center text-[#8CC63F] shrink-0">
              {isOpen ? (
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white rotate-0 transition-transform duration-300" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8CC63F] animate-spin" style={{ animationDuration: '8s' }} />
              )}
            </div>

            {/* Label (Responsive) */}
            <span className="font-serif font-bold text-xs sm:text-sm tracking-wide text-white select-none whitespace-nowrap">
              {isOpen ? 'Close Desk' : 'Quick Connect'}
            </span>

            {/* Live Indicator Dot */}
            {!isOpen && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC63F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CC63F]" />
              </span>
            )}
          </div>
        </motion.button>
      </div>

    </div>
    </>
  );
};
