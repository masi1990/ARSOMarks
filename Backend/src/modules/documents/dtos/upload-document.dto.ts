import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { DocumentType } from '../../../shared/enums';

export class UploadDocumentDto {
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  @IsOptional()
  documentCategory?: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsString()
  @IsNotEmpty()
  fileHash: string;

  @IsNumber()
  fileSize: number;

  @IsString()
  @IsOptional()
  mimeType?: string;

  @IsUUID()
  uploadedBy: string;
}

