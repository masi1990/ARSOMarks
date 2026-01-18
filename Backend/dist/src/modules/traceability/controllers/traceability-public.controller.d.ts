import { TraceabilityService } from '../services/traceability.service';
export declare class TraceabilityPublicController {
    private readonly traceabilityService;
    constructor(traceabilityService: TraceabilityService);
    listProducts(search?: string, category?: string, country?: string, standard?: string, skip?: string, limit?: string, req?: any): Promise<{
        id: string;
        cocNumber: string;
        productName: string;
        brand: string;
        countryOfOrigin: string;
        originCountryName: string;
        standards: string[];
        issueDate: string;
        expiryDate: string;
        category: import("../../../shared/enums").ProductCategory;
        applicationId: string;
        qrUrl: string;
    }[]>;
    productDetail(id: string): Promise<{
        id: string;
        cocNumber: string;
        productName: string;
        brand: string;
        countryOfOrigin: string;
        originCountryName: string;
        standards: string[];
        issueDate: string;
        expiryDate: string;
        category: import("../../../shared/enums").ProductCategory;
        applicationId: string;
        qrUrl: string;
    }>;
    verify(token: string, req: any): Promise<{
        valid: boolean;
        status: string;
        cocNumber?: undefined;
        product?: undefined;
        applicationId?: undefined;
        expiresAt?: undefined;
        standards?: undefined;
        publicUrl?: undefined;
    } | {
        valid: boolean;
        status: import("../entities/coc.entity").CocStatus;
        cocNumber: string;
        product: {
            id: string;
            name: string;
            brand: string;
            originCountry: import("../../reference-data/entities/country.entity").Country;
        };
        applicationId: string;
        expiresAt: Date;
        standards: import("../entities/standard.entity").Standard[];
        publicUrl: string;
    }>;
    private getIp;
    private parseNumber;
}
