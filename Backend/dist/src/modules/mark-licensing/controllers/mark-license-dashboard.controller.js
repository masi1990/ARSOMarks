"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkLicenseDashboardController = void 0;
const common_1 = require("@nestjs/common");
const mark_license_agreement_service_1 = require("../services/mark-license-agreement.service");
const mark_usage_report_service_1 = require("../services/mark-usage-report.service");
const mark_license_application_service_1 = require("../services/mark-license-application.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkLicenseDashboardController = class MarkLicenseDashboardController {
    constructor(agreementService, reportService, applicationService) {
        this.agreementService = agreementService;
        this.reportService = reportService;
        this.applicationService = applicationService;
    }
    async getOverview(nsbId, user) {
        if (!nsbId) {
            throw new Error('nsbId parameter is required');
        }
        const [activeAgreements, applications, expiringAgreements] = await Promise.all([
            this.agreementService.getActiveAgreementsByNsb(nsbId),
            this.applicationService.getApplicationsByNsb(nsbId, true),
            this.agreementService.checkExpiringAgreements(30),
        ]);
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
    async getAnalytics(nsbId) {
        if (!nsbId) {
            throw new Error('nsbId parameter is required');
        }
        const activeAgreements = await this.agreementService.getActiveAgreementsByNsb(nsbId);
        const allReports = await Promise.all(activeAgreements.map((ag) => this.reportService.getReportsByLicense(ag.id)));
        const reports = allReports.flat();
        const totalImpressions = reports.reduce((sum, report) => {
            const promotional = report.promotionalUsageMetrics || [];
            const impressions = promotional.reduce((s, m) => {
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
    async getCalendar(nsbId) {
        if (!nsbId) {
            throw new Error('nsbId parameter is required');
        }
        const activeAgreements = await this.agreementService.getActiveAgreementsByNsb(nsbId);
        const expiringAgreements = await this.agreementService.checkExpiringAgreements(60);
        const deadlines = [];
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
    calculateDaysUntilExpiry(endDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiry = new Date(endDate);
        expiry.setHours(0, 0, 0, 0);
        const diffTime = expiry.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    calculateMediaTypeBreakdown(reports) {
        const breakdown = {};
        reports.forEach((report) => {
            const promotional = report.promotionalUsageMetrics || [];
            promotional.forEach((metric) => {
                const mediaType = metric.mediaTypeReported || 'OTHER';
                breakdown[mediaType] = (breakdown[mediaType] || 0) + 1;
            });
        });
        return breakdown;
    }
    calculateMarkUsageRatio(reports) {
        const ratio = { ARSO: 0, EMA: 0, BOTH: 0 };
        reports.forEach((report) => {
            const promotional = report.promotionalUsageMetrics || [];
            promotional.forEach((metric) => {
                const markUsed = metric.markUsed || 'ARSO';
                ratio[markUsed] = (ratio[markUsed] || 0) + 1;
            });
        });
        return ratio;
    }
    groupReportsByYear(reports) {
        const grouped = {};
        reports.forEach((report) => {
            const year = report.reportYear || new Date().getFullYear();
            grouped[year] = (grouped[year] || 0) + 1;
        });
        return grouped;
    }
    calculateNextReportDate(startDate) {
        const nextDate = new Date(startDate);
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        return nextDate;
    }
};
exports.MarkLicenseDashboardController = MarkLicenseDashboardController;
__decorate([
    (0, common_1.Get)('overview'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('nsbId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], MarkLicenseDashboardController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('analytics'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('nsbId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarkLicenseDashboardController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('calendar'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('nsbId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarkLicenseDashboardController.prototype, "getCalendar", null);
exports.MarkLicenseDashboardController = MarkLicenseDashboardController = __decorate([
    (0, common_1.Controller)('mark-licenses/dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [mark_license_agreement_service_1.MarkLicenseAgreementService,
        mark_usage_report_service_1.MarkUsageReportService,
        mark_license_application_service_1.MarkLicenseApplicationService])
], MarkLicenseDashboardController);
//# sourceMappingURL=mark-license-dashboard.controller.js.map