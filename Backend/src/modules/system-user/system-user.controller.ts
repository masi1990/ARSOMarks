import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { SystemUserService } from './system-user.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';
import { AssignRolesDto } from './dtos/assign-roles.dto';

@Controller('system-users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SystemUserController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async findAll() {
    return this.systemUserService.findAll();
  }

  @Post(':id/roles')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async assignRoles(@Param('id') id: string, @Body() dto: AssignRolesDto) {
    return this.systemUserService.assignRoles(id, dto);
  }

  @Patch(':id/roles')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async removeRoles(@Param('id') id: string, @Body() dto: { roles: UserRole[] }) {
    return this.systemUserService.removeRoles(id, dto.roles);
  }
}

