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
exports.QrToken = void 0;
const typeorm_1 = require("typeorm");
const coc_entity_1 = require("./coc.entity");
let QrToken = class QrToken {
};
exports.QrToken = QrToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QrToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coc_id', type: 'uuid' }),
    __metadata("design:type", String)
], QrToken.prototype, "cocId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coc_entity_1.Coc, (coc) => coc.tokens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'coc_id' }),
    __metadata("design:type", coc_entity_1.Coc)
], QrToken.prototype, "coc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token', type: 'text' }),
    __metadata("design:type", String)
], QrToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], QrToken.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_used_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], QrToken.prototype, "lastUsedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], QrToken.prototype, "createdAt", void 0);
exports.QrToken = QrToken = __decorate([
    (0, typeorm_1.Entity)('qr_tokens')
], QrToken);
//# sourceMappingURL=qr-token.entity.js.map