import { IsOptional, IsString } from 'class-validator';

export class UploadMarkLicenseDocumentDto {
  @IsString()
  documentType: string;

  @IsString()
  fileName: string;

  @IsOptional()
  @IsString()
  filePath?: string;

  @IsOptional()
  @IsString()
  otherDocumentName?: string;
}
