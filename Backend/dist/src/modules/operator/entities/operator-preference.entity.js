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
exports.OperatorPreference = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
const enums_1 = require("../../../shared/enums");
let OperatorPreference = class OperatorPreference {
};
exports.OperatorPreference = OperatorPreference;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperatorPreference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], OperatorPreference.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_entity_1.Operator, (operator) => operator.preferences, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], OperatorPreference.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferred_language', type: 'enum', enum: enums_1.PreferredLanguage, default: enums_1.PreferredLanguage.ENGLISH }),
    __metadata("design:type", String)
], OperatorPreference.prototype, "preferredLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'communication_preferences', type: 'enum', enum: enums_1.CommunicationPreference, array: true }),
    __metadata("design:type", Array)
], OperatorPreference.prototype, "communicationPreferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notification_frequency', type: 'enum', enum: enums_1.NotificationFrequency, default: enums_1.NotificationFrequency.DAILY_DIGEST }),
    __metadata("design:type", String)
], OperatorPreference.prototype, "notificationFrequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], OperatorPreference.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: 'USD' }),
    __metadata("design:type", String)
], OperatorPreference.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorPreference.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorPreference.prototype, "updatedAt", void 0);
exports.OperatorPreference = OperatorPreference = __decorate([
    (0, typeorm_1.Entity)('operator_preferences')
], OperatorPreference);
//# sourceMappingURL=operator-preference.entity.js.map