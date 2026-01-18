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
exports.MarkSanction = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const mark_misuse_incident_entity_1 = require("./mark-misuse-incident.entity");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let MarkSanction = class MarkSanction {
};
exports.MarkSanction = MarkSanction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MarkSanction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'incident_id', type: 'uuid' }),
    __metadata("design:type", String)
], MarkSanction.prototype, "incidentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mark_misuse_incident_entity_1.MarkMisuseIncident, (incident) => incident.sanctions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'incident_id' }),
    __metadata("design:type", mark_misuse_incident_entity_1.MarkMisuseIncident)
], MarkSanction.prototype, "incident", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sanction_type', type: 'enum', enum: enums_1.MarkSanctionType }),
    __metadata("design:type", String)
], MarkSanction.prototype, "sanctionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.MarkSanctionStatus, default: enums_1.MarkSanctionStatus.ACTIVE }),
    __metadata("design:type", String)
], MarkSanction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], MarkSanction.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], MarkSanction.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarkSanction.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MarkSanction.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], MarkSanction.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MarkSanction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MarkSanction.prototype, "updatedAt", void 0);
exports.MarkSanction = MarkSanction = __decorate([
    (0, typeorm_1.Entity)('mark_sanctions')
], MarkSanction);
//# sourceMappingURL=mark-sanction.entity.js.map