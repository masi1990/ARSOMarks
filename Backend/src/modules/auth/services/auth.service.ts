import { Injectable, UnauthorizedException, BadRequestException, ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SystemUser } from '../../system-user/system-user.entity';
import { UserRole } from '../../../shared/enums';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto } from '../dtos';
import { EmailService } from './email.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(SystemUser)
    private userRepository: Repository<SystemUser>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

    // Public-first hybrid: always start with Public + Operator
    const role = UserRole.PUBLIC;
    const roles = [UserRole.PUBLIC, UserRole.OPERATOR];

    // Generate email verification token
    const emailVerificationToken = randomBytes(32).toString('hex');

    // Create user
    const user = this.userRepository.create({
      email: registerDto.email,
      fullName: registerDto.fullName,
      passwordHash,
      role,
      phone: registerDto.phone,
      organizationId: registerDto.organizationId,
      organizationType: registerDto.organizationType,
      countryId: registerDto.countryId,
      emailVerified: false,
      emailVerificationToken,
      isActive: true,
      roles,
    });

    await this.userRepository.save(user);

    // Send verification email
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:4200');
    const verifyUrl = `${frontendUrl}/auth/verify-email?token=${emailVerificationToken}`;
    try {
      await this.emailService.sendVerificationEmail(user.email, user.fullName, verifyUrl);
    } catch (error) {
      this.logger.warn(`Failed to send verification email: ${error.message}`);
    }

    return { message: 'Registration successful. Please verify your email to activate your account.' };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<SystemUser>; accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account is temporarily locked. Please try again later.');
    }

    // Check if account is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive. Please contact administrator.');
    }

    // Require email verification
    if (!user.emailVerified) {
      throw new UnauthorizedException('Email not verified. Please check your email for the verification link.');
    }

    // Verify password
    if (!user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      // Increment failed login attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

      // Lock account after 5 failed attempts for 30 minutes
      if (user.failedLoginAttempts >= 5) {
        const lockUntil = new Date();
        lockUntil.setMinutes(lockUntil.getMinutes() + 30);
        user.lockedUntil = lockUntil;
        user.failedLoginAttempts = 0;
        await this.userRepository.save(user);
        throw new UnauthorizedException('Too many failed login attempts. Account locked for 30 minutes.');
      }

      await this.userRepository.save(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    user.lastLogin = new Date();
    await this.userRepository.save(user);

    // Generate JWT token
    const accessToken = this.generateToken(user);

    // Return user without sensitive data
    const { passwordHash: _, passwordResetToken: __, passwordResetExpires: ___, ...userWithoutSensitive } = user;

    return {
      user: userWithoutSensitive,
      accessToken,
    };
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: dto.token },
    });

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    await this.userRepository.save(user);

    return { message: 'Email verified successfully. You can now log in.' };
  }

  getRoles(): Array<{ code: UserRole; name: string; description: string }> {
    const roleDescriptions: Record<UserRole, string> = {
      [UserRole.SUPER_ADMIN]: 'Platform super admin with full oversight (ARSO Council delegate)',
      [UserRole.ARSO_COUNCIL]: 'ARSO Council governance and strategic decisions',
      [UserRole.CACO_MEMBER]: 'Conformity Assessment Committee (CACO) reviewer/approver',
      [UserRole.ARSO_SECRETARIAT]: 'ARSO Central Secretariat operations and coordination',
      [UserRole.ADVISORY_COMMITTEE]: 'Advisory Committee expert guidance',
      [UserRole.SMC_MEMBER]: 'Standards Management Committee member',
      [UserRole.NSB_ADMIN]: 'National Standards Body administrator',
      [UserRole.NSB_USER]: 'National Standards Body staff user',
      [UserRole.CB_ADMIN]: 'Certification Body administrator (ACAP licensed)',
      [UserRole.CB_USER]: 'Certification Body user (ACAP licensed)',
      [UserRole.OPERATOR]: 'Operator / applicant organization user',
      [UserRole.ACCREDITATION_BODY]: 'Accreditation Body liaison',
      [UserRole.PUBLIC]: 'Public / read-only access',
    };

    return Object.values(UserRole).map((code) => ({
      code,
      name: code.replace(/_/g, ' ').toUpperCase(),
      description: roleDescriptions[code] ?? '',
    }));
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (!user) {
      // Don't reveal if user exists for security
      return { message: 'If an account exists with this email, a password reset link has been sent.' };
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // Token expires in 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await this.userRepository.save(user);

    // Send reset email
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:4200');
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${resetToken}`;

    try {
      await this.emailService.sendPasswordResetEmail(user.email, resetToken, resetUrl);
    } catch (error) {
      this.logger.error(`Failed to send password reset email: ${error.message}`);
      throw new BadRequestException('Failed to send password reset email. Please try again later.');
    }

    return { message: 'If an account exists with this email, a password reset link has been sent.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { passwordResetToken: resetPasswordDto.token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Check if token has expired
    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException('Reset token has expired. Please request a new one.');
    }

    // Hash new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(resetPasswordDto.newPassword, saltRounds);

    // Update user
    user.passwordHash = passwordHash;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    await this.userRepository.save(user);

    return { message: 'Password has been reset successfully. You can now log in with your new password.' };
  }

  async validateUser(email: string, password: string): Promise<Partial<SystemUser> | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    const { passwordHash: _, passwordResetToken: __, passwordResetExpires: ___, ...userWithoutSensitive } = user;
    return userWithoutSensitive;
  }

  private generateToken(user: SystemUser): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      roles: Array.isArray(user.roles) ? user.roles : [],
      fullName: user.fullName,
    };

    return this.jwtService.sign(payload);
  }

  async findById(id: string): Promise<SystemUser | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      // Ensure roles array is synced with role field if roles is empty
      if (user.role && (!user.roles || user.roles.length === 0)) {
        user.roles = [user.role];
        // Save to database for consistency (async, don't await to avoid blocking)
        this.userRepository.save(user).catch(err => {
          this.logger.warn(`Failed to sync roles for user ${id}: ${err.message}`);
        });
      }
    }
    return user;
  }
}

