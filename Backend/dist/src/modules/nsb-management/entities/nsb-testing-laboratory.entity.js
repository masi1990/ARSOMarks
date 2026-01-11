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
exports.NsbTestingLaboratory = void 0;
const typeorm_1 = require("typeorm");
const nsb_entity_1 = require("./nsb.entity");
const enums_1 = require("../../../shared/enums");
let NsbTestingLaboratory = class NsbTestingLaboratory {
};
exports.NsbTestingLaboratory = NsbTestingLaboratory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nsb_id' }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "nsbId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nsb_entity_1.Nsb, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'nsb_id' }),
    __metadata("design:type", nsb_entity_1.Nsb)
], NsbTestingLaboratory.prototype, "nsb", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accreditation_status', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "accreditationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_accreditation_description', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "otherAccreditationDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scope_of_accreditation', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "scopeOfAccreditation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_for_acap_referrals_name', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "contactForAcapReferralsName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_for_acap_referrals_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "contactForAcapReferralsEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_for_acap_referrals_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], NsbTestingLaboratory.prototype, "contactForAcapReferralsPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], NsbTestingLaboratory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbTestingLaboratory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NsbTestingLaboratory.prototype, "updatedAt", void 0);
exports.NsbTestingLaboratory = NsbTestingLaboratory = __decorate([
    (0, typeorm_1.Entity)('nsb_testing_laboratories')
], NsbTestingLaboratory);
//# sourceMappingURL=nsb-testing-laboratory.entity.js.map