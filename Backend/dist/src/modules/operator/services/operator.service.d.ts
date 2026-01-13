import { DataSource, Repository } from 'typeorm';
import { Operator, OperatorContact, OperatorLocation, OperatorBusinessSector, OperatorMarket, OperatorProductionCapacity, OperatorPreference, OperatorAccessibility, OperatorConsent } from '../entities';
import { CreateOperatorRegistrationDto, CreateOperatorRegistrationDraftDto, UpdateOperatorRegistrationDto } from '../dtos';
import { OperatorStatus } from '../../../shared/enums';
export declare class OperatorService {
    private readonly operatorRepository;
    private readonly contactRepository;
    private readonly locationRepository;
    private readonly businessSectorRepository;
    private readonly marketRepository;
    private readonly productionCapacityRepository;
    private readonly preferenceRepository;
    private readonly accessibilityRepository;
    private readonly consentRepository;
    private readonly dataSource;
    constructor(operatorRepository: Repository<Operator>, contactRepository: Repository<OperatorContact>, locationRepository: Repository<OperatorLocation>, businessSectorRepository: Repository<OperatorBusinessSector>, marketRepository: Repository<OperatorMarket>, productionCapacityRepository: Repository<OperatorProductionCapacity>, preferenceRepository: Repository<OperatorPreference>, accessibilityRepository: Repository<OperatorAccessibility>, consentRepository: Repository<OperatorConsent>, dataSource: DataSource);
    createOperatorRegistration(dto: CreateOperatorRegistrationDto | CreateOperatorRegistrationDraftDto, userId: string): Promise<Operator>;
    updateOperatorRegistration(id: string, dto: UpdateOperatorRegistrationDto, userId: string): Promise<Operator>;
    submitOperatorRegistration(id: string, userId: string): Promise<Operator>;
    findById(id: string): Promise<Operator>;
    findByUserId(userId: string): Promise<Operator | null>;
    findAll(filters?: {
        status?: OperatorStatus;
        countryId?: string;
        skip?: number;
        limit?: number;
    }): Promise<{
        data: Operator[];
        total: number;
    }>;
    deleteOperator(id: string, userId: string): Promise<void>;
}
