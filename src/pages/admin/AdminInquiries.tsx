import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Inbox,
  Search,
  FileSpreadsheet,
  RefreshCw,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  Send,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

interface InquiryItem {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  product: string;
  entity_type: string;
  message: string;
  status: 'new' | 'in_progress' | 'quoted' | 'closed';
  priority: 'normal' | 'high' | 'urgent';
  notes: string;
  email_sent: number;
  email_error: string | null;
  ip_address: string;
  created_at: string;
  updated_at: string;
}

export const AdminInquiries: React.FC = () => {
  const { authFetch } = useAdminAuth();

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Active Inquiry Modal
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingPriority, setEditingPriority] = useState<string>('normal');
  const [savingNotes, setSavingNotes] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Status counts
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({
    all: 0,
    new: 0,
    in_progress: 0,
    quoted: 0,
    closed: 0,
  });

  // Feedback Alerts & Exporting
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [exporting, setExporting] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        status: statusFilter,
        product: productFilter,
        page: page.toString(),
        limit: '25',
      });

      const res = await authFetch(`/api/admin/inquiries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsCounts = async () => {
    try {
      const res = await authFetch('/api/admin/inquiries/stats');
      if (res.ok) {
        const data = await res.json();
        setStatusCounts({
          all: data.total || 0,
          new: data.new || 0,
          in_progress: data.inProgress || 0,
          quoted: data.quoted || 0,
          closed: data.closed || 0,
        });
      }
    } catch (e) {
      console.warn('Could not fetch status counts');
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchStatsCounts();
  }, [search, statusFilter, productFilter, page]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await authFetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
        fetchStatsCounts();
        showAlert('success', `Inquiry #${id} marked as ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      showAlert('error', 'Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Delete Inquiry #OKHAI-${id}? This action is permanent.`)) {
      return;
    }

    try {
      const res = await authFetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) {
          setModalOpen(false);
        }
        fetchStatsCounts();
        showAlert('success', `Inquiry #OKHAI-${id} removed.`);
      }
    } catch (err) {
      showAlert('error', 'Failed to delete inquiry');
    }
  };

  const handleResendEmail = async (id: number) => {
    try {
      showAlert('success', `Sending email alert for Inquiry #${id}...`);
      const res = await authFetch(`/api/admin/inquiries/${id}/resend-email`, {
        method: 'POST',
      });

      const data = await res.json();
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, email_sent: 1, email_error: null } : item))
        );
        showAlert('success', `Alert re-dispatched to Superadmin (rutvikaahir30@gmail.com)`);
      } else {
        throw new Error(data.error || 'Failed to dispatch email');
      }
    } catch (err: any) {
      showAlert('error', err?.message || 'Error resending email');
    }
  };

  const handleExportCsv = async () => {
    try {
      setExporting(true);
      showAlert('success', 'Generating inquiries CSV spreadsheet...');
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
      showAlert('success', 'Inquiries CSV downloaded successfully.');
    } catch (err) {
      showAlert('error', 'Failed to export CSV. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const openDetailsModal = (inq: InquiryItem) => {
    setSelectedInquiry(inq);
    setEditingNotes(inq.notes || '');
    setEditingPriority(inq.priority || 'normal');
    setModalOpen(true);
  };

  const handleSaveModalUpdates = async () => {
    if (!selectedInquiry) return;
    try {
      setSavingNotes(true);
      const res = await authFetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: editingNotes,
          priority: editingPriority,
        }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === selectedInquiry.id ? { ...item, notes: editingNotes, priority: editingPriority as any } : item))
        );
        setSelectedInquiry((prev) => (prev ? { ...prev, notes: editingNotes, priority: editingPriority as any } : null));
        showAlert('success', 'Notes saved.');
      }
    } catch (err) {
      showAlert('error', 'Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const showAlert = (type: 'success' | 'error', text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 3500);
  };

  return (
    <div className="w-full space-y-3 antialiased text-[#1E3D2A]">
      
      {/* Toast Alert */}
      {alertMsg && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-slide-in ${
            alertMsg.type === 'success'
              ? 'bg-[#1E3D2A] text-white border border-[#8CC63F]/40'
              : 'bg-red-600 text-white border border-red-700'
          }`}
        >
          {alertMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#8CC63F]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
          <span>{alertMsg.text}</span>
        </div>
      )}

      {/* Unified Compact High-Density Header & Toolbar (Zero Wasted Space) */}
      <div className="bg-white rounded-2xl p-3 border border-[#1E3D2A]/15 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Left: Title + Segmented Status Tabs */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 pr-3 border-r border-[#1E3D2A]/10">
            <h1 className="text-base font-serif font-bold text-[#1E3D2A] tracking-tight">
              Lead Inquiries
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EAF2E5] text-[#2E683A]">
              {totalCount}
            </span>
          </div>

          {/* Status Tabs */}
          <div className="inline-flex rounded-xl bg-[#F0F4EC] p-0.5 border border-[#1E3D2A]/10 text-xs">
            {[
              { id: 'all', label: 'All', count: statusCounts.all },
              { id: 'new', label: 'New', count: statusCounts.new },
              { id: 'in_progress', label: 'In Progress', count: statusCounts.in_progress },
              { id: 'quoted', label: 'Quoted', count: statusCounts.quoted },
              { id: 'closed', label: 'Closed', count: statusCounts.closed },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setStatusFilter(tab.id);
                  setPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? 'bg-white text-[#1E3D2A] font-bold shadow-xs'
                    : 'text-[#1E3D2A]/70 hover:text-[#1E3D2A]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  statusFilter === tab.id ? 'bg-[#EAF2E5] text-[#2E683A]' : 'text-[#1E3D2A]/50'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Compact Search, Product Filter, Refresh, Export CSV */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-56 lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#1E3D2A]/40">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search leads, company, email..."
              className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#1E3D2A] placeholder:text-[#1E3D2A]/40 focus:outline-none focus:ring-1 focus:ring-[#5B9A3C]/30 transition-all font-medium"
            />
          </div>

          {/* Product Formulation Filter */}
          <select
            value={productFilter}
            onChange={(e) => {
              setProductFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-xl px-2.5 py-1.5 text-xs text-[#1E3D2A] font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Products</option>
            <option value="Nicotine Sulfate 40%">Nicotine Sulfate 40%</option>
            <option value="Nicotine Alkaloid 90%">Nicotine Alkaloid 90%</option>
            <option value="Nicotine Alkaloid 95%">Nicotine Alkaloid 95%</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={() => {
              fetchInquiries();
              fetchStatsCounts();
            }}
            title="Refresh Inquiries"
            className="p-1.5 rounded-xl bg-[#FAFBF8] border border-[#1E3D2A]/15 text-[#1E3D2A] hover:bg-[#EAF2E5] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#5B9A3C]" />
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-60 shrink-0"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#8CC63F]" />
            <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>
        </div>

      </div>

      {/* High-Density Tabular Grid (Full Screen Width) */}
      <div className="bg-white rounded-2xl border border-[#1E3D2A]/15 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            
            {/* Table Header */}
            <thead className="bg-[#F4F7F1] border-b border-[#1E3D2A]/15 font-mono text-[11px] text-[#1E3D2A]/70 uppercase tracking-wider select-none">
              <tr>
                <th className="py-2.5 px-3 w-16 text-center">Ref #</th>
                <th className="py-2.5 px-3">Client Name</th>
                <th className="py-2.5 px-3">Company / Entity</th>
                <th className="py-2.5 px-3">Corporate Email</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Product Formulation</th>
                <th className="py-2.5 px-3 text-right">Volume</th>
                <th className="py-2.5 px-3 text-center">Pipeline Status</th>
                <th className="py-2.5 px-3 text-center">Superadmin Email</th>
                <th className="py-2.5 px-3">Received (IST)</th>
                <th className="py-2.5 px-3 text-right w-24">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#1E3D2A]/10 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-xs text-[#1E3D2A]/60 font-mono">
                    <div className="w-5 h-5 border-2 border-[#5B9A3C] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading database records...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-xs text-[#1E3D2A]/50">
                    No inquiries found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq, idx) => (
                  <tr
                    key={inq.id}
                    className={`transition-colors hover:bg-[#F3F8F0] ${
                      idx % 2 === 1 ? 'bg-[#FAFBF8]' : 'bg-white'
                    }`}
                  >
                    {/* Ref # */}
                    <td className="py-2 px-3 text-center font-mono font-bold text-[#5B9A3C] text-[11px] whitespace-nowrap">
                      #{inq.id}
                    </td>

                    {/* Client Name */}
                    <td className="py-2 px-3 font-semibold text-[#1E3D2A] whitespace-nowrap">
                      <span className="capitalize">{inq.first_name} {inq.last_name}</span>
                    </td>

                    {/* Company & Type */}
                    <td className="py-2 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-[#1E3D2A]">{inq.company}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#EAF2E5] text-[#2E683A]">
                          {inq.entity_type === 'business' ? 'Lab' : 'Supply'}
                        </span>
                      </div>
                    </td>

                    {/* Email with 1-click copy */}
                    <td className="py-2 px-3 whitespace-nowrap font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 group/mail">
                        <a
                          href={`mailto:${inq.email}?subject=Quotation%20for%20${encodeURIComponent(inq.product)}%20-%20Okhai%20Pharma`}
                          className="text-[#2E683A] hover:underline hover:font-bold"
                          title="Click to compose email"
                        >
                          {inq.email}
                        </a>
                        <button
                          onClick={() => copyToClipboard(inq.email, `mail-${inq.id}`)}
                          className="opacity-0 group-hover/mail:opacity-100 text-[#1E3D2A]/50 hover:text-[#1E3D2A] transition-opacity"
                          title="Copy email"
                        >
                          {copiedId === `mail-${inq.id}` ? (
                            <Check className="w-3 h-3 text-[#5B9A3C]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-2 px-3 whitespace-nowrap font-mono text-[11px]">
                      <a href={`tel:${inq.phone}`} className="text-[#1E3D2A]/80 hover:text-[#5B9A3C]">
                        {inq.phone}
                      </a>
                    </td>

                    {/* Product Formulation */}
                    <td className="py-2 px-3 whitespace-nowrap font-medium text-[#1E3D2A]">
                      <span className="px-2 py-0.5 rounded-md bg-[#FAFBF8] border border-[#1E3D2A]/10 text-[11px]">
                        {inq.product}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="py-2 px-3 whitespace-nowrap text-right font-mono font-bold text-[#1E3D2A] text-[11px]">
                      {inq.quantity}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-2 px-3 whitespace-nowrap text-center">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer border transition-all ${
                          inq.status === 'new'
                            ? 'bg-[#8CC63F]/20 text-[#2D5A3C] border-[#8CC63F]/40'
                            : inq.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : inq.status === 'quoted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="in_progress">IN PROGRESS</option>
                        <option value="quoted">QUOTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>

                    {/* Superadmin Email Sent Status */}
                    <td className="py-2 px-3 whitespace-nowrap text-center">
                      {inq.email_sent ? (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EAF2E5] text-[#2E683A]"
                          title="Delivered to rutvikaahir30@gmail.com"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#5B9A3C]" />
                          <span>Sent</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleResendEmail(inq.id)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 cursor-pointer"
                          title="Click to retry sending"
                        >
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          <span>Retry ↻</span>
                        </button>
                      )}
                    </td>

                    {/* Received Timestamp */}
                    <td className="py-2 px-3 whitespace-nowrap text-[11px] font-mono text-[#1E3D2A]/70">
                      {new Date(inq.created_at).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>

                    {/* Compact Actions Strip */}
                    <td className="py-2 px-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View Modal */}
                        <button
                          onClick={() => openDetailsModal(inq)}
                          className="p-1 rounded-md text-[#1E3D2A]/60 hover:text-[#5B9A3C] hover:bg-[#EAF2E5] transition-colors cursor-pointer"
                          title="View Details & Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Resend Email */}
                        <button
                          onClick={() => handleResendEmail(inq.id)}
                          className="p-1 rounded-md text-[#1E3D2A]/60 hover:text-[#1E3D2A] hover:bg-[#EAF2E5] transition-colors cursor-pointer"
                          title="Resend Superadmin Alert"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1 rounded-md text-[#1E3D2A]/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* Compact Footer Bar */}
        <div className="p-2.5 bg-[#FAFBF8] border-t border-[#1E3D2A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#1E3D2A]/70">
          <div className="font-mono text-[11px]">
            Showing <strong className="text-[#1E3D2A]">{inquiries.length}</strong> of <strong className="text-[#1E3D2A]">{totalCount}</strong> inquiries
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px]">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-1 rounded-lg bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#EAF2E5] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-1 rounded-lg bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#EAF2E5] transition-all cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* =====================================================================
          INQUIRY DETAILS & INTERNAL CRM NOTES MODAL
      ===================================================================== */}
      {modalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#1E3D2A]/15 shadow-2xl relative text-[#1E3D2A]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#1E3D2A]/10 flex items-center justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded-full bg-[#EAF2E5] text-[#2E683A] text-xs font-mono font-bold">
                  #{selectedInquiry.id}
                </span>
                <div>
                  <h2 className="text-base font-serif font-bold text-[#1E3D2A]">
                    {selectedInquiry.first_name} {selectedInquiry.last_name}
                  </h2>
                  <div className="text-[11px] text-[#1E3D2A]/70">
                    {selectedInquiry.company} · {selectedInquiry.entity_type === 'business' ? 'Commercial / Laboratory' : 'Industrial Supply'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full bg-[#FAFBF8] hover:bg-[#EAF2E5] text-[#1E3D2A] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-5 space-y-4 text-xs">
              
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#FAFBF8] border border-[#1E3D2A]/10 text-xs">
                <div>
                  <span className="text-[#1E3D2A]/50 font-mono text-[10px] uppercase block">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-[#2E683A] hover:underline truncate block">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#1E3D2A]/50 font-mono text-[10px] uppercase block">Phone</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-[#1E3D2A] hover:underline block">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[#1E3D2A]/50 font-mono text-[10px] uppercase block">Formulation</span>
                  <span className="font-semibold text-[#1E3D2A] block">{selectedInquiry.product}</span>
                </div>
                <div>
                  <span className="text-[#1E3D2A]/50 font-mono text-[10px] uppercase block">Quantity</span>
                  <span className="font-mono font-bold text-[#5B9A3C] block">{selectedInquiry.quantity}</span>
                </div>
              </div>

              {/* Remarks */}
              {selectedInquiry.message && (
                <div className="p-3 rounded-xl bg-[#F4F7F1] border border-[#5B9A3C]/20">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2E683A] block mb-1">
                    Client Instructions / Remarks:
                  </span>
                  <p className="text-xs text-[#1E3D2A]/90 font-light leading-relaxed">
                    "{selectedInquiry.message}"
                  </p>
                </div>
              )}

              {/* Status and Priority Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#1E3D2A] uppercase mb-1">
                    Pipeline Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#5B9A3C]"
                  >
                    <option value="new">NEW (Awaiting Review)</option>
                    <option value="in_progress">IN PROGRESS (Sample/CoA Sent)</option>
                    <option value="quoted">QUOTED (Formal Pricing Dispatched)</option>
                    <option value="closed">CLOSED / ARCHIVED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#1E3D2A] uppercase mb-1">
                    Priority Level
                  </label>
                  <select
                    value={editingPriority}
                    onChange={(e) => setEditingPriority(e.target.value)}
                    className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#5B9A3C]"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Air Dispatch</option>
                  </select>
                </div>
              </div>

              {/* Internal Notes Editor */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#1E3D2A] uppercase mb-1">
                  Internal Notes (Saved to SQLite Database)
                </label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="e.g. Sent quotation on WhatsApp. Customer confirmed Mundra seaport delivery for 50L trial drums..."
                  className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-xl p-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:ring-1 focus:ring-[#5B9A3C]/30 leading-relaxed"
                />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 border-t border-[#1E3D2A]/10 bg-[#FAFBF8] rounded-b-2xl flex items-center justify-between gap-2">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Formal%20Quotation%20for%20${encodeURIComponent(selectedInquiry.product)}%20-%20Okhai%20Pharma`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] hover:border-[#5B9A3C] text-xs font-semibold shadow-xs transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#5B9A3C]" />
                <span>Reply by Email</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1E3D2A]/70 hover:text-[#1E3D2A] cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleSaveModalUpdates}
                  disabled={savingNotes}
                  className="px-4 py-1.5 rounded-xl bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-3.5 h-3.5 text-[#8CC63F]" />
                  <span>{savingNotes ? 'Saving...' : 'Save Notes'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
