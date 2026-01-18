"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCertificationAuditDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_certification_audit_dto_1 = require("./create-certification-audit.dto");
class UpdateCertificationAuditDto extends (0, mapped_types_1.PartialType)(create_certification_audit_dto_1.CreateCertificationAuditDto) {
}
exports.UpdateCertificationAuditDto = UpdateCertificationAuditDto;
//# sourceMappingURL=update-certification-audit.dto.js.map