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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const product_certification_application_entity_1 = require("./product-certification-application.entity");
const product_technical_spec_entity_1 = require("./product-technical-spec.entity");
const product_environmental_claim_entity_1 = require("./product-environmental-claim.entity");
const enums_1 = require("../../../shared/enums");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const product_standard_entity_1 = require("../../traceability/entities/product-standard.entity");
const coc_entity_1 = require("../../traceability/entities/coc.entity");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid' }),
    __metadata("design:type", String)
], Product.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, (application) => application.products, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], Product.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_name', length: 200 }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_scientific_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "productScientificName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_name', length: 100 }),
    __metadata("design:type", String)
], Product.prototype, "brandName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'model_variant', length: 100 }),
    __metadata("design:type", String)
], Product.prototype, "modelVariant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_code', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "productCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hs_code', length: 12 }),
    __metadata("design:type", String)
], Product.prototype, "hsCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hs_description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "hsDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_category', type: 'enum', enum: enums_1.ProductCategory }),
    __metadata("design:type", String)
], Product.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_description', type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "productDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'intended_use', type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "intendedUse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'key_features', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "keyFeatures", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unique_selling_point', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "uniqueSellingPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'intended_markets', type: 'uuid', array: true, nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "intendedMarkets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_target_market', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "primaryTargetMarketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origin_country_id', type: 'uuid', nullable: true, select: false, insert: false, update: false }),
    __metadata("design:type", String)
], Product.prototype, "originCountryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'origin_country_id' }),
    __metadata("design:type", country_entity_1.Country)
], Product.prototype, "originCountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_consumers', type: 'enum', enum: enums_1.TargetConsumerGroup, array: true }),
    __metadata("design:type", Array)
], Product.prototype, "targetConsumers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consumer_warnings', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "consumerWarnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shelf_life', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "shelfLife", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'storage_conditions', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "storageConditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_weight', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "unitWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dimensions', length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "dimensions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'color', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'material_composition', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "materialComposition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'packaging_type', type: 'enum', enum: enums_1.PackagingType }),
    __metadata("design:type", String)
], Product.prototype, "packagingType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'packaging_material', length: 100 }),
    __metadata("design:type", String)
], Product.prototype, "packagingMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'packaging_weight', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "packagingWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'units_per_package', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "unitsPerPackage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_technical_spec_entity_1.ProductTechnicalSpec, (spec) => spec.product, { cascade: true }),
    __metadata("design:type", product_technical_spec_entity_1.ProductTechnicalSpec)
], Product.prototype, "technicalSpec", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_environmental_claim_entity_1.ProductEnvironmentalClaim, (claim) => claim.product, { cascade: true }),
    __metadata("design:type", product_environmental_claim_entity_1.ProductEnvironmentalClaim)
], Product.prototype, "environmentalClaim", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_standard_entity_1.ProductStandard, (productStandard) => productStandard.product),
    __metadata("design:type", Array)
], Product.prototype, "standards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coc_entity_1.Coc, (coc) => coc.product),
    __metadata("design:type", Array)
], Product.prototype, "cocs", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=product.entity.js.map