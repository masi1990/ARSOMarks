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
exports.TraceabilityAdminController = void 0;
const common_1 = require("@nestjs/common");
const traceability_service_1 = require("../services/traceability.service");
const create_standard_dto_1 = require("../dtos/create-standard.dto");
const assign_standards_dto_1 = require("../dtos/assign-standards.dto");
const generate_coc_dto_1 = require("../dtos/generate-coc.dto");
const update_coc_status_dto_1 = require("../dtos/update-coc-status.dto");
let TraceabilityAdminController = class TraceabilityAdminController {
    constructor(traceabilityService) {
        this.traceabilityService = traceabilityService;
    }
    createStandard(dto) {
        return this.traceabilityService.createStandard(dto);
    }
    assignStandards(dto) {
        return this.traceabilityService.assignStandards(dto);
    }
    issueCoc(dto) {
        return this.traceabilityService.issueCoc(dto);
    }
    updateCocStatus(dto) {
        return this.traceabilityService.revokeCoc(dto);
    }
};
exports.TraceabilityAdminController = TraceabilityAdminController;
__decorate([
    (0, common_1.Post)('standards'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_standard_dto_1.CreateStandardDto]),
    __metadata("design:returntype", void 0)
], TraceabilityAdminController.prototype, "createStandard", null);
__decorate([
    (0, common_1.Post)('assign-standards'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_standards_dto_1.AssignStandardsDto]),
    __metadata("design:returntype", void 0)
], TraceabilityAdminController.prototype, "assignStandards", null);
__decorate([
    (0, common_1.Post)('issue-coc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_coc_dto_1.GenerateCocDto]),
    __metadata("design:returntype", void 0)
], TraceabilityAdminController.prototype, "issueCoc", null);
__decorate([
    (0, common_1.Put)('coc-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_coc_status_dto_1.UpdateCocStatusDto]),
    __metadata("design:returntype", void 0)
], TraceabilityAdminController.prototype, "updateCocStatus", null);
exports.TraceabilityAdminController = TraceabilityAdminController = __decorate([
    (0, common_1.Controller)('traceability'),
    __metadata("design:paramtypes", [traceability_service_1.TraceabilityService])
], TraceabilityAdminController);
//# sourceMappingURL=traceability-admin.controller.js.map