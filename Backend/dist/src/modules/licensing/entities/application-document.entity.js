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
exports.ApplicationDocument = void 0;
const typeorm_1 = require("typeorm");
const license_application_entity_1 = require("./license-application.entity");
const enums_1 = require("../../../shared/enums");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let ApplicationDocument = class ApplicationDocument {
};
exports.ApplicationDocument = ApplicationDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id' }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => license_application_entity_1.LicenseApplication, (app) => app.documents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", license_application_entity_1.LicenseApplication)
], ApplicationDocument.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'enum', enum: enums_1.DocumentType }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_category', length: 50, nullable: true }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "documentCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', length: 255 }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', length: 500 }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_hash', length: 64 }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "fileHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', type: 'bigint' }),
    __metadata("design:type", Number)
], ApplicationDocument.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', length: 100, nullable: true }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], ApplicationDocument.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_current', default: true }),
    __metadata("design:type", Boolean)
], ApplicationDocument.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'verification_status',
        type: 'enum',
        enum: enums_1.DocumentVerificationStatus,
        default: enums_1.DocumentVerificationStatus.PENDING,
    }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "verificationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verified_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "verifiedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'verified_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ApplicationDocument.prototype, "verifiedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verified_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ApplicationDocument.prototype, "verifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'uploaded_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ApplicationDocument.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_by', type: 'uuid' }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'uploaded_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ApplicationDocument.prototype, "uploadedByUser", void 0);
exports.ApplicationDocument = ApplicationDocument = __decorate([
    (0, typeorm_1.Entity)('application_documents')
], ApplicationDocument);
//# sourceMappingURL=application-document.entity.js.map