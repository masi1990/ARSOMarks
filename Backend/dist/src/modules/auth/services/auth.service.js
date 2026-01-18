"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const system_user_entity_1 = require("../../system-user/system-user.entity");
const enums_1 = require("../../../shared/enums");
const email_service_1 = require("./email.service");
const crypto_1 = require("crypto");
let AuthService = AuthService_1 = class AuthService {
    constructor(userRepository, jwtService, configService, emailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailService = emailService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);
        const role = enums_1.UserRole.PUBLIC;
        const roles = [enums_1.UserRole.PUBLIC, enums_1.UserRole.OPERATOR];
        const emailVerificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
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
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:4200');
        const verifyUrl = `${frontendUrl}/auth/verify-email?token=${emailVerificationToken}`;
        try {
            await this.emailService.sendVerificationEmail(user.email, user.fullName, verifyUrl);
        }
        catch (error) {
            this.logger.warn(`Failed to send verification email: ${error.message}`);
        }
        return { message: 'Registration successful. Please verify your email to activate your account.' };
    }
    async login(loginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.lockedUntil && user.lockedUntil > new Date()) {
            throw new common_1.UnauthorizedException('Account is temporarily locked. Please try again later.');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is inactive. Please contact administrator.');
        }
        if (!user.emailVerified) {
            throw new common_1.UnauthorizedException('Email not verified. Please check your email for the verification link.');
        }
        if (!user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
            if (user.failedLoginAttempts >= 5) {
                const lockUntil = new Date();
                lockUntil.setMinutes(lockUntil.getMinutes() + 30);
                user.lockedUntil = lockUntil;
                user.failedLoginAttempts = 0;
                await this.userRepository.save(user);
                throw new common_1.UnauthorizedException('Too many failed login attempts. Account locked for 30 minutes.');
            }
            await this.userRepository.save(user);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        user.failedLoginAttempts = 0;
        user.lockedUntil = null;
        user.lastLogin = new Date();
        await this.userRepository.save(user);
        const accessToken = this.generateToken(user);
        const { passwordHash: _, passwordResetToken: __, passwordResetExpires: ___ } = user, userWithoutSensitive = __rest(user, ["passwordHash", "passwordResetToken", "passwordResetExpires"]);
        return {
            user: userWithoutSensitive,
            accessToken,
        };
    }
    async verifyEmail(dto) {
        const user = await this.userRepository.findOne({
            where: { emailVerificationToken: dto.token },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid verification token');
        }
        user.emailVerified = true;
        user.emailVerificationToken = null;
        await this.userRepository.save(user);
        return { message: 'Email verified successfully. You can now log in.' };
    }
    getRoles() {
        const roleDescriptions = {
            [enums_1.UserRole.SUPER_ADMIN]: 'Platform super admin with full oversight (ARSO Council delegate)',
            [enums_1.UserRole.ARSO_COUNCIL]: 'ARSO Council governance and strategic decisions',
            [enums_1.UserRole.CACO_MEMBER]: 'Conformity Assessment Committee (CACO) reviewer/approver',
            [enums_1.UserRole.ARSO_SECRETARIAT]: 'ARSO Central Secretariat operations and coordination',
            [enums_1.UserRole.ADVISORY_COMMITTEE]: 'Advisory Committee expert guidance',
            [enums_1.UserRole.SMC_MEMBER]: 'Standards Management Committee member',
            [enums_1.UserRole.NSB_ADMIN]: 'National Standards Body administrator',
            [enums_1.UserRole.NSB_USER]: 'National Standards Body staff user',
            [enums_1.UserRole.CB_ADMIN]: 'Certification Body administrator (ACAP licensed)',
            [enums_1.UserRole.CB_USER]: 'Certification Body user (ACAP licensed)',
            [enums_1.UserRole.OPERATOR]: 'Operator / applicant organization user',
            [enums_1.UserRole.ACCREDITATION_BODY]: 'Accreditation Body liaison',
            [enums_1.UserRole.PUBLIC]: 'Public / read-only access',
        };
        return Object.values(enums_1.UserRole).map((code) => {
            var _a;
            return ({
                code,
                name: code.replace(/_/g, ' ').toUpperCase(),
                description: (_a = roleDescriptions[code]) !== null && _a !== void 0 ? _a : '',
            });
        });
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.userRepository.findOne({
            where: { email: forgotPasswordDto.email },
        });
        if (!user) {
            return { message: 'If an account exists with this email, a password reset link has been sent.' };
        }
        const resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const resetExpires = new Date();
        resetExpires.setHours(resetExpires.getHours() + 1);
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = resetExpires;
        await this.userRepository.save(user);
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:4200');
        const resetUrl = `${frontendUrl}/auth/reset-password?token=${resetToken}`;
        try {
            await this.emailService.sendPasswordResetEmail(user.email, resetToken, resetUrl);
        }
        catch (error) {
            this.logger.error(`Failed to send password reset email: ${error.message}`);
            throw new common_1.BadRequestException('Failed to send password reset email. Please try again later.');
        }
        return { message: 'If an account exists with this email, a password reset link has been sent.' };
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.userRepository.findOne({
            where: { passwordResetToken: resetPasswordDto.token },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
            throw new common_1.BadRequestException('Reset token has expired. Please request a new one.');
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(resetPasswordDto.newPassword, saltRounds);
        user.passwordHash = passwordHash;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        user.failedLoginAttempts = 0;
        user.lockedUntil = null;
        await this.userRepository.save(user);
        return { message: 'Password has been reset successfully. You can now log in with your new password.' };
    }
    async validateUser(email, password) {
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
        const { passwordHash: _, passwordResetToken: __, passwordResetExpires: ___ } = user, userWithoutSensitive = __rest(user, ["passwordHash", "passwordResetToken", "passwordResetExpires"]);
        return userWithoutSensitive;
    }
    generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            roles: Array.isArray(user.roles) ? user.roles : [],
            fullName: user.fullName,
        };
        return this.jwtService.sign(payload);
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            if (user.role && (!user.roles || user.roles.length === 0)) {
                user.roles = [user.role];
                this.userRepository.save(user).catch(err => {
                    this.logger.warn(`Failed to sync roles for user ${id}: ${err.message}`);
                });
            }
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(system_user_entity_1.SystemUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map