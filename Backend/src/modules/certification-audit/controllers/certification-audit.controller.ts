import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';
import { UserRole } from '../../../shared/enums';
import { CertificationAuditService } from '../services/certification-audit.service';
import {
  CreateCertificationAuditDto,
  UpdateCertificationAuditDto,
  CreateAuditFindingDto,
  CreateCorrectiveActionDto,
  CreateSamplingRecordDto,
  CreateLaboratoryDto,
  CreateTestResultDto,
  UpdateCorrectiveActionStatusDto,
} from '../dtos';

@Controller('certification-audits')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CertificationAuditController {
  constructor(private readonly auditService: CertificationAuditService) {}

  @Post()
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  createAudit(@Body() dto: CreateCertificationAuditDto, @CurrentUser() user: SystemUser) {
    return this.auditService.createAudit(dto, user.id);
  }

  @Put(':id')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  updateAudit(@Param('id') id: string, @Body() dto: UpdateCertificationAuditDto, @CurrentUser() user: SystemUser) {
    return this.auditService.updateAudit(id, dto, user.id);
  }

  @Post(':id/complete')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  completeAudit(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.auditService.markAuditComplete(id, user.id);
  }

  @Get()
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  listAudits(@Query('applicationId') applicationId?: string) {
    return this.auditService.listAudits({ applicationId });
  }

  @Get(':id')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  getAudit(@Param('id') id: string) {
    return this.auditService.getAudit(id);
  }

  @Post('findings')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  addFinding(@Body() dto: CreateAuditFindingDto, @CurrentUser() user: SystemUser) {
    return this.auditService.addFinding(dto, user.id);
  }

  @Post('findings/:id/close')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  closeFinding(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.auditService.closeFinding(id, user.id);
  }

  @Post('corrective-actions')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  addCorrectiveAction(@Body() dto: CreateCorrectiveActionDto, @CurrentUser() user: SystemUser) {
    return this.auditService.addCorrectiveAction(dto, user.id);
  }

  @Post('corrective-actions/:id/status')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  updateCorrectiveActionStatus(
    @Param('id') id: string,
    @Body() dto: UpdateCorrectiveActionStatusDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.auditService.updateCorrectiveActionStatus(id, dto, user.id);
  }

  @Post('sampling')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  addSampling(@Body() dto: CreateSamplingRecordDto, @CurrentUser() user: SystemUser) {
    return this.auditService.addSamplingRecord(dto, user.id);
  }

  @Post('test-results')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  addTestResult(@Body() dto: CreateTestResultDto) {
    return this.auditService.addTestResult(dto);
  }

  @Post('laboratories')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  createLaboratory(@Body() dto: CreateLaboratoryDto) {
    return this.auditService.createLaboratory(dto);
  }

  @Get('laboratories/list')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  listLaboratories() {
    return this.auditService.listLaboratories();
  }
}
