import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { DecideRoleRequest, RoleRequest, RoleRequestStatus, User, UserRole, AssignRolesRequest } from '../../shared/models/user.model';

@Component({
  selector: 'app-role-admin',
  templateUrl: './role-admin.component.html',
  styleUrls: ['./role-admin.component.scss'],
})
export class RoleAdminComponent implements OnInit {
  activeTab: 'requests' | 'users' = 'requests';

  // Requests Data
  requests: RoleRequest[] = [];
  loadingRequests = false;
  decidingId: string | null = null;
  decisionError = '';
  decisionSuccess = '';
  decisionNotes: Record<string, string> = {};

  // Users Data
  users: User[] = [];
  loadingUsers = false;
  usersError = '';

  // Role Assignment
  assigningRolesUserId: string | null = null;
  selectedRolesToAssign: UserRole[] = [];
  assignRolesNote = '';
  assignRolesError = '';
  assignRolesSuccess = '';
  
  readonly allRoleOptions: { value: UserRole; label: string }[] = Object.values(UserRole).map((r) => ({
    value: r,
    label: r.replace(/_/g, ' '),
  }));

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadUsers();
  }

  setActiveTab(tab: 'requests' | 'users'): void {
    this.activeTab = tab;
  }

  loadRequests(): void {
    this.loadingRequests = true;
    this.authService
      .listRoleRequests()
      .pipe(
        finalize(() => {
          this.loadingRequests = false;
        }),
      )
      .subscribe({
        next: (reqs) => {
          this.requests = reqs || [];
        },
        error: (err) => {
          this.requests = [];
          this.decisionError = err?.error?.message || 'Failed to load requests.';
        },
      });
  }

  loadUsers(): void {
    this.loadingUsers = true;
    this.authService
      .getAllUsers()
      .pipe(
        finalize(() => {
          this.loadingUsers = false;
        }),
      )
      .subscribe({
        next: (users) => {
          this.users = users || [];
        },
        error: (err) => {
          this.users = [];
          this.usersError = err?.error?.message || 'Failed to load users.';
        },
      });
  }

  decide(req: RoleRequest, status: RoleRequestStatus.APPROVED | RoleRequestStatus.REJECTED): void {
    this.decisionError = '';
    this.decisionSuccess = '';
    this.decidingId = req.id;

    const payload: DecideRoleRequest = {
      status,
      note: this.decisionNotes[req.id]?.trim() || undefined,
    };

    this.authService
      .decideRoleRequest(req.id, payload)
      .pipe(
        finalize(() => {
          this.decidingId = null;
        }),
      )
      .subscribe({
        next: (res) => {
          this.requests = this.requests.map((r) => (r.id === res.id ? res : r));
          this.decisionSuccess = `Request ${status.toLowerCase()}.`;
          // Refresh users list if approved to show updated roles
          if (status === RoleRequestStatus.APPROVED) {
            this.loadUsers();
          }
        },
        error: (err) => {
          this.decisionError = err?.error?.message || 'Action failed.';
        },
      });
  }

  formatRole(role: UserRole | string | null | undefined): string {
    return (role || '').toString().replace(/_/g, ' ') || 'N/A';
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

  openAssignRolesModal(user: User): void {
    this.assigningRolesUserId = user.id;
    this.selectedRolesToAssign = [];
    this.assignRolesNote = '';
    this.assignRolesError = '';
    this.assignRolesSuccess = '';
  }

  closeAssignRolesModal(): void {
    this.assigningRolesUserId = null;
    this.selectedRolesToAssign = [];
    this.assignRolesNote = '';
    this.assignRolesError = '';
    this.assignRolesSuccess = '';
  }

  toggleRoleSelection(role: UserRole): void {
    if (this.selectedRolesToAssign.includes(role)) {
      this.selectedRolesToAssign = this.selectedRolesToAssign.filter((r) => r !== role);
    } else {
      this.selectedRolesToAssign = [...this.selectedRolesToAssign, role];
    }
  }

  isRoleSelected(role: UserRole): boolean {
    return this.selectedRolesToAssign.includes(role);
  }

  assignRoles(): void {
    if (!this.assigningRolesUserId) {
      return;
    }

    if (this.selectedRolesToAssign.length === 0) {
      this.assignRolesError = 'Select at least one role to assign.';
      return;
    }

    this.assignRolesError = '';
    this.assignRolesSuccess = '';

    const payload: AssignRolesRequest = {
      roles: this.selectedRolesToAssign,
      note: this.assignRolesNote?.trim() || undefined,
    };

    this.authService
      .assignRolesToUser(this.assigningRolesUserId, payload)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (updatedUser) => {
          this.assignRolesSuccess = 'Roles assigned successfully.';
          // Update user in the list
          this.users = this.users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
          // Close modal after a short delay
          setTimeout(() => {
            this.closeAssignRolesModal();
            // Clear success message
            setTimeout(() => {
              this.assignRolesSuccess = '';
            }, 3000);
          }, 1000);
        },
        error: (err) => {
          this.assignRolesError = err?.error?.message || 'Failed to assign roles.';
        },
      });
  }

  getUserCurrentRoles(user: User): UserRole[] {
    return user.roles && user.roles.length > 0 ? user.roles : (user.role ? [user.role] : []);
  }

  getCurrentEditingUser(): User | null {
    if (!this.assigningRolesUserId) {
      return null;
    }
    return this.users.find((u) => u.id === this.assigningRolesUserId) || null;
  }

  getCurrentEditingUserRoles(): string {
    const user = this.getCurrentEditingUser();
    if (!user) {
      return 'None';
    }
    return this.formatRolesList(this.getUserCurrentRoles(user));
  }
}

