import { DataSource, Repository } from 'typeorm';
import { Nsb } from '../entities/nsb.entity';
import { NsbContact } from '../entities/nsb-contact.entity';
import { NsbLocation } from '../entities/nsb-location.entity';
import { NsbDocument } from '../entities/nsb-document.entity';
import { CreateNsbDto, UpdateNsbDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class NsbService {
    private readonly nsbRepository;
    private readonly contactRepository;
    private readonly locationRepository;
    private readonly documentRepository;
    private readonly dataSource;
    constructor(nsbRepository: Repository<Nsb>, contactRepository: Repository<NsbContact>, locationRepository: Repository<NsbLocation>, documentRepository: Repository<NsbDocument>, dataSource: DataSource);
    createNsb(createDto: CreateNsbDto, userId: string): Promise<Nsb>;
    updateNsb(id: string, updateDto: UpdateNsbDto, userId: string): Promise<Nsb>;
    findById(id: string): Promise<Nsb>;
    findAll(filter?: any): Promise<{
        data: Nsb[];
        total: number;
    }>;
    findByUser(user: SystemUser): Promise<Nsb | null>;
}
