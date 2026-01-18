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
exports.OperatorBusinessSector = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
const enums_1 = require("../../../shared/enums");
let OperatorBusinessSector = class OperatorBusinessSector {
};
exports.OperatorBusinessSector = OperatorBusinessSector;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperatorBusinessSector.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid' }),
    __metadata("design:type", String)
], OperatorBusinessSector.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.Operator, (operator) => operator.businessSectors, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], OperatorBusinessSector.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'main_sector', type: 'enum', enum: enums_1.MainBusinessSector, nullable: true }),
    __metadata("design:type", String)
], OperatorBusinessSector.prototype, "mainSector", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_sector', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], OperatorBusinessSector.prototype, "subSector", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isic_code', length: 10, nullable: true }),
    __metadata("design:type", String)
], OperatorBusinessSector.prototype, "isicCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_categories', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], OperatorBusinessSector.prototype, "productCategories", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'percentage_revenue', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], OperatorBusinessSector.prototype, "percentageRevenue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sector_start_year', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], OperatorBusinessSector.prototype, "sectorStartYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sector_experience', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], OperatorBusinessSector.prototype, "sectorExperience", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorBusinessSector.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorBusinessSector.prototype, "updatedAt", void 0);
exports.OperatorBusinessSector = OperatorBusinessSector = __decorate([
    (0, typeorm_1.Entity)('operator_business_sectors')
], OperatorBusinessSector);
//# sourceMappingURL=operator-business-sector.entity.js.map