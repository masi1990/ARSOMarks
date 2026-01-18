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
exports.CbApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cb_application_entity_1 = require("../entities/cb-application.entity");
const enums_1 = require("../../../shared/enums");
const cb_application_document_entity_1 = require("../entities/cb-application-document.entity");
const cb_document_upload_service_1 = require("./cb-document-upload.service");
const accreditation_body_entity_1 = require("../../reference-data/entities/accreditation-body.entity");
let CbApplicationService = class CbApplicationService {
    constructor(cbApplicationRepo, cbDocumentRepo, accreditationBodyRepo, uploadService) {
        this.cbApplicationRepo = cbApplicationRepo;
        this.cbDocumentRepo = cbDocumentRepo;
        this.accreditationBodyRepo = accreditationBodyRepo;
        this.uploadService = uploadService;
    }
    removeUndefinedValues(obj) {
        const cleaned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
                cleaned[key] = obj[key];
            }
        }
        return cleaned;
    }
    async createDraft(dto, userId) {
        const cleanedDto = this.removeUndefinedValues(dto);
        const application = this.cbApplicationRepo.create(Object.assign(Object.assign({}, cleanedDto), { status: enums_1.CbApplicationStatus.DRAFT, createdBy: userId, updatedBy: userId }));
        return this.cbApplicationRepo.save(application);
    }
    async create(dto, userId) {
        const application = this.cbApplicationRepo.create(Object.assign(Object.assign({}, dto), { status: enums_1.CbApplicationStatus.DRAFT, createdBy: userId, updatedBy: userId }));
        return this.cbApplicationRepo.save(application);
    }
    async updateDraft(id, dto, userId) {
        const application = await this.findById(id);
        if (application.status !== enums_1.CbApplicationStatus.DRAFT) {
            throw new common_1.BadRequestException('Can only update draft applications');
        }
        Object.assign(application, dto, { updatedBy: userId });
        return this.cbApplicationRepo.save(application);
    }
    async submit(id, userId) {
        const application = await this.findById(id);
        if (application.status !== enums_1.CbApplicationStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft applications can be submitted');
        }
        const missingFields = [];
        if (!application.legalName)
            missingFields.push('Legal name');
        if (!application.contactPersonName)
            missingFields.push('Contact person name');
        if (!application.contactEmail)
            missingFields.push('Contact email');
        if (!application.contactPhone)
            missingFields.push('Contact phone');
        if (!application.physicalAddress)
            missingFields.push('Physical address');
        if (!application.regionsOfOperation || application.regionsOfOperation.length === 0) {
            missingFields.push('Regions of operation');
        }
        if (missingFields.length > 0) {
            throw new common_1.BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
        }
        const requiredDocs = application.isAccredited
            ? [enums_1.CbDocumentType.ACCREDITATION_CERTIFICATE, enums_1.CbDocumentType.ACCREDITATION_SCOPE]
            : [enums_1.CbDocumentType.ACKNOWLEDGEMENT_OF_APPLICATION];
        const documents = await this.cbDocumentRepo.find({ where: { applicationId: id } });
        const uploadedDocTypes = documents.map((doc) => doc.documentType);
        const missingDocs = requiredDocs.filter((type) => !uploadedDocTypes.includes(type));
        if (missingDocs.length > 0) {
            throw new common_1.BadRequestException(`Missing required documents: ${missingDocs.join(', ')}`);
        }
        if (application.accreditationBodyId) {
            const accreditationBody = await this.accreditationBodyRepo.findOne({ where: { id: application.accreditationBodyId } });
            if (!accreditationBody) {
                throw new common_1.BadRequestException('Accreditation body not found');
            }
            if (!accreditationBody.isFracMraSignatory) {
                throw new common_1.BadRequestException('Accreditation body must be an AFRAC MRA signatory');
            }
        }
        application.status = application.isAccredited
            ? enums_1.CbApplicationStatus.SUBMITTED
            : enums_1.CbApplicationStatus.PROVISIONAL;
        application.submittedAt = new Date();
        application.updatedBy = userId;
        application.applicationNumber = application.applicationNumber || (await this.generateApplicationNumber());
        if (!application.isAccredited) {
            const provisionalEnd = application.provisionalValidUntil || this.calculateProvisionalEnd();
            this.ensureProvisionalWindow(provisionalEnd);
            application.provisionalValidUntil = provisionalEnd;
        }
        return this.cbApplicationRepo.save(application);
    }
    async approve(id, userId) {
        const application = await this.findById(id);
        if (![enums_1.CbApplicationStatus.SUBMITTED, enums_1.CbApplicationStatus.UNDER_REVIEW, enums_1.CbApplicationStatus.PROVISIONAL].includes(application.status)) {
            throw new common_1.BadRequestException('Only submitted or provisional applications can be approved');
        }
        application.status = enums_1.CbApplicationStatus.APPROVED;
        application.reviewedAt = new Date();
        application.approvedAt = new Date();
        application.updatedBy = userId;
        return this.cbApplicationRepo.save(application);
    }
    async reject(id, reason, userId) {
        const application = await this.findById(id);
        if (![enums_1.CbApplicationStatus.SUBMITTED, enums_1.CbApplicationStatus.UNDER_REVIEW, enums_1.CbApplicationStatus.PROVISIONAL].includes(application.status)) {
            throw new common_1.BadRequestException('Only submitted or provisional applications can be rejected');
        }
        application.status = enums_1.CbApplicationStatus.REJECTED;
        application.reviewedAt = new Date();
        application.rejectedAt = new Date();
        application.rejectionReason = reason;
        application.updatedBy = userId;
        return this.cbApplicationRepo.save(application);
    }
    async list(filters) {
        const query = this.cbApplicationRepo.createQueryBuilder('application');
        if (filters === null || filters === void 0 ? void 0 : filters.status) {
            query.andWhere('application.status = :status', { status: filters.status });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.search) {
            query.andWhere('(application.legalName ILIKE :search OR application.contactEmail ILIKE :search OR application.applicationNumber ILIKE :search)', { search: `%${filters.search}%` });
        }
        const total = await query.getCount();
        if ((filters === null || filters === void 0 ? void 0 : filters.skip) !== undefined)
            query.skip(filters.skip);
        if ((filters === null || filters === void 0 ? void 0 : filters.limit) !== undefined)
            query.take(filters.limit);
        const data = await query
            .leftJoinAndSelect('application.country', 'country')
            .orderBy('application.createdAt', 'DESC')
            .getMany();
        return { data, total };
    }
    async findById(id) {
        const application = await this.cbApplicationRepo.findOne({
            where: { id },
            relations: ['country', 'accreditationBody', 'documents'],
        });
        if (!application) {
            throw new common_1.NotFoundException(`CB application with ID ${id} not found`);
        }
        return application;
    }
    async findByUserId(userId) {
        return this.cbApplicationRepo.find({
            where: { createdBy: userId },
            relations: ['country', 'accreditationBody'],
            order: { createdAt: 'DESC' },
        });
    }
    async uploadDocument(applicationId, file, documentType, userId) {
        const application = await this.findById(applicationId);
        if (application.status !== enums_1.CbApplicationStatus.DRAFT) {
            throw new common_1.BadRequestException('Documents can only be uploaded for draft applications');
        }
        const fileMetadata = await this.uploadService.uploadFile(file, applicationId, documentType);
        const document = this.cbDocumentRepo.create({
            applicationId,
            documentType,
            fileName: fileMetadata.fileName,
            filePath: fileMetadata.filePath,
            fileHash: fileMetadata.fileHash,
            fileSize: fileMetadata.fileSize,
            mimeType: fileMetadata.mimeType,
            uploadedBy: userId,
        });
        return this.cbDocumentRepo.save(document);
    }
    async listDocuments(applicationId) {
        await this.findById(applicationId);
        return this.cbDocumentRepo.find({
            where: { applicationId },
            order: { uploadedAt: 'DESC' },
        });
    }
    async generateApplicationNumber() {
        const year = new Date().getFullYear();
        const count = await this.cbApplicationRepo.count({
            where: {
                applicationNumber: (0, typeorm_2.Like)(`CB-APP-${year}-%`),
            },
        });
        const sequence = String(count + 1).padStart(6, '0');
        return `CB-APP-${year}-${sequence}`;
    }
    async updateLifecycle(id, dto, userId) {
        const application = await this.findById(id);
        switch (dto.status) {
            case enums_1.CbApplicationStatus.UNDER_REVIEW: {
                if (![enums_1.CbApplicationStatus.SUBMITTED, enums_1.CbApplicationStatus.PROVISIONAL].includes(application.status)) {
                    throw new common_1.BadRequestException('Only submitted or provisional applications can move to under review');
                }
                application.status = enums_1.CbApplicationStatus.UNDER_REVIEW;
                application.reviewedAt = application.reviewedAt || new Date();
                break;
            }
            case enums_1.CbApplicationStatus.PROVISIONAL: {
                if (!dto.provisionalEnd) {
                    throw new common_1.BadRequestException('provisionalEnd is required for provisional status');
                }
                this.ensureProvisionalWindow(dto.provisionalEnd);
                application.status = enums_1.CbApplicationStatus.PROVISIONAL;
                application.provisionalValidUntil = dto.provisionalEnd;
                application.reviewedAt = application.reviewedAt || new Date();
                break;
            }
            case enums_1.CbApplicationStatus.APPROVED: {
                if (!dto.licenseStart || !dto.licenseEnd) {
                    throw new common_1.BadRequestException('licenseStart and licenseEnd are required for approval');
                }
                const startDate = new Date(dto.licenseStart);
                const endDate = new Date(dto.licenseEnd);
                if (endDate < startDate) {
                    throw new common_1.BadRequestException('licenseEnd must be after licenseStart');
                }
                application.status = enums_1.CbApplicationStatus.APPROVED;
                application.licenseStart = dto.licenseStart;
                application.licenseEnd = dto.licenseEnd;
                application.renewalDue = dto.renewalDue || dto.licenseEnd;
                application.reviewedAt = application.reviewedAt || new Date();
                application.approvedAt = new Date();
                break;
            }
            case enums_1.CbApplicationStatus.SUSPENDED:
            case enums_1.CbApplicationStatus.WITHDRAWN: {
                if (![enums_1.CbApplicationStatus.APPROVED, enums_1.CbApplicationStatus.PROVISIONAL].includes(application.status)) {
                    throw new common_1.BadRequestException('Only active licenses can be suspended or withdrawn');
                }
                application.status = dto.status;
                break;
            }
            default:
                throw new common_1.BadRequestException('Unsupported status transition');
        }
        application.updatedBy = userId;
        return this.cbApplicationRepo.save(application);
    }
    ensureProvisionalWindow(provisionalEnd) {
        const endDate = new Date(provisionalEnd);
        const now = new Date();
        const maxEnd = new Date(now);
        maxEnd.setFullYear(now.getFullYear() + 2);
        if (endDate > maxEnd) {
            throw new common_1.BadRequestException('Provisional approval cannot exceed two years');
        }
    }
    calculateProvisionalEnd() {
        const end = new Date();
        end.setFullYear(end.getFullYear() + 2);
        return end.toISOString().slice(0, 10);
    }
};
exports.CbApplicationService = CbApplicationService;
exports.CbApplicationService = CbApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cb_application_entity_1.CbApplication)),
    __param(1, (0, typeorm_1.InjectRepository)(cb_application_document_entity_1.CbApplicationDocument)),
    __param(2, (0, typeorm_1.InjectRepository)(accreditation_body_entity_1.AccreditationBody)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cb_document_upload_service_1.CbDocumentUploadService])
], CbApplicationService);
//# sourceMappingURL=cb-application.service.js.map