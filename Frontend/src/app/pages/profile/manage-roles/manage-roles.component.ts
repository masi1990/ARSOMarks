import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { RoleRequestService } from '../../../modules/auth/services/role-request.service';
import { RoleRequest, RoleRequestStatus, RoleRequestType, User, UserRole } from '../../../shared/models/user.model';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss'],
})
export class ManageRolesComponent implements OnInit {
  UserRole = UserRole;
  RoleRequestStatus = RoleRequestStatus;
  RoleRequestType = RoleRequestType;

  user: User | null = null;
  currentRoles: UserRole[] = [];
  selectableRoles: UserRole[] = [UserRole.CB_ADMIN, UserRole.CB_USER, UserRole.NSB_ADMIN, UserRole.NSB_USER, UserRole.ACCREDITATION_BODY];
  selectedAssign: Set<UserRole> = new Set<UserRole>();
  requests: RoleRequest[] = [];

  loading = false;
  submitting = false;
  error = '';
  success = '';

  constructor(private authService: AuthService, private roleRequestService: RoleRequestService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.currentRoles = this.user?.roles || (this.user?.role ? [this.user.role] : []);
    this.loadRequests();
  }

  toggleAssign(role: UserRole): void {
    if (this.selectedAssign.has(role)) {
      this.selectedAssign.delete(role);
    } else {
      this.selectedAssign.add(role);
    }
  }

  requestAssign(): void {
    this.error = '';
    this.success = '';
    if (!this.selectedAssign.size) {
      this.error = 'Select at least one role to request.';
      return;
    }
    this.submitting = true;
    this.roleRequestService
      .createRequest(Array.from(this.selectedAssign), undefined, RoleRequestType.ASSIGN)
      .subscribe({
        next: (res) => {
          this.success = 'Request submitted.';
          this.requests = [...(Array.isArray(res) ? res : [res]), ...this.requests];
          this.selectedAssign.clear();
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to submit request.';
        },
        complete: () => {
          this.submitting = false;
        },
      });
  }

  requestRemove(role: UserRole): void {
    this.error = '';
    this.success = '';
    this.submitting = true;
    this.roleRequestService
      .createRequest([role], undefined, RoleRequestType.REMOVE)
      .subscribe({
        next: (res) => {
          this.success = 'Removal request submitted.';
          this.requests = [...(Array.isArray(res) ? res : [res]), ...this.requests];
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to submit removal request.';
        },
        complete: () => {
          this.submitting = false;
        },
      });
  }

  loadRequests(): void {
    this.loading = true;
    this.authService.getMyRoleRequests().subscribe({
      next: (reqs) => {
        this.requests = reqs || [];
        this.loading = false;
      },
      error: () => {
        this.requests = [];
        this.loading = false;
      },
    });
  }

  hasRole(role: UserRole): boolean {
    return this.currentRoles.includes(role);
  }
}
