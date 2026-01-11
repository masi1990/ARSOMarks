import { Repository } from 'typeorm';
import { ApplicationDocument } from '../licensing/entities/application-document.entity';
import { LicenseApplication } from '../licensing/entities/license-application.entity';
import { UploadDocumentDto } from './dtos/upload-document.dto';
export declare class DocumentService {
    private readonly documentRepo;
    private readonly applicationRepo;
    constructor(documentRepo: Repository<ApplicationDocument>, applicationRepo: Repository<LicenseApplication>);
    list(applicationId: string): Promise<ApplicationDocument[]>;
    upload(applicationId: string, dto: UploadDocumentDto): Promise<ApplicationDocument>;
    private ensureApplication;
}
