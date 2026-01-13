import { MarkLicenseAgreementService } from '../services/mark-license-agreement.service';
import { MarkUsageReportService } from '../services/mark-usage-report.service';
import { MarkLicenseApplicationService } from '../services/mark-license-application.service';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkLicenseDashboardController {
    private readonly agreementService;
    private readonly reportService;
    private readonly applicationService;
    constructor(agreementService: MarkLicenseAgreementService, reportService: MarkUsageReportService, applicationService: MarkLicenseApplicationService);
    getOverview(nsbId: string, user: SystemUser): Promise<{
        activeLicenses: number;
        totalApplications: number;
        expiringSoon: number;
        licenses: {
            agreementId: string;
            licenseType: string;
            status: import("../../../shared/enums").AgreementStatus;
            startDate: Date;
            endDate: Date;
            daysUntilExpiry: number;
        }[];
        applications: {
            id: string;
            applicationNumber: string;
            status: import("../../../shared/enums").MarkLicenseStatus;
            createdAt: Date;
        }[];
        expiringAgreements: {
            agreementId: string;
            endDate: Date;
            daysUntilExpiry: number;
        }[];
    }>;
    getAnalytics(nsbId: string): Promise<{
        totalImpressions: number;
        mediaTypeBreakdown: Record<string, number>;
        markUsageRatio: Record<string, number>;
        totalReports: number;
        reportsByYear: Record<number, number>;
    }>;
    getCalendar(nsbId: string): Promise<{
        deadlines: any[];
    }>;
    private calculateDaysUntilExpiry;
    private calculateMediaTypeBreakdown;
    private calculateMarkUsageRatio;
    private groupReportsByYear;
    private calculateNextReportDate;
}
