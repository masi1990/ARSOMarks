import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NsbRegistrationRequestService } from '../../modules/nsb-management/services/nsb-registration-request.service';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import {
  NsbRegistrationRequest,
  NsbRegistrationRequestStatus,
} from '../../shared/models/nsb-registration-request.model';
import { Nsb } from '../../shared/models/nsb.model';
import { User } from '../../shared/models/user.model';

interface WorkflowTask {
  id: string;
  type: 'REGISTRATION' | 'MARK_USAGE' | 'ESCALATION';
  title: string;
  origin: string;
  date: Date;
  status: string;
  priority?: 'NORMAL' | 'URGENT';
  notifications: {
    system: boolean;
    email: boolean;
  };
}

interface NotificationLog {
  id: number;
  method: 'EMAIL' | 'SYSTEM';
  time: Date;
  recipient: string;
  message: string;
}

interface DashboardStats {
  activeNsbs: number;
  pendingApprovals: number;
  totalMarks: number;
  escalations: number;
  newThisMonth: number;
}

interface ReadinessMetrics {
  profileComplete: boolean;
  stakeholdersRegistered: number;
}

@Component({
  selector: 'app-nsb-dashboard',
  templateUrl: './nsb-dashboard.component.html',
  styleUrls: ['./nsb-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NsbDashboardComponent implements OnInit {
  loading = false;
  error = '';
  user: User | null = null;
  registrationRequest: NsbRegistrationRequest | null = null;
  nsb: Nsb | null = null;
  allNsbs: Nsb[] = [];

  // Dashboard statistics
  stats: DashboardStats = {
    activeNsbs: 0,
    pendingApprovals: 0,
    totalMarks: 0,
    escalations: 0,
    newThisMonth: 0
  };

  // Workflow tasks with notification tracking
  pendingTasks: WorkflowTask[] = [];

  // Notification history log
  notificationLogs: NotificationLog[] = [];

  // Readiness metrics
  readinessMetrics: ReadinessMetrics = {
    profileComplete: false,
    stakeholdersRegistered: 0
  };

  readinessPercentage = 0;
  traceabilityPercentage = 0; // Will be calculated from actual data
  unreadNotificationsCount = 0;

  constructor(
    public router: Router,
    private requestService: NsbRegistrationRequestService,
    private nsbService: NsbService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.loadData();
    this.loadDashboardStats();
    this.loadPendingTasks();
    this.loadNotificationLogs();
    this.calculateReadiness();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    // First, try to load NSB directly (for users who already have NSB)
    // This is the most common case and should be checked first
    this.nsbService
      .getMyNsb()
      .pipe(
        finalize(() => {
          // Continue with other data loading
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsb = nsb;
          this.calculateReadiness();
          this.loading = false;
        },
        error: (err) => {
          // If no NSB found (404), check for registration request
          if (err.status === 404) {
            this.loadRegistrationRequest();
          } else if (err.status !== 403) {
            // Only show error for non-403 errors (403 is expected for users without NSB access)
            console.warn('Failed to load NSB:', err);
          }
          this.loading = false;
        },
      });

    // Load all NSBs for admins (for dashboard statistics)
    this.loadAllNsbs();
  }

  loadRegistrationRequest(): void {
    // Load registration request if user has countryId
    if (this.user?.countryId) {
      this.requestService
        .getMyRequest(this.user.countryId)
        .subscribe({
          next: (request) => {
            this.registrationRequest = request;
            // If approved, try to load NSB again (in case it was just created)
            if (request?.status === NsbRegistrationRequestStatus.APPROVED && request.nsbId) {
              this.loadNsb(request.nsbId);
            }
          },
          error: (err) => {
            // No request found (404) is OK - user hasn't started registration yet
            if (err.status !== 404) {
              console.warn('Failed to load registration request:', err);
            }
          },
        });
    }
  }

  loadAllNsbs(): void {
    this.nsbService.getNsbList().subscribe({
      next: (response) => {
        this.allNsbs = response.data || [];
        this.updateStats();
      },
      error: (err) => {
        // Don't show error for 403 or 404 - user might not have access to list all NSBs
        // This is expected for regular NSB users
        if (err.status !== 403 && err.status !== 404) {
          console.warn('Failed to load NSB list:', err);
        }
        this.allNsbs = [];
      },
    });
  }

  loadDashboardStats(): void {
    // Calculate from loaded data
    this.updateStats();
  }

  updateStats(): void {
    this.stats.activeNsbs = this.allNsbs.filter(nsb => nsb.status === 'ACTIVE').length;
    // Initialize with actual data - will be populated from API calls
    this.stats.pendingApprovals = 0;
    this.stats.totalMarks = 0;
    this.stats.escalations = 0;
    this.stats.newThisMonth = 0;
  }

  loadPendingTasks(): void {
    // Initialize empty - will be populated from actual API calls
    this.pendingTasks = [];
    this.unreadNotificationsCount = 0;
  }

  loadNotificationLogs(): void {
    // Initialize empty - will be populated from actual API calls
    this.notificationLogs = [];
  }

  calculateReadiness(): void {
    if (!this.nsb) {
      this.readinessPercentage = 0;
      this.readinessMetrics.profileComplete = false;
      this.readinessMetrics.stakeholdersRegistered = 0;
      return;
    }

    // Calculate readiness percentage based on NSB profile completion
    this.readinessMetrics.profileComplete = !!this.nsb.name && !!this.nsb.contacts && this.nsb.contacts.length > 0;
    this.readinessMetrics.stakeholdersRegistered = this.nsb.stakeholderRegistryStatus === 'SUBMITTED' ? 1 : 0;

    // Calculate percentage based on completion criteria
    let score = 0;
    if (this.readinessMetrics.profileComplete) score += 50;
    if (this.readinessMetrics.stakeholdersRegistered > 0) score += 30;
    if (this.nsb.documents && this.nsb.documents.length > 0) score += 20;

    this.readinessPercentage = score;
  }

  viewNsb(nsbId: string): void {
    this.router.navigate(['/portal/nsb'], { queryParams: { id: nsbId } });
  }

  loadNsb(nsbId: string): void {
    if (!nsbId) {
      return;
    }
    this.nsbService.getNsbById(nsbId).subscribe({
      next: (nsb) => {
        this.nsb = nsb;
        this.calculateReadiness();
      },
      error: (err) => {
        // If 403 Forbidden, try loading via getMyNsb instead
        // This handles cases where organizationId wasn't set when the request was approved
        if (err.status === 403) {
          this.nsbService.getMyNsb().subscribe({
            next: (nsb) => {
              this.nsb = nsb;
              this.calculateReadiness();
            },
            error: () => {
              // User may not have NSB access yet - this is expected for new registrations
              // Don't show error to avoid confusion
            },
          });
        } else if (err.status !== 404) {
          // Only log non-404 errors (404 is expected if NSB doesn't exist yet)
          console.warn('Failed to load NSB:', err);
        }
      },
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'DRAFT':
        return 'bg-slate-100 text-slate-700';
      case 'SUBMITTED':
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-700';
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'DRAFT':
        return 'Draft';
      case 'SUBMITTED':
        return 'Submitted for Review';
      case 'UNDER_REVIEW':
        return 'Under Review';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      default:
        return status;
    }
  }

  navigateToRegistry(): void {
    this.router.navigate(['/portal/nsb/stakeholder-registry-list']);
  }

  navigateToLicensing(): void {
    this.router.navigate(['/portal/mark-licenses/dashboard']);
  }

  navigateToRegistration(): void {
    this.router.navigate(['/portal/nsb-registration/request']);
  }

  approveTask(task: WorkflowTask): void {
    // Navigate to appropriate approval page based on task type
    if (task.type === 'REGISTRATION') {
      this.router.navigate(['/portal/nsb-review']);
    } else if (task.type === 'MARK_USAGE') {
      this.router.navigate(['/portal/mark-licenses/dashboard']);
    }
  }

  viewTask(task: WorkflowTask): void {
    // Navigate to task details page
    if (task.type === 'REGISTRATION') {
      this.router.navigate(['/portal/nsb-review']);
    } else if (task.type === 'MARK_USAGE') {
      this.router.navigate(['/portal/mark-licenses/dashboard']);
    } else if (task.type === 'ESCALATION') {
      this.router.navigate(['/portal/approvals']);
    }
  }

  goToRegistrationRequest(): void {
    this.router.navigate(['/nsb-registration/request']);
  }

  goToProfileSetup(): void {
    // Navigate to NSB management page
    this.router.navigate(['/portal/nsb']);
  }

  goToStakeholderRegistry(): void {
    this.router.navigate(['/portal/nsb/stakeholder-registry']);
  }

  goToManagement(): void {
    this.router.navigate(['/portal/nsb']);
  }

  canCompleteProfile(): boolean {
    return (
      this.registrationRequest?.status === NsbRegistrationRequestStatus.APPROVED && !this.nsb
    );
  }

  canEditRegistrationRequest(): boolean {
    return this.registrationRequest?.status === NsbRegistrationRequestStatus.DRAFT;
  }

  canSubmitRegistrationRequest(): boolean {
    return this.registrationRequest?.status === NsbRegistrationRequestStatus.DRAFT;
  }
}
