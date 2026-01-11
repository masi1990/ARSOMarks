import { Repository } from 'typeorm';
import { SystemUser } from './system-user.entity';
import { UserRole } from '../../shared/enums';
import { AssignRolesDto } from './dtos/assign-roles.dto';
import { EmailService } from '../auth/services/email.service';
export declare class SystemUserService {
    private readonly userRepository;
    private readonly emailService;
    private readonly logger;
    constructor(userRepository: Repository<SystemUser>, emailService: EmailService);
    findAll(): Promise<SystemUser[]>;
    assignRoles(userId: string, dto: AssignRolesDto): Promise<SystemUser>;
    removeRoles(userId: string, rolesToRemove: UserRole[]): Promise<SystemUser>;
}
