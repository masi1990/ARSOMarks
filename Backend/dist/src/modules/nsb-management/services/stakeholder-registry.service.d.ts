import { DataSource, Repository } from 'typeorm';
import { Nsb } from '../entities/nsb.entity';
import { NsbMarketSurveillanceAuthority } from '../entities/nsb-market-surveillance-authority.entity';
import { NsbCustomsBorderAgency } from '../entities/nsb-customs-border-agency.entity';
import { NsbRegulatoryAgency } from '../entities/nsb-regulatory-agency.entity';
import { NsbIndustryAssociation } from '../entities/nsb-industry-association.entity';
import { NsbTestingLaboratory } from '../entities/nsb-testing-laboratory.entity';
import { StakeholderRegistryDto } from '../dtos';
export declare class StakeholderRegistryService {
    private readonly nsbRepository;
    private readonly msaRepository;
    private readonly customsRepository;
    private readonly regulatoryRepository;
    private readonly industryRepository;
    private readonly laboratoryRepository;
    private readonly dataSource;
    constructor(nsbRepository: Repository<Nsb>, msaRepository: Repository<NsbMarketSurveillanceAuthority>, customsRepository: Repository<NsbCustomsBorderAgency>, regulatoryRepository: Repository<NsbRegulatoryAgency>, industryRepository: Repository<NsbIndustryAssociation>, laboratoryRepository: Repository<NsbTestingLaboratory>, dataSource: DataSource);
    getStakeholderRegistry(nsbId: string): Promise<StakeholderRegistryDto>;
    updateStakeholderRegistry(nsbId: string, dto: StakeholderRegistryDto): Promise<StakeholderRegistryDto>;
}
