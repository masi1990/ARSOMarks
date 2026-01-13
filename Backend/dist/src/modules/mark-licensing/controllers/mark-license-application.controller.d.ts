import { MarkLicenseApplicationService } from '../services/mark-license-application.service';
import { CreateMarkLicenseApplicationDto, UpdateMarkLicenseApplicationDto, SubmitMarkLicenseApplicationDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkLicenseApplicationController {
    private readonly applicationService;
    constructor(applicationService: MarkLicenseApplicationService);
    create(dto: CreateMarkLicenseApplicationDto, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    getById(id: string): Promise<import("../entities").MarkLicenseApplication>;
    update(id: string, dto: UpdateMarkLicenseApplicationDto, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    submit(id: string, dto: SubmitMarkLicenseApplicationDto, user: SystemUser): Promise<import("../entities").MarkLicenseApplication>;
    getApplications(nsbId: string, includeDrafts: string, user: SystemUser): Promise<import("../entities").MarkLicenseApplication[]>;
    delete(id: string, user: SystemUser): Promise<void>;
}
