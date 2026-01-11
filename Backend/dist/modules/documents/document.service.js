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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_document_entity_1 = require("../licensing/entities/application-document.entity");
const license_application_entity_1 = require("../licensing/entities/license-application.entity");
let DocumentService = class DocumentService {
    constructor(documentRepo, applicationRepo) {
        this.documentRepo = documentRepo;
        this.applicationRepo = applicationRepo;
    }
    async list(applicationId) {
        await this.ensureApplication(applicationId);
        return this.documentRepo.find({
            where: { applicationId },
            order: { uploadedAt: 'DESC' },
        });
    }
    async upload(applicationId, dto) {
        await this.ensureApplication(applicationId);
        await this.documentRepo.update({ applicationId, documentType: dto.documentType }, { isCurrent: false });
        const record = this.documentRepo.create(Object.assign(Object.assign({}, dto), { applicationId, isCurrent: true, version: 1 }));
        return this.documentRepo.save(record);
    }
    async ensureApplication(applicationId) {
        const app = await this.applicationRepo.findOne({ where: { id: applicationId } });
        if (!app) {
            throw new common_1.NotFoundException('Application not found');
        }
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_document_entity_1.ApplicationDocument)),
    __param(1, (0, typeorm_1.InjectRepository)(license_application_entity_1.LicenseApplication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DocumentService);
//# sourceMappingURL=document.service.js.map