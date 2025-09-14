"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJournalistDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_journalist_dto_1 = require("./create-journalist.dto");
class UpdateJournalistDto extends (0, mapped_types_1.PartialType)(create_journalist_dto_1.CreateJournalistDto) {
}
exports.UpdateJournalistDto = UpdateJournalistDto;
//# sourceMappingURL=update-journalist.dto.js.map