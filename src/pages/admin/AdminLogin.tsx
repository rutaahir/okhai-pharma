import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Leaf,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import heroFacilityBg from '../../assets/images/about-hero-facility.jpg';

export const AdminLogin: React.FC = () => {
  // Exactly 2 fields: 1) Username or Email, 2) Password (both empty)
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your username or email.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: identifier.trim(),
          email: identifier.trim(),
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in. Please verify your credentials.');
      }

      login(data.token, data.admin);
      navigate('/admin');
    } catch (err: any) {
      setError(err?.message || 'Network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#8CC63F]/30 selection:text-white">
      
      {/* 1. Full-Resolution Photographic Background of Okhai Pharma Facility */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={heroFacilityBg}
          alt="Okhai Pharma Manufacturing Facility Gujarat"
          className="w-full h-full object-cover object-[50%_15%] brightness-[0.98] contrast-[1.02]"
        />

        {/* Soft Top Scrim ONLY for header & form legibility in sky area, leaving factory building & logo bright below */}
        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#07130B]/80 via-[#07130B]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07130B]/60 to-transparent pointer-events-none" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 w-full px-5 sm:px-8 lg:px-12 pt-3 pb-1 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 hover:bg-black/65 border border-white/20 backdrop-blur-md text-[11px] font-mono text-[#8CC63F] transition-all hover:scale-102 shadow-lg"
        >
          <Leaf className="w-3.5 h-3.5 text-[#8CC63F]" />
          <span>Okhai Pharma Intermediates</span>
        </Link>

        {/* Manufacturing Plant Location Badge over photo */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 border border-white/20 backdrop-blur-md text-[11px] font-mono text-white/90 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#8CC63F] animate-pulse" />
          <span>Manufacturing Facility · Gujarat, India</span>
        </div>
      </header>

      {/* Main Content Area: UPPER CENTER */}
      <main className="relative z-10 w-full px-4 sm:px-6 py-1 flex-1 flex flex-col items-center justify-start pt-1 sm:pt-2 lg:pt-3">
        <div className="w-full max-w-[375px] mx-auto">
          
          {/* Header Branding */}
          <div className="mb-2.5 text-center">
            <h1 className="text-2xl sm:text-[26px] font-serif font-medium text-white tracking-tight leading-tight drop-shadow-md">
              Commercial Portal
            </h1>
            <p className="mt-0.5 text-xs text-white/85 font-light drop-shadow">
              Sign in to manage lead inquiries and quotations.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-5 sm:p-5.5 text-[#1E3D2A] border border-white/30 shadow-2xl shadow-black/50 relative text-left">
            
            {error && (
              <div className="mb-3.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <div className="flex-1 font-medium">{error}</div>
              </div>
            )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field 1: Username or Email */}
            <div>
              <label 
                htmlFor="admin-identifier"
                className="block text-xs font-bold text-[#1E3D2A] uppercase tracking-wider mb-1.5 font-mono"
              >
                1. Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1E3D2A]/50">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="admin-identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter username or email"
                  required
                  autoComplete="off"
                  className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#1E3D2A] placeholder:text-[#1E3D2A]/40 focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* Field 2: Password (empty by default, nothing shown) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-[#1E3D2A] uppercase tracking-wider font-mono"
                >
                  2. Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1E3D2A]/50">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="new-password"
                  className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-xl pl-10 pr-11 py-3 text-xs sm:text-sm text-[#1E3D2A] placeholder:text-[#1E3D2A]/40 focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#1E3D2A]/50 hover:text-[#1E3D2A] transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-[#1E3D2A]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-[#8CC63F]" />
                  </>
                )}
              </button>
            </div>

            {/* Return to Public Website inside Card */}
            <div className="pt-1.5 text-center">
              <Link
                to="/"
                className="text-[11px] text-[#1E3D2A]/60 hover:text-[#1E3D2A] font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>← Return to Public Website</span>
              </Link>
            </div>
          </form>
          </div>

        </div>
      </main>

    </div>
  );
};
