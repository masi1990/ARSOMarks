import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CertificationAudit,
  CertificationAuditFinding,
  CorrectiveAction,
  SamplingRecord,
  Laboratory,
  TestResult,
} from '../entities';
import {
  AuditFindingStatus,
  ComplianceStatus,
  CorrectiveActionStatus,
  SamplingStatus,
} from '../../../shared/enums';
import {
  CreateCertificationAuditDto,
  UpdateCertificationAuditDto,
  CreateAuditFindingDto,
  CreateCorrectiveActionDto,
  CreateSamplingRecordDto,
  CreateLaboratoryDto,
  CreateTestResultDto,
  UpdateCorrectiveActionStatusDto,
} from '../dtos';

@Injectable()
export class CertificationAuditService {
  constructor(
    @InjectRepository(CertificationAudit)
    private readonly auditRepository: Repository<CertificationAudit>,
    @InjectRepository(CertificationAuditFinding)
    private readonly findingRepository: Repository<CertificationAuditFinding>,
    @InjectRepository(CorrectiveAction)
    private readonly correctiveActionRepository: Repository<CorrectiveAction>,
    @InjectRepository(SamplingRecord)
    private readonly samplingRepository: Repository<SamplingRecord>,
    @InjectRepository(Laboratory)
    private readonly labRepository: Repository<Laboratory>,
    @InjectRepository(TestResult)
    private readonly testResultRepository: Repository<TestResult>,
  ) {}

  async createAudit(dto: CreateCertificationAuditDto, userId: string) {
    this.validateAuditDates(dto.plannedDate, dto.windowStart, dto.windowEnd);
    const audit = this.auditRepository.create({
      ...dto,
      status: ComplianceStatus.SCHEDULED,
      createdBy: userId,
      updatedBy: userId,
    });
    return this.auditRepository.save(audit);
  }

  async updateAudit(id: string, dto: UpdateCertificationAuditDto, userId: string) {
    const audit = await this.auditRepository.findOne({ where: { id } });
    if (!audit) {
      throw new NotFoundException('Audit not found');
    }
    this.validateAuditDates(dto.plannedDate ?? audit.plannedDate, dto.windowStart ?? audit.windowStart, dto.windowEnd ?? audit.windowEnd);
    Object.assign(audit, dto, { updatedBy: userId });
    return this.auditRepository.save(audit);
  }

  async markAuditComplete(id: string, userId: string) {
    const audit = await this.auditRepository.findOne({ where: { id } });
    if (!audit) {
      throw new NotFoundException('Audit not found');
    }
    audit.status = ComplianceStatus.COMPLETED;
    audit.updatedBy = userId;
    return this.auditRepository.save(audit);
  }

  async listAudits(filters?: { applicationId?: string }) {
    const query = this.auditRepository.createQueryBuilder('audit');
    if (filters?.applicationId) {
      query.andWhere('audit.applicationId = :applicationId', { applicationId: filters.applicationId });
    }
    const data = await query
      .leftJoinAndSelect('audit.findings', 'findings')
      .leftJoinAndSelect('audit.samplingRecords', 'samplingRecords')
      .orderBy('audit.createdAt', 'DESC')
      .getMany();
    return data;
  }

  async getAudit(id: string) {
    const audit = await this.auditRepository.findOne({
      where: { id },
      relations: ['findings', 'samplingRecords', 'samplingRecords.testResults'],
    });
    if (!audit) {
      throw new NotFoundException('Audit not found');
    }
    return audit;
  }

  async addFinding(dto: CreateAuditFindingDto, userId: string) {
    const audit = await this.auditRepository.findOne({ where: { id: dto.auditId } });
    if (!audit) {
      throw new NotFoundException('Audit not found');
    }
    const finding = this.findingRepository.create({
      auditId: dto.auditId,
      findingType: dto.findingType,
      description: dto.description,
      deadlineDate: dto.deadlineDate,
      status: AuditFindingStatus.OPEN,
      createdBy: userId,
    });
    return this.findingRepository.save(finding);
  }

  async addCorrectiveAction(dto: CreateCorrectiveActionDto, userId: string) {
    const finding = await this.findingRepository.findOne({ where: { id: dto.findingId } });
    if (!finding) {
      throw new NotFoundException('Finding not found');
    }
    const action = this.correctiveActionRepository.create({
      findingId: dto.findingId,
      actionPlan: dto.actionPlan,
      evidenceNotes: dto.evidenceNotes,
      status: CorrectiveActionStatus.PENDING,
      verifiedBy: undefined,
      verifiedAt: undefined,
    });
    return this.correctiveActionRepository.save(action);
  }

  async addSamplingRecord(dto: CreateSamplingRecordDto, userId: string) {
    const audit = await this.auditRepository.findOne({ where: { id: dto.auditId } });
    if (!audit) {
      throw new NotFoundException('Audit not found');
    }
    const record = this.samplingRepository.create({
      auditId: dto.auditId,
      samplingMethod: dto.samplingMethod,
      samplingLocation: dto.samplingLocation,
      quantity: dto.quantity,
      quantityUnit: dto.quantityUnit,
      traceability: dto.traceability,
      sampledAt: dto.sampledAt,
      status: SamplingStatus.COLLECTED,
      createdBy: userId,
    });
    return this.samplingRepository.save(record);
  }

  async addTestResult(dto: CreateTestResultDto) {
    const sampling = await this.samplingRepository.findOne({ where: { id: dto.samplingId } });
    if (!sampling) {
      throw new NotFoundException('Sampling record not found');
    }
    if (dto.laboratoryId) {
      const lab = await this.labRepository.findOne({ where: { id: dto.laboratoryId } });
      if (!lab) {
        throw new NotFoundException('Laboratory not found');
      }
      if (!lab.isAccredited) {
        throw new BadRequestException('Laboratory must be accredited for test results');
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

  async createLaboratory(dto: CreateLaboratoryDto) {
    if (dto.isAccredited && !dto.accreditationNumber) {
      throw new BadRequestException('Accreditation number is required for accredited laboratories');
    }
    const lab = this.labRepository.create({
      ...dto,
      isAccredited: dto.isAccredited ?? false,
    });
    return this.labRepository.save(lab);
  }

  async listLaboratories() {
    return this.labRepository.find({ order: { name: 'ASC' } });
  }

  async closeFinding(findingId: string, userId: string) {
    const finding = await this.findingRepository.findOne({ where: { id: findingId } });
    if (!finding) {
      throw new NotFoundException('Finding not found');
    }
    finding.status = AuditFindingStatus.CLOSED;
    finding.closedAt = new Date();
    return this.findingRepository.save(finding);
  }

  async updateCorrectiveActionStatus(id: string, dto: UpdateCorrectiveActionStatusDto, userId: string) {
    const action = await this.correctiveActionRepository.findOne({ where: { id } });
    if (!action) {
      throw new NotFoundException('Corrective action not found');
    }
    action.status = dto.status;
    action.decisionNotes = dto.decisionNotes;
    action.verifiedBy = userId;
    action.verifiedAt = new Date();
    return this.correctiveActionRepository.save(action);
  }

  private validateAuditDates(plannedDate?: string, windowStart?: string, windowEnd?: string) {
    if (windowStart && windowEnd) {
      const start = new Date(windowStart);
      const end = new Date(windowEnd);
      if (end < start) {
        throw new BadRequestException('Audit window end must be after window start');
      }
      if (plannedDate) {
        const planned = new Date(plannedDate);
        if (planned < start || planned > end) {
          throw new BadRequestException('Planned audit date must be within the audit window');
        }
      }
    }
  }
}
