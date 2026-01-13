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
exports.MarkLicenseModificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mark_license_modification_entity_1 = require("../entities/mark-license-modification.entity");
const mark_license_agreement_entity_1 = require("../entities/mark-license-agreement.entity");
const enums_1 = require("../../../shared/enums");
let MarkLicenseModificationService = class MarkLicenseModificationService {
    constructor(modificationRepository, agreementRepository, dataSource) {
        this.modificationRepository = modificationRepository;
        this.agreementRepository = agreementRepository;
        this.dataSource = dataSource;
    }
    async requestModification(createDto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const license = await this.agreementRepository.findOne({
                where: { id: createDto.originalLicenseId },
            });
            if (!license) {
                throw new common_1.NotFoundException(`License with ID ${createDto.originalLicenseId} not found`);
            }
            const pendingModification = await this.modificationRepository.findOne({
                where: {
                    originalLicenseId: createDto.originalLicenseId,
                    status: enums_1.ModificationStatus.PENDING,
                },
            });
            if (pendingModification) {
                throw new common_1.BadRequestException('A pending modification request already exists. Please wait for it to be processed.');
            }
            const modification = this.modificationRepository.create({
                originalLicenseId: createDto.originalLicenseId,
                agreementId: license.agreementId,
                modificationTypes: createDto.modificationTypes,
                modificationReason: createDto.modificationReason,
                proposedChanges: createDto.proposedChanges,
                effectiveDateRequest: createDto.effectiveDateRequest,
                supportingJustificationPath: createDto.supportingJustificationPath,
                impactAssessment: createDto.impactAssessment,
                feeAdjustmentNeeded: createDto.feeAdjustmentNeeded,
                status: enums_1.ModificationStatus.PENDING,
                createdBy: userId,
                updatedBy: userId,
            });
            const savedModification = await queryRunner.manager.save(modification);
            await queryRunner.commitTransaction();
            return this.findById(savedModification.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async approveModification(modificationId, approveDto, userId) {
        const modification = await this.modificationRepository.findOne({
            where: { id: modificationId },
            relations: ['originalLicense'],
        });
        if (!modification) {
            throw new common_1.NotFoundException(`Modification with ID ${modificationId} not found`);
        }
        if (modification.status !== enums_1.ModificationStatus.PENDING) {
            throw new common_1.BadRequestException('Modification is not in pending status');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            modification.status = enums_1.ModificationStatus.APPROVED;
            modification.approvedAt = new Date();
            modification.reviewedBy = userId;
            modification.implementedChanges = approveDto.implementedChanges || {};
            if (modification.originalLicense) {
                await queryRunner.manager.save(modification.originalLicense);
            }
            await queryRunner.manager.save(modification);
            await queryRunner.commitTransaction();
            return this.findById(modification.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async rejectModification(modificationId, rejectDto, userId) {
        const modification = await this.modificationRepository.findOne({
            where: { id: modificationId },
        });
        if (!modification) {
            throw new common_1.NotFoundException(`Modification with ID ${modificationId} not found`);
        }
        if (modification.status !== enums_1.ModificationStatus.PENDING) {
            throw new common_1.BadRequestException('Modification is not in pending status');
        }
        modification.status = enums_1.ModificationStatus.REJECTED;
        modification.rejectedAt = new Date();
        modification.rejectionReason = rejectDto.rejectionReason;
        modification.reviewedBy = userId;
        modification.updatedBy = userId;
        return this.modificationRepository.save(modification);
    }
    async findById(id) {
        const modification = await this.modificationRepository.findOne({
            where: { id },
            relations: ['originalLicense', 'originalLicense.application'],
        });
        if (!modification) {
            throw new common_1.NotFoundException(`Modification with ID ${id} not found`);
        }
        return modification;
    }
    async getModificationHistory(licenseId) {
        return this.modificationRepository.find({
            where: { originalLicenseId: licenseId },
            relations: ['originalLicense'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.MarkLicenseModificationService = MarkLicenseModificationService;
exports.MarkLicenseModificationService = MarkLicenseModificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mark_license_modification_entity_1.MarkLicenseModification)),
    __param(1, (0, typeorm_1.InjectRepository)(mark_license_agreement_entity_1.MarkLicenseAgreement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], MarkLicenseModificationService);
//# sourceMappingURL=mark-license-modification.service.js.map