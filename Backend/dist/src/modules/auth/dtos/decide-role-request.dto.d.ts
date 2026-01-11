import { RoleRequestStatus } from '../../../shared/enums';
export declare class DecideRoleRequestDto {
    status: RoleRequestStatus.APPROVED | RoleRequestStatus.REJECTED;
    note?: string;
}
