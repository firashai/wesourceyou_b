export declare enum SearchType {
    ALL = "all",
    JOURNALISTS = "journalists",
    COMPANIES = "companies",
    JOBS = "jobs",
    MEDIA = "media"
}
export declare class GlobalSearchDto {
    query: string;
    type?: SearchType;
    location?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: any;
    limit?: number;
    offset?: number;
}
