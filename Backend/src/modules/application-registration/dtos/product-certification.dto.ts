import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TransformEmptyToUndefined } from '../../../shared/decorators/transform-empty-to-undefined.decorator';

// Part B: Section 2 - Product & Certification Details (with validation)
export class ProductCertificationDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Mark applied for is required' })
  @IsString()
  markAppliedFor: string; // 'ARSO_QUALITY_MARK' | 'ECO_MARK_AFRICA'

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'ACAP scheme is required' })
  @IsString()
  acapScheme: string; // ACAP scheme code

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Product brand name is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  productBrandName: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Product model/type number is required' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  productModelTypeNumber: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'At least one applicable ARSO standard is required' })
  @IsArray()
  @IsString({ each: true })
  applicableArsoStandards: string[];

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Scope of certification is required' })
  @IsString()
  @MinLength(20)
  @MaxLength(2000)
  scopeOfCertification: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Expected annual certified volume is required' })
  @IsString()
  @MaxLength(50)
  expectedAnnualCertifiedVolume: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  expectedAnnualCertifiedVolumeUnit?: string; // 'tons', 'kg', 'units'

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'At least one target market is required' })
  @IsArray()
  @IsString({ each: true })
  targetMarkets: string[];
}

// Part B: Section 3 - Production & Manufacturer Information
export class ManufacturerInfoDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: "Manufacturer's legal name is required" })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  manufacturerLegalName: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: "Manufacturer's address is required" })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  manufacturerAddress: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: "Manufacturer's country is required" })
  @IsUUID()
  manufacturerCountryId: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Production site GPS coordinates are required' })
  @IsString()
  @MaxLength(100)
  productionSiteGpsCoordinates: string; // Format: "lat,long" or "lat;long"

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Type of production is required' })
  @IsString()
  @MaxLength(100)
  typeOfProduction: string;
}

// Part B: Section 4 - Conformity Evidence & Document Validation
export class ConformityEvidenceDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Test report is required' })
  @IsUUID()
  testReportFileId: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Test report issuing body is required' })
  @IsString()
  @MaxLength(200)
  testReportIssuingBody: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Test report certificate number is required' })
  @IsString()
  @MaxLength(100)
  testReportCertificateNo: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsUUID()
  qmsCertificateFileId?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  qmsCertificateIssuingBody?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  qmsCertificateNo?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsUUID()
  otherEvidenceFileId?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  otherEvidenceIssuingBody?: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  otherEvidenceCertificateNo?: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Product photographs are required' })
  @IsArray()
  @IsString({ each: true })
  productPhotographsFileIds: string[];

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Label artwork is required' })
  @IsUUID()
  labelArtworkFileId: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Declaration of conformity is required' })
  @IsUUID()
  declarationOfConformityFileId: string;
}

// Part B: Section 5 - Post-Certification Commitments & Systems
export class PostCertificationDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Product recall procedure is required' })
  @IsUUID()
  productRecallProcedureFileId: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Complaints management procedure is required' })
  @IsUUID()
  complaintsManagementProcedureFileId: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Agreement to surveillance is required' })
  @IsBoolean()
  agreementToSurveillance: boolean;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Traceability undertaking is required' })
  @IsBoolean()
  traceabilityUndertaking: boolean;
}

// Part B: Section 6 - Certification Body Selection & Declaration
export class CbSelectionDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Certification body selection is required' })
  @IsUUID()
  selectedCertificationBodyId: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Final declaration signature is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  finalDeclarationSignature: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Final declaration date is required' })
  @IsString()
  finalDeclarationDate: string; // ISO date string
}

