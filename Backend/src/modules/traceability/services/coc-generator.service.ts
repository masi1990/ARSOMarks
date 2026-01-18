import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CocGeneratorService {
  generateNumber(): { cocNumber: string; checksum: string } {
    const now = new Date();
    const year = now.getFullYear();
    const seq = now.getTime().toString().slice(-6); // last 6 digits of epoch ms
    const base = `COC-${year}-${seq}`;
    const checksum = this.computeChecksum(base);
    return { cocNumber: `${base}-${checksum}`, checksum };
  }

  private computeChecksum(input: string): string {
    const hash = crypto.createHash('sha256').update(input).digest();
    // Use mod 97 checksum (00-96)
    const mod = (hash.readUInt16BE(0) + hash.readUInt16BE(2) + hash.readUInt16BE(4)) % 97;
    return mod.toString().padStart(2, '0');
  }
}

