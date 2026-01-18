import { MarkRequestedType, MarkCombinationPreference, CertificationSchemeType, ApplicationScope, ProductCertificationType, PriorityProcessing, ExpectedTimeline, VolumeUnit, ProductCategory, TargetConsumerGroup, PackagingType, TechnicalDocsStatus, TestReportsAvailability, TraceabilityStatus, EnvironmentalBenefit, ThirdPartyVerificationStatus, LifecycleAssessmentType, LifecycleAspect, EnvironmentalManagementSystem, TakeBackProgramStatus, AuditLanguage, AuditTeamSize } from '../../../shared/enums';
export declare class MarkSelectionDto {
    markRequested: MarkRequestedType[];
    arsoQualityMark?: boolean;
    ecoMarkAfrica?: boolean;
    markCombination?: MarkCombinationPreference;
}
export declare class CertificationSchemeDto {
    schemeType: CertificationSchemeType;
    applicationScope: ApplicationScope;
    certificationType: ProductCertificationType;
    schemePayload?: Record<string, any>;
}
export declare class VolumePriorityDto {
    estimatedVolume: number;
    volumeUnit: VolumeUnit;
    peakMonth?: number;
    priorityProcessing: PriorityProcessing;
    priorityReason?: string;
    expectedTimeline: ExpectedTimeline;
}
export declare class ProductDto {
    productName: string;
    productScientificName?: string;
    brandName: string;
    modelVariant: string;
    productCode?: string;
    hsCode: string;
    productCategory: ProductCategory;
    productDescription: string;
    intendedUse: string;
    keyFeatures?: string[];
    uniqueSellingPoint?: string;
    intendedMarkets?: string[];
    primaryTargetMarket?: string;
    targetConsumers: TargetConsumerGroup[];
    consumerWarnings?: string;
    shelfLife?: string;
    storageConditions?: string;
    unitWeight?: string;
    dimensions?: string;
    color?: string[];
    materialComposition?: string;
    packagingType: PackagingType;
    packagingMaterial: string;
    packagingWeight?: string;
    unitsPerPackage?: number;
    displayOrder?: number;
}
export declare class TechnicalSpecDto {
    applicableStandards: string[];
    mandatoryStandards: string[];
    voluntaryStandards?: string[];
    regulatoryBody: string;
    regulatoryApproval?: string;
    technicalDocsAvailable: TechnicalDocsStatus;
    missingDocuments?: string;
    testReportsAvailable: TestReportsAvailability;
    testCoverage?: number;
    manufacturingProcess: string;
    processFlowDiagram: boolean;
    keyComponents: string;
    criticalComponents: string;
    componentSources: string;
    supplierListAvailable?: string;
    traceabilitySystem: TraceabilityStatus;
    batchTraceability: TraceabilityStatus;
}
export declare class EnvironmentalClaimDto {
    environmentalBenefits: EnvironmentalBenefit[];
    ecoClaimsSupporting: string;
    thirdPartyVerification: ThirdPartyVerificationStatus;
    verifierName?: string;
    lifecycleAspects: LifecycleAspect[];
    lifecycleAssessment: LifecycleAssessmentType;
    carbonFootprint: boolean;
    carbonValue?: number;
    environmentalManagement: EnvironmentalManagementSystem;
    environmentalPolicy: boolean;
    wasteManagement: string;
    recyclingInfo: string;
    takeBackProgram: TakeBackProgramStatus;
}
export declare class CbSelectionDto {
    preferredCb?: string;
    cbSelectionReason: string;
    previousCb: boolean;
    previousCbName?: string;
    previousCertificateNumber?: string;
    auditLanguage: AuditLanguage;
    auditTiming: string;
    peakPeriods: string;
    specialRequirements?: string;
    auditTeamSize: AuditTeamSize;
}
export declare class DeclarationDto {
    truthDeclaration: boolean;
    complianceCommitment: boolean;
    surveillanceAcceptance: boolean;
    correctiveActionCommitment: boolean;
    marketSurveillanceAcceptance: boolean;
    markUsageCommitment: boolean;
    feesAcceptance: boolean;
    feeBreakdownAcknowledged: boolean;
    paymentTermsAccepted: boolean;
    additionalCostsUnderstood: boolean;
    applicantName: string;
    applicantPosition: string;
    applicantSignature?: string;
}
export declare class CreateProductCertificationApplicationDto {
    operatorId: string;
    markSelection: MarkSelectionDto;
    certificationScheme: CertificationSchemeDto;
    volumePriority: VolumePriorityDto;
    products: ProductDto[];
    technicalSpecs?: TechnicalSpecDto[];
    environmentalClaims?: EnvironmentalClaimDto[];
    cbSelection: CbSelectionDto;
    declaration: DeclarationDto;
}
