import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ModificationStatus } from '../../../shared/enums';

export class CreateLicenseModificationDto {
  @IsUUID()
  @IsNotEmpty()
  originalLicenseId: string; // Reference to mark_license_agreements

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  modificationTypes: string[]; // ['EXTEND_DURATION', 'CHANGE_SCOPE', 'ADD_NEW_MARKS', etc.]

  @IsString()
  @IsNotEmpty()
  modificationReason: string;

  @IsString()
  @IsNotEmpty()
  proposedChanges: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  effectiveDateRequest: Date;

  @IsString()
  @IsOptional()
  supportingJustificationPath?: string; // File path for business case document

  @IsString()
  @IsOptional()
  impactAssessment?: string;

  @IsEnum({
    YES: 'YES',
    NO: 'NO',
    TO_BE_DETERMINED: 'TO_BE_DETERMINED',
  })
  @IsNotEmpty()
  feeAdjustmentNeeded: string;
}

export class ApproveModificationDto {
  @IsUUID()
  @IsNotEmpty()
  modificationId: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsObject()
  @IsOptional()
  implementedChanges?: Record<string, any>; // What was actually changed
}

export class RejectModificationDto {
  @IsUUID()
  @IsNotEmpty()
  modificationId: string;

  @IsString()
  @IsNotEmpty()
  rejectionReason: string;
}

