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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { NsbService } from '../services/nsb.service';
import { NsbDocumentService } from '../services/nsb-document.service';
import { StakeholderRegistryService } from '../services/stakeholder-registry.service';
import { CreateNsbDto, UpdateNsbDto, StakeholderRegistryDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole, NsbProfileDocumentType } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';

@Controller('nsb')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NsbController {
  constructor(
    private readonly nsbService: NsbService,
    private readonly documentService: NsbDocumentService,
    private readonly stakeholderRegistryService: StakeholderRegistryService,
  ) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  create(@Body() dto: CreateNsbDto, @CurrentUser() user: SystemUser) {
    return this.nsbService.createNsb(dto, user.id);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  async list(@Query() query: any, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN and NSB_USER can only see their own NSB
    if (!isAdmin && (userRoles.includes(UserRole.NSB_ADMIN) || userRoles.includes(UserRole.NSB_USER))) {
      const { search, skip = 0, limit = 25 } = query;
      if (user.countryId) {
        const filter = { countryId: user.countryId, search, skip: Number(skip), limit: Number(limit) };
        return this.nsbService.findAll(filter);
      }
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb) {
        return { data: [myNsb], total: 1 };
      }
      return { data: [], total: 0 };
    }
    
    // Super admins can see all NSBs
    const { countryId, regionId, search, skip = 0, limit = 25 } = query;
    const filter = { countryId, regionId, search, skip: Number(skip), limit: Number(limit) };
    return this.nsbService.findAll(filter);
  }

  @Get('my-nsb')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  getMyNsb(@CurrentUser() user: SystemUser) {
    return this.nsbService.findByUser(user);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  async getById(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const nsb = await this.nsbService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN and NSB_USER can only access their own NSB
    if (!isAdmin && (userRoles.includes(UserRole.NSB_ADMIN) || userRoles.includes(UserRole.NSB_USER))) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only access your own NSB');
      }
    }
    
    return nsb;
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateNsbDto, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN can only update their own NSB
    if (!isAdmin && userRoles.includes(UserRole.NSB_ADMIN)) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only update your own NSB');
      }
    }
    
    return this.nsbService.updateNsb(id, dto, user.id);
  }

  @Post(':id/documents')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { documentType: string },
    @CurrentUser() user: SystemUser,
  ) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN can only upload to their own NSB
    if (!isAdmin && userRoles.includes(UserRole.NSB_ADMIN)) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only upload documents to your own NSB');
      }
    }

    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!body.documentType) {
      throw new BadRequestException('Document type is required');
    }
    if (!Object.values(NsbProfileDocumentType).includes(body.documentType as NsbProfileDocumentType)) {
      throw new BadRequestException('Invalid document type');
    }
    return this.documentService.uploadDocument(id, file, body.documentType as NsbProfileDocumentType, user.id);
  }

  @Get(':id/documents')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  async getDocuments(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN and NSB_USER can only view their own NSB documents
    if (!isAdmin && (userRoles.includes(UserRole.NSB_ADMIN) || userRoles.includes(UserRole.NSB_USER))) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only view your own NSB documents');
      }
    }
    
    return this.documentService.getDocumentsByNsb(id);
  }

  @Get(':id/documents/:documentId/view')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  async viewDocument(@Param('id') id: string, @Param('documentId') documentId: string, @Res() res: Response, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN and NSB_USER can only view their own NSB documents
    if (!isAdmin && (userRoles.includes(UserRole.NSB_ADMIN) || userRoles.includes(UserRole.NSB_USER))) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only view your own NSB documents');
      }
    }

    const document = await this.documentService.getDocument(id, documentId);
    const fileBuffer = await this.documentService.getFile(document.filePath);
    
    res.setHeader('Content-Type', document.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${document.fileName}"`);
    res.send(fileBuffer);
  }

  @Delete(':id/documents/:documentId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN)
  async deleteDocument(@Param('id') id: string, @Param('documentId') documentId: string, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN can only delete from their own NSB
    if (!isAdmin && userRoles.includes(UserRole.NSB_ADMIN)) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only delete documents from your own NSB');
      }
    }

    await this.documentService.deleteDocument(id, documentId);
    return { message: 'Document deleted successfully' };
  }

  // Stakeholder Registry endpoints (Phase 2.1)
  @Get(':id/stakeholder-registry')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN, UserRole.NSB_USER)
  async getStakeholderRegistry(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN and NSB_USER can only access their own NSB
    if (!isAdmin && (userRoles.includes(UserRole.NSB_ADMIN) || userRoles.includes(UserRole.NSB_USER))) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only access stakeholder registry for your own NSB');
      }
    }

    return this.stakeholderRegistryService.getStakeholderRegistry(id);
  }

  @Put(':id/stakeholder-registry')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN)
  async updateStakeholderRegistry(
    @Param('id') id: string,
    @Body() dto: StakeholderRegistryDto,
    @CurrentUser() user: SystemUser,
  ) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN can only update their own NSB
    if (!isAdmin && userRoles.includes(UserRole.NSB_ADMIN)) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only update stakeholder registry for your own NSB');
      }
    }

    return this.stakeholderRegistryService.updateStakeholderRegistry(id, dto);
  }

  // Save draft - no validation
  @Post(':id/stakeholder-registry/draft')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true, skipNullProperties: true, skipUndefinedProperties: true, whitelist: false, forbidNonWhitelisted: false }))
  async saveDraft(
    @Param('id') id: string,
    @Body() dto: any, // Use any to skip validation
    @CurrentUser() user: SystemUser,
  ) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN can only save draft for their own NSB
    if (!isAdmin && userRoles.includes(UserRole.NSB_ADMIN)) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only save draft stakeholder registry for your own NSB');
      }
    }

    return this.stakeholderRegistryService.saveDraft(id, dto, user.id);
  }

  // Submit - with validation
  @Post(':id/stakeholder-registry/submit')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.NSB_ADMIN)
  async submitRegistry(
    @Param('id') id: string,
    @Body() dto: StakeholderRegistryDto,
    @CurrentUser() user: SystemUser,
  ) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    
    // NSB_ADMIN can only submit their own NSB
    if (!isAdmin && userRoles.includes(UserRole.NSB_ADMIN)) {
      const myNsb = await this.nsbService.findByUser(user);
      if (myNsb?.id !== id) {
        throw new ForbiddenException('You can only submit stakeholder registry for your own NSB');
      }
    }

    return this.stakeholderRegistryService.submitRegistry(id, dto, user.id);
  }
}

