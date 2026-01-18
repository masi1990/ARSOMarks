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
exports.EvidenceService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const crypto = require("crypto");
const fs = require("fs/promises");
const fs_1 = require("fs");
const path = require("path");
const typeorm_2 = require("typeorm");
const evidence_file_entity_1 = require("./entities/evidence-file.entity");
let EvidenceService = class EvidenceService {
    constructor(evidenceRepo, configService) {
        this.evidenceRepo = evidenceRepo;
        this.configService = configService;
        this.allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/png',
            'image/jpeg',
        ];
        this.maxSizeBytes = 20 * 1024 * 1024;
        this.uploadDir = this.configService.get('EVIDENCE_UPLOAD_DIR') || './uploads/evidence';
        this.ensureUploadDir();
    }
    async upload(parentType, parentId, files, userId, dto) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('At least one file is required');
        }
        await this.ensureUploadDir();
        const uploads = await Promise.all(files.map(async (file) => {
            this.validateFile(file);
            const { storedName, storedPath, hash } = await this.persistFile(file, parentType, parentId);
            const record = this.evidenceRepo.create({
                parentType,
                parentId,
                originalName: file.originalname,
                storedName,
                storedPath,
                mimeType: file.mimetype,
                size: file.size,
                hash,
                uploadedBy: userId,
                description: dto === null || dto === void 0 ? void 0 : dto.description,
            });
            return this.evidenceRepo.save(record);
        }));
        return uploads;
    }
    list(parentType, parentId) {
        return this.evidenceRepo.find({
            where: { parentType, parentId },
            order: { createdAt: 'DESC' },
        });
    }
    async getFile(id) {
        const record = await this.evidenceRepo.findOne({ where: { id } });
        if (!record) {
            throw new common_1.NotFoundException('Evidence not found');
        }
        const absolutePath = path.isAbsolute(record.storedPath)
            ? record.storedPath
            : path.join(process.cwd(), record.storedPath);
        try {
            await fs.access(absolutePath);
        }
        catch (_a) {
            throw new common_1.NotFoundException('Stored evidence file missing');
        }
        const stream = (0, fs_1.createReadStream)(absolutePath);
        return { record, stream, absolutePath };
    }
    async ensureUploadDir() {
        try {
            await fs.mkdir(this.uploadDir, { recursive: true });
        }
        catch (error) {
        }
    }
    validateFile(file) {
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only PDF, DOC, DOCX, PNG, and JPG are allowed.');
        }
        if (file.size > this.maxSizeBytes) {
            throw new common_1.BadRequestException('File size exceeds maximum allowed size of 20MB.');
        }
    }
    async persistFile(file, parentType, parentId) {
        const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');
        const extension = path.extname(file.originalname);
        const timestamp = Date.now();
        const random = crypto.randomBytes(6).toString('hex');
        const storedName = `${parentType}-${parentId}-${timestamp}-${random}${extension}`;
        const fullPath = path.join(this.uploadDir, storedName);
        await fs.writeFile(fullPath, file.buffer);
        const storedPath = path.relative(process.cwd(), fullPath);
        return { storedName, storedPath, hash };
    }
};
exports.EvidenceService = EvidenceService;
exports.EvidenceService = EvidenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evidence_file_entity_1.EvidenceFile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], EvidenceService);
//# sourceMappingURL=evidence.service.js.map