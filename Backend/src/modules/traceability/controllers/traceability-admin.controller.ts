import { Body, Controller, Post, Put } from '@nestjs/common';
import { TraceabilityService } from '../services/traceability.service';
import { CreateStandardDto } from '../dtos/create-standard.dto';
import { AssignStandardsDto } from '../dtos/assign-standards.dto';
import { GenerateCocDto } from '../dtos/generate-coc.dto';
import { UpdateCocStatusDto } from '../dtos/update-coc-status.dto';

@Controller('traceability')
export class TraceabilityAdminController {
  constructor(private readonly traceabilityService: TraceabilityService) {}

  @Post('standards')
  createStandard(@Body() dto: CreateStandardDto) {
    return this.traceabilityService.createStandard(dto);
  }

  @Post('assign-standards')
  assignStandards(@Body() dto: AssignStandardsDto) {
    return this.traceabilityService.assignStandards(dto);
  }

  @Post('issue-coc')
  issueCoc(@Body() dto: GenerateCocDto) {
    return this.traceabilityService.issueCoc(dto);
  }

  @Put('coc-status')
  updateCocStatus(@Body() dto: UpdateCocStatusDto) {
    return this.traceabilityService.revokeCoc(dto);
  }
}

