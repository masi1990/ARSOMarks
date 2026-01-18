import { MarkMisuseStatus } from '../../../shared/enums';
import { MarkLicenseAgreement } from './mark-license-agreement.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { MarkSanction } from './mark-sanction.entity';
export declare class MarkMisuseIncident {
    id: string;
    licenseId?: string;
    license?: MarkLicenseAgreement;
    description: string;
    evidenceFiles?: Record<string, any>[];
    status: MarkMisuseStatus;
    reportedBy?: string;
    reportedByUser?: SystemUser;
    reviewedBy?: string;
    reviewedByUser?: SystemUser;
    decisionNotes?: string;
    reportedAt: Date;
    updatedAt: Date;
    sanctions?: MarkSanction[];
}
