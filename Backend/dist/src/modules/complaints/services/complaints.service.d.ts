import { Repository } from 'typeorm';
import { Complaint } from '../entities/complaint.entity';
import { Appeal } from '../entities/appeal.entity';
import { CreateAppealDto, CreateComplaintDto, ReviewAppealDto, ReviewComplaintDto } from '../dtos';
import { ComplaintUploadService } from './complaint-upload.service';
export declare class ComplaintsService {
    private readonly complaintRepository;
    private readonly appealRepository;
    private readonly complaintUploadService;
    constructor(complaintRepository: Repository<Complaint>, appealRepository: Repository<Appeal>, complaintUploadService: ComplaintUploadService);
    createComplaint(dto: CreateComplaintDto): Promise<Complaint>;
    listComplaints(): Promise<Complaint[]>;
    reviewComplaint(id: string, dto: ReviewComplaintDto): Promise<Complaint>;
    createAppeal(dto: CreateAppealDto): Promise<Appeal>;
    listAppeals(): Promise<Appeal[]>;
    reviewAppeal(id: string, dto: ReviewAppealDto): Promise<Appeal>;
    addComplaintEvidence(complaintId: string, file: Express.Multer.File): Promise<{
        uploadedAt: string;
        fileName: string;
        filePath: string;
        fileHash: string;
        fileSize: number;
        mimeType: string;
        id: string;
    }>;
    private generateComplaintNumber;
    private generateAppealNumber;
}
