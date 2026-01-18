import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleRequestService } from '../services/role-request.service';
import { CreateRoleRequestDto, DecideRoleRequestDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';

@Controller('auth/role-requests')
@UseGuards(JwtAuthGuard)
export class RoleRequestController {
  constructor(private readonly roleRequestService: RoleRequestService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.PUBLIC,
    UserRole.OPERATOR,
    UserRole.CB_ADMIN,
    UserRole.CB_USER,
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.SUPER_ADMIN,
    UserRole.ARSO_SECRETARIAT,
    UserRole.ARSO_COUNCIL,
    UserRole.CACO_MEMBER,
    UserRole.ADVISORY_COMMITTEE,
    UserRole.SMC_MEMBER,
    UserRole.ACCREDITATION_BODY,
  )
  async create(@CurrentUser() user: SystemUser, @Body() dto: CreateRoleRequestDto) {
    return this.roleRequestService.create(user, dto);
  }

  @Get('me')
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.PUBLIC,
    UserRole.OPERATOR,
    UserRole.CB_ADMIN,
    UserRole.CB_USER,
    UserRole.NSB_ADMIN,
    UserRole.NSB_USER,
    UserRole.SUPER_ADMIN,
    UserRole.ARSO_SECRETARIAT,
    UserRole.ARSO_COUNCIL,
    UserRole.CACO_MEMBER,
    UserRole.ADVISORY_COMMITTEE,
    UserRole.SMC_MEMBER,
    UserRole.ACCREDITATION_BODY,
  )
  async listMine(@CurrentUser() user: SystemUser) {
    return this.roleRequestService.listMine(user);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async listAll() {
    return this.roleRequestService.listAll();
  }

  @Post(':id/decision')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async decide(@Param('id') id: string, @CurrentUser() reviewer: SystemUser, @Body() dto: DecideRoleRequestDto) {
    return this.roleRequestService.decide(id, reviewer, dto);
  }
}

