import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from '../users/entities/user.entity';
import { Journalist } from '../journalists/entities/journalist.entity';
import { Company } from '../companies/entities/company.entity';
import { Job, JobStatus } from '../jobs/entities/job.entity';
import { MediaContent, MediaStatus } from '../media-content/entities/media-content.entity';
import { JobApplication } from '../jobs/entities/job-application.entity';
import { MediaPurchase } from '../media-content/entities/media-purchase.entity';
export declare class AdminService {
    private userRepository;
    private journalistRepository;
    private companyRepository;
    private jobRepository;
    private mediaContentRepository;
    private jobApplicationRepository;
    private mediaPurchaseRepository;
    constructor(userRepository: Repository<User>, journalistRepository: Repository<Journalist>, companyRepository: Repository<Company>, jobRepository: Repository<Job>, mediaContentRepository: Repository<MediaContent>, jobApplicationRepository: Repository<JobApplication>, mediaPurchaseRepository: Repository<MediaPurchase>);
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
    getAllUsers(page?: number, limit?: number, status?: UserStatus, role?: UserRole): Promise<{
        users: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateUserStatus(userId: number, status: UserStatus, adminId: number): Promise<User>;
    getAllJournalists(page?: number, limit?: number, approved?: boolean): Promise<{
        journalists: Journalist[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveJournalist(journalistId: number, approved: boolean, adminId: number, notes?: string): Promise<Journalist>;
    updateJournalist(journalistId: number, updateData: any, adminId: number): Promise<Journalist>;
    updateCompany(companyId: number, updateData: any, adminId: number): Promise<Company>;
    updateJob(jobId: number, updateData: any, adminId: number): Promise<Job>;
    updateMediaContent(mediaId: number, updateData: any, adminId: number): Promise<MediaContent>;
    getAllCompanies(page?: number, limit?: number, verified?: boolean): Promise<{
        companies: Company[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveCompany(companyId: number, approved: boolean, adminId: number, notes?: string): Promise<Company>;
    getAllJobs(page?: number, limit?: number, approved?: boolean, status?: JobStatus): Promise<{
        jobs: Job[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveJob(jobId: number, approved: boolean, adminId: number, notes?: string): Promise<Job>;
    getAllMediaContent(page?: number, limit?: number, approved?: boolean, status?: MediaStatus): Promise<{
        mediaContent: MediaContent[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    approveMediaContent(mediaId: number, approved: boolean, adminId: number, notes?: string): Promise<MediaContent>;
    getAllApplications(page?: number, limit?: number): Promise<{
        applications: JobApplication[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getAllPurchases(page?: number, limit?: number): Promise<{
        purchases: MediaPurchase[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    bulkApproveJournalists(journalistIds: number[], approved: boolean, adminId: number): Promise<Journalist[]>;
    bulkApproveCompanies(companyIds: number[], approved: boolean, adminId: number): Promise<Company[]>;
    bulkApproveJobs(jobIds: number[], approved: boolean, adminId: number): Promise<Job[]>;
    bulkApproveMediaContent(mediaIds: number[], approved: boolean, adminId: number): Promise<MediaContent[]>;
}
