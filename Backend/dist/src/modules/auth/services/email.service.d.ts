import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    sendPasswordResetEmail(email: string, resetToken: string, resetUrl: string): Promise<void>;
    sendWelcomeEmail(email: string, fullName: string): Promise<void>;
    sendVerificationEmail(email: string, fullName: string, verifyUrl: string): Promise<void>;
    sendRoleRequestSubmitted(email: string, fullName: string, roles: string[]): Promise<void>;
    sendRoleRequestDecision(email: string, fullName: string, roles: string[], status: string, note?: string): Promise<void>;
    sendRoleAssignmentNotification(email: string, fullName: string, roles: string[], note?: string): Promise<void>;
    sendNsbRegistrationRequestSubmitted(email: string, fullName: string, nsbName: string, countryName: string): Promise<void>;
    sendNsbRegistrationRequestApproved(email: string, fullName: string, nsbName: string, countryName: string, profileSetupUrl: string): Promise<void>;
    sendNsbRegistrationRequestRejected(email: string, fullName: string, nsbName: string, countryName: string, remarks?: string): Promise<void>;
    sendNsbRegistrationRequestStatusChanged(email: string, fullName: string, nsbName: string, countryName: string, oldStatus: string, newStatus: string, comments?: string): Promise<void>;
}
