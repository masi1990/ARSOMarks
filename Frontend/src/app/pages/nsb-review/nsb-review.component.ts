import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { NsbRegistrationRequestService } from '../../modules/nsb-management/services/nsb-registration-request.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import {
  NsbRegistrationRequest,
  NsbRegistrationRequestStatus,
  NsbRegistrationRequestDocument,
} from '../../shared/models/nsb-registration-request.model';
import { UserRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-nsb-review',
  templateUrl: './nsb-review.component.html',
  styleUrls: ['./nsb-review.component.scss'],
})
export class NsbReviewComponent implements OnInit {
  requests: NsbRegistrationRequest[] = [];
  selectedRequest: NsbRegistrationRequest | null = null;
  loading = false;
  error = '';
  saving = false;
  filterForm: FormGroup;
  statusFilter: string = '';
  searchTerm: string = '';

  // Review form
  reviewForm: FormGroup;
  showReviewModal = false;
  showDetailsModal = false;
  showStatusChangeModal = false;
  reviewAction: 'approve' | 'reject' | null = null;
  statusChangeForm: FormGroup;
  selectedRequestForStatusChange: NsbRegistrationRequest | null = null;
  newStatus: NsbRegistrationRequestStatus | null = null;

  constructor(
    private requestService: NsbRegistrationRequestService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group({
      status: [''],
      search: [''],
    });

    this.reviewForm = this.fb.group({
      remarks: [''],
    });

    this.statusChangeForm = this.fb.group({
      comments: [''],
    });
  }

  ngOnInit(): void {
    this.loadRequests();
    this.setupFilterWatchers();
  }

  setupFilterWatchers(): void {
    this.filterForm.get('status')?.valueChanges.subscribe((status) => {
      this.statusFilter = status;
      this.loadRequests();
    });

    this.filterForm.get('search')?.valueChanges.subscribe((search) => {
      this.searchTerm = search;
      this.loadRequests();
    });
  }

  loadRequests(): void {
    this.loading = true;
    this.error = '';

    const params: any = {
      skip: 0,
      limit: 50,
    };

    if (this.statusFilter) {
      params.status = this.statusFilter;
    }

    if (this.searchTerm) {
      params.search = this.searchTerm;
    }

    this.requestService
      .list(params)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (response) => {
          this.requests = response.data || [];
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load registration requests.';
        },
      });
  }

  viewRequest(request: NsbRegistrationRequest): void {
    if (!request.id) {
      this.error = 'Request ID not found.';
      return;
    }
    this.loadRequestDetails(request.id);
  }

  loadRequestDetails(id: string): void {
    this.loading = true;
    this.requestService.get(id).subscribe({
      next: (request) => {
        this.selectedRequest = request;
        this.showDetailsModal = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load request details.';
        this.loading = false;
      },
    });
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedRequest = null;
  }

  viewDocument(document: NsbRegistrationRequestDocument): void {
    if (!this.selectedRequest?.id || !document.id) {
      return;
    }
    // Fetch document via HTTP client (includes auth headers) and open as blob URL
    this.requestService.getDocumentBlob(this.selectedRequest.id, document.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        // Clean up the blob URL after a delay (optional, but good practice)
        setTimeout(() => URL.revokeObjectURL(url), 100);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load document. Please try again.';
      },
    });
  }

  openReviewModal(request: NsbRegistrationRequest, action: 'approve' | 'reject'): void {
    this.selectedRequest = request;
    this.reviewAction = action;
    this.reviewForm.reset();
    this.showReviewModal = true;
  }

  closeReviewModal(): void {
    this.showReviewModal = false;
    this.reviewAction = null;
    this.selectedRequest = null;
    this.reviewForm.reset();
  }

  submitReview(): void {
    if (!this.selectedRequest || !this.reviewAction) {
      return;
    }

    this.saving = true;
    this.error = '';

    const remarks = this.reviewForm.get('remarks')?.value || '';

    if (this.reviewAction === 'reject' && !remarks.trim()) {
      this.error = 'Remarks are required when rejecting a request.';
      this.saving = false;
      return;
    }

    const request$ =
      this.reviewAction === 'approve'
        ? this.requestService.approve(this.selectedRequest.id, remarks)
        : this.requestService.reject(this.selectedRequest.id, remarks);

    request$
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.closeReviewModal();
          this.loadRequests();
        },
        error: (err) => {
          this.error = err.error?.message || `Failed to ${this.reviewAction} request. Please try again.`;
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
        return 'Submitted';
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

  canApprove(request: NsbRegistrationRequest): boolean {
    return (
      request.status === NsbRegistrationRequestStatus.SUBMITTED ||
      request.status === NsbRegistrationRequestStatus.UNDER_REVIEW
    );
  }

  canReject(request: NsbRegistrationRequest): boolean {
    return (
      request.status === NsbRegistrationRequestStatus.SUBMITTED ||
      request.status === NsbRegistrationRequestStatus.UNDER_REVIEW
    );
  }

  canEditStatus(): boolean {
    const user = this.authService.currentUserValue;
    if (!user) return false;
    const roles = user.roles || (user.role ? [user.role] : []);
    return roles.includes(UserRole.SUPER_ADMIN) || roles.includes(UserRole.ARSO_SECRETARIAT);
  }

  updateStatus(request: NsbRegistrationRequest, newStatus: NsbRegistrationRequestStatus): void {
    if (!this.canEditStatus()) {
      return;
    }

    // Store the request and new status, then open modal
    this.selectedRequestForStatusChange = request;
    this.newStatus = newStatus;
    this.statusChangeForm.reset();
    this.showStatusChangeModal = true;
  }

  onStatusSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.newStatus = target.value as NsbRegistrationRequestStatus;
  }

  closeStatusChangeModal(): void {
    this.showStatusChangeModal = false;
    this.selectedRequestForStatusChange = null;
    this.newStatus = null;
    this.statusChangeForm.reset();
  }

  confirmStatusChange(): void {
    if (!this.selectedRequestForStatusChange || !this.newStatus) {
      return;
    }

    this.saving = true;
    this.error = '';

    const comments = this.statusChangeForm.get('comments')?.value || '';

    this.requestService
      .updateStatus(this.selectedRequestForStatusChange.id!, this.newStatus, comments)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.closeStatusChangeModal();
          this.loadRequests();
          if (this.showDetailsModal && this.selectedRequest?.id === this.selectedRequestForStatusChange?.id) {
            this.loadRequestDetails(this.selectedRequest.id);
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to update status. Please try again.';
        },
      });
  }

  getStatusLabelForChange(status: NsbRegistrationRequestStatus): string {
    return this.getStatusLabel(status);
  }

  getStatusOptions(): { value: NsbRegistrationRequestStatus; label: string }[] {
    return [
      { value: NsbRegistrationRequestStatus.DRAFT, label: 'Draft' },
      { value: NsbRegistrationRequestStatus.SUBMITTED, label: 'Submitted' },
      { value: NsbRegistrationRequestStatus.UNDER_REVIEW, label: 'Under Review' },
      { value: NsbRegistrationRequestStatus.APPROVED, label: 'Approved' },
      { value: NsbRegistrationRequestStatus.REJECTED, label: 'Rejected' },
    ];
  }
}

