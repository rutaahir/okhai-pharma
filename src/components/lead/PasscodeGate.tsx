import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, Sparkles, KeyRound, Loader2, Clock } from 'lucide-react';
import { unlockLeadPasscode } from '../../services/leadApi';

interface PasscodeGateProps {
  onUnlockSuccess: (label: string) => void;
}

export const PasscodeGate: React.FC<PasscodeGateProps> = ({ onUnlockSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically
  useEffect(() => {
    if (lockoutSeconds === 0) {
      inputRef.current?.focus();
    }
  }, [lockoutSeconds]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setErrorMessage('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passcode.trim() || isLoading || lockoutSeconds > 0) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await unlockLeadPasscode(passcode.trim());

      if (res.success && res.token) {
        onUnlockSuccess(res.label || 'Commercial Lead Access');
      } else {
        // Trigger shake animation
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);

        if (res.locked && res.lockout_seconds) {
          setLockoutSeconds(res.lockout_seconds);
          setErrorMessage(`Access locked for ${Math.ceil(res.lockout_seconds / 60)} minutes due to multiple failed attempts.`);
        } else {
          setErrorMessage(res.error || 'Invalid passcode. Please verify with our Gujarat commercial desk.');
          if (res.attempts_remaining !== undefined) {
            setAttemptsRemaining(res.attempts_remaining);
          }
        }
      }
    } catch (err: any) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      setErrorMessage(err.message || 'Network error while unlocking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background soft aurora gradient */}
      <div className="absolute inset-0 aurora-subtle pointer-events-none opacity-60" />

      <div
        className={`w-full max-w-md relative z-10 bg-white/95 backdrop-blur-xl border border-[#1E3D2A]/10 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-[#1E3D2A]/8 transition-transform ${
          isShaking ? 'animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]' : ''
        }`}
      >
        {/* Top Brand & Security Lockup */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E6EEDF] to-[#DCEBF7] border border-[#5B9A3C]/30 text-[#1E3D2A] mb-4 shadow-inner">
            <Lock className="w-8 h-8 text-[#5B9A3C]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EEDF]/60 text-[#1E3D2A] text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
            <KeyRound className="w-3.5 h-3.5 text-[#5B9A3C]" />
            <span>Authorized Commercial Access</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3D2A] tracking-tight">
            Commercial Lead Desk
          </h2>
          <p className="text-xs sm:text-sm text-[#1E3D2A]/70 mt-2 leading-relaxed">
            Please enter your 6-digit commercial passcode to upload business cards, brochures, or audio briefings.
          </p>
        </div>

        {/* Lockout Banner */}
        {lockoutSeconds > 0 ? (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">Access Temporarily Locked</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Too many attempts. You can retry in:
              </p>
              <div className="text-2xl font-mono font-extrabold text-amber-700 mt-1">
                {formatTimer(lockoutSeconds)}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1E3D2A]/80 mb-2">
                Passcode / Access PIN
              </label>

              <div className="relative">
                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter 6-digit passcode"
                  disabled={isLoading || lockoutSeconds > 0}
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/15 text-[#1E3D2A] font-mono text-center text-lg sm:text-xl tracking-widest focus:outline-none focus:border-[#5B9A3C] focus:ring-2 focus:ring-[#5B9A3C]/20 transition-all placeholder:text-[#1E3D2A]/30 placeholder:tracking-normal placeholder:text-sm placeholder:font-sans"
                  autoComplete="off"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-[#1E3D2A]/50 hover:text-[#1E3D2A] transition-colors cursor-pointer"
                  title={showPassword ? 'Hide passcode' : 'Show passcode'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {attemptsRemaining !== null && attemptsRemaining > 0 && (
                <div className="text-right text-[11px] font-mono text-amber-700 mt-1.5">
                  {attemptsRemaining} attempt{attemptsRemaining > 1 ? 's' : ''} remaining before lockout
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 animate-in fade-in">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !passcode.trim()}
              className="w-full py-3.5 rounded-2xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white font-semibold text-sm transition-all shadow-md shadow-[#5B9A3C]/25 hover:shadow-lg hover:shadow-[#5B9A3C]/35 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Passcode...</span>
                </>
              ) : (
                <>
                  <span>Unlock Submission Portal</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Guidance */}
        <div className="mt-8 pt-5 border-t border-[#1E3D2A]/10 text-center">
          <p className="text-[11px] text-[#1E3D2A]/60 leading-normal">
            Passcodes are issued exclusively to verified buyers, suppliers, and exhibition attendees by Okhai Pharma Commercial Desk.
          </p>
        </div>
      </div>
    </div>
  );
};

