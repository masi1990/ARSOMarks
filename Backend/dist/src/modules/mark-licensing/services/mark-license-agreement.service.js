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
exports.MarkLicenseAgreementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mark_license_agreement_entity_1 = require("../entities/mark-license-agreement.entity");
const mark_license_application_entity_1 = require("../entities/mark-license-application.entity");
const enums_1 = require("../../../shared/enums");
let MarkLicenseAgreementService = class MarkLicenseAgreementService {
    constructor(agreementRepository, applicationRepository, dataSource) {
        this.agreementRepository = agreementRepository;
        this.applicationRepository = applicationRepository;
        this.dataSource = dataSource;
    }
    async generateAgreement(createDto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const application = await this.applicationRepository.findOne({
                where: { id: createDto.applicationId },
                relations: ['nsb'],
            });
            if (!application) {
                throw new common_1.NotFoundException(`Application with ID ${createDto.applicationId} not found`);
            }
            if (application.status !== enums_1.MarkLicenseStatus.APPROVED_PENDING_AGREEMENT) {
                throw new common_1.BadRequestException('Application must be in APPROVED_PENDING_AGREEMENT status to generate agreement');
            }
            const existingAgreement = await this.agreementRepository.findOne({
                where: { applicationId: createDto.applicationId },
            });
            if (existingAgreement) {
                throw new common_1.BadRequestException('Agreement already exists for this application');
            }
            const agreementId = await this.generateAgreementId();
            const licenseTypeDisplay = application.licenseTypes.join(', ');
            const licenseTermsDisplay = createDto.licenseTermsDisplay || this.generateDefaultTerms(application);
            const agreement = this.agreementRepository.create({
                agreementId,
                applicationId: createDto.applicationId,
                nsbId: application.nsbId,
                licenseTypeDisplay,
                licenseStartDate: createDto.licenseStartDate,
                licenseEndDate: createDto.licenseEndDate,
                licenseTermsDisplay,
                royaltyFeeStructure: createDto.royaltyFeeStructure || this.getDefaultFeeStructure(),
                paymentSchedule: createDto.paymentSchedule || this.getDefaultPaymentSchedule(),
                usageRestrictions: createDto.usageRestrictions || this.getDefaultUsageRestrictions(),
                terminationClauses: createDto.terminationClauses || this.getDefaultTerminationClauses(),
                nsbSignerName: application.declarationSignatory,
                nsbSignerTitle: application.signatoryTitle,
                nsbSignerEmail: application.signatoryEmail,
                agreementStatus: enums_1.AgreementStatus.PENDING_NSB,
                createdBy: userId,
                updatedBy: userId,
            });
            const savedAgreement = await queryRunner.manager.save(agreement);
            application.status = enums_1.MarkLicenseStatus.PENDING_NSB_SIGNATURE;
            application.updatedBy = userId;
            await queryRunner.manager.save(application);
            await queryRunner.commitTransaction();
            return this.findById(savedAgreement.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async signAgreement(signDto, userId, ipAddress) {
        const agreement = await this.agreementRepository.findOne({
            where: { id: signDto.agreementId },
            relations: ['application'],
        });
        if (!agreement) {
            throw new common_1.NotFoundException(`Agreement with ID ${signDto.agreementId} not found`);
        }
        if (agreement.agreementStatus !== enums_1.AgreementStatus.PENDING_NSB) {
            throw new common_1.BadRequestException('Agreement is not pending NSB signature');
        }
        if (!signDto.nsbSignerConsent) {
            throw new common_1.BadRequestException('Electronic signature consent is required');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            agreement.nsbSignerName = signDto.nsbSignerName;
            agreement.nsbSignerTitle = signDto.nsbSignerTitle;
            agreement.nsbSignerEmail = signDto.nsbSignerEmail;
            agreement.nsbSignerConsent = signDto.nsbSignerConsent;
            agreement.nsbSignerTimestamp = new Date();
            agreement.nsbSignerIp = ipAddress;
            agreement.nsbSignatureImagePath = signDto.nsbSignatureImagePath;
            agreement.agreementStatus = enums_1.AgreementStatus.PENDING_ARSO;
            agreement.updatedBy = userId;
            if (agreement.application) {
                agreement.application.status = enums_1.MarkLicenseStatus.PENDING_ARSO_SIGNATURE;
                agreement.application.updatedBy = userId;
                await queryRunner.manager.save(agreement.application);
            }
            await queryRunner.manager.save(agreement);
            await queryRunner.commitTransaction();
            return this.findById(agreement.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async arsoSignAgreement(agreementId, arsoSignerName, arsoSignerTitle, userId) {
        const agreement = await this.agreementRepository.findOne({
            where: { id: agreementId },
            relations: ['application'],
        });
        if (!agreement) {
            throw new common_1.NotFoundException(`Agreement with ID ${agreementId} not found`);
        }
        if (agreement.agreementStatus !== enums_1.AgreementStatus.PENDING_ARSO) {
            throw new common_1.BadRequestException('Agreement is not pending ARSO signature');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            agreement.arsoSignerName = arsoSignerName;
            agreement.arsoSignerTitle = arsoSignerTitle;
            agreement.arsoSignerTimestamp = new Date();
            agreement.agreementStatus = enums_1.AgreementStatus.EXECUTED;
            agreement.updatedBy = userId;
            if (agreement.application) {
                agreement.application.status = enums_1.MarkLicenseStatus.EXECUTED;
                agreement.application.updatedBy = userId;
                await queryRunner.manager.save(agreement.application);
            }
            await queryRunner.manager.save(agreement);
            await queryRunner.commitTransaction();
            return this.findById(agreement.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findById(id) {
        const agreement = await this.agreementRepository.findOne({
            where: { id },
            relations: ['application', 'nsb', 'assets', 'usageReports'],
        });
        if (!agreement) {
            throw new common_1.NotFoundException(`Agreement with ID ${id} not found`);
        }
        return agreement;
    }
    async findByAgreementId(agreementId) {
        const agreement = await this.agreementRepository.findOne({
            where: { agreementId },
            relations: ['application', 'nsb'],
        });
        if (!agreement) {
            throw new common_1.NotFoundException(`Agreement with ID ${agreementId} not found`);
        }
        return agreement;
    }
    async getActiveAgreementsByNsb(nsbId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.agreementRepository.find({
            where: {
                nsbId,
                agreementStatus: enums_1.AgreementStatus.EXECUTED,
                licenseStartDate: (0, typeorm_2.LessThanOrEqual)(today),
                licenseEndDate: (0, typeorm_2.MoreThanOrEqual)(today),
            },
            relations: ['application'],
            order: { licenseEndDate: 'ASC' },
        });
    }
    async checkExpiringAgreements(daysBeforeExpiry = 30) {
        const today = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(today.getDate() + daysBeforeExpiry);
        return this.agreementRepository.find({
            where: {
                agreementStatus: enums_1.AgreementStatus.EXECUTED,
                licenseEndDate: (0, typeorm_2.Between)(today, expiryDate),
            },
            relations: ['nsb', 'application'],
        });
    }
    async generateAgreementId() {
        const year = new Date().getFullYear();
        const count = await this.agreementRepository.count({
            where: {
                agreementId: (0, typeorm_2.Like)(`LIC-NSB%-${year}-%`),
            },
        });
        const sequence = String(count + 1).padStart(6, '0');
        const subSequence = String(Math.floor(count / 1000) + 1).padStart(3, '0');
        return `LIC-NSB${sequence}-${year}-${subSequence}`;
    }
    generateDefaultTerms(application) {
        return `This license agreement governs the use of ARSO marks by ${application.nsbApplicantName} for the purposes specified in application ${application.applicationNumber}.`;
    }
    getDefaultFeeStructure() {
        return {
            annualFee: 0,
            royaltyPercentage: 0,
            paymentTerms: 'As specified in agreement',
        };
    }
    getDefaultPaymentSchedule() {
        return {
            frequency: 'ANNUAL',
            dueDate: 'First day of license year',
        };
    }
    getDefaultUsageRestrictions() {
        return 'Marks must be used in accordance with ACAP 1-1 Annex B requirements and ARSO brand guidelines.';
    }
    getDefaultTerminationClauses() {
        return 'This agreement may be terminated by either party with 30 days written notice, or immediately in case of breach.';
    }
};
exports.MarkLicenseAgreementService = MarkLicenseAgreementService;
exports.MarkLicenseAgreementService = MarkLicenseAgreementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mark_license_agreement_entity_1.MarkLicenseAgreement)),
    __param(1, (0, typeorm_1.InjectRepository)(mark_license_application_entity_1.MarkLicenseApplication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], MarkLicenseAgreementService);
//# sourceMappingURL=mark-license-agreement.service.js.map