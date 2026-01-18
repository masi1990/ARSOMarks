import { RoleRequestStatus, UserRole } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class RoleRequest {
    id: string;
    user: SystemUser;
    userId: string;
    requestedRoles: UserRole[];
    status: RoleRequestStatus;
    requestType?: import('../types/role-request.type').RoleRequestType;
    decisionNote?: string | null;
    reviewedBy?: string | null;
    reviewedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
