import { Repository } from 'typeorm';
import { RoleRequest } from '../entities/role-request.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { CreateRoleRequestDto, DecideRoleRequestDto } from '../dtos';
import { EmailService } from './email.service';
export declare class RoleRequestService {
    private readonly roleRequestRepo;
    private readonly userRepo;
    private readonly emailService;
    constructor(roleRequestRepo: Repository<RoleRequest>, userRepo: Repository<SystemUser>, emailService: EmailService);
    create(user: SystemUser, dto: CreateRoleRequestDto): Promise<RoleRequest>;
    listMine(user: SystemUser): Promise<RoleRequest[]>;
    listAll(): Promise<RoleRequest[]>;
    decide(id: string, reviewer: SystemUser, dto: DecideRoleRequestDto): Promise<RoleRequest>;
}
