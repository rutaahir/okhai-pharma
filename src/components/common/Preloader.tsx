import React, { useEffect, useState } from 'react';

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
        {/* Animated Leaf SVG Sprig */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-[#5B9A3C]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Main botanical stem */}
            <path
              d="M 50 90 Q 48 50 50 15"
              strokeDasharray="100"
              strokeDashoffset={Math.max(0, 100 - progress)}
              className="transition-all duration-75 text-[#1E3D2A]"
            />
            {/* Left lower leaf */}
            <path
              d="M 49 70 Q 25 65 20 50 C 22 40 40 50 49 58"
              fill={progress > 40 ? 'rgba(91, 154, 60, 0.15)' : 'none'}
              strokeDasharray="80"
              strokeDashoffset={Math.max(0, 80 - Math.max(0, progress - 20) * 1.5)}
              className="transition-all duration-100"
            />
            {/* Right mid leaf */}
            <path
              d="M 50 55 Q 75 50 82 36 C 80 26 62 38 50 45"
              fill={progress > 60 ? 'rgba(140, 198, 63, 0.2)' : 'none'}
              strokeDasharray="80"
              strokeDashoffset={Math.max(0, 80 - Math.max(0, progress - 35) * 1.6)}
              className="transition-all duration-100"
            />
            {/* Left upper leaf */}
            <path
              d="M 50 40 Q 30 32 28 20 C 35 15 45 25 50 32"
              fill={progress > 75 ? 'rgba(91, 154, 60, 0.25)' : 'none'}
              strokeDasharray="60"
              strokeDashoffset={Math.max(0, 60 - Math.max(0, progress - 50) * 1.8)}
              className="transition-all duration-100"
            />
            {/* Top crown leaf */}
            <path
              d="M 50 25 C 45 10 55 10 50 15"
              strokeDasharray="40"
              strokeDashoffset={Math.max(0, 40 - Math.max(0, progress - 70) * 2)}
              className="transition-all duration-100"
            />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="space-y-1 transition-opacity duration-500" style={{ opacity: progress > 25 ? 1 : 0.2 }}>
          <h2 className="text-2xl font-serif font-semibold text-[#1E3D2A] tracking-tight">
            Okhai Pharma
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#5B9A3C] font-mono">
            Intermediates Pvt. Ltd.
          </p>
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
