import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Inbox,
  Search,
  Filter,
  FileSpreadsheet,
  RefreshCw,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  Send,
  X,
  Save,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  User
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

  // Feedback Alerts
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        status: statusFilter,
        product: productFilter,
        page: page.toString(),
        limit: '15',
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

  useEffect(() => {
    fetchInquiries();
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
        showAlert('success', `Inquiry #${id} status updated to ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      showAlert('error', 'Failed to update inquiry status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Are you sure you want to delete Inquiry #OKHAI-${id}? This action cannot be undone.`)) {
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
        showAlert('success', `Inquiry #OKHAI-${id} deleted successfully.`);
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
        showAlert('success', `Notification email re-sent to Superadmin (rutvikaahir30@gmail.com)`);
      } else {
        throw new Error(data.error || 'Failed to dispatch email');
      }
    } catch (err: any) {
      showAlert('error', err?.message || 'Error resending email');
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
        const data = await res.json();
        setInquiries((prev) =>
          prev.map((item) => (item.id === selectedInquiry.id ? { ...item, notes: editingNotes, priority: editingPriority as any } : item))
        );
        setSelectedInquiry((prev) => (prev ? { ...prev, notes: editingNotes, priority: editingPriority as any } : null));
        showAlert('success', 'Internal notes & priority saved to database.');
      }
    } catch (err) {
      showAlert('error', 'Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const showAlert = (type: 'success' | 'error', text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleExportCsv = () => {
    window.open('/api/admin/inquiries/export/csv', '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner Alert Toast */}
      {alertMsg && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-slide-in ${
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2E5] border border-[#5B9A3C]/30 text-xs font-mono text-[#2E683A] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#5B9A3C] animate-pulse" />
            <span>Dynamic Inquiries Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#1E3D2A] leading-tight">
            Lead Inquiries &amp; Quotations
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#1E3D2A]/70 font-light">
            Manage incoming inquiries, update negotiation status, add internal notes, and monitor email delivery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchInquiries}
            className="p-2.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] hover:bg-[#FAFBF8] transition-all shadow-xs cursor-pointer"
            title="Refresh Inquiries"
          >
            <RefreshCw className="w-4 h-4 text-[#5B9A3C]" />
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] hover:border-[#5B9A3C] hover:bg-[#FAFBF8] transition-all text-xs font-semibold shadow-xs cursor-pointer active:scale-98"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#5B9A3C]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1E3D2A]/10 shadow-xs space-y-4">
        
        {/* Search Bar + Product Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1E3D2A]/40">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by client name, company, email, phone, or requirements..."
              className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E3D2A] placeholder:text-[#1E3D2A]/40 focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]/20 transition-all font-medium"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={productFilter}
              onChange={(e) => {
                setProductFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]/20 transition-all font-medium cursor-pointer"
            >
              <option value="all">All Product Formulations</option>
              <option value="Nicotine Sulfate 40%">Nicotine Sulfate 40%</option>
              <option value="Nicotine Alkaloid 90%">Nicotine Alkaloid 90%</option>
              <option value="Nicotine Alkaloid 95%">Nicotine Alkaloid 95%</option>
            </select>
          </div>
        </div>

        {/* Status Tab Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[#1E3D2A]/5">
          <span className="text-xs font-mono text-[#1E3D2A]/60 mr-2 font-medium">Status:</span>
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'new', label: 'New / Actionable' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'quoted', label: 'Quoted' },
            { id: 'closed', label: 'Closed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#1E3D2A] text-[#8CC63F] font-bold shadow-xs'
                  : 'bg-[#FAFBF8] border border-[#1E3D2A]/10 text-[#1E3D2A]/70 hover:bg-[#EAF2E5] hover:text-[#1E3D2A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-[#1E3D2A]/60">
            Total Matches: <strong className="text-[#1E3D2A]">{totalCount}</strong>
          </span>
        </div>

      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-3xl border border-[#1E3D2A]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E3D2A]">
            <thead className="bg-[#FAFBF8] border-b border-[#1E3D2A]/10 font-mono text-[11px] text-[#1E3D2A]/60 uppercase">
              <tr>
                <th className="py-3.5 px-4">Ref #</th>
                <th className="py-3.5 px-4">Client &amp; Company</th>
                <th className="py-3.5 px-4">Product &amp; Quantity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Superadmin Email</th>
                <th className="py-3.5 px-4">Received On</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3D2A]/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#1E3D2A]/60 font-mono">
                    <div className="w-6 h-6 border-2 border-[#5B9A3C] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Fetching inquiries from database...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#1E3D2A]/50">
                    No inquiries matched your search or filters.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#FAFBF8] transition-colors">
                    
                    {/* Ref # & Priority */}
                    <td className="py-4 px-4 font-mono">
                      <div className="font-bold text-[#5B9A3C]">#OKHAI-{inq.id}</div>
                      {inq.priority === 'urgent' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700 block w-fit mt-1">
                          URGENT
                        </span>
                      )}
                    </td>

                    {/* Client & Company */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#1E3D2A] text-sm">
                        {inq.first_name} {inq.last_name}
                      </div>
                      <div className="text-[11px] text-[#1E3D2A]/70 font-medium flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3 h-3 text-[#5B9A3C]" />
                        <span>{inq.company}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#1E3D2A]/60 mt-1">
                        <a
                          href={`mailto:${inq.email}`}
                          className="hover:text-[#5B9A3C] flex items-center gap-1 font-mono text-[10px]"
                        >
                          <Mail className="w-3 h-3" />
                          <span>{inq.email}</span>
                        </a>
                        <a
                          href={`tel:${inq.phone}`}
                          className="hover:text-[#5B9A3C] flex items-center gap-1 font-mono text-[10px]"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{inq.phone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Product & Volume */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#1E3D2A]">{inq.product}</div>
                      <div className="text-[11px] font-mono text-[#5B9A3C] mt-0.5">
                        Qty: {inq.quantity}
                      </div>
                      <div className="text-[10px] text-[#1E3D2A]/50 mt-0.5">
                        {inq.entity_type === 'business' ? 'Commercial / Lab' : 'Industrial Supply'}
                      </div>
                    </td>

                    {/* Interactive Inline Status Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                          inq.status === 'new'
                            ? 'bg-[#8CC63F]/20 text-[#2D5A3C] border-[#8CC63F]/40'
                            : inq.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : inq.status === 'quoted'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="in_progress">IN PROGRESS</option>
                        <option value="quoted">QUOTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>

                    {/* Superadmin Email Sent Pill */}
                    <td className="py-4 px-4">
                      {inq.email_sent ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#EAF2E5] text-[#2E683A] border border-[#5B9A3C]/30">
                          <CheckCircle2 className="w-3 h-3 text-[#5B9A3C]" />
                          <span>Sent ✉️</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleResendEmail(inq.id)}
                          title={inq.email_error || 'Dispatch Failed. Click to retry.'}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          <span>Retry ↻</span>
                        </button>
                      )}
                    </td>

                    {/* Date Received */}
                    <td className="py-4 px-4 text-[11px] font-mono text-[#1E3D2A]/70">
                      {new Date(inq.created_at).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openDetailsModal(inq)}
                          className="p-2 rounded-lg bg-[#FAFBF8] hover:bg-[#EAF2E5] text-[#1E3D2A] border border-[#1E3D2A]/10 transition-colors cursor-pointer"
                          title="View Details & Notes"
                        >
                          <Eye className="w-4 h-4 text-[#5B9A3C]" />
                        </button>

                        <button
                          onClick={() => handleResendEmail(inq.id)}
                          className="p-2 rounded-lg bg-[#FAFBF8] hover:bg-[#EAF2E5] text-[#1E3D2A] border border-[#1E3D2A]/10 transition-colors cursor-pointer"
                          title="Resend Alert Email to Superadmin"
                        >
                          <Send className="w-4 h-4 text-[#1E3D2A]/70" />
                        </button>

                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-2 rounded-lg bg-[#FAFBF8] hover:bg-red-50 text-red-600 border border-[#1E3D2A]/10 transition-colors cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 bg-[#FAFBF8] border-t border-[#1E3D2A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1E3D2A]/70">
          <div>
            Page <strong className="text-[#1E3D2A]">{page}</strong> of <strong className="text-[#1E3D2A]">{totalPages}</strong> ({totalCount} total inquiries)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EAF2E5] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EAF2E5] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* =====================================================================
          INQUIRY DETAILS & INTERNAL NOTES MODAL
      ===================================================================== */}
      {modalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#1E3D2A]/15 shadow-2xl relative text-[#1E3D2A]">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-[#1E3D2A]/10 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2E5] text-[#2E683A] text-xs font-mono font-bold mb-1.5">
                  <span>Inquiry Reference: #OKHAI-{selectedInquiry.id}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E3D2A]">
                  {selectedInquiry.first_name} {selectedInquiry.last_name}
                </h2>
                <div className="text-xs text-[#1E3D2A]/70 font-medium">
                  {selectedInquiry.company} · {selectedInquiry.entity_type === 'business' ? 'Commercial / Laboratory' : 'Industrial Supply'}
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full bg-[#FAFBF8] hover:bg-[#EAF2E5] text-[#1E3D2A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 space-y-6">
              
              {/* Quick Contact & Dispatch Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAFBF8] border border-[#1E3D2A]/10 text-xs">
                <div>
                  <span className="text-[#1E3D2A]/60 block font-mono text-[10px] uppercase">Corporate Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-[#5B9A3C] hover:underline break-all">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#1E3D2A]/60 block font-mono text-[10px] uppercase">Direct Phone</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-[#1E3D2A] hover:underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[#1E3D2A]/60 block font-mono text-[10px] uppercase">Origin IP</span>
                  <span className="font-mono text-[#1E3D2A]/80">{selectedInquiry.ip_address || '127.0.0.1'}</span>
                </div>
              </div>

              {/* Requirement Details */}
              <div className="p-5 rounded-2xl bg-[#EAF2E5]/50 border border-[#5B9A3C]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#2E683A] uppercase tracking-wider">
                    Requested Formulation &amp; Quantity
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-xs font-mono font-bold text-[#5B9A3C] shadow-2xs">
                    {selectedInquiry.quantity}
                  </span>
                </div>
                <div className="text-base font-serif font-bold text-[#1E3D2A]">
                  {selectedInquiry.product}
                </div>

                {selectedInquiry.message ? (
                  <div className="pt-2 border-t border-[#5B9A3C]/20">
                    <span className="text-[11px] font-mono text-[#1E3D2A]/60 uppercase block mb-1">
                      Client Remarks / Special Instructions:
                    </span>
                    <p className="text-xs text-[#1E3D2A]/80 leading-relaxed font-light bg-white/70 p-3 rounded-xl border border-white">
                      "{selectedInquiry.message}"
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#1E3D2A]/50 italic">No additional remarks provided.</p>
                )}
              </div>

              {/* Status & Priority Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#1E3D2A] mb-1.5">
                    Pipeline Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] font-semibold focus:outline-none focus:border-[#5B9A3C]"
                  >
                    <option value="new">NEW (Awaiting Review)</option>
                    <option value="in_progress">IN PROGRESS (Sample/CoA Discussed)</option>
                    <option value="quoted">QUOTED (Formal Pricing Dispatched)</option>
                    <option value="closed">CLOSED / ARCHIVED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#1E3D2A] mb-1.5">
                    Priority Level
                  </label>
                  <select
                    value={editingPriority}
                    onChange={(e) => setEditingPriority(e.target.value)}
                    className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1E3D2A] font-semibold focus:outline-none focus:border-[#5B9A3C]"
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Air Dispatch</option>
                  </select>
                </div>
              </div>

              {/* Internal Follow-Up Notes Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase font-bold text-[#1E3D2A]">
                    Internal Sales Notes (Saved to SQLite Database)
                  </label>
                  <span className="text-[11px] text-[#1E3D2A]/60">Visible to administrators only</span>
                </div>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="e.g. Sent lot CoA to technical director on WhatsApp. Target delivery Mundra Port by 15th next month. Agreed on 200L fluorinated drums..."
                  className="w-full bg-[#FAFBF8] border border-[#1E3D2A]/15 focus:border-[#5B9A3C] rounded-2xl p-3.5 text-xs text-[#1E3D2A] focus:outline-none focus:ring-2 focus:ring-[#5B9A3C]/20 transition-all font-light leading-relaxed"
                />
              </div>

              {/* Email Notification Status */}
              <div className="p-4 rounded-2xl bg-[#FAFBF8] border border-[#1E3D2A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-[#1E3D2A]">Superadmin Email Alert Status:</div>
                  <div className="text-[#1E3D2A]/70 text-[11px] mt-0.5">
                    Recipient: <strong className="text-[#5B9A3C]">rutvikaahir30@gmail.com</strong> via <strong className="text-[#1E3D2A]">socialbuzz31@gmail.com</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleResendEmail(selectedInquiry.id)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#1E3D2A]/15 hover:border-[#5B9A3C] text-xs font-semibold text-[#1E3D2A] flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
                >
                  <Send className="w-3.5 h-3.5 text-[#5B9A3C]" />
                  <span>Resend Alert Email</span>
                </button>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-7 border-t border-[#1E3D2A]/10 bg-[#FAFBF8] rounded-b-3xl flex items-center justify-between gap-3">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Formal%20Quotation%20for%20${encodeURIComponent(selectedInquiry.product)}%20-%20Okhai%20Pharma`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#1E3D2A]/15 text-[#1E3D2A] hover:bg-[#FAFBF8] hover:border-[#5B9A3C] text-xs font-semibold shadow-xs transition-all"
              >
                <Mail className="w-4 h-4 text-[#5B9A3C]" />
                <span>Email Client Directly</span>
              </a>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#1E3D2A]/70 hover:text-[#1E3D2A] transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleSaveModalUpdates}
                  disabled={savingNotes}
                  className="px-5 py-2.5 rounded-xl bg-[#1E3D2A] hover:bg-[#2C573C] text-white text-xs font-semibold shadow-md shadow-[#1E3D2A]/15 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4 text-[#8CC63F]" />
                  <span>{savingNotes ? 'Saving...' : 'Save Notes & Priority'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
