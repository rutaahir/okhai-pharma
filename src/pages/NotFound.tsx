import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden bg-[#F8F9F4]">
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 bg-[#8CC63F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Animated Falling Leaf */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-[#E6EEDF] flex items-center justify-center animate-bounce">
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-[#5B9A3C] transition-transform duration-700 hover:rotate-45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12" />
          </svg>
        </div>
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-[#5B9A3C] font-semibold mb-2">
        Error 404
      </span>

      <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1E3D2A] tracking-tight">
        This page has wandered off.
      </h1>

      <p className="mt-4 text-sm sm:text-base text-[#1E3D2A]/70 max-w-md font-light leading-relaxed">
        The requested technical dossier or route does not exist or has been relocated to another section of our facility directory.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-[#5B9A3C] text-white text-xs font-semibold hover:bg-[#4E8A32] transition-colors flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <Link
          to="/products"
          className="px-5 py-3 rounded-xl bg-white text-xs font-semibold text-[#1E3D2A] border hairline-border hover:border-[#5B9A3C] transition-colors"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
};
