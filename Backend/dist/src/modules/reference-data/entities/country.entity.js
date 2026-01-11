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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const region_entity_1 = require("./region.entity");
const country_rec_membership_entity_1 = require("./country-rec-membership.entity");
const nsb_entity_1 = require("../../nsb-management/entities/nsb.entity");
let Country = class Country {
};
exports.Country = Country;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Country.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso_code', unique: true, length: 2 }),
    __metadata("design:type", String)
], Country.prototype, "isoCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'continent', length: 50, nullable: true }),
    __metadata("design:type", String)
], Country.prototype, "continent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'region_id', nullable: true }),
    __metadata("design:type", String)
], Country.prototype, "regionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, (region) => region.countries, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'region_id' }),
    __metadata("design:type", region_entity_1.Region)
], Country.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Country.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => country_rec_membership_entity_1.CountryRecMembership, (m) => m.country),
    __metadata("design:type", Array)
], Country.prototype, "recMemberships", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nsb_entity_1.Nsb, (nsb) => nsb.country),
    __metadata("design:type", Array)
], Country.prototype, "nsbs", void 0);
exports.Country = Country = __decorate([
    (0, typeorm_1.Entity)('countries')
], Country);
//# sourceMappingURL=country.entity.js.map