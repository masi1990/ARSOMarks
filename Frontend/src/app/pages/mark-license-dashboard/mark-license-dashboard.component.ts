import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MarkLicenseDashboardService } from '../../modules/mark-licensing/services/mark-license-dashboard.service';
import { MarkLicenseApplicationService } from '../../modules/mark-licensing/services/mark-license-application.service';
import { MarkLicenseAgreementService } from '../../modules/mark-licensing/services/mark-license-agreement.service';
import { MarkUsageReportService } from '../../modules/mark-licensing/services/mark-usage-report.service';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import {
  DashboardOverview,
  DashboardAnalytics,
  DashboardCalendar,
  MarkLicenseApplication,
  MarkLicenseAgreement,
} from '../../shared/models/mark-license.model';
import { Nsb } from '../../shared/models/nsb.model';

@Component({
  selector: 'app-mark-license-dashboard',
  templateUrl: './mark-license-dashboard.component.html',
  styleUrls: ['./mark-license-dashboard.component.scss'],
})
export class MarkLicenseDashboardComponent implements OnInit {
  loading = false;
  error = '';
  nsb: Nsb | null = null;
  nsbId: string | null = null;

  // Dashboard data
  overview: DashboardOverview | null = null;
  analytics: DashboardAnalytics | null = null;
  calendar: DashboardCalendar | null = null;

  // Selected view
  activeView: 'overview' | 'analytics' | 'calendar' = 'overview';

  constructor(
    private dashboardService: MarkLicenseDashboardService,
    private applicationService: MarkLicenseApplicationService,
    private agreementService: MarkLicenseAgreementService,
    private reportService: MarkUsageReportService,
    private nsbService: NsbService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadNsb();
  }

  loadNsb(): void {
    this.loading = true;
    this.nsbService
      .getMyNsb()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsb = nsb;
          this.nsbId = nsb.id;
          this.loadDashboardData();
        },
        error: () => {
          this.error = 'Failed to load NSB information. Please ensure you have an NSB profile.';
        },
      });
  }

  loadDashboardData(): void {
    if (!this.nsbId) return;

    this.loading = true;
    this.error = '';

    // Load all dashboard data in parallel
    Promise.all([
      this.dashboardService.getOverview(this.nsbId).toPromise(),
      this.dashboardService.getAnalytics(this.nsbId).toPromise(),
      this.dashboardService.getCalendar(this.nsbId).toPromise(),
    ])
      .then(([overview, analytics, calendar]) => {
        this.overview = overview || null;
        this.analytics = analytics || null;
        this.calendar = calendar || null;
        this.loading = false;
      })
      .catch((err) => {
        this.error = err.error?.message || 'Failed to load dashboard data.';
        this.loading = false;
      });
  }

  setActiveView(view: 'overview' | 'analytics' | 'calendar'): void {
    this.activeView = view;
  }

  // Navigation helpers
  viewApplication(id: string): void {
    this.router.navigate(['/mark-licenses/apply'], { queryParams: { id } });
  }

  viewAgreement(id: string): void {
    this.router.navigate(['/mark-licenses/agreements', id]);
  }

  createApplication(): void {
    this.router.navigate(['/mark-licenses/apply']);
  }

  createReport(licenseId: string): void {
    this.router.navigate(['/mark-licenses/reports/new', licenseId]);
  }

  requestModification(licenseId: string): void {
    this.router.navigate(['/mark-licenses/modifications/new', licenseId]);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
      case 'EXECUTED':
        return 'bg-emerald-100 text-emerald-800';
      case 'DRAFT':
        return 'bg-slate-100 text-slate-800';
      case 'SUBMITTED':
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getUrgencyClass(days: number): string {
    if (days <= 7) return 'text-red-600 font-bold';
    if (days <= 30) return 'text-amber-600 font-semibold';
    return 'text-slate-600';
  }

  calculateDaysUntil(dateString: string): number {
    if (!dateString) return 0;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getMaxMediaValue(): number {
    if (!this.analytics?.mediaTypeBreakdown) return 1;
    return Math.max(...Object.values(this.analytics.mediaTypeBreakdown));
  }
}

