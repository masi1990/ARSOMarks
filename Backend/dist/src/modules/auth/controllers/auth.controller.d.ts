import { Repository } from 'typeorm';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class AuthController {
    private authService;
    private readonly userRepository;
    constructor(authService: AuthService, userRepository: Repository<SystemUser>);
    register(registerDto: RegisterDto): Promise<{
        message: string;
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
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    getRoles(): Promise<{
        code: import("../../../shared/enums").UserRole;
        name: string;
        description: string;
    }[]>;
    getProfile(user: SystemUser): Promise<{
        id: string;
        email: string;
        fullName: string;
        role?: import("../../../shared/enums").UserRole;
        roles: import("../../../shared/enums").UserRole[];
        isActive: boolean;
        emailVerified: boolean;
        emailVerificationToken?: string;
        lastLogin?: Date;
        failedLoginAttempts: number;
        lockedUntil?: Date;
        phone?: string;
        organizationId?: string;
        organizationType?: string;
        countryId?: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
