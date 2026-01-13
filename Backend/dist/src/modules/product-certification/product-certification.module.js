"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCertificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const product_certification_service_1 = require("./services/product-certification.service");
const product_certification_controller_1 = require("./controllers/product-certification.controller");
const operator_module_1 = require("../operator/operator.module");
const auth_module_1 = require("../auth/auth.module");
const operator_entity_1 = require("../operator/entities/operator.entity");
let ProductCertificationModule = class ProductCertificationModule {
};
exports.ProductCertificationModule = ProductCertificationModule;
exports.ProductCertificationModule = ProductCertificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.ProductCertificationApplication,
                entities_1.Product,
                entities_1.ProductTechnicalSpec,
                entities_1.ProductEnvironmentalClaim,
                entities_1.ProductCertificationCbSelection,
                entities_1.ProductCertificationDeclaration,
                operator_entity_1.Operator,
            ]),
            operator_module_1.OperatorModule,
            auth_module_1.AuthModule,
        ],
        controllers: [product_certification_controller_1.ProductCertificationController],
        providers: [product_certification_service_1.ProductCertificationService],
        exports: [product_certification_service_1.ProductCertificationService],
    })
], ProductCertificationModule);
//# sourceMappingURL=product-certification.module.js.map