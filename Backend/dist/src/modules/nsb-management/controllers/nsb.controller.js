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
exports.NsbController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nsb_service_1 = require("../services/nsb.service");
const nsb_document_service_1 = require("../services/nsb-document.service");
const stakeholder_registry_service_1 = require("../services/stakeholder-registry.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let NsbController = class NsbController {
    constructor(nsbService, documentService, stakeholderRegistryService) {
        this.nsbService = nsbService;
        this.documentService = documentService;
        this.stakeholderRegistryService = stakeholderRegistryService;
    }
    create(dto, user) {
        return this.nsbService.createNsb(dto, user.id);
    }
    async list(query, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && (userRoles.includes(enums_1.UserRole.NSB_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_USER))) {
            const { search, skip = 0, limit = 25 } = query;
            if (user.countryId) {
                const filter = { countryId: user.countryId, search, skip: Number(skip), limit: Number(limit) };
                return this.nsbService.findAll(filter);
            }
            const myNsb = await this.nsbService.findByUser(user);
            if (myNsb) {
                return { data: [myNsb], total: 1 };
            }
            return { data: [], total: 0 };
        }
        const { countryId, regionId, search, skip = 0, limit = 25 } = query;
        const filter = { countryId, regionId, search, skip: Number(skip), limit: Number(limit) };
        return this.nsbService.findAll(filter);
    }
    getMyNsb(user) {
        return this.nsbService.findByUser(user);
    }
    async getById(id, user) {
        const nsb = await this.nsbService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && (userRoles.includes(enums_1.UserRole.NSB_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_USER))) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only access your own NSB');
            }
        }
        return nsb;
    }
    async update(id, dto, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.NSB_ADMIN)) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only update your own NSB');
            }
        }
        return this.nsbService.updateNsb(id, dto, user.id);
    }
    async uploadDocument(id, file, body, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.NSB_ADMIN)) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only upload documents to your own NSB');
            }
        }
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (!body.documentType) {
            throw new common_1.BadRequestException('Document type is required');
        }
        if (!Object.values(enums_1.NsbProfileDocumentType).includes(body.documentType)) {
            throw new common_1.BadRequestException('Invalid document type');
        }
        return this.documentService.uploadDocument(id, file, body.documentType, user.id);
    }
    async getDocuments(id, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && (userRoles.includes(enums_1.UserRole.NSB_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_USER))) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only view your own NSB documents');
            }
        }
        return this.documentService.getDocumentsByNsb(id);
    }
    async viewDocument(id, documentId, res, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && (userRoles.includes(enums_1.UserRole.NSB_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_USER))) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only view your own NSB documents');
            }
        }
        const document = await this.documentService.getDocument(id, documentId);
        const fileBuffer = await this.documentService.getFile(document.filePath);
        res.setHeader('Content-Type', document.mimeType || 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${document.fileName}"`);
        res.send(fileBuffer);
    }
    async deleteDocument(id, documentId, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.NSB_ADMIN)) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only delete documents from your own NSB');
            }
        }
        await this.documentService.deleteDocument(id, documentId);
        return { message: 'Document deleted successfully' };
    }
    async getStakeholderRegistry(id, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && (userRoles.includes(enums_1.UserRole.NSB_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_USER))) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only access stakeholder registry for your own NSB');
            }
        }
        return this.stakeholderRegistryService.getStakeholderRegistry(id);
    }
    async updateStakeholderRegistry(id, dto, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.NSB_ADMIN)) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only update stakeholder registry for your own NSB');
            }
        }
        return this.stakeholderRegistryService.updateStakeholderRegistry(id, dto);
    }
    async saveDraft(id, dto, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.NSB_ADMIN)) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only save draft stakeholder registry for your own NSB');
            }
        }
        return this.stakeholderRegistryService.saveDraft(id, dto, user.id);
    }
    async submitRegistry(id, dto, user) {
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.ARSO_SECRETARIAT);
        if (!isAdmin && userRoles.includes(enums_1.UserRole.NSB_ADMIN)) {
            const myNsb = await this.nsbService.findByUser(user);
            if ((myNsb === null || myNsb === void 0 ? void 0 : myNsb.id) !== id) {
                throw new common_1.ForbiddenException('You can only submit stakeholder registry for your own NSB');
            }
        }
        return this.stakeholderRegistryService.submitRegistry(id, dto, user.id);
    }
};
exports.NsbController = NsbController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateNsbDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('my-nsb'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser]),
    __metadata("design:returntype", void 0)
], NsbController.prototype, "getMyNsb", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateNsbDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Get)(':id/documents/:documentId/view'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "viewDocument", null);
__decorate([
    (0, common_1.Delete)(':id/documents/:documentId'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Get)(':id/stakeholder-registry'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.NSB_USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "getStakeholderRegistry", null);
__decorate([
    (0, common_1.Put)(':id/stakeholder-registry'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.StakeholderRegistryDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "updateStakeholderRegistry", null);
__decorate([
    (0, common_1.Post)(':id/stakeholder-registry/draft'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true, skipNullProperties: true, skipUndefinedProperties: true, whitelist: false, forbidNonWhitelisted: false })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "saveDraft", null);
__decorate([
    (0, common_1.Post)(':id/stakeholder-registry/submit'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ARSO_SECRETARIAT, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.StakeholderRegistryDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], NsbController.prototype, "submitRegistry", null);
exports.NsbController = NsbController = __decorate([
    (0, common_1.Controller)('nsb'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [nsb_service_1.NsbService,
        nsb_document_service_1.NsbDocumentService,
        stakeholder_registry_service_1.StakeholderRegistryService])
], NsbController);
//# sourceMappingURL=nsb.controller.js.map