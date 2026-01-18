export declare class SearchLog {
    id: string;
    query?: string;
    filters?: Record<string, any>;
    ip?: string;
    country?: string;
    city?: string;
    lat?: number;
    lon?: number;
    createdAt: Date;
}
