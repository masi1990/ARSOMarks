import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NsbDocument } from '../entities/nsb-document.entity';
import { NsbProfileDocumentType } from '../../../shared/enums';
import { NsbDocumentUploadService } from './nsb-document-upload.service';

@Injectable()
export class NsbDocumentService {
  constructor(
    @InjectRepository(NsbDocument)
    private readonly documentRepo: Repository<NsbDocument>,
    private readonly uploadService: NsbDocumentUploadService,
  ) {}

  async uploadDocument(
    nsbId: string,
    file: Express.Multer.File,
    documentType: NsbProfileDocumentType,
    userId: string,
  ): Promise<NsbDocument> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Upload file and get metadata
    const fileMetadata = await this.uploadService.uploadFile(file, nsbId, documentType as any);

    // Check if document of this type already exists and delete it
    const existingDoc = await this.documentRepo.findOne({
      where: { nsbId, documentType },
    });

    if (existingDoc) {
      // Delete old file
      await this.uploadService.deleteFile(existingDoc.filePath);
      await this.documentRepo.remove(existingDoc);
    }

    // Create document record
    const document = this.documentRepo.create({
      nsbId,
      documentType,
      fileName: fileMetadata.fileName,
      filePath: fileMetadata.filePath,
      fileHash: fileMetadata.fileHash,
      fileSize: fileMetadata.fileSize,
      mimeType: fileMetadata.mimeType,
      uploadedBy: userId,
    });

    return this.documentRepo.save(document);
  }

  async deleteDocument(nsbId: string, documentId: string): Promise<void> {
    const document = await this.documentRepo.findOne({
      where: { id: documentId, nsbId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Delete file from disk
    await this.uploadService.deleteFile(document.filePath);

    // Delete document record
    await this.documentRepo.remove(document);
  }

  async getDocument(nsbId: string, documentId: string): Promise<NsbDocument> {
    const document = await this.documentRepo.findOne({
      where: { id: documentId, nsbId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async getDocumentsByNsb(nsbId: string): Promise<NsbDocument[]> {
    return this.documentRepo.find({
      where: { nsbId },
      order: { uploadedAt: 'DESC' },
    });
  }

  async getFile(filePath: string): Promise<Buffer> {
    return this.uploadService.getFile(filePath);
  }
}

