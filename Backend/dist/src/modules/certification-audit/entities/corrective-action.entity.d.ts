import { CorrectiveActionStatus } from '../../../shared/enums';
import { CertificationAuditFinding } from './certification-audit-finding.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class CorrectiveAction {
    id: string;
    findingId: string;
    finding?: CertificationAuditFinding;
    actionPlan: string;
    evidenceNotes?: string;
    evidenceFiles?: Record<string, any>[];
    status: CorrectiveActionStatus;
    verifiedBy?: string;
    verifiedByUser?: SystemUser;
    verifiedAt?: Date;
    decisionNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}
