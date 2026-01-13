import {
  IsEmail,
  IsInt,
  IsNotEmpty,
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
import { TransformEmptyToUndefined } from '../../../shared/decorators/transform-empty-to-undefined.decorator';
import {
  ProductCertificationDto,
  ManufacturerInfoDto,
  ConformityEvidenceDto,
  PostCertificationDto,
  CbSelectionDto,
} from './product-certification.dto';

export class CreateApplicationRegistrationDto {
  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Applicant name is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  applicantName: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Applicant type is required' })
  @IsString()
  @MaxLength(50)
  applicantType: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Registration number is required' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  registrationNumber: string;

  @TransformEmptyToUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  taxId?: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Contact person is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  contactPerson: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Contact email is required' })
  @IsEmail()
  @MaxLength(150)
  contactEmail: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Contact phone is required' })
  @IsString()
  @MaxLength(20)
  contactPhone: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Physical address is required' })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  physicalAddress: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Region/State is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  regionState: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Postal code is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  postalCode: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Country is required' })
  @IsUUID()
  countryId: string;

  @TransformEmptyToUndefined()
  @IsNotEmpty({ message: 'Business activity is required' })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  businessActivity: string;

  @IsInt()
  @IsOptional()
  @Min(1900)
  @Max(new Date().getFullYear())
  yearEstablished?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  employeeCount?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  annualRevenue?: number;

  // Part B: Product & Certification Details (with validation)
  @Type(() => ProductCertificationDto)
  @ValidateNested()
  @IsOptional()
  productCertification?: ProductCertificationDto;

  @Type(() => ManufacturerInfoDto)
  @ValidateNested()
  @IsOptional()
  manufacturerInfo?: ManufacturerInfoDto;

  @Type(() => ConformityEvidenceDto)
  @ValidateNested()
  @IsOptional()
  conformityEvidence?: ConformityEvidenceDto;

  @Type(() => PostCertificationDto)
  @ValidateNested()
  @IsOptional()
  postCertification?: PostCertificationDto;

  @Type(() => CbSelectionDto)
  @ValidateNested()
  @IsOptional()
  cbSelection?: CbSelectionDto;

  userId?: string;
}

