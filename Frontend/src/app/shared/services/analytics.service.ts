import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserRole } from '../models/user.model';
import {
  AlertItem,
  KpiMetric,
  PendingAction,
  ReportFilter,
  RoleDashboardData,
  RoleReportData,
  TrendPoint,
  TrendSeries,
} from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly baseUrl = `${environment.apiBase}/analytics`;

  constructor(private http: HttpClient) {}

  getDashboard(role: UserRole, filters?: Partial<ReportFilter>) {
    const params = this.buildParams({ ...filters, role });
    const url = `${this.baseUrl}/dashboards/${role.toLowerCase()}`;
    return this.http.get<RoleDashboardData>(url, { params }).pipe(catchError(() => of(this.fallbackDashboard(role))));
  }

  getReport(role: UserRole, filters?: Partial<ReportFilter>) {
    const params = this.buildParams({ ...filters, role });
    const url = `${this.baseUrl}/reports/${role.toLowerCase()}`;
    return this.http.get<RoleReportData>(url, { params }).pipe(catchError(() => of(this.fallbackReport(role))));
  }

  private buildParams(filters?: Partial<ReportFilter>): HttpParams {
    let params = new HttpParams();
    if (!filters) return params;
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return params;
  }

  private fallbackDashboard(role: UserRole): RoleDashboardData {
    const kpis: KpiMetric[] = [
      { id: 'active', label: 'Active', value: 124, trend: { direction: 'up', change: 8, period: '30d' } },
      { id: 'pending', label: 'Pending', value: 32, trend: { direction: 'down', change: 4, period: '30d' } },
      { id: 'expiring', label: 'Expiring <60d', value: 14, helperText: 'Prioritize renewals' },
      { id: 'alerts', label: 'Open Alerts', value: 7, trend: { direction: 'up', change: 2, period: '7d' } },
    ];

    const trends: TrendSeries[] = [
      {
        id: 'volume',
        label: 'Volume over time',
        points: this.buildTrendPoints(),
      },
      {
        id: 'sla',
        label: 'SLA adherence',
        points: this.buildTrendPoints(90),
      },
    ];

    const alerts: AlertItem[] = [
      { id: 'a1', title: 'Renewals approaching', severity: 'warning', description: '14 certificates expire in <60 days' },
      { id: 'a2', title: 'Open complaints', severity: 'critical', description: '5 complaints unresolved > 15 days' },
    ];

    const pending: PendingAction[] = [
      { id: 'p1', title: 'Applications to review', description: '9 awaiting decision', status: 'pending' },
      { id: 'p2', title: 'Audits to schedule', description: '3 audits missing dates', status: 'in_progress' },
    ];

    return {
      role,
      kpis,
      trends,
      alerts,
      pending,
      breakdowns: [
        { id: 'b1', label: 'By region', value: 42, extra: 'EA' },
        { id: 'b2', label: 'By scheme', value: 58, extra: 'Mark' },
      ],
    };
  }

  private fallbackReport(role: UserRole): RoleReportData {
    const summary: KpiMetric[] = [
      { id: 'total', label: 'Total records', value: 240 },
      { id: 'completed', label: 'Completed', value: 180, trend: { direction: 'up', change: 6, period: '30d' } },
      { id: 'open', label: 'Open items', value: 24 },
    ];

    return {
      role,
      summary,
      rows: [
        { label: 'Pending approvals', value: 12, status: 'pending' },
        { label: 'In review', value: 8, status: 'in_progress' },
        { label: 'Closed this month', value: 36, status: 'done' },
      ],
      trends: [
        { id: 'trend', label: 'Throughput', points: this.buildTrendPoints(50) },
      ],
    };
  }

  private buildTrendPoints(base = 120): TrendPoint[] {
    const today = new Date();
    return Array.from({ length: 6 }).map((_, idx) => {
      const d = new Date(today);
      d.setMonth(d.getMonth() - (5 - idx));
      return {
        label: d.toLocaleDateString('en-US', { month: 'short' }),
        value: Math.max(5, Math.round(base + Math.random() * 20 - 10)),
      };
    });
  }
}
