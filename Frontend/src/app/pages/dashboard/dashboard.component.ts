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
  allRequests: RoleRequest[] = [];
  loadingRequests = false;
  loadingAllRequests = false;
  submitting = false;
  submitError = '';
  submitSuccess = '';
  decisionError = '';
  decisionSuccess = '';
  note = '';
  selectedRoles: UserRole[] = [];
  decidingId: string | null = null;
  decisionNote: string = '';
  decidingRequestId: string | null = null;
  pendingAction: 'approve' | 'reject' | null = null;

  // Pagination for Approver Console
  approvalsPage = 1;
  readonly approvalsPageSize = 4;

  readonly roleOptions: { value: UserRole; label: string }[] = Object.values(UserRole).map((r) => ({
    value: r,
    label: r.replace(/_/g, ' '),
  }));

  constructor(private authService: AuthService) {}

  loadRequests(): void {
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
        },
        error: () => {
          this.roleRequests = [];
        },
      });
  }

  loadAllRequests(): void {
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

    if (!this.selectedRoles.length) {
      this.submitError = 'Select at least one role.';
      return;
    }

    const payload: CreateRoleRequest = {
      roles: this.selectedRoles,
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
          this.submitSuccess = 'Request submitted. You will be notified after review.';
          this.selectedRoles = [];
          this.note = '';
          this.roleRequests = [res, ...this.roleRequests];
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
    if (this.selectedRoles.includes(role)) {
      this.selectedRoles = this.selectedRoles.filter((r) => r !== role);
    } else {
      this.selectedRoles = [...this.selectedRoles, role];
    }
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
    const roles = this.user?.roles || (this.user?.role ? [this.user.role] : []);
    return roles.includes(UserRole.NSB_ADMIN) || roles.includes(UserRole.NSB_USER);
  }

  isOperator(): boolean {
    const roles = this.user?.roles || (this.user?.role ? [this.user.role] : []);
    return roles.includes(UserRole.OPERATOR) || roles.includes(UserRole.NSB_ADMIN) || roles.includes(UserRole.SUPER_ADMIN) || roles.includes(UserRole.PUBLIC);
  }

  isPublic(): boolean {
    const roles = this.user?.roles || (this.user?.role ? [this.user.role] : []);
    return roles.includes(UserRole.PUBLIC);
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.loadRequests();
    if (this.isApprover()) {
      this.loadAllRequests();
    }
    // Always refresh the profile to pick up latest roles (e.g., newly granted SUPER_ADMIN).
    // Use setTimeout to avoid blocking initial render
    setTimeout(() => {
      this.refreshProfile();
    }, 0);
  }
}
