import { AuditFindingType } from '../../../shared/enums';
export declare class CreateAuditFindingDto {
    auditId: string;
    findingType: AuditFindingType;
    description: string;
    deadlineDate?: string;
}
