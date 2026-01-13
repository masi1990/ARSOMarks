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
exports.CreateApplicationRegistrationDraftDto = exports.CbSelectionDraftDto = exports.PostCertificationDraftDto = exports.ConformityEvidenceDraftDto = exports.ManufacturerInfoDraftDto = exports.ProductCertificationDraftDto = exports.ConsentDraftDto = exports.AccessibilityDraftDto = exports.PreferencesDraftDto = exports.ProductionCapacityDraftDto = exports.MarketInfoDraftDto = exports.BusinessSectorDraftDto = exports.ApplicationLocationDraftDto = exports.ApplicationContactDraftDto = exports.OwnershipInfoDraftDto = exports.CompanySizeDraftDto = exports.CompanyInfoDraftDto = void 0;
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
class ApplicationContactDraftDto {
}
exports.ApplicationContactDraftDto = ApplicationContactDraftDto;
class ApplicationLocationDraftDto {
}
exports.ApplicationLocationDraftDto = ApplicationLocationDraftDto;
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
class ProductCertificationDraftDto {
}
exports.ProductCertificationDraftDto = ProductCertificationDraftDto;
class ManufacturerInfoDraftDto {
}
exports.ManufacturerInfoDraftDto = ManufacturerInfoDraftDto;
class ConformityEvidenceDraftDto {
}
exports.ConformityEvidenceDraftDto = ConformityEvidenceDraftDto;
class PostCertificationDraftDto {
}
exports.PostCertificationDraftDto = PostCertificationDraftDto;
class CbSelectionDraftDto {
}
exports.CbSelectionDraftDto = CbSelectionDraftDto;
class CreateApplicationRegistrationDraftDto {
}
exports.CreateApplicationRegistrationDraftDto = CreateApplicationRegistrationDraftDto;
__decorate([
    (0, class_transformer_1.Type)(() => CompanyInfoDraftDto),
    __metadata("design:type", CompanyInfoDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "companyInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => CompanySizeDraftDto),
    __metadata("design:type", CompanySizeDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "companySize", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => OwnershipInfoDraftDto),
    __metadata("design:type", OwnershipInfoDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "ownershipInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ApplicationContactDraftDto),
    __metadata("design:type", ApplicationContactDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "primaryContact", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ApplicationLocationDraftDto),
    __metadata("design:type", Array)
], CreateApplicationRegistrationDraftDto.prototype, "locations", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => BusinessSectorDraftDto),
    __metadata("design:type", Array)
], CreateApplicationRegistrationDraftDto.prototype, "businessSectors", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => MarketInfoDraftDto),
    __metadata("design:type", MarketInfoDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "marketInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ProductionCapacityDraftDto),
    __metadata("design:type", ProductionCapacityDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "productionCapacity", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => PreferencesDraftDto),
    __metadata("design:type", PreferencesDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "preferences", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => AccessibilityDraftDto),
    __metadata("design:type", AccessibilityDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "accessibility", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ConsentDraftDto),
    __metadata("design:type", ConsentDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "consents", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ProductCertificationDraftDto),
    __metadata("design:type", ProductCertificationDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "productCertification", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ManufacturerInfoDraftDto),
    __metadata("design:type", ManufacturerInfoDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "manufacturerInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ConformityEvidenceDraftDto),
    __metadata("design:type", ConformityEvidenceDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "conformityEvidence", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => PostCertificationDraftDto),
    __metadata("design:type", PostCertificationDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "postCertification", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => CbSelectionDraftDto),
    __metadata("design:type", CbSelectionDraftDto)
], CreateApplicationRegistrationDraftDto.prototype, "cbSelection", void 0);
//# sourceMappingURL=create-application-registration-draft.dto.js.map