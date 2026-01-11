import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcapScheme } from '../../reference-data/entities/acap-scheme.entity';
import { AccreditationBody } from '../../reference-data/entities/accreditation-body.entity';

@Controller('licensing')
export class LicensingLookupController {
  constructor(
    @InjectRepository(AcapScheme)
    private readonly acapRepo: Repository<AcapScheme>,
    @InjectRepository(AccreditationBody)
    private readonly accreditationRepo: Repository<AccreditationBody>,
  ) {}

  @Get('acap-schemes')
  getAcapSchemes() {
    return this.acapRepo.find({ where: { isActive: true } });
  }

  @Get('accreditation-bodies')
  getAccreditationBodies() {
    return this.accreditationRepo.find({ where: { isActive: true } });
  }
}

