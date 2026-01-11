import { Nsb } from './nsb.model';

export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'PENDING_WITNESS'
  | 'PENDING_CACO'
  | 'APPROVED_PENDING_PAYMENT'
  | 'APPROVED_PENDING_AGREEMENT'
  | 'ACTIVE'
  | 'PROVISIONAL'
  | 'SUSPENDED'
  | 'WITHDRAWN'
  | 'REJECTED';

export interface LicenseApplication {
  id: string;
  applicationNumber: string;
  nsbId: string;
  status: ApplicationStatus;
  applicationType: 'FULL' | 'PROVISIONAL' | 'RENEWAL' | 'SCOPE_EXTENSION';
  accreditationDetails?: any;
  appliedSchemes?: any;
  organizationalDetails?: any;
  financialDetails?: any;
  technicalCompetenceDetails?: any;
  qmsDetails?: any;
  declarations?: any;
  submittedAt?: string;
  nsb?: Nsb;
  documents?: ApplicationDocument[];
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  documentType: string;
  documentCategory?: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType?: string;
  version: number;
  isCurrent: boolean;
  verificationStatus: string;
  uploadedAt: string;
}

export interface License {
  id: string;
  licenseNumber: string;
  applicationId: string;
  nsbId: string;
  licenseType: 'FULL' | 'PROVISIONAL';
  status: 'ACTIVE' | 'PROVISIONAL' | 'SUSPENDED' | 'WITHDRAWN' | 'EXPIRED' | 'REVOKED';
  validFrom: string;
  validUntil: string;
  authorizedSchemes: any;
}

