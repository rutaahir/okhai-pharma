import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Send,
  CheckCircle2,
  FileDown,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Clock,
  Award,
  Building2,
  FlaskConical,
  Anchor,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';
import { FadeInUp, StaggerContainer, StaggerItem } from './animations';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#07130A] text-white pt-8 sm:pt-10 lg:pt-12 pb-24 sm:pb-10 overflow-hidden border-t border-[#8CC63F]/20">
      
      {/* Subtle Ambient Radial Lights */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[220px] bg-[#5B9A3C]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-4 right-10 w-[400px] h-[180px] bg-[#8CC63F]/8 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        {/* =========================================================================
            1. SLEEK COMPACT SAAS ACTION BAR (Reduced Height & High-Impact)
        ========================================================================= */}
        <FadeInUp>
          <div className="mb-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 px-5 py-4 sm:px-6 sm:py-4.5 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8CC63F]/15 border border-[#8CC63F]/30 text-[#8CC63F] text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-[#8CC63F] animate-pulse" />
                <span>Plant Status: Operational · Kasor, Gujarat</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-white/70">
                <span className="text-white/30">|</span>
                <span className="flex items-center gap-1 text-white/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8CC63F]" /> WHO-GMP
                </span>
                <span className="text-white/30">·</span>
                <span>ISO 9001:2015</span>
                <span className="text-white/30">·</span>
                <span>DGFT Registered</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
              <Link
                to="/contact"
                className="px-4 py-2 rounded-xl bg-[#5B9A3C] hover:bg-[#6EB448] text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#5B9A3C]/20 flex items-center justify-center gap-2 group flex-1 sm:flex-initial"
              >
                <span>Request Export Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/downloads"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial"
              >
                <FileDown className="w-3.5 h-3.5 text-[#8CC63F]" />
                <span>Dossier &amp; COA</span>
              </Link>
            </div>
          </div>
        </FadeInUp>

        {/* =========================================================================
            2. COMPACT 5-COLUMN DIRECTORY GRID
        ========================================================================= */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand & Credentials (3.5 cols) */}
          <StaggerItem className="lg:col-span-4 flex flex-col gap-3.5">
            <Link to="/" className="inline-block bg-white px-3 py-1.5 rounded-xl w-fit shadow-sm">
              <img
                src="/logo.png"
                alt="Okhai Pharma Intermediates"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              High-purity Nicotine Sulfate 40% and Nicotine Alkaloid 90% / 95% manufacturer and bulk exporter. Engineered for pharmaceutical intermediates, academic research, and accredited global chemical synthesis.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#8CC63F] font-mono pt-0.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Plant Local Time: {currentTime || 'Loading...'} IST</span>
            </div>
          </StaggerItem>

          {/* Column 2: Products (Ordered as per Navbar Series: Sulfate 40% -> Alkaloid 90%/95% -> Pure Nicotine 99.5%+) */}
          <StaggerItem className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-wider font-mono text-[#8CC63F] font-semibold mb-3 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Products</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <Link to="/products/nicotine-sulfate-40" className="hover:text-[#8CC63F] transition-colors block group">
                  <span className="font-semibold text-white group-hover:text-[#8CC63F]">Nicotine Sulfate 40%</span>
                  <span className="block text-[10px] font-mono text-white/50">Water-soluble intermediate · UN 1658</span>
                </Link>
              </li>
              <li>
                <Link to="/products/nicotine-alkaloid-90-95" className="hover:text-[#8CC63F] transition-colors block group">
                  <span className="font-semibold text-white group-hover:text-[#8CC63F]">Nicotine Alkaloid 90% / 95%</span>
                  <span className="block text-[10px] font-mono text-white/50">Pharma API &amp; vacuum-distilled base</span>
                </Link>
              </li>
              <li>
                <Link to="/products/pure-nicotine-usp-ep-99-5" className="hover:text-[#8CC63F] transition-colors block group">
                  <span className="font-semibold text-white group-hover:text-[#8CC63F]">Pure Nicotine USP/EP 99.5%+</span>
                  <span className="block text-[10px] font-mono text-[#8CC63F]">USP / EP Monograph · Colorless &amp; Odorless</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#8CC63F] transition-colors text-white/60">
                  Analytical Standards
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Column 3: Corporate Links (2 cols) */}
          <StaggerItem className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-wider font-mono text-[#8CC63F] font-semibold mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Company</span>
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link to="/about" className="hover:text-[#8CC63F] transition-colors">About Okhai</Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-[#8CC63F] transition-colors">Board &amp; Leadership</Link>
              </li>
              <li>
                <Link to="/quality-process" className="hover:text-[#8CC63F] transition-colors">Quality &amp; QC</Link>
              </li>
              <li>
                <Link to="/export" className="hover:text-[#8CC63F] transition-colors">Global Supply Ports</Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-[#8CC63F] transition-colors">Dossiers &amp; Specs</Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Column 4: Plant Address & Quick Contact (3 cols) */}
          <StaggerItem className="lg:col-span-3 flex flex-col gap-2.5">
            <h4 className="text-[11px] uppercase tracking-wider font-mono text-[#8CC63F] font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Plant &amp; Direct Desk</span>
            </h4>
            
            <p className="text-xs text-white/75 leading-relaxed font-normal">
              Sr No. 538, Ashapuri-Changa Road, Vill-Kasor, Ta-Sojitra, Dist-Anand, Gujarat 388460, India
            </p>

            <div className="space-y-1 text-xs text-white/80 pt-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#8CC63F] shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="font-mono hover:text-[#8CC63F] transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#8CC63F] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-[#8CC63F] transition-colors truncate">
                  {COMPANY_DETAILS.email}
                </a>
              </p>
            </div>

            {/* Newsletter Dispatch Input */}
            <div className="mt-1">
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-[11px] text-[#8CC63F] bg-white/5 px-2.5 py-1.5 rounded-lg border border-[#8CC63F]/30">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Subscribed</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Corporate email"
                    required
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#8CC63F]"
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 rounded-lg bg-[#5B9A3C] text-white hover:bg-[#6EB448] transition-colors shrink-0"
                    title="Subscribe"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* =========================================================================
            4. BOTTOM BAR: COPYRIGHT (CENTERED), PRIVACY & BACK TO TOP
        ========================================================================= */}
        <div className="pt-6 pb-2 flex flex-col items-center justify-center gap-3.5 text-xs text-white/55 border-t border-white/5">
          {/* Centered Last Line */}
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-center text-[11px] sm:text-xs">
            <span>© {new Date().getFullYear()} Okhai Pharma Intermediates Pvt. Ltd.</span>
            <span className="text-white/25 hidden sm:inline">|</span>
            <span className="uppercase tracking-wider text-white/60 font-medium">ALL RIGHTS RESERVED</span>
            <span className="text-white/25 hidden sm:inline">|</span>
            <span className="text-white/70">DEVELOPED BY</span>
            <a
              href="https://www.technoadviser.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="TechnoAdviser Technologies Pvt. Ltd. — Web, Mobile & Digital Solutions"
              className="relative inline-flex items-center gap-1.5 font-bold tracking-wider text-[#8CC63F] hover:text-white transition-all duration-300 group/tech px-2.5 py-0.5 rounded-lg bg-[#8CC63F]/12 hover:bg-[#8CC63F]/25 border border-[#8CC63F]/35 shadow-xs hover:shadow-[0_0_18px_rgba(140,198,63,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-ping" />
              <span className="underline decoration-[#8CC63F]/50 underline-offset-4 group-hover/tech:decoration-white font-mono text-[11px] sm:text-xs font-bold">
                TECHNOADVISER
              </span>
              <span className="text-[10px] opacity-80 group-hover/tech:opacity-100 group-hover/tech:translate-x-0.5 group-hover/tech:-translate-y-0.5 transition-transform duration-300">
                ↗
              </span>
            </a>
          </p>

          <div className="flex items-center justify-center gap-5 shrink-0">
            <Link to="/legal" className="hover:text-[#8CC63F] transition-colors text-white/65 text-[11px] sm:text-xs">
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link to="/legal" className="hover:text-[#8CC63F] transition-colors text-white/65 text-[11px] sm:text-xs">
              Terms &amp; Disclaimer
            </Link>
            <span className="text-white/20">·</span>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 hover:text-[#8CC63F] transition-colors pl-1 cursor-pointer"
              title="Back to top"
            >
              <span className="font-mono text-[11px] text-white/70 group-hover:text-[#8CC63F]">Top</span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#8CC63F]"
                    strokeDasharray={`${scrollProgress}, 100`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <ArrowUp className="w-3 h-3 absolute text-white group-hover:text-[#8CC63F] transition-colors" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
