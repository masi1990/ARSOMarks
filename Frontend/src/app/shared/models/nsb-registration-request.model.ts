export enum NsbRegistrationRequestStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum NsbDocumentType {
  NSB_ESTABLISHMENT_CHARTER = 'NSB_ESTABLISHMENT_CHARTER',
  ARSO_MEMBERSHIP_CERTIFICATE = 'ARSO_MEMBERSHIP_CERTIFICATE',
  GOVERNMENT_GAZETTE_NOTICE = 'GOVERNMENT_GAZETTE_NOTICE',
  DECLARATION_OF_AUTHORITY = 'DECLARATION_OF_AUTHORITY',
  NATIONAL_STANDARDS_ACT = 'NATIONAL_STANDARDS_ACT',
  NATIONAL_CONFORMITY_ASSESSMENT_POLICY = 'NATIONAL_CONFORMITY_ASSESSMENT_POLICY',
  ORGANIZATIONAL_CHART = 'ORGANIZATIONAL_CHART',
  OTHER = 'OTHER',
}

export interface NsbRegistrationRequestDocument {
  id?: string;
  registrationRequestId?: string;
  documentType: NsbDocumentType;
  fileName: string;
  filePath?: string;
  fileHash?: string;
  fileSize: number;
  mimeType?: string;
  uploadedAt?: string;
}

export interface NsbRegistrationRequest {
  id?: string;
  countryId: string;
  countryName: string;
  nsbOfficialName: string;
  nsbAcronym?: string;
  isoCode: string;
  contactPersonName: string;
  contactPersonTitle?: string;
  contactEmail: string;
  contactPhone?: string;
  contactMobile?: string;
  additionalUserSlotsRequested?: number;
  requestedRoles?: string[];
  status: NsbRegistrationRequestStatus;
  remarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  nsbId?: string;
  documents?: NsbRegistrationRequestDocument[];
  country?: any;
}

export interface CreateNsbRegistrationRequestDto {
  countryId: string;
  countryName: string;
  nsbOfficialName: string;
  nsbAcronym?: string;
  isoCode: string;
  contactPersonName: string;
  contactPersonTitle?: string;
  contactEmail: string;
  contactPhone?: string;
  contactMobile?: string;
  additionalUserSlotsRequested?: number;
  requestedRoles?: string[];
  documents?: NsbRegistrationRequestDocument[];
}

