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
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const nsb_management_module_1 = require("./modules/nsb-management/nsb-management.module");
const licensing_module_1 = require("./modules/licensing/licensing.module");
const reference_data_module_1 = require("./modules/reference-data/reference-data.module");
const document_management_module_1 = require("./modules/documents/document-management.module");
const auth_module_1 = require("./modules/auth/auth.module");
const system_user_module_1 = require("./modules/system-user/system-user.module");
const region_entity_1 = require("./modules/reference-data/entities/region.entity");
const country_entity_1 = require("./modules/reference-data/entities/country.entity");
const regional_economic_community_entity_1 = require("./modules/reference-data/entities/regional-economic-community.entity");
const country_rec_membership_entity_1 = require("./modules/reference-data/entities/country-rec-membership.entity");
const acap_scheme_entity_1 = require("./modules/reference-data/entities/acap-scheme.entity");
const accreditation_body_entity_1 = require("./modules/reference-data/entities/accreditation-body.entity");
const nsb_entity_1 = require("./modules/nsb-management/entities/nsb.entity");
const nsb_contact_entity_1 = require("./modules/nsb-management/entities/nsb-contact.entity");
const nsb_location_entity_1 = require("./modules/nsb-management/entities/nsb-location.entity");
const nsb_registration_request_entity_1 = require("./modules/nsb-management/entities/nsb-registration-request.entity");
const nsb_registration_request_document_entity_1 = require("./modules/nsb-management/entities/nsb-registration-request-document.entity");
const nsb_document_entity_1 = require("./modules/nsb-management/entities/nsb-document.entity");
const nsb_market_surveillance_authority_entity_1 = require("./modules/nsb-management/entities/nsb-market-surveillance-authority.entity");
const nsb_customs_border_agency_entity_1 = require("./modules/nsb-management/entities/nsb-customs-border-agency.entity");
const nsb_regulatory_agency_entity_1 = require("./modules/nsb-management/entities/nsb-regulatory-agency.entity");
const nsb_industry_association_entity_1 = require("./modules/nsb-management/entities/nsb-industry-association.entity");
const nsb_testing_laboratory_entity_1 = require("./modules/nsb-management/entities/nsb-testing-laboratory.entity");
const license_application_entity_1 = require("./modules/licensing/entities/license-application.entity");
const application_document_entity_1 = require("./modules/licensing/entities/application-document.entity");
const workflow_history_entity_1 = require("./modules/licensing/entities/workflow-history.entity");
const license_entity_1 = require("./modules/licensing/entities/license.entity");
const license_compliance_entity_1 = require("./modules/licensing/entities/license-compliance.entity");
const system_user_entity_1 = require("./modules/system-user/system-user.entity");
const role_request_entity_1 = require("./modules/auth/entities/role-request.entity");
const mark_license_application_entity_1 = require("./modules/mark-licensing/entities/mark-license-application.entity");
const mark_license_placement_entity_1 = require("./modules/mark-licensing/entities/mark-license-placement.entity");
const mark_license_agreement_entity_1 = require("./modules/mark-licensing/entities/mark-license-agreement.entity");
const mark_license_asset_entity_1 = require("./modules/mark-licensing/entities/mark-license-asset.entity");
const mark_license_asset_download_entity_1 = require("./modules/mark-licensing/entities/mark-license-asset-download.entity");
const mark_license_usage_report_entity_1 = require("./modules/mark-licensing/entities/mark-license-usage-report.entity");
const mark_license_modification_entity_1 = require("./modules/mark-licensing/entities/mark-license-modification.entity");
const mark_license_compliance_entity_1 = require("./modules/mark-licensing/entities/mark-license-compliance.entity");
const mark_licensing_module_1 = require("./modules/mark-licensing/mark-licensing.module");
const operator_module_1 = require("./modules/operator/operator.module");
const product_certification_module_1 = require("./modules/product-certification/product-certification.module");
const application_registration_module_1 = require("./modules/application-registration/application-registration.module");
const operator_entity_1 = require("./modules/operator/entities/operator.entity");
const operator_contact_entity_1 = require("./modules/operator/entities/operator-contact.entity");
const operator_location_entity_1 = require("./modules/operator/entities/operator-location.entity");
const operator_business_sector_entity_1 = require("./modules/operator/entities/operator-business-sector.entity");
const operator_market_entity_1 = require("./modules/operator/entities/operator-market.entity");
const operator_production_capacity_entity_1 = require("./modules/operator/entities/operator-production-capacity.entity");
const operator_preference_entity_1 = require("./modules/operator/entities/operator-preference.entity");
const operator_accessibility_entity_1 = require("./modules/operator/entities/operator-accessibility.entity");
const operator_consent_entity_1 = require("./modules/operator/entities/operator-consent.entity");
const product_certification_application_entity_1 = require("./modules/product-certification/entities/product-certification-application.entity");
const product_entity_1 = require("./modules/product-certification/entities/product.entity");
const product_technical_spec_entity_1 = require("./modules/product-certification/entities/product-technical-spec.entity");
const product_environmental_claim_entity_1 = require("./modules/product-certification/entities/product-environmental-claim.entity");
const product_certification_cb_selection_entity_1 = require("./modules/product-certification/entities/product-certification-cb-selection.entity");
const product_certification_declaration_entity_1 = require("./modules/product-certification/entities/product-certification-declaration.entity");
const application_registration_entity_1 = require("./modules/application-registration/entities/application-registration.entity");
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
                    var _a, _b, _c, _d;
                    const host = String((_a = config.get('DB_HOST')) !== null && _a !== void 0 ? _a : 'localhost');
                    const port = Number((_b = config.get('DB_PORT')) !== null && _b !== void 0 ? _b : 8079);
                    const username = String((_c = config.get('DB_USER')) !== null && _c !== void 0 ? _c : 'postgres');
                    const dbPass = config.get('DB_PASS');
                    const password = typeof dbPass === 'string' ? dbPass : (dbPass != null ? String(dbPass) : '');
                    const database = String((_d = config.get('DB_NAME')) !== null && _d !== void 0 ? _d : 'ARSOMarks');
                    console.log('DB Config:', { host, port, username, password: password ? '***' : '(empty)', database, passwordType: typeof password });
                    return {
                        type: 'postgres',
                        host,
                        port,
                        username,
                        password: password || '',
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
                            nsb_registration_request_entity_1.NsbRegistrationRequest,
                            nsb_registration_request_document_entity_1.NsbRegistrationRequestDocument,
                            nsb_document_entity_1.NsbDocument,
                            nsb_market_surveillance_authority_entity_1.NsbMarketSurveillanceAuthority,
                            nsb_customs_border_agency_entity_1.NsbCustomsBorderAgency,
                            nsb_regulatory_agency_entity_1.NsbRegulatoryAgency,
                            nsb_industry_association_entity_1.NsbIndustryAssociation,
                            nsb_testing_laboratory_entity_1.NsbTestingLaboratory,
                            license_application_entity_1.LicenseApplication,
                            application_document_entity_1.ApplicationDocument,
                            workflow_history_entity_1.WorkflowHistory,
                            license_entity_1.License,
                            license_compliance_entity_1.LicenseCompliance,
                            system_user_entity_1.SystemUser,
                            role_request_entity_1.RoleRequest,
                            mark_license_application_entity_1.MarkLicenseApplication,
                            mark_license_placement_entity_1.MarkLicensePlacement,
                            mark_license_agreement_entity_1.MarkLicenseAgreement,
                            mark_license_asset_entity_1.MarkLicenseAsset,
                            mark_license_asset_download_entity_1.MarkLicenseAssetDownload,
                            mark_license_usage_report_entity_1.MarkLicenseUsageReport,
                            mark_license_modification_entity_1.MarkLicenseModification,
                            mark_license_compliance_entity_1.MarkLicenseCompliance,
                            operator_entity_1.Operator,
                            operator_contact_entity_1.OperatorContact,
                            operator_location_entity_1.OperatorLocation,
                            operator_business_sector_entity_1.OperatorBusinessSector,
                            operator_market_entity_1.OperatorMarket,
                            operator_production_capacity_entity_1.OperatorProductionCapacity,
                            operator_preference_entity_1.OperatorPreference,
                            operator_accessibility_entity_1.OperatorAccessibility,
                            operator_consent_entity_1.OperatorConsent,
                            product_certification_application_entity_1.ProductCertificationApplication,
                            product_entity_1.Product,
                            product_technical_spec_entity_1.ProductTechnicalSpec,
                            product_environmental_claim_entity_1.ProductEnvironmentalClaim,
                            product_certification_cb_selection_entity_1.ProductCertificationCbSelection,
                            product_certification_declaration_entity_1.ProductCertificationDeclaration,
                            application_registration_entity_1.ApplicationRegistration,
                        ],
                        synchronize: false,
                        autoLoadEntities: false,
                    };
                },
            }),
            auth_module_1.AuthModule,
            system_user_module_1.SystemUserModule,
            nsb_management_module_1.NsbManagementModule,
            licensing_module_1.LicensingModule,
            mark_licensing_module_1.MarkLicensingModule,
            operator_module_1.OperatorModule,
            product_certification_module_1.ProductCertificationModule,
            application_registration_module_1.ApplicationRegistrationModule,
            reference_data_module_1.ReferenceDataModule,
            document_management_module_1.DocumentManagementModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map