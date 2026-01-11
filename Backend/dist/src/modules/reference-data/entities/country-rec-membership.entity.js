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
exports.CountryRecMembership = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("./country.entity");
const regional_economic_community_entity_1 = require("./regional-economic-community.entity");
const enums_1 = require("../../../shared/enums");
let CountryRecMembership = class CountryRecMembership {
};
exports.CountryRecMembership = CountryRecMembership;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CountryRecMembership.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", String)
], CountryRecMembership.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rec_id' }),
    __metadata("design:type", String)
], CountryRecMembership.prototype, "recId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'membership_status', type: 'enum', enum: enums_1.MembershipStatus, default: enums_1.MembershipStatus.MEMBER }),
    __metadata("design:type", String)
], CountryRecMembership.prototype, "membershipStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'joined_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], CountryRecMembership.prototype, "joinedDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CountryRecMembership.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.recMemberships, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], CountryRecMembership.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => regional_economic_community_entity_1.RegionalEconomicCommunity, (rec) => rec.memberships, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'rec_id' }),
    __metadata("design:type", regional_economic_community_entity_1.RegionalEconomicCommunity)
], CountryRecMembership.prototype, "rec", void 0);
exports.CountryRecMembership = CountryRecMembership = __decorate([
    (0, typeorm_1.Entity)('country_rec_memberships'),
    (0, typeorm_1.Unique)(['countryId', 'recId'])
], CountryRecMembership);
//# sourceMappingURL=country-rec-membership.entity.js.map