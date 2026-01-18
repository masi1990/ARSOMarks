import { SamplingStatus } from '../../../shared/enums';
import { CertificationAudit } from './certification-audit.entity';
import { TestResult } from './test-result.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class SamplingRecord {
    id: string;
    auditId: string;
    audit?: CertificationAudit;
    status: SamplingStatus;
    samplingMethod?: string;
    samplingLocation?: string;
    quantity?: number;
    quantityUnit?: string;
    traceability?: string;
    sampledAt?: string;
    createdBy?: string;
    createdByUser?: SystemUser;
    createdAt: Date;
    updatedAt: Date;
    testResults?: TestResult[];
}
