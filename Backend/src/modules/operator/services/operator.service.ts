import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Operator,
  OperatorContact,
  OperatorLocation,
  OperatorBusinessSector,
  OperatorMarket,
  OperatorProductionCapacity,
  OperatorPreference,
  OperatorAccessibility,
  OperatorConsent,
} from '../entities';
import { CreateOperatorRegistrationDto, CreateOperatorRegistrationDraftDto, UpdateOperatorRegistrationDto } from '../dtos';
import {
  OperatorStatus,
  OperatorContactType,
  OperatorLocationType,
  MainBusinessSector,
  DomesticMarketType,
  QMSType,
  PreferredLanguage,
  AssistiveTechType,
  FactoryType,
  CommunicationPreference,
  DigitalLiteracyLevel,
  InternetAccessType,
  DeviceType,
  NotificationFrequency,
} from '../../../shared/enums';

@Injectable()
export class OperatorService {
  constructor(
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
    @InjectRepository(OperatorContact)
    private readonly contactRepository: Repository<OperatorContact>,
    @InjectRepository(OperatorLocation)
    private readonly locationRepository: Repository<OperatorLocation>,
    @InjectRepository(OperatorBusinessSector)
    private readonly businessSectorRepository: Repository<OperatorBusinessSector>,
    @InjectRepository(OperatorMarket)
    private readonly marketRepository: Repository<OperatorMarket>,
    @InjectRepository(OperatorProductionCapacity)
    private readonly productionCapacityRepository: Repository<OperatorProductionCapacity>,
    @InjectRepository(OperatorPreference)
    private readonly preferenceRepository: Repository<OperatorPreference>,
    @InjectRepository(OperatorAccessibility)
    private readonly accessibilityRepository: Repository<OperatorAccessibility>,
    @InjectRepository(OperatorConsent)
    private readonly consentRepository: Repository<OperatorConsent>,
    private readonly dataSource: DataSource,
  ) {}

  async createOperatorRegistration(dto: CreateOperatorRegistrationDto | CreateOperatorRegistrationDraftDto, userId: string): Promise<Operator> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate revenue percentages sum to 100% (only if business sectors are provided)
      if (dto.businessSectors && dto.businessSectors.length > 0) {
        let totalRevenue = 0;
        for (const sector of dto.businessSectors) {
          const percentage = (sector as any)?.percentageRevenue;
          if (typeof percentage === 'number') {
            totalRevenue += percentage;
          }
        }
        if (Math.abs(totalRevenue - 100) > 0.01) {
          throw new BadRequestException('Total revenue percentage across all sectors must equal 100%');
        }
      }

      // Create main operator record
      const operator = this.operatorRepository.create({
        operatorType: dto.companyInfo?.operatorType,
        companyLegalName: dto.companyInfo?.companyLegalName,
        tradingName: dto.companyInfo?.tradingName,
        registrationNumberBusiness: dto.companyInfo?.registrationNumberBusiness,
        taxId: dto.companyInfo?.taxId,
        vatNumber: dto.companyInfo?.vatNumber,
        yearEstablished: dto.companyInfo?.yearEstablished,
        legalStructure: dto.companyInfo?.legalStructure,
        businessActivity: dto.companyInfo?.businessActivity,
        employeeCount: dto.companySize?.employeeCount,
        annualTurnover: dto.companySize?.annualTurnover,
        annualRevenue: dto.companySize?.annualRevenue,
        exportPercentage: dto.companySize?.exportPercentage,
        importPercentage: dto.companySize?.importPercentage,
        capitalInvestment: dto.companySize?.capitalInvestment,
        ownershipType: dto.ownershipInfo?.ownershipType,
        majorityOwnerNationality: dto.ownershipInfo?.majorityOwnerNationality,
        womenOwned: dto.ownershipInfo?.womenOwned,
        youthOwned: dto.ownershipInfo?.youthOwned,
        blackOwnedPercentage: dto.ownershipInfo?.blackOwnedPercentage,
        beneficialOwnersCount: dto.ownershipInfo?.beneficialOwnersCount,
        pepInvolved: dto.ownershipInfo?.pepInvolved,
        pepDetails: dto.ownershipInfo?.pepDetails,
        status: OperatorStatus.DRAFT,
        userId: dto.userId || userId,
        countryId: dto.countryId,
        createdBy: userId,
        updatedBy: userId,
      });

      const savedOperator = await queryRunner.manager.save(operator);

      // Create primary contact (only if provided)
      if (dto.primaryContact) {
        const primaryContact = this.contactRepository.create({
          ...dto.primaryContact,
          operatorId: savedOperator.id,
          isPrimary: true,
          contactType: (dto.primaryContact.contactType as OperatorContactType) || OperatorContactType.PRIMARY,
        });
        await queryRunner.manager.save(primaryContact);
      }

      // Create locations
      if (dto.locations && dto.locations.length > 0) {
        const locations = dto.locations.map((loc) =>
          this.locationRepository.create({
            ...loc,
            operatorId: savedOperator.id,
            locationType: (loc.locationType as OperatorLocationType) || undefined,
            factoryType: loc.factoryType ? (loc.factoryType as FactoryType) : undefined,
          }),
        );
        await queryRunner.manager.save(locations);
      }

      // Create business sectors
      if (dto.businessSectors && dto.businessSectors.length > 0) {
        const sectors = dto.businessSectors.map((sector) =>
          this.businessSectorRepository.create({
            ...sector,
            operatorId: savedOperator.id,
            mainSector: sector.mainSector as MainBusinessSector,
          }),
        );
        await queryRunner.manager.save(sectors);
      }

      // Create market info (only if provided)
      if (dto.marketInfo) {
        const { primaryExportMarket, ...marketData } = dto.marketInfo;
        const market = this.marketRepository.create({
          ...marketData,
          operatorId: savedOperator.id,
          domesticMarkets: (dto.marketInfo.domesticMarkets as DomesticMarketType[]) || [],
          exportMarkets: (dto.marketInfo.exportMarkets as string[]) || [],
          importSources: (dto.marketInfo.importSources as string[]) || [],
          primaryExportMarketId: primaryExportMarket || undefined,
        });
        await queryRunner.manager.save(market);
      }

      // Create production capacity (only if provided)
      if (dto.productionCapacity) {
        const productionCapacity = this.productionCapacityRepository.create({
          ...dto.productionCapacity,
          operatorId: savedOperator.id,
          qmsType: dto.productionCapacity.qmsType ? (dto.productionCapacity.qmsType as QMSType) : undefined,
        });
        await queryRunner.manager.save(productionCapacity);
      }

      // Create preferences (only if provided)
      if (dto.preferences) {
        const preferences = this.preferenceRepository.create({
          ...dto.preferences,
          operatorId: savedOperator.id,
          preferredLanguage: dto.preferences.preferredLanguage as PreferredLanguage,
          communicationPreferences: (dto.preferences.communicationPreferences as CommunicationPreference[]) || [],
          notificationFrequency: dto.preferences.notificationFrequency as NotificationFrequency,
        });
        await queryRunner.manager.save(preferences);
      }

      // Create accessibility (only if provided)
      if (dto.accessibility) {
        const accessibility = this.accessibilityRepository.create({
          ...dto.accessibility,
          operatorId: savedOperator.id,
          disabilityTypes: (dto.accessibility.disabilityTypes as AssistiveTechType[]) || [],
          literacyLevel: dto.accessibility.literacyLevel as DigitalLiteracyLevel,
          internetAccess: dto.accessibility.internetAccess as InternetAccessType,
          deviceType: dto.accessibility.deviceType as DeviceType,
        });
        await queryRunner.manager.save(accessibility);
      }

      // Create consents (only if provided)
      if (dto.consents) {
        const consents = this.consentRepository.create({
          ...dto.consents,
          operatorId: savedOperator.id,
        });
        await queryRunner.manager.save(consents);
      }

      await queryRunner.commitTransaction();
      return this.findById(savedOperator.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateOperatorRegistration(id: string, dto: UpdateOperatorRegistrationDto, userId: string): Promise<Operator> {
    const operator = await this.findById(id);

    if (operator.status !== OperatorStatus.DRAFT) {
      throw new BadRequestException('Can only update draft registrations');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update main operator record
      if (dto.companyInfo) {
        Object.assign(operator, {
          operatorType: dto.companyInfo.operatorType,
          companyLegalName: dto.companyInfo.companyLegalName,
          tradingName: dto.companyInfo.tradingName,
          registrationNumberBusiness: dto.companyInfo.registrationNumberBusiness,
          taxId: dto.companyInfo.taxId,
          vatNumber: dto.companyInfo.vatNumber,
          yearEstablished: dto.companyInfo.yearEstablished,
          legalStructure: dto.companyInfo.legalStructure,
          businessActivity: dto.companyInfo.businessActivity,
        });
      }

      if (dto.companySize) {
        Object.assign(operator, {
          employeeCount: dto.companySize.employeeCount,
          annualTurnover: dto.companySize.annualTurnover,
          annualRevenue: dto.companySize.annualRevenue,
          exportPercentage: dto.companySize.exportPercentage,
          importPercentage: dto.companySize.importPercentage,
          capitalInvestment: dto.companySize.capitalInvestment,
        });
      }

      if (dto.ownershipInfo) {
        Object.assign(operator, {
          ownershipType: dto.ownershipInfo.ownershipType,
          majorityOwnerNationality: dto.ownershipInfo.majorityOwnerNationality,
          womenOwned: dto.ownershipInfo.womenOwned,
          youthOwned: dto.ownershipInfo.youthOwned,
          blackOwnedPercentage: dto.ownershipInfo.blackOwnedPercentage,
          beneficialOwnersCount: dto.ownershipInfo.beneficialOwnersCount,
          pepInvolved: dto.ownershipInfo.pepInvolved,
          pepDetails: dto.ownershipInfo.pepDetails,
        });
      }

      operator.updatedBy = userId;
      await queryRunner.manager.save(operator);

      // Update related entities if provided
      if (dto.primaryContact) {
        await queryRunner.manager.delete(OperatorContact, { operatorId: id, isPrimary: true });
        const primaryContact = this.contactRepository.create({
          ...dto.primaryContact,
          operatorId: id,
          isPrimary: true,
          contactType: (dto.primaryContact.contactType as OperatorContactType) || OperatorContactType.PRIMARY,
        });
        await queryRunner.manager.save(primaryContact);
      }

      if (dto.locations) {
        await queryRunner.manager.delete(OperatorLocation, { operatorId: id });
        const locations = dto.locations.map((loc) =>
          this.locationRepository.create({
            ...loc,
            operatorId: id,
            locationType: (loc.locationType as OperatorLocationType) || undefined,
            factoryType: loc.factoryType ? (loc.factoryType as FactoryType) : undefined,
          }),
        );
        await queryRunner.manager.save(locations);
      }

      if (dto.businessSectors) {
        // Validate revenue percentages
        const totalRevenue = dto.businessSectors.reduce((sum, sector) => sum + sector.percentageRevenue, 0);
        if (Math.abs(totalRevenue - 100) > 0.01) {
          throw new BadRequestException('Total revenue percentage across all sectors must equal 100%');
        }

        await queryRunner.manager.delete(OperatorBusinessSector, { operatorId: id });
        const sectors = dto.businessSectors.map((sector) =>
          this.businessSectorRepository.create({
            ...sector,
            operatorId: id,
            mainSector: sector.mainSector as MainBusinessSector,
          }),
        );
        await queryRunner.manager.save(sectors);
      }

      if (dto.marketInfo) {
        await queryRunner.manager.delete(OperatorMarket, { operatorId: id });
        const { primaryExportMarket, ...marketData } = dto.marketInfo;
        const market = this.marketRepository.create({
          ...marketData,
          operatorId: id,
          domesticMarkets: (dto.marketInfo.domesticMarkets as DomesticMarketType[]) || [],
          exportMarkets: (dto.marketInfo.exportMarkets as string[]) || [],
          importSources: (dto.marketInfo.importSources as string[]) || [],
          primaryExportMarketId: primaryExportMarket || undefined,
        });
        await queryRunner.manager.save(market);
      }

      if (dto.productionCapacity) {
        await queryRunner.manager.delete(OperatorProductionCapacity, { operatorId: id });
        const productionCapacity = this.productionCapacityRepository.create({
          ...dto.productionCapacity,
          operatorId: id,
          qmsType: dto.productionCapacity.qmsType ? (dto.productionCapacity.qmsType as QMSType) : undefined,
        });
        await queryRunner.manager.save(productionCapacity);
      }

      if (dto.preferences) {
        await queryRunner.manager.delete(OperatorPreference, { operatorId: id });
        const preferences = this.preferenceRepository.create({
          ...dto.preferences,
          operatorId: id,
          preferredLanguage: dto.preferences.preferredLanguage as PreferredLanguage,
          communicationPreferences: (dto.preferences.communicationPreferences as CommunicationPreference[]) || [],
          notificationFrequency: dto.preferences.notificationFrequency as NotificationFrequency,
        });
        await queryRunner.manager.save(preferences);
      }

      if (dto.accessibility) {
        await queryRunner.manager.delete(OperatorAccessibility, { operatorId: id });
        const accessibility = this.accessibilityRepository.create({
          ...dto.accessibility,
          operatorId: id,
          disabilityTypes: (dto.accessibility.disabilityTypes as AssistiveTechType[]) || [],
          literacyLevel: dto.accessibility.literacyLevel as DigitalLiteracyLevel,
          internetAccess: dto.accessibility.internetAccess as InternetAccessType,
          deviceType: dto.accessibility.deviceType as DeviceType,
        });
        await queryRunner.manager.save(accessibility);
      }

      if (dto.consents) {
        await queryRunner.manager.delete(OperatorConsent, { operatorId: id });
        const consents = this.consentRepository.create({
          ...dto.consents,
          operatorId: id,
        });
        await queryRunner.manager.save(consents);
      }

      await queryRunner.commitTransaction();
      return this.findById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async submitOperatorRegistration(id: string, userId: string): Promise<Operator> {
    const operator = await this.findById(id);

    if (operator.status !== OperatorStatus.DRAFT) {
      throw new BadRequestException('Only draft registrations can be submitted');
    }

    // Validate required fields
    if (!operator.contacts || operator.contacts.length === 0) {
      throw new BadRequestException('Primary contact is required');
    }

    if (!operator.locations || operator.locations.length === 0) {
      throw new BadRequestException('At least one location is required');
    }

    if (!operator.businessSectors || operator.businessSectors.length === 0) {
      throw new BadRequestException('At least one business sector is required');
    }

    if (!operator.consents?.dataConsent || !operator.consents?.termsAcceptance) {
      throw new BadRequestException('Data consent and terms acceptance are required');
    }

    operator.status = OperatorStatus.SUBMITTED;
    operator.submittedAt = new Date();
    operator.updatedBy = userId;

    return this.operatorRepository.save(operator);
  }

  async findById(id: string): Promise<Operator> {
    const operator = await this.operatorRepository.findOne({
      where: { id },
      relations: [
        'contacts',
        'locations',
        'businessSectors',
        'markets',
        'productionCapacity',
        'preferences',
        'accessibility',
        'consents',
        'country',
        'user',
      ],
    });

    if (!operator) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }

    return operator;
  }

  async findByUserId(userId: string): Promise<Operator | null> {
    return this.operatorRepository.findOne({
      where: { userId },
      relations: [
        'contacts',
        'locations',
        'businessSectors',
        'markets',
        'productionCapacity',
        'preferences',
        'accessibility',
        'consents',
        'country',
      ],
    });
  }

  async findAll(filters?: { status?: OperatorStatus; countryId?: string; skip?: number; limit?: number }): Promise<{
    data: Operator[];
    total: number;
  }> {
    const queryBuilder = this.operatorRepository.createQueryBuilder('operator');

    if (filters?.status) {
      queryBuilder.andWhere('operator.status = :status', { status: filters.status });
    }

    if (filters?.countryId) {
      queryBuilder.andWhere('operator.countryId = :countryId', { countryId: filters.countryId });
    }

    const total = await queryBuilder.getCount();

    if (filters?.skip !== undefined) {
      queryBuilder.skip(filters.skip);
    }

    if (filters?.limit !== undefined) {
      queryBuilder.limit(filters.limit);
    }

    queryBuilder
      .leftJoinAndSelect('operator.contacts', 'contacts')
      .leftJoinAndSelect('operator.locations', 'locations')
      .leftJoinAndSelect('operator.country', 'country')
      .orderBy('operator.createdAt', 'DESC');

    const data = await queryBuilder.getMany();

    return { data, total };
  }

  async deleteOperator(id: string, userId: string): Promise<void> {
    const operator = await this.findById(id);

    if (operator.status !== OperatorStatus.DRAFT) {
      throw new BadRequestException('Can only delete draft registrations');
    }

    await this.operatorRepository.remove(operator);
  }
}

