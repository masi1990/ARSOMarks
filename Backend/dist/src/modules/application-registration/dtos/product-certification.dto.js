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
exports.CbSelectionDto = exports.PostCertificationDto = exports.ConformityEvidenceDto = exports.ManufacturerInfoDto = exports.ProductCertificationDto = void 0;
const class_validator_1 = require("class-validator");
const transform_empty_to_undefined_decorator_1 = require("../../../shared/decorators/transform-empty-to-undefined.decorator");
class ProductCertificationDto {
}
exports.ProductCertificationDto = ProductCertificationDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mark applied for is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCertificationDto.prototype, "markAppliedFor", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'ACAP scheme is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCertificationDto.prototype, "acapScheme", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product brand name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ProductCertificationDto.prototype, "productBrandName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product model/type number is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProductCertificationDto.prototype, "productModelTypeNumber", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'At least one applicable ARSO standard is required' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductCertificationDto.prototype, "applicableArsoStandards", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Scope of certification is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], ProductCertificationDto.prototype, "scopeOfCertification", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Expected annual certified volume is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ProductCertificationDto.prototype, "expectedAnnualCertifiedVolume", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCertificationDto.prototype, "expectedAnnualCertifiedVolumeUnit", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'At least one target market is required' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductCertificationDto.prototype, "targetMarkets", void 0);
class ManufacturerInfoDto {
}
exports.ManufacturerInfoDto = ManufacturerInfoDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Manufacturer's legal name is required" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ManufacturerInfoDto.prototype, "manufacturerLegalName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Manufacturer's address is required" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ManufacturerInfoDto.prototype, "manufacturerAddress", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Manufacturer's country is required" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ManufacturerInfoDto.prototype, "manufacturerCountryId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Production site GPS coordinates are required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ManufacturerInfoDto.prototype, "productionSiteGpsCoordinates", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Type of production is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ManufacturerInfoDto.prototype, "typeOfProduction", void 0);
class ConformityEvidenceDto {
}
exports.ConformityEvidenceDto = ConformityEvidenceDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Test report is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "testReportFileId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Test report issuing body is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "testReportIssuingBody", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Test report certificate number is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "testReportCertificateNo", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "qmsCertificateFileId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "qmsCertificateIssuingBody", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "qmsCertificateNo", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "otherEvidenceFileId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "otherEvidenceIssuingBody", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "otherEvidenceCertificateNo", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product photographs are required' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ConformityEvidenceDto.prototype, "productPhotographsFileIds", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Label artwork is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "labelArtworkFileId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Declaration of conformity is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ConformityEvidenceDto.prototype, "declarationOfConformityFileId", void 0);
class PostCertificationDto {
}
exports.PostCertificationDto = PostCertificationDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product recall procedure is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PostCertificationDto.prototype, "productRecallProcedureFileId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Complaints management procedure is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PostCertificationDto.prototype, "complaintsManagementProcedureFileId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Agreement to surveillance is required' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PostCertificationDto.prototype, "agreementToSurveillance", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Traceability undertaking is required' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PostCertificationDto.prototype, "traceabilityUndertaking", void 0);
class CbSelectionDto {
}
exports.CbSelectionDto = CbSelectionDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Certification body selection is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "selectedCertificationBodyId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Final declaration signature is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "finalDeclarationSignature", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Final declaration date is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CbSelectionDto.prototype, "finalDeclarationDate", void 0);
//# sourceMappingURL=product-certification.dto.js.map