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
exports.CreateLicenseApplicationDto = exports.AppliedSchemeDto = exports.AccreditationDetailsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../shared/enums");
class AccreditationDetailsDto {
}
exports.AccreditationDetailsDto = AccreditationDetailsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccreditationDetailsDto.prototype, "accreditationBody", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccreditationDetailsDto.prototype, "accreditationNumber", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], AccreditationDetailsDto.prototype, "accreditationDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], AccreditationDetailsDto.prototype, "accreditationExpiry", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AccreditationDetailsDto.prototype, "accreditationScopes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccreditationDetailsDto.prototype, "accreditationStatus", void 0);
class AppliedSchemeDto {
}
exports.AppliedSchemeDto = AppliedSchemeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppliedSchemeDto.prototype, "schemeCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppliedSchemeDto.prototype, "subjectArea", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppliedSchemeDto.prototype, "requestedScope", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppliedSchemeDto.prototype, "applicableStandards", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppliedSchemeDto.prototype, "justification", void 0);
class CreateLicenseApplicationDto {
    constructor() {
        this.applicationType = enums_1.ApplicationType.FULL;
        this.saveAsDraft = true;
    }
}
exports.CreateLicenseApplicationDto = CreateLicenseApplicationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLicenseApplicationDto.prototype, "nsbId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ApplicationType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLicenseApplicationDto.prototype, "applicationType", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AccreditationDetailsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AccreditationDetailsDto)
], CreateLicenseApplicationDto.prototype, "accreditationDetails", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AppliedSchemeDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateLicenseApplicationDto.prototype, "appliedSchemes", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLicenseApplicationDto.prototype, "organizationalDetails", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLicenseApplicationDto.prototype, "financialDetails", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLicenseApplicationDto.prototype, "technicalCompetenceDetails", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLicenseApplicationDto.prototype, "qmsDetails", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLicenseApplicationDto.prototype, "declarations", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLicenseApplicationDto.prototype, "saveAsDraft", void 0);
//# sourceMappingURL=create-license-application.dto.js.map