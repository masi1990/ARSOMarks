import { Country } from './country.entity';
export declare class Region {
    id: string;
    code: string;
    name: string;
    description?: string;
    createdAt: Date;
    countries?: Country[];
}
