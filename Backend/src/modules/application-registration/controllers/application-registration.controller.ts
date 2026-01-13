import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApplicationRegistrationService } from '../services/application-registration.service';
import {
  CreateApplicationRegistrationDto,
  CreateApplicationRegistrationDraftDto,
  UpdateApplicationRegistrationDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole, ApplicationRegistrationStatus } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';
import { ReferenceDataService } from '../../reference-data/reference-data.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nsb } from '../../nsb-management/entities/nsb.entity';
import { NsbClassification } from '../../../shared/enums';
import { Public } from '../../../common/decorators/public.decorator';
import { UploadApplicationDocumentDto } from '../dtos/upload-document.dto';

@Controller('application-registrations')
export class ApplicationRegistrationController {
  constructor(
    private readonly applicationRegistrationService: ApplicationRegistrationService,
    private readonly referenceDataService: ReferenceDataService,
    @InjectRepository(Nsb) private readonly nsbRepo: Repository<Nsb>,
  ) {
    console.log('✓ ApplicationRegistrationController initialized');
  }

  /**
   * Save draft - NO VALIDATION PIPE - Accepts any data
   */
  @Post('draft')
  @UseGuards(JwtAuthGuard)
  async saveDraft(@Body() dto: any, @CurrentUser() user: SystemUser) {
    // Set the userId to the current authenticated user
    dto.userId = user.id;

    // No validation - accept any data for draft
    return this.applicationRegistrationService.createDraft(dto, user.id);
  }

  /**
   * Create with validation - for final submission
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(@Body() dto: CreateApplicationRegistrationDto, @CurrentUser() user: SystemUser) {
    // Set the userId to the current authenticated user
    dto.userId = user.id;

    return this.applicationRegistrationService.create(dto, user.id);
  }

  /**
   * Get my application registrations (all applications for the user)
   * MUST come before @Get(':id') to avoid route conflicts
   */
  @Get('my-applications')
  @UseGuards(JwtAuthGuard)
  async getMyApplications(@CurrentUser() user: SystemUser) {
    return this.applicationRegistrationService.findByUserId(user.id);
  }

  /**
   * Get my application registration (single - for backward compatibility)
   * MUST come before @Get(':id') to avoid route conflicts
   * @deprecated Use my-applications instead
   */
  @Get('my-application')
  @UseGuards(JwtAuthGuard)
  async getMyApplication(@CurrentUser() user: SystemUser) {
    const applications = await this.applicationRegistrationService.findByUserId(user.id);
    // Return the most recent draft, or the most recent one if no draft exists
    const draft = applications.find((app) => app.status === ApplicationRegistrationStatus.DRAFT);
    if (draft) {
      return draft;
    }
    return applications.length > 0 ? applications[0] : null;
  }

  /**
   * List all applications (with filters)
   * MUST come before @Get(':id') to avoid route conflicts
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN)
  async list(@Query() query: any, @CurrentUser() user: SystemUser) {
    const { status, countryId, skip = 0, limit = 25 } = query;
    const filters: any = {
      skip: Number(skip),
      limit: Number(limit),
    };

    if (status) {
      filters.status = status as ApplicationRegistrationStatus;
    }

    if (countryId) {
      filters.countryId = countryId;
    }

    return this.applicationRegistrationService.findAll(filters);
  }

  /**
   * Get by ID
   * MUST come after all specific routes (my-applications, my-application, etc.)
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN, UserRole.OPERATOR)
  async getById(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    // Validate UUID format to prevent route conflicts with specific routes
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new ForbiddenException('Invalid application ID format');
    }

    const application = await this.applicationRegistrationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // Non-admin users can only access their own application
    if (!isAdmin) {
      if (application.userId !== user.id) {
        throw new ForbiddenException('You can only access your own application registration');
      }
    }

    return application;
  }

  /**
   * Update draft - NO VALIDATION PIPE - Accepts any data
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN)
  async update(
    @Param('id') id: string,
    @Body() dto: any, // Accept any data for draft updates
    @CurrentUser() user: SystemUser,
  ) {
    const application = await this.applicationRegistrationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // Non-admin users can only update their own application
    if (!isAdmin) {
      if (application.userId !== user.id) {
        throw new ForbiddenException('You can only update your own application registration');
      }
    }

    // No validation - accept any data for draft updates
    return this.applicationRegistrationService.update(id, dto, user.id);
  }

  /**
   * Submit application - Validates all required fields
   */
  @Post(':id/submit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN)
  async submit(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const application = await this.applicationRegistrationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // Non-admin users can only submit their own application
    if (!isAdmin) {
      if (application.userId !== user.id) {
        throw new ForbiddenException('You can only submit your own application registration');
      }
    }

    return this.applicationRegistrationService.submit(id, user.id);
  }

  /**
   * Delete draft
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN)
  async delete(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const application = await this.applicationRegistrationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // Non-admin users can only delete their own application
    if (!isAdmin) {
      if (application.userId !== user.id) {
        throw new ForbiddenException('You can only delete your own application registration');
      }
    }

    await this.applicationRegistrationService.delete(id, user.id);
    return { message: 'Application registration deleted successfully' };
  }

  /**
   * Lookup endpoints for Part B form data
   */

  @Get('lookup/acap-schemes')
  @Public()
  async getAcapSchemes() {
    return this.referenceDataService.getAcapSchemes();
  }

  @Get('lookup/arso-standards')
  @Public()
  async getArsoStandards() {
    // Return a list of common ARSO standards
    // In production, this should come from a reference table
    return [
      { code: 'ARS 1100', name: 'ARS 1100 - General Product Standard' },
      { code: 'ARS/AES 2', name: 'ARS/AES 2 - Agricultural Equipment Standard' },
      { code: 'ARS 952', name: 'ARS 952 - Food Safety Standard' },
      { code: 'ARS 1001', name: 'ARS 1001 - Quality Management' },
      { code: 'ARS 2001', name: 'ARS 2001 - Environmental Management' },
      // Add more standards as needed
    ];
  }

  @Get('lookup/certification-bodies')
  @Public()
  async getCertificationBodies() {
    // Return NSBs with CERTIFICATION_BODY classification, or create a simple list
    // For now, return active NSBs that can serve as certification bodies
    const nsbs = await this.nsbRepo.find({
      where: { status: 'ACTIVE' as any },
      relations: ['country'],
      order: { name: 'ASC' },
    });

    // Map to a simple format for the dropdown
    return nsbs.map((nsb) => ({
      id: nsb.id,
      name: nsb.name,
      shortName: nsb.shortName,
      country: nsb.country?.name,
      countryId: nsb.countryId,
    }));
  }

  @Get('lookup/production-types')
  @Public()
  async getProductionTypes() {
    // Return list of production types
    return [
      { value: 'Crops', label: 'Crops' },
      { value: 'Livestock', label: 'Livestock' },
      { value: 'Aquaculture', label: 'Aquaculture' },
      { value: 'Processing', label: 'Processing' },
      { value: 'Manufacturing', label: 'Manufacturing' },
      { value: 'Packaging', label: 'Packaging' },
    ];
  }

  @Get('lookup/target-markets')
  @Public()
  async getTargetMarkets() {
    // Return list of target markets
    return [
      { value: 'Domestic', label: 'Domestic' },
      { value: 'AfCFTA', label: 'AfCFTA (African Continental Free Trade Area)' },
      { value: 'Export_EU', label: 'Export - European Union' },
      { value: 'Export_USA', label: 'Export - United States' },
      { value: 'Export_Asia', label: 'Export - Asia' },
      { value: 'Export_Other', label: 'Export - Other' },
    ];
  }

  /**
   * Document upload endpoint
   * Note: In production, this should handle actual file uploads (using multer)
   * For now, it accepts file metadata and returns a document ID
   */
  @Post(':id/documents')
  @UseGuards(JwtAuthGuard)
  async uploadDocument(
    @Param('id') id: string,
    @Body() dto: UploadApplicationDocumentDto,
    @CurrentUser() user: SystemUser,
  ) {
    // Verify application exists and user has access
    const application = await this.applicationRegistrationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    if (!isAdmin && application.userId !== user.id) {
      throw new ForbiddenException('You can only upload documents for your own application');
    }

    // In production, this would:
    // 1. Save the file to storage (S3, local filesystem, etc.)
    // 2. Create a document record in the database
    // 3. Return the document ID

    // For now, return a mock document ID
    // TODO: Implement actual file upload and storage
    return {
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      documentType: dto.documentType,
      fileName: dto.fileName,
      filePath: dto.filePath,
      uploadedAt: new Date().toISOString(),
    };
  }

  /**
   * List documents for an application
   */
  @Get(':id/documents')
  @UseGuards(JwtAuthGuard)
  async listDocuments(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    // Verify application exists and user has access
    const application = await this.applicationRegistrationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    if (!isAdmin && application.userId !== user.id) {
      throw new ForbiddenException('You can only view documents for your own application');
    }

    // TODO: Implement actual document listing from database
    return [];
  }
}

