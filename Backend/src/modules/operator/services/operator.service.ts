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
  OperatorType,
  LegalStructure,
  EmployeeCountRange,
  AnnualTurnoverRange,
  OwnershipType,
  OwnershipStatus,
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

  /**
   * Helper function to remove undefined values from an object
   */
  private removeUndefinedValues<T extends Record<string, any>>(obj: T): Partial<T> {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        cleaned[key] = obj[key];
      }
    }
    return cleaned;
  }

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

      // Create main operator record - NO VALIDATIONS - Accept any data
      // Only set fields that are actually provided (not undefined)
      const operatorData: any = {
        status: OperatorStatus.DRAFT,
        userId: dto.userId || userId,
        createdBy: userId,
        updatedBy: userId,
      };

      // Only set fields if they are provided (not undefined)
      if (dto.companyInfo?.operatorType !== undefined) operatorData.operatorType = dto.companyInfo.operatorType;
      if (dto.companyInfo?.companyLegalName !== undefined) operatorData.companyLegalName = dto.companyInfo.companyLegalName;
      if (dto.companyInfo?.tradingName !== undefined) operatorData.tradingName = dto.companyInfo.tradingName;
      if (dto.companyInfo?.registrationNumberBusiness !== undefined) operatorData.registrationNumberBusiness = dto.companyInfo.registrationNumberBusiness;
      if (dto.companyInfo?.legalRegistrationNumberType !== undefined) {
        operatorData.legalRegistrationNumberType = dto.companyInfo.legalRegistrationNumberType;
      }
      if (dto.companyInfo?.legalRegistrationNumber !== undefined) {
        operatorData.legalRegistrationNumber = dto.companyInfo.legalRegistrationNumber;
      }
      if (dto.companyInfo?.taxId !== undefined) operatorData.taxId = dto.companyInfo.taxId;
      if (dto.companyInfo?.vatNumber !== undefined) operatorData.vatNumber = dto.companyInfo.vatNumber;
      if (dto.companyInfo?.yearEstablished !== undefined) operatorData.yearEstablished = dto.companyInfo.yearEstablished;
      if (dto.companyInfo?.legalStructure !== undefined) operatorData.legalStructure = dto.companyInfo.legalStructure;
      if (dto.companyInfo?.businessActivity !== undefined) operatorData.businessActivity = dto.companyInfo.businessActivity;
      
      if (dto.companySize?.employeeCount !== undefined) operatorData.employeeCount = dto.companySize.employeeCount;
      if (dto.companySize?.annualTurnover !== undefined) operatorData.annualTurnover = dto.companySize.annualTurnover;
      if (dto.companySize?.annualRevenue !== undefined) operatorData.annualRevenue = dto.companySize.annualRevenue;
      if (dto.companySize?.exportPercentage !== undefined) operatorData.exportPercentage = dto.companySize.exportPercentage;
      if (dto.companySize?.importPercentage !== undefined) operatorData.importPercentage = dto.companySize.importPercentage;
      if (dto.companySize?.capitalInvestment !== undefined) operatorData.capitalInvestment = dto.companySize.capitalInvestment;
      
      if (dto.ownershipInfo?.ownershipType !== undefined) operatorData.ownershipType = dto.ownershipInfo.ownershipType;
      if (dto.ownershipInfo?.majorityOwnerNationality !== undefined) operatorData.majorityOwnerNationality = dto.ownershipInfo.majorityOwnerNationality;
      if (dto.ownershipInfo?.womenOwned !== undefined) operatorData.womenOwned = dto.ownershipInfo.womenOwned;
      if (dto.ownershipInfo?.youthOwned !== undefined) operatorData.youthOwned = dto.ownershipInfo.youthOwned;
      if (dto.ownershipInfo?.blackOwnedPercentage !== undefined) operatorData.blackOwnedPercentage = dto.ownershipInfo.blackOwnedPercentage;
      if (dto.ownershipInfo?.beneficialOwnersCount !== undefined) operatorData.beneficialOwnersCount = dto.ownershipInfo.beneficialOwnersCount;
      if (dto.ownershipInfo?.pepInvolved !== undefined) operatorData.pepInvolved = dto.ownershipInfo.pepInvolved;
      if (dto.ownershipInfo?.pepDetails !== undefined) operatorData.pepDetails = dto.ownershipInfo.pepDetails;
      if (dto.isGroup !== undefined) operatorData.isGroup = dto.isGroup;
      if (dto.groupManagerId !== undefined) operatorData.groupManagerId = dto.groupManagerId;
      if (dto.groupMembers !== undefined) operatorData.groupMembers = dto.groupMembers as Record<string, any>[];
      if (dto.countryId !== undefined) operatorData.countryId = dto.countryId;

      const operator = this.operatorRepository.create(operatorData);

      // Save operator - TypeORM save returns the entity (not an array for single entity)
      const savedOperatorResult = await queryRunner.manager.getRepository(Operator).save(operator);
      const savedOperator = Array.isArray(savedOperatorResult) ? savedOperatorResult[0] : savedOperatorResult;

      // Create primary contact (only if provided and has some data)
      if (dto.primaryContact) {
        const cleanedContact = this.removeUndefinedValues(dto.primaryContact);
        // Only save if contact has at least some data (not completely empty)
        if (Object.keys(cleanedContact).length > 0 || cleanedContact.primaryContact || cleanedContact.contactEmail) {
          const primaryContact = this.contactRepository.create({
            ...cleanedContact,
            operatorId: savedOperator.id,
            isPrimary: true,
            contactType: (dto.primaryContact.contactType as OperatorContactType) || OperatorContactType.PRIMARY,
          });
          await queryRunner.manager.save(primaryContact);
        }
      }

      // Create locations - only save if location has at least some meaningful data
      if (dto.locations && dto.locations.length > 0) {
        const locations = dto.locations
          .map((loc) => {
            const cleanedLoc = this.removeUndefinedValues(loc);
            // Check if location has any meaningful data (not just empty strings)
            const hasData = Object.keys(cleanedLoc).some(key => {
              const value = cleanedLoc[key];
              return value !== undefined && value !== null && value !== '';
            });
            
            if (!hasData) {
              return null; // Skip completely empty locations
            }
            
            return this.locationRepository.create({
              ...cleanedLoc,
              operatorId: savedOperator.id,
              locationType: loc.locationType ? (loc.locationType as OperatorLocationType) : undefined,
              factoryType: loc.factoryType ? (loc.factoryType as FactoryType) : undefined,
            });
          })
          .filter(loc => loc !== null && loc !== undefined);
        
        if (locations.length > 0) {
          await queryRunner.manager.save(locations);
        }
      }

      // Create business sectors
      if (dto.businessSectors && dto.businessSectors.length > 0) {
        const sectors = dto.businessSectors.map((sector) => {
          const cleanedSector = this.removeUndefinedValues(sector);
          return this.businessSectorRepository.create({
            ...cleanedSector,
            operatorId: savedOperator.id,
            mainSector: sector.mainSector ? (sector.mainSector as MainBusinessSector) : undefined,
          });
        });
        await queryRunner.manager.save(sectors);
      }

      // Create market info (only if provided)
      if (dto.marketInfo) {
        const { primaryExportMarket, ...marketData } = dto.marketInfo;
        const cleanedMarket = this.removeUndefinedValues(marketData);
        const market = this.marketRepository.create({
          ...cleanedMarket,
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
        const cleanedCapacity = this.removeUndefinedValues(dto.productionCapacity);
        const productionCapacity = this.productionCapacityRepository.create({
          ...cleanedCapacity,
          operatorId: savedOperator.id,
          qmsType: dto.productionCapacity.qmsType ? (dto.productionCapacity.qmsType as QMSType) : undefined,
        });
        await queryRunner.manager.save(productionCapacity);
      }

      // Create preferences (only if provided)
      if (dto.preferences) {
        const cleanedPreferences = this.removeUndefinedValues(dto.preferences);
        const preferences = this.preferenceRepository.create({
          ...cleanedPreferences,
          operatorId: savedOperator.id,
          preferredLanguage: dto.preferences.preferredLanguage ? (dto.preferences.preferredLanguage as PreferredLanguage) : undefined,
          communicationPreferences: (dto.preferences.communicationPreferences as CommunicationPreference[]) || [],
          notificationFrequency: dto.preferences.notificationFrequency ? (dto.preferences.notificationFrequency as NotificationFrequency) : undefined,
        });
        await queryRunner.manager.save(preferences);
      }

      // Create accessibility (only if provided)
      if (dto.accessibility) {
        const cleanedAccessibility = this.removeUndefinedValues(dto.accessibility);
        const accessibility = this.accessibilityRepository.create({
          ...cleanedAccessibility,
          operatorId: savedOperator.id,
          disabilityTypes: (dto.accessibility.disabilityTypes as AssistiveTechType[]) || [],
          literacyLevel: dto.accessibility.literacyLevel ? (dto.accessibility.literacyLevel as DigitalLiteracyLevel) : undefined,
          internetAccess: dto.accessibility.internetAccess ? (dto.accessibility.internetAccess as InternetAccessType) : undefined,
          deviceType: dto.accessibility.deviceType ? (dto.accessibility.deviceType as DeviceType) : undefined,
        });
        await queryRunner.manager.save(accessibility);
      }

      // Create consents (only if provided)
      if (dto.consents) {
        const cleanedConsents = this.removeUndefinedValues(dto.consents);
        const consents = this.consentRepository.create({
          ...cleanedConsents,
          operatorId: savedOperator.id,
        });
        await queryRunner.manager.save(consents);
      }

      await queryRunner.commitTransaction();
      return this.findById(savedOperator.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // Log the error for debugging
      console.error('Error creating operator registration:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
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
          legalRegistrationNumberType: dto.companyInfo.legalRegistrationNumberType,
          legalRegistrationNumber: dto.companyInfo.legalRegistrationNumber,
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

      if (dto.isGroup !== undefined) {
        operator.isGroup = dto.isGroup;
      }

      if (dto.groupManagerId !== undefined) {
        operator.groupManagerId = dto.groupManagerId;
      }

      if (dto.groupMembers !== undefined) {
        operator.groupMembers = dto.groupMembers as Record<string, any>[];
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

    if (!operator.legalRegistrationNumberType || !operator.legalRegistrationNumber) {
      throw new BadRequestException('Legal registration number type and number are required');
    }

    if (operator.locations && operator.locations.length > 0) {
      for (const location of operator.locations) {
        if (
          location.geoLat === null ||
          location.geoLat === undefined ||
          location.geoLng === null ||
          location.geoLng === undefined ||
          location.geoAccuracyM === null ||
          location.geoAccuracyM === undefined
        ) {
          throw new BadRequestException('Geo coordinates and accuracy are required for all locations');
        }
        if (Number(location.geoAccuracyM) > 10) {
          throw new BadRequestException('Geo accuracy must be within 10 meters');
        }
      }
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

