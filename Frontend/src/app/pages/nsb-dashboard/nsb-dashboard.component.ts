import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NsbRegistrationRequestService } from '../../modules/nsb-management/services/nsb-registration-request.service';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import {
  NsbRegistrationRequest,
  NsbRegistrationRequestStatus,
} from '../../shared/models/nsb-registration-request.model';
import { Nsb } from '../../shared/models/nsb.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-nsb-dashboard',
  templateUrl: './nsb-dashboard.component.html',
  styleUrls: ['./nsb-dashboard.component.scss'],
})
export class NsbDashboardComponent implements OnInit {
  loading = false;
  error = '';
  user: User | null = null;
  registrationRequest: NsbRegistrationRequest | null = null;
  nsb: Nsb | null = null;

  constructor(
    private router: Router,
    private requestService: NsbRegistrationRequestService,
    private nsbService: NsbService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    // Load registration request if user has countryId
    if (this.user?.countryId) {
      this.requestService
        .getMyRequest(this.user.countryId)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe({
          next: (request) => {
            this.registrationRequest = request;
            // If approved, load NSB
            if (request?.status === NsbRegistrationRequestStatus.APPROVED && request.nsbId) {
              this.loadNsb(request.nsbId);
            }
          },
          error: (err) => {
            // No request found is OK
            if (err.status !== 404) {
              this.error = 'Failed to load registration request.';
            }
          },
        });
    } else {
      this.loading = false;
    }

    // Also try to load NSB directly (for users who already have NSB)
    this.nsbService
      .getMyNsb()
      .pipe(
        finalize(() => {
          // Don't set loading to false here, let the request loading handle it
        }),
      )
      .subscribe({
        next: (nsb) => {
          this.nsb = nsb;
        },
        error: () => {
          // No NSB found is OK
        },
      });
  }

  loadNsb(nsbId: string): void {
    this.nsbService.getNsbById(nsbId).subscribe({
      next: (nsb) => {
        this.nsb = nsb;
      },
      error: () => {
        // Error loading NSB
      },
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'DRAFT':
        return 'bg-slate-100 text-slate-700';
      case 'SUBMITTED':
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-700';
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'DRAFT':
        return 'Draft';
      case 'SUBMITTED':
        return 'Submitted for Review';
      case 'UNDER_REVIEW':
        return 'Under Review';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      default:
        return status;
    }
  }

  goToRegistrationRequest(): void {
    this.router.navigate(['/nsb-registration/request']);
  }

  goToProfileSetup(): void {
    this.router.navigate(['/nsb/profile-setup']);
  }

  goToStakeholderRegistry(): void {
    this.router.navigate(['/nsb/stakeholder-registry']);
  }

  canCompleteProfile(): boolean {
    return (
      this.registrationRequest?.status === NsbRegistrationRequestStatus.APPROVED && !this.nsb
    );
  }

  canEditRegistrationRequest(): boolean {
    return this.registrationRequest?.status === NsbRegistrationRequestStatus.DRAFT;
  }

  canSubmitRegistrationRequest(): boolean {
    return this.registrationRequest?.status === NsbRegistrationRequestStatus.DRAFT;
  }
}

