export declare class AcapScheme {
    id: string;
    code: string;
    name: string;
    description?: string;
    category?: string;
    applicableStandards?: Record<string, any>;
    requirements?: Record<string, any>;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
