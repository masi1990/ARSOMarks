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
exports.NsbCustomsBorderAgency = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("./nsb.entity");
let NsbCustomsBorderAgency = class NsbCustomsBorderAgency {
};
exports.NsbCustomsBorderAgency = NsbCustomsBorderAgency;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], NsbCustomsBorderAgency.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agency_name', length: 255 }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "agencyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_ministry', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "parentMinistry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_contact_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "acapVerificationContactName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coordinator_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "acapVerificationContactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coordinator_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "acapVerificationContactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'integration_status', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "integrationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'integration_details', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "integrationDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_available', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], NsbCustomsBorderAgency.prototype, "apiAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], NsbCustomsBorderAgency.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbCustomsBorderAgency.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbCustomsBorderAgency.prototype, "updatedAt", void 0);
exports.NsbCustomsBorderAgency = NsbCustomsBorderAgency = __decorate([
    (0, typeorm_1.Entity)('nsb_customs_border_agencies')
], NsbCustomsBorderAgency);
//# sourceMappingURL=nsb-customs-border-agency.entity.js.map