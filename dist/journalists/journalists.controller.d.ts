import { JournalistsService } from './journalists.service';
import { CreateJournalistDto } from './dto/create-journalist.dto';
import { UpdateJournalistDto } from './dto/update-journalist.dto';
import { SearchJournalistDto } from './dto/search-journalist.dto';
export declare class JournalistsController {
    private readonly journalistsService;
    constructor(journalistsService: JournalistsService);
    create(createJournalistDto: CreateJournalistDto): Promise<import("./entities/journalist.entity").Journalist>;
    findAll(searchDto: SearchJournalistDto): Promise<import("./entities/journalist.entity").Journalist[]>;
    getMyProfile(req: any): Promise<import("./entities/journalist.entity").Journalist>;
    updateMyProfile(updateJournalistDto: UpdateJournalistDto, req: any): Promise<import("./entities/journalist.entity").Journalist>;
    getMyApplications(req: any): Promise<import("./entities/journalist.entity").Journalist>;
    findOne(id: string): Promise<import("./entities/journalist.entity").Journalist>;
    update(id: string, updateJournalistDto: UpdateJournalistDto, req: any): Promise<import("./entities/journalist.entity").Journalist>;
    remove(id: string, req: any): Promise<void>;
}
