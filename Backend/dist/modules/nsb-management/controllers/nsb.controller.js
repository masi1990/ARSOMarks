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
exports.NsbController = void 0;
const common_1 = require("@nestjs/common");
const nsb_service_1 = require("../services/nsb.service");
const dtos_1 = require("../dtos");
let NsbController = class NsbController {
    constructor(nsbService) {
        this.nsbService = nsbService;
    }
    create(dto) {
        return this.nsbService.createNsb(dto, 'system');
    }
    list(query) {
        const { countryId, regionId, search, skip = 0, limit = 25 } = query;
        return this.nsbService.findAll({ countryId, regionId, search, skip: Number(skip), limit: Number(limit) });
    }
    getById(id) {
        return this.nsbService.findById(id);
    }
    update(id, dto) {
        return this.nsbService.updateNsb(id, dto, 'system');
    }
};
exports.NsbController = NsbController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateNsbDto]),
    __metadata("design:returntype", void 0)
], NsbController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NsbController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NsbController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateNsbDto]),
    __metadata("design:returntype", void 0)
], NsbController.prototype, "update", null);
exports.NsbController = NsbController = __decorate([
    (0, common_1.Controller)('nsb'),
    __metadata("design:paramtypes", [nsb_service_1.NsbService])
], NsbController);
//# sourceMappingURL=nsb.controller.js.map