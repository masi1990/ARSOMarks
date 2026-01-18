import { OperatorService } from '../services/operator.service';
import { UpdateOperatorRegistrationDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class OperatorController {
    private readonly operatorService;
    constructor(operatorService: OperatorService);
    create(dto: any, user: SystemUser): Promise<import("../entities").Operator>;
    getMyOperator(user: SystemUser): Promise<import("../entities").Operator>;
    list(query: any, user: SystemUser): Promise<{
        data: import("../entities").Operator[];
        total: number;
    }>;
    getById(id: string, user: SystemUser): Promise<import("../entities").Operator>;
    update(id: string, dto: UpdateOperatorRegistrationDto, user: SystemUser): Promise<import("../entities").Operator>;
    submit(id: string, user: SystemUser): Promise<import("../entities").Operator>;
    delete(id: string, user: SystemUser): Promise<{
        message: string;
    }>;
}
