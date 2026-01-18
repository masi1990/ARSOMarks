import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificationAuditDto } from './create-certification-audit.dto';

export class UpdateCertificationAuditDto extends PartialType(CreateCertificationAuditDto) {}
