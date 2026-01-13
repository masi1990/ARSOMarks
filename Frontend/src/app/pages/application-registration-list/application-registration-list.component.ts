import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationRegistrationService } from '../../modules/application-registration/services/application-registration.service';
import {
  ApplicationRegistration,
  ApplicationRegistrationStatus,
} from '../../shared/models/application-registration.model';

@Component({
  selector: 'app-application-registration-list',
  templateUrl: './application-registration-list.component.html',
  styleUrls: ['./application-registration-list.component.scss'],
})
export class ApplicationRegistrationListComponent implements OnInit {
  applications: ApplicationRegistration[] = [];
  loading = false;
  error = '';

  constructor(
    private applicationRegistrationService: ApplicationRegistrationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.error = '';

    this.applicationRegistrationService.getMyApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load applications';
        this.loading = false;
      },
    });
  }

  getStatusBadgeClass(status: ApplicationRegistrationStatus): string {
    switch (status) {
      case ApplicationRegistrationStatus.DRAFT:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case ApplicationRegistrationStatus.SUBMITTED:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case ApplicationRegistrationStatus.APPROVED:
        return 'bg-green-100 text-green-800 border-green-300';
      case ApplicationRegistrationStatus.REJECTED:
        return 'bg-red-100 text-red-800 border-red-300';
      case ApplicationRegistrationStatus.UNDER_REVIEW:
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  getStatusLabel(status: ApplicationRegistrationStatus): string {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  getCompanyName(application: ApplicationRegistration): string {
    const appData = application as any;
    if (appData.companyInfo?.companyLegalName) {
      return appData.companyInfo.companyLegalName;
    }
    if (application.applicantName) {
      return application.applicantName;
    }
    return 'Unnamed Application';
  }

  getCompanyInfo(application: ApplicationRegistration): any {
    return (application as any).companyInfo || null;
  }

  getRegistrationNumber(application: ApplicationRegistration): string | null {
    const companyInfo = this.getCompanyInfo(application);
    return companyInfo?.registrationNumberBusiness || null;
  }

  getBusinessActivity(application: ApplicationRegistration): string | null {
    const companyInfo = this.getCompanyInfo(application);
    return companyInfo?.businessActivity || null;
  }

  getBusinessActivityPreview(application: ApplicationRegistration): string {
    const activity = this.getBusinessActivity(application);
    if (!activity) return '';
    if (activity.length > 150) {
      return activity.substring(0, 150) + '...';
    }
    return activity;
  }

  canEdit(application: ApplicationRegistration): boolean {
    return application.status === ApplicationRegistrationStatus.DRAFT;
  }

  editApplication(application: ApplicationRegistration): void {
    this.router.navigate(['/application-registration'], {
      queryParams: { id: application.id },
    });
  }

  createNewApplication(): void {
    this.router.navigate(['/application-registration']);
  }

  deleteApplication(application: ApplicationRegistration): void {
    if (!confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }

    this.applicationRegistrationService.deleteApplication(application.id).subscribe({
      next: () => {
        this.loadApplications();
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to delete application';
      },
    });
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

