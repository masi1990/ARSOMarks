import { RoleRequestService } from '../services/role-request.service';
import { CreateRoleRequestDto, DecideRoleRequestDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class RoleRequestController {
    private readonly roleRequestService;
    constructor(roleRequestService: RoleRequestService);
    create(user: SystemUser, dto: CreateRoleRequestDto): Promise<import("../entities/role-request.entity").RoleRequest>;
    listMine(user: SystemUser): Promise<import("../entities/role-request.entity").RoleRequest[]>;
    listAll(): Promise<import("../entities/role-request.entity").RoleRequest[]>;
    decide(id: string, reviewer: SystemUser, dto: DecideRoleRequestDto): Promise<import("../entities/role-request.entity").RoleRequest>;
}
