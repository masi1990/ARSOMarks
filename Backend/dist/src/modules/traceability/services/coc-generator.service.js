"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CocGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let CocGeneratorService = class CocGeneratorService {
    generateNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const seq = now.getTime().toString().slice(-6);
        const base = `COC-${year}-${seq}`;
        const checksum = this.computeChecksum(base);
        return { cocNumber: `${base}-${checksum}`, checksum };
    }
    computeChecksum(input) {
        const hash = crypto.createHash('sha256').update(input).digest();
        const mod = (hash.readUInt16BE(0) + hash.readUInt16BE(2) + hash.readUInt16BE(4)) % 97;
        return mod.toString().padStart(2, '0');
    }
};
exports.CocGeneratorService = CocGeneratorService;
exports.CocGeneratorService = CocGeneratorService = __decorate([
    (0, common_1.Injectable)()
], CocGeneratorService);
//# sourceMappingURL=coc-generator.service.js.map