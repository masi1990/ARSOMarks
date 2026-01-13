import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export enum ApplicationRegistrationDocumentType {
  TEST_REPORT = 'TEST_REPORT',
  QMS_CERTIFICATE = 'QMS_CERTIFICATE',
  OTHER_EVIDENCE = 'OTHER_EVIDENCE',
  PRODUCT_PHOTOGRAPH = 'PRODUCT_PHOTOGRAPH',
  LABEL_ARTWORK = 'LABEL_ARTWORK',
  DECLARATION_OF_CONFORMITY = 'DECLARATION_OF_CONFORMITY',
  PRODUCT_RECALL_PROCEDURE = 'PRODUCT_RECALL_PROCEDURE',
  COMPLAINTS_MANAGEMENT_PROCEDURE = 'COMPLAINTS_MANAGEMENT_PROCEDURE',
  COMPANY_REGISTRATION_CERTIFICATE = 'COMPANY_REGISTRATION_CERTIFICATE',
}

export class UploadApplicationDocumentDto {
  @IsEnum(ApplicationRegistrationDocumentType)
  documentType: ApplicationRegistrationDocumentType;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsString()
  @IsNotEmpty()
  fileHash: string;

  @IsString()
  @IsNotEmpty()
  fileSize: string; // As string to handle large numbers

  @IsString()
  @IsOptional()
  mimeType?: string;

  @IsUUID()
  @IsOptional()
  applicationRegistrationId?: string;
}

