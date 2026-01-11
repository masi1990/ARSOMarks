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
exports.LicenseApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const license_application_entity_1 = require("../entities/license-application.entity");
const application_document_entity_1 = require("../entities/application-document.entity");
const workflow_history_entity_1 = require("../entities/workflow-history.entity");
const enums_1 = require("../../../shared/enums");
const workflow_service_1 = require("./workflow.service");
let LicenseApplicationService = class LicenseApplicationService {
    constructor(applicationRepository, documentRepository, workflowRepository, dataSource, workflowService) {
        this.applicationRepository = applicationRepository;
        this.documentRepository = documentRepository;
        this.workflowRepository = workflowRepository;
        this.dataSource = dataSource;
        this.workflowService = workflowService;
    }
    async createApplication(createDto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingDraft = await this.applicationRepository.findOne({
                where: {
                    nsbId: createDto.nsbId,
                    status: enums_1.ApplicationStatus.DRAFT,
                },
            });
            if (existingDraft && !createDto.saveAsDraft) {
                throw new common_1.BadRequestException('A draft application already exists. Please update or delete it first.');
            }
            const application = this.applicationRepository.create(Object.assign(Object.assign({}, createDto), { status: createDto.saveAsDraft ? enums_1.ApplicationStatus.DRAFT : enums_1.ApplicationStatus.SUBMITTED, submittedAt: createDto.saveAsDraft ? null : new Date(), createdBy: userId, updatedBy: userId }));
            const savedApplication = await queryRunner.manager.save(application);
            await this.workflowService.createHistoryEntry({
                applicationId: savedApplication.id,
                fromStatus: null,
                toStatus: savedApplication.status,
                actionPerformed: createDto.saveAsDraft ? 'DRAFT_CREATED' : 'APPLICATION_SUBMITTED',
                performedBy: userId,
                notes: createDto.saveAsDraft ? 'Draft application created' : 'Application submitted',
            });
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
    async updateDraftApplication(id, updateDto, userId) {
        const application = await this.applicationRepository.findOne({
            where: { id, status: enums_1.ApplicationStatus.DRAFT },
        });
        if (!application) {
            throw new common_1.NotFoundException('Draft application not found or already submitted');
        }
        Object.assign(application, Object.assign(Object.assign({}, updateDto), { updatedBy: userId, updatedAt: new Date() }));
        await this.workflowService.createHistoryEntry({
            applicationId: application.id,
            fromStatus: application.status,
            toStatus: application.status,
            actionPerformed: 'DRAFT_UPDATED',
            performedBy: userId,
            notes: 'Draft application updated',
        });
        return this.applicationRepository.save(application);
    }
    async submitApplication(id, submitDto, userId) {
        const application = await this.applicationRepository.findOne({
            where: { id, status: enums_1.ApplicationStatus.DRAFT },
            relations: ['documents'],
        });
        if (!application) {
            throw new common_1.NotFoundException('Draft application not found');
        }
        const validationErrors = await this.validateForSubmission(application);
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
            application.status = enums_1.ApplicationStatus.SUBMITTED;
            application.submittedAt = new Date();
            application.submissionData = Object.assign({}, application);
            application.updatedBy = userId;
            await queryRunner.manager.save(application);
            await this.workflowService.createHistoryEntry({
                applicationId: application.id,
                fromStatus: enums_1.ApplicationStatus.DRAFT,
                toStatus: enums_1.ApplicationStatus.SUBMITTED,
                actionPerformed: 'APPLICATION_SUBMITTED',
                performedBy: userId,
                notes: (submitDto === null || submitDto === void 0 ? void 0 : submitDto.notes) || 'Application submitted for review',
            });
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
    async validateForSubmission(application) {
        var _a, _b, _c;
        const errors = [];
        const requiredDocumentTypes = [
            enums_1.DocumentType.LEGAL_REGISTRATION,
            enums_1.DocumentType.ACCREDITATION_CERTIFICATE,
            enums_1.DocumentType.QUALITY_MANUAL,
            enums_1.DocumentType.AUDITOR_COMPETENCE_MATRIX,
        ];
        const existingDocuments = (_b = (_a = application.documents) === null || _a === void 0 ? void 0 : _a.map((doc) => doc.documentType)) !== null && _b !== void 0 ? _b : [];
        const missingDocuments = requiredDocumentTypes.filter((type) => !existingDocuments.includes(type));
        if (missingDocuments.length > 0) {
            errors.push(`Missing required documents: ${missingDocuments.join(', ')}`);
        }
        if (!((_c = application.accreditationDetails) === null || _c === void 0 ? void 0 : _c['accreditationBody'])) {
            errors.push('Accreditation body is required');
        }
        if (!application.appliedSchemes || (Array.isArray(application.appliedSchemes) && application.appliedSchemes.length === 0)) {
            errors.push('At least one ACAP scheme must be selected');
        }
        if (!application.organizationalDetails) {
            errors.push('Organizational details are required');
        }
        return errors;
    }
    async findById(id) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['nsb', 'nsb.contacts', 'nsb.locations', 'documents', 'workflowHistory', 'license'],
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        return application;
    }
    async getApplicationsByNsb(nsbId, includeDrafts = true) {
        const where = { nsbId };
        if (!includeDrafts) {
            where.status = enums_1.ApplicationStatus.SUBMITTED;
        }
        return this.applicationRepository.find({
            where,
            relations: ['documents', 'workflowHistory'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.LicenseApplicationService = LicenseApplicationService;
exports.LicenseApplicationService = LicenseApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(license_application_entity_1.LicenseApplication)),
    __param(1, (0, typeorm_1.InjectRepository)(application_document_entity_1.ApplicationDocument)),
    __param(2, (0, typeorm_1.InjectRepository)(workflow_history_entity_1.WorkflowHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        workflow_service_1.WorkflowService])
], LicenseApplicationService);
//# sourceMappingURL=license-application.service.js.map