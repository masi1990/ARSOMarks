// Stakeholder Registry Models (Phase 2.1)

export enum MsaJurisdiction {
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
}

export enum MouStatus {
  SIGNED = 'SIGNED',
  PENDING = 'PENDING',
  NOT_SIGNED = 'NOT_SIGNED',
  N_A = 'N/A',
}

export enum SystemAccessLevel {
  READ_ONLY = 'READ_ONLY',
  FULL = 'FULL',
}

export enum RegulatoryAgencyType {
  FOOD_DRUG_AUTHORITY = 'FOOD_DRUG_AUTHORITY',
  AGRICULTURE_MINISTRY = 'AGRICULTURE_MINISTRY',
  HEALTH_MINISTRY = 'HEALTH_MINISTRY',
  ENVIRONMENT_AGENCY = 'ENVIRONMENT_AGENCY',
  INDUSTRY_TRADE_MINISTRY = 'INDUSTRY_TRADE_MINISTRY',
  OTHER = 'OTHER',
}

export enum AccreditationStatus {
  AFRAC_MRA = 'AFRAC_MRA',
  OTHER = 'OTHER',
  NONE = 'NONE',
}

export interface MarketSurveillanceAuthority {
  id?: string;
  agencyName: string;
  jurisdiction: MsaJurisdiction;
  contactPersonName: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  scopeOfAuthority?: string;
  mouStatus?: MouStatus;
  mouDocumentPath?: string;
  mouDocumentHash?: string;
  systemAccessLevelRequested?: SystemAccessLevel;
  isActive?: boolean;
}

export interface CustomsBorderAgency {
  id?: string;
  agencyName: string;
  keyBorderPosts?: string[];
  acapVerificationContactName?: string;
  acapVerificationContactEmail?: string;
  acapVerificationContactPhone?: string;
  integrationWithNationalSingleWindow?: boolean;
  isActive?: boolean;
}

export interface RegulatoryAgency {
  id?: string;
  agencyName: string;
  agencyType: RegulatoryAgencyType;
  otherTypeDescription?: string;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  isActive?: boolean;
}

export interface IndustryAssociation {
  id?: string;
  associationName: string;
  sectorIndustry?: string;
  numberOfMembers?: number;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  willingnessToPromoteAcap?: boolean;
  isActive?: boolean;
}

export interface TestingLaboratory {
  id?: string;
  name: string;
  accreditationStatus?: AccreditationStatus;
  otherAccreditationDescription?: string;
  scopeOfAccreditation?: string;
  contactForAcapReferralsName?: string;
  contactForAcapReferralsEmail?: string;
  contactForAcapReferralsPhone?: string;
  isActive?: boolean;
}

export interface StakeholderRegistry {
  marketSurveillanceAuthorities?: MarketSurveillanceAuthority[];
  customsBorderAgencies?: CustomsBorderAgency[];
  regulatoryAgencies?: RegulatoryAgency[];
  industryAssociations?: IndustryAssociation[];
  testingLaboratories?: TestingLaboratory[];
}

