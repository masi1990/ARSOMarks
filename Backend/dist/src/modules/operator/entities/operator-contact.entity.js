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
exports.OperatorContact = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
const enums_1 = require("../../../shared/enums");
let OperatorContact = class OperatorContact {
};
exports.OperatorContact = OperatorContact;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperatorContact.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid' }),
    __metadata("design:type", String)
], OperatorContact.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.Operator, (operator) => operator.contacts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], OperatorContact.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_type', type: 'enum', enum: enums_1.OperatorContactType, default: enums_1.OperatorContactType.PRIMARY }),
    __metadata("design:type", String)
], OperatorContact.prototype, "contactType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_contact', length: 100 }),
    __metadata("design:type", String)
], OperatorContact.prototype, "primaryContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_position', length: 100 }),
    __metadata("design:type", String)
], OperatorContact.prototype, "contactPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email', length: 150 }),
    __metadata("design:type", String)
], OperatorContact.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email_verified', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OperatorContact.prototype, "contactEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email_verification_token', length: 255, nullable: true }),
    __metadata("design:type", String)
], OperatorContact.prototype, "contactEmailVerificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email_verified_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OperatorContact.prototype, "contactEmailVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone', length: 20 }),
    __metadata("design:type", String)
], OperatorContact.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone_verified', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OperatorContact.prototype, "contactPhoneVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone_verification_code', length: 10, nullable: true }),
    __metadata("design:type", String)
], OperatorContact.prototype, "contactPhoneVerificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone_verified_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OperatorContact.prototype, "contactPhoneVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alt_contact', length: 100, nullable: true }),
    __metadata("design:type", String)
], OperatorContact.prototype, "altContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alt_email', length: 150, nullable: true }),
    __metadata("design:type", String)
], OperatorContact.prototype, "altEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alt_phone', length: 20, nullable: true }),
    __metadata("design:type", String)
], OperatorContact.prototype, "altPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OperatorContact.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorContact.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorContact.prototype, "updatedAt", void 0);
exports.OperatorContact = OperatorContact = __decorate([
    (0, typeorm_1.Entity)('operator_contacts')
], OperatorContact);
//# sourceMappingURL=operator-contact.entity.js.map