import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    globalSearch(searchDto: any): Promise<{
        journalists: any[];
        jobs: any[];
        mediaContent: any[];
        companies: any[];
    }>;
    searchJournalists(query: any): Promise<import("../journalists/entities/journalist.entity").Journalist[]>;
    searchCompanies(query: any): Promise<import("../companies/entities/company.entity").Company[]>;
    searchJobs(query: any): Promise<import("../jobs/entities/job.entity").Job[]>;
    searchMedia(query: any): Promise<import("../media-content/entities/media-content.entity").MediaContent[]>;
}
