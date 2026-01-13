// Product Certification Models

export enum MarkRequestedType {
  ARSO_QUALITY_MARK = 'ARSO_QUALITY_MARK',
  ECO_MARK_AFRICA = 'ECO_MARK_AFRICA',
  BOTH = 'BOTH',
}

export enum MarkCombinationPreference {
  BOTH_MARKS_SAME_PRODUCT = 'BOTH_MARKS_SAME_PRODUCT',
  SEPARATE_MARKS_DIFFERENT_PRODUCTS = 'SEPARATE_MARKS_DIFFERENT_PRODUCTS',
  UNDECIDED = 'UNDECIDED',
}

export enum CertificationSchemeType {
  SCHEME_1_TYPE_TESTING = 'SCHEME_1_TYPE_TESTING',
  SCHEME_2_TESTING_SURVEILLANCE = 'SCHEME_2_TESTING_SURVEILLANCE',
  SCHEME_3_TESTING_QUALITY_SYSTEM = 'SCHEME_3_TESTING_QUALITY_SYSTEM',
  SCHEME_4_BATCH_TESTING = 'SCHEME_4_BATCH_TESTING',
  SCHEME_5_100_PERCENT_TESTING = 'SCHEME_5_100_PERCENT_TESTING',
}

export enum ApplicationScope {
  SINGLE_PRODUCT = 'SINGLE_PRODUCT',
  PRODUCT_FAMILY = 'PRODUCT_FAMILY',
  MULTIPLE_PRODUCTS = 'MULTIPLE_PRODUCTS',
  FACTORY_PROCESS = 'FACTORY_PROCESS',
  MULTIPLE_FACTORIES = 'MULTIPLE_FACTORIES',
}

export enum ProductCertificationType {
  NEW_CERTIFICATION = 'NEW_CERTIFICATION',
  RENEWAL = 'RENEWAL',
  EXTENSION_NEW_PRODUCTS = 'EXTENSION_NEW_PRODUCTS',
  TRANSFER_FROM_OTHER_CB = 'TRANSFER_FROM_OTHER_CB',
  SCOPE_EXTENSION = 'SCOPE_EXTENSION',
}

export enum ProductCertificationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  PENDING_DOCUMENTS = 'PENDING_DOCUMENTS',
  PENDING_TESTING = 'PENDING_TESTING',
  PENDING_AUDIT = 'PENDING_AUDIT',
  APPROVED_PENDING_PAYMENT = 'APPROVED_PENDING_PAYMENT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  SUSPENDED = 'SUSPENDED',
  CERTIFIED = 'CERTIFIED',
  EXPIRED = 'EXPIRED',
}

export enum PriorityProcessing {
  YES = 'YES',
  NO = 'NO',
}

export enum ExpectedTimeline {
  URGENT_1_2_MONTHS = 'URGENT_1_2_MONTHS',
  STANDARD_3_4_MONTHS = 'STANDARD_3_4_MONTHS',
  FLEXIBLE_5_6_MONTHS = 'FLEXIBLE_5_6_MONTHS',
}

export enum ProductCategory {
  FOOD_BEVERAGE = 'FOOD_BEVERAGE',
  TEXTILES = 'TEXTILES',
  ELECTRONICS = 'ELECTRONICS',
  CHEMICALS = 'CHEMICALS',
  CONSTRUCTION = 'CONSTRUCTION',
  MACHINERY = 'MACHINERY',
  AGRICULTURE = 'AGRICULTURE',
  COSMETICS = 'COSMETICS',
  PHARMACEUTICALS = 'PHARMACEUTICALS',
  AUTOMOTIVE = 'AUTOMOTIVE',
  OTHER = 'OTHER',
}

export enum TargetConsumerGroup {
  GENERAL_PUBLIC = 'GENERAL_PUBLIC',
  CHILDREN = 'CHILDREN',
  ELDERLY = 'ELDERLY',
  PREGNANT_WOMEN = 'PREGNANT_WOMEN',
  PROFESSIONALS = 'PROFESSIONALS',
  INDUSTRIAL_USERS = 'INDUSTRIAL_USERS',
  INSTITUTIONAL = 'INSTITUTIONAL',
  OTHER = 'OTHER',
}

export enum PackagingType {
  BOTTLE = 'BOTTLE',
  BOX = 'BOX',
  POUCH = 'POUCH',
  BAG = 'BAG',
  CAN = 'CAN',
  JAR = 'JAR',
  BULK = 'BULK',
  OTHER = 'OTHER',
}

export enum TechnicalDocsStatus {
  COMPLETE = 'COMPLETE',
  PARTIAL = 'PARTIAL',
  NONE = 'NONE',
}

export enum TestReportsAvailability {
  YES_ACCREDITED_LAB = 'YES_ACCREDITED_LAB',
  YES_NON_ACCREDITED = 'YES_NON_ACCREDITED',
  SOME = 'SOME',
  NONE = 'NONE',
}

export enum TraceabilityStatus {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  NONE = 'NONE',
}

export enum EnvironmentalBenefit {
  ENERGY_EFFICIENT = 'ENERGY_EFFICIENT',
  WATER_EFFICIENT = 'WATER_EFFICIENT',
  RECYCLABLE = 'RECYCLABLE',
  BIODEGRADABLE = 'BIODEGRADABLE',
  COMPOSTABLE = 'COMPOSTABLE',
  LOW_EMISSIONS = 'LOW_EMISSIONS',
  REDUCED_WASTE = 'REDUCED_WASTE',
  SUSTAINABLE_SOURCING = 'SUSTAINABLE_SOURCING',
  RENEWABLE_MATERIALS = 'RENEWABLE_MATERIALS',
  CARBON_NEUTRAL = 'CARBON_NEUTRAL',
  OTHER = 'OTHER',
}

export enum ThirdPartyVerificationStatus {
  YES = 'YES',
  NO = 'NO',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum LifecycleAssessmentType {
  FULL_LCA = 'FULL_LCA',
  PARTIAL_LCA = 'PARTIAL_LCA',
  SCREENING_LCA = 'SCREENING_LCA',
  NONE = 'NONE',
}

export enum LifecycleAspect {
  RAW_MATERIAL_EXTRACTION = 'RAW_MATERIAL_EXTRACTION',
  MATERIAL_PROCESSING = 'MATERIAL_PROCESSING',
  MANUFACTURING = 'MANUFACTURING',
  PACKAGING = 'PACKAGING',
  DISTRIBUTION = 'DISTRIBUTION',
  USE_CONSUMPTION = 'USE_CONSUMPTION',
  END_OF_LIFE_DISPOSAL = 'END_OF_LIFE_DISPOSAL',
  RECYCLING = 'RECYCLING',
}

export enum EnvironmentalManagementSystem {
  ISO_14001_CERTIFIED = 'ISO_14001_CERTIFIED',
  INTERNAL_EMS = 'INTERNAL_EMS',
  NONE = 'NONE',
}

export enum TakeBackProgramStatus {
  YES = 'YES',
  NO = 'NO',
  PLANNED = 'PLANNED',
}

export enum AuditLanguage {
  ENGLISH = 'ENGLISH',
  FRENCH = 'FRENCH',
  PORTUGUESE = 'PORTUGUESE',
  ARABIC = 'ARABIC',
  LOCAL_LANGUAGE = 'LOCAL_LANGUAGE',
}

export enum AuditTeamSize {
  ONE_AUDITOR = 'ONE_AUDITOR',
  TWO_AUDITORS = 'TWO_AUDITORS',
  FLEXIBLE = 'FLEXIBLE',
}

export enum VolumeUnit {
  UNITS = 'UNITS',
  KG = 'KG',
  LITERS = 'LITERS',
  TONNES = 'TONNES',
  CONTAINERS = 'CONTAINERS',
  PALLETS = 'PALLETS',
  CUBIC_METERS = 'CUBIC_METERS',
  OTHER = 'OTHER',
}

export interface ProductCertificationApplication {
  id: string;
  applicationNumber?: string;
  operatorId: string;
  markRequested: MarkRequestedType[];
  arsoQualityMark: boolean;
  ecoMarkAfrica: boolean;
  markCombination?: MarkCombinationPreference;
  schemeType: CertificationSchemeType;
  schemeDescription?: string;
  applicationScope: ApplicationScope;
  certificationType: ProductCertificationType;
  estimatedVolume: number;
  volumeUnit: VolumeUnit;
  peakMonth?: number;
  priorityProcessing: PriorityProcessing;
  priorityReason?: string;
  expectedTimeline: ExpectedTimeline;
  status: ProductCertificationStatus;
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  certifiedAt?: string;
  certificateNumber?: string;
  products?: Product[];
  cbSelection?: ProductCertificationCbSelection;
  declaration?: ProductCertificationDeclaration;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id?: string;
  productName: string;
  productScientificName?: string;
  brandName: string;
  modelVariant: string;
  productCode?: string;
  hsCode: string;
  hsDescription?: string;
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
  technicalSpec?: ProductTechnicalSpec;
  environmentalClaim?: ProductEnvironmentalClaim;
}

export interface ProductTechnicalSpec {
  id?: string;
  applicableStandards: string[];
  mandatoryStandards: string[];
  voluntaryStandards?: string[];
  standardStatus?: Record<string, string>;
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

export interface ProductEnvironmentalClaim {
  id?: string;
  environmentalBenefits: EnvironmentalBenefit[];
  benefitQuantification?: Record<string, string>;
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

export interface ProductCertificationCbSelection {
  id?: string;
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

export interface ProductCertificationDeclaration {
  id?: string;
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
  submissionDate?: string;
  submissionTime?: string;
}

export interface CreateProductCertificationApplicationRequest {
  operatorId: string;
  markSelection: {
    markRequested: MarkRequestedType[];
    arsoQualityMark?: boolean;
    ecoMarkAfrica?: boolean;
    markCombination?: MarkCombinationPreference;
  };
  certificationScheme: {
    schemeType: CertificationSchemeType;
    applicationScope: ApplicationScope;
    certificationType: ProductCertificationType;
  };
  volumePriority: {
    estimatedVolume: number;
    volumeUnit: VolumeUnit;
    peakMonth?: number;
    priorityProcessing: PriorityProcessing;
    priorityReason?: string;
    expectedTimeline: ExpectedTimeline;
  };
  products: Product[];
  technicalSpecs?: ProductTechnicalSpec[];
  environmentalClaims?: ProductEnvironmentalClaim[];
  cbSelection: ProductCertificationCbSelection;
  declaration: ProductCertificationDeclaration;
}

export interface PagedProductCertificationResponse {
  data: ProductCertificationApplication[];
  total: number;
}

