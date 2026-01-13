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
exports.UploadApplicationDocumentDto = exports.ApplicationRegistrationDocumentType = void 0;
const class_validator_1 = require("class-validator");
var ApplicationRegistrationDocumentType;
(function (ApplicationRegistrationDocumentType) {
    ApplicationRegistrationDocumentType["TEST_REPORT"] = "TEST_REPORT";
    ApplicationRegistrationDocumentType["QMS_CERTIFICATE"] = "QMS_CERTIFICATE";
    ApplicationRegistrationDocumentType["OTHER_EVIDENCE"] = "OTHER_EVIDENCE";
    ApplicationRegistrationDocumentType["PRODUCT_PHOTOGRAPH"] = "PRODUCT_PHOTOGRAPH";
    ApplicationRegistrationDocumentType["LABEL_ARTWORK"] = "LABEL_ARTWORK";
    ApplicationRegistrationDocumentType["DECLARATION_OF_CONFORMITY"] = "DECLARATION_OF_CONFORMITY";
    ApplicationRegistrationDocumentType["PRODUCT_RECALL_PROCEDURE"] = "PRODUCT_RECALL_PROCEDURE";
    ApplicationRegistrationDocumentType["COMPLAINTS_MANAGEMENT_PROCEDURE"] = "COMPLAINTS_MANAGEMENT_PROCEDURE";
    ApplicationRegistrationDocumentType["COMPANY_REGISTRATION_CERTIFICATE"] = "COMPANY_REGISTRATION_CERTIFICATE";
})(ApplicationRegistrationDocumentType || (exports.ApplicationRegistrationDocumentType = ApplicationRegistrationDocumentType = {}));
class UploadApplicationDocumentDto {
}
exports.UploadApplicationDocumentDto = UploadApplicationDocumentDto;
__decorate([
    (0, class_validator_1.IsEnum)(ApplicationRegistrationDocumentType),
    __metadata("design:type", String)
], UploadApplicationDocumentDto.prototype, "documentType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadApplicationDocumentDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadApplicationDocumentDto.prototype, "filePath", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadApplicationDocumentDto.prototype, "fileHash", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadApplicationDocumentDto.prototype, "fileSize", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadApplicationDocumentDto.prototype, "mimeType", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadApplicationDocumentDto.prototype, "applicationRegistrationId", void 0);
//# sourceMappingURL=upload-document.dto.js.map