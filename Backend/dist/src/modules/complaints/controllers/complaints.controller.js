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
exports.ComplaintsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const complaints_service_1 = require("../services/complaints.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const enums_1 = require("../../../shared/enums");
let ComplaintsController = class ComplaintsController {
    constructor(complaintsService) {
        this.complaintsService = complaintsService;
    }
    createComplaint(dto) {
        return this.complaintsService.createComplaint(dto);
    }
    listComplaints() {
        return this.complaintsService.listComplaints();
    }
    reviewComplaint(id, dto) {
        return this.complaintsService.reviewComplaint(id, dto);
    }
    uploadEvidence(id, file) {
        return this.complaintsService.addComplaintEvidence(id, file);
    }
    createAppeal(dto) {
        return this.complaintsService.createAppeal(dto);
    }
    listAppeals() {
        return this.complaintsService.listAppeals();
    }
    reviewAppeal(id, dto) {
        return this.complaintsService.reviewAppeal(id, dto);
    }
};
exports.ComplaintsController = ComplaintsController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateComplaintDto]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "createComplaint", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "listComplaints", null);
__decorate([
    (0, common_1.Post)(':id/review'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.ReviewComplaintDto]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "reviewComplaint", null);
__decorate([
    (0, common_1.Post)(':id/evidence'),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "uploadEvidence", null);
__decorate([
    (0, common_1.Post)('appeals'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateAppealDto]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "createAppeal", null);
__decorate([
    (0, common_1.Get)('appeals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "listAppeals", null);
__decorate([
    (0, common_1.Post)('appeals/:id/review'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.ReviewAppealDto]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "reviewAppeal", null);
exports.ComplaintsController = ComplaintsController = __decorate([
    (0, common_1.Controller)('complaints'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [complaints_service_1.ComplaintsService])
], ComplaintsController);
//# sourceMappingURL=complaints.controller.js.map