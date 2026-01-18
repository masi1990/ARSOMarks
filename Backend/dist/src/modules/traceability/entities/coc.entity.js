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
exports.Coc = exports.CocStatus = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../product-certification/entities/product.entity");
const product_certification_application_entity_1 = require("../../product-certification/entities/product-certification-application.entity");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const qr_token_entity_1 = require("./qr-token.entity");
const coc_status_history_entity_1 = require("./coc-status-history.entity");
var CocStatus;
(function (CocStatus) {
    CocStatus["ISSUED"] = "ISSUED";
    CocStatus["VALID"] = "VALID";
    CocStatus["EXPIRED"] = "EXPIRED";
    CocStatus["REVOKED"] = "REVOKED";
})(CocStatus || (exports.CocStatus = CocStatus = {}));
let Coc = class Coc {
};
exports.Coc = Coc;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Coc.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coc_number', length: 100, unique: true }),
    __metadata("design:type", String)
], Coc.prototype, "cocNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'uuid' }),
    __metadata("design:type", String)
], Coc.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.cocs, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Coc.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id', type: 'uuid' }),
    __metadata("design:type", String)
], Coc.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_certification_application_entity_1.ProductCertificationApplication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", product_certification_application_entity_1.ProductCertificationApplication)
], Coc.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'enum', enum: CocStatus, default: CocStatus.ISSUED }),
    __metadata("design:type", String)
], Coc.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'public_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Coc.prototype, "publicUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_payload_sig', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Coc.prototype, "qrPayloadSig", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issued_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Coc.prototype, "issuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Coc.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'revoked_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Coc.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'checksum', length: 12, nullable: true }),
    __metadata("design:type", String)
], Coc.prototype, "checksum", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origin_country_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Coc.prototype, "originCountryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'origin_country_id' }),
    __metadata("design:type", country_entity_1.Country)
], Coc.prototype, "originCountry", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Coc.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Coc.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qr_token_entity_1.QrToken, (token) => token.coc),
    __metadata("design:type", Array)
], Coc.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coc_status_history_entity_1.CocStatusHistory, (history) => history.coc),
    __metadata("design:type", Array)
], Coc.prototype, "history", void 0);
exports.Coc = Coc = __decorate([
    (0, typeorm_1.Entity)('cocs')
], Coc);
//# sourceMappingURL=coc.entity.js.map