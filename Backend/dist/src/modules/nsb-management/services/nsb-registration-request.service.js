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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var NsbRegistrationRequestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsbRegistrationRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const nsb_registration_request_entity_1 = require("../entities/nsb-registration-request.entity");
const nsb_registration_request_document_entity_1 = require("../entities/nsb-registration-request-document.entity");
const enums_1 = require("../../../shared/enums");
const nsb_service_1 = require("./nsb.service");
const nsb_document_upload_service_1 = require("./nsb-document-upload.service");
const email_service_1 = require("../../auth/services/email.service");
let NsbRegistrationRequestService = NsbRegistrationRequestService_1 = class NsbRegistrationRequestService {
    constructor(requestRepo, documentRepo, nsbService, dataSource, uploadService, emailService, configService) {
        this.requestRepo = requestRepo;
        this.documentRepo = documentRepo;
        this.nsbService = nsbService;
        this.dataSource = dataSource;
        this.uploadService = uploadService;
        this.emailService = emailService;
        this.configService = configService;
        this.logger = new common_1.Logger(NsbRegistrationRequestService_1.name);
    }
    async create(dto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (dto.countryId) {
                const existingRequest = await this.requestRepo.findOne({
                    where: {
                        countryId: dto.countryId,
                        status: (0, typeorm_2.In)([enums_1.NsbRegistrationRequestStatus.DRAFT, enums_1.NsbRegistrationRequestStatus.SUBMITTED, enums_1.NsbRegistrationRequestStatus.UNDER_REVIEW]),
                    },
                });
                if (existingRequest) {
                    throw new common_1.ConflictException('A registration request already exists for this country');
                }
            }
            const request = this.requestRepo.create(Object.assign(Object.assign({}, dto), { status: enums_1.NsbRegistrationRequestStatus.DRAFT, createdBy: userId }));
            const savedRequest = await queryRunner.manager.save(request);
            if (dto.documents && dto.documents.length > 0) {
                const documents = dto.documents.map((doc) => this.documentRepo.create(Object.assign(Object.assign({}, doc), { registrationRequestId: savedRequest.id, uploadedBy: userId })));
                await queryRunner.manager.save(documents);
            }
            await queryRunner.commitTransaction();
            return this.findById(savedRequest.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(id, dto, userId, userRole) {
        const request = await this.requestRepo.findOne({
            where: { id },
            relations: ['documents'],
        });
        if (!request) {
            throw new common_1.NotFoundException(`Registration request with ID ${id} not found`);
        }
        const isAdminOrSecretariat = userRole === 'SUPER_ADMIN' || userRole === 'ARSO_SECRETARIAT';
        const isStatusUpdate = dto.status !== undefined && dto.status !== request.status;
        const oldStatus = request.status;
        if (!isAdminOrSecretariat && (request.status === enums_1.NsbRegistrationRequestStatus.SUBMITTED || request.status === enums_1.NsbRegistrationRequestStatus.UNDER_REVIEW)) {
            if (!isStatusUpdate) {
                throw new common_1.ConflictException('Cannot update a submitted or under-review request');
            }
        }
        const { documents } = dto, updateData = __rest(dto, ["documents"]);
        Object.assign(request, Object.assign(Object.assign({}, updateData), { updatedAt: new Date() }));
        if (isStatusUpdate && isAdminOrSecretariat) {
            request.reviewedBy = userId;
            request.reviewedAt = new Date();
        }
        const savedRequest = await this.requestRepo.save(request);
        if (isStatusUpdate && oldStatus !== savedRequest.status) {
            try {
                await this.emailService.sendNsbRegistrationRequestStatusChanged(request.contactEmail, request.contactPersonName, request.nsbOfficialName, request.countryName, oldStatus, savedRequest.status, dto.remarks);
            }
            catch (error) {
                this.logger.error(`Failed to send status change email: ${error}`);
            }
        }
        return savedRequest;
    }
    async submit(id, userId) {
        const request = await this.findById(id);
        if (request.status !== enums_1.NsbRegistrationRequestStatus.DRAFT) {
            throw new common_1.ConflictException('Only draft requests can be submitted');
        }
        const missingFields = [];
        if (!request.countryId)
            missingFields.push('Country');
        if (!request.countryName)
            missingFields.push('Country Name');
        if (!request.nsbOfficialName)
            missingFields.push('NSB Official Name');
        if (!request.isoCode || request.isoCode.length !== 2)
            missingFields.push('ISO Alpha-2 Code');
        if (!request.contactPersonName)
            missingFields.push('Contact Person Name');
        if (!request.contactEmail || !request.contactEmail.includes('@'))
            missingFields.push('Contact Email');
        if (missingFields.length > 0) {
            throw new common_1.BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
        }
        const documents = await this.documentRepo.find({ where: { registrationRequestId: id } });
        const requiredDocTypes = [
            'NSB_ESTABLISHMENT_CHARTER',
            'ARSO_MEMBERSHIP_CERTIFICATE',
            'GOVERNMENT_GAZETTE_NOTICE',
            'DECLARATION_OF_AUTHORITY',
        ];
        const uploadedDocTypes = documents.map((d) => d.documentType);
        const missingDocs = requiredDocTypes.filter((type) => !uploadedDocTypes.includes(type));
        if (missingDocs.length > 0) {
            throw new common_1.ConflictException(`Missing required documents: ${missingDocs.join(', ')}`);
        }
        request.status = enums_1.NsbRegistrationRequestStatus.SUBMITTED;
        request.updatedAt = new Date();
        return this.requestRepo.save(request);
    }
    async approve(id, reviewerId, remarks) {
        const request = await this.findById(id);
        if (request.status !== enums_1.NsbRegistrationRequestStatus.SUBMITTED && request.status !== enums_1.NsbRegistrationRequestStatus.UNDER_REVIEW) {
            throw new common_1.ConflictException('Only submitted or under-review requests can be approved');
        }
        const createNsbDto = {
            name: request.nsbOfficialName,
            shortName: request.nsbAcronym,
            countryId: request.countryId,
            classification: enums_1.NsbClassification.GOVERNMENT_AGENCY,
            contacts: [
                {
                    contactType: 'PRIMARY',
                    name: request.contactPersonName,
                    designation: request.contactPersonTitle,
                    email: request.contactEmail,
                    phone: request.contactPhone,
                    mobile: request.contactMobile,
                },
            ],
        };
        const nsb = await this.nsbService.createNsb(createNsbDto, reviewerId);
        request.status = enums_1.NsbRegistrationRequestStatus.APPROVED;
        request.reviewedBy = reviewerId;
        request.reviewedAt = new Date();
        request.remarks = remarks;
        request.nsbId = nsb.id;
        const savedRequest = await this.requestRepo.save(request);
        try {
            const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:4200');
            const profileSetupUrl = `${frontendUrl}/nsb/profile-setup`;
            await this.emailService.sendNsbRegistrationRequestApproved(request.contactEmail, request.contactPersonName, request.nsbOfficialName, request.countryName, profileSetupUrl);
        }
        catch (error) {
        }
        return savedRequest;
    }
    async reject(id, reviewerId, remarks) {
        const request = await this.findById(id);
        if (request.status !== enums_1.NsbRegistrationRequestStatus.SUBMITTED && request.status !== enums_1.NsbRegistrationRequestStatus.UNDER_REVIEW) {
            throw new common_1.ConflictException('Only submitted or under-review requests can be rejected');
        }
        request.status = enums_1.NsbRegistrationRequestStatus.REJECTED;
        request.reviewedBy = reviewerId;
        request.reviewedAt = new Date();
        request.remarks = remarks;
        const savedRequest = await this.requestRepo.save(request);
        try {
            await this.emailService.sendNsbRegistrationRequestRejected(request.contactEmail, request.contactPersonName, request.nsbOfficialName, request.countryName, remarks);
        }
        catch (error) {
        }
        return savedRequest;
    }
    async findById(id) {
        const request = await this.requestRepo.findOne({
            where: { id },
            relations: ['documents', 'country', 'createdByUser', 'reviewedByUser'],
        });
        if (!request) {
            throw new common_1.NotFoundException(`Registration request with ID ${id} not found`);
        }
        return request;
    }
    async findAll(filter = {}) {
        const query = this.requestRepo.createQueryBuilder('request').leftJoinAndSelect('request.country', 'country');
        if (filter.countryId) {
            query.andWhere('request.countryId = :countryId', { countryId: filter.countryId });
        }
        if (filter.status) {
            query.andWhere('request.status = :status', { status: filter.status });
        }
        if (filter.search) {
            query.andWhere('(request.nsbOfficialName ILIKE :search OR request.nsbAcronym ILIKE :search OR request.contactEmail ILIKE :search)', { search: `%${filter.search}%` });
        }
        const [data, total] = await query
            .orderBy('request.createdAt', 'DESC')
            .skip(filter.skip || 0)
            .take(filter.limit || 25)
            .getManyAndCount();
        return { data, total };
    }
    async findByCountry(countryId) {
        return this.requestRepo.findOne({
            where: { countryId },
            relations: ['documents', 'country'],
            order: { createdAt: 'DESC' },
        });
    }
    async uploadDocument(requestId, file, documentType, userId) {
        const request = await this.findById(requestId);
        if (request.status !== enums_1.NsbRegistrationRequestStatus.DRAFT) {
            throw new common_1.ConflictException('Documents can only be uploaded for draft requests');
        }
        const fileMetadata = await this.uploadService.uploadFile(file, requestId, documentType);
        const existingDoc = await this.documentRepo.findOne({
            where: { registrationRequestId: requestId, documentType },
        });
        if (existingDoc) {
            await this.uploadService.deleteFile(existingDoc.filePath);
            await this.documentRepo.remove(existingDoc);
        }
        const document = this.documentRepo.create({
            registrationRequestId: requestId,
            documentType,
            fileName: fileMetadata.fileName,
            filePath: fileMetadata.filePath,
            fileHash: fileMetadata.fileHash,
            fileSize: fileMetadata.fileSize,
            mimeType: fileMetadata.mimeType,
            uploadedBy: userId,
        });
        return this.documentRepo.save(document);
    }
    async deleteDocument(requestId, documentId, userId) {
        const request = await this.findById(requestId);
        if (request.status !== enums_1.NsbRegistrationRequestStatus.DRAFT) {
            throw new common_1.ConflictException('Documents can only be deleted from draft requests');
        }
        const document = await this.documentRepo.findOne({
            where: { id: documentId, registrationRequestId: requestId },
        });
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        await this.uploadService.deleteFile(document.filePath);
        await this.documentRepo.remove(document);
    }
    async getDocument(requestId, documentId) {
        await this.findById(requestId);
        const document = await this.documentRepo.findOne({
            where: { id: documentId, registrationRequestId: requestId },
        });
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        return document;
    }
    async getDocumentFile(filePath) {
        return this.uploadService.getFile(filePath);
    }
};
exports.NsbRegistrationRequestService = NsbRegistrationRequestService;
exports.NsbRegistrationRequestService = NsbRegistrationRequestService = NsbRegistrationRequestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nsb_registration_request_entity_1.NsbRegistrationRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(nsb_registration_request_document_entity_1.NsbRegistrationRequestDocument)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        nsb_service_1.NsbService,
        typeorm_2.DataSource,
        nsb_document_upload_service_1.NsbDocumentUploadService,
        email_service_1.EmailService,
        config_1.ConfigService])
], NsbRegistrationRequestService);
//# sourceMappingURL=nsb-registration-request.service.js.map