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
exports.MarkLicenseApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mark_license_application_entity_1 = require("../entities/mark-license-application.entity");
const mark_license_placement_entity_1 = require("../entities/mark-license-placement.entity");
const enums_1 = require("../../../shared/enums");
const nsb_entity_1 = require("../../nsb-management/entities/nsb.entity");
const mark_misuse_incident_entity_1 = require("../entities/mark-misuse-incident.entity");
const mark_sanction_entity_1 = require("../entities/mark-sanction.entity");
const mark_misuse_upload_service_1 = require("./mark-misuse-upload.service");
let MarkLicenseApplicationService = class MarkLicenseApplicationService {
    constructor(applicationRepository, placementRepository, nsbRepository, misuseRepository, sanctionRepository, misuseUploadService, dataSource) {
        this.applicationRepository = applicationRepository;
        this.placementRepository = placementRepository;
        this.nsbRepository = nsbRepository;
        this.misuseRepository = misuseRepository;
        this.sanctionRepository = sanctionRepository;
        this.misuseUploadService = misuseUploadService;
        this.dataSource = dataSource;
    }
    async createApplication(createDto, userId) {
        var _a;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const nsbId = (_a = createDto.nsbId) === null || _a === void 0 ? void 0 : _a.trim();
            if (!nsbId) {
                throw new common_1.BadRequestException('NSB is required');
            }
            const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
            if (!nsb) {
                throw new common_1.NotFoundException(`NSB with ID ${nsbId} not found`);
            }
            const applicationNumber = await this.generateApplicationNumber();
            const applicationData = {
                applicationNumber,
                nsbId,
                nsbApplicantName: nsb.name,
                applicationDate: new Date(),
                applicationReference: createDto.applicationReference,
                licenseTypes: createDto.licenseTypes,
                licenseDuration: createDto.licenseDuration,
                licenseDurationOther: createDto.licenseDurationOther,
                promotionalLicenseDetails: createDto.promotionalLicenseDetails
                    ? JSON.parse(JSON.stringify(createDto.promotionalLicenseDetails))
                    : null,
                certificationBodyDetails: createDto.certificationBodyDetails
                    ? JSON.parse(JSON.stringify(createDto.certificationBodyDetails))
                    : null,
                specialProjectDetails: createDto.specialProjectDetails
                    ? JSON.parse(JSON.stringify(createDto.specialProjectDetails))
                    : null,
                mediaUsage: createDto.mediaUsage ? JSON.parse(JSON.stringify(createDto.mediaUsage)) : null,
                campaignTimeline: createDto.campaignTimeline
                    ? JSON.parse(JSON.stringify(createDto.campaignTimeline))
                    : null,
                expectedImpactMetrics: createDto.expectedImpactMetrics
                    ? JSON.parse(JSON.stringify(createDto.expectedImpactMetrics))
                    : null,
                marksRequested: createDto.marksRequested,
                markColorsNeeded: createDto.markColorsNeeded,
                markSizesNeeded: createDto.markSizesNeeded,
                markLanguages: createDto.markLanguages,
                annexBCompliance: createDto.annexBCompliance,
                brandGuidelinesAck: createDto.brandGuidelinesAck,
                modificationPolicyAcceptance: createDto.modificationPolicyAcceptance,
                supportingDocuments: createDto.supportingDocuments
                    ? JSON.parse(JSON.stringify(createDto.supportingDocuments))
                    : null,
                declarationSignatory: createDto.declarationSignatory,
                signatoryTitle: createDto.signatoryTitle,
                signatoryEmail: createDto.signatoryEmail,
                auditRightsAcceptance: createDto.auditRightsAcceptance,
                annualReportingCommitment: createDto.annualReportingCommitment,
                dataSharingConsent: createDto.dataSharingConsent,
                status: enums_1.MarkLicenseStatus.DRAFT,
                createdBy: userId,
                updatedBy: userId,
            };
            const application = this.applicationRepository.create(applicationData);
            const savedApplication = await queryRunner.manager.save(application);
            await queryRunner.commitTransaction();
            return this.findById(savedApplication.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateApplication(id, updateDto, userId) {
        const application = await this.applicationRepository.findOne({
            where: { id, status: enums_1.MarkLicenseStatus.DRAFT },
        });
        if (!application) {
            throw new common_1.NotFoundException('Draft application not found or already submitted');
        }
        if (updateDto.nsbId !== undefined) {
            const nsb = await this.nsbRepository.findOne({ where: { id: updateDto.nsbId } });
            if (!nsb) {
                throw new common_1.NotFoundException(`NSB with ID ${updateDto.nsbId} not found`);
            }
            application.nsbId = updateDto.nsbId;
            application.nsbApplicantName = nsb.name;
        }
        if (updateDto.applicationReference !== undefined) {
            application.applicationReference = updateDto.applicationReference;
        }
        if (updateDto.licenseTypes !== undefined) {
            application.licenseTypes = updateDto.licenseTypes;
        }
        if (updateDto.licenseDuration !== undefined) {
            application.licenseDuration = updateDto.licenseDuration;
        }
        if (updateDto.licenseDurationOther !== undefined) {
            application.licenseDurationOther = updateDto.licenseDurationOther;
        }
        if (updateDto.promotionalLicenseDetails !== undefined) {
            application.promotionalLicenseDetails = JSON.parse(JSON.stringify(updateDto.promotionalLicenseDetails));
        }
        if (updateDto.certificationBodyDetails !== undefined) {
            application.certificationBodyDetails = JSON.parse(JSON.stringify(updateDto.certificationBodyDetails));
        }
        if (updateDto.specialProjectDetails !== undefined) {
            application.specialProjectDetails = JSON.parse(JSON.stringify(updateDto.specialProjectDetails));
        }
        if (updateDto.mediaUsage !== undefined) {
            application.mediaUsage = JSON.parse(JSON.stringify(updateDto.mediaUsage));
        }
        if (updateDto.campaignTimeline !== undefined) {
            application.campaignTimeline = JSON.parse(JSON.stringify(updateDto.campaignTimeline));
        }
        if (updateDto.expectedImpactMetrics !== undefined) {
            application.expectedImpactMetrics = JSON.parse(JSON.stringify(updateDto.expectedImpactMetrics));
        }
        if (updateDto.marksRequested !== undefined) {
            application.marksRequested = updateDto.marksRequested;
        }
        if (updateDto.markColorsNeeded !== undefined) {
            application.markColorsNeeded = updateDto.markColorsNeeded;
        }
        if (updateDto.markSizesNeeded !== undefined) {
            application.markSizesNeeded = updateDto.markSizesNeeded;
        }
        if (updateDto.markLanguages !== undefined) {
            application.markLanguages = updateDto.markLanguages;
        }
        if (updateDto.annexBCompliance !== undefined) {
            application.annexBCompliance = updateDto.annexBCompliance;
        }
        if (updateDto.brandGuidelinesAck !== undefined) {
            application.brandGuidelinesAck = updateDto.brandGuidelinesAck;
        }
        if (updateDto.modificationPolicyAcceptance !== undefined) {
            application.modificationPolicyAcceptance = updateDto.modificationPolicyAcceptance;
        }
        if (updateDto.supportingDocuments !== undefined) {
            application.supportingDocuments = JSON.parse(JSON.stringify(updateDto.supportingDocuments));
        }
        if (updateDto.declarationSignatory !== undefined) {
            application.declarationSignatory = updateDto.declarationSignatory;
        }
        if (updateDto.signatoryTitle !== undefined) {
            application.signatoryTitle = updateDto.signatoryTitle;
        }
        if (updateDto.signatoryEmail !== undefined) {
            application.signatoryEmail = updateDto.signatoryEmail;
        }
        if (updateDto.auditRightsAcceptance !== undefined) {
            application.auditRightsAcceptance = updateDto.auditRightsAcceptance;
        }
        if (updateDto.annualReportingCommitment !== undefined) {
            application.annualReportingCommitment = updateDto.annualReportingCommitment;
        }
        if (updateDto.dataSharingConsent !== undefined) {
            application.dataSharingConsent = updateDto.dataSharingConsent;
        }
        application.updatedBy = userId;
        application.updatedAt = new Date();
        return this.applicationRepository.save(application);
    }
    async submitApplication(id, submitDto, userId) {
        const application = await this.applicationRepository.findOne({
            where: { id, status: enums_1.MarkLicenseStatus.DRAFT },
            relations: ['placements'],
        });
        if (!application) {
            throw new common_1.NotFoundException('Draft application not found');
        }
        const validationErrors = await this.validateApplication(application);
        if (validationErrors.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Application validation failed',
                errors: validationErrors,
            });
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            application.status = enums_1.MarkLicenseStatus.SUBMITTED;
            application.submittedAt = new Date();
            application.updatedBy = userId;
            await queryRunner.manager.save(application);
            await queryRunner.commitTransaction();
            return this.findById(application.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async validateApplication(application) {
        const errors = [];
        if (!application.licenseTypes || application.licenseTypes.length === 0) {
            errors.push('At least one license type must be selected');
        }
        if (application.licenseTypes.includes(enums_1.MarkLicenseType.PROMOTIONAL_INSTITUTIONAL)) {
            if (!application.promotionalLicenseDetails) {
                errors.push('Promotional license details are required');
            }
        }
        if (application.licenseTypes.includes(enums_1.MarkLicenseType.CERTIFICATION_BODY)) {
            if (!application.certificationBodyDetails) {
                errors.push('Certification body details are required');
            }
        }
        if (application.licenseTypes.includes(enums_1.MarkLicenseType.SPECIAL_PROJECT)) {
            if (!application.specialProjectDetails) {
                errors.push('Special project details are required');
            }
        }
        if (!application.annexBCompliance) {
            errors.push('Annex B compliance acknowledgment is required');
        }
        if (!application.brandGuidelinesAck) {
            errors.push('Brand guidelines acknowledgment is required');
        }
        if (!application.modificationPolicyAcceptance) {
            errors.push('Modification policy acceptance is required');
        }
        if (!application.auditRightsAcceptance) {
            errors.push('Audit rights acceptance is required');
        }
        if (!application.annualReportingCommitment) {
            errors.push('Annual reporting commitment is required');
        }
        if (!application.dataSharingConsent) {
            errors.push('Data sharing consent is required');
        }
        if (!application.marksRequested || application.marksRequested.length === 0) {
            errors.push('At least one mark must be requested');
        }
        return errors;
    }
    async findById(id) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['nsb', 'placements', 'agreement'],
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        return application;
    }
    async getApplicationsByNsb(nsbId, includeDrafts = true) {
        const where = { nsbId };
        if (!includeDrafts) {
            where.status = enums_1.MarkLicenseStatus.SUBMITTED;
        }
        return this.applicationRepository.find({
            where,
            relations: ['placements'],
            order: { createdAt: 'DESC' },
        });
    }
    async getAllApplications(includeDrafts = true) {
        const where = {};
        if (!includeDrafts) {
            where.status = enums_1.MarkLicenseStatus.SUBMITTED;
        }
        return this.applicationRepository.find({
            where,
            relations: ['placements', 'nsb'],
            order: { createdAt: 'DESC' },
        });
    }
    async deleteDraft(id, userId) {
        const application = await this.applicationRepository.findOne({
            where: { id, status: enums_1.MarkLicenseStatus.DRAFT },
        });
        if (!application) {
            throw new common_1.NotFoundException('Draft application not found');
        }
        await this.applicationRepository.remove(application);
    }
    async addSupportingDocument(id, document, userId) {
        const application = await this.applicationRepository.findOne({
            where: { id, status: enums_1.MarkLicenseStatus.DRAFT },
        });
        if (!application) {
            throw new common_1.NotFoundException('Draft application not found');
        }
        const documentEntry = {
            id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            documentType: document.documentType,
            fileName: document.fileName,
            filePath: document.filePath,
            otherDocumentName: document.otherDocumentName,
        };
        const existing = (application.supportingDocuments || []);
        application.supportingDocuments = [...existing, documentEntry];
        application.updatedBy = userId;
        application.updatedAt = new Date();
        await this.applicationRepository.save(application);
        return documentEntry;
    }
    async listSupportingDocuments(id) {
        const application = await this.applicationRepository.findOne({
            where: { id },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        return application.supportingDocuments || [];
    }
    async removeSupportingDocument(id, documentId, userId) {
        const application = await this.applicationRepository.findOne({
            where: { id, status: enums_1.MarkLicenseStatus.DRAFT },
        });
        if (!application) {
            throw new common_1.NotFoundException('Draft application not found');
        }
        const existing = (application.supportingDocuments || []);
        application.supportingDocuments = existing.filter((doc) => (doc === null || doc === void 0 ? void 0 : doc.id) !== documentId);
        application.updatedBy = userId;
        application.updatedAt = new Date();
        await this.applicationRepository.save(application);
    }
    async approveApplication(id, userId) {
        const application = await this.applicationRepository.findOne({ where: { id } });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (![enums_1.MarkLicenseStatus.SUBMITTED, enums_1.MarkLicenseStatus.UNDER_REVIEW].includes(application.status)) {
            throw new common_1.BadRequestException('Only submitted applications can be approved');
        }
        application.status = enums_1.MarkLicenseStatus.APPROVED_PENDING_AGREEMENT;
        application.reviewedAt = new Date();
        application.approvedAt = new Date();
        application.updatedBy = userId;
        return this.applicationRepository.save(application);
    }
    async reportMisuse(payload, userId) {
        const incident = this.misuseRepository.create({
            licenseId: payload.licenseId,
            description: payload.description,
            status: enums_1.MarkMisuseStatus.OPEN,
            reportedBy: userId,
        });
        return this.misuseRepository.save(incident);
    }
    async listMisuseIncidents() {
        return this.misuseRepository.find({
            relations: ['license', 'sanctions'],
            order: { reportedAt: 'DESC' },
        });
    }
    async reviewMisuseIncident(id, status, decisionNotes, userId) {
        const incident = await this.misuseRepository.findOne({ where: { id } });
        if (!incident) {
            throw new common_1.NotFoundException('Misuse incident not found');
        }
        incident.status = status;
        incident.reviewedBy = userId;
        incident.decisionNotes = decisionNotes;
        return this.misuseRepository.save(incident);
    }
    async addSanction(incidentId, payload, userId) {
        const incident = await this.misuseRepository.findOne({ where: { id: incidentId } });
        if (!incident) {
            throw new common_1.NotFoundException('Misuse incident not found');
        }
        const sanction = this.sanctionRepository.create({
            incidentId,
            sanctionType: payload.sanctionType,
            startDate: payload.startDate,
            endDate: payload.endDate,
            notes: payload.notes,
            status: enums_1.MarkSanctionStatus.ACTIVE,
            createdBy: userId,
        });
        return this.sanctionRepository.save(sanction);
    }
    async addMisuseEvidence(incidentId, file) {
        const incident = await this.misuseRepository.findOne({ where: { id: incidentId } });
        if (!incident) {
            throw new common_1.NotFoundException('Misuse incident not found');
        }
        const upload = await this.misuseUploadService.uploadFile(file, incidentId);
        const evidenceEntry = Object.assign(Object.assign({ id: `evidence-${Date.now()}-${Math.random().toString(36).slice(2, 9)}` }, upload), { uploadedAt: new Date().toISOString() });
        const existing = (incident.evidenceFiles || []);
        incident.evidenceFiles = [...existing, evidenceEntry];
        await this.misuseRepository.save(incident);
        return evidenceEntry;
    }
    async rejectApplication(id, reason, userId) {
        const application = await this.applicationRepository.findOne({ where: { id } });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (![enums_1.MarkLicenseStatus.SUBMITTED, enums_1.MarkLicenseStatus.UNDER_REVIEW].includes(application.status)) {
            throw new common_1.BadRequestException('Only submitted applications can be rejected');
        }
        application.status = enums_1.MarkLicenseStatus.REJECTED;
        application.reviewedAt = new Date();
        application.rejectedAt = new Date();
        application.rejectionReason = reason || null;
        application.updatedBy = userId;
        return this.applicationRepository.save(application);
    }
    async generateApplicationNumber() {
        const year = new Date().getFullYear();
        const count = await this.applicationRepository.count({
            where: {
                applicationNumber: (0, typeorm_2.Like)(`NSB-004-1-${year}-%`),
            },
        });
        const sequence = String(count + 1).padStart(6, '0');
        return `NSB-004-1-${year}-${sequence}`;
    }
};
exports.MarkLicenseApplicationService = MarkLicenseApplicationService;
exports.MarkLicenseApplicationService = MarkLicenseApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mark_license_application_entity_1.MarkLicenseApplication)),
    __param(1, (0, typeorm_1.InjectRepository)(mark_license_placement_entity_1.MarkLicensePlacement)),
    __param(2, (0, typeorm_1.InjectRepository)(nsb_entity_1.Nsb)),
    __param(3, (0, typeorm_1.InjectRepository)(mark_misuse_incident_entity_1.MarkMisuseIncident)),
    __param(4, (0, typeorm_1.InjectRepository)(mark_sanction_entity_1.MarkSanction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mark_misuse_upload_service_1.MarkMisuseUploadService,
        typeorm_2.DataSource])
], MarkLicenseApplicationService);
//# sourceMappingURL=mark-license-application.service.js.map