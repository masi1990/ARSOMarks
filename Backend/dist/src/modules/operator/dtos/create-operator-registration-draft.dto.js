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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperatorRegistrationDraftDto = exports.ConsentDraftDto = exports.AccessibilityDraftDto = exports.PreferencesDraftDto = exports.ProductionCapacityDraftDto = exports.MarketInfoDraftDto = exports.BusinessSectorDraftDto = exports.OperatorLocationDraftDto = exports.OperatorContactDraftDto = exports.OwnershipInfoDraftDto = exports.CompanySizeDraftDto = exports.CompanyInfoDraftDto = void 0;
const class_transformer_1 = require("class-transformer");
class CompanyInfoDraftDto {
}
exports.CompanyInfoDraftDto = CompanyInfoDraftDto;
class CompanySizeDraftDto {
}
exports.CompanySizeDraftDto = CompanySizeDraftDto;
class OwnershipInfoDraftDto {
}
exports.OwnershipInfoDraftDto = OwnershipInfoDraftDto;
class OperatorContactDraftDto {
}
exports.OperatorContactDraftDto = OperatorContactDraftDto;
class OperatorLocationDraftDto {
}
exports.OperatorLocationDraftDto = OperatorLocationDraftDto;
class BusinessSectorDraftDto {
}
exports.BusinessSectorDraftDto = BusinessSectorDraftDto;
class MarketInfoDraftDto {
}
exports.MarketInfoDraftDto = MarketInfoDraftDto;
class ProductionCapacityDraftDto {
}
exports.ProductionCapacityDraftDto = ProductionCapacityDraftDto;
class PreferencesDraftDto {
}
exports.PreferencesDraftDto = PreferencesDraftDto;
class AccessibilityDraftDto {
}
exports.AccessibilityDraftDto = AccessibilityDraftDto;
class ConsentDraftDto {
}
exports.ConsentDraftDto = ConsentDraftDto;
class CreateOperatorRegistrationDraftDto {
}
exports.CreateOperatorRegistrationDraftDto = CreateOperatorRegistrationDraftDto;
__decorate([
    (0, class_transformer_1.Type)(() => CompanyInfoDraftDto),
    __metadata("design:type", CompanyInfoDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "companyInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => CompanySizeDraftDto),
    __metadata("design:type", CompanySizeDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "companySize", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => OwnershipInfoDraftDto),
    __metadata("design:type", OwnershipInfoDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "ownershipInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => OperatorContactDraftDto),
    __metadata("design:type", OperatorContactDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "primaryContact", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => OperatorLocationDraftDto),
    __metadata("design:type", Array)
], CreateOperatorRegistrationDraftDto.prototype, "locations", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => BusinessSectorDraftDto),
    __metadata("design:type", Array)
], CreateOperatorRegistrationDraftDto.prototype, "businessSectors", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => MarketInfoDraftDto),
    __metadata("design:type", MarketInfoDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "marketInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ProductionCapacityDraftDto),
    __metadata("design:type", ProductionCapacityDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "productionCapacity", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => PreferencesDraftDto),
    __metadata("design:type", PreferencesDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "preferences", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => AccessibilityDraftDto),
    __metadata("design:type", AccessibilityDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "accessibility", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ConsentDraftDto),
    __metadata("design:type", ConsentDraftDto)
], CreateOperatorRegistrationDraftDto.prototype, "consents", void 0);
//# sourceMappingURL=create-operator-registration-draft.dto.js.map