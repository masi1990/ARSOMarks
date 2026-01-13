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
exports.MarkLicenseAssetDownload = void 0;
const typeorm_1 = require("typeorm");
const mark_license_asset_entity_1 = require("./mark-license-asset.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkLicenseAssetDownload = class MarkLicenseAssetDownload {
};
exports.MarkLicenseAssetDownload = MarkLicenseAssetDownload;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicenseAssetDownload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asset_id' }),
    __metadata("design:type", String)
], MarkLicenseAssetDownload.prototype, "assetId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_license_asset_entity_1.MarkLicenseAsset, (asset) => asset.downloads, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'asset_id' }),
    __metadata("design:type", mark_license_asset_entity_1.MarkLicenseAsset)
], MarkLicenseAssetDownload.prototype, "asset", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path' }),
    __metadata("design:type", String)
], MarkLicenseAssetDownload.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'downloaded_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAssetDownload.prototype, "downloadedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'downloaded_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicenseAssetDownload.prototype, "downloadedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'downloaded_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicenseAssetDownload.prototype, "downloadedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAssetDownload.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_agent', type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkLicenseAssetDownload.prototype, "userAgent", void 0);
exports.MarkLicenseAssetDownload = MarkLicenseAssetDownload = __decorate([
    (0, typeorm_1.Entity)('mark_license_asset_downloads')
], MarkLicenseAssetDownload);
//# sourceMappingURL=mark-license-asset-download.entity.js.map