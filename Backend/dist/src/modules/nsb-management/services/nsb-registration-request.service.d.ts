import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { NsbRegistrationRequest } from '../entities/nsb-registration-request.entity';
import { NsbRegistrationRequestDocument } from '../entities/nsb-registration-request-document.entity';
import { CreateNsbRegistrationRequestDto, UpdateNsbRegistrationRequestDto } from '../dtos';
import { NsbDocumentType } from '../../../shared/enums';
import { NsbService } from './nsb.service';
import { NsbDocumentUploadService } from './nsb-document-upload.service';
import { EmailService } from '../../auth/services/email.service';
export declare class NsbRegistrationRequestService {
    private readonly requestRepo;
    private readonly documentRepo;
    private readonly nsbService;
    private readonly dataSource;
    private readonly uploadService;
    private readonly emailService;
    private readonly configService;
    private readonly logger;
    constructor(requestRepo: Repository<NsbRegistrationRequest>, documentRepo: Repository<NsbRegistrationRequestDocument>, nsbService: NsbService, dataSource: DataSource, uploadService: NsbDocumentUploadService, emailService: EmailService, configService: ConfigService);
    create(dto: CreateNsbRegistrationRequestDto, userId: string): Promise<NsbRegistrationRequest>;
    update(id: string, dto: UpdateNsbRegistrationRequestDto, userId: string, userRole?: string): Promise<NsbRegistrationRequest>;
    submit(id: string, userId: string): Promise<NsbRegistrationRequest>;
    approve(id: string, reviewerId: string, remarks?: string): Promise<NsbRegistrationRequest>;
    reject(id: string, reviewerId: string, remarks: string): Promise<NsbRegistrationRequest>;
    findById(id: string): Promise<NsbRegistrationRequest>;
    findAll(filter?: any): Promise<{
        data: NsbRegistrationRequest[];
        total: number;
    }>;
    findByCountry(countryId: string): Promise<NsbRegistrationRequest | null>;
    uploadDocument(requestId: string, file: Express.Multer.File, documentType: NsbDocumentType, userId: string): Promise<NsbRegistrationRequestDocument>;
    deleteDocument(requestId: string, documentId: string, userId: string): Promise<void>;
    getDocument(requestId: string, documentId: string): Promise<NsbRegistrationRequestDocument>;
    getDocumentFile(filePath: string): Promise<Buffer>;
}
