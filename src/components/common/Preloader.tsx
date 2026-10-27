import React, { useEffect, useState } from 'react';
import okhaiLogo from '../../assets/images/okhai-pharma-logo.png';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if already viewed in this browser session
    const hasSeen = sessionStorage.getItem('okhai_preloader_seen');
    if (hasSeen === 'true') {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              sessionStorage.setItem('okhai_preloader_seen', 'true');
              onComplete();
            }, 800);
          }, 350);
          return 100;
        }
        // Organic easing speed
        const increment = Math.max(1, Math.floor((100 - prev) / 6));
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F8F9F4] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background Soft Aurora */}
      <div className="absolute inset-0 aurora-mesh pointer-events-none opacity-60" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Company Logo with Luxury Animated Luminous Glow & Breathing Aura */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Ambient Multi-layer Glowing Pulse */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8CC63F]/40 via-[#5B9A3C]/25 to-transparent blur-3xl scale-125 animate-pulse" />
          
          {/* Official Company Logo in Luxury Glass Plinth */}
          <div className="relative px-6 py-5 sm:px-8 sm:py-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_25px_60px_rgba(20,56,35,0.15)] ring-1 ring-[#5B9A3C]/20 transition-all duration-700">
            <img
              src={okhaiLogo}
              alt="Okhai Pharma Intermediates Pvt. Ltd."
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm transition-transform duration-700"
            />
          </div>
        </div>

        {/* Percentage Counter */}
        <div className="mt-8 flex items-baseline gap-1 font-mono text-xs text-[#1E3D2A]/70">
          <span className="text-lg font-semibold text-[#1E3D2A] tabular-nums">{progress}</span>
          <span>%</span>
        </div>

        {/* Hairline Progress Bar */}
        <div className="w-48 h-[2px] bg-[#1E3D2A]/10 mt-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#5B9A3C] to-[#8CC63F] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Botanical subtle caption */}
        <p className="mt-4 text-[11px] text-[#1E3D2A]/50 tracking-wider">
          Pure Nicotine. Precisely Made.
        </p>
      </div>
    </div>
  );
};
