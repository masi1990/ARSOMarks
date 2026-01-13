import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MarkLicenseApplicationService } from '../services/mark-license-application.service';
import {
  CreateMarkLicenseApplicationDto,
  UpdateMarkLicenseApplicationDto,
  SubmitMarkLicenseApplicationDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';

@Controller('mark-licenses/applications')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class MarkLicenseApplicationController {
  constructor(private readonly applicationService: MarkLicenseApplicationService) {}

  /**
   * Create a new mark license application (NSB-004-1)
   * POST /api/mark-licenses/applications
   */
  @Post()
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  create(
    @Body() dto: CreateMarkLicenseApplicationDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.createApplication(dto, user.id);
  }

  /**
   * Get application by ID
   * GET /api/mark-licenses/applications/:id
   */
  @Get(':id')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  getById(@Param('id') id: string) {
    return this.applicationService.findById(id);
  }

  /**
   * Update a draft application
   * PUT /api/mark-licenses/applications/:id
   */
  @Put(':id')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMarkLicenseApplicationDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.updateApplication(id, dto, user.id);
  }

  /**
   * Submit application for review
   * POST /api/mark-licenses/applications/:id/submit
   */
  @Post(':id/submit')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  submit(
    @Param('id') id: string,
    @Body() dto: SubmitMarkLicenseApplicationDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.submitApplication(id, dto, user.id);
  }

  /**
   * Get all applications for an NSB
   * GET /api/mark-licenses/applications?nsbId=xxx&includeDrafts=true
   */
  @Get()
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  getApplications(
    @Query('nsbId') nsbId: string,
    @Query('includeDrafts') includeDrafts: string = 'true',
    @CurrentUser() user: SystemUser,
  ) {
    // NSB users can only see their own NSB's applications
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    if (!isAdmin && (userRoles.includes(UserRole.NSB_ADMIN) || userRoles.includes(UserRole.NSB_USER))) {
      // Get user's NSB ID from their profile (would need to implement this)
      // For now, require nsbId parameter
      if (!nsbId) {
        throw new Error('nsbId parameter is required for NSB users');
      }
    }

    return this.applicationService.getApplicationsByNsb(nsbId, includeDrafts === 'true');
  }

  /**
   * Delete a draft application
   * DELETE /api/mark-licenses/applications/:id
   */
  @Delete(':id')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  delete(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.applicationService.deleteDraft(id, user.id);
  }
}

