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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getDashboardStats() {
        return await this.adminService.getDashboardStats();
    }
    async getAllUsers(page = 1, limit = 10, status, role) {
        const userStatus = status ? status : undefined;
        const userRole = role ? role : undefined;
        return await this.adminService.getAllUsers(page, limit, userStatus, userRole);
    }
    async updateUserStatus(userId, status, req) {
        return await this.adminService.updateUserStatus(userId, status, req.user.id);
    }
    async getAllJournalists(page = 1, limit = 10, approved) {
        return await this.adminService.getAllJournalists(page, limit, approved);
    }
    async approveJournalist(journalistId, body, req) {
        return await this.adminService.approveJournalist(journalistId, body.approved, req.user.id, body.notes);
    }
    async bulkApproveJournalists(body, req) {
        return await this.adminService.bulkApproveJournalists(body.journalistIds, body.approved, req.user.id);
    }
    async updateJournalist(journalistId, updateData, req) {
        return await this.adminService.updateJournalist(journalistId, updateData, req.user.id);
    }
    async getAllCompanies(page = 1, limit = 10, verified) {
        return await this.adminService.getAllCompanies(page, limit, verified);
    }
    async approveCompany(companyId, body, req) {
        return await this.adminService.approveCompany(companyId, body.approved, req.user.id, body.notes);
    }
    async bulkApproveCompanies(body, req) {
        return await this.adminService.bulkApproveCompanies(body.companyIds, body.approved, req.user.id);
    }
    async updateCompany(companyId, updateData, req) {
        return await this.adminService.updateCompany(companyId, updateData, req.user.id);
    }
    async getAllJobs(page = 1, limit = 10, approved, status) {
        const jobStatus = status ? status : undefined;
        return await this.adminService.getAllJobs(page, limit, approved, jobStatus);
    }
    async approveJob(jobId, body, req) {
        return await this.adminService.approveJob(jobId, body.approved, req.user.id, body.notes);
    }
    async bulkApproveJobs(body, req) {
        return await this.adminService.bulkApproveJobs(body.jobIds, body.approved, req.user.id);
    }
    async updateJob(jobId, updateData, req) {
        return await this.adminService.updateJob(jobId, updateData, req.user.id);
    }
    async getAllMediaContent(page = 1, limit = 10, approved, status) {
        const mediaStatus = status ? status : undefined;
        return await this.adminService.getAllMediaContent(page, limit, approved, mediaStatus);
    }
    async approveMediaContent(mediaId, body, req) {
        return await this.adminService.approveMediaContent(mediaId, body.approved, req.user.id, body.notes);
    }
    async bulkApproveMediaContent(body, req) {
        return await this.adminService.bulkApproveMediaContent(body.mediaIds, body.approved, req.user.id);
    }
    async updateMediaContent(mediaId, updateData, req) {
        return await this.adminService.updateMediaContent(mediaId, updateData, req.user.id);
    }
    async getAllApplications(page = 1, limit = 10) {
        return await this.adminService.getAllApplications(page, limit);
    }
    async getAllPurchases(page = 1, limit = 10) {
        return await this.adminService.getAllPurchases(page, limit);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admin dashboard statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination and filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)('users/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User status updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Get)('journalists'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all journalists with pagination and approval filter' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Journalists retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('approved')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllJournalists", null);
__decorate([
    (0, common_1.Put)('journalists/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject a journalist' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Journalist approval status updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveJournalist", null);
__decorate([
    (0, common_1.Post)('journalists/bulk-approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk approve or reject journalists' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Journalists bulk approval completed successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "bulkApproveJournalists", null);
__decorate([
    (0, common_1.Put)('journalists/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update journalist information' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Journalist updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateJournalist", null);
__decorate([
    (0, common_1.Get)('companies'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all companies with pagination and verification filter' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Companies retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('verified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCompanies", null);
__decorate([
    (0, common_1.Put)('companies/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject a company' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Company approval status updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveCompany", null);
__decorate([
    (0, common_1.Post)('companies/bulk-approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk approve or reject companies' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Companies bulk approval completed successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "bulkApproveCompanies", null);
__decorate([
    (0, common_1.Put)('companies/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update company information' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Company updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Get)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all jobs with pagination and filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Jobs retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('approved')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Put)('jobs/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject a job' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job approval status updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveJob", null);
__decorate([
    (0, common_1.Post)('jobs/bulk-approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk approve or reject jobs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Jobs bulk approval completed successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "bulkApproveJobs", null);
__decorate([
    (0, common_1.Put)('jobs/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update job information' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Get)('media'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all media content with pagination and filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Media content retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('approved')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllMediaContent", null);
__decorate([
    (0, common_1.Put)('media/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject media content' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Media content approval status updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveMediaContent", null);
__decorate([
    (0, common_1.Post)('media/bulk-approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk approve or reject media content' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Media content bulk approval completed successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "bulkApproveMediaContent", null);
__decorate([
    (0, common_1.Put)('media/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update media content information' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Media content updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateMediaContent", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all job applications with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Applications retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllApplications", null);
__decorate([
    (0, common_1.Get)('purchases'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all media purchases with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Purchases retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllPurchases", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map