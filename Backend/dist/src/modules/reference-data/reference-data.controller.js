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
exports.ReferenceDataController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const reference_data_service_1 = require("./reference-data.service");
const dtos_1 = require("./dtos");
let ReferenceDataController = class ReferenceDataController {
    constructor(service) {
        this.service = service;
    }
    getCountries() {
        return this.service.getCountries();
    }
    getCountry(countryId) {
        return this.service.getCountry(countryId);
    }
    createCountry(dto) {
        return this.service.createCountry(dto);
    }
    updateCountry(countryId, dto) {
        return this.service.updateCountry(countryId, dto);
    }
    deleteCountry(countryId) {
        return this.service.deleteCountry(countryId);
    }
    getRegions() {
        return this.service.getRegions();
    }
    getRegion(regionId) {
        return this.service.getRegion(regionId);
    }
    createRegion(dto) {
        return this.service.createRegion(dto);
    }
    updateRegion(regionId, dto) {
        return this.service.updateRegion(regionId, dto);
    }
    deleteRegion(regionId) {
        return this.service.deleteRegion(regionId);
    }
    getRegionsByCountry(countryId) {
        return this.service.getRegionsByCountry(countryId);
    }
    getRecs() {
        return this.service.getRecs();
    }
    getRec(recId) {
        return this.service.getRec(recId);
    }
    createRec(dto) {
        return this.service.createRec(dto);
    }
    updateRec(recId, dto) {
        return this.service.updateRec(recId, dto);
    }
    deleteRec(recId) {
        return this.service.deleteRec(recId);
    }
    getRecMemberships(countryId) {
        return this.service.getCountryRecMemberships(countryId);
    }
    getAcapSchemes() {
        return this.service.getAcapSchemes();
    }
    getAccreditationBodies() {
        return this.service.getAccreditationBodies();
    }
};
exports.ReferenceDataController = ReferenceDataController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('countries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getCountries", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('countries/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getCountry", null);
__decorate([
    (0, common_1.Post)('countries'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateCountryDto]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "createCountry", null);
__decorate([
    (0, common_1.Put)('countries/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateCountryDto]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "updateCountry", null);
__decorate([
    (0, common_1.Delete)('countries/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "deleteCountry", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('regions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getRegions", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('regions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getRegion", null);
__decorate([
    (0, common_1.Post)('regions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateRegionDto]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "createRegion", null);
__decorate([
    (0, common_1.Put)('regions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateRegionDto]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "updateRegion", null);
__decorate([
    (0, common_1.Delete)('regions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "deleteRegion", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('countries/:countryId/regions'),
    __param(0, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getRegionsByCountry", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('recs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getRecs", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('recs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getRec", null);
__decorate([
    (0, common_1.Post)('recs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateRecDto]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "createRec", null);
__decorate([
    (0, common_1.Put)('recs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateRecDto]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "updateRec", null);
__decorate([
    (0, common_1.Delete)('recs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "deleteRec", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('countries/:countryId/recs'),
    __param(0, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getRecMemberships", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('acap-schemes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getAcapSchemes", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('accreditation-bodies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReferenceDataController.prototype, "getAccreditationBodies", null);
exports.ReferenceDataController = ReferenceDataController = __decorate([
    (0, common_1.Controller)('reference'),
    __metadata("design:paramtypes", [reference_data_service_1.ReferenceDataService])
], ReferenceDataController);
//# sourceMappingURL=reference-data.controller.js.map