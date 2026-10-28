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
    <div className="min-h-screen bg-gradient-to-br from-[#0F2317] via-[#1E3D2A] to-[#122A1C] text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#8CC63F]/30 selection:text-white">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#5B9A3C]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8CC63F]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Botanical Leaf Watermark */}
      <div className="absolute -top-16 -right-16 w-80 h-80 opacity-10 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#8CC63F]">
          <path d="M15,85 Q50,15 85,15 Q85,55 15,85 Z" />
        </svg>
      </div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-xs font-mono text-[#8CC63F] mb-6 transition-all hover:scale-102"
          >
            <Leaf className="w-3.5 h-3.5 text-[#8CC63F]" />
            <span>Okhai Pharma Intermediates</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
            Commercial Portal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/70 font-light">
            Sign in to manage lead inquiries, quotations, and dispatch workflows.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 text-[#1E3D2A] border border-white/20 shadow-2xl shadow-black/40 relative">
          
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-3 animate-fade-in">
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
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-[#1E3D2A]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
          </form>
        </div>

        {/* Footer Nav */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-xs text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium"
          >
            <span>← Return to Public Website</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
