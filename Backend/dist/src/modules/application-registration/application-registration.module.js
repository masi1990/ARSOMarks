"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRegistrationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const application_registration_service_1 = require("./services/application-registration.service");
const application_registration_controller_1 = require("./controllers/application-registration.controller");
const auth_module_1 = require("../auth/auth.module");
const reference_data_module_1 = require("../reference-data/reference-data.module");
const nsb_entity_1 = require("../nsb-management/entities/nsb.entity");
let ApplicationRegistrationModule = class ApplicationRegistrationModule {
};
exports.ApplicationRegistrationModule = ApplicationRegistrationModule;
exports.ApplicationRegistrationModule = ApplicationRegistrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.ApplicationRegistration, nsb_entity_1.Nsb]),
            auth_module_1.AuthModule,
            reference_data_module_1.ReferenceDataModule,
        ],
        controllers: [application_registration_controller_1.ApplicationRegistrationController],
        providers: [application_registration_service_1.ApplicationRegistrationService],
        exports: [application_registration_service_1.ApplicationRegistrationService],
    })
], ApplicationRegistrationModule);
//# sourceMappingURL=application-registration.module.js.map