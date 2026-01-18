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
exports.ProductStandard = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../product-certification/entities/product.entity");
const standard_entity_1 = require("./standard.entity");
const product_certification_application_entity_1 = require("../../product-certification/entities/product-certification-application.entity");
let ProductStandard = class ProductStandard {
};
exports.ProductStandard = ProductStandard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductStandard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProductStandard.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.standards, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductStandard.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'standard_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProductStandard.prototype, "standardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => standard_entity_1.Standard, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'standard_id' }),
    __metadata("design:type", standard_entity_1.Standard)
], ProductStandard.prototype, "standard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certification_application_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductStandard.prototype, "certificationApplicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'certification_application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], ProductStandard.prototype, "certificationApplication", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductStandard.prototype, "createdAt", void 0);
exports.ProductStandard = ProductStandard = __decorate([
    (0, typeorm_1.Entity)('product_standards')
], ProductStandard);
//# sourceMappingURL=product-standard.entity.js.map