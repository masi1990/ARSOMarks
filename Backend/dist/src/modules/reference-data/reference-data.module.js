"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceDataModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reference_data_controller_1 = require("./reference-data.controller");
const reference_data_service_1 = require("./reference-data.service");
const country_entity_1 = require("./entities/country.entity");
const region_entity_1 = require("./entities/region.entity");
const regional_economic_community_entity_1 = require("./entities/regional-economic-community.entity");
const country_rec_membership_entity_1 = require("./entities/country-rec-membership.entity");
const acap_scheme_entity_1 = require("./entities/acap-scheme.entity");
const accreditation_body_entity_1 = require("./entities/accreditation-body.entity");
let ReferenceDataModule = class ReferenceDataModule {
};
exports.ReferenceDataModule = ReferenceDataModule;
exports.ReferenceDataModule = ReferenceDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                country_entity_1.Country,
                region_entity_1.Region,
                regional_economic_community_entity_1.RegionalEconomicCommunity,
                country_rec_membership_entity_1.CountryRecMembership,
                acap_scheme_entity_1.AcapScheme,
                accreditation_body_entity_1.AccreditationBody,
            ]),
        ],
        controllers: [reference_data_controller_1.ReferenceDataController],
        providers: [reference_data_service_1.ReferenceDataService],
        exports: [reference_data_service_1.ReferenceDataService],
    })
], ReferenceDataModule);
//# sourceMappingURL=reference-data.module.js.map