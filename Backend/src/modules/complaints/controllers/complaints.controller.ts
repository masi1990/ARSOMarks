import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ComplaintsService } from '../services/complaints.service';
import { CreateAppealDto, CreateComplaintDto, ReviewAppealDto, ReviewComplaintDto } from '../dtos';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { UserRole } from '../../../shared/enums';

@Controller('complaints')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  @Public()
  createComplaint(@Body() dto: CreateComplaintDto) {
    return this.complaintsService.createComplaint(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  listComplaints() {
    return this.complaintsService.listComplaints();
  }

  @Post(':id/review')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  reviewComplaint(@Param('id') id: string, @Body() dto: ReviewComplaintDto) {
    return this.complaintsService.reviewComplaint(id, dto);
  }

  @Post(':id/evidence')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  uploadEvidence(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.complaintsService.addComplaintEvidence(id, file);
  }

  @Post('appeals')
  @Public()
  createAppeal(@Body() dto: CreateAppealDto) {
    return this.complaintsService.createAppeal(dto);
  }

  @Get('appeals')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  listAppeals() {
    return this.complaintsService.listAppeals();
  }

  @Post('appeals/:id/review')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ARSO_SECRETARIAT, UserRole.SUPER_ADMIN)
  reviewAppeal(@Param('id') id: string, @Body() dto: ReviewAppealDto) {
    return this.complaintsService.reviewAppeal(id, dto);
  }
}
