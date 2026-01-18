export enum CbApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  PROVISIONAL = 'PROVISIONAL',
  SUSPENDED = 'SUSPENDED',
  WITHDRAWN = 'WITHDRAWN',
  REJECTED = 'REJECTED',
}

export enum CbAccreditationStandard {
  ISO_IEC_17065 = 'ISO_IEC_17065',
  ISO_IEC_17021_1 = 'ISO_IEC_17021_1',
  OTHER = 'OTHER',
}

export enum CbDocumentType {
  LEGAL_REGISTRATION = 'LEGAL_REGISTRATION',
  ACCREDITATION_CERTIFICATE = 'ACCREDITATION_CERTIFICATE',
  ACCREDITATION_SCOPE = 'ACCREDITATION_SCOPE',
  ACKNOWLEDGEMENT_OF_APPLICATION = 'ACKNOWLEDGEMENT_OF_APPLICATION',
  OTHER = 'OTHER',
}

export interface CbApplicationDocument {
  id: string;
  applicationId: string;
  documentType: CbDocumentType;
  fileName: string;
  filePath: string;
  fileHash: string;
  fileSize: number;
  mimeType?: string;
  uploadedAt: string;
}

export interface CbApplication {
  id: string;
  applicationNumber?: string;
  legalName: string;
  shortName?: string;
  contactPersonName: string;
  contactPersonTitle?: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  physicalAddress: string;
  postalAddress?: string;
  countryId?: string;
  regionsOfOperation: string[];
  regionsOther?: string;
  isAccredited: boolean;
  accreditationStandard?: CbAccreditationStandard;
  accreditationBodyId?: string;
  accreditationBodyName?: string;
  accreditationCertificateNumber?: string;
  accreditationScope?: string;
  accreditationValidUntil?: string;
  accreditationApplicationDate?: string;
  accreditationProgressNotes?: string;
  previousLicenseHeld?: boolean;
  previousLicenseGrantedAt?: string;
  previousLicenseTerminatedAt?: string;
  previousLicenseTerminationReason?: string;
  appliedSchemes?: any;
  declarations?: any;
  status: CbApplicationStatus;
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  provisionalValidUntil?: string;
  createdAt: string;
  updatedAt: string;
}
