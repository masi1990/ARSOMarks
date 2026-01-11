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
    async sendVerificationEmail(email, fullName, verifyUrl) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            throw new Error('Email service not configured');
        }
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'Verify your email - ARSO Marks',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Verify your email, ${fullName}</h2>
          <p>Thanks for registering with ARSO Marks. Please verify your email to activate your account.</p>
          <p style="margin: 20px 0;">
            <a href="${verifyUrl}"
               style="background-color: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </p>
          <p>Or copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; color: #7f8c8d;">${verifyUrl}</p>
          <p style="color: #e74c3c; font-size: 12px;">
            <strong>Note:</strong> This link will expire in 24 hours.
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
            this.logger.log(`Verification email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send verification email to ${email}:`, error);
            throw new Error('Failed to send verification email');
        }
    }
    async sendRoleRequestSubmitted(email, fullName, roles) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            return;
        }
        const roleList = roles.join(', ');
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'Role request submitted',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Hi ${fullName},</h2>
          <p>We received your role request for: <strong>${roleList}</strong>.</p>
          <p>We'll review it and notify you once it's approved or rejected.</p>
          <p style="color: #95a5a6; font-size: 12px;">This is an automated message.</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Role request submission email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send role request submission email to ${email}:`, error);
        }
    }
    async sendRoleRequestDecision(email, fullName, roles, status, note) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            return;
        }
        const roleList = roles.join(', ');
        const decisionText = status === 'APPROVED' ? 'approved' : 'rejected';
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: `Your role request has been ${decisionText}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Hi ${fullName},</h2>
          <p>Your request for <strong>${roleList}</strong> has been <strong>${decisionText}</strong>.</p>
          ${note ? `<p><strong>Note:</strong> ${note}</p>` : ''}
          <p style="color: #95a5a6; font-size: 12px;">This is an automated message.</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Role request decision email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send role request decision email to ${email}:`, error);
        }
    }
    async sendRoleAssignmentNotification(email, fullName, roles, note) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            return;
        }
        const roleList = roles.map(role => role.replace(/_/g, ' ')).join(', ');
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:4200');
        const loginUrl = `${frontendUrl}/auth/login`;
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'New Roles Assigned - ARSO Marks',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Hi ${fullName},</h2>
          <p>New roles have been assigned to your ARSO Marks account by an administrator.</p>
          <div style="background-color: #f8f9fa; border-left: 4px solid #27ae60; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px; color: #2c3e50;"><strong>Assigned Roles:</strong></p>
            <p style="margin: 10px 0 0 0; font-size: 18px; color: #27ae60;"><strong>${roleList}</strong></p>
          </div>
          ${note ? `<p style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;"><strong>Note:</strong> ${note}</p>` : ''}
          <p>You can now access additional features based on your assigned roles. Please log in to your account to explore the new capabilities.</p>
          <p style="margin: 20px 0;">
            <a href="${loginUrl}" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Log In to ARSO Marks
            </a>
          </p>
          <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 20px 0;">
          <p style="color: #95a5a6; font-size: 12px;">
            ARSO Marks - African Regional Organisation for Standardisation<br>
            If you did not expect this change, please contact the system administrator.
          </p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Role assignment notification email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send role assignment notification email to ${email}:`, error);
        }
    }
    async sendNsbRegistrationRequestSubmitted(email, fullName, nsbName, countryName) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            return;
        }
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:4200');
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'NSB Registration Request Submitted - ARSO Marks',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">NSB Registration Request Submitted</h2>
          <p>Dear ${fullName},</p>
          <p>Your NSB registration request for <strong>${nsbName}</strong> (${countryName}) has been successfully submitted for review.</p>
          <p>The ARSO Central Secretariat will review your request and notify you once a decision has been made.</p>
          <p style="margin: 20px 0;">
            <a href="${frontendUrl}/nsb-registration/request" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Request Status
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
            this.logger.log(`NSB registration request submitted email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send NSB registration request submitted email to ${email}:`, error);
        }
    }
    async sendNsbRegistrationRequestApproved(email, fullName, nsbName, countryName, profileSetupUrl) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            return;
        }
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'NSB Registration Request Approved - ARSO Marks',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #27ae60;">Congratulations! Your NSB Registration Request Has Been Approved</h2>
          <p>Dear ${fullName},</p>
          <p>We are pleased to inform you that your NSB registration request for <strong>${nsbName}</strong> (${countryName}) has been <strong>approved</strong> by the ARSO Central Secretariat.</p>
          <p>Your NSB account has been created. Please complete your NSB profile setup to activate your portal access.</p>
          <p style="margin: 20px 0;">
            <a href="${profileSetupUrl}" 
               style="background-color: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Complete Profile Setup
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
            this.logger.log(`NSB registration request approved email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send NSB registration request approved email to ${email}:`, error);
        }
    }
    async sendNsbRegistrationRequestRejected(email, fullName, nsbName, countryName, remarks) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            return;
        }
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:4200');
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: 'NSB Registration Request Status Update - ARSO Marks',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e74c3c;">NSB Registration Request Status Update</h2>
          <p>Dear ${fullName},</p>
          <p>We regret to inform you that your NSB registration request for <strong>${nsbName}</strong> (${countryName}) has been <strong>rejected</strong> by the ARSO Central Secretariat.</p>
          ${remarks ? `<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;"><strong>Review Remarks:</strong><p>${remarks}</p></div>` : ''}
          <p>If you have any questions or wish to resubmit your request, please contact the ARSO Central Secretariat.</p>
          <p style="margin: 20px 0;">
            <a href="${frontendUrl}/nsb-registration/request" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Request Details
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
            this.logger.log(`NSB registration request rejected email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send NSB registration request rejected email to ${email}:`, error);
        }
    }
    async sendNsbRegistrationRequestStatusChanged(email, fullName, nsbName, countryName, oldStatus, newStatus, comments) {
        if (!this.transporter) {
            this.logger.error('Email transporter not configured');
            return;
        }
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:4200');
        const statusLabels = {
            DRAFT: 'Draft',
            SUBMITTED: 'Submitted',
            UNDER_REVIEW: 'Under Review',
            APPROVED: 'Approved',
            REJECTED: 'Rejected',
        };
        const oldStatusLabel = statusLabels[oldStatus] || oldStatus;
        const newStatusLabel = statusLabels[newStatus] || newStatus;
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: email,
            subject: `NSB Registration Request Status Changed to ${newStatusLabel} - ARSO Marks`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">NSB Registration Request Status Update</h2>
          <p>Dear ${fullName},</p>
          <p>The status of your NSB registration request for <strong>${nsbName}</strong> (${countryName}) has been updated.</p>
          
          <div style="background-color: #f8f9fa; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;"><strong>Previous Status:</strong> ${oldStatusLabel}</p>
            <p style="margin: 10px 0 0 0; font-size: 16px; color: #2c3e50;"><strong>New Status:</strong> ${newStatusLabel}</p>
          </div>

          ${comments ? `<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;"><strong>Comments:</strong><p style="margin: 10px 0 0 0;">${comments}</p></div>` : ''}

          <p style="margin: 20px 0;">
            <a href="${frontendUrl}/nsb-registration/request" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Request Details
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
            this.logger.log(`NSB registration request status change email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send NSB registration request status change email to ${email}:`, error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map