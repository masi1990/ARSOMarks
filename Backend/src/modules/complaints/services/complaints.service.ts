import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Complaint } from '../entities/complaint.entity';
import { Appeal } from '../entities/appeal.entity';
import { CreateAppealDto, CreateComplaintDto, ReviewAppealDto, ReviewComplaintDto } from '../dtos';
import { ComplaintUploadService } from './complaint-upload.service';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
    @InjectRepository(Appeal)
    private readonly appealRepository: Repository<Appeal>,
    private readonly complaintUploadService: ComplaintUploadService,
  ) {}

  async createComplaint(dto: CreateComplaintDto) {
    const complaintNumber = await this.generateComplaintNumber();
    const complaint = this.complaintRepository.create({
      ...dto,
      complaintNumber,
    });
    return this.complaintRepository.save(complaint);
  }

  async listComplaints() {
    return this.complaintRepository.find({ order: { createdAt: 'DESC' } });
  }

  async reviewComplaint(id: string, dto: ReviewComplaintDto) {
    const complaint = await this.complaintRepository.findOne({ where: { id } });
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
    complaint.status = dto.status;
    complaint.decisionNotes = dto.decisionNotes;
    return this.complaintRepository.save(complaint);
  }

  async createAppeal(dto: CreateAppealDto) {
    const complaint = await this.complaintRepository.findOne({ where: { id: dto.complaintId } });
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
    const appealNumber = await this.generateAppealNumber();
    const appeal = this.appealRepository.create({
      ...dto,
      appealNumber,
    });
    return this.appealRepository.save(appeal);
  }

  async listAppeals() {
    return this.appealRepository.find({ relations: ['complaint'], order: { createdAt: 'DESC' } });
  }

  async reviewAppeal(id: string, dto: ReviewAppealDto) {
    const appeal = await this.appealRepository.findOne({ where: { id } });
    if (!appeal) {
      throw new NotFoundException('Appeal not found');
    }
    appeal.status = dto.status;
    appeal.decisionNotes = dto.decisionNotes;
    return this.appealRepository.save(appeal);
  }

  async addComplaintEvidence(complaintId: string, file: Express.Multer.File) {
    const complaint = await this.complaintRepository.findOne({ where: { id: complaintId } });
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    const upload = await this.complaintUploadService.uploadFile(file, complaintId);
    const evidenceEntry = {
      id: `evidence-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      ...upload,
      uploadedAt: new Date().toISOString(),
    };

    const existing = (complaint.evidenceFiles || []) as any[];
    complaint.evidenceFiles = [...existing, evidenceEntry];

    await this.complaintRepository.save(complaint);
    return evidenceEntry;
  }

  private async generateComplaintNumber() {
    const year = new Date().getFullYear();
    const count = await this.complaintRepository.count({
      where: { complaintNumber: Like(`CMP-${year}-%`) },
    });
    const sequence = String(count + 1).padStart(6, '0');
    return `CMP-${year}-${sequence}`;
  }

  private async generateAppealNumber() {
    const year = new Date().getFullYear();
    const count = await this.appealRepository.count({
      where: { appealNumber: Like(`APL-${year}-%`) },
    });
    const sequence = String(count + 1).padStart(6, '0');
    return `APL-${year}-${sequence}`;
  }
}
