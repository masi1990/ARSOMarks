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
exports.MarkLicensePlacement = void 0;
const typeorm_1 = require("typeorm");
const mark_license_application_entity_1 = require("./mark-license-application.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkLicensePlacement = class MarkLicensePlacement {
};
exports.MarkLicensePlacement = MarkLicensePlacement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id' }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_license_application_entity_1.MarkLicenseApplication, (application) => application.placements, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", mark_license_application_entity_1.MarkLicenseApplication)
], MarkLicensePlacement.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path' }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_hash' }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "fileHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', type: 'bigint' }),
    __metadata("design:type", Number)
], MarkLicensePlacement.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', nullable: true }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_format', nullable: true }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "fileFormat", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'uploaded_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], MarkLicensePlacement.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkLicensePlacement.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'uploaded_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkLicensePlacement.prototype, "uploadedByUser", void 0);
exports.MarkLicensePlacement = MarkLicensePlacement = __decorate([
    (0, typeorm_1.Entity)('mark_license_placements')
], MarkLicensePlacement);
//# sourceMappingURL=mark-license-placement.entity.js.map