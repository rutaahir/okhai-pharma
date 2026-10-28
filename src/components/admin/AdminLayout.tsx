import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Leaf,
  LayoutDashboard,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  RefreshCw,
  ShieldCheck,
  MailCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { admin, logout, authFetch } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newCount, setNewCount] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');

  const fetchStats = async () => {
    try {
      const res = await authFetch('/api/admin/inquiries/stats');
      if (res.ok) {
        const data = await res.json();
        setNewCount(data.new || 0);
      }
    } catch (e) {
      console.warn('Could not fetch inquiry badge count');
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // 30s polling
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' IST'
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F2] text-[#1E3D2A] flex flex-col md:flex-row antialiased selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      
      {/* =====================================================================
          SIDEBAR (Desktop Fixed & Mobile Drawer)
      ===================================================================== */}
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#1E3D2A] text-white z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } border-r border-white/10 shadow-2xl`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#8CC63F] group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-base tracking-tight text-white block">
                  Okhai Pharma
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8CC63F] block">
                  Commercial Suite
                </span>
              </div>
            </Link>

            {/* Close button on mobile */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-white/60 hover:text-white md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold">
              Management
            </div>

            <NavLink
              to="/admin"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#8CC63F] text-[#1E3D2A] shadow-md shadow-[#8CC63F]/20 font-bold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard Overview</span>
            </NavLink>

            <NavLink
              to="/admin/inquiries"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#8CC63F] text-[#1E3D2A] shadow-md shadow-[#8CC63F]/20 font-bold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4 shrink-0" />
                <span>Lead Inquiries</span>
              </div>
              {newCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8CC63F] text-[#1E3D2A] animate-pulse">
                  {newCount} NEW
                </span>
              )}
            </NavLink>

            <div className="px-3 pt-5 pb-1 text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold">
              External Portal
            </div>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 shrink-0 text-[#8CC63F]" />
                <span>View Public Website</span>
              </div>
              <span className="text-[10px] text-white/40 group-hover:text-white/80">Opens Tab ↗</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="p-4 border-t border-white/10 bg-black/15">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#8CC63F] text-[#1E3D2A] font-bold text-xs flex items-center justify-center shrink-0 shadow-inner">
                RA
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {admin?.full_name || 'Rutvik Ahir'}
                </div>
                <div className="text-[10px] text-[#8CC63F] font-mono uppercase truncate">
                  {admin?.role || 'Superadmin'}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN CONTENT AREA
      ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#1E3D2A]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
          
          {/* Left: Mobile hamburger & breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-[#F4F7F2] text-[#1E3D2A] hover:bg-[#EAF2E5] md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#1E3D2A]/60">
              <span className="font-semibold text-[#5B9A3C]">Okhai Pharma</span>
              <span>/</span>
              <span className="text-[#1E3D2A] font-bold">Commercial Admin</span>
            </div>
          </div>

          {/* Right: Live time & Status Indicators */}
          <div className="flex items-center gap-3">
            
            {/* Live Time */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFBF8] border border-[#1E3D2A]/10 text-xs font-mono text-[#1E3D2A]/80 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#5B9A3C]" />
              <span>{currentTime}</span>
            </div>

            {/* Email Dispatch Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 text-xs font-mono text-[#2E683A]">
              <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-pulse" />
              <span>SMTP Connected: rutvikaahir30@gmail.com</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchStats}
              title="Refresh Stats"
              className="p-2 rounded-full bg-[#FAFBF8] hover:bg-[#EAF2E5] border border-[#1E3D2A]/10 text-[#1E3D2A] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#5B9A3C]" />
            </button>

          </div>

        </header>

        {/* Dynamic Nested Page Content - Full Device Width */}
        <main className="flex-1 p-3 sm:p-5 w-full max-w-none">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
