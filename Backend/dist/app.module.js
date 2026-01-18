"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const nsb_management_module_1 = require("./modules/nsb-management/nsb-management.module");
const licensing_module_1 = require("./modules/licensing/licensing.module");
const reference_data_module_1 = require("./modules/reference-data/reference-data.module");
const document_management_module_1 = require("./modules/documents/document-management.module");
const region_entity_1 = require("./modules/reference-data/entities/region.entity");
const country_entity_1 = require("./modules/reference-data/entities/country.entity");
const regional_economic_community_entity_1 = require("./modules/reference-data/entities/regional-economic-community.entity");
const country_rec_membership_entity_1 = require("./modules/reference-data/entities/country-rec-membership.entity");
const acap_scheme_entity_1 = require("./modules/reference-data/entities/acap-scheme.entity");
const accreditation_body_entity_1 = require("./modules/reference-data/entities/accreditation-body.entity");
const nsb_entity_1 = require("./modules/nsb-management/entities/nsb.entity");
const nsb_contact_entity_1 = require("./modules/nsb-management/entities/nsb-contact.entity");
const nsb_location_entity_1 = require("./modules/nsb-management/entities/nsb-location.entity");
const license_application_entity_1 = require("./modules/licensing/entities/license-application.entity");
const application_document_entity_1 = require("./modules/licensing/entities/application-document.entity");
const workflow_history_entity_1 = require("./modules/licensing/entities/workflow-history.entity");
const license_entity_1 = require("./modules/licensing/entities/license.entity");
const license_compliance_entity_1 = require("./modules/licensing/entities/license-compliance.entity");
const system_user_entity_1 = require("./modules/system-user/system-user.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env', '.env.local'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    var _a, _b, _c, _d, _e;
                    const host = (_a = config.get('DB_HOST')) !== null && _a !== void 0 ? _a : 'localhost';
                    const port = Number((_b = config.get('DB_PORT')) !== null && _b !== void 0 ? _b : 8079);
                    const username = (_c = config.get('DB_USER')) !== null && _c !== void 0 ? _c : 'postgres';
                    const password = (_d = config.get('DB_PASS')) !== null && _d !== void 0 ? _d : '';
                    const database = (_e = config.get('DB_NAME')) !== null && _e !== void 0 ? _e : 'ARSOMarks';
                    return {
                        type: 'postgres',
                        host,
                        port,
                        username,
                        password,
                        database,
                        entities: [
                            region_entity_1.Region,
                            country_entity_1.Country,
                            regional_economic_community_entity_1.RegionalEconomicCommunity,
                            country_rec_membership_entity_1.CountryRecMembership,
                            acap_scheme_entity_1.AcapScheme,
                            accreditation_body_entity_1.AccreditationBody,
                            nsb_entity_1.Nsb,
                            nsb_contact_entity_1.NsbContact,
                            nsb_location_entity_1.NsbLocation,
                            license_application_entity_1.LicenseApplication,
                            application_document_entity_1.ApplicationDocument,
                            workflow_history_entity_1.WorkflowHistory,
                            license_entity_1.License,
                            license_compliance_entity_1.LicenseCompliance,
                            system_user_entity_1.SystemUser,
                        ],
                        synchronize: false,
                        autoLoadEntities: false,
                    };
                },
            }),
            nsb_management_module_1.NsbManagementModule,
            licensing_module_1.LicensingModule,
            reference_data_module_1.ReferenceDataModule,
            document_management_module_1.DocumentManagementModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map