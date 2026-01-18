import { CbComplianceService } from '../services/cb-compliance.service';
import { UpsertCbComplianceProfileDto } from '../dtos';
export declare class CbComplianceController {
    private readonly complianceService;
    constructor(complianceService: CbComplianceService);
    getProfile(cbApplicationId: string): Promise<import("../entities/cb-compliance-profile.entity").CbComplianceProfile>;
    upsertProfile(cbApplicationId: string, dto: UpsertCbComplianceProfileDto): Promise<import("../entities/cb-compliance-profile.entity").CbComplianceProfile>;
}
