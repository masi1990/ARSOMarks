import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { RoleRequestService } from '../../modules/auth/services/role-request.service';
import { RoleRequest, RoleRequestStatus, User, UserRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-role-dashboards',
  templateUrl: './role-dashboards.component.html',
  styleUrls: ['./role-dashboards.component.scss'],
})
export class RoleDashboardsComponent implements OnInit {
  UserRole = UserRole;
  RoleRequestStatus = RoleRequestStatus;

  user: User | null = null;
  pendingRequests: RoleRequest[] = [];
  selectedRoles: Set<UserRole> = new Set<UserRole>();
  disabledRoles: Set<UserRole> = new Set<UserRole>();

  loading = false;
  submitting = false;
  submitError = '';
  submitSuccess = '';

  sidebarLinks = [
    { label: 'Traceability', description: 'Verify a product instantly by QR/ID', route: '/traceability' },
    { label: 'Complaints', description: 'Raise quality or mark misuse cases', route: '/complaints' },
    { label: 'Registry', description: 'Search certified products by brand/standard', route: '/' },
    { label: 'Help Center', description: 'Guides on roles and onboarding', route: '/' },
  ];

  roleCards: Array<{ role: UserRole; title: string; blurb: string; badge: string }> = [
    {
      role: UserRole.OPERATOR,
      title: 'Manufacturer / Operator',
      blurb: 'Request marks, manage products, track certifications.',
      badge: 'Producers & Operators',
    },
    {
      role: UserRole.CB_ADMIN,
      title: 'Certification Body',
      blurb: 'Plan audits, issue CoCs, oversee certificate lifecycle.',
      badge: 'CB / Laboratory',
    },
    {
      role: UserRole.NSB_ADMIN,
      title: 'National Standards Body',
      blurb: 'Coordinate approvals, registry oversight, market surveillance.',
      badge: 'NSB',
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly roleRequestService: RoleRequestService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

    if (this.redirectIfSpecialized()) {
      return;
    }

    this.refreshProfile();
    this.loadMyRequests();
  }

  toggleRole(role: UserRole): void {
    if (this.disabledRoles.has(role)) {
      return;
    }
    if (this.selectedRoles.has(role)) {
      this.selectedRoles.delete(role);
    } else {
      this.selectedRoles.add(role);
    }
  }

  isSelected(role: UserRole): boolean {
    return this.selectedRoles.has(role);
  }

  clearSelection(): void {
    this.selectedRoles = new Set<UserRole>();
  }

  submitRequests(): void {
    this.submitError = '';
    this.submitSuccess = '';

    if (!this.selectedRoles.size) {
      this.submitError = 'Select at least one role to request.';
      return;
    }

    const requestedRoles = Array.from(this.selectedRoles);
    this.submitting = true;

    this.roleRequestService.createRequest(requestedRoles).subscribe({
      next: (created) => {
        const createdList = created || [];
        this.pendingRequests = [...createdList, ...this.pendingRequests];
        this.selectedRoles = new Set<UserRole>();
        this.submitSuccess = 'Requests submitted. We will notify you once reviewed.';
        this.updateDisabledRoles();
      },
      error: (err) => {
        this.submitError = err?.error?.message || 'Failed to submit your requests.';
      },
      complete: () => {
        this.submitting = false;
      },
    });
  }

  refreshPending(): void {
    this.loadMyRequests();
  }

  hasPendingFor(role: UserRole): boolean {
    return this.pendingRequests.some(
      (req) => req.status === RoleRequestStatus.PENDING && req.requestedRoles.includes(role),
    );
  }

  private loadMyRequests(): void {
    this.loading = true;
    this.roleRequestService.getMyRequests().subscribe({
      next: (requests) => {
        this.pendingRequests = (requests || []).filter((r) => r.status === RoleRequestStatus.PENDING);
        this.updateDisabledRoles();
        this.loading = false;
      },
      error: () => {
        this.pendingRequests = [];
        this.updateDisabledRoles();
        this.loading = false;
      },
    });
  }

  private refreshProfile(): void {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        if (!this.redirectIfSpecialized()) {
          this.updateDisabledRoles();
        }
      },
      error: () => {
        // Ignore profile errors here to keep the public dashboard accessible.
      },
    });
  }

  private redirectIfSpecialized(): boolean {
    const roles = this.getUserRoles();
    const nonPublicRoles = roles.filter((role) => role !== UserRole.PUBLIC);
    if (!nonPublicRoles.length) {
      return false;
    }

    if (nonPublicRoles.includes(UserRole.NSB_ADMIN) || nonPublicRoles.includes(UserRole.NSB_USER)) {
      this.router.navigate(['/portal/nsb/dashboard']);
      return true;
    }

    // Default to the main portal dashboard for all other specialized roles.
    this.router.navigate(['/portal/dashboard']);
    return true;
  }

  private updateDisabledRoles(): void {
    const ownedRoles = this.getUserRoles();
    const pendingRoles = this.pendingRequests.flatMap((r) => r.requestedRoles || []);
    this.disabledRoles = new Set<UserRole>([...ownedRoles, ...pendingRoles]);
  }

  private getUserRoles(): UserRole[] {
    return this.user?.roles || (this.user?.role ? [this.user.role] : []);
  }
}
