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
exports.CbApplicationDocument = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const cb_application_entity_1 = require("./cb-application.entity");
let CbApplicationDocument = class CbApplicationDocument {
};
exports.CbApplicationDocument = CbApplicationDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id' }),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cb_application_entity_1.CbApplication, (app) => app.documents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", cb_application_entity_1.CbApplication)
], CbApplicationDocument.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'enum', enum: enums_1.CbDocumentType }),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', length: 255 }),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', length: 500 }),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_hash', length: 64 }),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "fileHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', type: 'bigint' }),
    __metadata("design:type", Number)
], CbApplicationDocument.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', length: 100, nullable: true }),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CbApplicationDocument.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'uploaded_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], CbApplicationDocument.prototype, "uploadedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'uploaded_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CbApplicationDocument.prototype, "uploadedAt", void 0);
exports.CbApplicationDocument = CbApplicationDocument = __decorate([
    (0, typeorm_1.Entity)('cb_application_documents')
], CbApplicationDocument);
//# sourceMappingURL=cb-application-document.entity.js.map