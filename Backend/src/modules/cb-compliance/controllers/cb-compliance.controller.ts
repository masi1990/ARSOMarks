import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CbComplianceService } from '../services/cb-compliance.service';
import { UpsertCbComplianceProfileDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';

@Controller('cb-compliance')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class CbComplianceController {
  constructor(private readonly complianceService: CbComplianceService) {}

  @Get(':cbApplicationId')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  getProfile(@Param('cbApplicationId') cbApplicationId: string) {
    return this.complianceService.getProfile(cbApplicationId);
  }

  @Post(':cbApplicationId')
  @Roles(UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  upsertProfile(
    @Param('cbApplicationId') cbApplicationId: string,
    @Body() dto: UpsertCbComplianceProfileDto,
  ) {
    return this.complianceService.upsertProfile(cbApplicationId, dto);
  }
}
