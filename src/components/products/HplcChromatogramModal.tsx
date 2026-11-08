import React, { useState } from 'react';
import {
  X,
  Activity,
  FileCheck2,
  Download,
  Printer,
  Sparkles,
  Info,
  Beaker,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface HplcModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  casNumber: string;
  purityScore: string;
  batchNumber?: string;
}

export const HplcChromatogramModal: React.FC<HplcModalProps> = ({
  isOpen,
  onClose,
  productName,
  casNumber,
  purityScore,
  batchNumber = 'OKHAI-2026-B8492'
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; intensity: string; peakName: string } | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  // Chromatography peaks definition
  const peaks = [
    { time: '1.45 min', intensity: '12 mAU', name: 'Solvent Front (Methanol)' },
    { time: '2.80 min', intensity: '4 mAU', name: 'Trace Related Substance (<0.05%)' },
    { time: '4.82 min', intensity: '986 mAU', name: `${productName} Active Peak (Area: ${purityScore})` },
    { time: '7.10 min', intensity: '2 mAU', name: 'Baseline Stability' },
  ];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0E1F14]/70 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#5B9A3C]/30 text-[#1E3D2A] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="p-6 border-b border-[#1E3D2A]/10 bg-gradient-to-r from-[#FAFBF8] via-[#F4F8F1] to-[#EAF2E6] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5B9A3C] text-white flex items-center justify-center shadow-md shadow-[#5B9A3C]/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B9A3C] font-bold">
                  Quality Control Lab · High-Performance Liquid Chromatography
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAF2E5] text-[#2E683A] text-[10px] font-mono font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-[#5B9A3C]" /> Validated
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1E3D2A]">
                Analytical Chromatogram: {productName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1E3D2A]/70 hover:text-[#1E3D2A] border border-[#1E3D2A]/15 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#1E3D2A]/60 block">Batch Release</span>
              <span className="font-mono font-bold text-[#1E3D2A]">{batchNumber}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#1E3D2A]/60 block">CAS Identifier</span>
              <span className="font-mono font-bold text-[#5B9A3C]">{casNumber}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#1E3D2A]/60 block">Purity Assay</span>
              <span className="font-mono font-bold text-[#2E683A]">{purityScore} by Area %</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#1E3D2A]/60 block">Detector Wavelength</span>
              <span className="font-mono font-bold text-[#1E3D2A]">UV 260 nm (Isocratic)</span>
            </div>
          </div>

          {/* Interactive Chromatogram Chart Area */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0F2116] text-white border border-[#2D5A3C] shadow-inner relative overflow-hidden">
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E3D2A_1px,transparent_1px),linear-gradient(to_bottom,#1E3D2A_1px,transparent_1px)] bg-[size:3rem_2rem] opacity-30 pointer-events-none" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8CC63F] animate-ping" />
                <span className="text-xs font-mono text-[#8CC63F] font-semibold">
                  UV Absorbance Spectrum (mAU vs Retention Time)
                </span>
              </div>
              <span className="text-[11px] font-mono text-white/50">Run Time: 10.00 min · Flow: 1.0 mL/min</span>
            </div>

            {/* SVG Waveform Graphic */}
            <div className="relative w-full h-56 sm:h-64 my-2">
              <svg viewBox="0 0 800 240" fill="none" className="w-full h-full">
                {/* Horizontal Baseline */}
                <line x1="50" y1="210" x2="770" y2="210" stroke="#2D5A3C" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Vertical Y Axis */}
                <line x1="50" y1="20" x2="50" y2="210" stroke="#2D5A3C" strokeWidth="1.5" />
                <text x="15" y="30" fill="#7E9F86" fontSize="10" fontFamily="monospace">1000</text>
                <text x="20" y="80" fill="#7E9F86" fontSize="10" fontFamily="monospace">750</text>
                <text x="20" y="130" fill="#7E9F86" fontSize="10" fontFamily="monospace">500</text>
                <text x="20" y="180" fill="#7E9F86" fontSize="10" fontFamily="monospace">250</text>
                <text x="32" y="215" fill="#7E9F86" fontSize="10" fontFamily="monospace">0</text>

                {/* X Axis Time Marks */}
                <text x="50" y="230" fill="#7E9F86" fontSize="10" fontFamily="monospace">0.0</text>
                <text x="190" y="230" fill="#7E9F86" fontSize="10" fontFamily="monospace">2.0</text>
                <text x="330" y="230" fill="#7E9F86" fontSize="10" fontFamily="monospace">4.0</text>
                <text x="470" y="230" fill="#7E9F86" fontSize="10" fontFamily="monospace">6.0</text>
                <text x="610" y="230" fill="#7E9F86" fontSize="10" fontFamily="monospace">8.0</text>
                <text x="750" y="230" fill="#7E9F86" fontSize="10" fontFamily="monospace">10.0 min</text>

                {/* Under-peak Green Gradient Fill */}
                <defs>
                  <linearGradient id="peakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#8CC63F" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Filled Peak Area */}
                <path
                  d="M50,210 L140,210 L150,195 L160,210 L240,210 L370,210 C382,210 387,25 388,25 C389,25 394,210 406,210 L770,210 Z"
                  fill="url(#peakGradient)"
                />

                {/* The Chromatogram Trace Line */}
                <path
                  d="M50,210 L140,210 Q145,210 150,195 Q155,210 160,210 L240,210 Q244,210 246,206 Q248,210 250,210 L370,210 C380,210 385,25 388,25 C391,25 396,210 406,210 L540,210 Q544,210 546,208 Q548,210 550,210 L770,210"
                  stroke="#8CC63F"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Active Peak Marker & Annotation */}
                <circle cx="388" cy="25" r="5" fill="#8CC63F" className="animate-pulse" />
                <line x1="388" y1="25" x2="388" y2="210" stroke="#8CC63F" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                {/* Callout Box over the peak */}
                <rect x="400" y="30" width="170" height="42" rx="8" fill="#1E3D2A" stroke="#8CC63F" strokeWidth="1" />
                <text x="410" y="47" fill="#8CC63F" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  Peak: RT 4.82 min
                </text>
                <text x="410" y="62" fill="#EAF2E5" fontSize="10" fontFamily="sans-serif">
                  Assay Purity: {purityScore}
                </text>
              </svg>
            </div>

            {/* Hoverable Peak Inspection Pills */}
            <div className="relative z-10 pt-2 border-t border-[#2D5A3C]/60 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="text-white/60 py-1">Inspect Peaks:</span>
              {peaks.map((p, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setHoveredPoint({ time: p.time, intensity: p.intensity, peakName: p.name })}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="px-3 py-1 rounded-lg bg-[#1E3D2A] hover:bg-[#2D5A3C] text-[#8CC63F] border border-[#2D5A3C] transition-colors cursor-pointer"
                >
                  {p.time} · {p.intensity}
                </button>
              ))}
            </div>

            {/* Active Hover Detail Bar */}
            {hoveredPoint && (
              <div className="mt-2 p-2.5 rounded-xl bg-[#2D5A3C]/80 border border-[#8CC63F]/40 text-xs text-white animate-fadeIn flex items-center justify-between">
                <span className="font-mono text-[#8CC63F] font-bold">{hoveredPoint.time}</span>
                <span>{hoveredPoint.peakName}</span>
                <span className="font-mono text-white/70">Intensity: {hoveredPoint.intensity}</span>
              </div>
            )}
          </div>

          {/* Chromatographic Conditions & Integration Results Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left: Method Parameters */}
            <div className="p-5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs space-y-2.5">
              <h4 className="font-serif font-semibold text-sm text-[#1E3D2A] flex items-center gap-1.5">
                <Beaker className="w-4 h-4 text-[#5B9A3C]" />
                <span>Validated Method Conditions</span>
              </h4>
              <div className="space-y-1.5 text-[#1E3D2A]/80">
                <div className="flex justify-between py-1 border-b border-[#1E3D2A]/5">
                  <span className="text-[#1E3D2A]/60">Stationary Phase:</span>
                  <span className="font-mono font-medium">C18 RP (250 × 4.6 mm, 5 µm)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E3D2A]/5">
                  <span className="text-[#1E3D2A]/60">Mobile Phase:</span>
                  <span className="font-mono font-medium">Phosphate Buffer pH 3.2 : ACN (85:15)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E3D2A]/5">
                  <span className="text-[#1E3D2A]/60">Flow Rate / Temp:</span>
                  <span className="font-mono font-medium">1.0 mL/min @ 25°C</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#1E3D2A]/60">Injection Volume:</span>
                  <span className="font-mono font-medium">10 µL Auto-sampler</span>
                </div>
              </div>
            </div>

            {/* Right: Integration Quantitative Results */}
            <div className="p-5 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs space-y-2.5">
              <h4 className="font-serif font-semibold text-sm text-[#1E3D2A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5B9A3C]" />
                <span>USP / EP System Suitability</span>
              </h4>
              <div className="space-y-1.5 text-[#1E3D2A]/80">
                <div className="flex justify-between py-1 border-b border-[#1E3D2A]/5">
                  <span className="text-[#1E3D2A]/60">Theoretical Plates (N):</span>
                  <span className="font-mono font-medium text-[#2E683A]">9,420 (Spec: &gt; 5,000) ✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E3D2A]/5">
                  <span className="text-[#1E3D2A]/60">Tailing Factor (T):</span>
                  <span className="font-mono font-medium text-[#2E683A]">1.06 (Spec: 0.8 - 1.5) ✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E3D2A]/5">
                  <span className="text-[#1E3D2A]/60">Resolution (Rs):</span>
                  <span className="font-mono font-medium text-[#2E683A]">3.42 (Spec: &gt; 2.0) ✓</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#1E3D2A]/60">Impurity Peak Sum:</span>
                  <span className="font-mono font-medium text-[#2E683A]">&lt; 0.15% (Within API limits) ✓</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E3D2A]/10">
            <div className="flex items-center gap-2 text-xs text-[#1E3D2A]/70">
              <Calendar className="w-4 h-4 text-[#5B9A3C]" />
              <span>Tested at Kasor Quality Assurance Central Laboratory, Gujarat, India</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-full bg-[#1E3D2A] hover:bg-[#2D5A3C] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#8CC63F]" />
                <span>{downloadSuccess ? "Report Downloaded!" : "Download Official CoA (PDF)"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
