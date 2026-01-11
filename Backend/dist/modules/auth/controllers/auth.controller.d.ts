import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: Partial<SystemUser>;
        accessToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: Partial<SystemUser>;
        accessToken: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(user: SystemUser): Promise<{
        id: string;
        email: string;
        fullName: string;
        role?: import("../../../shared/enums").UserRole;
        isActive: boolean;
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
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
