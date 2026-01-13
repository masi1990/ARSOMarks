import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Nsb } from '../entities/nsb.entity';
import { NsbMarketSurveillanceAuthority } from '../entities/nsb-market-surveillance-authority.entity';
import { NsbCustomsBorderAgency } from '../entities/nsb-customs-border-agency.entity';
import { NsbRegulatoryAgency } from '../entities/nsb-regulatory-agency.entity';
import { NsbIndustryAssociation } from '../entities/nsb-industry-association.entity';
import { NsbTestingLaboratory } from '../entities/nsb-testing-laboratory.entity';
import { StakeholderRegistryDto } from '../dtos';
import { StakeholderRegistryStatus } from '../../../shared/enums';

@Injectable()
export class StakeholderRegistryService {
  constructor(
    @InjectRepository(Nsb)
    private readonly nsbRepository: Repository<Nsb>,
    @InjectRepository(NsbMarketSurveillanceAuthority)
    private readonly msaRepository: Repository<NsbMarketSurveillanceAuthority>,
    @InjectRepository(NsbCustomsBorderAgency)
    private readonly customsRepository: Repository<NsbCustomsBorderAgency>,
    @InjectRepository(NsbRegulatoryAgency)
    private readonly regulatoryRepository: Repository<NsbRegulatoryAgency>,
    @InjectRepository(NsbIndustryAssociation)
    private readonly industryRepository: Repository<NsbIndustryAssociation>,
    @InjectRepository(NsbTestingLaboratory)
    private readonly laboratoryRepository: Repository<NsbTestingLaboratory>,
    private readonly dataSource: DataSource,
  ) {}

  async getStakeholderRegistry(nsbId: string): Promise<StakeholderRegistryDto> {
    const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
    if (!nsb) {
      throw new NotFoundException(`NSB with ID ${nsbId} not found`);
    }

    const [msas, customs, regulatory, industry, laboratories] = await Promise.all([
      this.msaRepository.find({ where: { nsbId, isActive: true } }),
      this.customsRepository.find({ where: { nsbId, isActive: true } }),
      this.regulatoryRepository.find({ where: { nsbId, isActive: true } }),
      this.industryRepository.find({ where: { nsbId, isActive: true } }),
      this.laboratoryRepository.find({ where: { nsbId, isActive: true } }),
    ]);

    return {
      marketSurveillanceAuthorities: msas.map((m) => ({
        id: m.id,
        agencyName: m.agencyName,
        jurisdiction: m.jurisdiction,
        contactPersonName: m.contactPersonName,
        contactPersonEmail: m.contactPersonEmail,
        contactPersonPhone: m.contactPersonPhone,
        scopeOfAuthority: m.scopeOfAuthority,
        mouStatus: m.mouStatus,
        mouDocumentPath: m.mouDocumentPath,
        mouDocumentHash: m.mouDocumentHash,
        systemAccessLevelRequested: m.systemAccessLevelRequested,
        isActive: m.isActive,
      })),
      customsBorderAgencies: customs.map((c) => ({
        id: c.id,
        agencyName: c.agencyName,
        keyBorderPosts: [], // Border posts are in separate table - empty for now
        acapVerificationContactName: c.acapVerificationContactName,
        acapVerificationContactEmail: c.acapVerificationContactEmail,
        acapVerificationContactPhone: c.acapVerificationContactPhone,
        integrationWithNationalSingleWindow: c.integrationStatus === 'FULLY_INTEGRATED' || c.integrationStatus === 'PARTIAL_INTEGRATION',
        isActive: c.isActive,
      })),
      regulatoryAgencies: regulatory.map((r) => ({
        id: r.id,
        agencyName: r.agencyName,
        agencyType: r.agencyType,
        otherTypeDescription: r.otherTypeDescription,
        contactPersonName: r.contactPersonName,
        contactPersonEmail: r.contactPersonEmail,
        contactPersonPhone: r.contactPersonPhone,
        isActive: r.isActive,
      })),
      industryAssociations: industry.map((i) => ({
        id: i.id,
        associationName: i.associationName,
        sectorIndustry: i.sectorIndustry,
        numberOfMembers: i.numberOfMembers,
        contactPersonName: i.contactPersonName,
        contactPersonEmail: i.contactPersonEmail,
        contactPersonPhone: i.contactPersonPhone,
        willingnessToPromoteAcap: i.willingnessToPromoteAcap,
        isActive: i.isActive,
      })),
      testingLaboratories: laboratories.map((l) => ({
        id: l.id,
        name: l.name,
        accreditationStatus: l.accreditationStatus,
        otherAccreditationDescription: l.otherAccreditationDescription,
        scopeOfAccreditation: l.scopeOfAccreditation,
        contactForAcapReferralsName: l.contactForAcapReferralsName,
        contactForAcapReferralsEmail: l.contactForAcapReferralsEmail,
        contactForAcapReferralsPhone: l.contactForAcapReferralsPhone,
        isActive: l.isActive,
      })),
    };
  }

  async updateStakeholderRegistry(nsbId: string, dto: StakeholderRegistryDto): Promise<StakeholderRegistryDto> {
    const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
    if (!nsb) {
      throw new NotFoundException(`NSB with ID ${nsbId} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Handle Market Surveillance Authorities
      if (dto.marketSurveillanceAuthorities !== undefined) {
        // Delete existing
        await queryRunner.manager.delete('nsb_market_surveillance_authorities', { nsbId });

        // Create new ones
        if (dto.marketSurveillanceAuthorities.length > 0) {
          const msas = dto.marketSurveillanceAuthorities.map((m) =>
            this.msaRepository.create({
              nsbId,
              agencyName: m.agencyName,
              jurisdiction: m.jurisdiction,
              contactPersonName: m.contactPersonName,
              contactPersonEmail: m.contactPersonEmail,
              contactPersonPhone: m.contactPersonPhone,
              scopeOfAuthority: m.scopeOfAuthority,
              mouStatus: m.mouStatus,
              mouDocumentPath: m.mouDocumentPath,
              mouDocumentHash: m.mouDocumentHash,
              systemAccessLevelRequested: m.systemAccessLevelRequested,
              isActive: m.isActive !== undefined ? m.isActive : true,
            }),
          );
          await queryRunner.manager.save(msas);
        }
      }

      // Handle Customs/Border Agencies
      if (dto.customsBorderAgencies !== undefined) {
        await queryRunner.manager.delete('nsb_customs_border_agencies', { nsbId });

        if (dto.customsBorderAgencies.length > 0) {
          const customs = dto.customsBorderAgencies.map((c) =>
            this.customsRepository.create({
              nsbId,
              agencyName: c.agencyName,
              acapVerificationContactName: c.acapVerificationContactName,
              acapVerificationContactEmail: c.acapVerificationContactEmail,
              acapVerificationContactPhone: c.acapVerificationContactPhone,
              integrationStatus: c.integrationWithNationalSingleWindow !== undefined
                ? (c.integrationWithNationalSingleWindow ? 'PARTIAL_INTEGRATION' : 'NO_INTEGRATION')
                : undefined,
              isActive: c.isActive !== undefined ? c.isActive : true,
            }),
          );
          await queryRunner.manager.save(customs);
        }
      }

      // Handle Regulatory Agencies
      if (dto.regulatoryAgencies !== undefined) {
        await queryRunner.manager.delete('nsb_regulatory_agencies', { nsbId });

        if (dto.regulatoryAgencies.length > 0) {
          const regulatory = dto.regulatoryAgencies.map((r) =>
            this.regulatoryRepository.create({
              nsbId,
              agencyName: r.agencyName,
              agencyType: r.agencyType,
              otherTypeDescription: r.otherTypeDescription,
              contactPersonName: r.contactPersonName,
              contactPersonEmail: r.contactPersonEmail,
              contactPersonPhone: r.contactPersonPhone,
              isActive: r.isActive !== undefined ? r.isActive : true,
            }),
          );
          await queryRunner.manager.save(regulatory);
        }
      }

      // Handle Industry Associations
      if (dto.industryAssociations !== undefined) {
        await queryRunner.manager.delete('nsb_industry_associations', { nsbId });

        if (dto.industryAssociations.length > 0) {
          const industry = dto.industryAssociations.map((i) =>
            this.industryRepository.create({
              nsbId,
              associationName: i.associationName,
              sectorIndustry: i.sectorIndustry,
              numberOfMembers: i.numberOfMembers,
              contactPersonName: i.contactPersonName,
              contactPersonEmail: i.contactPersonEmail,
              contactPersonPhone: i.contactPersonPhone,
              willingnessToPromoteAcap: i.willingnessToPromoteAcap !== undefined ? i.willingnessToPromoteAcap : false,
              isActive: i.isActive !== undefined ? i.isActive : true,
            }),
          );
          await queryRunner.manager.save(industry);
        }
      }

      // Handle Testing Laboratories
      if (dto.testingLaboratories !== undefined) {
        await queryRunner.manager.delete('nsb_testing_laboratories', { nsbId });

        if (dto.testingLaboratories.length > 0) {
          const laboratories = dto.testingLaboratories.map((l) =>
            this.laboratoryRepository.create({
              nsbId,
              name: l.name,
              accreditationStatus: l.accreditationStatus,
              otherAccreditationDescription: l.otherAccreditationDescription,
              scopeOfAccreditation: l.scopeOfAccreditation,
              contactForAcapReferralsName: l.contactForAcapReferralsName,
              contactForAcapReferralsEmail: l.contactForAcapReferralsEmail,
              contactForAcapReferralsPhone: l.contactForAcapReferralsPhone,
              isActive: l.isActive !== undefined ? l.isActive : true,
            }),
          );
          await queryRunner.manager.save(laboratories);
        }
      }

      await queryRunner.commitTransaction();
      return this.getStakeholderRegistry(nsbId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async saveDraft(nsbId: string, dto: StakeholderRegistryDto, userId: string): Promise<StakeholderRegistryDto> {
    const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
    if (!nsb) {
      throw new NotFoundException(`NSB with ID ${nsbId} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Save registry data (same as updateStakeholderRegistry but without validation)
      await this.updateStakeholderRegistryData(nsbId, dto, queryRunner);

      // Update status to DRAFT
      await queryRunner.manager.update(
        'nsb',
        { id: nsbId },
        {
          stakeholderRegistryStatus: StakeholderRegistryStatus.DRAFT,
          stakeholderRegistrySubmittedAt: null,
          stakeholderRegistrySubmittedBy: null,
        },
      );

      await queryRunner.commitTransaction();
      return this.getStakeholderRegistry(nsbId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async submitRegistry(nsbId: string, dto: StakeholderRegistryDto, userId: string): Promise<StakeholderRegistryDto> {
    const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
    if (!nsb) {
      throw new NotFoundException(`NSB with ID ${nsbId} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Save registry data (validation happens at DTO level via class-validator)
      await this.updateStakeholderRegistryData(nsbId, dto, queryRunner);

      // Update status to SUBMITTED
      await queryRunner.manager.update(
        'nsb',
        { id: nsbId },
        {
          stakeholderRegistryStatus: StakeholderRegistryStatus.SUBMITTED,
          stakeholderRegistrySubmittedAt: new Date(),
          stakeholderRegistrySubmittedBy: userId,
        },
      );

      await queryRunner.commitTransaction();
      return this.getStakeholderRegistry(nsbId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async updateStakeholderRegistryData(
    nsbId: string,
    dto: StakeholderRegistryDto,
    queryRunner: any,
  ): Promise<void> {
    // Handle Market Surveillance Authorities
    if (dto.marketSurveillanceAuthorities !== undefined) {
      await queryRunner.manager.delete('nsb_market_surveillance_authorities', { nsbId });

      if (dto.marketSurveillanceAuthorities.length > 0) {
        const msas = dto.marketSurveillanceAuthorities.map((m) =>
          this.msaRepository.create({
            nsbId,
            agencyName: m.agencyName,
            jurisdiction: m.jurisdiction,
            contactPersonName: m.contactPersonName,
            contactPersonEmail: m.contactPersonEmail,
            contactPersonPhone: m.contactPersonPhone,
            scopeOfAuthority: m.scopeOfAuthority,
            mouStatus: m.mouStatus,
            mouDocumentPath: m.mouDocumentPath,
            mouDocumentHash: m.mouDocumentHash,
            systemAccessLevelRequested: m.systemAccessLevelRequested,
            isActive: m.isActive !== undefined ? m.isActive : true,
          }),
        );
        await queryRunner.manager.save(msas);
      }
    }

    // Handle Customs/Border Agencies
    if (dto.customsBorderAgencies !== undefined) {
      await queryRunner.manager.delete('nsb_customs_border_agencies', { nsbId });

      if (dto.customsBorderAgencies.length > 0) {
        const customs = dto.customsBorderAgencies.map((c) =>
          this.customsRepository.create({
            nsbId,
            agencyName: c.agencyName,
            acapVerificationContactName: c.acapVerificationContactName,
            acapVerificationContactEmail: c.acapVerificationContactEmail,
            acapVerificationContactPhone: c.acapVerificationContactPhone,
            integrationStatus: c.integrationWithNationalSingleWindow !== undefined
              ? (c.integrationWithNationalSingleWindow ? 'PARTIAL_INTEGRATION' : 'NO_INTEGRATION')
              : undefined,
            isActive: c.isActive !== undefined ? c.isActive : true,
          }),
        );
        await queryRunner.manager.save(customs);
      }
    }

    // Handle Regulatory Agencies
    if (dto.regulatoryAgencies !== undefined) {
      await queryRunner.manager.delete('nsb_regulatory_agencies', { nsbId });

      if (dto.regulatoryAgencies.length > 0) {
        const regulatory = dto.regulatoryAgencies.map((r) =>
          this.regulatoryRepository.create({
            nsbId,
            agencyName: r.agencyName,
            agencyType: r.agencyType,
            otherTypeDescription: r.otherTypeDescription,
            contactPersonName: r.contactPersonName,
            contactPersonEmail: r.contactPersonEmail,
            contactPersonPhone: r.contactPersonPhone,
            isActive: r.isActive !== undefined ? r.isActive : true,
          }),
        );
        await queryRunner.manager.save(regulatory);
      }
    }

    // Handle Industry Associations
    if (dto.industryAssociations !== undefined) {
      await queryRunner.manager.delete('nsb_industry_associations', { nsbId });

      if (dto.industryAssociations.length > 0) {
        const industry = dto.industryAssociations.map((i) =>
          this.industryRepository.create({
            nsbId,
            associationName: i.associationName,
            sectorIndustry: i.sectorIndustry,
            numberOfMembers: i.numberOfMembers,
            contactPersonName: i.contactPersonName,
            contactPersonEmail: i.contactPersonEmail,
            contactPersonPhone: i.contactPersonPhone,
            willingnessToPromoteAcap: i.willingnessToPromoteAcap !== undefined ? i.willingnessToPromoteAcap : false,
            isActive: i.isActive !== undefined ? i.isActive : true,
          }),
        );
        await queryRunner.manager.save(industry);
      }
    }

    // Handle Testing Laboratories
    if (dto.testingLaboratories !== undefined) {
      await queryRunner.manager.delete('nsb_testing_laboratories', { nsbId });

      if (dto.testingLaboratories.length > 0) {
        const laboratories = dto.testingLaboratories.map((l) =>
          this.laboratoryRepository.create({
            nsbId,
            name: l.name,
            accreditationStatus: l.accreditationStatus,
            otherAccreditationDescription: l.otherAccreditationDescription,
            scopeOfAccreditation: l.scopeOfAccreditation,
            contactForAcapReferralsName: l.contactForAcapReferralsName,
            contactForAcapReferralsEmail: l.contactForAcapReferralsEmail,
            contactForAcapReferralsPhone: l.contactForAcapReferralsPhone,
            isActive: l.isActive !== undefined ? l.isActive : true,
          }),
        );
        await queryRunner.manager.save(laboratories);
      }
    }
  }
}

