"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbComplianceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cb_compliance_profile_entity_1 = require("./entities/cb-compliance-profile.entity");
const cb_compliance_controller_1 = require("./controllers/cb-compliance.controller");
const cb_compliance_service_1 = require("./services/cb-compliance.service");
const cb_application_entity_1 = require("../cb-approval/entities/cb-application.entity");
let CbComplianceModule = class CbComplianceModule {
};
exports.CbComplianceModule = CbComplianceModule;
exports.CbComplianceModule = CbComplianceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cb_compliance_profile_entity_1.CbComplianceProfile, cb_application_entity_1.CbApplication])],
        controllers: [cb_compliance_controller_1.CbComplianceController],
        providers: [cb_compliance_service_1.CbComplianceService],
        exports: [cb_compliance_service_1.CbComplianceService],
    })
], CbComplianceModule);
//# sourceMappingURL=cb-compliance.module.js.map