import { OperatorType, LegalStructure, EmployeeCountRange, AnnualTurnoverRange, OwnershipType, OwnershipStatus, LegalRegistrationNumberType } from '../../../shared/enums';
export declare class CompanyInfoDto {
    operatorType: OperatorType;
    companyLegalName?: string;
    tradingName?: string;
    registrationNumberBusiness: string;
    legalRegistrationNumberType?: LegalRegistrationNumberType;
    legalRegistrationNumber?: string;
    taxId?: string;
    vatNumber?: string;
    yearEstablished?: number;
    legalStructure: LegalStructure;
    businessActivity: string;
}
export declare class CompanySizeDto {
    employeeCount: EmployeeCountRange;
    annualTurnover: AnnualTurnoverRange;
    annualRevenue?: number;
    exportPercentage?: number;
    importPercentage?: number;
    capitalInvestment?: number;
}
export declare class OwnershipInfoDto {
    ownershipType: OwnershipType;
    majorityOwnerNationality?: string;
    womenOwned: OwnershipStatus;
    youthOwned: OwnershipStatus;
    blackOwnedPercentage?: number;
    beneficialOwnersCount?: number;
    pepInvolved?: boolean;
    pepDetails?: string;
}
export declare class OperatorContactDto {
    contactType?: string;
    primaryContact: string;
    contactPosition: string;
    contactEmail: string;
    contactPhone?: string;
    altContact?: string;
    altEmail?: string;
    altPhone?: string;
    isPrimary?: boolean;
}
export declare class OperatorLocationDto {
    locationType?: string;
    physicalAddress: string;
    addressLine1: string;
    addressLine2?: string;
    postalCode: string;
    cityTown: string;
    regionState: string;
    countryId: string;
    gpsCoordinates?: string;
    geoLat?: number;
    geoLng?: number;
    geoAccuracyM?: number;
    factoryLocationSame?: boolean;
    factoryName?: string;
    factoryType?: string;
    factorySize?: number;
    isPrimary?: boolean;
}
export declare class BusinessSectorDto {
    mainSector: string;
    subSector?: string[];
    isicCode?: string;
    productCategories?: string[];
    percentageRevenue?: number;
    sectorStartYear?: number;
}
export declare class MarketInfoDto {
    domesticMarkets?: string[];
    exportMarkets?: string[];
    primaryExportMarket: string;
    exportStartYear?: number;
    importSources?: string[];
    afcftaAwareness: string;
    tradeChallenges?: string;
}
export declare class ProductionCapacityDto {
    productionCapacity?: number;
    capacityUnit?: string;
    capacityUtilization?: number;
    qualityManagement: string;
    qmsType: string;
    certificationCount?: number;
    existingCertifications?: string;
    technicalStaff?: number;
}
export declare class PreferencesDto {
    preferredLanguage?: string;
    communicationPreferences?: string[];
    notificationFrequency?: string;
    timezone?: string;
    currency?: string;
}
export declare class AccessibilityDto {
    assistiveTech?: boolean;
    disabilityTypes?: string[];
    specialAssistance?: string;
    literacyLevel?: string;
    internetAccess: string;
    deviceType: string;
}
export declare class ConsentDto {
    dataConsent?: boolean;
    dataSharingConsent?: boolean;
    crossBorderData?: boolean;
    marketingConsent?: boolean;
    smsConsent?: boolean;
    whatsappConsent?: boolean;
    termsAcceptance?: boolean;
    declarationSignature: string;
}
export declare class GroupMemberDto {
    memberName: string;
    registrationNumberBusiness?: string;
    countryId?: string;
}
export declare class CreateOperatorRegistrationDto {
    companyInfo?: CompanyInfoDto;
    companySize?: CompanySizeDto;
    ownershipInfo?: OwnershipInfoDto;
    primaryContact?: OperatorContactDto;
    locations?: OperatorLocationDto[];
    businessSectors?: BusinessSectorDto[];
    marketInfo?: MarketInfoDto;
    productionCapacity?: ProductionCapacityDto;
    preferences?: PreferencesDto;
    accessibility?: AccessibilityDto;
    consents?: ConsentDto;
    isGroup?: boolean;
    groupManagerId?: string;
    groupMembers?: GroupMemberDto[];
    schemeType?: string;
    schemePayload?: Record<string, any>;
    userId?: string;
    countryId: string;
}
