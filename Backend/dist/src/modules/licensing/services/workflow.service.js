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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const workflow_history_entity_1 = require("../entities/workflow-history.entity");
const enums_1 = require("../../../shared/enums");
let WorkflowService = class WorkflowService {
    constructor(workflowRepository) {
        this.workflowRepository = workflowRepository;
    }
    async createHistoryEntry(data) {
        const entry = this.workflowRepository.create(Object.assign(Object.assign({}, data), { performedAt: new Date() }));
        return this.workflowRepository.save(entry);
    }
    async getApplicationHistory(applicationId) {
        return this.workflowRepository.find({
            where: { applicationId },
            order: { performedAt: 'DESC' },
        });
    }
    validateStatusTransition(currentStatus, targetStatus) {
        var _a;
        const validTransitions = {
            [enums_1.ApplicationStatus.DRAFT]: [enums_1.ApplicationStatus.SUBMITTED, enums_1.ApplicationStatus.WITHDRAWN],
            [enums_1.ApplicationStatus.SUBMITTED]: [
                enums_1.ApplicationStatus.UNDER_REVIEW,
                enums_1.ApplicationStatus.REJECTED,
                enums_1.ApplicationStatus.WITHDRAWN,
            ],
            [enums_1.ApplicationStatus.UNDER_REVIEW]: [
                enums_1.ApplicationStatus.PENDING_WITNESS,
                enums_1.ApplicationStatus.PENDING_CACO,
                enums_1.ApplicationStatus.APPROVED_PENDING_PAYMENT,
                enums_1.ApplicationStatus.REJECTED,
            ],
            [enums_1.ApplicationStatus.PENDING_WITNESS]: [enums_1.ApplicationStatus.UNDER_REVIEW, enums_1.ApplicationStatus.PENDING_CACO],
            [enums_1.ApplicationStatus.PENDING_CACO]: [enums_1.ApplicationStatus.APPROVED_PENDING_PAYMENT, enums_1.ApplicationStatus.REJECTED],
            [enums_1.ApplicationStatus.APPROVED_PENDING_PAYMENT]: [enums_1.ApplicationStatus.APPROVED_PENDING_AGREEMENT],
            [enums_1.ApplicationStatus.APPROVED_PENDING_AGREEMENT]: [enums_1.ApplicationStatus.ACTIVE, enums_1.ApplicationStatus.PROVISIONAL],
            [enums_1.ApplicationStatus.ACTIVE]: [enums_1.ApplicationStatus.SUSPENDED, enums_1.ApplicationStatus.WITHDRAWN],
            [enums_1.ApplicationStatus.PROVISIONAL]: [
                enums_1.ApplicationStatus.ACTIVE,
                enums_1.ApplicationStatus.SUSPENDED,
                enums_1.ApplicationStatus.WITHDRAWN,
            ],
            [enums_1.ApplicationStatus.SUSPENDED]: [enums_1.ApplicationStatus.ACTIVE, enums_1.ApplicationStatus.WITHDRAWN],
            [enums_1.ApplicationStatus.WITHDRAWN]: [],
            [enums_1.ApplicationStatus.REJECTED]: [],
        };
        return ((_a = validTransitions[currentStatus]) === null || _a === void 0 ? void 0 : _a.includes(targetStatus)) || false;
    }
};
exports.WorkflowService = WorkflowService;
exports.WorkflowService = WorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workflow_history_entity_1.WorkflowHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WorkflowService);
//# sourceMappingURL=workflow.service.js.map