"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicensingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const license_application_entity_1 = require("./entities/license-application.entity");
const application_document_entity_1 = require("./entities/application-document.entity");
const workflow_history_entity_1 = require("./entities/workflow-history.entity");
const license_entity_1 = require("./entities/license.entity");
const license_compliance_entity_1 = require("./entities/license-compliance.entity");
const license_application_service_1 = require("./services/license-application.service");
const workflow_service_1 = require("./services/workflow.service");
const license_application_controller_1 = require("./controllers/license-application.controller");
const licensing_lookup_controller_1 = require("./controllers/licensing-lookup.controller");
const acap_scheme_entity_1 = require("../reference-data/entities/acap-scheme.entity");
const accreditation_body_entity_1 = require("../reference-data/entities/accreditation-body.entity");
let LicensingModule = class LicensingModule {
};
exports.LicensingModule = LicensingModule;
exports.LicensingModule = LicensingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                license_application_entity_1.LicenseApplication,
                application_document_entity_1.ApplicationDocument,
                workflow_history_entity_1.WorkflowHistory,
                license_entity_1.License,
                license_compliance_entity_1.LicenseCompliance,
                acap_scheme_entity_1.AcapScheme,
                accreditation_body_entity_1.AccreditationBody,
            ]),
        ],
        controllers: [license_application_controller_1.LicenseApplicationController, licensing_lookup_controller_1.LicensingLookupController],
        providers: [license_application_service_1.LicenseApplicationService, workflow_service_1.WorkflowService],
        exports: [license_application_service_1.LicenseApplicationService, workflow_service_1.WorkflowService],
    })
], LicensingModule);
//# sourceMappingURL=licensing.module.js.map