export declare class CompanyInfoDraftDto {
    operatorType?: any;
    companyLegalName?: any;
    tradingName?: any;
    registrationNumberBusiness?: any;
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
export declare class ApplicationContactDraftDto {
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
export declare class ApplicationLocationDraftDto {
    locationType?: any;
    physicalAddress?: any;
    addressLine1?: any;
    addressLine2?: any;
    postalCode?: any;
    cityTown?: any;
    regionState?: any;
    countryId?: any;
    gpsCoordinates?: any;
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
export declare class ProductCertificationDraftDto {
    markAppliedFor?: any;
    acapScheme?: any;
    productBrandName?: any;
    productModelTypeNumber?: any;
    applicableArsoStandards?: any[];
    scopeOfCertification?: any;
    expectedAnnualCertifiedVolume?: any;
    expectedAnnualCertifiedVolumeUnit?: any;
    targetMarkets?: any[];
}
export declare class ManufacturerInfoDraftDto {
    manufacturerLegalName?: any;
    manufacturerAddress?: any;
    manufacturerCountryId?: any;
    productionSiteGpsCoordinates?: any;
    typeOfProduction?: any;
}
export declare class ConformityEvidenceDraftDto {
    testReportFileId?: any;
    testReportIssuingBody?: any;
    testReportCertificateNo?: any;
    qmsCertificateFileId?: any;
    qmsCertificateIssuingBody?: any;
    qmsCertificateNo?: any;
    otherEvidenceFileId?: any;
    otherEvidenceIssuingBody?: any;
    otherEvidenceCertificateNo?: any;
    productPhotographsFileIds?: any[];
    labelArtworkFileId?: any;
    declarationOfConformityFileId?: any;
}
export declare class PostCertificationDraftDto {
    productRecallProcedureFileId?: any;
    complaintsManagementProcedureFileId?: any;
    agreementToSurveillance?: any;
    traceabilityUndertaking?: any;
}
export declare class CbSelectionDraftDto {
    selectedCertificationBodyId?: any;
    finalDeclarationSignature?: any;
    finalDeclarationDate?: any;
}
export declare class CreateApplicationRegistrationDraftDto {
    companyInfo?: CompanyInfoDraftDto;
    companySize?: CompanySizeDraftDto;
    ownershipInfo?: OwnershipInfoDraftDto;
    primaryContact?: ApplicationContactDraftDto;
    locations?: ApplicationLocationDraftDto[];
    businessSectors?: BusinessSectorDraftDto[];
    marketInfo?: MarketInfoDraftDto;
    productionCapacity?: ProductionCapacityDraftDto;
    preferences?: PreferencesDraftDto;
    accessibility?: AccessibilityDraftDto;
    consents?: ConsentDraftDto;
    productCertification?: ProductCertificationDraftDto;
    manufacturerInfo?: ManufacturerInfoDraftDto;
    conformityEvidence?: ConformityEvidenceDraftDto;
    postCertification?: PostCertificationDraftDto;
    cbSelection?: CbSelectionDraftDto;
    userId?: any;
    countryId?: any;
}
