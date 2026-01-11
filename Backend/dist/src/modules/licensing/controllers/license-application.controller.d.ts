import { LicenseApplicationService } from '../services/license-application.service';
import { CreateLicenseApplicationDto, SubmitApplicationDto } from '../dtos';
export declare class LicenseApplicationController {
    private readonly licenseService;
    constructor(licenseService: LicenseApplicationService);
    createDraft(dto: CreateLicenseApplicationDto): Promise<import("../entities/license-application.entity").LicenseApplication>;
    updateDraft(id: string, dto: CreateLicenseApplicationDto): Promise<import("../entities/license-application.entity").LicenseApplication>;
    submit(id: string, dto: SubmitApplicationDto): Promise<import("../entities/license-application.entity").LicenseApplication>;
    getById(id: string): Promise<import("../entities/license-application.entity").LicenseApplication>;
    getByNsb(nsbId: string, includeDrafts?: string): Promise<import("../entities/license-application.entity").LicenseApplication[]>;
}
