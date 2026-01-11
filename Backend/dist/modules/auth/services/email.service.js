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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        const gmailUser = this.configService.get('GMAIL_USER');
        const gmailAppPassword = this.configService.get('GMAIL_APP_PASSWORD');
        if (!gmailUser || !gmailAppPassword) {
            this.logger.warn('Gmail credentials not configured. Email service will not work.');
            return;
        }
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailAppPassword,
            },
        });
    }
    async sendPasswordResetEmail(email, resetToken, resetUrl) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            throw new Error('Email service not configured');
        }
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'ARSO Marks - Password Reset Request',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Password Reset Request</h2>
          <p>You have requested to reset your password for your ARSO Marks account.</p>
          <p>Click the link below to reset your password:</p>
          <p style="margin: 20px 0;">
            <a href="${resetUrl}" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p>Or copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; color: #7f8c8d;">${resetUrl}</p>
          <p style="color: #e74c3c; font-size: 12px;">
            <strong>Note:</strong> This link will expire in 1 hour. If you did not request this, please ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 20px 0;">
          <p style="color: #95a5a6; font-size: 12px;">
            ARSO Marks - African Regional Organisation for Standardisation
          </p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Password reset email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send password reset email to ${email}:`, error);
            throw new Error('Failed to send password reset email');
        }
    }
    async sendWelcomeEmail(email, fullName) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            throw new Error('Email service not configured');
        }
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'Welcome to ARSO Marks',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Welcome to ARSO Marks, ${fullName}!</h2>
          <p>Your account has been successfully created.</p>
          <p>You can now log in to the ARSO Marks platform and start using the system.</p>
          <p style="margin: 20px 0;">
            <a href="${this.configService.get('FRONTEND_URL', 'http://localhost:4200')}/login" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Log In
            </a>
          </p>
          <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 20px 0;">
          <p style="color: #95a5a6; font-size: 12px;">
            ARSO Marks - African Regional Organisation for Standardisation
          </p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Welcome email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send welcome email to ${email}:`, error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map