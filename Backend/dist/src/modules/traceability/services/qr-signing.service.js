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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrSigningService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let QrSigningService = class QrSigningService {
    constructor(configService) {
        this.configService = configService;
        this.secret = this.configService.get('QR_SIGNING_SECRET') || 'qr-signing-secret';
        this.publicBaseUrl = this.configService.get('PUBLIC_PORTAL_BASE_URL') || 'https://portal.local';
    }
    signPayload(payload) {
        const payloadJson = JSON.stringify(payload);
        const payloadB64 = Buffer.from(payloadJson).toString('base64url');
        const signature = crypto.createHmac('sha256', this.secret).update(payloadB64).digest('base64url');
        const token = `${payloadB64}.${signature}`;
        return { token, signature };
    }
    verify(token) {
        const [payloadB64, signature] = token.split('.');
        if (!payloadB64 || !signature)
            return null;
        const expected = crypto.createHmac('sha256', this.secret).update(payloadB64).digest('base64url');
        if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
            return null;
        }
        try {
            const json = Buffer.from(payloadB64, 'base64url').toString('utf8');
            return JSON.parse(json);
        }
        catch (_a) {
            return null;
        }
    }
    buildPublicUrl(token) {
        const base = this.publicBaseUrl.replace(/\/$/, '');
        return `${base}/verify?token=${encodeURIComponent(token)}`;
    }
};
exports.QrSigningService = QrSigningService;
exports.QrSigningService = QrSigningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], QrSigningService);
//# sourceMappingURL=qr-signing.service.js.map