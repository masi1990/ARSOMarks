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
exports.AccreditationBody = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("./country.entity");
let AccreditationBody = class AccreditationBody {
};
exports.AccreditationBody = AccreditationBody;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AccreditationBody.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], AccreditationBody.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', nullable: true }),
    __metadata("design:type", String)
], AccreditationBody.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], AccreditationBody.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_frac_mra_signatory', default: false }),
    __metadata("design:type", Boolean)
], AccreditationBody.prototype, "isFracMraSignatory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mra_scope', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AccreditationBody.prototype, "mraScope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_details', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AccreditationBody.prototype, "contactDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], AccreditationBody.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AccreditationBody.prototype, "createdAt", void 0);
exports.AccreditationBody = AccreditationBody = __decorate([
    (0, typeorm_1.Entity)('accreditation_bodies')
], AccreditationBody);
//# sourceMappingURL=accreditation-body.entity.js.map