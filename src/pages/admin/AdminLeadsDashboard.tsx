import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  Download,
  KeyRound,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Archive,
  Check,
  Plus,
  X,
  ExternalLink,
  ShieldCheck,
  Phone,
  Building,
  User,
  SlidersHorizontal,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  getSuperAdminLeads,
  getSuperAdminLeadStats,
  bulkSuperAdminLeadAction,
  getSuperAdminPasscodes,
  createSuperAdminPasscode,
  updateSuperAdminPasscode,
  getAuthenticatedMediaUrl
} from '../../services/leadApi';
import {
  LeadListItem,
  LeadStatsResponse,
  LeadPasscodeItem
} from '../../types/lead';

export const AdminLeadsDashboard: React.FC = () => {
  const { authFetch, admin } = useAdminAuth();
  const navigate = useNavigate();

  // State
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [stats, setStats] = useState<LeadStatsResponse | null>(null);
  const [passcodes, setPasscodes] = useState<LeadPasscodeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true);

  // Filters & Pagination
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [minConfidence, setMinConfidence] = useState<number | undefined>(undefined);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkActionLoading, setIsBulkActionLoading] = useState<boolean>(false);

  // Passcode Modal
  const [showPasscodeModal, setShowPasscodeModal] = useState<boolean>(false);
  const [newPasscodeLabel, setNewPasscodeLabel] = useState<string>('');
  const [newPasscodePin, setNewPasscodePin] = useState<string>('');
  const [newPasscodeRotate, setNewPasscodeRotate] = useState<boolean>(false);
  const [newPasscodeMaxUses, setNewPasscodeMaxUses] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [isCreatingPasscode, setIsCreatingPasscode] = useState<boolean>(false);

  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch Leads List
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSuperAdminLeads(authFetch, {
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
        min_confidence: minConfidence,
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
        sort_by: 'created_at',
        sort_order: 'desc',
      });
      setLeads(data.leads || []);
      setTotalPages(data.pagination.total_pages);
      setTotalLeads(data.pagination.total);
    } catch (err: any) {
      showToast(err.message || 'Error fetching leads');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, page, limit, debouncedSearch, statusFilter, minConfidence, fromDate, toDate]);

  // Fetch Stats & Trend
  const fetchStats = useCallback(async () => {
    setIsStatsLoading(true);
    try {
      const s = await getSuperAdminLeadStats(authFetch);
      setStats(s);
    } catch (err) {
      console.warn('Could not load stats');
    } finally {
      setIsStatsLoading(false);
    }
  }, [authFetch]);

  // Fetch Passcodes
  const fetchPasscodes = useCallback(async () => {
    try {
      const p = await getSuperAdminPasscodes(authFetch);
      setPasscodes(p);
    } catch (err) {
      console.warn('Could not load passcodes');
    }
  }, [authFetch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    fetchStats();
    fetchPasscodes();
  }, [fetchStats, fetchPasscodes]);

  // Handle Bulk Action
  const handleBulkAction = async (action: 'verify' | 'archive' | 'delete') => {
    if (selectedIds.length === 0) return;
    if (action === 'delete' && !window.confirm(`Are you sure you want to permanently delete ${selectedIds.length} leads?`)) {
      return;
    }

    setIsBulkActionLoading(true);
    try {
      const res = await bulkSuperAdminLeadAction(authFetch, action, selectedIds);
      if (res.success) {
        showToast(`Successfully processed ${res.updated_count} lead(s).`);
        setSelectedIds([]);
        fetchLeads();
        fetchStats();
      }
    } catch (err: any) {
      showToast(err.message || 'Bulk action failed');
    } finally {
      setIsBulkActionLoading(false);
    }
  };

  // Toggle selection
  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map((l) => l.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Create Passcode
  const handleCreatePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscodePin.trim()) {
      setPasscodeError('Please enter a passcode PIN.');
      return;
    }
    setPasscodeError(null);
    setIsCreatingPasscode(true);

    try {
      await createSuperAdminPasscode(authFetch, {
        label: newPasscodeLabel.trim() || 'Commercial Desk PIN',
        passcode: newPasscodePin.trim(),
        rotate: newPasscodeRotate,
        max_uses: newPasscodeMaxUses ? parseInt(newPasscodeMaxUses, 10) : null,
      });
      showToast('New lead passcode created successfully.');
      setNewPasscodeLabel('');
      setNewPasscodePin('');
      setNewPasscodeMaxUses('');
      setNewPasscodeRotate(false);
      fetchPasscodes();
    } catch (err: any) {
      setPasscodeError(err.message || 'Failed to create passcode');
    } finally {
      setIsCreatingPasscode(false);
    }
  };

  // Toggle Passcode active
  const handleTogglePasscodeActive = async (id: number, currentActive: boolean) => {
    try {
      await updateSuperAdminPasscode(authFetch, { id, is_active: !currentActive });
      fetchPasscodes();
      showToast(`Passcode ${!currentActive ? 'activated' : 'deactivated'}.`);
    } catch (err: any) {
      showToast('Failed to update passcode');
    }
  };

  const generateRandomPin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setNewPasscodePin(pin);
  };

  // Export URL helper
  const getExportUrl = (format: 'csv' | 'xlsx') => {
    const query = new URLSearchParams();
    query.set('format', format);
    if (debouncedSearch) query.set('search', debouncedSearch);
    if (statusFilter && statusFilter !== 'all') query.set('status', statusFilter);
    const token = localStorage.getItem('okhai_admin_token') || '';
    if (token) query.set('token', token);
    return `/api/superadmin/leads/export/?${query.toString()}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-[#1E3D2A] text-white shadow-2xl border border-white/15 text-xs flex items-center gap-3 animate-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-[#8CC63F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          1. HEADER & PASSCODE CONTROLS
      ===================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3D2A]">
              Scanned Leads &amp; OCR Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E6EEDF] text-[#5B9A3C]">
              AI Auto-Extraction
            </span>
          </div>
          <p className="text-xs text-[#1E3D2A]/60 mt-1">
            Real-time business card OCR, vCard QR parsing, voice briefings, and Gujarat pharma contact verification.
          </p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowPasscodeModal(true)}
            className="px-3.5 py-2.5 rounded-xl border border-[#1E3D2A]/15 bg-white text-xs font-semibold text-[#1E3D2A] hover:border-[#5B9A3C] hover:bg-[#F4F9F1] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <KeyRound className="w-4 h-4 text-[#5B9A3C]" />
            <span>Passcode Gate ({passcodes.filter((p) => p.is_active).length} Active)</span>
          </button>

          <a
            href={getExportUrl('xlsx')}
            className="px-3.5 py-2.5 rounded-xl bg-[#1E3D2A] hover:bg-[#2D5A3C] text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            download
          >
            <FileSpreadsheet className="w-4 h-4 text-[#8CC63F]" />
            <span>Export Excel</span>
          </a>

          <a
            href={getExportUrl('csv')}
            className="px-3 py-2.5 rounded-xl border border-[#1E3D2A]/15 bg-white hover:bg-black/5 text-xs font-semibold text-[#1E3D2A] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            download
          >
            <Download className="w-3.5 h-3.5 text-[#5B9A3C]" />
            <span>CSV</span>
          </a>
        </div>
      </div>

      {/* =====================================================================
          2. DASHBOARD METRIC STAT CARDS
      ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Leads */}
        <div className="p-4 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#1E3D2A]/50 block">Total Intake</span>
          <div className="text-2xl font-serif font-bold text-[#1E3D2A] mt-1">
            {stats?.total ?? '—'}
          </div>
          <span className="text-[10px] text-[#1E3D2A]/60 mt-0.5 block">Cards &amp; Briefings</span>
        </div>

        {/* New */}
        <div className="p-4 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold block">New</span>
          <div className="text-2xl font-serif font-bold text-blue-700 mt-1">
            {stats?.new ?? '—'}
          </div>
          <span className="text-[10px] text-blue-600/70 mt-0.5 block">Awaiting Review</span>
        </div>

        {/* Needs Review */}
        <div className="p-4 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold block">Needs Review</span>
          <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
            {stats?.needs_review ?? '—'}
          </div>
          <span className="text-[10px] text-amber-600/70 mt-0.5 block">Confidence &lt; 80%</span>
        </div>

        {/* Verified */}
        <div className="p-4 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B9A3C] font-bold block">Verified</span>
          <div className="text-2xl font-serif font-bold text-[#5B9A3C] mt-1">
            {stats?.verified ?? '—'}
          </div>
          <span className="text-[10px] text-[#5B9A3C]/70 mt-0.5 block">Commercial Ready</span>
        </div>

        {/* Average Confidence */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#EAF2E5] to-white border border-[#5B9A3C]/30 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B9A3C] font-bold block">Avg Confidence</span>
          <div className="text-2xl font-mono font-extrabold text-[#1E3D2A] mt-1">
            {stats ? `${(stats.avg_confidence * 100).toFixed(1)}%` : '—'}
          </div>
          <span className="text-[10px] text-[#5B9A3C] font-semibold mt-0.5 block">High Accuracy</span>
        </div>

        {/* Archived / Failed */}
        <div className="p-4 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Archived / Failed</span>
          <div className="text-2xl font-serif font-bold text-gray-700 mt-1">
            {(stats?.archived ?? 0) + (stats?.failed ?? 0)}
          </div>
          <span className="text-[10px] text-gray-500 mt-0.5 block">Processed</span>
        </div>
      </div>

      {/* =====================================================================
          3. 30-DAY TREND VISUALIZATION (Clean SVG Bar Histogram)
      ===================================================================== */}
      {stats && stats.trend_30_days && stats.trend_30_days.length > 0 && (
        <div className="p-5 rounded-3xl bg-white border border-[#1E3D2A]/10 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
              30-Day Lead Ingestion Velocity
            </h4>
            <span className="text-[11px] font-mono text-[#1E3D2A]/60">
              Daily Submissions (Last 30 Days)
            </span>
          </div>

          <div className="h-20 flex items-end gap-1 sm:gap-1.5 pt-4">
            {(() => {
              const maxCount = Math.max(1, ...stats.trend_30_days.map((t) => t.count));
              return stats.trend_30_days.map((item, idx) => {
                const heightPercent = Math.max(6, Math.round((item.count / maxCount) * 100));
                return (
                  <div
                    key={item.date}
                    className="flex-1 flex flex-col items-center group relative h-full justify-end"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E3D2A] text-white text-[9px] font-mono px-2 py-0.5 rounded shadow pointer-events-none z-20 whitespace-nowrap">
                      {item.date}: {item.count} leads
                    </div>
                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        item.count > 0
                          ? 'bg-[#5B9A3C] group-hover:bg-[#8CC63F]'
                          : 'bg-[#1E3D2A]/10'
                      }`}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* =====================================================================
          4. FILTER & SEARCH TOOLBAR
      ===================================================================== */}
      <div className="p-4 rounded-3xl bg-white border border-[#1E3D2A]/10 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#1E3D2A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reference code, contact name, organization, phone, or GIDC city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs text-[#1E3D2A] focus:outline-none focus:border-[#5B9A3C] placeholder:text-[#1E3D2A]/40"
            />
          </div>

          {/* Date range filters */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-2 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs font-mono text-[#1E3D2A]"
              title="From Date"
            />
            <span className="text-xs text-[#1E3D2A]/40">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-2 rounded-xl bg-[#F8F9F4] border border-[#1E3D2A]/10 text-xs font-mono text-[#1E3D2A]"
              title="To Date"
            />

            {(fromDate || toDate) && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('');
                  setToDate('');
                }}
                className="p-2 text-[#1E3D2A]/40 hover:text-red-600 rounded-lg"
                title="Clear date filter"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={fetchLeads}
              className="p-2.5 rounded-xl border border-[#1E3D2A]/10 hover:bg-[#F8F9F4] text-[#1E3D2A]/70 hover:text-[#5B9A3C] transition-colors"
              title="Refresh list"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {[
            { id: 'all', label: 'All Leads' },
            { id: 'NEW', label: 'New' },
            { id: 'PROCESSING', label: 'Processing' },
            { id: 'NEEDS_REVIEW', label: 'Needs Review' },
            { id: 'VERIFIED', label: 'Verified' },
            { id: 'FAILED', label: 'Failed' },
            { id: 'ARCHIVED', label: 'Archived' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setStatusFilter(s.id);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === s.id
                  ? 'bg-[#1E3D2A] text-white shadow-xs'
                  : 'bg-[#F8F9F4] text-[#1E3D2A]/70 hover:bg-[#E6EEDF] hover:text-[#1E3D2A]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          5. BULK ACTIONS BAR (When leads selected)
      ===================================================================== */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 px-5 rounded-2xl bg-[#1E3D2A] text-white flex items-center justify-between gap-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8CC63F] animate-pulse" />
            <span className="text-xs font-mono font-bold">
              {selectedIds.length} lead{selectedIds.length > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isBulkActionLoading}
              onClick={() => handleBulkAction('verify')}
              className="px-3 py-1.5 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Bulk Verify</span>
            </button>

            <button
              type="button"
              disabled={isBulkActionLoading}
              onClick={() => handleBulkAction('archive')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Bulk Archive</span>
            </button>

            <button
              type="button"
              disabled={isBulkActionLoading}
              onClick={() => handleBulkAction('delete')}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. LEADS TABLE
      ===================================================================== */}
      <div className="bg-white rounded-3xl border border-[#1E3D2A]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1E3D2A]/10 bg-[#FAFBF8] text-[#1E3D2A]/70 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={leads.length > 0 && selectedIds.length === leads.length}
                    onChange={toggleSelectAll}
                    className="rounded border-[#1E3D2A]/20 cursor-pointer text-[#5B9A3C]"
                  />
                </th>
                <th className="py-3.5 px-3 w-16">Preview</th>
                <th className="py-3.5 px-4">Reference &amp; Date</th>
                <th className="py-3.5 px-4">Extracted Contact</th>
                <th className="py-3.5 px-4">Phone &amp; Location</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3D2A]/5">
              {isLoading ? (
                // Skeleton Rows
                Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={`skel-${idx}`} className="animate-pulse">
                    <td className="py-4 px-4 text-center"><div className="w-4 h-4 bg-gray-200 rounded mx-auto" /></td>
                    <td className="py-4 px-3"><div className="w-10 h-10 bg-gray-200 rounded-lg" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-28 mb-1" /><div className="h-3 bg-gray-100 rounded w-20" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-36 mb-1" /><div className="h-3 bg-gray-100 rounded w-24" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-28 mb-1" /><div className="h-3 bg-gray-100 rounded w-32" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                    <td className="py-4 px-4"><div className="h-5 bg-gray-200 rounded-full w-20" /></td>
                    <td className="py-4 px-4 text-right"><div className="h-7 bg-gray-200 rounded-lg w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#1E3D2A]/60">
                    <FileText className="w-10 h-10 text-[#1E3D2A]/30 mx-auto mb-2" />
                    <p className="text-sm font-semibold">No commercial leads found.</p>
                    <p className="text-xs text-[#1E3D2A]/40 mt-0.5">Try altering your search or status filters.</p>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const contact = lead.primary_contact;
                  const isSelected = selectedIds.includes(lead.id);

                  // Status badge formatting
                  const getStatusBadge = (st: string) => {
                    switch (st) {
                      case 'VERIFIED':
                        return <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#EAF2E5] text-[#5B9A3C] border border-[#5B9A3C]/30">VERIFIED</span>;
                      case 'NEEDS_REVIEW':
                        return <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">NEEDS REVIEW</span>;
                      case 'PROCESSING':
                        return <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">PROCESSING</span>;
                      case 'FAILED':
                        return <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">FAILED</span>;
                      case 'ARCHIVED':
                        return <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-gray-100 text-gray-600">ARCHIVED</span>;
                      default:
                        return <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800">NEW</span>;
                    }
                  };

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-[#FAFBF8] transition-colors ${isSelected ? 'bg-[#F4F9F1]' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(lead.id)}
                          className="rounded border-[#1E3D2A]/20 cursor-pointer text-[#5B9A3C]"
                        />
                      </td>

                      {/* Card Thumbnail */}
                      <td className="py-3.5 px-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F8F9F4] border border-[#1E3D2A]/10 flex items-center justify-center shrink-0">
                          {lead.first_card_thumbnail ? (
                            <img
                              src={getAuthenticatedMediaUrl(lead.first_card_thumbnail)}
                              alt="Card"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <FileText className="w-5 h-5 text-[#5B9A3C]" />
                          )}
                        </div>
                      </td>

                      {/* Reference & Date */}
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="font-mono font-bold text-[#1E3D2A] hover:text-[#5B9A3C] transition-colors"
                        >
                          {lead.reference_code}
                        </Link>
                        <div className="text-[10px] font-mono text-[#1E3D2A]/50 mt-0.5">
                          {new Date(lead.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>

                      {/* Extracted Contact */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div className="font-semibold text-[#1E3D2A] truncate">
                          {contact?.name || lead.customer_name_input || 'Unknown Contact'}
                        </div>
                        <div className="text-[11px] text-[#1E3D2A]/70 truncate mt-0.5">
                          {contact?.company || 'No Company Listed'}
                        </div>
                        {contact?.designation && (
                          <div className="text-[10px] text-[#5B9A3C] font-mono truncate">
                            {contact.designation}
                          </div>
                        )}
                      </td>

                      {/* Phone & Address */}
                      <td className="py-3.5 px-4 max-w-[220px]">
                        <div className="font-mono text-[11px] text-[#1E3D2A] truncate">
                          {contact?.phone || '—'}
                        </div>
                        <div className="text-[11px] text-[#1E3D2A]/60 truncate mt-0.5" title={contact?.address}>
                          {contact?.address || '—'}
                        </div>
                      </td>

                      {/* Confidence Score Meter */}
                      <td className="py-3.5 px-4">
                        {contact ? (
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 bg-[#F0F2EB] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  contact.overall_confidence >= 0.80 ? 'bg-[#5B9A3C]' : 'bg-amber-500'
                                }`}
                                style={{ width: `${Math.min(100, contact.overall_confidence * 100)}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] font-bold text-[#1E3D2A]">
                              {(contact.overall_confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-[#1E3D2A]/40">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(lead.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1E3D2A]/15 bg-white hover:border-[#5B9A3C] hover:text-[#5B9A3C] text-xs font-semibold text-[#1E3D2A] transition-all shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Detail</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 bg-[#FAFBF8] border-t border-[#1E3D2A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#1E3D2A]/70">
          <div>
            Showing <span className="font-bold text-[#1E3D2A]">{leads.length}</span> of{' '}
            <span className="font-bold text-[#1E3D2A]">{totalLeads}</span> total leads
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-[#1E3D2A]/15 bg-white disabled:opacity-40 hover:bg-[#F4F9F1] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs px-2">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-[#1E3D2A]/15 bg-white disabled:opacity-40 hover:bg-[#F4F9F1] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          7. PASSCODE MANAGEMENT MODAL
      ===================================================================== */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#1E3D2A]/10 max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-[#1E3D2A]/10 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1E3D2A] flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#5B9A3C]" />
                  <span>Lead Access Passcodes</span>
                </h3>
                <p className="text-xs text-[#1E3D2A]/60 mt-0.5">
                  Commercial desk passcodes allow clients to unlock the lead submission gate.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPasscodeModal(false)}
                className="p-1.5 rounded-xl text-[#1E3D2A]/40 hover:text-[#1E3D2A] hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Create New Passcode Form */}
            <form onSubmit={handleCreatePasscode} className="p-4 rounded-2xl bg-[#F8F9F4] border border-[#1E3D2A]/10 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
                Issue / Rotate New Passcode
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#1E3D2A]/70 mb-1">
                    Label / Description
                  </label>
                  <input
                    type="text"
                    value={newPasscodeLabel}
                    onChange={(e) => setNewPasscodeLabel(e.target.value)}
                    placeholder="e.g. CPHI 2026 Exhibition PIN"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#1E3D2A]/15 text-xs focus:outline-none focus:border-[#5B9A3C]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-[#1E3D2A]/70">
                      Passcode PIN
                    </label>
                    <button
                      type="button"
                      onClick={generateRandomPin}
                      className="text-[10px] font-mono font-bold text-[#5B9A3C] hover:underline"
                    >
                      Generate 6-Digit
                    </button>
                  </div>
                  <input
                    type="text"
                    value={newPasscodePin}
                    onChange={(e) => setNewPasscodePin(e.target.value)}
                    placeholder="e.g. 984521"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#1E3D2A]/15 text-xs font-mono font-bold text-[#1E3D2A] tracking-wider focus:outline-none focus:border-[#5B9A3C]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPasscodeRotate}
                    onChange={(e) => setNewPasscodeRotate(e.target.checked)}
                    className="rounded text-[#5B9A3C]"
                  />
                  <span className="text-[#1E3D2A]/80 font-medium">Deactivate all previous passcodes (Rotate)</span>
                </label>
              </div>

              {passcodeError && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{passcodeError}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isCreatingPasscode}
                  className="px-4 py-2 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isCreatingPasscode ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Issue Passcode</span>
                </button>
              </div>
            </form>

            {/* Existing Passcodes List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3D2A]">
                Existing Commercial Passcodes ({passcodes.length})
              </h4>

              <div className="divide-y divide-[#1E3D2A]/10 border border-[#1E3D2A]/10 rounded-2xl overflow-hidden">
                {passcodes.map((p) => (
                  <div key={p.id} className="p-3.5 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1E3D2A]">{p.label}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                          p.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {p.is_active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#1E3D2A]/50 mt-0.5">
                        Used {p.uses_count} time{p.uses_count === 1 ? '' : 's'} · Created by {p.created_by} on {new Date(p.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTogglePasscodeActive(p.id, p.is_active)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        p.is_active
                          ? 'border border-red-200 text-red-600 hover:bg-red-50'
                          : 'border border-green-200 text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {p.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

