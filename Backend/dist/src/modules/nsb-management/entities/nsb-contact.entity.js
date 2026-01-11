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
exports.NsbContact = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("./nsb.entity");
const enums_1 = require("../../../shared/enums");
let NsbContact = class NsbContact {
};
exports.NsbContact = NsbContact;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbContact.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], NsbContact.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, (nsb) => nsb.contacts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], NsbContact.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_type', type: 'enum', enum: enums_1.NsbContactType }),
    __metadata("design:type", String)
], NsbContact.prototype, "contactType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], NsbContact.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], NsbContact.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], NsbContact.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbContact.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbContact.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], NsbContact.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbContact.prototype, "createdAt", void 0);
exports.NsbContact = NsbContact = __decorate([
    (0, typeorm_1.Entity)('nsb_contacts')
], NsbContact);
//# sourceMappingURL=nsb-contact.entity.js.map