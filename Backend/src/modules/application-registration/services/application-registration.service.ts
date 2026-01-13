import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationRegistration } from '../entities';
import {
  CreateApplicationRegistrationDto,
  CreateApplicationRegistrationDraftDto,
  UpdateApplicationRegistrationDto,
} from '../dtos';
import { ApplicationRegistrationStatus } from '../../../shared/enums';

@Injectable()
export class ApplicationRegistrationService {
  constructor(
    @InjectRepository(ApplicationRegistration)
    private readonly applicationRegistrationRepository: Repository<ApplicationRegistration>,
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

  /**
   * Save draft - NO VALIDATION - Accepts any data
   */
  async createDraft(
    dto: CreateApplicationRegistrationDraftDto,
    userId: string,
  ): Promise<ApplicationRegistration> {
    // Clean the DTO to remove undefined values
    const cleanedDto = this.removeUndefinedValues(dto);

    // Extract nested data for JSON storage
    const {
      companyInfo,
      companySize,
      ownershipInfo,
      primaryContact,
      locations,
      businessSectors,
      marketInfo,
      productionCapacity,
      preferences,
      accessibility,
      consents,
      productCertification,
      manufacturerInfo,
      conformityEvidence,
      postCertification,
      cbSelection,
      countryId,
      ...flatFields
    } = cleanedDto;

    // Create application registration with DRAFT status
    const applicationRegistration = this.applicationRegistrationRepository.create({
      ...flatFields,
      // Store nested structures in JSON columns
      companyInfo: companyInfo || undefined,
      companySize: companySize || undefined,
      ownershipInfo: ownershipInfo || undefined,
      primaryContact: primaryContact || undefined,
      locations: locations || undefined,
      businessSectors: businessSectors || undefined,
      marketInfo: marketInfo || undefined,
      productionCapacity: productionCapacity || undefined,
      preferences: preferences || undefined,
      accessibility: accessibility || undefined,
      consents: consents || undefined,
      productCertification: productCertification || undefined,
      manufacturerInfo: manufacturerInfo || undefined,
      conformityEvidence: conformityEvidence || undefined,
      postCertification: postCertification || undefined,
      cbSelection: cbSelection || undefined,
      countryId: countryId || undefined,
      status: ApplicationRegistrationStatus.DRAFT,
      userId: dto.userId || userId,
      createdBy: userId,
      updatedBy: userId,
    });

    return this.applicationRegistrationRepository.save(applicationRegistration);
  }

  /**
   * Create with validation - for final submission
   * Allows multiple applications per user
   */
  async create(
    dto: CreateApplicationRegistrationDto,
    userId: string,
  ): Promise<ApplicationRegistration> {
    // Extract nested Part B data
    const {
      productCertification,
      manufacturerInfo,
      conformityEvidence,
      postCertification,
      cbSelection,
      ...flatFields
    } = dto;

    const applicationRegistration = this.applicationRegistrationRepository.create({
      ...flatFields,
      // Store Part B nested structures in JSON columns
      productCertification: productCertification || undefined,
      manufacturerInfo: manufacturerInfo || undefined,
      conformityEvidence: conformityEvidence || undefined,
      postCertification: postCertification || undefined,
      cbSelection: cbSelection || undefined,
      status: ApplicationRegistrationStatus.DRAFT,
      userId: dto.userId || userId,
      createdBy: userId,
      updatedBy: userId,
    });

    return this.applicationRegistrationRepository.save(applicationRegistration);
  }

  /**
   * Update draft - NO VALIDATION - Accepts any data
   */
  async update(
    id: string,
    dto: UpdateApplicationRegistrationDto,
    userId: string,
  ): Promise<ApplicationRegistration> {
    const applicationRegistration = await this.findById(id);

    if (applicationRegistration.status !== ApplicationRegistrationStatus.DRAFT) {
      throw new BadRequestException('Can only update draft registrations');
    }

    // Clean the DTO to remove undefined values
    const cleanedDto = this.removeUndefinedValues(dto);

    // Extract nested data for JSON storage
    const {
      companyInfo,
      companySize,
      ownershipInfo,
      primaryContact,
      locations,
      businessSectors,
      marketInfo,
      productionCapacity,
      preferences,
      accessibility,
      consents,
      productCertification,
      manufacturerInfo,
      conformityEvidence,
      postCertification,
      cbSelection,
      countryId,
      ...flatFields
    } = cleanedDto;

    // Update flat fields
    Object.assign(applicationRegistration, flatFields);

    // Update nested JSON fields (merge with existing if present)
    if (companyInfo !== undefined) applicationRegistration.companyInfo = companyInfo;
    if (companySize !== undefined) applicationRegistration.companySize = companySize;
    if (ownershipInfo !== undefined) applicationRegistration.ownershipInfo = ownershipInfo;
    if (primaryContact !== undefined) applicationRegistration.primaryContact = primaryContact;
    if (locations !== undefined) applicationRegistration.locations = locations;
    if (businessSectors !== undefined) applicationRegistration.businessSectors = businessSectors;
    if (marketInfo !== undefined) applicationRegistration.marketInfo = marketInfo;
    if (productionCapacity !== undefined) applicationRegistration.productionCapacity = productionCapacity;
    if (preferences !== undefined) applicationRegistration.preferences = preferences;
    if (accessibility !== undefined) applicationRegistration.accessibility = accessibility;
    if (consents !== undefined) applicationRegistration.consents = consents;
    if (productCertification !== undefined) applicationRegistration.productCertification = productCertification;
    if (manufacturerInfo !== undefined) applicationRegistration.manufacturerInfo = manufacturerInfo;
    if (conformityEvidence !== undefined) applicationRegistration.conformityEvidence = conformityEvidence;
    if (postCertification !== undefined) applicationRegistration.postCertification = postCertification;
    if (cbSelection !== undefined) applicationRegistration.cbSelection = cbSelection;
    if (countryId !== undefined) applicationRegistration.countryId = countryId;

    applicationRegistration.updatedBy = userId;

    return this.applicationRegistrationRepository.save(applicationRegistration);
  }

  /**
   * Submit application - Validates all required fields
   */
  async submit(id: string, userId: string): Promise<ApplicationRegistration> {
    const applicationRegistration = await this.findById(id);

    if (applicationRegistration.status !== ApplicationRegistrationStatus.DRAFT) {
      throw new BadRequestException('Only draft registrations can be submitted');
    }

    // Validate required fields
    if (!applicationRegistration.applicantName) {
      throw new BadRequestException('Applicant name is required');
    }

    if (!applicationRegistration.applicantType) {
      throw new BadRequestException('Applicant type is required');
    }

    if (!applicationRegistration.registrationNumber) {
      throw new BadRequestException('Registration number is required');
    }

    if (!applicationRegistration.contactPerson) {
      throw new BadRequestException('Contact person is required');
    }

    if (!applicationRegistration.contactEmail) {
      throw new BadRequestException('Contact email is required');
    }

    if (!applicationRegistration.contactPhone) {
      throw new BadRequestException('Contact phone is required');
    }

    if (!applicationRegistration.physicalAddress) {
      throw new BadRequestException('Physical address is required');
    }

    if (!applicationRegistration.city) {
      throw new BadRequestException('City is required');
    }

    if (!applicationRegistration.regionState) {
      throw new BadRequestException('Region/State is required');
    }

    if (!applicationRegistration.postalCode) {
      throw new BadRequestException('Postal code is required');
    }

    if (!applicationRegistration.countryId) {
      throw new BadRequestException('Country is required');
    }

    if (!applicationRegistration.businessActivity) {
      throw new BadRequestException('Business activity is required');
    }

    // Update status
    applicationRegistration.status = ApplicationRegistrationStatus.SUBMITTED;
    applicationRegistration.submittedAt = new Date();
    applicationRegistration.updatedBy = userId;

    return this.applicationRegistrationRepository.save(applicationRegistration);
  }

  async findById(id: string): Promise<ApplicationRegistration> {
    const applicationRegistration = await this.applicationRegistrationRepository.findOne({
      where: { id },
      relations: ['country', 'user'],
    });

    if (!applicationRegistration) {
      throw new NotFoundException(`Application registration with ID ${id} not found`);
    }

    return applicationRegistration;
  }

  async findByUserId(userId: string): Promise<ApplicationRegistration[]> {
    return this.applicationRegistrationRepository.find({
      where: { userId },
      relations: ['country'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(filters?: {
    status?: ApplicationRegistrationStatus;
    countryId?: string;
    skip?: number;
    limit?: number;
  }): Promise<{ data: ApplicationRegistration[]; total: number }> {
    const queryBuilder = this.applicationRegistrationRepository.createQueryBuilder('application');

    if (filters?.status) {
      queryBuilder.andWhere('application.status = :status', { status: filters.status });
    }

    if (filters?.countryId) {
      queryBuilder.andWhere('application.countryId = :countryId', { countryId: filters.countryId });
    }

    const total = await queryBuilder.getCount();

    if (filters?.skip !== undefined) {
      queryBuilder.skip(filters.skip);
    }

    if (filters?.limit !== undefined) {
      queryBuilder.limit(filters.limit);
    }

    queryBuilder
      .leftJoinAndSelect('application.country', 'country')
      .orderBy('application.createdAt', 'DESC');

    const data = await queryBuilder.getMany();

    return { data, total };
  }

  async delete(id: string, userId: string): Promise<void> {
    const applicationRegistration = await this.findById(id);

    if (applicationRegistration.status !== ApplicationRegistrationStatus.DRAFT) {
      throw new BadRequestException('Can only delete draft registrations');
    }

    await this.applicationRegistrationRepository.remove(applicationRegistration);
  }
}

