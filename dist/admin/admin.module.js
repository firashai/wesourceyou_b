"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const user_entity_1 = require("../users/entities/user.entity");
const journalist_entity_1 = require("../journalists/entities/journalist.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const job_entity_1 = require("../jobs/entities/job.entity");
const media_content_entity_1 = require("../media-content/entities/media-content.entity");
const job_application_entity_1 = require("../jobs/entities/job-application.entity");
const media_purchase_entity_1 = require("../media-content/entities/media-purchase.entity");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                journalist_entity_1.Journalist,
                company_entity_1.Company,
                job_entity_1.Job,
                media_content_entity_1.MediaContent,
                job_application_entity_1.JobApplication,
                media_purchase_entity_1.MediaPurchase,
            ]),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map