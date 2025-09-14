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
exports.RegisterJournalistDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const journalist_entity_1 = require("../../journalists/entities/journalist.entity");
class RegisterJournalistDto {
}
exports.RegisterJournalistDto = RegisterJournalistDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'United States' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New York' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "cityOfResidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2015-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "mediaWorkStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegisterJournalistDto.prototype, "hasCamera", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Canon EOS R5', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "cameraType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegisterJournalistDto.prototype, "hasAudioEquipment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rode NTG5', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "audioEquipmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegisterJournalistDto.prototype, "canTravel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: journalist_entity_1.MediaWorkType, example: journalist_entity_1.MediaWorkType.VIDEO_PRODUCTION }),
    (0, class_validator_1.IsEnum)(journalist_entity_1.MediaWorkType),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "mediaWorkType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: journalist_entity_1.AnalystSpecialty, example: journalist_entity_1.AnalystSpecialty.MIDDLE_EASTERN_AFFAIRS, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(journalist_entity_1.AnalystSpecialty),
    __metadata("design:type", String)
], RegisterJournalistDto.prototype, "analystSpecialty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { platform: journalist_entity_1.SocialMediaPlatform.FACEBOOK, url: 'https://facebook.com/johndoe' },
            { platform: journalist_entity_1.SocialMediaPlatform.TWITTER, url: 'https://twitter.com/johndoe' }
        ],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RegisterJournalistDto.prototype, "socialMediaAccounts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            'https://example.com/work1',
            'https://example.com/work2'
        ],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RegisterJournalistDto.prototype, "previousWorkLinks", void 0);
//# sourceMappingURL=register-journalist.dto.js.map