import { ConfigService } from '@nestjs/config';
export declare class QrSigningService {
    private readonly configService;
    private readonly secret;
    private readonly publicBaseUrl;
    constructor(configService: ConfigService);
    signPayload(payload: Record<string, any>): {
        token: string;
        signature: string;
    };
    verify(token: string): Record<string, any> | null;
    buildPublicUrl(token: string): string;
}
