import { CbApplicationStatus } from '../../../shared/enums';
export declare class UpdateCbStatusDto {
    status: CbApplicationStatus;
    provisionalEnd?: string;
    licenseStart?: string;
    licenseEnd?: string;
    renewalDue?: string;
}
