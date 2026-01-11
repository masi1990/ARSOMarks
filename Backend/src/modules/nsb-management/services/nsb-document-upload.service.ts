import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import { NsbDocumentType } from '../../../shared/enums';

@Injectable()
export class NsbDocumentUploadService {
  private readonly uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR') || './uploads/nsb-documents';
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    entityId: string,
    documentType: NsbDocumentType | string,
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

    // Validate file type (PDF, DOC, DOCX)
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds maximum allowed size of 10MB.');
    }

    // Generate file hash
    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    // Generate unique file name
    const fileExtension = path.extname(file.originalname);
    const timestamp = Date.now();
    const fileName = `${entityId}-${documentType}-${timestamp}${fileExtension}`;
    const filePath = path.join(this.uploadDir, fileName);

    // Save file to disk
    await fs.writeFile(filePath, file.buffer);

    return {
      fileName: file.originalname,
      filePath: path.relative(process.cwd(), filePath),
      fileHash,
      fileSize: file.size,
      mimeType: file.mimetype,
    };
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
      await fs.unlink(fullPath);
    } catch (error) {
      // File might not exist, ignore error
    }
  }

  async getFile(filePath: string): Promise<Buffer> {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    try {
      return await fs.readFile(fullPath);
    } catch (error) {
      throw new BadRequestException('File not found');
    }
  }
}

