import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageCurtain: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitioning(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      const timer1 = setTimeout(() => {
        setDisplayLocation(location);
        const timer2 = setTimeout(() => {
          setTransitioning(false);
        }, 400);
        return () => clearTimeout(timer2);
      }, 350);
      return () => clearTimeout(timer1);
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* Route Transition Overlay */}
      <div
        className={`fixed inset-0 z-[9000] pointer-events-none flex items-center justify-center bg-[#F8F9F4] transition-all duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          transitioning
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-[#5B9A3C]/30 flex items-center justify-center bg-white shadow-sm">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-[#5B9A3C] animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <span className="text-xs uppercase tracking-widest font-mono text-[#1E3D2A]/70">
            Okhai Pharma
          </span>
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-20' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};
