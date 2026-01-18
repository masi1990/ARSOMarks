import { Repository } from 'typeorm';
import { CbComplianceProfile } from '../entities/cb-compliance-profile.entity';
import { UpsertCbComplianceProfileDto } from '../dtos';
import { CbApplication } from '../../cb-approval/entities/cb-application.entity';
export declare class CbComplianceService {
    private readonly complianceRepository;
    private readonly cbApplicationRepository;
    constructor(complianceRepository: Repository<CbComplianceProfile>, cbApplicationRepository: Repository<CbApplication>);
    getProfile(cbApplicationId: string): Promise<CbComplianceProfile>;
    upsertProfile(cbApplicationId: string, dto: UpsertCbComplianceProfileDto): Promise<CbComplianceProfile>;
}
