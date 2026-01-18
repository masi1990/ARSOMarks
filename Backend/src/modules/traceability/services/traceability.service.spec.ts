import { ConfigService } from '@nestjs/config';
import { CocGeneratorService } from './coc-generator.service';
import { QrSigningService } from './qr-signing.service';

describe('Traceability utilities', () => {
  const generator = new CocGeneratorService();
  const config = new ConfigService({ QR_SIGNING_SECRET: 'test-secret', PUBLIC_PORTAL_BASE_URL: 'https://portal.test' });
  const signer = new QrSigningService(config);

  it('generates COC numbers with checksum', () => {
    const { cocNumber, checksum } = generator.generateNumber();
    expect(cocNumber).toContain('COC-');
    expect(checksum.length).toBe(2);
  });

  it('signs and verifies payloads', () => {
    const payload = { cocNumber: 'COC-2024-000001-01', exp: Date.now() + 1000 };
    const { token } = signer.signPayload(payload);
    const verified = signer.verify(token);
    expect(verified?.cocNumber).toBe(payload.cocNumber);
  });

  it('builds public verification URLs', () => {
    const url = signer.buildPublicUrl('abc123');
    expect(url).toContain('https://portal.test/verify?token=');
  });
});

