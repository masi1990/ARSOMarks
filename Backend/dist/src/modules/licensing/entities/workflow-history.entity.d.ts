import { LicenseApplication } from './license-application.entity';
import { ApplicationStatus } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class WorkflowHistory {
    id: string;
    applicationId: string;
    application: LicenseApplication;
    fromStatus?: ApplicationStatus;
    toStatus: ApplicationStatus;
    actionPerformed: string;
    performedBy: string;
    performedByUser?: SystemUser;
    performedAt: Date;
    notes?: string;
    metadata?: Record<string, any>;
}
