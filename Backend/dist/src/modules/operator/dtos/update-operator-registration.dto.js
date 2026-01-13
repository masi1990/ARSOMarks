"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOperatorRegistrationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_operator_registration_dto_1 = require("./create-operator-registration.dto");
class UpdateOperatorRegistrationDto extends (0, mapped_types_1.PartialType)(create_operator_registration_dto_1.CreateOperatorRegistrationDto) {
}
exports.UpdateOperatorRegistrationDto = UpdateOperatorRegistrationDto;
//# sourceMappingURL=update-operator-registration.dto.js.map