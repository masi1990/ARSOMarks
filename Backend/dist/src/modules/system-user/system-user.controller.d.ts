import { SystemUserService } from './system-user.service';
import { UserRole } from '../../shared/enums';
import { AssignRolesDto } from './dtos/assign-roles.dto';
export declare class SystemUserController {
    private readonly systemUserService;
    constructor(systemUserService: SystemUserService);
    findAll(): Promise<import("./system-user.entity").SystemUser[]>;
    assignRoles(id: string, dto: AssignRolesDto): Promise<import("./system-user.entity").SystemUser>;
    removeRoles(id: string, dto: {
        roles: UserRole[];
    }): Promise<import("./system-user.entity").SystemUser>;
}
