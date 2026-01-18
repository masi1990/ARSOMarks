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
exports.CocStatusHistory = void 0;
const typeorm_1 = require("typeorm");
const coc_entity_1 = require("./coc.entity");
const product_certification_application_entity_1 = require("../../product-certification/entities/product-certification-application.entity");
let CocStatusHistory = class CocStatusHistory {
};
exports.CocStatusHistory = CocStatusHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CocStatusHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coc_id', type: 'uuid' }),
    __metadata("design:type", String)
], CocStatusHistory.prototype, "cocId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coc_entity_1.Coc, (coc) => coc.history, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'coc_id' }),
    __metadata("design:type", coc_entity_1.Coc)
], CocStatusHistory.prototype, "coc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CocStatusHistory.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], CocStatusHistory.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event', length: 50 }),
    __metadata("design:type", String)
], CocStatusHistory.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CocStatusHistory.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actor_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CocStatusHistory.prototype, "actorId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], CocStatusHistory.prototype, "createdAt", void 0);
exports.CocStatusHistory = CocStatusHistory = __decorate([
    (0, typeorm_1.Entity)('coc_status_history')
], CocStatusHistory);
//# sourceMappingURL=coc-status-history.entity.js.map