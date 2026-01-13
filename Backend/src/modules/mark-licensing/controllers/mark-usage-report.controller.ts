import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MarkUsageReportService } from '../services/mark-usage-report.service';
import { CreateMarkUsageReportDto, UpdateMarkUsageReportDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';

@Controller('mark-licenses/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class MarkUsageReportController {
  constructor(private readonly reportService: MarkUsageReportService) {}

  /**
   * Create a new usage report (NSB-004-3)
   * POST /api/mark-licenses/reports
   */
  @Post()
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  create(@Body() dto: CreateMarkUsageReportDto, @CurrentUser() user: SystemUser) {
    return this.reportService.createReport(dto, user.id);
  }

  /**
   * Get report by ID
   * GET /api/mark-licenses/reports/:id
   */
  @Get(':id')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getById(@Param('id') id: string) {
    return this.reportService.findById(id);
  }

  /**
   * Update a draft report
   * PUT /api/mark-licenses/reports/:id
   */
  @Put(':id')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMarkUsageReportDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.reportService.updateReport(id, dto, user.id);
  }

  /**
   * Submit report for review
   * POST /api/mark-licenses/reports/:id/submit
   */
  @Post(':id/submit')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  submit(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.reportService.submitReport(id, user.id);
  }

  /**
   * Get all reports for a license
   * GET /api/mark-licenses/reports?licenseId=xxx
   */
  @Get()
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getReportsByLicense(@Query('licenseId') licenseId: string) {
    if (!licenseId) {
      throw new Error('licenseId parameter is required');
    }
    return this.reportService.getReportsByLicense(licenseId);
  }
}

