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
} from '@nestjs/common';
import { ProductCertificationService } from '../services/product-certification.service';
import {
  CreateProductCertificationApplicationDto,
  UpdateProductCertificationApplicationDto,
  SubmitProductCertificationApplicationDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole, ProductCertificationStatus } from '../../../shared/enums';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SystemUser } from '../../system-user/system-user.entity';
import { OperatorService } from '../../operator/services/operator.service';

@Controller('product-certifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductCertificationController {
  constructor(
    private readonly productCertificationService: ProductCertificationService,
    private readonly operatorService: OperatorService,
  ) {}

  @Post('applications')
  @Roles(UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async create(@Body() dto: CreateProductCertificationApplicationDto, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    // OPERATOR can only create applications for their own operator
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      const myOperator = await this.operatorService.findByUserId(user.id);
      if (!myOperator) {
        throw new ForbiddenException('You must have an approved operator registration first');
      }
      if (dto.operatorId !== myOperator.id) {
        throw new ForbiddenException('You can only create applications for your own operator');
      }
    }

    return this.productCertificationService.createApplication(dto, user.id);
  }

  @Get('applications')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.OPERATOR, UserRole.CB_ADMIN, UserRole.CB_USER)
  async list(@Query() query: any, @CurrentUser() user: SystemUser) {
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    const isCB = userRoles.includes(UserRole.CB_ADMIN) || userRoles.includes(UserRole.CB_USER);

    // OPERATOR can only see their own applications
    if (!isAdmin && !isCB && userRoles.includes(UserRole.OPERATOR)) {
      const myOperator = await this.operatorService.findByUserId(user.id);
      if (myOperator) {
        const applications = await this.productCertificationService.findByOperatorId(myOperator.id);
        return { data: applications, total: applications.length };
      }
      return { data: [], total: 0 };
    }

    // Admins and CBs can see all
    const { operatorId, status, skip = 0, limit = 25 } = query;
    const filters: any = {
      skip: Number(skip),
      limit: Number(limit),
    };

    if (operatorId) {
      filters.operatorId = operatorId;
    }

    if (status) {
      filters.status = status as ProductCertificationStatus;
    }

    return this.productCertificationService.findAll(filters);
  }

  @Get('applications/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT, UserRole.OPERATOR, UserRole.CB_ADMIN, UserRole.CB_USER)
  async getById(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const application = await this.productCertificationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);
    const isCB = userRoles.includes(UserRole.CB_ADMIN) || userRoles.includes(UserRole.CB_USER);

    // OPERATOR can only access their own applications
    if (!isAdmin && !isCB && userRoles.includes(UserRole.OPERATOR)) {
      const myOperator = await this.operatorService.findByUserId(user.id);
      if (!myOperator || application.operatorId !== myOperator.id) {
        throw new ForbiddenException('You can only access your own applications');
      }
    }

    return application;
  }

  @Put('applications/:id')
  @Roles(UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductCertificationApplicationDto,
    @CurrentUser() user: SystemUser,
  ) {
    const application = await this.productCertificationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    // OPERATOR can only update their own applications
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      const myOperator = await this.operatorService.findByUserId(user.id);
      if (!myOperator || application.operatorId !== myOperator.id) {
        throw new ForbiddenException('You can only update your own applications');
      }
    }

    return this.productCertificationService.updateApplication(id, dto, user.id);
  }

  @Post('applications/:id/submit')
  @Roles(UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async submit(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const application = await this.productCertificationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    // OPERATOR can only submit their own applications
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      const myOperator = await this.operatorService.findByUserId(user.id);
      if (!myOperator || application.operatorId !== myOperator.id) {
        throw new ForbiddenException('You can only submit your own applications');
      }
    }

    return this.productCertificationService.submitApplication(id, user.id);
  }

  @Delete('applications/:id')
  @Roles(UserRole.OPERATOR, UserRole.SUPER_ADMIN, UserRole.ARSO_SECRETARIAT)
  async delete(@Param('id') id: string, @CurrentUser() user: SystemUser) {
    const application = await this.productCertificationService.findById(id);
    const userRoles = user.roles || (user.role ? [user.role] : []);
    const isAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    // OPERATOR can only delete their own applications
    if (!isAdmin && userRoles.includes(UserRole.OPERATOR)) {
      const myOperator = await this.operatorService.findByUserId(user.id);
      if (!myOperator || application.operatorId !== myOperator.id) {
        throw new ForbiddenException('You can only delete your own applications');
      }
    }

    await this.productCertificationService.deleteApplication(id, user.id);
    return { message: 'Product certification application deleted successfully' };
  }
}

