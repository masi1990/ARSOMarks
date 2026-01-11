import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowHistory } from '../entities/workflow-history.entity';
import { ApplicationStatus } from '../../../shared/enums';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(WorkflowHistory)
    private readonly workflowRepository: Repository<WorkflowHistory>,
  ) {}

  async createHistoryEntry(data: {
    applicationId: string;
    fromStatus: ApplicationStatus | null;
    toStatus: ApplicationStatus;
    actionPerformed: string;
    performedBy: string;
    notes?: string;
    metadata?: Record<string, any>;
  }): Promise<WorkflowHistory> {
    const entry = this.workflowRepository.create({
      ...data,
      performedAt: new Date(),
    });

    return this.workflowRepository.save(entry);
  }

  async getApplicationHistory(applicationId: string): Promise<WorkflowHistory[]> {
    return this.workflowRepository.find({
      where: { applicationId },
      order: { performedAt: 'DESC' },
    });
  }

  validateStatusTransition(currentStatus: ApplicationStatus, targetStatus: ApplicationStatus): boolean {
    const validTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
      [ApplicationStatus.DRAFT]: [ApplicationStatus.SUBMITTED, ApplicationStatus.WITHDRAWN],
      [ApplicationStatus.SUBMITTED]: [
        ApplicationStatus.UNDER_REVIEW,
        ApplicationStatus.REJECTED,
        ApplicationStatus.WITHDRAWN,
      ],
      [ApplicationStatus.UNDER_REVIEW]: [
        ApplicationStatus.PENDING_WITNESS,
        ApplicationStatus.PENDING_CACO,
        ApplicationStatus.APPROVED_PENDING_PAYMENT,
        ApplicationStatus.REJECTED,
      ],
      [ApplicationStatus.PENDING_WITNESS]: [ApplicationStatus.UNDER_REVIEW, ApplicationStatus.PENDING_CACO],
      [ApplicationStatus.PENDING_CACO]: [ApplicationStatus.APPROVED_PENDING_PAYMENT, ApplicationStatus.REJECTED],
      [ApplicationStatus.APPROVED_PENDING_PAYMENT]: [ApplicationStatus.APPROVED_PENDING_AGREEMENT],
      [ApplicationStatus.APPROVED_PENDING_AGREEMENT]: [ApplicationStatus.ACTIVE, ApplicationStatus.PROVISIONAL],
      [ApplicationStatus.ACTIVE]: [ApplicationStatus.SUSPENDED, ApplicationStatus.WITHDRAWN],
      [ApplicationStatus.PROVISIONAL]: [
        ApplicationStatus.ACTIVE,
        ApplicationStatus.SUSPENDED,
        ApplicationStatus.WITHDRAWN,
      ],
      [ApplicationStatus.SUSPENDED]: [ApplicationStatus.ACTIVE, ApplicationStatus.WITHDRAWN],
      [ApplicationStatus.WITHDRAWN]: [],
      [ApplicationStatus.REJECTED]: [],
    };

    return validTransitions[currentStatus]?.includes(targetStatus) || false;
  }
}

