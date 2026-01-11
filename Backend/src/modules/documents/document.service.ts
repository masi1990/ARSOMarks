import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationDocument } from '../licensing/entities/application-document.entity';
import { LicenseApplication } from '../licensing/entities/license-application.entity';
import { UploadDocumentDto } from './dtos/upload-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(ApplicationDocument)
    private readonly documentRepo: Repository<ApplicationDocument>,
    @InjectRepository(LicenseApplication)
    private readonly applicationRepo: Repository<LicenseApplication>,
  ) {}

  async list(applicationId: string) {
    await this.ensureApplication(applicationId);
    return this.documentRepo.find({
      where: { applicationId },
      order: { uploadedAt: 'DESC' },
    });
  }

  async upload(applicationId: string, dto: UploadDocumentDto) {
    await this.ensureApplication(applicationId);

    // Mark previous versions of same type as not current when uploading a new one
    await this.documentRepo.update({ applicationId, documentType: dto.documentType }, { isCurrent: false });

    const record = this.documentRepo.create({
      ...dto,
      applicationId,
      isCurrent: true,
      version: 1,
    });

    return this.documentRepo.save(record);
  }

  private async ensureApplication(applicationId: string) {
    const app = await this.applicationRepo.findOne({ where: { id: applicationId } });
    if (!app) {
      throw new NotFoundException('Application not found');
    }
  }
}

