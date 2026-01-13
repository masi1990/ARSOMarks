import { MarkUsageReportService } from '../services/mark-usage-report.service';
import { CreateMarkUsageReportDto, UpdateMarkUsageReportDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkUsageReportController {
    private readonly reportService;
    constructor(reportService: MarkUsageReportService);
    create(dto: CreateMarkUsageReportDto, user: SystemUser): Promise<import("../entities").MarkLicenseUsageReport>;
    getById(id: string): Promise<import("../entities").MarkLicenseUsageReport>;
    update(id: string, dto: UpdateMarkUsageReportDto, user: SystemUser): Promise<import("../entities").MarkLicenseUsageReport>;
    submit(id: string, user: SystemUser): Promise<import("../entities").MarkLicenseUsageReport>;
    getReportsByLicense(licenseId: string): Promise<import("../entities").MarkLicenseUsageReport[]>;
}
