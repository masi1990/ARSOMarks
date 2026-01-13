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
exports.ProductEnvironmentalClaim = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const enums_1 = require("../../../shared/enums");
let ProductEnvironmentalClaim = class ProductEnvironmentalClaim {
};
exports.ProductEnvironmentalClaim = ProductEnvironmentalClaim;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product, (product) => product.environmentalClaim, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductEnvironmentalClaim.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'environmental_benefits', type: 'enum', enum: enums_1.EnvironmentalBenefit, array: true }),
    __metadata("design:type", Array)
], ProductEnvironmentalClaim.prototype, "environmentalBenefits", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'benefit_quantification', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ProductEnvironmentalClaim.prototype, "benefitQuantification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'eco_claims_supporting', type: 'text' }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "ecoClaimsSupporting", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'third_party_verification', type: 'enum', enum: enums_1.ThirdPartyVerificationStatus }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "thirdPartyVerification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verifier_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "verifierName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lifecycle_aspects', type: 'enum', enum: enums_1.LifecycleAspect, array: true }),
    __metadata("design:type", Array)
], ProductEnvironmentalClaim.prototype, "lifecycleAspects", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lifecycle_assessment', type: 'enum', enum: enums_1.LifecycleAssessmentType }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "lifecycleAssessment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'carbon_footprint', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductEnvironmentalClaim.prototype, "carbonFootprint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'carbon_value', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ProductEnvironmentalClaim.prototype, "carbonValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'environmental_management', type: 'enum', enum: enums_1.EnvironmentalManagementSystem }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "environmentalManagement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'environmental_policy', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductEnvironmentalClaim.prototype, "environmentalPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'waste_management', type: 'text' }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "wasteManagement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recycling_info', type: 'text' }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "recyclingInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'take_back_program', type: 'enum', enum: enums_1.TakeBackProgramStatus }),
    __metadata("design:type", String)
], ProductEnvironmentalClaim.prototype, "takeBackProgram", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductEnvironmentalClaim.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductEnvironmentalClaim.prototype, "updatedAt", void 0);
exports.ProductEnvironmentalClaim = ProductEnvironmentalClaim = __decorate([
    (0, typeorm_1.Entity)('product_environmental_claims')
], ProductEnvironmentalClaim);
//# sourceMappingURL=product-environmental-claim.entity.js.map