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
exports.EvidenceController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const enums_1 = require("../../shared/enums");
const upload_evidence_dto_1 = require("./dtos/upload-evidence.dto");
const evidence_service_1 = require("./evidence.service");
let EvidenceController = class EvidenceController {
    constructor(evidenceService) {
        this.evidenceService = evidenceService;
    }
    uploadEvidence(parentType, parentId, files, dto, req) {
        var _a;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        return this.evidenceService.upload(parentType, parentId, files, userId, dto);
    }
    listEvidence(parentType, parentId) {
        return this.evidenceService.list(parentType, parentId);
    }
    async downloadEvidence(id, res) {
        const { record, stream } = await this.evidenceService.getFile(id);
        res.setHeader('Content-Type', record.mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${record.originalName}"`);
        stream.pipe(res);
    }
};
exports.EvidenceController = EvidenceController;
__decorate([
    (0, common_1.Post)(':parentType/:parentId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: multer.memoryStorage(),
    })),
    __param(0, (0, common_1.Param)('parentType', new common_1.ParseEnumPipe(enums_1.EvidenceParentType))),
    __param(1, (0, common_1.Param)('parentId')),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true, transform: true }))),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, upload_evidence_dto_1.UploadEvidenceDto, Object]),
    __metadata("design:returntype", void 0)
], EvidenceController.prototype, "uploadEvidence", null);
__decorate([
    (0, common_1.Get)(':parentType/:parentId'),
    __param(0, (0, common_1.Param)('parentType', new common_1.ParseEnumPipe(enums_1.EvidenceParentType))),
    __param(1, (0, common_1.Param)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EvidenceController.prototype, "listEvidence", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EvidenceController.prototype, "downloadEvidence", null);
exports.EvidenceController = EvidenceController = __decorate([
    (0, common_1.Controller)('evidence'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [evidence_service_1.EvidenceService])
], EvidenceController);
//# sourceMappingURL=evidence.controller.js.map