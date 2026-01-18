import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CbApplicationService } from '../services/cb-application.service';
import {
  CreateCbApplicationDto,
  CreateCbApplicationDraftDto,
  UpdateCbApplicationDto,
  UploadCbApplicationDocumentDto,
  UpdateCbStatusDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';
import { CbApplicationStatus, CbDocumentType, UserRole } from '../../../shared/enums';

@Controller('cb-applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CbApplicationController {
  constructor(private readonly cbApplicationService: CbApplicationService) {}

  @Post('draft')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  createDraft(@Body() dto: CreateCbApplicationDraftDto, @CurrentUser() user: SystemUser) {
    return this.cbApplicationService.createDraft(dto, user.id);
  }

  @Post()
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  create(@Body() dto: CreateCbApplicationDto, @CurrentUser() user: SystemUser) {
    return this.cbApplicationService.create(dto, user.id);
  }

  @Put(':id')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  update(@Param('id') id: string, @Body() dto: UpdateCbApplicationDto, @CurrentUser() user: SystemUser) {
    return this.cbApplicationService.updateDraft(id, dto, user.id);
  }

  @Post(':id/submit')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  submit(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.cbApplicationService.submit(id, user.id);
  }

  @Post(':id/approve')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  approve(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.cbApplicationService.approve(id, user.id);
  }

  @Post(':id/reject')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  reject(@Param('id') id: string, @Body() body: { reason?: string }, @CurrentUser() user: SystemUser) {
    if (!body?.reason) {
      throw new BadRequestException('Rejection reason is required');
    }
    return this.cbApplicationService.reject(id, body.reason, user.id);
  }

  @Post(':id/status')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateCbStatusDto, @CurrentUser() user: SystemUser) {
    return this.cbApplicationService.updateLifecycle(id, dto, user.id);
  }

  @Get('my-applications')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  getMyApplications(@CurrentUser() user: SystemUser) {
    return this.cbApplicationService.findByUserId(user.id);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  list(@Query() query: any) {
    const { status, search, skip = 0, limit = 25 } = query;
    const filters: any = {
      status: status as CbApplicationStatus,
      search,
      skip: Number(skip),
      limit: Number(limit),
    };
    return this.cbApplicationService.list(filters);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  getById(@Param('id') id: string) {
    return this.cbApplicationService.findById(id);
  }

  @Post(':id/documents')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadCbApplicationDocumentDto,
    @CurrentUser() user: SystemUser,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!body?.documentType) {
      throw new BadRequestException('Document type is required');
    }
    if (!Object.values(CbDocumentType).includes(body.documentType)) {
      throw new BadRequestException('Invalid document type');
    }
    return this.cbApplicationService.uploadDocument(id, file, body.documentType, user.id);
  }

  @Get(':id/documents')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.PUBLIC)
  listDocuments(@Param('id') id: string) {
    return this.cbApplicationService.listDocuments(id);
  }
}
