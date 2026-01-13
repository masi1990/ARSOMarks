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
exports.ApplicationRegistrationController = void 0;
const common_1 = require("@nestjs/common");
const application_registration_service_1 = require("../services/application-registration.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const enums_1 = require("../../../shared/enums");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const reference_data_service_1 = require("../../reference-data/reference-data.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nsb_entity_1 = require("../../nsb-management/entities/nsb.entity");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const upload_document_dto_1 = require("../dtos/upload-document.dto");
let ApplicationRegistrationController = class ApplicationRegistrationController {
    constructor(applicationRegistrationService, referenceDataService, nsbRepo) {
        this.applicationRegistrationService = applicationRegistrationService;
        this.referenceDataService = referenceDataService;
        this.nsbRepo = nsbRepo;
        console.log('✓ ApplicationRegistrationController initialized');
    }
    async saveDraft(dto, user) {
        dto.userId = user.id;
        return this.applicationRegistrationService.createDraft(dto, user.id);
    }
    async create(dto, user) {
        dto.userId = user.id;
        return this.applicationRegistrationService.create(dto, user.id);
    }
    async getMyApplications(user) {
        return this.applicationRegistrationService.findByUserId(user.id);
    }
    async getMyApplication(user) {
        const applications = await this.applicationRegistrationService.findByUserId(user.id);
        const draft = applications.find((app) => app.status === enums_1.ApplicationRegistrationStatus.DRAFT);
        if (draft) {
            return draft;
        }
        return applications.length > 0 ? applications[0] : null;
    }
    async list(query, user) {
        const { status, countryId, skip = 0, limit = 25 } = query;
        const filters = {
            skip: Number(skip),
            limit: Number(limit),
        };
        if (status) {
            filters.status = status;
        }
        if (countryId) {
            filters.countryId = countryId;
        }
        return this.applicationRegistrationService.findAll(filters);
    }
    async getById(id, user) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.ForbiddenException('Invalid application ID format');
        }
        const application = await this.applicationRegistrationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin) {
            if (application.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only access your own application registration');
            }
        }
        return application;
    }
    async update(id, dto, user) {
        const application = await this.applicationRegistrationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin) {
            if (application.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only update your own application registration');
            }
        }
        return this.applicationRegistrationService.update(id, dto, user.id);
    }
    async submit(id, user) {
        const application = await this.applicationRegistrationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin) {
            if (application.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only submit your own application registration');
            }
        }
        return this.applicationRegistrationService.submit(id, user.id);
    }
    async delete(id, user) {
        const application = await this.applicationRegistrationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin) {
            if (application.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only delete your own application registration');
            }
        }
        await this.applicationRegistrationService.delete(id, user.id);
        return { message: 'Application registration deleted successfully' };
    }
    async getAcapSchemes() {
        return this.referenceDataService.getAcapSchemes();
    }
    async getArsoStandards() {
        return [
            { code: 'ARS 1100', name: 'ARS 1100 - General Product Standard' },
            { code: 'ARS/AES 2', name: 'ARS/AES 2 - Agricultural Equipment Standard' },
            { code: 'ARS 952', name: 'ARS 952 - Food Safety Standard' },
            { code: 'ARS 1001', name: 'ARS 1001 - Quality Management' },
            { code: 'ARS 2001', name: 'ARS 2001 - Environmental Management' },
        ];
    }
    async getCertificationBodies() {
        const nsbs = await this.nsbRepo.find({
            where: { status: 'ACTIVE' },
            relations: ['country'],
            order: { name: 'ASC' },
        });
        return nsbs.map((nsb) => {
            var _a;
            return ({
                id: nsb.id,
                name: nsb.name,
                shortName: nsb.shortName,
                country: (_a = nsb.country) === null || _a === void 0 ? void 0 : _a.name,
                countryId: nsb.countryId,
            });
        });
    }
    async getProductionTypes() {
        return [
            { value: 'Crops', label: 'Crops' },
            { value: 'Livestock', label: 'Livestock' },
            { value: 'Aquaculture', label: 'Aquaculture' },
            { value: 'Processing', label: 'Processing' },
            { value: 'Manufacturing', label: 'Manufacturing' },
            { value: 'Packaging', label: 'Packaging' },
        ];
    }
    async getTargetMarkets() {
        return [
            { value: 'Domestic', label: 'Domestic' },
            { value: 'AfCFTA', label: 'AfCFTA (African Continental Free Trade Area)' },
            { value: 'Export_EU', label: 'Export - European Union' },
            { value: 'Export_USA', label: 'Export - United States' },
            { value: 'Export_Asia', label: 'Export - Asia' },
            { value: 'Export_Other', label: 'Export - Other' },
        ];
    }
    async uploadDocument(id, dto, user) {
        const application = await this.applicationRegistrationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin && application.userId !== user.id) {
            throw new common_1.ForbiddenException('You can only upload documents for your own application');
        }
        return {
            id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            documentType: dto.documentType,
            fileName: dto.fileName,
            filePath: dto.filePath,
            uploadedAt: new Date().toISOString(),
        };
    }
    async listDocuments(id, user) {
        const application = await this.applicationRegistrationService.findById(id);
        const userRoles = user.roles || (user.role ? [user.role] : []);
        const isAdmin = userRoles.includes(enums_1.UserRole.SUPER_ADMIN) || userRoles.includes(enums_1.UserRole.NSB_ADMIN);
        if (!isAdmin && application.userId !== user.id) {
            throw new common_1.ForbiddenException('You can only view documents for your own application');
        }
        return [];
    }
};
exports.ApplicationRegistrationController = ApplicationRegistrationController;
__decorate([
    (0, common_1.Post)('draft'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "saveDraft", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateApplicationRegistrationDto, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my-applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.Get)('my-application'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getMyApplication", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.NSB_ADMIN, enums_1.UserRole.OPERATOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "submit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.OPERATOR, enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.NSB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('lookup/acap-schemes'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getAcapSchemes", null);
__decorate([
    (0, common_1.Get)('lookup/arso-standards'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getArsoStandards", null);
__decorate([
    (0, common_1.Get)('lookup/certification-bodies'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getCertificationBodies", null);
__decorate([
    (0, common_1.Get)('lookup/production-types'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getProductionTypes", null);
__decorate([
    (0, common_1.Get)('lookup/target-markets'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "getTargetMarkets", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upload_document_dto_1.UploadApplicationDocumentDto,
        system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, system_user_entity_1.SystemUser]),
    __metadata("design:returntype", Promise)
], ApplicationRegistrationController.prototype, "listDocuments", null);
exports.ApplicationRegistrationController = ApplicationRegistrationController = __decorate([
    (0, common_1.Controller)('application-registrations'),
    __param(2, (0, typeorm_1.InjectRepository)(nsb_entity_1.Nsb)),
    __metadata("design:paramtypes", [application_registration_service_1.ApplicationRegistrationService,
        reference_data_service_1.ReferenceDataService,
        typeorm_2.Repository])
], ApplicationRegistrationController);
//# sourceMappingURL=application-registration.controller.js.map