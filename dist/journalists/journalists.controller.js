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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalistsController = void 0;
const common_1 = require("@nestjs/common");
const journalists_service_1 = require("./journalists.service");
const create_journalist_dto_1 = require("./dto/create-journalist.dto");
const update_journalist_dto_1 = require("./dto/update-journalist.dto");
const search_journalist_dto_1 = require("./dto/search-journalist.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let JournalistsController = class JournalistsController {
    constructor(journalistsService) {
        this.journalistsService = journalistsService;
    }
    create(createJournalistDto) {
        return this.journalistsService.create(createJournalistDto);
    }
    findAll(searchDto) {
        return this.journalistsService.findAll(searchDto);
    }
    getMyProfile(req) {
        return this.journalistsService.getMyProfile(req.user.id);
    }
    updateMyProfile(updateJournalistDto, req) {
        return this.journalistsService.updateMyProfile(req.user.id, updateJournalistDto);
    }
    getMyApplications(req) {
        return this.journalistsService.getMyApplications(req.user.id);
    }
    findOne(id) {
        return this.journalistsService.findOne(+id);
    }
    update(id, updateJournalistDto, req) {
        return this.journalistsService.update(+id, updateJournalistDto, req.user);
    }
    remove(id, req) {
        return this.journalistsService.remove(+id, req.user);
    }
};
exports.JournalistsController = JournalistsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journalist_dto_1.CreateJournalistDto]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_journalist_dto_1.SearchJournalistDto]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.JOURNALIST),
    (0, common_1.Get)('my/profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.JOURNALIST),
    (0, common_1.Patch)('my/profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_journalist_dto_1.UpdateJournalistDto, Object]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "updateMyProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.JOURNALIST),
    (0, common_1.Get)('my/applications'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_journalist_dto_1.UpdateJournalistDto, Object]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], JournalistsController.prototype, "remove", null);
exports.JournalistsController = JournalistsController = __decorate([
    (0, common_1.Controller)('journalists'),
    __metadata("design:paramtypes", [journalists_service_1.JournalistsService])
], JournalistsController);
//# sourceMappingURL=journalists.controller.js.map