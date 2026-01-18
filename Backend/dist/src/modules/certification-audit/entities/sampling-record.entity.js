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
exports.SamplingRecord = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const certification_audit_entity_1 = require("./certification-audit.entity");
const test_result_entity_1 = require("./test-result.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let SamplingRecord = class SamplingRecord {
};
exports.SamplingRecord = SamplingRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SamplingRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audit_id', type: 'uuid' }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "auditId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => certification_audit_entity_1.CertificationAudit, (audit) => audit.samplingRecords, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'audit_id' }),
    __metadata("design:type", certification_audit_entity_1.CertificationAudit)
], SamplingRecord.prototype, "audit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.SamplingStatus, default: enums_1.SamplingStatus.PENDING }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sampling_method', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "samplingMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sampling_location', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "samplingLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], SamplingRecord.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity_unit', length: 30, nullable: true }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "quantityUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "traceability", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sampled_at', type: 'date', nullable: true }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "sampledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SamplingRecord.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], SamplingRecord.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SamplingRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SamplingRecord.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => test_result_entity_1.TestResult, (result) => result.sampling, { cascade: true }),
    __metadata("design:type", Array)
], SamplingRecord.prototype, "testResults", void 0);
exports.SamplingRecord = SamplingRecord = __decorate([
    (0, typeorm_1.Entity)('sampling_records')
], SamplingRecord);
//# sourceMappingURL=sampling-record.entity.js.map