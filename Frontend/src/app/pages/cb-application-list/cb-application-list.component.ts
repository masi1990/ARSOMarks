import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CbApplicationService } from '../../modules/cb-approval/services/cb-application.service';
import { CbApplication, CbApplicationStatus } from '../../shared/models/cb-application.model';

@Component({
  selector: 'app-cb-application-list',
  templateUrl: './cb-application-list.component.html',
  styleUrls: ['./cb-application-list.component.scss'],
})
export class CbApplicationListComponent implements OnInit {
  applications: CbApplication[] = [];
  loading = false;
  error = '';

  constructor(private cbService: CbApplicationService, private router: Router) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.cbService.getMyApplications().subscribe({
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

  getStatusBadgeClass(status: CbApplicationStatus): string {
    switch (status) {
      case CbApplicationStatus.DRAFT:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case CbApplicationStatus.SUBMITTED:
      case CbApplicationStatus.PROVISIONAL:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case CbApplicationStatus.APPROVED:
        return 'bg-green-100 text-green-800 border-green-300';
      case CbApplicationStatus.REJECTED:
        return 'bg-red-100 text-red-800 border-red-300';
      case CbApplicationStatus.UNDER_REVIEW:
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  getStatusLabel(status: CbApplicationStatus): string {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  editApplication(application: CbApplication): void {
    this.router.navigate(['/portal/cb/apply'], { queryParams: { id: application.id } });
  }

  createNewApplication(): void {
    this.router.navigate(['/portal/cb/apply']);
  }

  formatDate(date?: string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
