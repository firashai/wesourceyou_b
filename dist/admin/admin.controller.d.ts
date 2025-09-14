import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        users: {
            total: number;
            pending: number;
        };
        journalists: {
            total: number;
            pending: number;
        };
        companies: {
            total: number;
            pending: number;
        };
        jobs: {
            total: number;
            pending: number;
        };
        media: {
            total: number;
            pending: number;
        };
        applications: {
            total: number;
        };
        purchases: {
            total: number;
        };
    }>;
    getAllUsers(page?: number, limit?: number, status?: string, role?: string): Promise<{
        users: import("../users/entities/user.entity").User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateUserStatus(userId: number, status: string, req: any): Promise<import("../users/entities/user.entity").User>;
    getAllJournalists(page?: number, limit?: number, approved?: boolean): Promise<{
        journalists: import("../journalists/entities/journalist.entity").Journalist[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveJournalist(journalistId: number, body: {
        approved: boolean;
        notes?: string;
    }, req: any): Promise<import("../journalists/entities/journalist.entity").Journalist>;
    bulkApproveJournalists(body: {
        journalistIds: number[];
        approved: boolean;
    }, req: any): Promise<import("../journalists/entities/journalist.entity").Journalist[]>;
    updateJournalist(journalistId: number, updateData: any, req: any): Promise<import("../journalists/entities/journalist.entity").Journalist>;
    getAllCompanies(page?: number, limit?: number, verified?: boolean): Promise<{
        companies: import("../companies/entities/company.entity").Company[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveCompany(companyId: number, body: {
        approved: boolean;
        notes?: string;
    }, req: any): Promise<import("../companies/entities/company.entity").Company>;
    bulkApproveCompanies(body: {
        companyIds: number[];
        approved: boolean;
    }, req: any): Promise<import("../companies/entities/company.entity").Company[]>;
    updateCompany(companyId: number, updateData: any, req: any): Promise<import("../companies/entities/company.entity").Company>;
    getAllJobs(page?: number, limit?: number, approved?: boolean, status?: string): Promise<{
        jobs: import("../jobs/entities/job.entity").Job[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveJob(jobId: number, body: {
        approved: boolean;
        notes?: string;
    }, req: any): Promise<import("../jobs/entities/job.entity").Job>;
    bulkApproveJobs(body: {
        jobIds: number[];
        approved: boolean;
    }, req: any): Promise<import("../jobs/entities/job.entity").Job[]>;
    updateJob(jobId: number, updateData: any, req: any): Promise<import("../jobs/entities/job.entity").Job>;
    getAllMediaContent(page?: number, limit?: number, approved?: boolean, status?: string): Promise<{
        mediaContent: import("../media-content/entities/media-content.entity").MediaContent[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveMediaContent(mediaId: number, body: {
        approved: boolean;
        notes?: string;
    }, req: any): Promise<import("../media-content/entities/media-content.entity").MediaContent>;
    bulkApproveMediaContent(body: {
        mediaIds: number[];
        approved: boolean;
    }, req: any): Promise<import("../media-content/entities/media-content.entity").MediaContent[]>;
    updateMediaContent(mediaId: number, updateData: any, req: any): Promise<import("../media-content/entities/media-content.entity").MediaContent>;
    getAllApplications(page?: number, limit?: number): Promise<{
        applications: import("../jobs/entities/job-application.entity").JobApplication[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getAllPurchases(page?: number, limit?: number): Promise<{
        purchases: import("../media-content/entities/media-purchase.entity").MediaPurchase[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
