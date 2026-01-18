import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { RoleReportData, ReportFilter } from '../../shared/models/dashboard.model';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-role-reports',
  templateUrl: './role-reports.component.html',
  styleUrls: ['./role-reports.component.scss'],
})
export class RoleReportsComponent implements OnInit, OnDestroy {
  UserRole = UserRole;
  roleOptions = Object.values(UserRole);
  selectedRole: UserRole = UserRole.SUPER_ADMIN;
  filters: Partial<ReportFilter> = { region: '', scheme: '' };
  data?: RoleReportData;
  loading = false;
  error = '';
  private sub?: Subscription;

  constructor(
    private analytics: AnalyticsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const roleParam = params.get('role') as UserRole | null;
      const resolvedRole = this.resolveRole(roleParam);
      if (resolvedRole !== this.selectedRole) {
        this.selectedRole = resolvedRole;
      }
      this.loadReport();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  canView(role: UserRole | string): boolean {
    const user = this.authService.currentUserValue;
    const userRoles = user?.roles || (user?.role ? [user.role] : []);
    return role === UserRole.SUPER_ADMIN || userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(role as UserRole);
  }

  onRoleChange(role: string): void {
    const casted = role as UserRole;
    if (!this.canView(casted)) return;
    this.router.navigate(['/portal/reports', casted.toLowerCase()]);
  }

  applyFilters(): void {
    this.loadReport();
  }

  exportCsv(): void {
    if (!this.data) return;
    const header = ['Label', 'Value', 'Status', 'Secondary'];
    const rows = this.data.rows.map((r) => [r.label, r.value, r.status || '', r.secondary || '']);
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.selectedRole.toLowerCase()}-report.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private loadReport(): void {
    this.error = '';
    this.loading = true;
    this.analytics.getReport(this.selectedRole, this.filters).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Unable to load report data.';
        this.loading = false;
      },
    });
  }

  private resolveRole(roleParam: UserRole | string | null): UserRole {
    if (roleParam && this.canView(roleParam)) {
      return roleParam as UserRole;
    }
    const user = this.authService.currentUserValue;
    const userRoles = (user?.roles || (user?.role ? [user.role] : [])) as UserRole[];
    if (userRoles.includes(UserRole.SUPER_ADMIN)) return UserRole.SUPER_ADMIN;
    return (userRoles[0] as UserRole) || UserRole.OPERATOR;
  }
}
