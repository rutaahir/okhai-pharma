import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  FileDown,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
  Globe2,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS, PRODUCTS } from '../../data/companyData';
import sulfatePkgImg from '../../assets/images/product-nicotine-sulfate-pkg.jpg';
import alkaloidPkgImg from '../../assets/images/product-nicotine-alkaloid-pkg.jpg';
import pureNicotinePkgImg from '../../assets/images/product-pure-nicotine-pkg.jpg';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* 1. Main Glass Floating Navbar (Sticky on scroll, permanently white pill) */}
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 flex justify-center px-0 transition-all duration-300 pointer-events-none">
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 border border-[#1E3D2A]/10 bg-white/95 backdrop-blur-xl text-[#1E3D2A] pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-700 ${
            scrolled
              ? 'shadow-xl shadow-[#1E3D2A]/12 py-2 sm:py-2.5 px-4 sm:px-6 bg-white/98'
              : 'shadow-lg shadow-[#1E3D2A]/5 py-3 sm:py-3.5 px-5 sm:px-8 bg-white/90'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo lockup */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Okhai Pharma Home">
              <img
                src="/assets/aistudio/image_7ccf5a84.png"
                alt="Okhai Pharma Intermediates Logo"
                className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </Link>

            {/* Desktop Center Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#1E3D2A]/85">
              <Link
                to="/"
                className={`relative py-1 transition-colors hover:text-[#5B9A3C] ${
                  isActive('/') && location.pathname === '/' ? 'text-[#5B9A3C] font-semibold' : ''
                }`}
              >
                Home
                {isActive('/') && location.pathname === '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}
              </Link>

              <Link
                to="/about"
                className={`relative py-1 transition-colors hover:text-[#5B9A3C] ${
                  isActive('/about') ? 'text-[#5B9A3C] font-semibold' : ''
                }`}
              >
                About Us
                {isActive('/about') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}
              </Link>

              {/* Products Dropdown / Mega Menu Anchor */}
              <div
                className="relative py-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/products"
                  className={`flex items-center gap-1 transition-colors hover:text-[#5B9A3C] ${
                    isActive('/products') ? 'text-[#5B9A3C] font-semibold' : ''
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-[#5B9A3C]' : ''}`} />
                </Link>
                {isActive('/products') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}

                {/* Desktop Mega Menu Dropdown */}
                {megaMenuOpen && (
                  <div
                    className="absolute top-full -left-28 pt-4 w-[620px] transition-all duration-200"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white text-[#1E3D2A] rounded-2xl shadow-xl shadow-[#1E3D2A]/10 border hairline-border p-5 grid grid-cols-12 gap-4">
                      {/* Left: 3 Product Cards with Real Packaging Images (Pure Nicotine 3rd) */}
                      <div className="col-span-8 flex flex-col gap-2.5">
                        {/* 1. Nicotine Sulfate 40% */}
                        <Link
                          to="/products/nicotine-sulfate-40"
                          className="p-2.5 rounded-xl border border-[#1E3D2A]/8 hover:border-[#5B9A3C]/40 hover:bg-[#F8F9F4] transition-all group/item flex items-center gap-3.5"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#5B9A3C]/20 shrink-0 group-hover/item:border-[#5B9A3C] group-hover/item:scale-105 transition-all shadow-xs relative">
                            <img
                              src={sulfatePkgImg}
                              alt="Nicotine Sulfate 40% Packaging"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-[#1E3D2A] group-hover/item:text-[#5B9A3C] truncate">
                                Nicotine Sulfate 40%
                              </h4>
                              <span className="text-[10px] text-[#5B9A3C] font-mono bg-[#EAF2E5] px-1.5 py-0.2 rounded font-semibold">40% · UN 1658</span>
                            </div>
                            <p className="text-xs text-[#1E3D2A]/70 mt-0.5 truncate">
                              Water-soluble intermediate, 40% active nicotine
                            </p>
                            <span className="text-[11px] font-semibold text-[#5B9A3C] flex items-center gap-1 mt-1 group-hover/item:translate-x-1 transition-transform">
                              View product <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>

                        {/* 2. Nicotine Alkaloid 90% / 95% */}
                        <Link
                          to="/products/nicotine-alkaloid-90-95"
                          className="p-2.5 rounded-xl border border-[#1E3D2A]/8 hover:border-[#5B9A3C]/40 hover:bg-[#F8F9F4] transition-all group/item flex items-center gap-3.5"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#5B9A3C]/20 shrink-0 group-hover/item:border-[#5B9A3C] group-hover/item:scale-105 transition-all shadow-xs relative">
                            <img
                              src={alkaloidPkgImg}
                              alt="Nicotine Alkaloid 90% / 95% Packaging"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-[#1E3D2A] group-hover/item:text-[#5B9A3C] truncate">
                                Nicotine Alkaloid 90% / 95%
                              </h4>
                              <span className="text-[10px] text-[#5B9A3C] font-mono bg-[#EAF2E5] px-1.5 py-0.2 rounded font-semibold">95% · API</span>
                            </div>
                            <p className="text-xs text-[#1E3D2A]/70 mt-0.5 truncate">
                              Pharma API &amp; vacuum-distilled alkaloid grade
                            </p>
                            <span className="text-[11px] font-semibold text-[#5B9A3C] flex items-center gap-1 mt-1 group-hover/item:translate-x-1 transition-transform">
                              View product <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>

                        {/* 3. Pure Nicotine USP/EP 99.5%+ (Placed as 3rd product) */}
                        <Link
                          to="/products/pure-nicotine-usp-ep-99-5"
                          className="p-2.5 rounded-xl border border-[#5B9A3C]/35 bg-[#F4F9F1] hover:border-[#5B9A3C] hover:bg-[#EEF7EB] transition-all group/item flex items-center gap-3.5 shadow-xs"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#5B9A3C]/30 shrink-0 group-hover/item:border-[#5B9A3C] group-hover/item:scale-105 transition-all shadow-xs relative">
                            <img
                              src={pureNicotinePkgImg}
                              alt="Pure Nicotine USP/EP 99.5%+ Packaging"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-[#1E3D2A] group-hover/item:text-[#5B9A3C] truncate">
                                Pure Nicotine USP/EP 99.5%+
                              </h4>
                              <span className="text-[10px] text-white bg-[#5B9A3C] px-1.5 py-0.5 rounded-full font-mono font-medium">USP/EP · 99.5%+</span>
                            </div>
                            <p className="text-xs text-[#1E3D2A]/70 mt-0.5 truncate">
                              Colorless, odorless &amp; stable pharmaceutical API base
                            </p>
                            <span className="text-[11px] font-semibold text-[#5B9A3C] flex items-center gap-1 mt-1 group-hover/item:translate-x-1 transition-transform">
                              View product <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      </div>

                      {/* Right: Side Panel */}
                      <div className="col-span-4 bg-[#F8F9F4] rounded-xl p-4 flex flex-col justify-between border border-[#1E3D2A]/5">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-mono text-[#5B9A3C] font-semibold">
                            Technical Specs
                          </span>
                          <p className="text-xs text-[#1E3D2A]/80 mt-1.5 font-medium leading-relaxed">
                            Need complete specifications, HPLC limits, or sample CoAs?
                          </p>
                        </div>
                        <Link
                          to="/downloads"
                          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
                        >
                          <FileDown className="w-4 h-4 text-[#5B9A3C]" />
                          <span>Download brochure</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/quality-process"
                className={`relative py-1 transition-colors hover:text-[#5B9A3C] ${
                  isActive('/quality-process') ? 'text-[#5B9A3C] font-semibold' : ''
                }`}
              >
                Quality &amp; Process
                {isActive('/quality-process') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}
              </Link>

              <Link
                to="/leadership"
                className={`relative py-1 transition-colors hover:text-[#5B9A3C] ${
                  isActive('/leadership') ? 'text-[#5B9A3C] font-semibold' : ''
                }`}
              >
                Leadership
                {isActive('/leadership') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}
              </Link>

              <Link
                to="/export"
                className={`relative py-1 transition-colors hover:text-[#5B9A3C] ${
                  isActive('/export') ? 'text-[#5B9A3C] font-semibold' : ''
                }`}
              >
                Export
                {isActive('/export') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}
              </Link>

              <Link
                to="/downloads"
                className={`relative py-1 transition-colors hover:text-[#5B9A3C] ${
                  isActive('/downloads') ? 'text-[#5B9A3C] font-semibold' : ''
                }`}
              >
                Downloads
                {isActive('/downloads') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}
              </Link>

              <Link
                to="/contact"
                className={`relative py-1 transition-colors hover:text-[#5B9A3C] ${
                  isActive('/contact') ? 'text-[#5B9A3C] font-semibold' : ''
                }`}
              >
                Contact
                {isActive('/contact') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#5B9A3C]" />
                )}
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Secondary Brochure Button */}
              <Link
                to="/downloads"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-[#1E3D2A]/15 text-[#1E3D2A] hover:border-[#5B9A3C] hover:bg-[#E6EEDF]/40 transition-colors"
                title="Download Corporate Brochure"
              >
                <FileDown className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Brochure</span>
              </Link>

              {/* Primary Request a Quote Button */}
              <Link
                to="/contact"
                className="relative overflow-hidden group/btn px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm bg-[#5B9A3C] text-white hover:bg-[#4e8532] hover:shadow-md hover:shadow-[#5B9A3C]/25"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </span>
                <span className="absolute inset-0 bg-[#4e8532] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#1E3D2A]/10 text-[#1E3D2A] hover:bg-black/5 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Fullscreen Frosted Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F8F9F4]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-28 px-6 lg:hidden overflow-y-auto">
          <div className="flex flex-col gap-5 max-w-md mx-auto w-full">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
            >
              About Us
            </Link>

            {/* Mobile Products Accordion */}
            <div className="border-b border-[#1E3D2A]/10 pb-3">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between text-2xl font-serif font-semibold text-[#1E3D2A]"
              >
                <span>Products</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileProductsOpen ? 'rotate-180 text-[#5B9A3C]' : ''}`} />
              </button>
              {mobileProductsOpen && (
                <div className="mt-3 pl-3 flex flex-col gap-2.5">
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-[#5B9A3C]"
                  >
                    All Products Overview →
                  </Link>
                  {/* 1. Nicotine Sulfate 40% */}
                  <Link
                    to="/products/nicotine-sulfate-40"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F9F1] transition-all group"
                  >
                    <img
                      src={sulfatePkgImg}
                      alt="Nicotine Sulfate 40%"
                      className="w-10 h-10 rounded-lg object-cover border border-[#5B9A3C]/20 bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#1E3D2A] group-hover:text-[#5B9A3C]">
                          Nicotine Sulfate 40%
                        </span>
                        <span className="text-[10px] font-mono text-[#5B9A3C] bg-[#EAF2E5] px-1.5 py-0.5 rounded font-bold">40%</span>
                      </div>
                      <span className="text-[11px] text-[#1E3D2A]/60 block truncate">Water-soluble intermediate</span>
                    </div>
                  </Link>

                  {/* 2. Nicotine Alkaloid 90% / 95% */}
                  <Link
                    to="/products/nicotine-alkaloid-90-95"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F9F1] transition-all group"
                  >
                    <img
                      src={alkaloidPkgImg}
                      alt="Nicotine Alkaloid 90% / 95%"
                      className="w-10 h-10 rounded-lg object-cover border border-[#5B9A3C]/20 bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#1E3D2A] group-hover:text-[#5B9A3C]">
                          Nicotine Alkaloid 90% / 95%
                        </span>
                        <span className="text-[10px] font-mono text-[#5B9A3C] bg-[#EAF2E5] px-1.5 py-0.5 rounded font-bold">95%</span>
                      </div>
                      <span className="text-[11px] text-[#1E3D2A]/60 block truncate">Pharma API &amp; distilled alkaloid</span>
                    </div>
                  </Link>

                  {/* 3. Pure Nicotine USP/EP 99.5%+ (3rd product) */}
                  <Link
                    to="/products/pure-nicotine-usp-ep-99-5"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-[#F4F9F1]/80 hover:bg-[#F4F9F1] transition-all group border border-[#5B9A3C]/20"
                  >
                    <img
                      src={pureNicotinePkgImg}
                      alt="Pure Nicotine USP/EP 99.5%+"
                      className="w-10 h-10 rounded-lg object-cover border border-[#5B9A3C]/30 bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#1E3D2A] group-hover:text-[#5B9A3C]">
                          Pure Nicotine USP/EP 99.5%+
                        </span>
                        <span className="text-[10px] font-mono text-white bg-[#5B9A3C] px-1.5 py-0.5 rounded-full font-bold">USP/EP</span>
                      </div>
                      <span className="text-[11px] text-[#1E3D2A]/60 block truncate">Pharmaceutical API base</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/quality-process"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
            >
              Quality &amp; Process
            </Link>

            <Link
              to="/leadership"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
            >
              Leadership
            </Link>

            <Link
              to="/export"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
            >
              Global Export
            </Link>

            <Link
              to="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
            >
              Downloads &amp; Specs
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif font-semibold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="max-w-md mx-auto w-full pt-6 border-t border-[#1E3D2A]/10 flex flex-col gap-3 text-xs text-[#1E3D2A]/80">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#5B9A3C]" />
              <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="font-mono tabular-nums">
                {COMPANY_DETAILS.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#5B9A3C]" />
              <a href={`mailto:${COMPANY_DETAILS.email}`}>{COMPANY_DETAILS.email}</a>
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Sticky Bottom Action Bar (Thumb friendly, 48px targets) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#1E3D2A]/10 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Call */}
          <a
            href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-1.5 h-12 rounded-xl border border-[#1E3D2A]/15 bg-[#F8F9F4] text-[#1E3D2A] text-xs font-semibold active:scale-98 transition-transform"
          >
            <Phone className="w-4 h-4 text-[#5B9A3C]" />
            <span>Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={COMPANY_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#128C7E] text-xs font-semibold active:scale-98 transition-transform"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          {/* Quote */}
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center justify-center gap-1.5 h-12 rounded-xl bg-[#5B9A3C] text-white text-xs font-semibold active:scale-98 transition-transform shadow-md shadow-[#5B9A3C]/20"
          >
            <span>Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
