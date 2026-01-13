import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SubmitMarkLicenseApplicationDto {
  @IsString()
  @IsOptional()
  notes?: string; // Optional submission notes

  @IsBoolean()
  @IsOptional()
  confirmSubmission?: boolean = true; // Confirmation flag
}

