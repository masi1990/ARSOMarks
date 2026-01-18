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
exports.Laboratory = void 0;
const typeorm_1 = require("typeorm");
const accreditation_body_entity_1 = require("../../reference-data/entities/accreditation-body.entity");
const country_entity_1 = require("../../reference-data/entities/country.entity");
let Laboratory = class Laboratory {
};
exports.Laboratory = Laboratory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Laboratory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Laboratory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Laboratory.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], Laboratory.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_body_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Laboratory.prototype, "accreditationBodyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accreditation_body_entity_1.AccreditationBody, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'accreditation_body_id' }),
    __metadata("design:type", accreditation_body_entity_1.AccreditationBody)
], Laboratory.prototype, "accreditationBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], Laboratory.prototype, "accreditationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_accredited', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Laboratory.prototype, "isAccredited", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scope', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Laboratory.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Laboratory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Laboratory.prototype, "updatedAt", void 0);
exports.Laboratory = Laboratory = __decorate([
    (0, typeorm_1.Entity)('laboratories')
], Laboratory);
//# sourceMappingURL=laboratory.entity.js.map