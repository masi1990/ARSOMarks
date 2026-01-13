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
exports.MarkUsageReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mark_license_usage_report_entity_1 = require("../entities/mark-license-usage-report.entity");
const mark_license_agreement_entity_1 = require("../entities/mark-license-agreement.entity");
const enums_1 = require("../../../shared/enums");
let MarkUsageReportService = class MarkUsageReportService {
    constructor(reportRepository, agreementRepository, dataSource) {
        this.reportRepository = reportRepository;
        this.agreementRepository = agreementRepository;
        this.dataSource = dataSource;
    }
    async createReport(createDto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const license = await this.agreementRepository.findOne({
                where: { id: createDto.licenseId },
            });
            if (!license) {
                throw new common_1.NotFoundException(`License with ID ${createDto.licenseId} not found`);
            }
            const existingDraft = await this.reportRepository.findOne({
                where: {
                    licenseId: createDto.licenseId,
                    status: enums_1.ReportStatus.DRAFT,
                    reportYear: new Date(createDto.reportPeriodStart).getFullYear(),
                },
            });
            if (existingDraft) {
                throw new common_1.BadRequestException('A draft report already exists for this period. Please update or delete it first.');
            }
            const reportNumber = await this.generateReportNumber();
            const reportYear = new Date(createDto.reportPeriodStart).getFullYear();
            const report = this.reportRepository.create({
                reportNumber,
                licenseId: createDto.licenseId,
                agreementId: license.agreementId,
                reportPeriodStart: new Date(createDto.reportPeriodStart),
                reportPeriodEnd: new Date(createDto.reportPeriodEnd),
                reportYear,
                nsbContactName: createDto.nsbContactName,
                nsbContactEmail: createDto.nsbContactEmail,
                promotionalUsageMetrics: createDto.promotionalUsageMetrics
                    ? JSON.parse(JSON.stringify(createDto.promotionalUsageMetrics))
                    : null,
                certificationUsageMetrics: createDto.certificationUsageMetrics
                    ? JSON.parse(JSON.stringify(createDto.certificationUsageMetrics))
                    : null,
                impactAssessment: createDto.impactAssessment
                    ? JSON.parse(JSON.stringify(createDto.impactAssessment))
                    : null,
                complianceChecks: createDto.complianceChecks
                    ? JSON.parse(JSON.stringify(createDto.complianceChecks))
                    : null,
                nonComplianceIssues: createDto.nonComplianceIssues,
                correctiveActionsTaken: createDto.correctiveActionsTaken,
                plannedUsageNextYear: createDto.plannedUsageNextYear,
                renewalIntention: createDto.renewalIntention,
                supportingEvidence: createDto.supportingEvidence
                    ? JSON.parse(JSON.stringify(createDto.supportingEvidence))
                    : null,
                samples: createDto.samples ? JSON.parse(JSON.stringify(createDto.samples)) : null,
                testimonials: createDto.testimonials ? JSON.parse(JSON.stringify(createDto.testimonials)) : null,
                status: enums_1.ReportStatus.DRAFT,
                createdBy: userId,
                updatedBy: userId,
            });
            const savedReport = await queryRunner.manager.save(report);
            await queryRunner.commitTransaction();
            return this.findById(savedReport.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateReport(id, updateDto, userId) {
        const report = await this.reportRepository.findOne({
            where: { id, status: enums_1.ReportStatus.DRAFT },
        });
        if (!report) {
            throw new common_1.NotFoundException('Draft report not found or already submitted');
        }
        if (updateDto.reportPeriodStart !== undefined) {
            report.reportPeriodStart = new Date(updateDto.reportPeriodStart);
            report.reportYear = new Date(updateDto.reportPeriodStart).getFullYear();
        }
        if (updateDto.reportPeriodEnd !== undefined) {
            report.reportPeriodEnd = new Date(updateDto.reportPeriodEnd);
        }
        if (updateDto.nsbContactName !== undefined) {
            report.nsbContactName = updateDto.nsbContactName;
        }
        if (updateDto.nsbContactEmail !== undefined) {
            report.nsbContactEmail = updateDto.nsbContactEmail;
        }
        if (updateDto.promotionalUsageMetrics !== undefined) {
            report.promotionalUsageMetrics = JSON.parse(JSON.stringify(updateDto.promotionalUsageMetrics));
        }
        if (updateDto.certificationUsageMetrics !== undefined) {
            report.certificationUsageMetrics = JSON.parse(JSON.stringify(updateDto.certificationUsageMetrics));
        }
        if (updateDto.impactAssessment !== undefined) {
            report.impactAssessment = JSON.parse(JSON.stringify(updateDto.impactAssessment));
        }
        if (updateDto.complianceChecks !== undefined) {
            report.complianceChecks = JSON.parse(JSON.stringify(updateDto.complianceChecks));
        }
        if (updateDto.nonComplianceIssues !== undefined) {
            report.nonComplianceIssues = updateDto.nonComplianceIssues;
        }
        if (updateDto.correctiveActionsTaken !== undefined) {
            report.correctiveActionsTaken = updateDto.correctiveActionsTaken;
        }
        if (updateDto.plannedUsageNextYear !== undefined) {
            report.plannedUsageNextYear = updateDto.plannedUsageNextYear;
        }
        if (updateDto.renewalIntention !== undefined) {
            report.renewalIntention = updateDto.renewalIntention;
        }
        if (updateDto.supportingEvidence !== undefined) {
            report.supportingEvidence = JSON.parse(JSON.stringify(updateDto.supportingEvidence));
        }
        if (updateDto.samples !== undefined) {
            report.samples = JSON.parse(JSON.stringify(updateDto.samples));
        }
        if (updateDto.testimonials !== undefined) {
            report.testimonials = JSON.parse(JSON.stringify(updateDto.testimonials));
        }
        report.updatedBy = userId;
        report.updatedAt = new Date();
        return this.reportRepository.save(report);
    }
    async submitReport(id, userId) {
        const report = await this.reportRepository.findOne({
            where: { id, status: enums_1.ReportStatus.DRAFT },
        });
        if (!report) {
            throw new common_1.NotFoundException('Draft report not found');
        }
        const validationErrors = this.validateReportCompleteness(report);
        if (validationErrors.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Report validation failed',
                errors: validationErrors,
            });
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            report.status = enums_1.ReportStatus.SUBMITTED;
            report.submittedAt = new Date();
            report.updatedBy = userId;
            await queryRunner.manager.save(report);
            await queryRunner.commitTransaction();
            return this.findById(report.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    validateReportCompleteness(report) {
        const errors = [];
        if (!report.plannedUsageNextYear || report.plannedUsageNextYear.trim() === '') {
            errors.push('Planned usage for next year is required');
        }
        if (!report.renewalIntention) {
            errors.push('Renewal intention is required');
        }
        if (!report.complianceChecks) {
            errors.push('Compliance checks are required');
        }
        return errors;
    }
    async findById(id) {
        const report = await this.reportRepository.findOne({
            where: { id },
            relations: ['license', 'license.application'],
        });
        if (!report) {
            throw new common_1.NotFoundException(`Report with ID ${id} not found`);
        }
        return report;
    }
    async getReportsByLicense(licenseId) {
        return this.reportRepository.find({
            where: { licenseId },
            relations: ['license'],
            order: { reportYear: 'DESC', createdAt: 'DESC' },
        });
    }
    async generateReportNumber() {
        const year = new Date().getFullYear();
        const count = await this.reportRepository.count({
            where: {
                reportNumber: (0, typeorm_2.Like)(`NSB-004-3-${year}-%`),
            },
        });
        const sequence = String(count + 1).padStart(6, '0');
        return `NSB-004-3-${year}-${sequence}`;
    }
};
exports.MarkUsageReportService = MarkUsageReportService;
exports.MarkUsageReportService = MarkUsageReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mark_license_usage_report_entity_1.MarkLicenseUsageReport)),
    __param(1, (0, typeorm_1.InjectRepository)(mark_license_agreement_entity_1.MarkLicenseAgreement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], MarkUsageReportService);
//# sourceMappingURL=mark-usage-report.service.js.map