import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { EvidenceParentType } from '../../shared/enums';
import { UploadEvidenceDto } from './dtos/upload-evidence.dto';
import { EvidenceFile } from './entities/evidence-file.entity';

@Injectable()
export class EvidenceService {
  private readonly uploadDir: string;
  private readonly allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
  ];
  private readonly maxSizeBytes = 20 * 1024 * 1024; // 20MB

  constructor(
    @InjectRepository(EvidenceFile)
    private readonly evidenceRepo: Repository<EvidenceFile>,
    private readonly configService: ConfigService,
  ) {
    this.uploadDir = this.configService.get<string>('EVIDENCE_UPLOAD_DIR') || './uploads/evidence';
    this.ensureUploadDir();
  }

  async upload(
    parentType: EvidenceParentType,
    parentId: string,
    files: Express.Multer.File[],
    userId: string | undefined,
    dto?: UploadEvidenceDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required');
    }

    await this.ensureUploadDir();

    const uploads = await Promise.all(
      files.map(async (file) => {
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
          description: dto?.description,
        });
        return this.evidenceRepo.save(record);
      }),
    );

    return uploads;
  }

  list(parentType: EvidenceParentType, parentId: string) {
    return this.evidenceRepo.find({
      where: { parentType, parentId },
      order: { createdAt: 'DESC' },
    });
  }

  async getFile(id: string) {
    const record = await this.evidenceRepo.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException('Evidence not found');
    }
    const absolutePath = path.isAbsolute(record.storedPath)
      ? record.storedPath
      : path.join(process.cwd(), record.storedPath);

    try {
      await fs.access(absolutePath);
    } catch {
      throw new NotFoundException('Stored evidence file missing');
    }

    const stream = createReadStream(absolutePath);
    return { record, stream, absolutePath };
  }

  private async ensureUploadDir() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      // ignore if exists
    }
  }

  private validateFile(file: Express.Multer.File) {
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only PDF, DOC, DOCX, PNG, and JPG are allowed.');
    }
    if (file.size > this.maxSizeBytes) {
      throw new BadRequestException('File size exceeds maximum allowed size of 20MB.');
    }
  }

  private async persistFile(file: Express.Multer.File, parentType: EvidenceParentType, parentId: string) {
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
}
