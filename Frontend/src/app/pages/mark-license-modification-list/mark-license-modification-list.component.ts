import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MarkLicenseAgreementService } from '../../modules/mark-licensing/services/mark-license-agreement.service';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { MarkLicenseAgreement, AgreementStatus } from '../../shared/models/mark-license.model';
import { Nsb } from '../../shared/models/nsb.model';

@Component({
  selector: 'app-mark-license-modification-list',
  templateUrl: './mark-license-modification-list.component.html',
  styleUrls: ['./mark-license-modification-list.component.scss'],
})
export class MarkLicenseModificationListComponent implements OnInit {
  loading = false;
  error = '';
  agreements: MarkLicenseAgreement[] = [];
  nsb: Nsb | null = null;
  nsbId: string | null = null;

  // Filter
  statusFilter: AgreementStatus | 'ALL' = 'ALL';

  constructor(
    private agreementService: MarkLicenseAgreementService,
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
          if (nsb) {
            this.nsb = nsb;
            this.nsbId = nsb.id;
            this.loadAgreements();
          } else {
            this.error = 'NSB information not found. Please ensure you have an NSB profile.';
          }
        },
        error: () => {
          this.error = 'Failed to load NSB information. Please ensure you have an NSB profile.';
        },
      });
  }

  loadAgreements(): void {
    if (!this.nsbId) return;

    this.loading = true;
    this.error = '';
    this.agreementService
      .getActiveAgreementsByNsb(this.nsbId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (agreements) => {
          this.agreements = agreements || [];
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load license agreements.';
          this.agreements = [];
        },
      });
  }

  get filteredAgreements(): MarkLicenseAgreement[] {
    if (this.statusFilter === 'ALL') {
      return this.agreements;
    }
    return this.agreements.filter((agreement) => agreement.agreementStatus === this.statusFilter);
  }

  requestModification(agreementId: string): void {
    // Use the agreement ID as the license ID for the modification request
    this.router.navigate(['/portal/mark-licenses/modifications/new', agreementId]);
  }

  viewAgreement(agreementId: string): void {
    this.router.navigate(['/portal/mark-licenses/agreements', agreementId]);
  }

  getStatusBadgeClass(status: AgreementStatus | string): string {
    switch (status) {
      case AgreementStatus.EXECUTED:
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-800';
      case AgreementStatus.PENDING_NSB:
      case AgreementStatus.PENDING_ARSO:
        return 'bg-amber-100 text-amber-800';
      case AgreementStatus.DRAFT:
        return 'bg-slate-100 text-slate-800';
      case AgreementStatus.ARCHIVED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getDaysUntilExpiry(endDate: string): number {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getUrgencyClass(days: number): string {
    if (days < 0) return 'text-red-600 font-semibold';
    if (days <= 30) return 'text-amber-600 font-semibold';
    return 'text-slate-600';
  }
}

