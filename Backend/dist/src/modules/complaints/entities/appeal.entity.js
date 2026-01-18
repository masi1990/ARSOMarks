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
exports.Appeal = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const complaint_entity_1 = require("./complaint.entity");
let Appeal = class Appeal {
};
exports.Appeal = Appeal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Appeal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appeal_number', unique: true }),
    __metadata("design:type", String)
], Appeal.prototype, "appealNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'complaint_id', type: 'uuid' }),
    __metadata("design:type", String)
], Appeal.prototype, "complaintId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => complaint_entity_1.Complaint, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'complaint_id' }),
    __metadata("design:type", complaint_entity_1.Complaint)
], Appeal.prototype, "complaint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appellant_name' }),
    __metadata("design:type", String)
], Appeal.prototype, "appellantName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appellant_email' }),
    __metadata("design:type", String)
], Appeal.prototype, "appellantEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appellant_phone', nullable: true }),
    __metadata("design:type", String)
], Appeal.prototype, "appellantPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reason', type: 'text' }),
    __metadata("design:type", String)
], Appeal.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.AppealStatus, default: enums_1.AppealStatus.RECEIVED }),
    __metadata("design:type", String)
], Appeal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'decision_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appeal.prototype, "decisionNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Appeal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Appeal.prototype, "updatedAt", void 0);
exports.Appeal = Appeal = __decorate([
    (0, typeorm_1.Entity)('appeals')
], Appeal);
//# sourceMappingURL=appeal.entity.js.map