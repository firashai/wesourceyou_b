import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApplyForJobDto } from './dto/apply-for-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto, req: any): Promise<import("./entities/job.entity").Job>;
    findAll(query: any): Promise<import("./entities/job.entity").Job[]>;
    findByCompany(companyId: string): Promise<import("./entities/job.entity").Job[]>;
    findOne(id: string): Promise<import("./entities/job.entity").Job>;
    update(id: string, updateJobDto: UpdateJobDto, req: any): Promise<import("./entities/job.entity").Job>;
    remove(id: string, req: any): Promise<void>;
    applyForJob(id: string, applyForJobDto: ApplyForJobDto, req: any): Promise<import("./entities/job-application.entity").JobApplication>;
}
