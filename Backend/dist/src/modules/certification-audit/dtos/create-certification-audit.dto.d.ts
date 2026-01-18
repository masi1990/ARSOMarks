import { CertificationAuditType } from '../../../shared/enums';
export declare class CreateCertificationAuditDto {
    applicationId: string;
    auditType: CertificationAuditType;
    plannedDate?: string;
    actualDate?: string;
    windowStart?: string;
    windowEnd?: string;
    isUnannounced?: boolean;
    notes?: string;
}
