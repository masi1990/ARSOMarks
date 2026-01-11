import { DataSource, Repository } from 'typeorm';
import { Nsb } from '../entities/nsb.entity';
import { NsbContact } from '../entities/nsb-contact.entity';
import { NsbLocation } from '../entities/nsb-location.entity';
import { CreateNsbDto, UpdateNsbDto } from '../dtos';
export declare class NsbService {
    private readonly nsbRepository;
    private readonly contactRepository;
    private readonly locationRepository;
    private readonly dataSource;
    constructor(nsbRepository: Repository<Nsb>, contactRepository: Repository<NsbContact>, locationRepository: Repository<NsbLocation>, dataSource: DataSource);
    createNsb(createDto: CreateNsbDto, userId: string): Promise<Nsb>;
    updateNsb(id: string, updateDto: UpdateNsbDto, userId: string): Promise<Nsb>;
    findById(id: string): Promise<Nsb>;
    findAll(filter?: any): Promise<{
        data: Nsb[];
        total: number;
    }>;
}
