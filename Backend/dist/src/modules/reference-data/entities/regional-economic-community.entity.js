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
exports.RegionalEconomicCommunity = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("./country.entity");
const country_rec_membership_entity_1 = require("./country-rec-membership.entity");
let RegionalEconomicCommunity = class RegionalEconomicCommunity {
};
exports.RegionalEconomicCommunity = RegionalEconomicCommunity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RegionalEconomicCommunity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 10 }),
    __metadata("design:type", String)
], RegionalEconomicCommunity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], RegionalEconomicCommunity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RegionalEconomicCommunity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'headquarters_country_id', nullable: true }),
    __metadata("design:type", String)
], RegionalEconomicCommunity.prototype, "headquartersCountryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'headquarters_country_id' }),
    __metadata("design:type", country_entity_1.Country)
], RegionalEconomicCommunity.prototype, "headquartersCountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'established_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], RegionalEconomicCommunity.prototype, "establishedDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RegionalEconomicCommunity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => country_rec_membership_entity_1.CountryRecMembership, (m) => m.rec),
    __metadata("design:type", Array)
], RegionalEconomicCommunity.prototype, "memberships", void 0);
exports.RegionalEconomicCommunity = RegionalEconomicCommunity = __decorate([
    (0, typeorm_1.Entity)('regional_economic_communities')
], RegionalEconomicCommunity);
//# sourceMappingURL=regional-economic-community.entity.js.map