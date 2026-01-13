"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const operator_service_1 = require("./services/operator.service");
const operator_controller_1 = require("./controllers/operator.controller");
const auth_module_1 = require("../auth/auth.module");
let OperatorModule = class OperatorModule {
};
exports.OperatorModule = OperatorModule;
exports.OperatorModule = OperatorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Operator,
                entities_1.OperatorContact,
                entities_1.OperatorLocation,
                entities_1.OperatorBusinessSector,
                entities_1.OperatorMarket,
                entities_1.OperatorProductionCapacity,
                entities_1.OperatorPreference,
                entities_1.OperatorAccessibility,
                entities_1.OperatorConsent,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [operator_controller_1.OperatorController],
        providers: [operator_service_1.OperatorService],
        exports: [operator_service_1.OperatorService],
    })
], OperatorModule);
//# sourceMappingURL=operator.module.js.map