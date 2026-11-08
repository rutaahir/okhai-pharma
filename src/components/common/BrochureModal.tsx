import React, { useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BROCHURE_PAGES = [
  {
    page: 1,
    title: 'Page 1: Corporate Profile & Infrastructure',
    description: 'Corporate overview, GMP-compliant plant at Kasor (Anand), manufacturing capacities & quality control.',
    image: '/downloads/brochure-pages/page-1.jpg',
  },
  {
    page: 2,
    title: 'Page 2: Pure Nicotine USP/EP ≥99.5%',
    description: 'Pharmaceutical API grade, analytical specifications, EP/USP monograph compliance & packaging.',
    image: '/downloads/brochure-pages/page-2.jpg',
  },
  {
    page: 3,
    title: 'Page 3: Nicotine Sulphate 40%',
    description: 'Water-soluble intermediate, agricultural & technical synthesis formulations (CAS 65-30-5).',
    image: '/downloads/brochure-pages/page-3.jpg',
  },
  {
    page: 4,
    title: 'Page 4: Nicotine Alkaloid & Global Export',
    description: 'Vacuum-distilled alkaloid 90/95%, regulatory filings, global export documentation (CoA, MSDS, REACH).',
    image: '/downloads/brochure-pages/page-4.jpg',
  },
];

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'pages' | 'pdf'>('pages');

  if (!isOpen) return null;

  const currentPage = BROCHURE_PAGES[activePageIndex];

  const handleNext = () => {
    setActivePageIndex((prev) => (prev < BROCHURE_PAGES.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActivePageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.0, z + 0.25));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.75, z - 0.25));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-[#1E3D2A]/15 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* =====================================================================
            1. MODAL HEADER
        ===================================================================== */}
        <div className="px-5 py-4 border-b border-[#1E3D2A]/10 bg-[#FAFBF8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2E5] border border-[#5B9A3C]/30 flex items-center justify-center text-[#5B9A3C] shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#1E3D2A]">
                  Okhai Pharma Corporate Product Brochure
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EAF2E5] text-[#5B9A3C] border border-[#5B9A3C]/20">
                  4 Pages · Official Monograph
                </span>
              </div>
              <p className="text-[11px] text-[#1E3D2A]/60 mt-0.5">
                Pure Nicotine 99.5% USP/EP · Nicotine Sulphate 40% · Nicotine Alkaloid 90/95%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-[#F0F2EB] p-0.5 rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('pages')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'pages'
                    ? 'bg-white font-bold text-[#1E3D2A] shadow-xs'
                    : 'text-[#1E3D2A]/60 hover:text-[#1E3D2A]'
                }`}
              >
                Page Slides
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'pdf'
                    ? 'bg-white font-bold text-[#1E3D2A] shadow-xs'
                    : 'text-[#1E3D2A]/60 hover:text-[#1E3D2A]'
                }`}
              >
                Interactive PDF
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-[#1E3D2A]/15 bg-white text-[#1E3D2A] hover:bg-[#1E3D2A] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            2. MODAL BODY (PAGE SLIDES OR EMBEDDED PDF)
        ===================================================================== */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#F4F6F0]">
          
          {/* Main Viewer Area */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-3 sm:p-5 relative">
            {viewMode === 'pdf' ? (
              <div className="w-full h-full min-h-[480px] bg-white rounded-2xl shadow-inner border border-[#1E3D2A]/10 overflow-hidden">
                <iframe
                  src="/downloads/Okhai_Pharma_Brochure.pdf#toolbar=1"
                  title="Okhai Pharma Corporate Brochure PDF"
                  className="w-full h-full min-h-[500px]"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {/* Image Canvas with Zoom */}
                <div className="relative max-w-full max-h-[56vh] flex items-center justify-center overflow-auto rounded-2xl bg-white shadow-md border border-[#1E3D2A]/10 p-2">
                  <img
                    src={currentPage.image}
                    alt={currentPage.title}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s ease',
                    }}
                    className="max-h-[52vh] w-auto object-contain rounded-lg select-none"
                  />

                  {/* Page Navigation Floating Arrows */}
                  <button
                    type="button"
                    disabled={activePageIndex === 0}
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-[#1E3D2A]/15 text-[#1E3D2A] hover:bg-[#5B9A3C] hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none shadow-md"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    disabled={activePageIndex === BROCHURE_PAGES.length - 1}
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-[#1E3D2A]/15 text-[#1E3D2A] hover:bg-[#5B9A3C] hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none shadow-md"
                    title="Next Page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Controls Bar */}
                <div className="mt-3 flex items-center gap-3 bg-white/95 px-4 py-1.5 rounded-full border border-[#1E3D2A]/10 shadow-xs text-xs font-mono">
                  <span className="font-bold text-[#1E3D2A]">
                    Page {activePageIndex + 1} of {BROCHURE_PAGES.length}
                  </span>
                  <div className="h-3 w-px bg-[#1E3D2A]/15" />
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    className="p-1 hover:text-[#5B9A3C]"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    className="p-1 hover:text-[#5B9A3C]"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="p-1 hover:text-[#5B9A3C]"
                    title="Reset zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-[#1E3D2A]/50">
                    {(zoomLevel * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Page Thumbnails & Technical Highlights */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-[#1E3D2A]/10 bg-white p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E3D2A]/60">
                  Document Pages ({BROCHURE_PAGES.length})
                </span>
                <span className="text-[10px] font-mono font-semibold text-[#5B9A3C]">
                  High Definition
                </span>
              </div>

              {/* 4 Page Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
                {BROCHURE_PAGES.map((p, idx) => (
                  <button
                    key={p.page}
                    type="button"
                    onClick={() => {
                      setActivePageIndex(idx);
                      setViewMode('pages');
                    }}
                    className={`p-2 rounded-2xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      activePageIndex === idx
                        ? 'border-[#5B9A3C] bg-[#F4F9F1] ring-2 ring-[#5B9A3C]/20 shadow-xs'
                        : 'border-[#1E3D2A]/10 hover:border-[#5B9A3C]/50 hover:bg-[#FAFBF8]'
                    }`}
                  >
                    <div className="w-10 h-14 rounded-lg overflow-hidden bg-white border border-[#1E3D2A]/15 shrink-0 shadow-2xs">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#5B9A3C]">
                          PAGE 0{p.page}
                        </span>
                        {activePageIndex === idx && (
                          <CheckCircle2 className="w-3 h-3 text-[#5B9A3C]" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#1E3D2A] truncate mt-0.5">
                        {p.title.split(':')[1]?.trim() || p.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Technical Specifications Highlights */}
              <div className="mt-4 p-3 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3D2A] text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Certified Specifications</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#1E3D2A]/75 font-mono">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
                    <span>Pure Nicotine: ≥ 99.5% (USP/EP)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
                    <span>Nicotine Sulphate: 40% Active</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
                    <span>Nicotine Alkaloid: 90% / 95% API</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
                    <span>Manufacturing: Kasor, Gujarat</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Plant Sales Contact */}
            <div className="mt-4 pt-3 border-t border-[#1E3D2A]/10 text-[11px] text-[#1E3D2A]/70">
              <span className="font-mono text-[10px] uppercase text-[#1E3D2A]/50 block">Technical Sales Desk:</span>
              <a href="tel:+917990082565" className="font-mono font-bold text-[#5B9A3C] hover:underline">
                +91 79900 82565
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================================
            3. MODAL ACTIONS FOOTER
        ===================================================================== */}
        <div className="px-5 py-3.5 border-t border-[#1E3D2A]/10 bg-[#FAFBF8] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#1E3D2A]/70 flex items-center gap-2">
            <span className="font-mono font-bold text-[#1E3D2A]">Okhai_Pharma_Brochure.pdf</span>
            <span>(3.86 MB · Vector Quality)</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* View Fullscreen in new tab */}
            <a
              href="/downloads/Okhai_Pharma_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#1E3D2A]/20 hover:border-[#5B9A3C] text-xs font-semibold text-[#1E3D2A] hover:bg-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5B9A3C]" />
              <span>Open in New Tab</span>
            </a>

            {/* Primary Direct Download Button */}
            <a
              href="/downloads/Okhai_Pharma_Brochure.pdf"
              download="Okhai_Pharma_Corporate_Brochure.pdf"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:shadow-[#5B9A3C]/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Brochure (PDF)</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

