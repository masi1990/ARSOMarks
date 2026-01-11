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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("./document.service");
const upload_document_dto_1 = require("./dtos/upload-document.dto");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    list(applicationId) {
        return this.documentService.list(applicationId);
    }
    upload(applicationId, dto) {
        return this.documentService.upload(applicationId, dto);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Get)(':applicationId'),
    __param(0, (0, common_1.Param)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':applicationId/upload'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upload_document_dto_1.UploadDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "upload", null);
exports.DocumentController = DocumentController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map