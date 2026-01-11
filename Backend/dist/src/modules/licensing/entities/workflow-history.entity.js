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
exports.WorkflowHistory = void 0;
const typeorm_1 = require("typeorm");
const license_application_entity_1 = require("./license-application.entity");
const enums_1 = require("../../../shared/enums");
const system_user_entity_1 = require("../../system-user/system-user.entity");
let WorkflowHistory = class WorkflowHistory {
};
exports.WorkflowHistory = WorkflowHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'application_id' }),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => license_application_entity_1.LicenseApplication, (app) => app.workflowHistory, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    __metadata("design:type", license_application_entity_1.LicenseApplication)
], WorkflowHistory.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'from_status', type: 'enum', enum: enums_1.ApplicationStatus, nullable: true }),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "fromStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'to_status', type: 'enum', enum: enums_1.ApplicationStatus }),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "toStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'action_performed', length: 100 }),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "actionPerformed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'performed_by', type: 'uuid' }),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "performedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_user_entity_1.SystemUser, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'performed_by' }),
    __metadata("design:type", system_user_entity_1.SystemUser)
], WorkflowHistory.prototype, "performedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'performed_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], WorkflowHistory.prototype, "performedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], WorkflowHistory.prototype, "metadata", void 0);
exports.WorkflowHistory = WorkflowHistory = __decorate([
    (0, typeorm_1.Entity)('application_workflow_history')
], WorkflowHistory);
//# sourceMappingURL=workflow-history.entity.js.map