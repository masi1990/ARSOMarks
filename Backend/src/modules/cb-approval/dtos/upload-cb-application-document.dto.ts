import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CbDocumentType } from '../../../shared/enums';

export class UploadCbApplicationDocumentDto {
  @IsEnum(CbDocumentType)
  documentType: CbDocumentType;

  @IsOptional()
  @IsString()
  description?: string;
}
