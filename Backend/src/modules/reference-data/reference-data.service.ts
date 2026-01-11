import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { Region } from './entities/region.entity';
import { RegionalEconomicCommunity } from './entities/regional-economic-community.entity';
import { CountryRecMembership } from './entities/country-rec-membership.entity';
import { AcapScheme } from './entities/acap-scheme.entity';
import { AccreditationBody } from './entities/accreditation-body.entity';
import {
  CreateCountryDto,
  CreateRecDto,
  CreateRegionDto,
  UpdateCountryDto,
  UpdateRecDto,
  UpdateRegionDto,
} from './dtos';
import { MembershipStatus } from '../../shared/enums';

type CountryWithMemberships = Country & { recMemberships?: CountryRecMembership[] };

@Injectable()
export class ReferenceDataService {
  constructor(
    @InjectRepository(Country) private readonly countryRepo: Repository<Country>,
    @InjectRepository(Region) private readonly regionRepo: Repository<Region>,
    @InjectRepository(RegionalEconomicCommunity)
    private readonly recRepo: Repository<RegionalEconomicCommunity>,
    @InjectRepository(CountryRecMembership)
    private readonly membershipRepo: Repository<CountryRecMembership>,
    @InjectRepository(AcapScheme) private readonly acapRepo: Repository<AcapScheme>,
    @InjectRepository(AccreditationBody)
    private readonly accreditationRepo: Repository<AccreditationBody>,
  ) {}

  private mapCountryResponse(country: CountryWithMemberships) {
    const recIds = country?.recMemberships?.map((m) => m.recId) ?? [];
    const { recMemberships, ...rest } = country;
    return { ...rest, recIds };
  }

  async getCountries() {
    const countries = await this.countryRepo.find({
      relations: ['recMemberships'],
      order: { name: 'ASC' },
    });
    return countries.map((country) => this.mapCountryResponse(country));
  }

  async getCountry(id: string) {
    const country = await this.countryRepo.findOne({
      where: { id },
      relations: ['recMemberships'],
    });
    if (!country) throw new NotFoundException('Country not found');
    return this.mapCountryResponse(country);
  }

  async createCountry(dto: CreateCountryDto) {
    return this.countryRepo.manager.transaction(async (manager) => {
      const country = manager.create(Country, {
        isoCode: dto.isoCode,
        name: dto.name,
        regionId: dto.regionId,
        continent: dto.continent,
      });

      const saved = await manager.save(country);

      if (dto.recIds?.length) {
        const memberships = dto.recIds.map((recId) =>
          manager.create(CountryRecMembership, {
            countryId: saved.id,
            recId,
            membershipStatus: MembershipStatus.MEMBER,
          }),
        );
        await manager.save(memberships);
        saved.recMemberships = memberships;
      } else {
        saved.recMemberships = [];
      }

      return this.mapCountryResponse(saved);
    });
  }

  async updateCountry(id: string, dto: UpdateCountryDto) {
    return this.countryRepo.manager.transaction(async (manager) => {
      const country = await manager.findOne(Country, { where: { id } });
      if (!country) throw new NotFoundException('Country not found');

      country.isoCode = dto.isoCode ?? country.isoCode;
      country.name = dto.name ?? country.name;
      country.regionId = dto.regionId ?? country.regionId;
      country.continent = dto.continent ?? country.continent;

      const updated = await manager.save(country);

      if (dto.recIds) {
        await manager.delete(CountryRecMembership, { countryId: id });
        if (dto.recIds.length) {
          const memberships = dto.recIds.map((recId) =>
            manager.create(CountryRecMembership, {
              countryId: id,
              recId,
              membershipStatus: MembershipStatus.MEMBER,
            }),
          );
          await manager.save(memberships);
        }
      }

      const withMemberships = await manager.findOne(Country, { where: { id }, relations: ['recMemberships'] });
      return this.mapCountryResponse(withMemberships || updated);
    });
  }

  async deleteCountry(id: string) {
    const result = await this.countryRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Country not found');
    return { success: true };
  }

  getRegions() {
    return this.regionRepo.find({ order: { name: 'ASC' } });
  }

  async getRegion(id: string) {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) throw new NotFoundException('Region not found');
    return region;
  }

  createRegion(dto: CreateRegionDto) {
    const region = this.regionRepo.create(dto);
    return this.regionRepo.save(region);
  }

  async updateRegion(id: string, dto: UpdateRegionDto) {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) throw new NotFoundException('Region not found');
    Object.assign(region, dto);
    return this.regionRepo.save(region);
  }

  async deleteRegion(id: string) {
    const result = await this.regionRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Region not found');
    return { success: true };
  }

  async getRegionsByCountry(countryId: string) {
    const country = await this.countryRepo.findOne({ where: { id: countryId }, relations: ['region'] });
    return country?.region ? [country.region] : [];
  }

  getRecs() {
    return this.recRepo.find({ order: { name: 'ASC' } });
  }

  async getRec(id: string) {
    const rec = await this.recRepo.findOne({ where: { id } });
    if (!rec) throw new NotFoundException('REC not found');
    return rec;
  }

  createRec(dto: CreateRecDto) {
    const rec = this.recRepo.create(dto);
    return this.recRepo.save(rec);
  }

  async updateRec(id: string, dto: UpdateRecDto) {
    const rec = await this.recRepo.findOne({ where: { id } });
    if (!rec) throw new NotFoundException('REC not found');
    Object.assign(rec, dto);
    return this.recRepo.save(rec);
  }

  async deleteRec(id: string) {
    const result = await this.recRepo.delete(id);
    if (!result.affected) throw new NotFoundException('REC not found');
    return { success: true };
  }

  getCountryRecMemberships(countryId: string) {
    return this.membershipRepo.find({
      where: { countryId },
      relations: ['rec'],
    });
  }

  getAcapSchemes() {
    return this.acapRepo.find({ where: { isActive: true } });
  }

  getAccreditationBodies() {
    return this.accreditationRepo.find({ where: { isActive: true } });
  }
}

