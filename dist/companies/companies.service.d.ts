import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from '../users/entities/user.entity';
import { Job } from '../jobs/entities/job.entity';
import { JobApplication } from '../jobs/entities/job-application.entity';
export declare class CompaniesService {
    private readonly companyRepository;
    private readonly jobRepository;
    private readonly jobApplicationRepository;
    constructor(companyRepository: Repository<Company>, jobRepository: Repository<Job>, jobApplicationRepository: Repository<JobApplication>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    findByUserId(userId: number): Promise<Company>;
    update(id: number, updateCompanyDto: UpdateCompanyDto, user: User): Promise<Company>;
    remove(id: number, user: User): Promise<void>;
    getVerifiedCompanies(): Promise<Company[]>;
    updateRating(id: number, newRating: number): Promise<Company>;
    getMyProfile(userId: number): Promise<Company>;
    updateMyProfile(userId: number, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    getMyJobs(userId: number): Promise<Job[]>;
    getMyApplications(userId: number): Promise<JobApplication[]>;
    getMyApplication(applicationId: number, userId: number): Promise<JobApplication>;
}
