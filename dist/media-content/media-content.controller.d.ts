import { MediaContentService } from './media-content.service';
import { CreateMediaContentDto } from './dto/create-media-content.dto';
import { UpdateMediaContentDto } from './dto/update-media-content.dto';
import { PurchaseMediaContentDto } from './dto/purchase-media-content.dto';
export declare class MediaContentController {
    private readonly mediaContentService;
    constructor(mediaContentService: MediaContentService);
    private static getFileUploadConfig;
    create(createMediaContentDto: CreateMediaContentDto, file: Express.Multer.File, req: any): Promise<import("./entities/media-content.entity").MediaContent>;
    findAll(query: any): Promise<import("./entities/media-content.entity").MediaContent[]>;
    findFeatured(): Promise<import("./entities/media-content.entity").MediaContent[]>;
    search(query: any): Promise<import("./entities/media-content.entity").MediaContent[]>;
    findOne(id: string): Promise<import("./entities/media-content.entity").MediaContent>;
    update(id: string, updateMediaContentDto: UpdateMediaContentDto, req: any): Promise<import("./entities/media-content.entity").MediaContent>;
    remove(id: string, req: any): Promise<void>;
    purchase(id: string, purchaseDto: PurchaseMediaContentDto, req: any): Promise<import("./entities/media-purchase.entity").MediaPurchase>;
    findMyContent(req: any): Promise<import("./entities/media-content.entity").MediaContent[]>;
    uploadMyContent(createMediaContentDto: CreateMediaContentDto, file: Express.Multer.File, req: any): Promise<import("./entities/media-content.entity").MediaContent>;
    updateMyContent(id: string, updateMediaContentDto: UpdateMediaContentDto, file: Express.Multer.File, req: any): Promise<import("./entities/media-content.entity").MediaContent>;
    removeMyContent(id: string, req: any): Promise<void>;
}
