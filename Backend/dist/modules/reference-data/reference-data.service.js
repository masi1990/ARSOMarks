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
let ReferenceDataService = class ReferenceDataService {
    constructor(countryRepo, regionRepo, recRepo, membershipRepo, acapRepo, accreditationRepo) {
        this.countryRepo = countryRepo;
        this.regionRepo = regionRepo;
        this.recRepo = recRepo;
        this.membershipRepo = membershipRepo;
        this.acapRepo = acapRepo;
        this.accreditationRepo = accreditationRepo;
    }
    getCountries() {
        return this.countryRepo.find({ relations: ['region'] });
    }
    getRegions() {
        return this.regionRepo.find();
    }
    async getRegionsByCountry(countryId) {
        const country = await this.countryRepo.findOne({ where: { id: countryId }, relations: ['region'] });
        return (country === null || country === void 0 ? void 0 : country.region) ? [country.region] : [];
    }
    getRecs() {
        return this.recRepo.find();
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