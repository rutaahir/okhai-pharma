import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download, Sparkles, ShieldCheck, Maximize2 } from 'lucide-react';

export interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  badge
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset zoom on close or image change
  useEffect(() => {
    if (!isOpen) setIsZoomed(false);
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-packaging.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07130A]/90 backdrop-blur-xl cursor-zoom-out"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-[#5B9A3C]/35 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="px-5 py-4 sm:px-6 sm:py-4.5 bg-gradient-to-r from-[#143823] via-[#1E4D35] to-[#143823] text-white flex items-center justify-between shrink-0 border-b border-white/10 relative overflow-hidden">
            {/* Ambient emerald sheen */}
            <div className="absolute top-0 right-0 w-64 h-32 bg-[#8CC63F]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-[#8CC63F]/40 flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5 text-[#8CC63F]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white truncate">
                    {title}
                  </h3>
                  {badge && (
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#8CC63F] text-[#143823]">
                      {badge}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-xs text-white/75 truncate mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons: Zoom, Download, Close */}
            <div className="flex items-center gap-2 relative z-10 shrink-0 ml-3">
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title={isZoomed ? "Zoom out" : "Zoom in"}
                aria-label="Toggle zoom"
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Download high-resolution image"
                aria-label="Download image"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs ml-1"
                title="Close (Esc)"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High-Resolution Image Canvas */}
          <div className="relative flex-1 p-4 sm:p-8 bg-gradient-to-b from-[#FAFBF8] via-white to-[#F2F6EF] flex items-center justify-center overflow-auto min-h-[320px] max-h-[calc(92vh-130px)]">
            <div 
              onClick={() => setIsZoomed(!isZoomed)}
              className={`relative flex items-center justify-center transition-all duration-300 cursor-zoom-${isZoomed ? 'out' : 'in'} select-none`}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className={`max-w-full max-h-[68vh] object-contain drop-shadow-[0_20px_40px_rgba(20,56,35,0.25)] transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-135 cursor-zoom-out' : 'scale-100 hover:scale-[1.02]'
                }`}
              />
            </div>
          </div>

          {/* Bottom Footer Ribbon */}
          <div className="px-5 py-3 bg-white border-t border-[#1E3D2A]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#1E3D2A]/70 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5B9A3C]" />
              <span className="font-mono text-[11px]">
                High-Resolution Factory Packaging Visual · Cleanroom Sealed
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#5B9A3C] font-semibold">
                Click image to {isZoomed ? 'zoom out' : 'zoom in'}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 rounded-full bg-[#143823] text-white text-[11px] font-semibold hover:bg-[#1E4D35] transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
