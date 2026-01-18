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
exports.ProductCertificationCbChangeRequest = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const product_certification_application_entity_1 = require("./product-certification-application.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let ProductCertificationCbChangeRequest = class ProductCertificationCbChangeRequest {
};
exports.ProductCertificationCbChangeRequest = ProductCertificationCbChangeRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], ProductCertificationCbChangeRequest.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_cb_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "currentCbId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_cb_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "requestedCbId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "justification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'penalty_policy', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "penaltyPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.CbChangeRequestStatus, default: enums_1.CbChangeRequestStatus.PENDING }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "requestedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'requested_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ProductCertificationCbChangeRequest.prototype, "requestedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'reviewed_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], ProductCertificationCbChangeRequest.prototype, "reviewedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProductCertificationCbChangeRequest.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'decision_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCertificationCbChangeRequest.prototype, "decisionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationCbChangeRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductCertificationCbChangeRequest.prototype, "updatedAt", void 0);
exports.ProductCertificationCbChangeRequest = ProductCertificationCbChangeRequest = __decorate([
    (0, typeorm_1.Entity)('product_certification_cb_change_requests')
], ProductCertificationCbChangeRequest);
//# sourceMappingURL=product-certification-cb-change-request.entity.js.map