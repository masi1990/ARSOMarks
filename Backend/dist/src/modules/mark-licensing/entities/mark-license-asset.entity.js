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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkLicenseAsset = void 0;
const typeorm_1 = require("typeorm");
const mark_license_agreement_entity_1 = require("./mark-license-agreement.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
const mark_license_asset_download_entity_1 = require("./mark-license-asset-download.entity");
let MarkLicenseAsset = class MarkLicenseAsset {
};
exports.MarkLicenseAsset = MarkLicenseAsset;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicenseAsset.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agreement_id' }),
    __metadata("design:type", String)
], MarkLicenseAsset.prototype, "agreementId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_license_agreement_entity_1.MarkLicenseAgreement, (agreement) => agreement.assets, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'agreement_id' }),
    __metadata("design:type", mark_license_agreement_entity_1.MarkLicenseAgreement)
], MarkLicenseAsset.prototype, "agreement", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'asset_request_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseAsset.prototype, "assetRequestDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_assets', type: 'text', array: true }),
    __metadata("design:type", Array)
], MarkLicenseAsset.prototype, "requestedAssets", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'asset_delivery_method',
        type: 'enum',
        enum: enums_1.AssetDeliveryMethod,
    }),
    __metadata("design:type", String)
], MarkLicenseAsset.prototype, "assetDeliveryMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asset_recipient_name' }),
    __metadata("design:type", String)
], MarkLicenseAsset.prototype, "assetRecipientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asset_recipient_email' }),
    __metadata("design:type", String)
], MarkLicenseAsset.prototype, "assetRecipientEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asset_use_confirmation', default: false }),
    __metadata("design:type", Boolean)
], MarkLicenseAsset.prototype, "assetUseConfirmation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asset_files', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MarkLicenseAsset.prototype, "assetFiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivered_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MarkLicenseAsset.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'delivery_method_used',
        type: 'enum',
        enum: enums_1.AssetDeliveryMethod,
        nullable: true,
    }),
    __metadata("design:type", String)
], MarkLicenseAsset.prototype, "deliveryMethodUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'download_count', default: 0 }),
    __metadata("design:type", Number)
], MarkLicenseAsset.prototype, "downloadCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseAsset.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseAsset.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAsset.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseAsset.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mark_license_asset_download_entity_1.MarkLicenseAssetDownload, (download) => download.asset, { cascade: true }),
    __metadata("design:type", Array)
], MarkLicenseAsset.prototype, "downloads", void 0);
exports.MarkLicenseAsset = MarkLicenseAsset = __decorate([
    (0, typeorm_1.Entity)('mark_license_assets')
], MarkLicenseAsset);
//# sourceMappingURL=mark-license-asset.entity.js.map