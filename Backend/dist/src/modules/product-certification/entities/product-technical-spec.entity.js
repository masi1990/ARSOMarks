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
exports.ProductTechnicalSpec = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const enums_1 = require("../../../shared/enums");
let ProductTechnicalSpec = class ProductTechnicalSpec {
};
exports.ProductTechnicalSpec = ProductTechnicalSpec;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product, (product) => product.technicalSpec, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductTechnicalSpec.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'applicable_standards', type: 'text', array: true }),
    __metadata("design:type", Array)
], ProductTechnicalSpec.prototype, "applicableStandards", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mandatory_standards', type: 'text', array: true }),
    __metadata("design:type", Array)
], ProductTechnicalSpec.prototype, "mandatoryStandards", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'voluntary_standards', type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], ProductTechnicalSpec.prototype, "voluntaryStandards", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'standard_status', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ProductTechnicalSpec.prototype, "standardStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'regulatory_body', length: 200 }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "regulatoryBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'regulatory_approval', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "regulatoryApproval", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'technical_docs_available', type: 'enum', enum: enums_1.TechnicalDocsStatus }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "technicalDocsAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'missing_documents', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "missingDocuments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'test_reports_available', type: 'enum', enum: enums_1.TestReportsAvailability }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "testReportsAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'test_coverage', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ProductTechnicalSpec.prototype, "testCoverage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'manufacturing_process', type: 'text' }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "manufacturingProcess", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'process_flow_diagram', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductTechnicalSpec.prototype, "processFlowDiagram", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'key_components', type: 'text' }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "keyComponents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'critical_components', type: 'text' }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "criticalComponents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'component_sources', type: 'text' }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "componentSources", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_list_available', length: 20, nullable: true }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "supplierListAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'traceability_system', type: 'enum', enum: enums_1.TraceabilityStatus }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "traceabilitySystem", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'batch_traceability', type: 'enum', enum: enums_1.TraceabilityStatus }),
    __metadata("design:type", String)
], ProductTechnicalSpec.prototype, "batchTraceability", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductTechnicalSpec.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductTechnicalSpec.prototype, "updatedAt", void 0);
exports.ProductTechnicalSpec = ProductTechnicalSpec = __decorate([
    (0, typeorm_1.Entity)('product_technical_specs')
], ProductTechnicalSpec);
//# sourceMappingURL=product-technical-spec.entity.js.map