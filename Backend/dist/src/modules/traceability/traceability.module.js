"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceabilityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const traceability_admin_controller_1 = require("./controllers/traceability-admin.controller");
const traceability_public_controller_1 = require("./controllers/traceability-public.controller");
const traceability_service_1 = require("./services/traceability.service");
const coc_generator_service_1 = require("./services/coc-generator.service");
const qr_signing_service_1 = require("./services/qr-signing.service");
const standard_entity_1 = require("./entities/standard.entity");
const product_standard_entity_1 = require("./entities/product-standard.entity");
const coc_entity_1 = require("./entities/coc.entity");
const qr_token_entity_1 = require("./entities/qr-token.entity");
const coc_status_history_entity_1 = require("./entities/coc-status-history.entity");
const scan_log_entity_1 = require("./entities/scan-log.entity");
const search_log_entity_1 = require("./entities/search-log.entity");
const product_entity_1 = require("../product-certification/entities/product.entity");
const product_certification_application_entity_1 = require("../product-certification/entities/product-certification-application.entity");
const country_entity_1 = require("../reference-data/entities/country.entity");
let TraceabilityModule = class TraceabilityModule {
};
exports.TraceabilityModule = TraceabilityModule;
exports.TraceabilityModule = TraceabilityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                standard_entity_1.Standard,
                product_standard_entity_1.ProductStandard,
                coc_entity_1.Coc,
                qr_token_entity_1.QrToken,
                coc_status_history_entity_1.CocStatusHistory,
                scan_log_entity_1.ScanLog,
                search_log_entity_1.SearchLog,
                product_entity_1.Product,
                product_certification_application_entity_1.ProductCertificationApplication,
                country_entity_1.Country,
            ]),
        ],
        controllers: [traceability_admin_controller_1.TraceabilityAdminController, traceability_public_controller_1.TraceabilityPublicController],
        providers: [traceability_service_1.TraceabilityService, coc_generator_service_1.CocGeneratorService, qr_signing_service_1.QrSigningService],
        exports: [traceability_service_1.TraceabilityService],
    })
], TraceabilityModule);
//# sourceMappingURL=traceability.module.js.map