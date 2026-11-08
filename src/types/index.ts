export interface ProductInfo {
  id: string;
  name: string;
  chemicalName: string;
  casNumber: string;
  tagline: string;
  grade: string;
  activeContent: string;
  form: string;
  route: string;
  unNumber: string;
  hazardClass: string;
  description: string;
  overview: string;
  applications: string[];
  features: { title: string; desc: string }[];
  specifications: { parameter: string; value: string; method?: string }[];
  storageHandling: { title: string; instruction: string }[];
  faqs: { question: string; answer: string }[];
}

export interface LeaderInfo {
  name: string;
  role: string;
  qualification: string;
  bio: string;
  strengths: string;
  rolesHeld?: string[];
  initials: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Brochure' | 'Spec Sheet' | 'CoA' | 'SDS' | 'Certificate';
  format: 'PDF';
  size: string;
  requiresRequest: boolean;
  description: string;
}

export interface ExportRegion {
  name: string;
  coords: [number, number]; // [xPercent, yPercent] on map
  ports: string;
  notes: string;
}
