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
exports.TraceabilityPublicController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const traceability_service_1 = require("../services/traceability.service");
let TraceabilityPublicController = class TraceabilityPublicController {
    constructor(traceabilityService) {
        this.traceabilityService = traceabilityService;
    }
    async listProducts(search, category, country, standard, skip, limit, req) {
        var _a, _b, _c, _d;
        const filters = {
            search,
            category,
            country,
            standardCode: standard,
            skip: skip ? parseInt(skip, 10) : undefined,
            limit: limit ? parseInt(limit, 10) : undefined,
        };
        await this.traceabilityService.logSearch(search, filters, {
            ip: this.getIp(req),
            country: (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a['x-geo-country'],
            city: (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b['x-geo-city'],
            lat: this.parseNumber((_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c['x-geo-lat']),
            lon: this.parseNumber((_d = req === null || req === void 0 ? void 0 : req.headers) === null || _d === void 0 ? void 0 : _d['x-geo-lon']),
        });
        return this.traceabilityService.publicProducts(filters);
    }
    async productDetail(id) {
        return this.traceabilityService.publicProductDetail(id);
    }
    async verify(token, req) {
        var _a, _b, _c, _d, _e;
        const dto = {
            token,
            country: (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a['x-geo-country'],
            city: (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b['x-geo-city'],
            lat: this.parseNumber((_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c['x-geo-lat']),
            lon: this.parseNumber((_d = req === null || req === void 0 ? void 0 : req.headers) === null || _d === void 0 ? void 0 : _d['x-geo-lon']),
        };
        return this.traceabilityService.verifyToken(dto, {
            ip: this.getIp(req),
            userAgent: (_e = req === null || req === void 0 ? void 0 : req.headers) === null || _e === void 0 ? void 0 : _e['user-agent'],
        });
    }
    getIp(req) {
        var _a, _b;
        if (!req)
            return undefined;
        const forwarded = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['x-forwarded-for'];
        if (Array.isArray(forwarded))
            return forwarded[0];
        if (typeof forwarded === 'string')
            return (_b = forwarded.split(',')[0]) === null || _b === void 0 ? void 0 : _b.trim();
        return req.ip;
    }
    parseNumber(value) {
        if (value === undefined || value === null)
            return undefined;
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : undefined;
    }
};
exports.TraceabilityPublicController = TraceabilityPublicController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('country')),
    __param(3, (0, common_1.Query)('standard')),
    __param(4, (0, common_1.Query)('skip')),
    __param(5, (0, common_1.Query)('limit')),
    __param(6, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TraceabilityPublicController.prototype, "listProducts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TraceabilityPublicController.prototype, "productDetail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('verify'),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TraceabilityPublicController.prototype, "verify", null);
exports.TraceabilityPublicController = TraceabilityPublicController = __decorate([
    (0, common_1.Controller)('public/traceability'),
    __metadata("design:paramtypes", [traceability_service_1.TraceabilityService])
], TraceabilityPublicController);
//# sourceMappingURL=traceability-public.controller.js.map