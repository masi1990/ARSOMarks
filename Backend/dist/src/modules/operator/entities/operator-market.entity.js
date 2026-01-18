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
exports.OperatorMarket = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const enums_1 = require("../../../shared/enums");
let OperatorMarket = class OperatorMarket {
};
exports.OperatorMarket = OperatorMarket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperatorMarket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], OperatorMarket.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => operator_entity_1.Operator, (operator) => operator.markets, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], OperatorMarket.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'domestic_markets', type: 'enum', enum: enums_1.DomesticMarketType, array: true, nullable: true }),
    __metadata("design:type", Array)
], OperatorMarket.prototype, "domesticMarkets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'export_markets', type: 'uuid', array: true, nullable: true }),
    __metadata("design:type", Array)
], OperatorMarket.prototype, "exportMarkets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_export_market', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], OperatorMarket.prototype, "primaryExportMarketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'primary_export_market' }),
    __metadata("design:type", country_entity_1.Country)
], OperatorMarket.prototype, "primaryExportMarket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'export_start_year', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], OperatorMarket.prototype, "exportStartYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'import_sources', type: 'uuid', array: true, nullable: true }),
    __metadata("design:type", Array)
], OperatorMarket.prototype, "importSources", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'afcfta_awareness', length: 20, nullable: true }),
    __metadata("design:type", String)
], OperatorMarket.prototype, "afcftaAwareness", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trade_challenges', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OperatorMarket.prototype, "tradeChallenges", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorMarket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorMarket.prototype, "updatedAt", void 0);
exports.OperatorMarket = OperatorMarket = __decorate([
    (0, typeorm_1.Entity)('operator_markets')
], OperatorMarket);
//# sourceMappingURL=operator-market.entity.js.map