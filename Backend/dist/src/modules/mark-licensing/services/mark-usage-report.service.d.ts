import { DataSource, Repository } from 'typeorm';
import { MarkLicenseUsageReport } from '../entities/mark-license-usage-report.entity';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import { CreateMarkUsageReportDto, UpdateMarkUsageReportDto } from '../dtos';
export declare class MarkUsageReportService {
    private readonly reportRepository;
    private readonly agreementRepository;
    private readonly dataSource;
    constructor(reportRepository: Repository<MarkLicenseUsageReport>, agreementRepository: Repository<MarkLicenseAgreement>, dataSource: DataSource);
    createReport(createDto: CreateMarkUsageReportDto, userId: string): Promise<MarkLicenseUsageReport>;
    updateReport(id: string, updateDto: UpdateMarkUsageReportDto, userId: string): Promise<MarkLicenseUsageReport>;
    submitReport(id: string, userId: string): Promise<MarkLicenseUsageReport>;
    private validateReportCompleteness;
    findById(id: string): Promise<MarkLicenseUsageReport>;
    getReportsByLicense(licenseId: string): Promise<MarkLicenseUsageReport[]>;
    private generateReportNumber;
}
