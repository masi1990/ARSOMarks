import { PartialType } from '@nestjs/mapped-types';
import { CreateMarkLicenseApplicationDto } from './create-mark-license-application.dto';

export class UpdateMarkLicenseApplicationDto extends PartialType(
  CreateMarkLicenseApplicationDto,
) {
  // Can add additional update-specific validations if needed
}

