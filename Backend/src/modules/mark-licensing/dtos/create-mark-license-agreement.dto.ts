import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AgreementStatus } from '../../../shared/enums';

export class CreateMarkLicenseAgreementDto {
  @IsUUID()
  @IsNotEmpty()
  applicationId: string; // Reference to approved application

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  licenseStartDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  licenseEndDate: Date;

  @IsString()
  @IsOptional()
  licenseTermsDisplay?: string; // System-generated, can be overridden

  @IsObject()
  @IsOptional()
  royaltyFeeStructure?: Record<string, any>;

  @IsObject()
  @IsOptional()
  paymentSchedule?: Record<string, any>;

  @IsString()
  @IsOptional()
  usageRestrictions?: string;

  @IsString()
  @IsOptional()
  terminationClauses?: string;
}

export class SignAgreementDto {
  @IsUUID()
  @IsNotEmpty()
  agreementId: string;

  @IsString()
  @IsNotEmpty()
  nsbSignerName: string;

  @IsString()
  @IsNotEmpty()
  nsbSignerTitle: string;

  @IsEmail()
  @IsNotEmpty()
  nsbSignerEmail: string;

  @IsBoolean()
  @IsNotEmpty()
  nsbSignerConsent: boolean; // Electronic signature consent

  @IsString()
  @IsOptional()
  nsbSignatureImagePath?: string; // Optional scanned signature
}

export class RequestAssetsDto {
  @IsUUID()
  @IsNotEmpty()
  agreementId: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  requestedAssets: string[]; // ['VECTOR_AI', 'PNG', 'BRAND_GUIDELINES_PDF', etc.]

  @IsEnum({
    PORTAL_DOWNLOAD: 'PORTAL_DOWNLOAD',
    EMAIL_DELIVERY: 'EMAIL_DELIVERY',
    PHYSICAL_MEDIA: 'PHYSICAL_MEDIA',
    OTHER: 'OTHER',
  })
  @IsNotEmpty()
  assetDeliveryMethod: string;

  @IsString()
  @IsNotEmpty()
  assetRecipientName: string;

  @IsEmail()
  @IsNotEmpty()
  assetRecipientEmail: string;

  @IsBoolean()
  @IsNotEmpty()
  assetUseConfirmation: boolean;
}

