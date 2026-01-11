import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { NsbRegistrationRequestService } from '../services/nsb-registration-request.service';
import {
  CreateNsbRegistrationRequestDto,
  UpdateNsbRegistrationRequestDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';
import { NsbDocumentType } from '../../../shared/enums';

@Controller('nsb-registration-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NsbRegistrationRequestController {
  constructor(private readonly requestService: NsbRegistrationRequestService) {}

  @Post()
  @Roles(UserRole.PUBLIC, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  create(@Body() dto: CreateNsbRegistrationRequestDto, @CurrentUser() user: SystemUser) {
    return this.requestService.create(dto, user.id);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  list(@Query() query: any) {
    const { countryId, status, search, skip = 0, limit = 25 } = query;
    const filter = { countryId, status, search, skip: Number(skip), limit: Number(limit) };
    return this.requestService.findAll(filter);
  }

  @Get('my-request')
  @Roles(UserRole.PUBLIC, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  getMyRequest(@CurrentUser() user: SystemUser, @Query('countryId') countryId?: string) {
    const targetCountryId = countryId || user.countryId;
    if (!targetCountryId) {
      throw new ForbiddenException('Country ID is required');
    }
    return this.requestService.findByCountry(targetCountryId);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.PUBLIC, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  getById(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.requestService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.PUBLIC, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  update(@Param('id') id: string, @Body() dto: UpdateNsbRegistrationRequestDto, @CurrentUser() user: SystemUser) {
    // Get user's primary role (first role if roles array exists, otherwise fallback to role field)
    const userRole = user.roles && user.roles.length > 0 ? user.roles[0] : user.role;
    return this.requestService.update(id, dto, user.id, userRole);
  }

  @Post(':id/submit')
  @Roles(UserRole.PUBLIC, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  submit(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.requestService.submit(id, user.id);
  }

  @Post(':id/approve')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  approve(@Param('id') id: string, @Body() body: { remarks?: string }, @CurrentUser() user: SystemUser) {
    return this.requestService.approve(id, user.id, body.remarks);
  }

  @Post(':id/reject')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  reject(@Param('id') id: string, @Body() body: { remarks: string }, @CurrentUser() user: SystemUser) {
    if (!body.remarks) {
      throw new ForbiddenException('Remarks are required when rejecting a request');
    }
    return this.requestService.reject(id, user.id, body.remarks);
  }

  @Post(':id/documents')
  @Roles(UserRole.PUBLIC, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { documentType: string },
    @CurrentUser() user: SystemUser,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!body.documentType) {
      throw new BadRequestException('Document type is required');
    }
    if (!Object.values(NsbDocumentType).includes(body.documentType as NsbDocumentType)) {
      throw new BadRequestException('Invalid document type');
    }
    return this.requestService.uploadDocument(id, file, body.documentType as NsbDocumentType, user.id);
  }

  @Delete(':id/documents/:documentId')
  @Roles(UserRole.PUBLIC, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  async deleteDocument(@Param('id') id: string, @Param('documentId') documentId: string, @CurrentUser() user: SystemUser) {
    return this.requestService.deleteDocument(id, documentId, user.id);
  }

  @Get(':id/documents/:documentId/view')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.PUBLIC)
  async viewDocument(@Param('id') id: string, @Param('documentId') documentId: string, @Res() res: Response, @CurrentUser() user: SystemUser) {
    const document = await this.requestService.getDocument(id, documentId);
    
    // Get file buffer from upload service
    const fileBuffer = await this.requestService.getDocumentFile(document.filePath);
    
    res.setHeader('Content-Type', document.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${document.fileName}"`);
    res.send(fileBuffer);
  }
}

