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
exports.NsbRegistrationRequestDocument = void 0;
const typeorm_1 = require("typeorm");
const nsb_registration_request_entity_1 = require("./nsb-registration-request.entity");
const enums_1 = require("../../../shared/enums");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let NsbRegistrationRequestDocument = class NsbRegistrationRequestDocument {
};
exports.NsbRegistrationRequestDocument = NsbRegistrationRequestDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_request_id' }),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "registrationRequestId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_registration_request_entity_1.NsbRegistrationRequest, (request) => request.documents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'registration_request_id' }),
    __metadata("design:type", nsb_registration_request_entity_1.NsbRegistrationRequest)
], NsbRegistrationRequestDocument.prototype, "registrationRequest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'enum', enum: enums_1.NsbDocumentType }),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', length: 255 }),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', length: 500 }),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_hash', length: 64 }),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "fileHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', type: 'bigint' }),
    __metadata("design:type", Number)
], NsbRegistrationRequestDocument.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', length: 100, nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], NsbRegistrationRequestDocument.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'uploaded_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], NsbRegistrationRequestDocument.prototype, "uploadedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'uploaded_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbRegistrationRequestDocument.prototype, "uploadedAt", void 0);
exports.NsbRegistrationRequestDocument = NsbRegistrationRequestDocument = __decorate([
    (0, typeorm_1.Entity)('nsb_registration_request_documents')
], NsbRegistrationRequestDocument);
//# sourceMappingURL=nsb-registration-request-document.entity.js.map