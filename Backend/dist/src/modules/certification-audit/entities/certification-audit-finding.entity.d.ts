import { AuditFindingStatus, AuditFindingType } from '../../../shared/enums';
import { CertificationAudit } from './certification-audit.entity';
import { CorrectiveAction } from './corrective-action.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class CertificationAuditFinding {
    id: string;
    auditId: string;
    audit?: CertificationAudit;
    findingType: AuditFindingType;
    description: string;
    deadlineDate?: string;
    status: AuditFindingStatus;
    closedAt?: Date;
    createdBy?: string;
    createdByUser?: SystemUser;
    createdAt: Date;
    updatedAt: Date;
    correctiveActions?: CorrectiveAction[];
}
