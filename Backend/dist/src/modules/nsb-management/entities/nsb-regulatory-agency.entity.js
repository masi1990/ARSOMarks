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
exports.NsbRegulatoryAgency = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("./nsb.entity");
const enums_1 = require("../../../shared/enums");
let NsbRegulatoryAgency = class NsbRegulatoryAgency {
};
exports.NsbRegulatoryAgency = NsbRegulatoryAgency;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], NsbRegulatoryAgency.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agency_name', length: 255 }),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "agencyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agency_type', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "agencyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_type_description', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "otherTypeDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "contactPersonName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "contactPersonEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbRegulatoryAgency.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], NsbRegulatoryAgency.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbRegulatoryAgency.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbRegulatoryAgency.prototype, "updatedAt", void 0);
exports.NsbRegulatoryAgency = NsbRegulatoryAgency = __decorate([
    (0, typeorm_1.Entity)('nsb_regulatory_agencies')
], NsbRegulatoryAgency);
//# sourceMappingURL=nsb-regulatory-agency.entity.js.map