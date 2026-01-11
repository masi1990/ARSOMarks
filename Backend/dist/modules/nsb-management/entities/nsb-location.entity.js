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
exports.NsbLocation = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("./nsb.entity");
const enums_1 = require("../../../shared/enums");
const country_entity_1 = require("../../reference-data/entities/country.entity");
let NsbLocation = class NsbLocation {
};
exports.NsbLocation = NsbLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbLocation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], NsbLocation.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, (nsb) => nsb.locations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], NsbLocation.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location_type', type: 'enum', enum: enums_1.NsbLocationType }),
    __metadata("design:type", String)
], NsbLocation.prototype, "locationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line_1', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbLocation.prototype, "addressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line_2', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbLocation.prototype, "addressLine2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], NsbLocation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_province', length: 100, nullable: true }),
    __metadata("design:type", String)
], NsbLocation.prototype, "stateProvince", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbLocation.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', nullable: true }),
    __metadata("design:type", String)
], NsbLocation.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], NsbLocation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], NsbLocation.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], NsbLocation.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', default: false }),
    __metadata("design:type", Boolean)
], NsbLocation.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbLocation.prototype, "createdAt", void 0);
exports.NsbLocation = NsbLocation = __decorate([
    (0, typeorm_1.Entity)('nsb_locations')
], NsbLocation);
//# sourceMappingURL=nsb-location.entity.js.map