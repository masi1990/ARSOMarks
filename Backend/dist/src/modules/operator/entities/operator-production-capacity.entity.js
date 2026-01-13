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
exports.OperatorProductionCapacity = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
const enums_1 = require("../../../shared/enums");
let OperatorProductionCapacity = class OperatorProductionCapacity {
};
exports.OperatorProductionCapacity = OperatorProductionCapacity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperatorProductionCapacity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], OperatorProductionCapacity.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_entity_1.Operator, (operator) => operator.productionCapacity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], OperatorProductionCapacity.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'production_capacity', type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], OperatorProductionCapacity.prototype, "productionCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'capacity_unit', length: 20 }),
    __metadata("design:type", String)
], OperatorProductionCapacity.prototype, "capacityUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'capacity_utilization', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], OperatorProductionCapacity.prototype, "capacityUtilization", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quality_management', length: 20 }),
    __metadata("design:type", String)
], OperatorProductionCapacity.prototype, "qualityManagement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qms_type', type: 'enum', enum: enums_1.QMSType, nullable: true }),
    __metadata("design:type", String)
], OperatorProductionCapacity.prototype, "qmsType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certification_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], OperatorProductionCapacity.prototype, "certificationCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'existing_certifications', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OperatorProductionCapacity.prototype, "existingCertifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'technical_staff', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], OperatorProductionCapacity.prototype, "technicalStaff", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorProductionCapacity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorProductionCapacity.prototype, "updatedAt", void 0);
exports.OperatorProductionCapacity = OperatorProductionCapacity = __decorate([
    (0, typeorm_1.Entity)('operator_production_capacity')
], OperatorProductionCapacity);
//# sourceMappingURL=operator-production-capacity.entity.js.map