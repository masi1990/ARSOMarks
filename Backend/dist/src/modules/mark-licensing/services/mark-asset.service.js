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
exports.MarkAssetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mark_license_asset_entity_1 = require("../entities/mark-license-asset.entity");
const mark_license_asset_download_entity_1 = require("../entities/mark-license-asset-download.entity");
const mark_license_agreement_entity_1 = require("../entities/mark-license-agreement.entity");
const enums_1 = require("../../../shared/enums");
let MarkAssetService = class MarkAssetService {
    constructor(assetRepository, downloadRepository, agreementRepository, dataSource) {
        this.assetRepository = assetRepository;
        this.downloadRepository = downloadRepository;
        this.agreementRepository = agreementRepository;
        this.dataSource = dataSource;
    }
    async requestAssets(requestDto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const agreement = await this.agreementRepository.findOne({
                where: { id: requestDto.agreementId },
            });
            if (!agreement) {
                throw new common_1.NotFoundException(`Agreement with ID ${requestDto.agreementId} not found`);
            }
            if (agreement.agreementStatus !== enums_1.AgreementStatus.EXECUTED) {
                throw new common_1.BadRequestException('Agreement must be executed before requesting assets');
            }
            const asset = this.assetRepository.create({
                agreementId: requestDto.agreementId,
                requestedAssets: requestDto.requestedAssets,
                assetDeliveryMethod: requestDto.assetDeliveryMethod,
                assetRecipientName: requestDto.assetRecipientName,
                assetRecipientEmail: requestDto.assetRecipientEmail,
                assetUseConfirmation: requestDto.assetUseConfirmation,
                createdBy: userId,
            });
            const savedAsset = await queryRunner.manager.save(asset);
            await queryRunner.commitTransaction();
            return this.findById(savedAsset.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async deliverAssets(assetId, assetFiles, userId) {
        const asset = await this.assetRepository.findOne({
            where: { id: assetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException(`Asset with ID ${assetId} not found`);
        }
        asset.assetFiles = assetFiles;
        asset.deliveredAt = new Date();
        asset.deliveryMethodUsed = asset.assetDeliveryMethod;
        asset.updatedAt = new Date();
        return this.assetRepository.save(asset);
    }
    async trackDownload(assetId, filePath, userId, ipAddress, userAgent) {
        const asset = await this.assetRepository.findOne({
            where: { id: assetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException(`Asset with ID ${assetId} not found`);
        }
        const download = this.downloadRepository.create({
            assetId,
            filePath,
            downloadedBy: userId,
            ipAddress,
            userAgent,
        });
        asset.downloadCount = (asset.downloadCount || 0) + 1;
        await this.assetRepository.save(asset);
        return this.downloadRepository.save(download);
    }
    async findById(id) {
        const asset = await this.assetRepository.findOne({
            where: { id },
            relations: ['agreement', 'downloads'],
        });
        if (!asset) {
            throw new common_1.NotFoundException(`Asset with ID ${id} not found`);
        }
        return asset;
    }
    async getAssetLibrary(agreementId) {
        return this.assetRepository.find({
            where: { agreementId },
            relations: ['downloads'],
            order: { createdAt: 'DESC' },
        });
    }
    async getDownloadHistory(assetId) {
        return this.downloadRepository.find({
            where: { assetId },
            relations: ['downloadedByUser'],
            order: { downloadedAt: 'DESC' },
        });
    }
};
exports.MarkAssetService = MarkAssetService;
exports.MarkAssetService = MarkAssetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mark_license_asset_entity_1.MarkLicenseAsset)),
    __param(1, (0, typeorm_1.InjectRepository)(mark_license_asset_download_entity_1.MarkLicenseAssetDownload)),
    __param(2, (0, typeorm_1.InjectRepository)(mark_license_agreement_entity_1.MarkLicenseAgreement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], MarkAssetService);
//# sourceMappingURL=mark-asset.service.js.map