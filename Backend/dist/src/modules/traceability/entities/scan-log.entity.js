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
exports.ScanLog = void 0;
const typeorm_1 = require("typeorm");
const coc_entity_1 = require("./coc.entity");
const product_entity_1 = require("../../product-certification/entities/product.entity");
const product_certification_application_entity_1 = require("../../product-certification/entities/product-certification-application.entity");
let ScanLog = class ScanLog {
};
exports.ScanLog = ScanLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ScanLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coc_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "cocId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coc_entity_1.Coc, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'coc_id' }),
    __metadata("design:type", coc_entity_1.Coc)
], ScanLog.prototype, "coc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ScanLog.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], ScanLog.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip', length: 64, nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country', length: 100, nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', length: 100, nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lat', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], ScanLog.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lon', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], ScanLog.prototype, "lon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_agent', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result', length: 50, nullable: true }),
    __metadata("design:type", String)
], ScanLog.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], ScanLog.prototype, "createdAt", void 0);
exports.ScanLog = ScanLog = __decorate([
    (0, typeorm_1.Entity)('scan_logs')
], ScanLog);
//# sourceMappingURL=scan-log.entity.js.map