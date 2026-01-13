import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MarkLicenseAgreementService } from '../services/mark-license-agreement.service';
import { MarkUsageReportService } from '../services/mark-usage-report.service';
import { MarkLicenseApplicationService } from '../services/mark-license-application.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';

@Controller('mark-licenses/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarkLicenseDashboardController {
  constructor(
    private readonly agreementService: MarkLicenseAgreementService,
    private readonly reportService: MarkUsageReportService,
    private readonly applicationService: MarkLicenseApplicationService,
  ) {}

  /**
   * Get dashboard overview (NSB-004-DASH)
   * GET /api/mark-licenses/dashboard/overview?nsbId=xxx
   */
  @Get('overview')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  async getOverview(@Query('nsbId') nsbId: string, @CurrentUser() user: SystemUser) {
    if (!nsbId) {
      throw new Error('nsbId parameter is required');
    }

    const [activeAgreements, applications, expiringAgreements] = await Promise.all([
      this.agreementService.getActiveAgreementsByNsb(nsbId),
      this.applicationService.getApplicationsByNsb(nsbId, true),
      this.agreementService.checkExpiringAgreements(30),
    ]);

    // Filter expiring agreements for this NSB
    const nsbExpiringAgreements = expiringAgreements.filter((ag) => ag.nsbId === nsbId);

    return {
      activeLicenses: activeAgreements.length,
      totalApplications: applications.length,
      expiringSoon: nsbExpiringAgreements.length,
      licenses: activeAgreements.map((ag) => ({
        agreementId: ag.agreementId,
        licenseType: ag.licenseTypeDisplay,
        status: ag.agreementStatus,
        startDate: ag.licenseStartDate,
        endDate: ag.licenseEndDate,
        daysUntilExpiry: this.calculateDaysUntilExpiry(ag.licenseEndDate),
      })),
      applications: applications.map((app) => ({
        id: app.id,
        applicationNumber: app.applicationNumber,
        status: app.status,
        createdAt: app.createdAt,
      })),
      expiringAgreements: nsbExpiringAgreements.map((ag) => ({
        agreementId: ag.agreementId,
        endDate: ag.licenseEndDate,
        daysUntilExpiry: this.calculateDaysUntilExpiry(ag.licenseEndDate),
      })),
    };
  }

  /**
   * Get usage analytics
   * GET /api/mark-licenses/dashboard/analytics?nsbId=xxx
   */
  @Get('analytics')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  async getAnalytics(@Query('nsbId') nsbId: string) {
    if (!nsbId) {
      throw new Error('nsbId parameter is required');
    }

    const activeAgreements = await this.agreementService.getActiveAgreementsByNsb(nsbId);

    // Get all reports for active agreements
    const allReports = await Promise.all(
      activeAgreements.map((ag) => this.reportService.getReportsByLicense(ag.id)),
    );

    const reports = allReports.flat();

    // Calculate analytics
    const totalImpressions = reports.reduce((sum, report) => {
      const promotional = report.promotionalUsageMetrics || [];
      const impressions = promotional.reduce((s: number, m: any) => {
        return s + (parseInt(m.impressions || '0', 10) || 0);
      }, 0);
      return sum + impressions;
    }, 0);

    const mediaTypeBreakdown = this.calculateMediaTypeBreakdown(reports);
    const markUsageRatio = this.calculateMarkUsageRatio(reports);

    return {
      totalImpressions,
      mediaTypeBreakdown,
      markUsageRatio,
      totalReports: reports.length,
      reportsByYear: this.groupReportsByYear(reports),
    };
  }

  /**
   * Get compliance calendar
   * GET /api/mark-licenses/dashboard/calendar?nsbId=xxx
   */
  @Get('calendar')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  async getCalendar(@Query('nsbId') nsbId: string) {
    if (!nsbId) {
      throw new Error('nsbId parameter is required');
    }

    const activeAgreements = await this.agreementService.getActiveAgreementsByNsb(nsbId);
    const expiringAgreements = await this.agreementService.checkExpiringAgreements(60);

    const deadlines = [];

    // Add license renewal deadlines
    expiringAgreements
      .filter((ag) => ag.nsbId === nsbId)
      .forEach((ag) => {
        deadlines.push({
          type: 'LICENSE_RENEWAL',
          dueDate: ag.licenseEndDate,
          description: `License ${ag.agreementId} expires`,
          status: this.calculateDaysUntilExpiry(ag.licenseEndDate) <= 30 ? 'URGENT' : 'PENDING',
        });
      });

    // Add annual report deadlines (would need to calculate based on license start dates)
    activeAgreements.forEach((ag) => {
      const nextReportDate = this.calculateNextReportDate(ag.licenseStartDate);
      deadlines.push({
        type: 'ANNUAL_REPORT',
        dueDate: nextReportDate,
        description: `Annual usage report for ${ag.agreementId}`,
        status: this.calculateDaysUntilExpiry(nextReportDate) <= 30 ? 'URGENT' : 'PENDING',
      });
    });

    return {
      deadlines: deadlines.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()),
    };
  }

  // Helper methods
  private calculateDaysUntilExpiry(endDate: Date): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(endDate);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private calculateMediaTypeBreakdown(reports: any[]): Record<string, number> {
    const breakdown: Record<string, number> = {};
    reports.forEach((report) => {
      const promotional = report.promotionalUsageMetrics || [];
      promotional.forEach((metric: any) => {
        const mediaType = metric.mediaTypeReported || 'OTHER';
        breakdown[mediaType] = (breakdown[mediaType] || 0) + 1;
      });
    });
    return breakdown;
  }

  private calculateMarkUsageRatio(reports: any[]): Record<string, number> {
    const ratio: Record<string, number> = { ARSO: 0, EMA: 0, BOTH: 0 };
    reports.forEach((report) => {
      const promotional = report.promotionalUsageMetrics || [];
      promotional.forEach((metric: any) => {
        const markUsed = metric.markUsed || 'ARSO';
        ratio[markUsed] = (ratio[markUsed] || 0) + 1;
      });
    });
    return ratio;
  }

  private groupReportsByYear(reports: any[]): Record<number, number> {
    const grouped: Record<number, number> = {};
    reports.forEach((report) => {
      const year = report.reportYear || new Date().getFullYear();
      grouped[year] = (grouped[year] || 0) + 1;
    });
    return grouped;
  }

  private calculateNextReportDate(startDate: Date): Date {
    const nextDate = new Date(startDate);
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    return nextDate;
  }
}

