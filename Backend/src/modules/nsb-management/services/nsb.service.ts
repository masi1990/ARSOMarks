import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Nsb } from '../entities/nsb.entity';
import { NsbContact } from '../entities/nsb-contact.entity';
import { NsbLocation } from '../entities/nsb-location.entity';
import { NsbDocument } from '../entities/nsb-document.entity';
import { CreateNsbDto, UpdateNsbDto } from '../dtos';
import { NsbStatus } from '../../../shared/enums';
import { SystemUser } from '../../system-user/system-user.entity';

@Injectable()
export class NsbService {
  constructor(
    @InjectRepository(Nsb)
    private readonly nsbRepository: Repository<Nsb>,
    @InjectRepository(NsbContact)
    private readonly contactRepository: Repository<NsbContact>,
    @InjectRepository(NsbLocation)
    private readonly locationRepository: Repository<NsbLocation>,
    @InjectRepository(NsbDocument)
    private readonly documentRepository: Repository<NsbDocument>,
    private readonly dataSource: DataSource,
  ) {}

  async createNsb(createDto: CreateNsbDto, userId: string): Promise<Nsb> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Allow multiple NSBs per country to support sector-specific NSBs
      // (e.g., food/agriculture, telecommunications, etc.)
      // No longer checking for existing NSBs as countries may have multiple NSBs

      const nsb = this.nsbRepository.create({
        ...createDto,
        createdBy: userId,
        updatedBy: userId,
      });

      const savedNsb = await queryRunner.manager.save(nsb);

      const contacts = createDto.contacts.map((contact) =>
        this.contactRepository.create({
          ...contact,
          nsbId: savedNsb.id,
        }),
      );
      await queryRunner.manager.save(contacts);

      if (createDto.locations && createDto.locations.length > 0) {
        const locations = createDto.locations.map((location) =>
          this.locationRepository.create({
            ...location,
            nsbId: savedNsb.id,
          }),
        );
        await queryRunner.manager.save(locations);
      }

      await queryRunner.commitTransaction();
      return this.findById(savedNsb.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateNsb(id: string, updateDto: UpdateNsbDto, userId: string): Promise<Nsb> {
    const nsb = await this.nsbRepository.findOne({ where: { id } });

    if (!nsb) {
      throw new NotFoundException(`NSB with ID ${id} not found`);
    }

    Object.assign(nsb, {
      ...updateDto,
      updatedBy: userId,
      updatedAt: new Date(),
    });

    if (updateDto.contacts) {
      await this.contactRepository.delete({ nsbId: id });
      const contacts = updateDto.contacts.map((contact) =>
        this.contactRepository.create({
          ...contact,
          nsbId: id,
        }),
      );
      await this.contactRepository.save(contacts);
    }

    if (updateDto.locations) {
      await this.locationRepository.delete({ nsbId: id });
      const locations = updateDto.locations.map((location) =>
        this.locationRepository.create({
          ...location,
          nsbId: id,
        }),
      );
      await this.locationRepository.save(locations);
    }

    return this.nsbRepository.save(nsb);
  }

  async findById(id: string): Promise<Nsb> {
    const nsb = await this.nsbRepository.findOne({
      where: { id },
      relations: ['contacts', 'locations', 'documents', 'country', 'country.region', 'country.recMemberships', 'country.recMemberships.rec'],
    });

    if (!nsb) {
      throw new NotFoundException(`NSB with ID ${id} not found`);
    }

    return nsb;
  }

  async findAll(filter: any = {}): Promise<{ data: Nsb[]; total: number }> {
    const query = this.nsbRepository
      .createQueryBuilder('nsb')
      .leftJoinAndSelect('nsb.contacts', 'contacts')
      .leftJoinAndSelect('nsb.locations', 'locations')
      .leftJoinAndSelect('nsb.country', 'country')
      .leftJoinAndSelect('country.region', 'region')
      .leftJoinAndSelect('country.recMemberships', 'recMemberships')
      .leftJoinAndSelect('recMemberships.rec', 'rec')
      .where('nsb.status = :status', { status: NsbStatus.ACTIVE });

    if (filter.countryId) {
      query.andWhere('nsb.countryId = :countryId', { countryId: filter.countryId });
    }

    if (filter.regionId) {
      query.andWhere('country.regionId = :regionId', { regionId: filter.regionId });
    }

    if (filter.search) {
      query.andWhere('(nsb.name ILIKE :search OR nsb.shortName ILIKE :search)', {
        search: `%${filter.search}%`,
      });
    }

    const [data, total] = await query.skip(filter.skip).take(filter.limit).getManyAndCount();
    return { data, total };
  }

  async findByUser(user: SystemUser): Promise<Nsb | null> {
    // First try to find by organizationId
    if (user.organizationId) {
      const nsb = await this.nsbRepository.findOne({
        where: { id: user.organizationId, status: NsbStatus.ACTIVE },
        relations: ['contacts', 'locations', 'documents', 'country', 'country.region', 'country.recMemberships', 'country.recMemberships.rec'],
      });
      if (nsb) {
        return nsb;
      }
    }

    // Fall back to finding by countryId
    if (user.countryId) {
      const nsb = await this.nsbRepository.findOne({
        where: { countryId: user.countryId, status: NsbStatus.ACTIVE },
        relations: ['contacts', 'locations', 'documents', 'country', 'country.region', 'country.recMemberships', 'country.recMemberships.rec'],
      });
      if (nsb) {
        return nsb;
      }
    }

    return null;
  }
}

