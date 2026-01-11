import { NsbService } from '../services/nsb.service';
import { CreateNsbDto, UpdateNsbDto } from '../dtos';
export declare class NsbController {
    private readonly nsbService;
    constructor(nsbService: NsbService);
    create(dto: CreateNsbDto): Promise<import("../entities/nsb.entity").Nsb>;
    list(query: any): Promise<{
        data: import("../entities/nsb.entity").Nsb[];
        total: number;
    }>;
    getById(id: string): Promise<import("../entities/nsb.entity").Nsb>;
    update(id: string, dto: UpdateNsbDto): Promise<import("../entities/nsb.entity").Nsb>;
}
