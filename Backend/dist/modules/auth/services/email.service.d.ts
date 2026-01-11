import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    sendPasswordResetEmail(email: string, resetToken: string, resetUrl: string): Promise<void>;
    sendWelcomeEmail(email: string, fullName: string): Promise<void>;
}
