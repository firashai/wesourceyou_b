import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobApplication } from './entities/job-application.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApplyForJobDto } from './dto/apply-for-job.dto';
import { ApplicationStatus } from './entities/job-application.entity';
import { User } from '../users/entities/user.entity';
export declare class JobsService {
    private readonly jobRepository;
    private readonly jobApplicationRepository;
    constructor(jobRepository: Repository<Job>, jobApplicationRepository: Repository<JobApplication>);
    create(createJobDto: CreateJobDto, user: User): Promise<Job>;
    findAll(query?: any): Promise<Job[]>;
    findOne(id: number): Promise<Job>;
    findByCompany(companyId: number): Promise<Job[]>;
    update(id: number, updateJobDto: UpdateJobDto, user: User): Promise<Job>;
    remove(id: number, user: User): Promise<void>;
    applyForJob(jobId: number, applyDto: ApplyForJobDto, user: User): Promise<JobApplication>;
    getApplicationsByJob(jobId: number): Promise<JobApplication[]>;
    getApplicationsByJournalist(journalistId: number): Promise<JobApplication[]>;
    updateApplicationStatus(applicationId: number, status: ApplicationStatus, notes?: string): Promise<JobApplication>;
    searchJobs(filters: any): Promise<Job[]>;
    incrementViews(id: number): Promise<void>;
    getUrgentJobs(): Promise<Job[]>;
    getFeaturedJobs(): Promise<Job[]>;
}
