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
const nsb_document_entity_1 = require("./entities/nsb-document.entity");
const nsb_registration_request_entity_1 = require("./entities/nsb-registration-request.entity");
const nsb_registration_request_document_entity_1 = require("./entities/nsb-registration-request-document.entity");
const nsb_market_surveillance_authority_entity_1 = require("./entities/nsb-market-surveillance-authority.entity");
const nsb_customs_border_agency_entity_1 = require("./entities/nsb-customs-border-agency.entity");
const nsb_regulatory_agency_entity_1 = require("./entities/nsb-regulatory-agency.entity");
const nsb_industry_association_entity_1 = require("./entities/nsb-industry-association.entity");
const nsb_testing_laboratory_entity_1 = require("./entities/nsb-testing-laboratory.entity");
const country_entity_1 = require("../reference-data/entities/country.entity");
const system_user_entity_1 = require("../system-user/system-user.entity");
const nsb_service_1 = require("./services/nsb.service");
const nsb_registration_request_service_1 = require("./services/nsb-registration-request.service");
const nsb_document_upload_service_1 = require("./services/nsb-document-upload.service");
const nsb_document_service_1 = require("./services/nsb-document.service");
const stakeholder_registry_service_1 = require("./services/stakeholder-registry.service");
const nsb_controller_1 = require("./controllers/nsb.controller");
const nsb_registration_request_controller_1 = require("./controllers/nsb-registration-request.controller");
const auth_module_1 = require("../auth/auth.module");
let NsbManagementModule = class NsbManagementModule {
};
exports.NsbManagementModule = NsbManagementModule;
exports.NsbManagementModule = NsbManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                nsb_entity_1.Nsb,
                nsb_contact_entity_1.NsbContact,
                nsb_location_entity_1.NsbLocation,
                nsb_document_entity_1.NsbDocument,
                nsb_registration_request_entity_1.NsbRegistrationRequest,
                nsb_registration_request_document_entity_1.NsbRegistrationRequestDocument,
                nsb_market_surveillance_authority_entity_1.NsbMarketSurveillanceAuthority,
                nsb_customs_border_agency_entity_1.NsbCustomsBorderAgency,
                nsb_regulatory_agency_entity_1.NsbRegulatoryAgency,
                nsb_industry_association_entity_1.NsbIndustryAssociation,
                nsb_testing_laboratory_entity_1.NsbTestingLaboratory,
                country_entity_1.Country,
                system_user_entity_1.SystemUser,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [nsb_controller_1.NsbController, nsb_registration_request_controller_1.NsbRegistrationRequestController],
        providers: [nsb_service_1.NsbService, nsb_registration_request_service_1.NsbRegistrationRequestService, nsb_document_upload_service_1.NsbDocumentUploadService, nsb_document_service_1.NsbDocumentService, stakeholder_registry_service_1.StakeholderRegistryService],
        exports: [nsb_service_1.NsbService, nsb_registration_request_service_1.NsbRegistrationRequestService],
    })
], NsbManagementModule);
//# sourceMappingURL=nsb-management.module.js.map