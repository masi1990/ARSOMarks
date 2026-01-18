import { UserRole } from './user.model';

export interface KpiMetric {
  id: string;
  label: string;
  value: number | string;
  trend?: {
    direction: 'up' | 'down' | 'flat';
    change: number;
    period: string;
  };
  helperText?: string;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface TrendSeries {
  id: string;
  label: string;
  points: TrendPoint[];
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'info' | 'warning' | 'critical';
  description: string;
  cta?: string;
}

export interface PendingAction {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  owner?: string;
  status?: 'pending' | 'in_progress' | 'blocked';
}

export interface Breakdown {
  id: string;
  label: string;
  value: number;
  extra?: string;
}

export interface RoleDashboardData {
  role: UserRole;
  kpis: KpiMetric[];
  trends: TrendSeries[];
  alerts: AlertItem[];
  pending: PendingAction[];
  breakdowns: Breakdown[];
}

export interface ReportFilter {
  role: UserRole;
  region?: string;
  scheme?: string;
  startDate?: string;
  endDate?: string;
  timeframe?: string;
}

export interface ReportRow {
  label: string;
  value: number | string;
  secondary?: string;
  status?: string;
}

export interface RoleReportData {
  role: UserRole;
  summary: KpiMetric[];
  rows: ReportRow[];
  trends?: TrendSeries[];
}
