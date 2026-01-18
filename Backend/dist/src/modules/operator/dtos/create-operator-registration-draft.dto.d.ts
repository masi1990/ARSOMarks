export declare class CompanyInfoDraftDto {
    operatorType?: any;
    companyLegalName?: any;
    tradingName?: any;
    registrationNumberBusiness?: any;
    legalRegistrationNumberType?: any;
    legalRegistrationNumber?: any;
    taxId?: any;
    vatNumber?: any;
    yearEstablished?: any;
    legalStructure?: any;
    businessActivity?: any;
}
export declare class CompanySizeDraftDto {
    employeeCount?: any;
    annualTurnover?: any;
    annualRevenue?: any;
    exportPercentage?: any;
    importPercentage?: any;
    capitalInvestment?: any;
}
export declare class OwnershipInfoDraftDto {
    ownershipType?: any;
    majorityOwnerNationality?: any;
    womenOwned?: any;
    youthOwned?: any;
    blackOwnedPercentage?: any;
    beneficialOwnersCount?: any;
    pepInvolved?: any;
    pepDetails?: any;
}
export declare class OperatorContactDraftDto {
    contactType?: any;
    primaryContact?: any;
    contactPosition?: any;
    contactEmail?: any;
    contactPhone?: any;
    altContact?: any;
    altEmail?: any;
    altPhone?: any;
    isPrimary?: any;
}
export declare class OperatorLocationDraftDto {
    locationType?: any;
    physicalAddress?: any;
    addressLine1?: any;
    addressLine2?: any;
    postalCode?: any;
    cityTown?: any;
    regionState?: any;
    countryId?: any;
    gpsCoordinates?: any;
    geoLat?: any;
    geoLng?: any;
    geoAccuracyM?: any;
    factoryLocationSame?: any;
    factoryName?: any;
    factoryType?: any;
    factorySize?: any;
    isPrimary?: any;
}
export declare class BusinessSectorDraftDto {
    mainSector?: any;
    subSector?: any;
    isicCode?: any;
    productCategories?: any;
    percentageRevenue?: any;
    sectorStartYear?: any;
}
export declare class MarketInfoDraftDto {
    domesticMarkets?: any;
    exportMarkets?: any;
    primaryExportMarket?: any;
    exportStartYear?: any;
    importSources?: any;
    afcftaAwareness?: any;
    tradeChallenges?: any;
}
export declare class ProductionCapacityDraftDto {
    productionCapacity?: any;
    capacityUnit?: any;
    capacityUtilization?: any;
    qualityManagement?: any;
    qmsType?: any;
    certificationCount?: any;
    existingCertifications?: any;
    technicalStaff?: any;
}
export declare class PreferencesDraftDto {
    preferredLanguage?: any;
    communicationPreferences?: any;
    notificationFrequency?: any;
    timezone?: any;
    currency?: any;
}
export declare class AccessibilityDraftDto {
    assistiveTech?: any;
    disabilityTypes?: any;
    specialAssistance?: any;
    literacyLevel?: any;
    internetAccess?: any;
    deviceType?: any;
}
export declare class ConsentDraftDto {
    dataConsent?: any;
    dataSharingConsent?: any;
    crossBorderData?: any;
    marketingConsent?: any;
    smsConsent?: any;
    whatsappConsent?: any;
    termsAcceptance?: any;
    declarationSignature?: any;
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
    isGroup?: any;
    groupManagerId?: any;
    groupMembers?: any;
    schemeType?: any;
    schemePayload?: any;
    userId?: any;
    countryId?: any;
}
