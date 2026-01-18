import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class ProductCertificationAgreementUploadService {
  private readonly uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('AGREEMENT_UPLOAD_DIR') || './uploads/certification-agreements';
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    applicationId: string,
    agreementType: string,
  ): Promise<{
    fileName: string;
    filePath: string;
    fileHash: string;
    fileSize: number;
    mimeType: string;
  }> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds maximum allowed size of 10MB.');
    }

    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
    const fileExtension = path.extname(file.originalname);
    const timestamp = Date.now();
    const fileName = `${applicationId}-${agreementType}-${timestamp}${fileExtension}`;
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
}
