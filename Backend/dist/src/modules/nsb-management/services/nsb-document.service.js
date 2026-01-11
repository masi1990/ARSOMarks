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
exports.NsbDocumentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nsb_document_entity_1 = require("../entities/nsb-document.entity");
const nsb_document_upload_service_1 = require("./nsb-document-upload.service");
let NsbDocumentService = class NsbDocumentService {
    constructor(documentRepo, uploadService) {
        this.documentRepo = documentRepo;
        this.uploadService = uploadService;
    }
    async uploadDocument(nsbId, file, documentType, userId) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        const fileMetadata = await this.uploadService.uploadFile(file, nsbId, documentType);
        const existingDoc = await this.documentRepo.findOne({
            where: { nsbId, documentType },
        });
        if (existingDoc) {
            await this.uploadService.deleteFile(existingDoc.filePath);
            await this.documentRepo.remove(existingDoc);
        }
        const document = this.documentRepo.create({
            nsbId,
            documentType,
            fileName: fileMetadata.fileName,
            filePath: fileMetadata.filePath,
            fileHash: fileMetadata.fileHash,
            fileSize: fileMetadata.fileSize,
            mimeType: fileMetadata.mimeType,
            uploadedBy: userId,
        });
        return this.documentRepo.save(document);
    }
    async deleteDocument(nsbId, documentId) {
        const document = await this.documentRepo.findOne({
            where: { id: documentId, nsbId },
        });
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        await this.uploadService.deleteFile(document.filePath);
        await this.documentRepo.remove(document);
    }
    async getDocument(nsbId, documentId) {
        const document = await this.documentRepo.findOne({
            where: { id: documentId, nsbId },
        });
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        return document;
    }
    async getDocumentsByNsb(nsbId) {
        return this.documentRepo.find({
            where: { nsbId },
            order: { uploadedAt: 'DESC' },
        });
    }
    async getFile(filePath) {
        return this.uploadService.getFile(filePath);
    }
};
exports.NsbDocumentService = NsbDocumentService;
exports.NsbDocumentService = NsbDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nsb_document_entity_1.NsbDocument)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nsb_document_upload_service_1.NsbDocumentUploadService])
], NsbDocumentService);
//# sourceMappingURL=nsb-document.service.js.map