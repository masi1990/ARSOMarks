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
exports.OperatorConsent = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
let OperatorConsent = class OperatorConsent {
};
exports.OperatorConsent = OperatorConsent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperatorConsent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], OperatorConsent.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_entity_1.Operator, (operator) => operator.consents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], OperatorConsent.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_consent', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorConsent.prototype, "dataConsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_sharing_consent', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorConsent.prototype, "dataSharingConsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cross_border_data', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorConsent.prototype, "crossBorderData", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'terms_acceptance', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorConsent.prototype, "termsAcceptance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marketing_consent', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorConsent.prototype, "marketingConsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sms_consent', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorConsent.prototype, "smsConsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'whatsapp_consent', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorConsent.prototype, "whatsappConsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'declaration_signature', length: 100, nullable: true }),
    __metadata("design:type", String)
], OperatorConsent.prototype, "declarationSignature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'declaration_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], OperatorConsent.prototype, "declarationDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorConsent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorConsent.prototype, "updatedAt", void 0);
exports.OperatorConsent = OperatorConsent = __decorate([
    (0, typeorm_1.Entity)('operator_consents')
], OperatorConsent);
//# sourceMappingURL=operator-consent.entity.js.map