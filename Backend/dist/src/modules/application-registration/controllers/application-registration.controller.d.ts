import { ApplicationRegistrationService } from '../services/application-registration.service';
import { CreateApplicationRegistrationDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
import { ReferenceDataService } from '../../reference-data/reference-data.service';
import { Repository } from 'typeorm';
import { Nsb } from '../../nsb-management/entities/nsb.entity';
import { UploadApplicationDocumentDto } from '../dtos/upload-document.dto';
export declare class ApplicationRegistrationController {
    private readonly applicationRegistrationService;
    private readonly referenceDataService;
    private readonly nsbRepo;
    constructor(applicationRegistrationService: ApplicationRegistrationService, referenceDataService: ReferenceDataService, nsbRepo: Repository<Nsb>);
    saveDraft(dto: any, user: SystemUser): Promise<import("../entities").ApplicationRegistration>;
    create(dto: CreateApplicationRegistrationDto, user: SystemUser): Promise<import("../entities").ApplicationRegistration>;
    getMyApplications(user: SystemUser): Promise<import("../entities").ApplicationRegistration[]>;
    getMyApplication(user: SystemUser): Promise<import("../entities").ApplicationRegistration>;
    list(query: any, user: SystemUser): Promise<{
        data: import("../entities").ApplicationRegistration[];
        total: number;
    }>;
    getById(id: string, user: SystemUser): Promise<import("../entities").ApplicationRegistration>;
    update(id: string, dto: any, user: SystemUser): Promise<import("../entities").ApplicationRegistration>;
    submit(id: string, user: SystemUser): Promise<import("../entities").ApplicationRegistration>;
    delete(id: string, user: SystemUser): Promise<{
        message: string;
    }>;
    getAcapSchemes(): Promise<import("../../reference-data/entities/acap-scheme.entity").AcapScheme[]>;
    getArsoStandards(): Promise<{
        code: string;
        name: string;
    }[]>;
    getCertificationBodies(): Promise<{
        id: string;
        name: string;
        shortName: string;
        country: string;
        countryId: string;
    }[]>;
    getProductionTypes(): Promise<{
        value: string;
        label: string;
    }[]>;
    getTargetMarkets(): Promise<{
        value: string;
        label: string;
    }[]>;
    uploadDocument(id: string, dto: UploadApplicationDocumentDto, user: SystemUser): Promise<{
        id: string;
        documentType: import("../dtos/upload-document.dto").ApplicationRegistrationDocumentType;
        fileName: string;
        filePath: string;
        uploadedAt: string;
    }>;
    listDocuments(id: string, user: SystemUser): Promise<any[]>;
}
