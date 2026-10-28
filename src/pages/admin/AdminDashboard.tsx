import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  FlaskConical,
  Mail,
  ShieldCheck,
  Send,
  Building,
  User,
  Package
} from 'lucide-react';

interface StatsData {
  total: number;
  new: number;
  inProgress: number;
  quoted: number;
  closed: number;
  today: number;
  productBreakdown: { product: string; count: number }[];
  recent: any[];
}

export const AdminDashboard: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await authFetch('/api/admin/inquiries/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const [exporting, setExporting] = useState(false);

  const handleExportCsv = async () => {
    try {
      setExporting(true);
      const res = await authFetch('/api/admin/inquiries/export/csv');
      if (!res.ok) throw new Error('Failed to download inquiries CSV');
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `okhai_pharma_inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#8CC63F]/20 text-[#2D5A3C] border border-[#8CC63F]/30 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B9A3C] animate-pulse" />
            NEW
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            IN PROGRESS
          </span>
        );
      case 'quoted':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            QUOTED
          </span>
        );
      case 'closed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            CLOSED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 text-xs font-mono text-[#2E683A] mb-2 font-semibold">
            <span>Enterprise Commercial Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#1E3D2A] leading-tight">
            Commercial Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#1E3D2A]/70 font-light">
            Real-time synchronization with website inquiries, SQLite database, and Superadmin email alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] hover:border-[#5B9A3C] hover:bg-[#FAFBF8] transition-all text-xs font-semibold shadow-xs cursor-pointer active:scale-98 disabled:opacity-60"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#5B9A3C]" />
            <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>

          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg transition-all cursor-pointer active:scale-98"
          >
            <Inbox className="w-4 h-4 text-[#8CC63F]" />
            <span>Manage Inquiries</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-[#1E3D2A]/10 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3D2A]/60 mb-3">
            <span>TOTAL LEADS</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAFBF8] flex items-center justify-center text-[#1E3D2A]">
              <TrendingUp className="w-4 h-4 text-[#5B9A3C]" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3D2A]">
            {loading ? '...' : stats?.total || 0}
          </div>
          <div className="text-[11px] text-[#1E3D2A]/60 mt-2 font-medium">
            Saved in SQLite database
          </div>
        </div>

        {/* New / Actionable */}
        <div className="bg-white rounded-3xl p-6 border border-[#5B9A3C]/30 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8CC63F]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs font-mono text-[#2E683A] mb-3">
            <span className="font-bold">NEW / PENDING</span>
            <div className="w-8 h-8 rounded-xl bg-[#EAF2E5] flex items-center justify-center text-[#5B9A3C]">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#2E683A]">
            {loading ? '...' : stats?.new || 0}
          </div>
          <div className="text-[11px] text-[#5B9A3C] font-semibold mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-ping" />
            <span>Awaiting quota review</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-3xl p-6 border border-[#1E3D2A]/10 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3D2A]/60 mb-3">
            <span>IN NEGOTIATION</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3D2A]">
            {loading ? '...' : stats?.inProgress || 0}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-2">
            Active commercial dialogue
          </div>
        </div>

        {/* Quoted & Closed */}
        <div className="bg-white rounded-3xl p-6 border border-[#1E3D2A]/10 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3D2A]/60 mb-3">
            <span>QUOTED / CLOSED</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3D2A]">
            {loading ? '...' : (stats?.quoted || 0) + (stats?.closed || 0)}
          </div>
          <div className="text-[11px] text-blue-700 font-medium mt-2">
            Formal pricing sent
          </div>
        </div>

      </div>

      {/* Two Column Grid: Product Breakdown + Superadmin Notification Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Product Demand Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#1E3D2A]/10 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <FlaskConical className="w-5 h-5 text-[#5B9A3C]" />
              <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
                Inquiries by Product Formulation
              </h3>
            </div>
            <span className="text-xs font-mono text-[#1E3D2A]/60">Total {stats?.total || 0} batches</span>
          </div>

          <div className="space-y-4">
            {stats?.productBreakdown && stats.productBreakdown.length > 0 ? (
              stats.productBreakdown.map((item) => {
                const percentage = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                return (
                  <div key={item.product} className="p-3.5 rounded-2xl bg-[#FAFBF8] border border-[#1E3D2A]/5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1E3D2A] mb-2">
                      <span>{item.product}</span>
                      <span className="font-mono text-[#5B9A3C]">{item.count} inquiries ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#EAEFE6] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#5B9A3C] to-[#8CC63F] transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-[#1E3D2A]/50 font-light">
                No inquiries recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Superadmin Email Notification Status */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1E3D2A] to-[#122A1C] text-white rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#8CC63F]/15 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-[#8CC63F] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8CC63F]" />
              <span>Superadmin Dispatch Active</span>
            </div>

            <h3 className="text-xl font-serif font-medium leading-snug">
              Instant Email Notification System
            </h3>

            <p className="mt-2.5 text-xs text-white/75 font-light leading-relaxed">
              Every website contact form inquiry triggers an automated high-priority alert with complete client details, formulation requested, and direct response actions.
            </p>

            <div className="mt-5 space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                <span className="text-white/70">Superadmin Recipient:</span>
                <span className="font-mono font-bold text-[#8CC63F]">rutvikaahir30@gmail.com</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                <span className="text-white/70">SMTP Outbox:</span>
                <span className="font-mono text-white/90">socialbuzz31@gmail.com</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                <span className="text-white/70">Delivery Protocol:</span>
                <span className="font-mono text-white/90">Gmail SSL (Port 465)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
            <span>Status: Operational</span>
            <Link to="/admin/inquiries" className="text-[#8CC63F] hover:underline font-bold">
              View Inquiries Inbox →
            </Link>
          </div>
        </div>

      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1E3D2A]/10 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
              Latest Commercial Inquiries
            </h3>
            <p className="text-xs text-[#1E3D2A]/60 mt-0.5 font-light">
              Showing the most recent quotation requests submitted through the portal.
            </p>
          </div>

          <Link
            to="/admin/inquiries"
            className="text-xs font-semibold text-[#5B9A3C] hover:text-[#1E3D2A] flex items-center gap-1.5 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E3D2A]">
            <thead className="bg-[#FAFBF8] border-b border-[#1E3D2A]/10 font-mono text-[11px] text-[#1E3D2A]/60 uppercase">
              <tr>
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Client &amp; Company</th>
                <th className="py-3 px-4">Product Formulation</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3D2A]/5">
              {stats?.recent && stats.recent.length > 0 ? (
                stats.recent.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#FAFBF8] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#5B9A3C]">
                      #OKHAI-{inq.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1E3D2A]">{inq.first_name} {inq.last_name}</div>
                      <div className="text-[11px] text-[#1E3D2A]/70">{inq.company}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#1E3D2A]">
                      {inq.product}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#1E3D2A]/80">
                      {inq.quantity}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(inq.status)}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-[#1E3D2A]/60 font-mono">
                      {new Date(inq.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/admin/inquiries"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EAF2E5] hover:bg-[#DCEAD6] text-[#2E683A] text-xs font-semibold transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#1E3D2A]/50">
                    No inquiries recorded yet. Visit the website Contact Us page to submit one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
