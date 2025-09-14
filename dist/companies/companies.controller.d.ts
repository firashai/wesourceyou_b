import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(): Promise<import("./entities/company.entity").Company[]>;
    getMyProfile(req: any): Promise<import("./entities/company.entity").Company>;
    updateMyProfile(updateCompanyDto: UpdateCompanyDto, req: any): Promise<import("./entities/company.entity").Company>;
    getMyJobs(req: any): Promise<import("../jobs/entities/job.entity").Job[]>;
    getMyApplications(req: any): Promise<import("../jobs/entities/job-application.entity").JobApplication[]>;
    getMyApplication(id: string, req: any): Promise<import("../jobs/entities/job-application.entity").JobApplication>;
    findOne(id: string): Promise<import("./entities/company.entity").Company>;
    update(id: string, updateCompanyDto: UpdateCompanyDto, req: any): Promise<import("./entities/company.entity").Company>;
    remove(id: string, req: any): Promise<void>;
}
