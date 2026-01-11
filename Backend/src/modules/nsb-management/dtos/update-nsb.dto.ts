import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateNsbDto } from './create-nsb.dto';

class UpdateNsbProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  websiteUrl?: string;

  @IsObject()
  @IsOptional()
  socialMediaHandles?: Record<string, string>;

  @IsNumber()
  @IsOptional()
  totalStaff?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keyDepartments?: string[];

  @IsString()
  @IsOptional()
  @MaxLength(500)
  nationalStandardsActLink?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  nationalConformityAssessmentPolicyLink?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  nationalQualityPolicyLink?: string;
}

export class UpdateNsbDto extends IntersectionType(PartialType(CreateNsbDto), UpdateNsbProfileDto) {}

