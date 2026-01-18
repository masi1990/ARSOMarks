import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { EvidenceParentType } from '../../shared/enums';
import { UploadEvidenceDto } from './dtos/upload-evidence.dto';
import { EvidenceService } from './evidence.service';

@Controller('evidence')
@UseGuards(JwtAuthGuard)
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Post(':parentType/:parentId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  uploadEvidence(
    @Param('parentType', new ParseEnumPipe(EvidenceParentType)) parentType: EvidenceParentType,
    @Param('parentId') parentId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe({ whitelist: true, transform: true })) dto: UploadEvidenceDto,
    @Req() req: any,
  ) {
    const userId = req?.user?.id;
    return this.evidenceService.upload(parentType, parentId, files, userId, dto);
  }

  @Get(':parentType/:parentId')
  listEvidence(
    @Param('parentType', new ParseEnumPipe(EvidenceParentType)) parentType: EvidenceParentType,
    @Param('parentId') parentId: string,
  ) {
    return this.evidenceService.list(parentType, parentId);
  }

  @Get(':id/download')
  async downloadEvidence(@Param('id') id: string, @Res() res: any) {
    const { record, stream } = await this.evidenceService.getFile(id);
    res.setHeader('Content-Type', record.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${record.originalName}"`);
    stream.pipe(res);
  }
}
