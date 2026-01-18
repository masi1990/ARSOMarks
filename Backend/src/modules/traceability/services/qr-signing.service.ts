import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class QrSigningService {
  private readonly secret: string;
  private readonly publicBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('QR_SIGNING_SECRET') || 'qr-signing-secret';
    this.publicBaseUrl = this.configService.get<string>('PUBLIC_PORTAL_BASE_URL') || 'https://portal.local';
  }

  signPayload(payload: Record<string, any>): { token: string; signature: string } {
    const payloadJson = JSON.stringify(payload);
    const payloadB64 = Buffer.from(payloadJson).toString('base64url');
    const signature = crypto.createHmac('sha256', this.secret).update(payloadB64).digest('base64url');
    const token = `${payloadB64}.${signature}`;
    return { token, signature };
  }

  verify(token: string): Record<string, any> | null {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;
    const expected = crypto.createHmac('sha256', this.secret).update(payloadB64).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return null;
    }
    try {
      const json = Buffer.from(payloadB64, 'base64url').toString('utf8');
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  buildPublicUrl(token: string): string {
    const base = this.publicBaseUrl.replace(/\/$/, '');
    return `${base}/verify?token=${encodeURIComponent(token)}`;
  }
}

