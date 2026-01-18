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
exports.ComplaintsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const complaint_entity_1 = require("../entities/complaint.entity");
const appeal_entity_1 = require("../entities/appeal.entity");
const complaint_upload_service_1 = require("./complaint-upload.service");
let ComplaintsService = class ComplaintsService {
    constructor(complaintRepository, appealRepository, complaintUploadService) {
        this.complaintRepository = complaintRepository;
        this.appealRepository = appealRepository;
        this.complaintUploadService = complaintUploadService;
    }
    async createComplaint(dto) {
        const complaintNumber = await this.generateComplaintNumber();
        const complaint = this.complaintRepository.create(Object.assign(Object.assign({}, dto), { complaintNumber }));
        return this.complaintRepository.save(complaint);
    }
    async listComplaints() {
        return this.complaintRepository.find({ order: { createdAt: 'DESC' } });
    }
    async reviewComplaint(id, dto) {
        const complaint = await this.complaintRepository.findOne({ where: { id } });
        if (!complaint) {
            throw new common_1.NotFoundException('Complaint not found');
        }
        complaint.status = dto.status;
        complaint.decisionNotes = dto.decisionNotes;
        return this.complaintRepository.save(complaint);
    }
    async createAppeal(dto) {
        const complaint = await this.complaintRepository.findOne({ where: { id: dto.complaintId } });
        if (!complaint) {
            throw new common_1.NotFoundException('Complaint not found');
        }
        const appealNumber = await this.generateAppealNumber();
        const appeal = this.appealRepository.create(Object.assign(Object.assign({}, dto), { appealNumber }));
        return this.appealRepository.save(appeal);
    }
    async listAppeals() {
        return this.appealRepository.find({ relations: ['complaint'], order: { createdAt: 'DESC' } });
    }
    async reviewAppeal(id, dto) {
        const appeal = await this.appealRepository.findOne({ where: { id } });
        if (!appeal) {
            throw new common_1.NotFoundException('Appeal not found');
        }
        appeal.status = dto.status;
        appeal.decisionNotes = dto.decisionNotes;
        return this.appealRepository.save(appeal);
    }
    async addComplaintEvidence(complaintId, file) {
        const complaint = await this.complaintRepository.findOne({ where: { id: complaintId } });
        if (!complaint) {
            throw new common_1.NotFoundException('Complaint not found');
        }
        const upload = await this.complaintUploadService.uploadFile(file, complaintId);
        const evidenceEntry = Object.assign(Object.assign({ id: `evidence-${Date.now()}-${Math.random().toString(36).slice(2, 9)}` }, upload), { uploadedAt: new Date().toISOString() });
        const existing = (complaint.evidenceFiles || []);
        complaint.evidenceFiles = [...existing, evidenceEntry];
        await this.complaintRepository.save(complaint);
        return evidenceEntry;
    }
    async generateComplaintNumber() {
        const year = new Date().getFullYear();
        const count = await this.complaintRepository.count({
            where: { complaintNumber: (0, typeorm_2.Like)(`CMP-${year}-%`) },
        });
        const sequence = String(count + 1).padStart(6, '0');
        return `CMP-${year}-${sequence}`;
    }
    async generateAppealNumber() {
        const year = new Date().getFullYear();
        const count = await this.appealRepository.count({
            where: { appealNumber: (0, typeorm_2.Like)(`APL-${year}-%`) },
        });
        const sequence = String(count + 1).padStart(6, '0');
        return `APL-${year}-${sequence}`;
    }
};
exports.ComplaintsService = ComplaintsService;
exports.ComplaintsService = ComplaintsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(complaint_entity_1.Complaint)),
    __param(1, (0, typeorm_1.InjectRepository)(appeal_entity_1.Appeal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        complaint_upload_service_1.ComplaintUploadService])
], ComplaintsService);
//# sourceMappingURL=complaints.service.js.map