"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const system_user_entity_1 = require("../system-user/system-user.entity");
const auth_service_1 = require("./services/auth.service");
const email_service_1 = require("./services/email.service");
const auth_controller_1 = require("./controllers/auth.controller");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const role_request_entity_1 = require("./entities/role-request.entity");
const role_request_service_1 = require("./services/role-request.service");
const role_request_controller_1 = require("./controllers/role-request.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([system_user_entity_1.SystemUser, role_request_entity_1.RoleRequest]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'your-secret-key-change-in-production',
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN') || '7d',
                    },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController, role_request_controller_1.RoleRequestController],
        providers: [auth_service_1.AuthService, email_service_1.EmailService, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy, role_request_service_1.RoleRequestService],
        exports: [auth_service_1.AuthService, email_service_1.EmailService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map