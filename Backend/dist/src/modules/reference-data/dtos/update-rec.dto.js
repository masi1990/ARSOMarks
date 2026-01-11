"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_rec_dto_1 = require("./create-rec.dto");
class UpdateRecDto extends (0, mapped_types_1.PartialType)(create_rec_dto_1.CreateRecDto) {
}
exports.UpdateRecDto = UpdateRecDto;
//# sourceMappingURL=update-rec.dto.js.map