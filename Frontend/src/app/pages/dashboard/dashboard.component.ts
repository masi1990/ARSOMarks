import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import {
  CreateRoleRequest,
  RoleRequest,
  RoleRequestStatus,
  User,
  UserRole,
} from '../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  roleRequests: RoleRequest[] = [];
  pendingRequests: RoleRequest[] = [];
  allRequests: RoleRequest[] = [];
  isAuthenticated = false;
  loadingRequests = false;
  loadingAllRequests = false;
  submitting = false;
  submitError = '';
  submitSuccess = '';
  decisionError = '';
  decisionSuccess = '';
  note = '';
  selectedRoles: Set<UserRole> = new Set<UserRole>();
  disabledRoles: Set<UserRole> = new Set<UserRole>();
  decidingId: string | null = null;
  decisionNote: string = '';
  decidingRequestId: string | null = null;
  pendingAction: 'approve' | 'reject' | null = null;

  // Pagination for Approver Console
  approvalsPage = 1;
  readonly approvalsPageSize = 4;

  readonly roleCards: Array<{ value: UserRole; title: string; blurb: string; badge: string }> = [
    { value: UserRole.PUBLIC, title: 'Public', blurb: 'Browse, verify, and submit complaints as a public user.', badge: 'Open Access' },
    { value: UserRole.SUPER_ADMIN, title: 'Super Admin', blurb: 'Platform-wide administration and oversight.', badge: 'Platform' },
    { value: UserRole.ARSO_COUNCIL, title: 'ARSO Council', blurb: 'Governance and strategic decisions.', badge: 'Governance' },
    { value: UserRole.CACO_MEMBER, title: 'CACO Member', blurb: 'Conformity Assessment Committee review.', badge: 'CACO' },
    { value: UserRole.ARSO_SECRETARIAT, title: 'ARSO Secretariat', blurb: 'Central operations and coordination.', badge: 'Secretariat' },
    { value: UserRole.ADVISORY_COMMITTEE, title: 'Advisory Committee', blurb: 'Advisory expertise and guidance.', badge: 'Advisory' },
    { value: UserRole.SMC_MEMBER, title: 'SMC Member', blurb: 'Standards Management Committee tasks.', badge: 'Standards' },
    { value: UserRole.NSB_ADMIN, title: 'NSB Admin', blurb: 'National Standards Body administration.', badge: 'NSB' },
    { value: UserRole.NSB_USER, title: 'NSB User', blurb: 'NSB operations and registry actions.', badge: 'NSB' },
    { value: UserRole.CB_ADMIN, title: 'Certification Body Admin', blurb: 'Manage CB audits and certificates.', badge: 'CB' },
    { value: UserRole.CB_USER, title: 'Certification Body User', blurb: 'Execute CB reviews and evidence.', badge: 'CB' },
    { value: UserRole.OPERATOR, title: 'Operator / Manufacturer', blurb: 'Request marks, manage products, track certifications.', badge: 'Operator' },
    { value: UserRole.ACCREDITATION_BODY, title: 'Accreditation Body', blurb: 'Accreditation oversight and liaison.', badge: 'Accreditation' },
  ];

  constructor(private authService: AuthService) {}

  loadRequests(): void {
    if (!this.isAuthenticated) return;
    this.loadingRequests = true;
    this.authService
      .getMyRoleRequests()
      .pipe(
        finalize(() => {
          this.loadingRequests = false;
        }),
      )
      .subscribe({
        next: (reqs) => {
          this.roleRequests = reqs || [];
          this.pendingRequests = this.roleRequests.filter((r) => r.status === RoleRequestStatus.PENDING);
          this.updateDisabledRoles();
        },
        error: () => {
          this.roleRequests = [];
          this.pendingRequests = [];
          this.updateDisabledRoles();
        },
      });
  }

  loadAllRequests(): void {
    if (!this.isAuthenticated || !this.isApprover()) {
      this.allRequests = [];
      return;
    }
    this.loadingAllRequests = true;
    this.authService
      .listRoleRequests()
      .pipe(
        finalize(() => {
          this.loadingAllRequests = false;
        }),
      )
      .subscribe({
        next: (reqs) => {
          this.allRequests = reqs || [];
        },
        error: () => {
          this.allRequests = [];
        },
      });
  }

  // Pagination Getters & Methods
  get paginatedApprovals(): RoleRequest[] {
    const start = (this.approvalsPage - 1) * this.approvalsPageSize;
    return this.allRequests.slice(start, start + this.approvalsPageSize);
  }

  get totalApprovalPages(): number {
    return Math.ceil(this.allRequests.length / this.approvalsPageSize) || 1;
  }

  nextApprovalPage(): void {
    if (this.approvalsPage < this.totalApprovalPages) {
      this.approvalsPage++;
    }
  }

  prevApprovalPage(): void {
    if (this.approvalsPage > 1) {
      this.approvalsPage--;
    }
  }

  get decidingRequest(): RoleRequest | null {
    if (!this.decidingRequestId) return null;
    return this.allRequests.find(r => r.id === this.decidingRequestId) || null;
  }

  // Expose Math for template
  Math = Math;

  get pendingRequestsCount(): number {
    return this.roleRequests.filter(r => r.status === RoleRequestStatus.PENDING).length;
  }

  refreshProfile(): void {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        // If the freshly fetched profile has approver roles, ensure approver data loads.
        if (this.isApprover() && !this.allRequests.length) {
          this.loadAllRequests();
        }
      },
      error: () => {
        // Ignore profile errors here; fall back to the cached user.
      },
    });
  }

  submitRoleRequest(): void {
    this.submitError = '';
    this.submitSuccess = '';

    if (!this.isAuthenticated) {
      this.submitError = 'Please log in to submit role requests.';
      return;
    }

    if (!this.selectedRoles.size) {
      this.submitError = 'Select at least one role.';
      return;
    }

    const payload: CreateRoleRequest = {
      requestedRoles: Array.from(this.selectedRoles),
      note: this.note?.trim() || undefined,
    };

    this.submitting = true;
    this.authService
      .requestRoles(payload)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
      )
      .subscribe({
        next: (res) => {
          const created = Array.isArray(res) ? res : [res];
          this.submitSuccess = 'Request submitted. You will be notified after review.';
          this.selectedRoles = new Set<UserRole>();
          this.note = '';
          this.roleRequests = [...created, ...this.roleRequests];
          this.pendingRequests = this.roleRequests.filter((r) => r.status === RoleRequestStatus.PENDING);
          this.updateDisabledRoles();
        },
        error: (err) => {
          this.submitError = err?.error?.message || 'Failed to submit request.';
        },
      });
  }

  openDecisionModal(id: string, action: 'approve' | 'reject'): void {
    this.decidingRequestId = id;
    this.pendingAction = action;
    this.decisionNote = '';
    this.decisionError = '';
    this.decisionSuccess = '';
  }

  closeDecisionModal(): void {
    this.decidingRequestId = null;
    this.pendingAction = null;
    this.decisionNote = '';
    this.decisionError = '';
    this.decisionSuccess = '';
  }

  confirmDecision(): void {
    if (!this.decidingRequestId || !this.pendingAction) return;
    const status = this.pendingAction === 'approve' 
      ? RoleRequestStatus.APPROVED 
      : RoleRequestStatus.REJECTED;
    this.decide(this.decidingRequestId, status);
  }

  decide(id: string, status: RoleRequestStatus.APPROVED | RoleRequestStatus.REJECTED): void {
    this.decisionError = '';
    this.decisionSuccess = '';
    this.decidingId = id;

    const payload = { 
      status, 
      note: this.decisionNote?.trim() || undefined 
    };

    this.authService
      .decideRoleRequest(id, payload)
      .pipe(
        finalize(() => {
          this.decidingId = null;
          this.closeDecisionModal();
        }),
      )
      .subscribe({
        next: (res) => {
          this.decisionSuccess = `Request ${status.toLowerCase()}.`;
          this.allRequests = this.allRequests.map((r) => (r.id === res.id ? res : r));
          if (res.userId === this.user?.id) {
            this.roleRequests = this.roleRequests.map((r) => (r.id === res.id ? res : r));
          }
          // Reset pagination if needed
          if (this.approvalsPage > this.totalApprovalPages) {
            this.approvalsPage = Math.max(1, this.totalApprovalPages);
          }
        },
        error: (err) => {
          this.decisionError = err?.error?.message || 'Action failed.';
        },
      });
  }

  toggleRole(role: UserRole): void {
    if (!this.isAuthenticated) {
      this.submitError = 'Please log in to submit role requests.';
      return;
    }
    if (this.disabledRoles.has(role)) return;
    if (this.selectedRoles.has(role)) {
      this.selectedRoles.delete(role);
    } else {
      this.selectedRoles.add(role);
    }
    // Ensure change detection picks up Set mutation
    this.selectedRoles = new Set<UserRole>(this.selectedRoles);
  }

  isSelected(role: UserRole): boolean {
    return this.selectedRoles.has(role);
  }

  clearSelection(): void {
    this.selectedRoles = new Set<UserRole>();
  }

  hasPendingFor(role: UserRole): boolean {
    return this.pendingRequests.some(
      (req) => req.status === RoleRequestStatus.PENDING && req.requestedRoles.includes(role),
    );
  }

  formatRole(role: UserRole | string): string {
    return (role || '').toString().replace(/_/g, ' ');
  }

  formatRolesList(roles?: UserRole[] | null): string {
    return roles && roles.length ? roles.map((r) => this.formatRole(r)).join(', ') : 'None';
  }

  statusBadgeClasses(status: RoleRequestStatus): string {
    switch (status) {
      case RoleRequestStatus.APPROVED:
        return 'bg-emerald-50 text-emerald-700';
      case RoleRequestStatus.REJECTED:
        return 'bg-rose-50 text-rose-700';
      default:
        return 'bg-amber-50 text-amber-700';
    }
  }

  isApprover(): boolean {
    const roles = this.user?.roles || (this.user?.role ? [this.user.role] : []);
    return roles.includes(UserRole.SUPER_ADMIN) || roles.includes(UserRole.ARSO_SECRETARIAT);
  }

  isNsbAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes(UserRole.NSB_ADMIN) || roles.includes(UserRole.NSB_USER);
  }

  isOperator(): boolean {
    const roles = this.getUserRoles();
    return (
      roles.includes(UserRole.OPERATOR) ||
      roles.includes(UserRole.NSB_ADMIN) ||
      roles.includes(UserRole.SUPER_ADMIN) ||
      roles.includes(UserRole.PUBLIC)
    );
  }

  isCbUser(): boolean {
    const roles = this.getUserRoles();
    return (
      roles.includes(UserRole.CB_ADMIN) ||
      roles.includes(UserRole.CB_USER) ||
      roles.includes(UserRole.SUPER_ADMIN) ||
      roles.includes(UserRole.ARSO_SECRETARIAT) ||
      roles.includes(UserRole.PUBLIC)
    );
  }

  isPublic(): boolean {
    const roles = this.getUserRoles();
    return roles.includes(UserRole.PUBLIC);
  }

  canSeeTools(): boolean {
    return !!this.user;
  }

  private getUserRoles(): UserRole[] {
    return this.user?.roles || (this.user?.role ? [this.user.role] : []);
  }

  isOperatorRole(): boolean {
    const roles = this.getUserRoles();
    return roles.includes(UserRole.OPERATOR) || roles.includes(UserRole.SUPER_ADMIN);
  }

  private updateDisabledRoles(): void {
    const owned = this.getUserRoles();
    const pending = this.pendingRequests.flatMap((r) => r.requestedRoles || []);
    this.disabledRoles = new Set<UserRole>([...owned, ...pending]);
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.user = this.authService.currentUserValue;

    if (this.isAuthenticated) {
      this.loadRequests();
      if (this.isApprover()) {
        this.loadAllRequests();
      }
      setTimeout(() => {
        this.refreshProfile();
      }, 0);
    }
  }
}
