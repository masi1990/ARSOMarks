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
exports.NsbMarketSurveillanceAuthority = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("./nsb.entity");
const enums_1 = require("../../../shared/enums");
let NsbMarketSurveillanceAuthority = class NsbMarketSurveillanceAuthority {
};
exports.NsbMarketSurveillanceAuthority = NsbMarketSurveillanceAuthority;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], NsbMarketSurveillanceAuthority.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agency_name', length: 255 }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "agencyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "jurisdiction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_name', length: 255 }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "contactPersonName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "contactPersonEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scope_of_authority', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "scopeOfAuthority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mou_status', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "mouStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mou_document_path', length: 500, nullable: true }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "mouDocumentPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mou_document_hash', length: 64, nullable: true }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "mouDocumentHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'access_level', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbMarketSurveillanceAuthority.prototype, "systemAccessLevelRequested", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], NsbMarketSurveillanceAuthority.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbMarketSurveillanceAuthority.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbMarketSurveillanceAuthority.prototype, "updatedAt", void 0);
exports.NsbMarketSurveillanceAuthority = NsbMarketSurveillanceAuthority = __decorate([
    (0, typeorm_1.Entity)('nsb_market_surveillance_authorities')
], NsbMarketSurveillanceAuthority);
//# sourceMappingURL=nsb-market-surveillance-authority.entity.js.map