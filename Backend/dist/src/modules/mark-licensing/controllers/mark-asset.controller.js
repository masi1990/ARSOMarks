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
exports.MarkAssetController = void 0;
const common_1 = require("@nestjs/common");
const mark_asset_service_1 = require("../services/mark-asset.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkAssetController = class MarkAssetController {
    constructor(assetService) {
        this.assetService = assetService;
    }
    requestAssets(dto, user) {
        return this.assetService.requestAssets(dto, user.id);
    }
    deliverAssets(id, body, user) {
        return this.assetService.deliverAssets(id, body.assetFiles, user.id);
    }
    trackDownload(id, body, user, req) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        return this.assetService.trackDownload(id, body.filePath, user.id, typeof ipAddress === 'string' ? ipAddress : ipAddress === null || ipAddress === void 0 ? void 0 : ipAddress[0], userAgent);
    }
    getById(id) {
        return this.assetService.findById(id);
    }
    getAssetLibrary(agreementId) {
        if (!agreementId) {
            throw new Error('agreementId parameter is required');
        }
        return this.assetService.getAssetLibrary(agreementId);
    }
    getDownloadHistory(id) {
        return this.assetService.getDownloadHistory(id);
    }
};
exports.MarkAssetController = MarkAssetController;
__decorate([
    (0, common_1.Post)('request'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.RequestAssetsDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkAssetController.prototype, "requestAssets", null);
__decorate([
    (0, common_1.Post)(':id/deliver'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], MarkAssetController.prototype, "deliverAssets", null);
__decorate([
    (0, common_1.Post)(':id/download'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser, Object]),
    __metadata("design:returntype", void 0)
], MarkAssetController.prototype, "trackDownload", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkAssetController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Query)('agreementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkAssetController.prototype, "getAssetLibrary", null);
__decorate([
    (0, common_1.Get)(':id/download-history'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarkAssetController.prototype, "getDownloadHistory", null);
exports.MarkAssetController = MarkAssetController = __decorate([
    (0, common_1.Controller)('mark-licenses/assets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:paramtypes", [mark_asset_service_1.MarkAssetService])
], MarkAssetController);
//# sourceMappingURL=mark-asset.controller.js.map