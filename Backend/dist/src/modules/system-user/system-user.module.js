"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const system_user_entity_1 = require("./system-user.entity");
const system_user_controller_1 = require("./system-user.controller");
const system_user_service_1 = require("./system-user.service");
const auth_module_1 = require("../auth/auth.module");
let SystemUserModule = class SystemUserModule {
};
exports.SystemUserModule = SystemUserModule;
exports.SystemUserModule = SystemUserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([system_user_entity_1.SystemUser]),
            auth_module_1.AuthModule,
        ],
        controllers: [system_user_controller_1.SystemUserController],
        providers: [system_user_service_1.SystemUserService],
        exports: [system_user_service_1.SystemUserService],
    })
], SystemUserModule);
//# sourceMappingURL=system-user.module.js.map