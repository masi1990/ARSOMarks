"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkLicensingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const services_1 = require("./services");
const controllers_1 = require("./controllers");
const nsb_entity_1 = require("../nsb-management/entities/nsb.entity");
let MarkLicensingModule = class MarkLicensingModule {
};
exports.MarkLicensingModule = MarkLicensingModule;
exports.MarkLicensingModule = MarkLicensingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.MarkLicenseApplication,
                entities_1.MarkLicensePlacement,
                entities_1.MarkLicenseAgreement,
                entities_1.MarkLicenseAsset,
                entities_1.MarkLicenseAssetDownload,
                entities_1.MarkLicenseUsageReport,
                entities_1.MarkLicenseModification,
                entities_1.MarkLicenseCompliance,
                nsb_entity_1.Nsb,
            ]),
        ],
        controllers: [
            controllers_1.MarkLicenseApplicationController,
            controllers_1.MarkLicenseAgreementController,
            controllers_1.MarkUsageReportController,
            controllers_1.MarkLicenseModificationController,
            controllers_1.MarkAssetController,
            controllers_1.MarkLicenseDashboardController,
        ],
        providers: [
            services_1.MarkLicenseApplicationService,
            services_1.MarkLicenseAgreementService,
            services_1.MarkUsageReportService,
            services_1.MarkLicenseModificationService,
            services_1.MarkAssetService,
        ],
        exports: [
            services_1.MarkLicenseApplicationService,
            services_1.MarkLicenseAgreementService,
            services_1.MarkUsageReportService,
            services_1.MarkLicenseModificationService,
            services_1.MarkAssetService,
        ],
    })
], MarkLicensingModule);
//# sourceMappingURL=mark-licensing.module.js.map