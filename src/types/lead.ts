export interface PhoneItem {
  raw: string;
  e164: string;
  country: string;
  type: string;
  source?: string;
}

export interface AddressComponents {
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export interface ExtractedContact {
  id: string;
  source_file: string | null;
  source_type: 'OCR' | 'QR' | 'VCARD' | 'MANUAL' | 'VOICE';
  name: string;
  company: string;
  designation: string;
  phones: PhoneItem[];
  primary_phone: string;
  emails: string[];
  websites: string[];
  address_raw: string;
  address_components: AddressComponents;
  confidence: Record<string, number>;
  overall_confidence: number;
  bounding_boxes: any[];
  is_primary: boolean;
  is_verified: boolean;
  edited_by_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface LeadFileItem {
  id: string;
  original_filename: string;
  mime_type: string;
  size: number;
  sha256: string;
  kind: 'CARD' | 'BROCHURE' | 'QR' | 'PDF' | 'OTHER';
  page_count: number;
  processing_status: 'PENDING' | 'PROCESSING' | 'DONE' | 'FAILED';
  error_message: string;
  raw_ocr_text: string;
  ocr_engine: string;
  download_url: string;
  thumbnail_url: string;
  created_at: string;
}

export interface LeadVoiceNoteItem {
  id: string;
  duration_seconds: number;
  mime_type: string;
  size: number;
  transcript: string | null;
  transcript_language: string;
  transcription_status: 'PENDING' | 'DONE' | 'SKIPPED' | 'FAILED';
  stream_url: string;
  created_at: string;
}

export interface LeadAuditLogItem {
  id: number;
  actor: string;
  action: string;
  details: Record<string, any>;
  timestamp: string;
}

export interface LeadProcessingJobItem {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  current_step: string;
  progress_percent: number;
  attempts: number;
  max_retries: number;
  error_message: string;
  created_at: string;
  updated_at: string;
}

export interface LeadListItem {
  id: string;
  reference_code: string;
  customer_name_input: string;
  description: string;
  status: 'NEW' | 'PROCESSING' | 'NEEDS_REVIEW' | 'VERIFIED' | 'FAILED' | 'ARCHIVED';
  is_customer_confirmed?: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  tags: string[];
  created_at: string;
  updated_at: string;
  primary_contact: {
    id: string;
    name: string;
    company: string;
    designation: string;
    phone: string;
    email: string;
    address: string;
    overall_confidence: number;
    is_verified: boolean;
  } | null;
  files_count: number;
  voice_notes_count: number;
  first_card_thumbnail: string | null;
}

export interface LeadDetailItem {
  id: string;
  reference_code: string;
  customer_name_input: string;
  description: string;
  status: 'NEW' | 'PROCESSING' | 'NEEDS_REVIEW' | 'VERIFIED' | 'FAILED' | 'ARCHIVED';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  tags: string[];
  source_ip: string;
  user_agent: string;
  verified_by: string;
  verified_at: string | null;
  internal_notes: string;
  created_at: string;
  updated_at: string;
  files: LeadFileItem[];
  voice_notes: LeadVoiceNoteItem[];
  contacts: ExtractedContact[];
  audit_logs: LeadAuditLogItem[];
  job: LeadProcessingJobItem | null;
}

export interface LeadPasscodeItem {
  id: number;
  label: string;
  is_active: boolean;
  expires_at: string | null;
  max_uses: number | null;
  uses_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface LeadStatsResponse {
  total: number;
  new: number;
  processing: number;
  needs_review: number;
  verified: number;
  failed: number;
  archived: number;
  avg_confidence: number;
  trend_30_days: Array<{ date: string; count: number }>;
}

export interface LeadStatusPollResponse {
  id: string;
  reference_code: string;
  status: string;
  is_customer_confirmed?: boolean;
  created_at: string;
  description?: string;
  customer_name_input?: string;
  job: {
    status: string;
    current_step: string;
    progress_percent: number;
  };
  files_count: number;
  voice_notes_count: number;
  files?: LeadFileItem[];
  voice_notes?: LeadVoiceNoteItem[];
  extracted_preview: ExtractedContact | null;
  contacts?: ExtractedContact[];
}

