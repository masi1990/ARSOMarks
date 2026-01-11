import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { UploadDocumentDto } from './dtos/upload-document.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':applicationId')
  list(@Param('applicationId') applicationId: string) {
    return this.documentService.list(applicationId);
  }

  @Post(':applicationId/upload')
  upload(@Param('applicationId') applicationId: string, @Body() dto: UploadDocumentDto) {
    return this.documentService.upload(applicationId, dto);
  }
}

