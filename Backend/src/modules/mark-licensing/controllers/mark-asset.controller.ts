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
import { MarkAssetService } from '../services/mark-asset.service';
import { RequestAssetsDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';
import { Request } from 'express';

@Controller('mark-licenses/assets')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class MarkAssetController {
  constructor(private readonly assetService: MarkAssetService) {}

  /**
   * Request digital assets
   * POST /api/mark-licenses/assets/request
   */
  @Post('request')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  requestAssets(@Body() dto: RequestAssetsDto, @CurrentUser() user: SystemUser) {
    return this.assetService.requestAssets(dto, user.id);
  }

  /**
   * Deliver assets (mark as delivered)
   * POST /api/mark-licenses/assets/:id/deliver
   */
  @Post(':id/deliver')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  deliverAssets(
    @Param('id') id: string,
    @Body() body: { assetFiles: any[] },
    @CurrentUser() user: SystemUser,
  ) {
    return this.assetService.deliverAssets(id, body.assetFiles, user.id);
  }

  /**
   * Track asset download
   * POST /api/mark-licenses/assets/:id/download
   */
  @Post(':id/download')
  @Roles(UserRole.NSB_ADMIN, UserRole.NSB_USER)
  trackDownload(
    @Param('id') id: string,
    @Body() body: { filePath: string },
    @CurrentUser() user: SystemUser,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.assetService.trackDownload(
      id,
      body.filePath,
      user.id,
      typeof ipAddress === 'string' ? ipAddress : ipAddress?.[0],
      userAgent,
    );
  }

  /**
   * Get asset by ID
   * GET /api/mark-licenses/assets/:id
   */
  @Get(':id')
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getById(@Param('id') id: string) {
    return this.assetService.findById(id);
  }

  /**
   * Get asset library for an agreement
   * GET /api/mark-licenses/assets?agreementId=xxx
   */
  @Get()
  @Roles(
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.ARSO_SECRETARIAT,
    UserRole.SUPER_ADMIN,
  )
  getAssetLibrary(@Query('agreementId') agreementId: string) {
    if (!agreementId) {
      throw new Error('agreementId parameter is required');
    }
    return this.assetService.getAssetLibrary(agreementId);
  }

  /**
   * Get download history for an asset
   * GET /api/mark-licenses/assets/:id/download-history
   */
  @Get(':id/download-history')
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  getDownloadHistory(@Param('id') id: string) {
    return this.assetService.getDownloadHistory(id);
  }
}

