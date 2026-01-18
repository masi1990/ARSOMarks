"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationAuditModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const certification_audit_service_1 = require("./services/certification-audit.service");
const certification_audit_controller_1 = require("./controllers/certification-audit.controller");
let CertificationAuditModule = class CertificationAuditModule {
};
exports.CertificationAuditModule = CertificationAuditModule;
exports.CertificationAuditModule = CertificationAuditModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.CertificationAudit,
                entities_1.CertificationAuditFinding,
                entities_1.CorrectiveAction,
                entities_1.SamplingRecord,
                entities_1.Laboratory,
                entities_1.TestResult,
            ]),
        ],
        controllers: [certification_audit_controller_1.CertificationAuditController],
        providers: [certification_audit_service_1.CertificationAuditService],
        exports: [certification_audit_service_1.CertificationAuditService],
    })
], CertificationAuditModule);
//# sourceMappingURL=certification-audit.module.js.map