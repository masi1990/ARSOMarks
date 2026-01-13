"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicationRegistrationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_application_registration_draft_dto_1 = require("./create-application-registration-draft.dto");
class UpdateApplicationRegistrationDto extends (0, mapped_types_1.PartialType)(create_application_registration_draft_dto_1.CreateApplicationRegistrationDraftDto) {
}
exports.UpdateApplicationRegistrationDto = UpdateApplicationRegistrationDto;
//# sourceMappingURL=update-application-registration.dto.js.map