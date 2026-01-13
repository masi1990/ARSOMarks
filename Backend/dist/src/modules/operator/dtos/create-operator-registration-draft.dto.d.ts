import { OperatorType, LegalStructure, EmployeeCountRange, AnnualTurnoverRange, OwnershipType, OwnershipStatus } from '../../../shared/enums';
export declare class CompanyInfoDraftDto {
    operatorType?: OperatorType;
    companyLegalName?: string;
    tradingName?: string;
    registrationNumberBusiness?: string;
    taxId?: string;
    vatNumber?: string;
    yearEstablished?: number;
    legalStructure?: LegalStructure;
    businessActivity?: string;
}
export declare class CompanySizeDraftDto {
    employeeCount?: EmployeeCountRange;
    annualTurnover?: AnnualTurnoverRange;
    annualRevenue?: number;
    exportPercentage?: number;
    importPercentage?: number;
    capitalInvestment?: number;
}
export declare class OwnershipInfoDraftDto {
    ownershipType?: OwnershipType;
    majorityOwnerNationality?: string;
    womenOwned?: OwnershipStatus;
    youthOwned?: OwnershipStatus;
    blackOwnedPercentage?: number;
    beneficialOwnersCount?: number;
    pepInvolved?: boolean;
    pepDetails?: string;
}
export declare class OperatorContactDraftDto {
    contactType?: string;
    primaryContact?: string;
    contactPosition?: string;
    contactEmail?: string;
    contactPhone?: string;
    altContact?: string;
    altEmail?: string;
    altPhone?: string;
    isPrimary?: boolean;
}
export declare class OperatorLocationDraftDto {
    locationType?: string;
    physicalAddress?: string;
    addressLine1?: string;
    addressLine2?: string;
    postalCode?: string;
    cityTown?: string;
    regionState?: string;
    countryId?: string;
    gpsCoordinates?: string;
    factoryLocationSame?: boolean;
    factoryName?: string;
    factoryType?: string;
    factorySize?: number;
    isPrimary?: boolean;
}
export declare class BusinessSectorDraftDto {
    mainSector?: string;
    subSector?: string[];
    isicCode?: string;
    productCategories?: string[];
    percentageRevenue?: number;
    sectorStartYear?: number;
}
export declare class MarketInfoDraftDto {
    domesticMarkets?: string[];
    exportMarkets?: string[];
    primaryExportMarket?: string;
    exportStartYear?: number;
    importSources?: string[];
    afcftaAwareness?: string;
    tradeChallenges?: string;
}
export declare class ProductionCapacityDraftDto {
    productionCapacity?: number;
    capacityUnit?: string;
    capacityUtilization?: number;
    qualityManagement?: string;
    qmsType?: string;
    certificationCount?: number;
    existingCertifications?: string;
    technicalStaff?: number;
}
export declare class PreferencesDraftDto {
    preferredLanguage?: string;
    communicationPreferences?: string[];
    notificationFrequency?: string;
    timezone?: string;
    currency?: string;
}
export declare class AccessibilityDraftDto {
    assistiveTech?: boolean;
    disabilityTypes?: string[];
    specialAssistance?: string;
    literacyLevel?: string;
    internetAccess?: string;
    deviceType?: string;
}
export declare class ConsentDraftDto {
    dataConsent?: boolean;
    dataSharingConsent?: boolean;
    crossBorderData?: boolean;
    marketingConsent?: boolean;
    smsConsent?: boolean;
    whatsappConsent?: boolean;
    termsAcceptance?: boolean;
    declarationSignature?: string;
}
export declare class CreateOperatorRegistrationDraftDto {
    companyInfo?: CompanyInfoDraftDto;
    companySize?: CompanySizeDraftDto;
    ownershipInfo?: OwnershipInfoDraftDto;
    primaryContact?: OperatorContactDraftDto;
    locations?: OperatorLocationDraftDto[];
    businessSectors?: BusinessSectorDraftDto[];
    marketInfo?: MarketInfoDraftDto;
    productionCapacity?: ProductionCapacityDraftDto;
    preferences?: PreferencesDraftDto;
    accessibility?: AccessibilityDraftDto;
    consents?: ConsentDraftDto;
    userId?: string;
    countryId?: string;
}
