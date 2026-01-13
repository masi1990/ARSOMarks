import { Repository } from 'typeorm';
import { ApplicationRegistration } from '../entities';
import { CreateApplicationRegistrationDto, CreateApplicationRegistrationDraftDto, UpdateApplicationRegistrationDto } from '../dtos';
import { ApplicationRegistrationStatus } from '../../../shared/enums';
export declare class ApplicationRegistrationService {
    private readonly applicationRegistrationRepository;
    constructor(applicationRegistrationRepository: Repository<ApplicationRegistration>);
    private removeUndefinedValues;
    createDraft(dto: CreateApplicationRegistrationDraftDto, userId: string): Promise<ApplicationRegistration>;
    create(dto: CreateApplicationRegistrationDto, userId: string): Promise<ApplicationRegistration>;
    update(id: string, dto: UpdateApplicationRegistrationDto, userId: string): Promise<ApplicationRegistration>;
    submit(id: string, userId: string): Promise<ApplicationRegistration>;
    findById(id: string): Promise<ApplicationRegistration>;
    findByUserId(userId: string): Promise<ApplicationRegistration[]>;
    findAll(filters?: {
        status?: ApplicationRegistrationStatus;
        countryId?: string;
        skip?: number;
        limit?: number;
    }): Promise<{
        data: ApplicationRegistration[];
        total: number;
    }>;
    delete(id: string, userId: string): Promise<void>;
}
