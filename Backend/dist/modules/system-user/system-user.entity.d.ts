import { UserRole } from '../../shared/enums';
export declare class SystemUser {
    id: string;
    email: string;
    fullName: string;
    role?: UserRole;
    isActive: boolean;
    passwordHash?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    emailVerified: boolean;
    emailVerificationToken?: string;
    lastLogin?: Date;
    failedLoginAttempts: number;
    lockedUntil?: Date;
    phone?: string;
    organizationId?: string;
    organizationType?: string;
    createdAt: Date;
    updatedAt: Date;
}
