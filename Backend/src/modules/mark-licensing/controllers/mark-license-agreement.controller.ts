import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MarkLicenseAgreementService } from '../services/mark-license-agreement.service';
import { CreateMarkLicenseAgreementDto, SignAgreementDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';
import { Request } from 'express';

@Controller('mark-licenses/agreements')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class MarkLicenseAgreementController {
  constructor(private readonly agreementService: MarkLicenseAgreementService) {}

  /**
   * Generate agreement from approved application (NSB-004-2)
   * POST /api/mark-licenses/agreements
   */
  @Post()
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  generateAgreement(
    @Body() dto: CreateMarkLicenseAgreementDto,
    @CurrentUser() user: SystemUser,
  ) {
    return this.agreementService.generateAgreement(dto, user.id);
  }

  /**
   * Get agreement by ID
   * GET /api/mark-licenses/agreements/:id
   */
  @Get(':id')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getById(@Param('id') id: string) {
    return this.agreementService.findById(id);
  }

  /**
   * Get agreement by agreement ID
   * GET /api/mark-licenses/agreements/by-agreement-id/:agreementId
   */
  @Get('by-agreement-id/:agreementId')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getByAgreementId(@Param('agreementId') agreementId: string) {
    return this.agreementService.findByAgreementId(agreementId);
  }

  /**
   * NSB signs agreement
   * POST /api/mark-licenses/agreements/:id/sign
   */
  @Post(':id/sign')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  signAgreement(
    @Param('id') id: string,
    @Body() dto: SignAgreementDto,
    @CurrentUser() user: SystemUser,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return this.agreementService.signAgreement(
      { ...dto, agreementId: id },
      user.id,
      typeof ipAddress === 'string' ? ipAddress : ipAddress?.[0],
    );
  }

  /**
   * ARSO signs agreement
   * POST /api/mark-licenses/agreements/:id/arso-sign
   */
  @Post(':id/arso-sign')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  arsoSignAgreement(
    @Param('id') id: string,
    @Body() body: { arsoSignerName: string; arsoSignerTitle: string },
    @CurrentUser() user: SystemUser,
  ) {
    return this.agreementService.arsoSignAgreement(
      id,
      body.arsoSignerName,
      body.arsoSignerTitle,
      user.id,
    );
  }

  /**
   * Get active agreements for NSB
   * GET /api/mark-licenses/agreements?nsbId=xxx
   */
  @Get()
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getActiveAgreements(@Query('nsbId') nsbId: string) {
    if (!nsbId) {
      throw new Error('nsbId parameter is required');
    }
    return this.agreementService.getActiveAgreementsByNsb(nsbId);
  }

  /**
   * Check for expiring agreements
   * GET /api/mark-licenses/agreements/expiring?daysBeforeExpiry=30
   */
  @Get('expiring')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  getExpiringAgreements(@Query('daysBeforeExpiry') daysBeforeExpiry: string = '30') {
    return this.agreementService.checkExpiringAgreements(parseInt(daysBeforeExpiry, 10));
  }
}

