import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"], [data-cursor]');
      const cursorTextEl = target.closest('[data-cursor-text]') as HTMLElement | null;

      setIsPointer(!!interactiveEl);
      if (cursorTextEl) {
        setCursorText(cursorTextEl.getAttribute('data-cursor-text') || '');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(!!interactiveEl);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer Follower Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#5B9A3C]/40 transition-transform duration-150 ease-out flex items-center justify-center ${
          cursorText
            ? 'w-16 h-16 bg-[#5B9A3C]/10 backdrop-blur-[2px] -ml-8 -mt-8'
            : isHovered
            ? 'w-12 h-12 bg-[#5B9A3C]/10 -ml-6 -mt-6'
            : 'w-8 h-8 -ml-4 -mt-4'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-semibold text-[#1E3D2A] uppercase tracking-wider font-mono">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Small Dot */}
      <div
        className={`fixed top-0 left-0 rounded-full bg-[#5B9A3C] transition-transform duration-75 ease-out ${
          cursorText ? 'opacity-0' : isPointer ? 'w-2 h-2 -ml-1 -mt-1' : 'w-1.5 h-1.5 -ml-[3px] -mt-[3px]'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      />
    </div>
  );
};
