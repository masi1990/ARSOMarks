import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MarkLicenseApplicationService } from 'src/app/modules/mark-licensing/services/mark-license-application.service';
import { NsbService } from 'src/app/modules/nsb-management/services/nsb.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MarkLicenseApplication, MarkLicenseStatus } from 'src/app/shared/models/mark-license.model';
import { UserRole } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-mark-license-dashboard',
  templateUrl: './mark-license-dashboard.component.html',
  styleUrls: ['./mark-license-dashboard.component.scss']
})
export class MarkLicenseDashboardComponent implements OnInit {
  activeTab: 'applications' | 'approved' | 'approvals' = 'applications';
  loading = false;
  error = '';
  nsbId: string | null = null;
  isAdminUser = false;
  processingId: string | null = null;
  processingAction: 'approve' | 'reject' | null = null;
  selectedApplication: MarkLicenseApplication | null = null;
  viewLoading = false;
  viewError = '';
  applications: Array<{
    id: string;
    submittedAt?: string;
    type?: string;
    status?: string;
    applicationNumber?: string;
  }> = [];
  approvedLicenses: Array<{
    licenseNo: string;
    validFrom: string;
    validTo: string;
    type: string;
    downloadUrl?: string;
  }> = [];

  constructor(
    private licenseService: MarkLicenseApplicationService,
    private nsbService: NsbService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    const roles = user?.roles || (user?.role ? [user.role] : []);
    this.isAdminUser = roles.includes(UserRole.SUPER_ADMIN) || roles.includes(UserRole.ARSO_SECRETARIAT);
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.error = '';
    if (this.isAdminUser) {
      this.fetchAllApplications();
      return;
    }

    this.nsbService
      .getMyNsb()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsbId = nsb?.id || null;
          if (!this.nsbId) {
            this.applications = [];
            return;
          }
          this.fetchApplications(this.nsbId);
        },
        error: () => {
          this.loading = false;
          this.error = 'Unable to load NSB details.';
          this.applications = [];
        },
      });
  }

  private fetchApplications(nsbId: string): void {
    this.loading = true;
    this.licenseService.getApplicationsByNsb(nsbId, true).pipe(finalize(() => {
      this.loading = false;
    })).subscribe({
      next: (applications) => {
        const filtered = (applications || []).filter((app) => app.status !== MarkLicenseStatus.DRAFT);
        this.applications = filtered.map((app) => this.mapApplication(app));
      },
      error: () => {
        this.error = 'Unable to load applications.';
        this.applications = [];
      },
    });
  }

  private fetchAllApplications(): void {
    this.loading = true;
    this.licenseService.getAllApplications(true).pipe(finalize(() => {
      this.loading = false;
    })).subscribe({
      next: (applications) => {
        const filtered = (applications || []).filter((app) => app.status !== MarkLicenseStatus.DRAFT);
        this.applications = filtered.map((app) => this.mapApplication(app));
      },
      error: () => {
        this.error = 'Unable to load applications.';
        this.applications = [];
      },
    });
  }

  private mapApplication(app: MarkLicenseApplication) {
    return {
      id: app.id,
      applicationNumber: app.applicationNumber,
      submittedAt: app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : undefined,
      type: app.licenseTypes?.length ? app.licenseTypes.join(', ') : undefined,
      status: app.status,
    };
  }

  get approvalRequests() {
    return this.applications.filter((application) =>
      application.status === MarkLicenseStatus.SUBMITTED ||
      application.status === MarkLicenseStatus.UNDER_REVIEW,
    );
  }

  approveApplication(applicationId: string): void {
    if (!applicationId || this.processingId) {
      return;
    }
    this.processingId = applicationId;
    this.processingAction = 'approve';
    this.licenseService.approveApplication(applicationId).pipe(finalize(() => {
      this.processingId = null;
      this.processingAction = null;
    })).subscribe({
      next: (application) => {
        this.applications = this.applications.map((item) => item.id === applicationId
          ? { ...item, status: application.status }
          : item,
        );
      },
      error: () => {
        this.error = 'Unable to approve application.';
      },
    });
  }

  rejectApplication(applicationId: string): void {
    if (!applicationId || this.processingId) {
      return;
    }
    const reason = window.prompt('Reason for rejection (optional):', '') || undefined;
    this.processingId = applicationId;
    this.processingAction = 'reject';
    this.licenseService.rejectApplication(applicationId, reason).pipe(finalize(() => {
      this.processingId = null;
      this.processingAction = null;
    })).subscribe({
      next: (application) => {
        this.applications = this.applications.map((item) => item.id === applicationId
          ? { ...item, status: application.status }
          : item,
        );
      },
      error: () => {
        this.error = 'Unable to reject application.';
      },
    });
  }

  viewApplication(applicationId: string): void {
    if (!applicationId) {
      return;
    }
    this.viewLoading = true;
    this.viewError = '';
    this.selectedApplication = null;
    this.licenseService.getApplicationById(applicationId).pipe(finalize(() => {
      this.viewLoading = false;
    })).subscribe({
      next: (application) => {
        this.selectedApplication = application;
      },
      error: () => {
        this.viewError = 'Unable to load application details.';
      },
    });
  }

  closeApplicationModal(): void {
    this.selectedApplication = null;
    this.viewError = '';
    this.viewLoading = false;
  }

  downloadCertificate(application: MarkLicenseApplication): void {
    const html = this.buildCertificateHtml(application);
    const win = window.open('', '_blank');
    if (!win) {
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
    }, 300);
  }

  private buildCertificateHtml(application: MarkLicenseApplication): string {
    const submittedAt = application.submittedAt || application.createdAt;
    const submittedLabel = submittedAt ? new Date(submittedAt).toLocaleString() : 'N/A';
    const validFrom = application.approvedAt || submittedAt || application.createdAt;
    const validFromLabel = validFrom ? new Date(validFrom).toLocaleDateString() : 'N/A';
    const validToLabel = this.getValidityEndLabel(validFrom, application.licenseDuration);
    const marks = (application.marksRequested || []).join(', ') || 'N/A';
    const schemes = (application.markLanguages || []).join(', ') || 'N/A';
    const requirements = (application.markColorsNeeded || []).join(', ') || 'N/A';

    return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Mark License Certificate</title>
    <style>
      @page { size: landscape; margin: 24mm; }
      body { font-family: Arial, sans-serif; color: #111827; }
      .page { border: 2px solid #111827; padding: 24px; }
      .header { text-align: center; margin-bottom: 24px; }
      .title { font-size: 28px; font-weight: bold; letter-spacing: 2px; }
      .subtitle { font-size: 14px; margin-top: 6px; color: #374151; }
      .section { margin-top: 18px; }
      .section h3 { font-size: 14px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; }
      .label { font-weight: bold; color: #374151; }
      .value { color: #111827; }
      .list { margin: 6px 0 0; padding-left: 18px; font-size: 13px; }
      .footer { margin-top: 20px; font-size: 12px; color: #374151; }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="header">
        <div class="title">ARSO Mark License Certificate</div>
        <div class="subtitle">Template - Final design to be confirmed</div>
      </div>

      <div class="section">
        <h3>License Details</h3>
        <div class="grid">
          <div><span class="label">Certificate Reference:</span> <span class="value">${application.applicationNumber || 'Pending'}</span></div>
          <div><span class="label">Status:</span> <span class="value">${application.status}</span></div>
          <div><span class="label">Valid From:</span> <span class="value">${validFromLabel}</span></div>
          <div><span class="label">Valid To:</span> <span class="value">${validToLabel}</span></div>
        </div>
      </div>

      <div class="section">
        <h3>Applicant Information</h3>
        <div class="grid">
          <div><span class="label">NSB:</span> <span class="value">${application.nsbApplicantName}</span></div>
          <div><span class="label">Submitted By:</span> <span class="value">${application.declarationSignatory}</span></div>
          <div><span class="label">Email:</span> <span class="value">${application.signatoryEmail}</span></div>
          <div><span class="label">Submitted On:</span> <span class="value">${submittedLabel}</span></div>
        </div>
      </div>

      <div class="section">
        <h3>Marks, Schemes, Requirements</h3>
        <div class="grid">
          <div><span class="label">Marks Applied For:</span> <span class="value">${marks}</span></div>
          <div><span class="label">Schemes:</span> <span class="value">${schemes}</span></div>
          <div><span class="label">Requirements:</span> <span class="value">${requirements}</span></div>
        </div>
      </div>

      <div class="section">
        <h3>Standard Requirements (Summary)</h3>
        <ul class="list">
          <li>ACAP 1-1:2025 - Application completeness and compliance requirements.</li>
          <li>ACAP 1-3:2025 - Applicant CB registration and documentation readiness.</li>
          <li>ISO/IEC 17065:2012 - Certification process, impartiality, and control of marks.</li>
        </ul>
      </div>

      <div class="footer">
        <div>This certificate is issued under ARSO Mark Licensing guidelines.</div>
        <div>Template version - details subject to verification and final agreement execution.</div>
      </div>
    </div>
  </body>
</html>
    `.trim();
  }

  private getValidityEndLabel(validFrom: string | undefined, duration: string): string {
    if (!validFrom) {
      return 'N/A';
    }
    const start = new Date(validFrom);
    let yearsToAdd = 1;
    if (duration === 'TWO_YEARS') {
      yearsToAdd = 2;
    } else if (duration === 'THREE_YEARS') {
      yearsToAdd = 3;
    } else if (duration === 'PROJECT_BASED') {
      return 'Project-based';
    } else if (duration === 'OTHER') {
      return 'To be defined';
    }
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + yearsToAdd);
    return end.toLocaleDateString();
  }
}
