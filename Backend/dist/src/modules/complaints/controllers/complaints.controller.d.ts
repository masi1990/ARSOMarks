import { ComplaintsService } from '../services/complaints.service';
import { CreateAppealDto, CreateComplaintDto, ReviewAppealDto, ReviewComplaintDto } from '../dtos';
export declare class ComplaintsController {
    private readonly complaintsService;
    constructor(complaintsService: ComplaintsService);
    createComplaint(dto: CreateComplaintDto): Promise<import("../entities").Complaint>;
    listComplaints(): Promise<import("../entities").Complaint[]>;
    reviewComplaint(id: string, dto: ReviewComplaintDto): Promise<import("../entities").Complaint>;
    uploadEvidence(id: string, file: Express.Multer.File): Promise<{
        uploadedAt: string;
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
        id: string;
    }>;
    createAppeal(dto: CreateAppealDto): Promise<import("../entities").Appeal>;
    listAppeals(): Promise<import("../entities").Appeal[]>;
    reviewAppeal(id: string, dto: ReviewAppealDto): Promise<import("../entities").Appeal>;
}
