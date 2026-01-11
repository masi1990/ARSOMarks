import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SystemUser } from '../../system-user/system-user.entity';
import { UserRole } from '../../../shared/enums';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto } from '../dtos';
import { EmailService } from './email.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    private emailService;
    private readonly logger;
    constructor(userRepository: Repository<SystemUser>, jwtService: JwtService, configService: ConfigService, emailService: EmailService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: Partial<SystemUser>;
        accessToken: string;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    getRoles(): Array<{
        code: UserRole;
        name: string;
        description: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<Partial<SystemUser> | null>;
    private generateToken;
    findById(id: string): Promise<SystemUser | null>;
}
