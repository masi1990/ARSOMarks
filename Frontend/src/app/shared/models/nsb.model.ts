import { Country } from './reference-data.model';

export interface NsbContact {
  id?: string;
  nsbId?: string;
  contactType: 'PRIMARY' | 'ALTERNATIVE' | 'TECHNICAL' | 'FINANCIAL' | 'ARSO_LIAISON' | 'ACAP_COORDINATOR' | 'MARKET_SURVEILLANCE_FOCAL_POINT' | 'CUSTOMS_TRADE_FOCAL_POINT' | 'CONSUMER_AFFAIRS_FOCAL_POINT';
  name: string;
  designation?: string;
  email: string;
  phone?: string;
  mobile?: string;
  isActive?: boolean;
}

export interface NsbLocation {
  id?: string;
  nsbId?: string;
  locationType: 'HEADQUARTERS' | 'BRANCH' | 'LABORATORY' | 'REGIONAL_OFFICE';
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  countryId?: string;
  latitude?: number;
  longitude?: number;
  isPrimary?: boolean;
}

export interface Nsb {
  id: string;
  name: string;
  shortName?: string;
  countryId: string;
  classification: 'GOVERNMENT_AGENCY' | 'PARASTATAL' | 'PRIVATE' | 'OTHER';
  registrationNumber?: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  contacts?: NsbContact[];
  locations?: NsbLocation[];
  country?: Country;
  // Stage 1.2: Additional Profile Fields
  websiteUrl?: string;
  socialMediaHandles?: Record<string, string>;
  totalStaff?: number;
  keyDepartments?: string[];
  sectors?: string[]; // Sectors/Domains covered by this NSB (e.g., Food & Agriculture, Telecommunications, etc.)
  nationalStandardsActLink?: string;
  nationalConformityAssessmentPolicyLink?: string;
  nationalQualityPolicyLink?: string;
  acapCoordinatorName?: string;
  acapCoordinatorContact?: string;
  marketSurveillanceFocalPointName?: string;
  marketSurveillanceFocalPointContact?: string;
  customsTradeFocalPointName?: string;
  customsTradeFocalPointContact?: string;
  consumerAffairsFocalPointName?: string;
  consumerAffairsFocalPointContact?: string;
  documents?: NsbDocument[];
  stakeholderRegistryStatus?: 'DRAFT' | 'SUBMITTED';
  stakeholderRegistrySubmittedAt?: string;
  stakeholderRegistrySubmittedBy?: string;
}

export enum NsbProfileDocumentType {
  NATIONAL_STANDARDS_ACT_DOCUMENT = 'NATIONAL_STANDARDS_ACT_DOCUMENT',
  NATIONAL_CONFORMITY_ASSESSMENT_POLICY_DOCUMENT = 'NATIONAL_CONFORMITY_ASSESSMENT_POLICY_DOCUMENT',
  NATIONAL_QUALITY_POLICY_DOCUMENT = 'NATIONAL_QUALITY_POLICY_DOCUMENT',
  ORGANIZATIONAL_CHART_DOCUMENT = 'ORGANIZATIONAL_CHART_DOCUMENT',
  OTHER = 'OTHER',
}

export interface NsbDocument {
  id?: string;
  nsbId?: string;
  documentType: NsbProfileDocumentType;
  fileName: string;
  filePath?: string;
  fileHash?: string;
  fileSize: number;
  mimeType?: string;
  uploadedAt?: string;
}

export interface PagedNsbResponse {
  data: Nsb[];
  total: number;
}

