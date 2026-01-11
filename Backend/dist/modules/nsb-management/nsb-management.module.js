"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsbManagementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nsb_entity_1 = require("./entities/nsb.entity");
const nsb_contact_entity_1 = require("./entities/nsb-contact.entity");
const nsb_location_entity_1 = require("./entities/nsb-location.entity");
const country_entity_1 = require("../reference-data/entities/country.entity");
const nsb_service_1 = require("./services/nsb.service");
const nsb_controller_1 = require("./controllers/nsb.controller");
let NsbManagementModule = class NsbManagementModule {
};
exports.NsbManagementModule = NsbManagementModule;
exports.NsbManagementModule = NsbManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([nsb_entity_1.Nsb, nsb_contact_entity_1.NsbContact, nsb_location_entity_1.NsbLocation, country_entity_1.Country])],
        controllers: [nsb_controller_1.NsbController],
        providers: [nsb_service_1.NsbService],
        exports: [nsb_service_1.NsbService],
    })
], NsbManagementModule);
//# sourceMappingURL=nsb-management.module.js.map