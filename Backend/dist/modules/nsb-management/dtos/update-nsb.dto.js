"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNsbDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nsb_dto_1 = require("./create-nsb.dto");
class UpdateNsbDto extends (0, mapped_types_1.PartialType)(create_nsb_dto_1.CreateNsbDto) {
}
exports.UpdateNsbDto = UpdateNsbDto;
//# sourceMappingURL=update-nsb.dto.js.map