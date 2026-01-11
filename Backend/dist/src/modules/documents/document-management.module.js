"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentManagementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_controller_1 = require("./document.controller");
const document_service_1 = require("./document.service");
const application_document_entity_1 = require("../licensing/entities/application-document.entity");
const license_application_entity_1 = require("../licensing/entities/license-application.entity");
let DocumentManagementModule = class DocumentManagementModule {
};
exports.DocumentManagementModule = DocumentManagementModule;
exports.DocumentManagementModule = DocumentManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([application_document_entity_1.ApplicationDocument, license_application_entity_1.LicenseApplication])],
        controllers: [document_controller_1.DocumentController],
        providers: [document_service_1.DocumentService],
        exports: [document_service_1.DocumentService],
    })
], DocumentManagementModule);
//# sourceMappingURL=document-management.module.js.map