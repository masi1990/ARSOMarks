import { Repository } from 'typeorm';
import { WorkflowHistory } from '../entities/workflow-history.entity';
import { ApplicationStatus } from '../../../shared/enums';
export declare class WorkflowService {
    private readonly workflowRepository;
    constructor(workflowRepository: Repository<WorkflowHistory>);
    createHistoryEntry(data: {
        applicationId: string;
        fromStatus: ApplicationStatus | null;
        toStatus: ApplicationStatus;
        actionPerformed: string;
        performedBy: string;
        notes?: string;
        metadata?: Record<string, any>;
    }): Promise<WorkflowHistory>;
    getApplicationHistory(applicationId: string): Promise<WorkflowHistory[]>;
    validateStatusTransition(currentStatus: ApplicationStatus, targetStatus: ApplicationStatus): boolean;
}
