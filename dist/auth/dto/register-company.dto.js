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
exports.RegisterCompanyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const journalist_entity_1 = require("../../journalists/entities/journalist.entity");
class RegisterCompanyDto {
}
exports.RegisterCompanyDto = RegisterCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'company@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ABC Media Company' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'United States' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New York' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.abccompany.com', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { serviceType: journalist_entity_1.MediaWorkType.VIDEO_PRODUCTION },
            { serviceType: journalist_entity_1.MediaWorkType.PHOTO_JOURNALISM }
        ],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RegisterCompanyDto.prototype, "requiredServices", void 0);
//# sourceMappingURL=register-company.dto.js.map