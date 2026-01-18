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

export interface NsbAddress {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  type?: string;
  addressType?: string;
}

export interface NsbContactInfo {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  contactType?: string;
}

export interface NsbOfficialInfo {
  name?: string;
  designation?: string;
  title?: string;
  department?: string;
  email?: string;
  phone?: string;
}

export interface NsbMembershipInfo {
  organization?: string;
  membershipStatus?: string;
  yearJoined?: string;
  memberSince?: string;
  status?: string;
}

export interface NsbRegistrationRequest {
  id?: string;
  countryId: string;
  countryName: string;
  nsbOfficialName: string;
  nsbAcronym?: string;
  isoCode: string;
  legalStatus?: string;
  establishmentActName?: string;
  establishmentActNumber?: string;
  establishmentActDate?: string;
  registrationNumber?: string;
  registrationAuthority?: string;
  taxIdentificationNumber?: string;
  vatNumber?: string;
  yearEstablished?: number | null;
  website?: string;
  contactPersonName: string;
  contactPersonTitle?: string;
  contactEmail: string;
  contactPhone?: string;
  contactMobile?: string;
  directorGeneralName?: string;
  directorGeneralTitle?: string;
  directorGeneralEmail?: string;
  directorGeneralPhone?: string;
  boardChairName?: string;
  boardChairEmail?: string;
  boardChairPhone?: string;
  headquartersAddress?: NsbAddress;
  postalAddress?: NsbAddress;
  additionalAddresses?: NsbAddress[];
  additionalContacts?: NsbContactInfo[];
  keyOfficials?: NsbOfficialInfo[];
  internationalMemberships?: NsbMembershipInfo[];
  mandateAreas?: string[];
  additionalUserSlotsRequested?: number;
  requestedRoles?: string[];
  sectors?: string[]; // Sectors/Domains covered by this NSB (e.g., Food & Agriculture, Telecommunications, etc.)
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
  legalStatus?: string;
  establishmentActName?: string;
  establishmentActNumber?: string;
  establishmentActDate?: string;
  registrationNumber?: string;
  registrationAuthority?: string;
  taxIdentificationNumber?: string;
  vatNumber?: string;
  yearEstablished?: number | null;
  website?: string;
  contactPersonName: string;
  contactPersonTitle?: string;
  contactEmail: string;
  contactPhone?: string;
  contactMobile?: string;
  directorGeneralName?: string;
  directorGeneralTitle?: string;
  directorGeneralEmail?: string;
  directorGeneralPhone?: string;
  boardChairName?: string;
  boardChairEmail?: string;
  boardChairPhone?: string;
  headquartersAddress?: NsbAddress;
  postalAddress?: NsbAddress;
  additionalAddresses?: NsbAddress[];
  additionalContacts?: NsbContactInfo[];
  keyOfficials?: NsbOfficialInfo[];
  internationalMemberships?: NsbMembershipInfo[];
  mandateAreas?: string[];
  additionalUserSlotsRequested?: number;
  requestedRoles?: string[];
  sectors?: string[]; // Sectors/Domains covered by this NSB
  documents?: NsbRegistrationRequestDocument[];
}

