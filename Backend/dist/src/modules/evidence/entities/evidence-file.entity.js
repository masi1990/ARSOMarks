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
exports.EvidenceFile = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
let EvidenceFile = class EvidenceFile {
};
exports.EvidenceFile = EvidenceFile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EvidenceFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_type', type: 'enum', enum: enums_1.EvidenceParentType, enumName: 'evidence_parent_type' }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "parentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', type: 'uuid' }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_name', type: 'text' }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stored_name', type: 'text' }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "storedName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stored_path', type: 'text' }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "storedPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', type: 'text' }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], EvidenceFile.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EvidenceFile.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], EvidenceFile.prototype, "createdAt", void 0);
exports.EvidenceFile = EvidenceFile = __decorate([
    (0, typeorm_1.Entity)('evidence_files'),
    (0, typeorm_1.Index)(['parentType', 'parentId'])
], EvidenceFile);
//# sourceMappingURL=evidence-file.entity.js.map