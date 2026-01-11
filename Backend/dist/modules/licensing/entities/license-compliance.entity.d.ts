import { License } from './license.entity';
import { ComplianceStatus, ComplianceType } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class LicenseCompliance {
    id: string;
    licenseId: string;
    license: License;
    complianceType: ComplianceType;
    scheduledDate: string;
    actualDate?: string;
    status: ComplianceStatus;
    findings?: string;
    correctiveActions?: string;
    nextDueDate?: string;
    conductedBy?: string;
    conductedByUser?: SystemUser;
    reportUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
