import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import okhaiLogo from '../../assets/images/okhai-pharma-logo.png';

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
        <div className="relative flex flex-col items-center gap-3 px-6 py-6 max-w-sm text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8CC63F]/25 via-[#5B9A3C]/15 to-transparent blur-2xl pointer-events-none scale-125" />

          {/* Official Company Logo in Elegant Elevated Glass Card */}
          <div className="relative px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-[0_15px_35px_rgba(20,56,35,0.12)] ring-1 ring-[#5B9A3C]/20 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Okhai Pharma Intermediates Pvt. Ltd."
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-xs"
            />
          </div>

          {/* Micro pulsing progress indicator */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C]" />
          </div>
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-20' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};
