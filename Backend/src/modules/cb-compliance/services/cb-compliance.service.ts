import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CbComplianceProfile } from '../entities/cb-compliance-profile.entity';
import { UpsertCbComplianceProfileDto } from '../dtos';
import { CbApplication } from '../../cb-approval/entities/cb-application.entity';

@Injectable()
export class CbComplianceService {
  constructor(
    @InjectRepository(CbComplianceProfile)
    private readonly complianceRepository: Repository<CbComplianceProfile>,
    @InjectRepository(CbApplication)
    private readonly cbApplicationRepository: Repository<CbApplication>,
  ) {}

  async getProfile(cbApplicationId: string) {
    const profile = await this.complianceRepository.findOne({ where: { cbApplicationId } });
    if (!profile) {
      throw new NotFoundException('CB compliance profile not found');
    }
    return profile;
  }

  async upsertProfile(cbApplicationId: string, dto: UpsertCbComplianceProfileDto) {
    const application = await this.cbApplicationRepository.findOne({ where: { id: cbApplicationId } });
    if (!application) {
      throw new NotFoundException('CB application not found');
    }

    let profile = await this.complianceRepository.findOne({ where: { cbApplicationId } });
    if (!profile) {
      profile = this.complianceRepository.create({ cbApplicationId });
    }

    if (dto.responsiblePersons !== undefined) {
      profile.responsiblePersons = JSON.parse(JSON.stringify(dto.responsiblePersons));
    }
    if (dto.auditorQualifications !== undefined) {
      profile.auditorQualifications = JSON.parse(JSON.stringify(dto.auditorQualifications));
    }
    if (dto.countriesOfCertification !== undefined) {
      profile.countriesOfCertification = dto.countriesOfCertification;
    }
    if (dto.localOffices !== undefined) {
      profile.localOffices = JSON.parse(JSON.stringify(dto.localOffices));
    }

    return this.complianceRepository.save(profile);
  }
}
