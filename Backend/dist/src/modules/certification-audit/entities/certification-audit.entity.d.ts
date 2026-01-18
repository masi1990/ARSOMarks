import { CertificationAuditType, ComplianceStatus } from '../../../shared/enums';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { CertificationAuditFinding } from './certification-audit-finding.entity';
import { SamplingRecord } from './sampling-record.entity';
export declare class CertificationAudit {
    id: string;
    applicationId: string;
    application?: ProductCertificationApplication;
    auditType: CertificationAuditType;
    status: ComplianceStatus;
    plannedDate?: string;
    actualDate?: string;
    windowStart?: string;
    windowEnd?: string;
    isUnannounced: boolean;
    notes?: string;
    createdBy?: string;
    createdByUser?: SystemUser;
    updatedBy?: string;
    updatedByUser?: SystemUser;
    createdAt: Date;
    updatedAt: Date;
    findings?: CertificationAuditFinding[];
    samplingRecords?: SamplingRecord[];
}
