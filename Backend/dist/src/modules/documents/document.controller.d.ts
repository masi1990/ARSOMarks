import { DocumentService } from './document.service';
import { UploadDocumentDto } from './dtos/upload-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    list(applicationId: string): Promise<import("../licensing/entities/application-document.entity").ApplicationDocument[]>;
    upload(applicationId: string, dto: UploadDocumentDto): Promise<import("../licensing/entities/application-document.entity").ApplicationDocument>;
}
