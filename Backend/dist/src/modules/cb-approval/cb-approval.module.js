"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbApprovalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cb_application_entity_1 = require("./entities/cb-application.entity");
const cb_application_document_entity_1 = require("./entities/cb-application-document.entity");
const cb_application_service_1 = require("./services/cb-application.service");
const cb_document_upload_service_1 = require("./services/cb-document-upload.service");
const cb_application_controller_1 = require("./controllers/cb-application.controller");
const accreditation_body_entity_1 = require("../reference-data/entities/accreditation-body.entity");
let CbApprovalModule = class CbApprovalModule {
};
exports.CbApprovalModule = CbApprovalModule;
exports.CbApprovalModule = CbApprovalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cb_application_entity_1.CbApplication, cb_application_document_entity_1.CbApplicationDocument, accreditation_body_entity_1.AccreditationBody])],
        controllers: [cb_application_controller_1.CbApplicationController],
        providers: [cb_application_service_1.CbApplicationService, cb_document_upload_service_1.CbDocumentUploadService],
        exports: [cb_application_service_1.CbApplicationService],
    })
], CbApprovalModule);
//# sourceMappingURL=cb-approval.module.js.map