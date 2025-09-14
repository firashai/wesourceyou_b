import { Repository } from 'typeorm';
import { Journalist } from './entities/journalist.entity';
import { CreateJournalistDto } from './dto/create-journalist.dto';
import { UpdateJournalistDto } from './dto/update-journalist.dto';
import { SearchJournalistDto } from './dto/search-journalist.dto';
import { MediaWorkType } from './entities/journalist.entity';
import { User } from '../users/entities/user.entity';
export declare class JournalistsService {
    private readonly journalistRepository;
    constructor(journalistRepository: Repository<Journalist>);
    create(createJournalistDto: CreateJournalistDto): Promise<Journalist>;
    findAll(searchDto?: SearchJournalistDto): Promise<Journalist[]>;
    findOne(id: number): Promise<Journalist>;
    findByUserId(userId: number): Promise<Journalist>;
    update(id: number, updateJournalistDto: UpdateJournalistDto, user: User): Promise<Journalist>;
    remove(id: number, user: User): Promise<void>;
    getMyProfile(userId: number): Promise<Journalist>;
    updateMyProfile(userId: number, updateJournalistDto: UpdateJournalistDto): Promise<Journalist>;
    getMyMediaContent(userId: number): Promise<Journalist>;
    getMyApplications(userId: number): Promise<Journalist>;
    search(searchDto: SearchJournalistDto): Promise<Journalist[]>;
    getTopRated(limit?: number): Promise<Journalist[]>;
    getByMediaWorkType(mediaWorkType: MediaWorkType): Promise<Journalist[]>;
    getByLocation(country: string, city?: string): Promise<Journalist[]>;
    updateRating(id: number, newRating: number): Promise<Journalist>;
    updateCompletedProjects(id: number): Promise<Journalist>;
}
