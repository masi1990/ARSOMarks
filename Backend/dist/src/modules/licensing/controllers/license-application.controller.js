"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseApplicationController = void 0;
const common_1 = require("@nestjs/common");
const license_application_service_1 = require("../services/license-application.service");
const dtos_1 = require("../dtos");
let LicenseApplicationController = class LicenseApplicationController {
    constructor(licenseService) {
        this.licenseService = licenseService;
    }
    createDraft(dto) {
        return this.licenseService.createApplication(Object.assign(Object.assign({}, dto), { saveAsDraft: true }), 'system');
    }
    updateDraft(id, dto) {
        return this.licenseService.updateDraftApplication(id, dto, 'system');
    }
    submit(id, dto) {
        return this.licenseService.submitApplication(id, dto, 'system');
    }
    getById(id) {
        return this.licenseService.findById(id);
    }
    getByNsb(nsbId, includeDrafts = 'true') {
        return this.licenseService.getApplicationsByNsb(nsbId, includeDrafts === 'true');
    }
};
exports.LicenseApplicationController = LicenseApplicationController;
__decorate([
    (0, common_1.Post)('applications/draft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateLicenseApplicationDto]),
    __metadata("design:returntype", void 0)
], LicenseApplicationController.prototype, "createDraft", null);
__decorate([
    (0, common_1.Put)('applications/:id/draft'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.CreateLicenseApplicationDto]),
    __metadata("design:returntype", void 0)
], LicenseApplicationController.prototype, "updateDraft", null);
__decorate([
    (0, common_1.Post)('applications/:id/submit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.SubmitApplicationDto]),
    __metadata("design:returntype", void 0)
], LicenseApplicationController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)('applications/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LicenseApplicationController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('nsb/:nsbId/applications'),
    __param(0, (0, common_1.Param)('nsbId')),
    __param(1, (0, common_1.Query)('includeDrafts')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LicenseApplicationController.prototype, "getByNsb", null);
exports.LicenseApplicationController = LicenseApplicationController = __decorate([
    (0, common_1.Controller)('licensing'),
    __metadata("design:paramtypes", [license_application_service_1.LicenseApplicationService])
], LicenseApplicationController);
//# sourceMappingURL=license-application.controller.js.map