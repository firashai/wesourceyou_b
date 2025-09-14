"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaContentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const media_content_service_1 = require("./media-content.service");
const media_content_controller_1 = require("./media-content.controller");
const media_content_entity_1 = require("./entities/media-content.entity");
const media_purchase_entity_1 = require("./entities/media-purchase.entity");
let MediaContentModule = class MediaContentModule {
};
exports.MediaContentModule = MediaContentModule;
exports.MediaContentModule = MediaContentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([media_content_entity_1.MediaContent, media_purchase_entity_1.MediaPurchase])],
        controllers: [media_content_controller_1.MediaContentController],
        providers: [media_content_service_1.MediaContentService],
        exports: [media_content_service_1.MediaContentService],
    })
], MediaContentModule);
//# sourceMappingURL=media-content.module.js.map