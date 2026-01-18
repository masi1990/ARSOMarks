import { CocStatus } from '../entities/coc.entity';
export declare class UpdateCocStatusDto {
    cocId: string;
    status: CocStatus;
    reason?: string;
}
