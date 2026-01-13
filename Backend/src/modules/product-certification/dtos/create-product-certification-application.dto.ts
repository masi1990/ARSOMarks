import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  MarkRequestedType,
  MarkCombinationPreference,
  CertificationSchemeType,
  ApplicationScope,
  ProductCertificationType,
  PriorityProcessing,
  ExpectedTimeline,
  VolumeUnit,
  ProductCategory,
  TargetConsumerGroup,
  PackagingType,
  TechnicalDocsStatus,
  TestReportsAvailability,
  TraceabilityStatus,
  EnvironmentalBenefit,
  ThirdPartyVerificationStatus,
  LifecycleAssessmentType,
  LifecycleAspect,
  EnvironmentalManagementSystem,
  TakeBackProgramStatus,
  AuditLanguage,
  AuditTeamSize,
} from '../../../shared/enums';

// Section A1: Mark Selection
export class MarkSelectionDto {
  @IsArray()
  @IsEnum(MarkRequestedType, { each: true })
  markRequested: MarkRequestedType[];

  @IsBoolean()
  @IsOptional()
  arsoQualityMark?: boolean;

  @IsBoolean()
  @IsOptional()
  ecoMarkAfrica?: boolean;

  @IsEnum(MarkCombinationPreference)
  @IsOptional()
  markCombination?: MarkCombinationPreference;
}

// Section A2: Certification Scheme Details
export class CertificationSchemeDto {
  @IsEnum(CertificationSchemeType)
  schemeType: CertificationSchemeType;

  @IsEnum(ApplicationScope)
  applicationScope: ApplicationScope;

  @IsEnum(ProductCertificationType)
  certificationType: ProductCertificationType;
}

// Section A3: Volume & Priority
export class VolumePriorityDto {
  @IsNumber()
  @Min(0)
  estimatedVolume: number;

  @IsEnum(VolumeUnit)
  volumeUnit: VolumeUnit;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(12)
  peakMonth?: number;

  @IsEnum(PriorityProcessing)
  priorityProcessing: PriorityProcessing;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  priorityReason?: string;

  @IsEnum(ExpectedTimeline)
  expectedTimeline: ExpectedTimeline;
}

// Section B: Product Information (Array)
export class ProductDto {
  // B1: Basic Product Details
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  productName: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  productScientificName?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  brandName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  modelVariant: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  productCode?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  hsCode: string;

  @IsEnum(ProductCategory)
  productCategory: ProductCategory;

  // B2: Product Description & Use
  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  productDescription: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  intendedUse: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keyFeatures?: string[];

  @IsString()
  @IsOptional()
  @MaxLength(500)
  uniqueSellingPoint?: string;

  // B3: Target Market & Consumers
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  intendedMarkets?: string[];

  @IsUUID()
  @IsOptional()
  primaryTargetMarket?: string;

  @IsArray()
  @IsEnum(TargetConsumerGroup, { each: true })
  targetConsumers: TargetConsumerGroup[];

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  consumerWarnings?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  shelfLife?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  storageConditions?: string;

  // B4: Physical Specifications
  @IsString()
  @IsOptional()
  @MaxLength(50)
  unitWeight?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  dimensions?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  color?: string[];

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  materialComposition?: string;

  @IsEnum(PackagingType)
  packagingType: PackagingType;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  packagingMaterial: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  packagingWeight?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  unitsPerPackage?: number;

  @IsInt()
  @IsOptional()
  displayOrder?: number;
}

// Section C: Technical Specifications
export class TechnicalSpecDto {
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  applicableStandards: string[];

  @IsArray()
  @IsString({ each: true })
  mandatoryStandards: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  voluntaryStandards?: string[];

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  regulatoryBody: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  regulatoryApproval?: string;

  @IsEnum(TechnicalDocsStatus)
  technicalDocsAvailable: TechnicalDocsStatus;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  missingDocuments?: string;

  @IsEnum(TestReportsAvailability)
  testReportsAvailable: TestReportsAvailability;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  testCoverage?: number;

  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  manufacturingProcess: string;

  @IsBoolean()
  processFlowDiagram: boolean;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  keyComponents: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  criticalComponents: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  componentSources: string;

  @IsEnum(['YES', 'PARTIAL', 'NO'])
  @IsOptional()
  supplierListAvailable?: string;

  @IsEnum(TraceabilityStatus)
  traceabilitySystem: TraceabilityStatus;

  @IsEnum(TraceabilityStatus)
  batchTraceability: TraceabilityStatus;
}

// Section D: Environmental Claims (EMA Only - Conditional)
export class EnvironmentalClaimDto {
  @IsArray()
  @IsEnum(EnvironmentalBenefit, { each: true })
  environmentalBenefits: EnvironmentalBenefit[];

  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  ecoClaimsSupporting: string;

  @IsEnum(ThirdPartyVerificationStatus)
  thirdPartyVerification: ThirdPartyVerificationStatus;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  verifierName?: string;

  @IsArray()
  @IsEnum(LifecycleAspect, { each: true })
  lifecycleAspects: LifecycleAspect[];

  @IsEnum(LifecycleAssessmentType)
  lifecycleAssessment: LifecycleAssessmentType;

  @IsBoolean()
  carbonFootprint: boolean;

  @IsNumber()
  @IsOptional()
  @Min(0)
  carbonValue?: number;

  @IsEnum(EnvironmentalManagementSystem)
  environmentalManagement: EnvironmentalManagementSystem;

  @IsBoolean()
  environmentalPolicy: boolean;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  wasteManagement: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  recyclingInfo: string;

  @IsEnum(TakeBackProgramStatus)
  takeBackProgram: TakeBackProgramStatus;
}

// Section E: Certification Body Selection
export class CbSelectionDto {
  @IsUUID()
  @IsOptional()
  preferredCb?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  cbSelectionReason: string;

  @IsBoolean()
  previousCb: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  previousCbName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  previousCertificateNumber?: string;

  @IsEnum(AuditLanguage)
  auditLanguage: AuditLanguage;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  auditTiming: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  peakPeriods: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  specialRequirements?: string;

  @IsEnum(AuditTeamSize)
  auditTeamSize: AuditTeamSize;
}

// Section F: Declarations & Fees
export class DeclarationDto {
  // F1: Applicant Declarations
  @IsBoolean()
  truthDeclaration: boolean;

  @IsBoolean()
  complianceCommitment: boolean;

  @IsBoolean()
  surveillanceAcceptance: boolean;

  @IsBoolean()
  correctiveActionCommitment: boolean;

  @IsBoolean()
  marketSurveillanceAcceptance: boolean;

  @IsBoolean()
  markUsageCommitment: boolean;

  // F2: Fee Acceptance
  @IsBoolean()
  feesAcceptance: boolean;

  @IsBoolean()
  feeBreakdownAcknowledged: boolean;

  @IsBoolean()
  paymentTermsAccepted: boolean;

  @IsBoolean()
  additionalCostsUnderstood: boolean;

  // F3: Final Submission
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  applicantName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  applicantPosition: string;

  @IsString()
  @IsOptional()
  applicantSignature?: string;
}

// Main DTO for creating product certification application
export class CreateProductCertificationApplicationDto {
  @IsUUID()
  operatorId: string;

  // Section A: Application Type Selection
  @ValidateNested()
  @Type(() => MarkSelectionDto)
  markSelection: MarkSelectionDto;

  @ValidateNested()
  @Type(() => CertificationSchemeDto)
  certificationScheme: CertificationSchemeDto;

  @ValidateNested()
  @Type(() => VolumePriorityDto)
  volumePriority: VolumePriorityDto;

  // Section B: Product Information (Array)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  // Section C: Technical Specifications (per product - will be in ProductDto or separate)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalSpecDto)
  @IsOptional()
  technicalSpecs?: TechnicalSpecDto[]; // Optional, can be added per product

  // Section D: Environmental Claims (Conditional - EMA only)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnvironmentalClaimDto)
  @IsOptional()
  environmentalClaims?: EnvironmentalClaimDto[]; // Optional, only if EMA mark requested

  // Section E: Certification Body Selection
  @ValidateNested()
  @Type(() => CbSelectionDto)
  cbSelection: CbSelectionDto;

  // Section F: Declarations & Fees
  @ValidateNested()
  @Type(() => DeclarationDto)
  declaration: DeclarationDto;
}

