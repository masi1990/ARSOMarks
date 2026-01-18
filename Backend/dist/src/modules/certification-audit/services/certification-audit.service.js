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
exports.CertificationAuditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const enums_1 = require("../../../shared/enums");
let CertificationAuditService = class CertificationAuditService {
    constructor(auditRepository, findingRepository, correctiveActionRepository, samplingRepository, labRepository, testResultRepository) {
        this.auditRepository = auditRepository;
        this.findingRepository = findingRepository;
        this.correctiveActionRepository = correctiveActionRepository;
        this.samplingRepository = samplingRepository;
        this.labRepository = labRepository;
        this.testResultRepository = testResultRepository;
    }
    async createAudit(dto, userId) {
        this.validateAuditDates(dto.plannedDate, dto.windowStart, dto.windowEnd);
        const audit = this.auditRepository.create(Object.assign(Object.assign({}, dto), { status: enums_1.ComplianceStatus.SCHEDULED, createdBy: userId, updatedBy: userId }));
        return this.auditRepository.save(audit);
    }
    async updateAudit(id, dto, userId) {
        var _a, _b, _c;
        const audit = await this.auditRepository.findOne({ where: { id } });
        if (!audit) {
            throw new common_1.NotFoundException('Audit not found');
        }
        this.validateAuditDates((_a = dto.plannedDate) !== null && _a !== void 0 ? _a : audit.plannedDate, (_b = dto.windowStart) !== null && _b !== void 0 ? _b : audit.windowStart, (_c = dto.windowEnd) !== null && _c !== void 0 ? _c : audit.windowEnd);
        Object.assign(audit, dto, { updatedBy: userId });
        return this.auditRepository.save(audit);
    }
    async markAuditComplete(id, userId) {
        const audit = await this.auditRepository.findOne({ where: { id } });
        if (!audit) {
            throw new common_1.NotFoundException('Audit not found');
        }
        audit.status = enums_1.ComplianceStatus.COMPLETED;
        audit.updatedBy = userId;
        return this.auditRepository.save(audit);
    }
    async listAudits(filters) {
        const query = this.auditRepository.createQueryBuilder('audit');
        if (filters === null || filters === void 0 ? void 0 : filters.applicationId) {
            query.andWhere('audit.applicationId = :applicationId', { applicationId: filters.applicationId });
        }
        const data = await query
            .leftJoinAndSelect('audit.findings', 'findings')
            .leftJoinAndSelect('audit.samplingRecords', 'samplingRecords')
            .orderBy('audit.createdAt', 'DESC')
            .getMany();
        return data;
    }
    async getAudit(id) {
        const audit = await this.auditRepository.findOne({
            where: { id },
            relations: ['findings', 'samplingRecords', 'samplingRecords.testResults'],
        });
        if (!audit) {
            throw new common_1.NotFoundException('Audit not found');
        }
        return audit;
    }
    async addFinding(dto, userId) {
        const audit = await this.auditRepository.findOne({ where: { id: dto.auditId } });
        if (!audit) {
            throw new common_1.NotFoundException('Audit not found');
        }
        const finding = this.findingRepository.create({
            auditId: dto.auditId,
            findingType: dto.findingType,
            description: dto.description,
            deadlineDate: dto.deadlineDate,
            status: enums_1.AuditFindingStatus.OPEN,
            createdBy: userId,
        });
        return this.findingRepository.save(finding);
    }
    async addCorrectiveAction(dto, userId) {
        const finding = await this.findingRepository.findOne({ where: { id: dto.findingId } });
        if (!finding) {
            throw new common_1.NotFoundException('Finding not found');
        }
        const action = this.correctiveActionRepository.create({
            findingId: dto.findingId,
            actionPlan: dto.actionPlan,
            evidenceNotes: dto.evidenceNotes,
            status: enums_1.CorrectiveActionStatus.PENDING,
            verifiedBy: undefined,
            verifiedAt: undefined,
        });
        return this.correctiveActionRepository.save(action);
    }
    async addSamplingRecord(dto, userId) {
        const audit = await this.auditRepository.findOne({ where: { id: dto.auditId } });
        if (!audit) {
            throw new common_1.NotFoundException('Audit not found');
        }
        const record = this.samplingRepository.create({
            auditId: dto.auditId,
            samplingMethod: dto.samplingMethod,
            samplingLocation: dto.samplingLocation,
            quantity: dto.quantity,
            quantityUnit: dto.quantityUnit,
            traceability: dto.traceability,
            sampledAt: dto.sampledAt,
            status: enums_1.SamplingStatus.COLLECTED,
            createdBy: userId,
        });
        return this.samplingRepository.save(record);
    }
    async addTestResult(dto) {
        const sampling = await this.samplingRepository.findOne({ where: { id: dto.samplingId } });
        if (!sampling) {
            throw new common_1.NotFoundException('Sampling record not found');
        }
        if (dto.laboratoryId) {
            const lab = await this.labRepository.findOne({ where: { id: dto.laboratoryId } });
            if (!lab) {
                throw new common_1.NotFoundException('Laboratory not found');
            }
            if (!lab.isAccredited) {
                throw new common_1.BadRequestException('Laboratory must be accredited for test results');
            }
        }
        const testResult = this.testResultRepository.create({
            samplingId: dto.samplingId,
            laboratoryId: dto.laboratoryId,
            parameters: dto.parameters,
            reportFilePath: dto.reportFilePath,
            resultStatus: dto.resultStatus,
            testedAt: dto.testedAt,
        });
        return this.testResultRepository.save(testResult);
    }
    async createLaboratory(dto) {
        var _a;
        if (dto.isAccredited && !dto.accreditationNumber) {
            throw new common_1.BadRequestException('Accreditation number is required for accredited laboratories');
        }
        const lab = this.labRepository.create(Object.assign(Object.assign({}, dto), { isAccredited: (_a = dto.isAccredited) !== null && _a !== void 0 ? _a : false }));
        return this.labRepository.save(lab);
    }
    async listLaboratories() {
        return this.labRepository.find({ order: { name: 'ASC' } });
    }
    async closeFinding(findingId, userId) {
        const finding = await this.findingRepository.findOne({ where: { id: findingId } });
        if (!finding) {
            throw new common_1.NotFoundException('Finding not found');
        }
        finding.status = enums_1.AuditFindingStatus.CLOSED;
        finding.closedAt = new Date();
        return this.findingRepository.save(finding);
    }
    async updateCorrectiveActionStatus(id, dto, userId) {
        const action = await this.correctiveActionRepository.findOne({ where: { id } });
        if (!action) {
            throw new common_1.NotFoundException('Corrective action not found');
        }
        action.status = dto.status;
        action.decisionNotes = dto.decisionNotes;
        action.verifiedBy = userId;
        action.verifiedAt = new Date();
        return this.correctiveActionRepository.save(action);
    }
    validateAuditDates(plannedDate, windowStart, windowEnd) {
        if (windowStart && windowEnd) {
            const start = new Date(windowStart);
            const end = new Date(windowEnd);
            if (end < start) {
                throw new common_1.BadRequestException('Audit window end must be after window start');
            }
            if (plannedDate) {
                const planned = new Date(plannedDate);
                if (planned < start || planned > end) {
                    throw new common_1.BadRequestException('Planned audit date must be within the audit window');
                }
            }
        }
    }
};
exports.CertificationAuditService = CertificationAuditService;
exports.CertificationAuditService = CertificationAuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CertificationAudit)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.CertificationAuditFinding)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.CorrectiveAction)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.SamplingRecord)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.Laboratory)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.TestResult)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CertificationAuditService);
//# sourceMappingURL=certification-audit.service.js.map