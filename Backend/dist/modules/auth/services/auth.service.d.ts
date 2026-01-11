import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SystemUser } from '../../system-user/system-user.entity';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from '../dtos';
import { EmailService } from './email.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    private emailService;
    private readonly logger;
    constructor(userRepository: Repository<SystemUser>, jwtService: JwtService, configService: ConfigService, emailService: EmailService);
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
    validateUser(email: string, password: string): Promise<Partial<SystemUser> | null>;
    private generateToken;
    findById(id: string): Promise<SystemUser | null>;
}
