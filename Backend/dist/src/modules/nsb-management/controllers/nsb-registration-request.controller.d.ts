import { Response } from 'express';
import { NsbRegistrationRequestService } from '../services/nsb-registration-request.service';
import { CreateNsbRegistrationRequestDto, UpdateNsbRegistrationRequestDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class NsbRegistrationRequestController {
    private readonly requestService;
    constructor(requestService: NsbRegistrationRequestService);
    create(dto: CreateNsbRegistrationRequestDto, user: SystemUser): Promise<import("../entities/nsb-registration-request.entity").NsbRegistrationRequest>;
    list(query: any, user: SystemUser): Promise<{
        data: import("../entities/nsb-registration-request.entity").NsbRegistrationRequest[];
        total: number;
    }>;
    getMyRequest(user: SystemUser, countryId?: string): Promise<import("../entities/nsb-registration-request.entity").NsbRegistrationRequest>;
    getById(id: string, user: SystemUser): Promise<import("../entities/nsb-registration-request.entity").NsbRegistrationRequest>;
    update(id: string, dto: UpdateNsbRegistrationRequestDto, user: SystemUser): Promise<import("../entities/nsb-registration-request.entity").NsbRegistrationRequest>;
    submit(id: string, user: SystemUser): Promise<import("../entities/nsb-registration-request.entity").NsbRegistrationRequest>;
    approve(id: string, body: {
        remarks?: string;
    }, user: SystemUser): Promise<import("../entities/nsb-registration-request.entity").NsbRegistrationRequest>;
    reject(id: string, body: {
        remarks: string;
    }, user: SystemUser): Promise<import("../entities/nsb-registration-request.entity").NsbRegistrationRequest>;
    uploadDocument(id: string, file: Express.Multer.File, body: {
        documentType: string;
    }, user: SystemUser): Promise<import("../entities/nsb-registration-request-document.entity").NsbRegistrationRequestDocument>;
    deleteDocument(id: string, documentId: string, user: SystemUser): Promise<void>;
    deleteRequest(id: string): Promise<{
        message: string;
    }>;
    viewDocument(id: string, documentId: string, res: Response, user: SystemUser): Promise<void>;
}
