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
exports.CreateNsbRegistrationRequestDto = exports.UploadDocumentDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../shared/enums");
class UploadDocumentDto {
}
exports.UploadDocumentDto = UploadDocumentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadDocumentDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadDocumentDto.prototype, "filePath", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadDocumentDto.prototype, "fileHash", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UploadDocumentDto.prototype, "fileSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadDocumentDto.prototype, "mimeType", void 0);
class CreateNsbRegistrationRequestDto {
}
exports.CreateNsbRegistrationRequestDto = CreateNsbRegistrationRequestDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "countryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "countryName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "nsbOfficialName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "nsbAcronym", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "isoCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "legalStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "establishmentActName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "establishmentActNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "establishmentActDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "registrationAuthority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "taxIdentificationNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "vatNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateNsbRegistrationRequestDto.prototype, "yearEstablished", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "contactPersonName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "contactPersonTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "contactEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "contactMobile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "directorGeneralName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "directorGeneralTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "directorGeneralEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "directorGeneralPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "boardChairName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "boardChairEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNsbRegistrationRequestDto.prototype, "boardChairPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateNsbRegistrationRequestDto.prototype, "headquartersAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateNsbRegistrationRequestDto.prototype, "postalAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "additionalAddresses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "additionalContacts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "keyOfficials", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "internationalMemberships", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "mandateAreas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateNsbRegistrationRequestDto.prototype, "additionalUserSlotsRequested", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "requestedRoles", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "sectors", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNsbRegistrationRequestDto.prototype, "documents", void 0);
//# sourceMappingURL=create-nsb-registration-request.dto.js.map