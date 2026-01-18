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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintUploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
let ComplaintUploadService = class ComplaintUploadService {
    constructor(configService) {
        this.configService = configService;
        this.uploadDir = this.configService.get('COMPLAINT_UPLOAD_DIR') || './uploads/complaints';
        this.ensureUploadDir();
    }
    async ensureUploadDir() {
        try {
            await fs.mkdir(this.uploadDir, { recursive: true });
        }
        catch (error) {
        }
    }
    async uploadFile(file, complaintId) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        const allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/png',
            'image/jpeg',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only PDF, DOC, DOCX, PNG, and JPG are allowed.');
        }
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File size exceeds maximum allowed size of 10MB.');
        }
        const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
        const fileExtension = path.extname(file.originalname);
        const timestamp = Date.now();
        const fileName = `${complaintId}-evidence-${timestamp}${fileExtension}`;
        const filePath = path.join(this.uploadDir, fileName);
        await fs.writeFile(filePath, file.buffer);
        return {
            fileName: file.originalname,
            filePath: path.relative(process.cwd(), filePath),
            fileHash,
            fileSize: file.size,
            mimeType: file.mimetype,
        };
    }
};
exports.ComplaintUploadService = ComplaintUploadService;
exports.ComplaintUploadService = ComplaintUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ComplaintUploadService);
//# sourceMappingURL=complaint-upload.service.js.map