import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MarkLicenseModificationService } from '../services/mark-license-modification.service';
import {
  CreateLicenseModificationDto,
  ApproveModificationDto,
  RejectModificationDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';

@Controller('mark-licenses/modifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class MarkLicenseModificationController {
  constructor(private readonly modificationService: MarkLicenseModificationService) {}

  /**
   * Request a license modification (NSB-004-4)
   * POST /api/mark-licenses/modifications
   */
  @Post()
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  requestModification(
    @Body() dto: CreateLicenseModificationDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.modificationService.requestModification(dto, user.id);
  }

  /**
   * Get modification by ID
   * GET /api/mark-licenses/modifications/:id
   */
  @Get(':id')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getById(@Param('id') id: string) {
    return this.modificationService.findById(id);
  }

  /**
   * Approve modification request
   * POST /api/mark-licenses/modifications/:id/approve
   */
  @Post(':id/approve')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  approve(
    @Param('id') id: string,
    @Body() dto: ApproveModificationDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.modificationService.approveModification(id, dto, user.id);
  }

  /**
   * Reject modification request
   * POST /api/mark-licenses/modifications/:id/reject
   */
  @Post(':id/reject')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  reject(
    @Param('id') id: string,
    @Body() dto: RejectModificationDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.modificationService.rejectModification(id, dto, user.id);
  }

  /**
   * Get modification history for a license
   * GET /api/mark-licenses/modifications?licenseId=xxx
   */
  @Get()
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getModificationHistory(@Query('licenseId') licenseId: string) {
    if (!licenseId) {
      throw new Error('licenseId parameter is required');
    }
    return this.modificationService.getModificationHistory(licenseId);
  }
}

