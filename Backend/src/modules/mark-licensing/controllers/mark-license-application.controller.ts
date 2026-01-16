import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MarkLicenseApplicationService } from '../services/mark-license-application.service';
import {
  CreateMarkLicenseApplicationDto,
  UpdateMarkLicenseApplicationDto,
  SubmitMarkLicenseApplicationDto,
  UploadMarkLicenseDocumentDto,
  CreateMarkMisuseIncidentDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { MarkMisuseStatus, MarkSanctionType, UserRole } from '../../../shared/enums';
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

    if (isAdmin && !nsbId) {
      return this.applicationService.getAllApplications(includeDrafts === 'true');
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

  /**
   * Approve a submitted application
   */
  @Post(':id/approve')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  approve(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    return this.applicationService.approveApplication(id, user.id);
  }

  /**
   * Reject a submitted application
   */
  @Post(':id/reject')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  reject(
    @Param('id') id: string,
    @Body() body: { reason?: string },
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.rejectApplication(id, body?.reason, user.id);
  }

  /**
   * Upload a supporting document (metadata only)
   */
  @Post(':id/documents')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  uploadDocument(
    @Param('id') id: string,
    @Body() dto: UploadMarkLicenseDocumentDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.addSupportingDocument(id, dto, user.id);
  }

  /**
   * List supporting documents
   */
  @Get(':id/documents')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  listDocuments(@Param('id') id: string) {
    return this.applicationService.listSupportingDocuments(id);
  }

  /**
   * Delete a supporting document
   */
  @Delete(':id/documents/:documentId')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  deleteDocument(
    @Param('id') id: string,
    @Param('documentId') documentId: string,
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.removeSupportingDocument(id, documentId, user.id);
  }

  /**
   * Report mark misuse incident
   */
  @Post('/misuse')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN, UserRole.CB_ADMIN, UserRole.CB_USER)
  reportMisuse(@Body() dto: CreateMarkMisuseIncidentDto, @CurrentUser() user: SystemUser) {
    return this.applicationService.reportMisuse(dto, user.id);
  }

  /**
   * List misuse incidents
   */
  @Get('/misuse/list')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN, UserRole.CB_ADMIN, UserRole.CB_USER)
  listMisuse() {
    return this.applicationService.listMisuseIncidents();
  }

  /**
   * Review misuse incident
   */
  @Post('/misuse/:id/review')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  reviewMisuse(
    @Param('id') id: string,
    @Body() body: { status: MarkMisuseStatus; decisionNotes?: string },
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.reviewMisuseIncident(id, body.status, body.decisionNotes, user.id);
  }

  /**
   * Add sanction to misuse incident
   */
  @Post('/misuse/:id/sanctions')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  addSanction(
    @Param('id') id: string,
    @Body() body: { sanctionType: MarkSanctionType; startDate?: string; endDate?: string; notes?: string },
    @CurrentUser() user: SystemUser,
  ) {
    return this.applicationService.addSanction(id, body, user.id);
  }

  /**
   * Upload misuse evidence file
   */
  @Post('/misuse/:id/evidence')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN, UserRole.CB_ADMIN, UserRole.CB_USER)
  @UseInterceptors(FileInterceptor('file'))
  uploadMisuseEvidence(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.applicationService.addMisuseEvidence(id, file);
  }
}

