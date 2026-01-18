import { UserRole } from '../../../shared/enums';
import { RoleRequestType } from '../types/role-request.type';
export declare class CreateRoleRequestDto {
    requestedRoles: UserRole[];
    requestType?: RoleRequestType;
    note?: string;
}
