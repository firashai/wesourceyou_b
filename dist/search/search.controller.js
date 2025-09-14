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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    globalSearch(searchDto) {
        const query = searchDto.query || searchDto.q;
        const filters = searchDto.filters || searchDto.type;
        const limit = searchDto.limit || 20;
        const offset = searchDto.offset || 0;
        console.log('Search request:', { query, filters, limit, offset });
        return this.searchService.globalSearch({ query, filters, limit, offset });
    }
    searchJournalists(query) {
        const searchQuery = query.query || query.q;
        const { limit = 20, offset = 0 } = query;
        return this.searchService.searchJournalists(searchQuery, limit, offset);
    }
    searchCompanies(query) {
        const searchQuery = query.query || query.q;
        const { limit = 20, offset = 0 } = query;
        return this.searchService.searchCompanies(searchQuery, limit, offset);
    }
    searchJobs(query) {
        const searchQuery = query.query || query.q;
        const { limit = 20, offset = 0 } = query;
        return this.searchService.searchJobs(searchQuery, limit, offset);
    }
    searchMedia(query) {
        const searchQuery = query.query || query.q;
        const { limit = 20, offset = 0 } = query;
        return this.searchService.searchMedia(searchQuery, limit, offset);
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "globalSearch", null);
__decorate([
    (0, common_1.Get)('journalists'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchJournalists", null);
__decorate([
    (0, common_1.Get)('companies'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchCompanies", null);
__decorate([
    (0, common_1.Get)('jobs'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchJobs", null);
__decorate([
    (0, common_1.Get)('media'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchMedia", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map