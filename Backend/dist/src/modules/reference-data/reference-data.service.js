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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const country_entity_1 = require("./entities/country.entity");
const region_entity_1 = require("./entities/region.entity");
const regional_economic_community_entity_1 = require("./entities/regional-economic-community.entity");
const country_rec_membership_entity_1 = require("./entities/country-rec-membership.entity");
const acap_scheme_entity_1 = require("./entities/acap-scheme.entity");
const accreditation_body_entity_1 = require("./entities/accreditation-body.entity");
const enums_1 = require("../../shared/enums");
let ReferenceDataService = class ReferenceDataService {
    constructor(countryRepo, regionRepo, recRepo, membershipRepo, acapRepo, accreditationRepo) {
        this.countryRepo = countryRepo;
        this.regionRepo = regionRepo;
        this.recRepo = recRepo;
        this.membershipRepo = membershipRepo;
        this.acapRepo = acapRepo;
        this.accreditationRepo = accreditationRepo;
    }
    mapCountryResponse(country) {
        var _a, _b;
        const recIds = (_b = (_a = country === null || country === void 0 ? void 0 : country.recMemberships) === null || _a === void 0 ? void 0 : _a.map((m) => m.recId)) !== null && _b !== void 0 ? _b : [];
        const { recMemberships } = country, rest = __rest(country, ["recMemberships"]);
        return Object.assign(Object.assign({}, rest), { recIds });
    }
    async getCountries() {
        const countries = await this.countryRepo.find({
            relations: ['recMemberships'],
            order: { name: 'ASC' },
        });
        return countries.map((country) => this.mapCountryResponse(country));
    }
    async getCountry(id) {
        const country = await this.countryRepo.findOne({
            where: { id },
            relations: ['recMemberships'],
        });
        if (!country)
            throw new common_1.NotFoundException('Country not found');
        return this.mapCountryResponse(country);
    }
    async createCountry(dto) {
        return this.countryRepo.manager.transaction(async (manager) => {
            var _a;
            const country = manager.create(country_entity_1.Country, {
                isoCode: dto.isoCode,
                name: dto.name,
                regionId: dto.regionId,
                continent: dto.continent,
            });
            const saved = await manager.save(country);
            if ((_a = dto.recIds) === null || _a === void 0 ? void 0 : _a.length) {
                const memberships = dto.recIds.map((recId) => manager.create(country_rec_membership_entity_1.CountryRecMembership, {
                    countryId: saved.id,
                    recId,
                    membershipStatus: enums_1.MembershipStatus.MEMBER,
                }));
                await manager.save(memberships);
                saved.recMemberships = memberships;
            }
            else {
                saved.recMemberships = [];
            }
            return this.mapCountryResponse(saved);
        });
    }
    async updateCountry(id, dto) {
        return this.countryRepo.manager.transaction(async (manager) => {
            var _a, _b, _c, _d;
            const country = await manager.findOne(country_entity_1.Country, { where: { id } });
            if (!country)
                throw new common_1.NotFoundException('Country not found');
            country.isoCode = (_a = dto.isoCode) !== null && _a !== void 0 ? _a : country.isoCode;
            country.name = (_b = dto.name) !== null && _b !== void 0 ? _b : country.name;
            country.regionId = (_c = dto.regionId) !== null && _c !== void 0 ? _c : country.regionId;
            country.continent = (_d = dto.continent) !== null && _d !== void 0 ? _d : country.continent;
            const updated = await manager.save(country);
            if (dto.recIds) {
                await manager.delete(country_rec_membership_entity_1.CountryRecMembership, { countryId: id });
                if (dto.recIds.length) {
                    const memberships = dto.recIds.map((recId) => manager.create(country_rec_membership_entity_1.CountryRecMembership, {
                        countryId: id,
                        recId,
                        membershipStatus: enums_1.MembershipStatus.MEMBER,
                    }));
                    await manager.save(memberships);
                }
            }
            const withMemberships = await manager.findOne(country_entity_1.Country, { where: { id }, relations: ['recMemberships'] });
            return this.mapCountryResponse(withMemberships || updated);
        });
    }
    async deleteCountry(id) {
        const result = await this.countryRepo.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException('Country not found');
        return { success: true };
    }
    getRegions() {
        return this.regionRepo.find({ order: { name: 'ASC' } });
    }
    async getRegion(id) {
        const region = await this.regionRepo.findOne({ where: { id } });
        if (!region)
            throw new common_1.NotFoundException('Region not found');
        return region;
    }
    createRegion(dto) {
        const region = this.regionRepo.create(dto);
        return this.regionRepo.save(region);
    }
    async updateRegion(id, dto) {
        const region = await this.regionRepo.findOne({ where: { id } });
        if (!region)
            throw new common_1.NotFoundException('Region not found');
        Object.assign(region, dto);
        return this.regionRepo.save(region);
    }
    async deleteRegion(id) {
        const result = await this.regionRepo.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException('Region not found');
        return { success: true };
    }
    async getRegionsByCountry(countryId) {
        const country = await this.countryRepo.findOne({ where: { id: countryId }, relations: ['region'] });
        return (country === null || country === void 0 ? void 0 : country.region) ? [country.region] : [];
    }
    getRecs() {
        return this.recRepo.find({ order: { name: 'ASC' } });
    }
    async getRec(id) {
        const rec = await this.recRepo.findOne({ where: { id } });
        if (!rec)
            throw new common_1.NotFoundException('REC not found');
        return rec;
    }
    createRec(dto) {
        const rec = this.recRepo.create(dto);
        return this.recRepo.save(rec);
    }
    async updateRec(id, dto) {
        const rec = await this.recRepo.findOne({ where: { id } });
        if (!rec)
            throw new common_1.NotFoundException('REC not found');
        Object.assign(rec, dto);
        return this.recRepo.save(rec);
    }
    async deleteRec(id) {
        const result = await this.recRepo.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException('REC not found');
        return { success: true };
    }
    getCountryRecMemberships(countryId) {
        return this.membershipRepo.find({
            where: { countryId },
            relations: ['rec'],
        });
    }
    getAcapSchemes() {
        return this.acapRepo.find({ where: { isActive: true } });
    }
    getAccreditationBodies() {
        return this.accreditationRepo.find({ where: { isActive: true } });
    }
};
exports.ReferenceDataService = ReferenceDataService;
exports.ReferenceDataService = ReferenceDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __param(1, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __param(2, (0, typeorm_1.InjectRepository)(regional_economic_community_entity_1.RegionalEconomicCommunity)),
    __param(3, (0, typeorm_1.InjectRepository)(country_rec_membership_entity_1.CountryRecMembership)),
    __param(4, (0, typeorm_1.InjectRepository)(acap_scheme_entity_1.AcapScheme)),
    __param(5, (0, typeorm_1.InjectRepository)(accreditation_body_entity_1.AccreditationBody)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReferenceDataService);
//# sourceMappingURL=reference-data.service.js.map