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
exports.RoleRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const role_request_entity_1 = require("../entities/role-request.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const email_service_1 = require("./email.service");
const role_request_type_1 = require("../types/role-request.type");
let RoleRequestService = class RoleRequestService {
    constructor(roleRequestRepo, userRepo, emailService) {
        this.roleRequestRepo = roleRequestRepo;
        this.userRepo = userRepo;
        this.emailService = emailService;
    }
    async create(user, dto) {
        var _a, _b;
        if (!user.emailVerified) {
            throw new common_1.BadRequestException('Verify your email before requesting roles.');
        }
        const requestType = (_a = dto.requestType) !== null && _a !== void 0 ? _a : role_request_type_1.RoleRequestType.ASSIGN;
        const normalizedRoles = Array.from(new Set(dto.requestedRoles));
        if (normalizedRoles.length === 0) {
            throw new common_1.BadRequestException('At least one role is required.');
        }
        const currentRoles = Array.isArray(user.roles) ? user.roles : [];
        const pendingRequests = await this.roleRequestRepo.find({
            where: { userId: user.id, status: enums_1.RoleRequestStatus.PENDING },
        });
        const pendingRoles = new Set(pendingRequests.flatMap((r) => r.requestedRoles || []));
        const rolesToRequest = requestType === role_request_type_1.RoleRequestType.REMOVE
            ? normalizedRoles.filter((role) => currentRoles.includes(role) && !pendingRoles.has(role))
            : normalizedRoles.filter((role) => !currentRoles.includes(role) && !pendingRoles.has(role));
        if (!rolesToRequest.length) {
            throw new common_1.BadRequestException(requestType === role_request_type_1.RoleRequestType.REMOVE ? 'No roles available to remove.' : 'No new roles to request.');
        }
        const createdRequests = [];
        for (const role of rolesToRequest) {
            const notePrefix = requestType === role_request_type_1.RoleRequestType.REMOVE ? '[REMOVE] ' : '';
            const request = this.roleRequestRepo.create({
                userId: user.id,
                requestedRoles: [role],
                status: enums_1.RoleRequestStatus.PENDING,
                decisionNote: `${notePrefix}${(_b = dto.note) !== null && _b !== void 0 ? _b : ''}`.trim(),
            });
            const savedRequest = await this.roleRequestRepo.save(request);
            savedRequest.requestType = requestType;
            createdRequests.push(savedRequest);
        }
        try {
            await this.emailService.sendRoleRequestSubmitted(user.email, user.fullName, createdRequests.map((req) => req.requestedRoles[0]));
        }
        catch (_c) {
        }
        return createdRequests;
    }
    async listMine(user) {
        const results = await this.roleRequestRepo.find({
            where: { userId: user.id },
            order: { createdAt: 'DESC' },
        });
        return results.map((r) => this.attachRequestType(r));
    }
    async listAll() {
        const results = await this.roleRequestRepo.find({
            order: { createdAt: 'DESC' },
        });
        return results.map((r) => this.attachRequestType(r));
    }
    async decide(id, reviewer, dto) {
        var _a, _b, _c, _d;
        const request = await this.roleRequestRepo.findOne({ where: { id } });
        if (!request) {
            throw new common_1.NotFoundException('Role request not found');
        }
        if (request.status !== enums_1.RoleRequestStatus.PENDING) {
            throw new common_1.BadRequestException('Request already decided');
        }
        request.status = dto.status;
        request.reviewedBy = reviewer.id;
        request.reviewedAt = new Date();
        request.decisionNote = (_a = dto.note) !== null && _a !== void 0 ? _a : null;
        const user = await this.userRepo.findOne({ where: { id: request.userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found for this request');
        }
        const reqType = (_b = this.extractRequestType(request)) !== null && _b !== void 0 ? _b : role_request_type_1.RoleRequestType.ASSIGN;
        if (dto.status === enums_1.RoleRequestStatus.APPROVED) {
            const currentRoles = Array.isArray(user.roles) ? user.roles : [];
            if (reqType === role_request_type_1.RoleRequestType.REMOVE) {
                const updated = currentRoles.filter((r) => !request.requestedRoles.includes(r));
                user.roles = updated;
                if (request.requestedRoles.includes(user.role)) {
                    user.role = updated[0] || enums_1.UserRole.PUBLIC;
                }
            }
            else {
                const merged = Array.from(new Set([...currentRoles, ...request.requestedRoles]));
                user.roles = merged;
                if (!user.role || user.role === enums_1.UserRole.PUBLIC) {
                    user.role = (_c = request.requestedRoles[0]) !== null && _c !== void 0 ? _c : user.role;
                }
            }
            await this.userRepo.save(user);
        }
        const saved = await this.roleRequestRepo.save(request);
        saved.requestType = reqType;
        try {
            await this.emailService.sendRoleRequestDecision(user.email, user.fullName, request.requestedRoles, saved.status, (_d = saved.decisionNote) !== null && _d !== void 0 ? _d : undefined);
        }
        catch (_e) {
        }
        return saved;
    }
    extractRequestType(request) {
        if (request.requestType)
            return request.requestType;
        const note = request.decisionNote || '';
        if (note.startsWith('[REMOVE]'))
            return role_request_type_1.RoleRequestType.REMOVE;
        return role_request_type_1.RoleRequestType.ASSIGN;
    }
    attachRequestType(request) {
        request.requestType = this.extractRequestType(request);
        return request;
    }
};
exports.RoleRequestService = RoleRequestService;
exports.RoleRequestService = RoleRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_request_entity_1.RoleRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(system_user_entity_1.SystemUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], RoleRequestService);
//# sourceMappingURL=role-request.service.js.map