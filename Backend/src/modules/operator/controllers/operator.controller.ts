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
import { OperatorService } from '../services/operator.service';
import { CreateOperatorRegistrationDto, UpdateOperatorRegistrationDto, SubmitOperatorRegistrationDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole, OperatorStatus } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';

@Controller('operators')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {
    // Log when controller is instantiated to verify it's loaded
    console.log('✓ OperatorController initialized');
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  // NO VALIDATION PIPE - Accept any data for draft saves
  async create(@Body() dto: any, @CurrentUser() user: SystemUser) {
    // Any authenticated user can register as an operator
    // Check if operator already exists for this user
    const existingOperator = await this.operatorService.findByUserId(user.id);
    if (existingOperator) {
      throw new ForbiddenException('You already have an operator registration');
    }
    
    // Set the userId to the current authenticated user
    dto.userId = user.id;

    // Use draft DTO to allow partial data (drafts don't require all fields)
    // Validation is skipped for draft saves to allow partial data
    return this.operatorService.createOperatorRegistration(dto, user.id);
  }

  // Specific route must come before generic routes
  @Get('my-operator')
  @UseGuards(JwtAuthGuard)
  async getMyOperator(@CurrentUser() user: SystemUser) {
    const operator = await this.operatorService.findByUserId(user.id);
    if (!operator) {
      return null;
    }
    return operator;
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN, UserRole.OPERATOR)
  async list(@Query() query: any, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // OPERATOR can only see their own registration
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      const myOperator = await this.operatorService.findByUserId(user.id);
      if (myOperator) {
        return { data: [myOperator], total: 1 };
      }
      return { data: [], total: 0 };
    }

    // Admins can see all
    const { status, countryId, skip = 0, limit = 25 } = query;
    const filters: any = {
      skip: Number(skip),
      limit: Number(limit),
    };

    if (status) {
      filters.status = status as OperatorStatus;
    }

    if (countryId) {
      filters.countryId = countryId;
    }

    return this.operatorService.findAll(filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.NSB_ADMIN, UserRole.OPERATOR)
  async getById(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const operator = await this.operatorService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // OPERATOR can only access their own registration
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      if (operator.userId !== user.id) {
        throw new ForbiddenException('You can only access your own operator registration');
      }
    }

    return operator;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateOperatorRegistrationDto, @CurrentUser() user: SystemUser) {
    const operator = await this.operatorService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // OPERATOR can only update their own registration
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      if (operator.userId !== user.id) {
        throw new ForbiddenException('You can only update your own operator registration');
      }
    }

    return this.operatorService.updateOperatorRegistration(id, dto, user.id);
  }

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN)
  async submit(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const operator = await this.operatorService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // OPERATOR can only submit their own registration
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      if (operator.userId !== user.id) {
        throw new ForbiddenException('You can only submit your own operator registration');
      }
    }

    return this.operatorService.submitOperatorRegistration(id, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR, UserRole.NSB_ADMIN, UserRole.SUPER_ADMIN)
  async delete(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const operator = await this.operatorService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.NSB_ADMIN);

    // OPERATOR can only delete their own registration
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      if (operator.userId !== user.id) {
        throw new ForbiddenException('You can only delete your own operator registration');
      }
    }

    await this.operatorService.deleteOperator(id, user.id);
    return { message: 'Operator registration deleted successfully' };
  }
}

