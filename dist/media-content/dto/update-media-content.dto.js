"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaContentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_media_content_dto_1 = require("./create-media-content.dto");
class UpdateMediaContentDto extends (0, mapped_types_1.PartialType)(create_media_content_dto_1.CreateMediaContentDto) {
}
exports.UpdateMediaContentDto = UpdateMediaContentDto;
//# sourceMappingURL=update-media-content.dto.js.map