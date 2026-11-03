import {
  LeadStatusPollResponse,
  LeadListItem,
  LeadDetailItem,
  LeadPasscodeItem,
  LeadStatsResponse,
} from '../types/lead';

// Session storage key for client passcode token
const LEAD_TOKEN_STORAGE_KEY = 'okhai_lead_passcode_token';
const LEAD_LABEL_STORAGE_KEY = 'okhai_lead_passcode_label';

export function getLeadPasscodeToken(): string | null {
  return localStorage.getItem(LEAD_TOKEN_STORAGE_KEY) || sessionStorage.getItem(LEAD_TOKEN_STORAGE_KEY);
}

export function setLeadPasscodeToken(token: string, label?: string) {
  try {
    localStorage.setItem(LEAD_TOKEN_STORAGE_KEY, token);
    sessionStorage.setItem(LEAD_TOKEN_STORAGE_KEY, token);
    if (label) {
      localStorage.setItem(LEAD_LABEL_STORAGE_KEY, label);
      sessionStorage.setItem(LEAD_LABEL_STORAGE_KEY, label);
    }
  } catch (e) {
    // Storage fallback
  }
}

export function clearLeadPasscodeToken() {
  try {
    localStorage.removeItem(LEAD_TOKEN_STORAGE_KEY);
    localStorage.removeItem(LEAD_LABEL_STORAGE_KEY);
    sessionStorage.removeItem(LEAD_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(LEAD_LABEL_STORAGE_KEY);
  } catch (e) {
    // Storage fallback
  }
}

export function getLeadPasscodeLabel(): string {
  return (
    localStorage.getItem(LEAD_LABEL_STORAGE_KEY) ||
    sessionStorage.getItem(LEAD_LABEL_STORAGE_KEY) ||
    'Active Commercial Session'
  );
}

/**
 * Returns a media URL with authentication token attached.
 * Ensures <img>, <audio>, and <a> tags load without 403 Forbidden errors.
 */
export function getAuthenticatedMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.includes('token=')) return url;
  const token =
    localStorage.getItem('okhai_admin_token') ||
    localStorage.getItem(LEAD_TOKEN_STORAGE_KEY) ||
    sessionStorage.getItem(LEAD_TOKEN_STORAGE_KEY);
  if (!token) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}token=${encodeURIComponent(token)}`;
}

// ============================================================================
// PUBLIC LEAD API CALLS
// ============================================================================

export async function unlockLeadPasscode(passcode: string): Promise<{
  success: boolean;
  token?: string;
  label?: string;
  expires_in?: number;
  error?: string;
  attempts_remaining?: number;
  lockout_seconds?: number;
  locked?: boolean;
}> {
  const res = await fetch('/api/lead/unlock/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode }),
  });
  const data = await res.json();
  if (res.ok && data.success && data.token) {
    setLeadPasscodeToken(data.token, data.label);
  }
  return data;
}

export async function submitLead(
  formData: FormData,
  signal?: AbortSignal
): Promise<{
  success: boolean;
  lead_id?: string;
  reference_code?: string;
  status?: string;
  error?: string;
  auth_required?: boolean;
}> {
  const token = getLeadPasscodeToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers['X-Lead-Passcode-Token'] = token;
    headers['Authorization'] = `Bearer ${token}`;
    formData.append('token', token);
  }

  const res = await fetch('/api/lead/submit/', {
    method: 'POST',
    headers,
    body: formData,
    signal,
  });

  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    clearLeadPasscodeToken();
    return {
      success: false,
      auth_required: true,
      error: data.detail || data.error || 'Passcode session expired. Please enter passcode again to unlock.',
    };
  }

  if (!res.ok) {
    return {
      success: false,
      error: data.error || data.detail || 'Submission failed. Please check your inputs and try again.',
    };
  }

  return data;
}

export async function pollLeadStatus(leadId: string): Promise<LeadStatusPollResponse> {
  const res = await fetch(`/api/lead/status/${leadId}/`);
  if (!res.ok) {
    throw new Error('Failed to retrieve lead status');
  }
  return res.json();
}

export async function updateCustomerLeadContact(
  leadId: string,
  data: {
    name: string;
    company: string;
    designation?: string;
    phone: string;
    email?: string;
    address: string;
  }
): Promise<{ success: boolean; message: string; contact: any }> {
  const token = getLeadPasscodeToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['X-Lead-Passcode-Token'] = token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`/api/lead/contact/${leadId}/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update contact details');
  }
  return res.json();
}

export async function sendLeadBrochureEmail(data: {
  lead_id?: string;
  reference_code: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
}): Promise<{ success: boolean; message: string }> {
  const token = getLeadPasscodeToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['X-Lead-Passcode-Token'] = token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch('/api/lead/send-brochure-email/', {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to dispatch brochure email');
  }
  return res.json();
}

// ============================================================================
// SUPERADMIN LEAD API CALLS
// ============================================================================

export async function getSuperAdminLeads(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>,
  params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    min_confidence?: number;
    from_date?: string;
    to_date?: string;
    sort_by?: string;
    sort_order?: string;
  }
): Promise<{
  leads: LeadListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.min_confidence !== undefined) query.set('min_confidence', String(params.min_confidence));
  if (params.from_date) query.set('from_date', params.from_date);
  if (params.to_date) query.set('to_date', params.to_date);
  if (params.sort_by) query.set('sort_by', params.sort_by);
  if (params.sort_order) query.set('sort_order', params.sort_order);

  const res = await authFetch(`/api/superadmin/leads/?${query.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch leads');
  }
  return res.json();
}

export async function getSuperAdminLeadDetail(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>,
  id: string
): Promise<LeadDetailItem> {
  const res = await authFetch(`/api/superadmin/leads/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch lead details');
  }
  return res.json();
}

export async function updateSuperAdminLead(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>,
  id: string,
  updates: Record<string, any>
): Promise<LeadDetailItem> {
  const res = await authFetch(`/api/superadmin/leads/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error('Failed to update lead');
  }
  return res.json();
}

export async function reprocessSuperAdminLead(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>,
  id: string
): Promise<{ success: boolean; message: string }> {
  const res = await authFetch(`/api/superadmin/leads/${id}/reprocess/`, {
    method: 'POST',
  });
  return res.json();
}

export async function bulkSuperAdminLeadAction(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>,
  action: 'verify' | 'archive' | 'delete',
  lead_ids: string[]
): Promise<{ success: boolean; updated_count: number }> {
  const res = await authFetch('/api/superadmin/leads/bulk/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, lead_ids }),
  });
  return res.json();
}

export async function getSuperAdminLeadStats(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>
): Promise<LeadStatsResponse> {
  const res = await authFetch('/api/superadmin/leads/stats/');
  if (!res.ok) {
    throw new Error('Failed to fetch lead statistics');
  }
  return res.json();
}

export async function getSuperAdminPasscodes(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>
): Promise<LeadPasscodeItem[]> {
  const res = await authFetch('/api/superadmin/lead-passcodes/');
  if (!res.ok) {
    throw new Error('Failed to fetch passcodes');
  }
  return res.json();
}

export async function createSuperAdminPasscode(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>,
  data: {
    label: string;
    passcode: string;
    rotate?: boolean;
    max_uses?: number | null;
    expires_at?: string | null;
  }
): Promise<LeadPasscodeItem> {
  const res = await authFetch('/api/superadmin/lead-passcodes/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create passcode');
  }
  return res.json();
}

export async function updateSuperAdminPasscode(
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>,
  data: {
    id: number;
    is_active?: boolean;
    label?: string;
    max_uses?: number | null;
    expires_at?: string | null;
  }
): Promise<LeadPasscodeItem> {
  const res = await authFetch('/api/superadmin/lead-passcodes/', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to update passcode');
  }
  return res.json();
}

