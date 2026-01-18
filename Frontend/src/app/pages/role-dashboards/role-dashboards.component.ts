import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../shared/models/user.model';
import { RoleDashboardData } from '../../shared/models/dashboard.model';

@Component({
  selector: 'app-role-dashboards',
  templateUrl: './role-dashboards.component.html',
  styleUrls: ['./role-dashboards.component.scss'],
})
export class RoleDashboardsComponent implements OnInit, OnDestroy {
  UserRole = UserRole;
  roleOptions = Object.values(UserRole);
  selectedRole: UserRole = UserRole.SUPER_ADMIN;
  data?: RoleDashboardData;
  loading = false;
  error = '';
  region = '';
  scheme = '';
  timeframe = '90d';
  timeframes = ['30d', '90d', '180d'];
  steps: string[] = [];
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
      this.loadDashboard();
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
    this.router.navigate(['/portal/dashboards', casted.toLowerCase()]);
  }

  applyFilters(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.error = '';
    this.loading = true;
    this.analytics
      .getDashboard(this.selectedRole, {
        region: this.region,
        scheme: this.scheme,
        timeframe: this.timeframe,
      })
      .subscribe({
        next: (data) => {
          this.data = data;
          this.steps = this.getStepHints(this.selectedRole);
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.error?.message || 'Unable to load dashboard data.';
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

  private getStepHints(role: UserRole): string[] {
    const shared = ['Review alerts and pending actions', 'Drill into breakdowns by region and scheme'];
    const map: Partial<Record<UserRole, string[]>> = {
      [UserRole.SUPER_ADMIN]: ['Switch roles to audit coverage', 'Export reports where needed', ...shared],
      [UserRole.ARSO_COUNCIL]: ['Review strategic KPIs', 'Approve schemes/policies requiring action', ...shared],
      [UserRole.CACO_MEMBER]: ['Validate scheme queue', 'Check IAF MD 25 alignment flags', ...shared],
      [UserRole.ARSO_SECRETARIAT]: ['Check system health & audit logs', 'Review pending approvals and payments', ...shared],
      [UserRole.ADVISORY_COMMITTEE]: ['Address conflict resolution queue', 'Record advisory outcomes', ...shared],
      [UserRole.SMC_MEMBER]: ['Track harmonization progress', 'Log SHP-01 compliance notes', ...shared],
      [UserRole.NSB_ADMIN]: ['Check operator registry progress', 'Monitor CB oversight items', ...shared],
      [UserRole.NSB_USER]: ['Work through assigned tasks', 'Complete operator registrations', ...shared],
      [UserRole.CB_ADMIN]: ['Check audit schedule', 'Prioritize certificates expiring soon', ...shared],
      [UserRole.CB_USER]: ['Complete assigned audits/checklists', 'Upload evidence and reports', ...shared],
      [UserRole.OPERATOR]: ['Check certificate status and NCs', 'Submit docs/self-audits on time', ...shared],
      [UserRole.ACCREDITATION_BODY]: ['Review CB scopes and surveillance schedule', 'Track AFRAC MRA compliance alerts', ...shared],
      [UserRole.PUBLIC]: ['Browse certified products', 'Submit public complaints if needed', ...shared],
    };
    return map[role] || shared;
  }
}
