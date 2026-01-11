import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LicenseApplicationService } from '../services/license-application.service';
import { CreateLicenseApplicationDto, SubmitApplicationDto } from '../dtos';

@Controller('licensing')
export class LicenseApplicationController {
  constructor(private readonly licenseService: LicenseApplicationService) {}

  @Post('applications/draft')
  createDraft(@Body() dto: CreateLicenseApplicationDto) {
    return this.licenseService.createApplication({ ...dto, saveAsDraft: true }, 'system');
  }

  @Put('applications/:id/draft')
  updateDraft(@Param('id') id: string, @Body() dto: CreateLicenseApplicationDto) {
    return this.licenseService.updateDraftApplication(id, dto, 'system');
  }

  @Post('applications/:id/submit')
  submit(@Param('id') id: string, @Body() dto: SubmitApplicationDto) {
    return this.licenseService.submitApplication(id, dto, 'system');
  }

  @Get('applications/:id')
  getById(@Param('id') id: string) {
    return this.licenseService.findById(id);
  }

  @Get('nsb/:nsbId/applications')
  getByNsb(@Param('nsbId') nsbId: string, @Query('includeDrafts') includeDrafts = 'true') {
    return this.licenseService.getApplicationsByNsb(nsbId, includeDrafts === 'true');
  }
}

