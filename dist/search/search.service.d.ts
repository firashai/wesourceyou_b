import { Repository } from 'typeorm';
import { Journalist } from '../journalists/entities/journalist.entity';
import { Job } from '../jobs/entities/job.entity';
import { MediaContent } from '../media-content/entities/media-content.entity';
import { Company } from '../companies/entities/company.entity';
import { GlobalSearchDto } from './dto/global-search.dto';
export declare class SearchService {
    private readonly journalistRepository;
    private readonly jobRepository;
    private readonly mediaContentRepository;
    private readonly companyRepository;
    constructor(journalistRepository: Repository<Journalist>, jobRepository: Repository<Job>, mediaContentRepository: Repository<MediaContent>, companyRepository: Repository<Company>);
    globalSearch(searchDto: GlobalSearchDto): Promise<{
        journalists: any[];
        jobs: any[];
        mediaContent: any[];
        companies: any[];
    }>;
    searchJournalists(query: string, limit: number, offset: number): Promise<Journalist[]>;
    searchJobs(query: string, limit: number, offset: number): Promise<Job[]>;
    searchMediaContent(query: string, limit: number, offset: number): Promise<MediaContent[]>;
    searchCompanies(query: string, limit: number, offset: number): Promise<Company[]>;
    searchMedia(query: string, limit: number, offset: number): Promise<MediaContent[]>;
    searchJournalistsAdvanced(filters: any): Promise<Journalist[]>;
    searchJobsAdvanced(filters: any): Promise<Job[]>;
    getSearchSuggestions(query: string): Promise<{
        journalists: any[];
        jobs: any[];
        companies: any[];
        skills: any[];
        locations: any[];
    }>;
    debugDatabaseContent(): Promise<void>;
    debugJournalistsContent(): Promise<void>;
}
