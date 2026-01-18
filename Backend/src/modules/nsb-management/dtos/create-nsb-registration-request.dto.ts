import { IsOptional } from 'class-validator';
import { NsbDocumentType } from '../../../shared/enums';

export class UploadDocumentDto {
  @IsOptional()
  documentType: NsbDocumentType;
  @IsOptional()
  fileName: string;
  @IsOptional()
  filePath: string;
  @IsOptional()
  fileHash: string;
  @IsOptional()
  fileSize: number;
  @IsOptional()
  mimeType?: string;
}

export class CreateNsbRegistrationRequestDto {
  // Country Information
  @IsOptional()
  countryId?: string;

  @IsOptional()
  countryName?: string;

  @IsOptional()
  nsbOfficialName?: string;

  @IsOptional()
  nsbAcronym?: string;

  @IsOptional()
  isoCode?: string;

  // Legal Identity & Registration
  @IsOptional()
  legalStatus?: string;

  @IsOptional()
  establishmentActName?: string;

  @IsOptional()
  establishmentActNumber?: string;

  @IsOptional()
  establishmentActDate?: string;

  @IsOptional()
  registrationNumber?: string;

  @IsOptional()
  registrationAuthority?: string;

  @IsOptional()
  taxIdentificationNumber?: string;

  @IsOptional()
  vatNumber?: string;

  @IsOptional()
  yearEstablished?: number;

  @IsOptional()
  website?: string;

  // Primary Contact Information
  @IsOptional()
  contactPersonName?: string;

  @IsOptional()
  contactPersonTitle?: string;

  @IsOptional()
  contactEmail?: string;

  @IsOptional()
  contactPhone?: string;

  @IsOptional()
  contactMobile?: string;

  // Leadership & Governance
  @IsOptional()
  directorGeneralName?: string;

  @IsOptional()
  directorGeneralTitle?: string;

  @IsOptional()
  directorGeneralEmail?: string;

  @IsOptional()
  directorGeneralPhone?: string;

  @IsOptional()
  boardChairName?: string;

  @IsOptional()
  boardChairEmail?: string;

  @IsOptional()
  boardChairPhone?: string;

  // Addresses
  @IsOptional()
  headquartersAddress?: Record<string, any>;

  @IsOptional()
  postalAddress?: Record<string, any>;

  @IsOptional()
  additionalAddresses?: Record<string, any>[];

  // Additional Contacts
  @IsOptional()
  additionalContacts?: Record<string, any>[];

  @IsOptional()
  keyOfficials?: Record<string, any>[];

  @IsOptional()
  internationalMemberships?: Record<string, any>[];

  @IsOptional()
  mandateAreas?: string[];

  // Role Designation
  @IsOptional()
  additionalUserSlotsRequested?: number;

  @IsOptional()
  requestedRoles?: string[];

  // Sectors/Domains covered by this NSB (e.g., Food & Agriculture, Telecommunications, etc.)
  @IsOptional()
  sectors?: string[];

  // Documents (handled separately via file upload)
  @IsOptional()
  documents?: UploadDocumentDto[];
}

