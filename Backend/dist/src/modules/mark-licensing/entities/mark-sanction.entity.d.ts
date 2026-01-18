import { MarkSanctionStatus, MarkSanctionType } from '../../../shared/enums';
import { MarkMisuseIncident } from './mark-misuse-incident.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkSanction {
    id: string;
    incidentId: string;
    incident?: MarkMisuseIncident;
    sanctionType: MarkSanctionType;
    status: MarkSanctionStatus;
    startDate?: string;
    endDate?: string;
    notes?: string;
    createdBy?: string;
    createdByUser?: SystemUser;
    createdAt: Date;
    updatedAt: Date;
}
