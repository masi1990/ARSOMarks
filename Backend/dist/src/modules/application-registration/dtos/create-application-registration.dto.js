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
exports.CreateApplicationRegistrationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const transform_empty_to_undefined_decorator_1 = require("../../../shared/decorators/transform-empty-to-undefined.decorator");
const product_certification_dto_1 = require("./product-certification.dto");
class CreateApplicationRegistrationDto {
}
exports.CreateApplicationRegistrationDto = CreateApplicationRegistrationDto;
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Applicant name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "applicantName", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Applicant type is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "applicantType", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Registration number is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "taxId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Contact person is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "contactPerson", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Contact email is required' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "contactEmail", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Contact phone is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "contactPhone", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Physical address is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "physicalAddress", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'City is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "city", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Region/State is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "regionState", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Postal code is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "postalCode", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Country is required' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "countryId", void 0);
__decorate([
    (0, transform_empty_to_undefined_decorator_1.TransformEmptyToUndefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Business activity is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateApplicationRegistrationDto.prototype, "businessActivity", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], CreateApplicationRegistrationDto.prototype, "yearEstablished", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateApplicationRegistrationDto.prototype, "employeeCount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateApplicationRegistrationDto.prototype, "annualRevenue", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => product_certification_dto_1.ProductCertificationDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", product_certification_dto_1.ProductCertificationDto)
], CreateApplicationRegistrationDto.prototype, "productCertification", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => product_certification_dto_1.ManufacturerInfoDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", product_certification_dto_1.ManufacturerInfoDto)
], CreateApplicationRegistrationDto.prototype, "manufacturerInfo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => product_certification_dto_1.ConformityEvidenceDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", product_certification_dto_1.ConformityEvidenceDto)
], CreateApplicationRegistrationDto.prototype, "conformityEvidence", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => product_certification_dto_1.PostCertificationDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", product_certification_dto_1.PostCertificationDto)
], CreateApplicationRegistrationDto.prototype, "postCertification", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => product_certification_dto_1.CbSelectionDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", product_certification_dto_1.CbSelectionDto)
], CreateApplicationRegistrationDto.prototype, "cbSelection", void 0);
//# sourceMappingURL=create-application-registration.dto.js.map