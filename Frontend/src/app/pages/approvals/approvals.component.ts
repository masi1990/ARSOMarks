import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { NsbRegistrationRequestService } from '../../modules/nsb-management/services/nsb-registration-request.service';
import { RoleRequest, RoleRequestStatus, UserRole } from '../../shared/models/user.model';
import { NsbRegistrationRequest, NsbRegistrationRequestStatus } from '../../shared/models/nsb-registration-request.model';

// Unified Interface
export interface ApprovalItem {
  id: string;
  type: 'ROLE_REQUEST' | 'NSB_REGISTRATION';
  title: string;
  subtitle: string;
  requesterName: string;
  requesterEmail: string;
  status: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  originalRequest: RoleRequest | NsbRegistrationRequest;
}

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
})
export class ApprovalsComponent implements OnInit {
  activeTab: 'pending' | 'history' = 'pending';
  items: ApprovalItem[] = [];
  filteredItems: ApprovalItem[] = [];
  loading = false;
  error = '';

  // Filters
  filterForm: FormGroup;
  
  // Modal Actions
  selectedItem: ApprovalItem | null = null;
  actionType: 'approve' | 'reject' | null = null;
  decisionNote: string = '';
  processing = false;
  modalError = '';
  modalSuccess = '';

  constructor(
    private authService: AuthService,
    private nsbService: NsbRegistrationRequestService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      type: [''], // 'ROLE_REQUEST' or 'NSB_REGISTRATION'
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.setupFilters();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      roleRequests: this.authService.listRoleRequests(),
      nsbRequests: this.nsbService.list({ limit: 100 }) // Fetch reasonable amount
    }).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (res) => {
        const roleItems = (res.roleRequests || []).map(r => this.mapRoleRequest(r));
        const nsbItems = (res.nsbRequests.data || []).map(r => this.mapNsbRequest(r));
        
        this.items = [...roleItems, ...nsbItems].sort((a, b) => 
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
        
        this.applyFilters();
      },
      error: (err) => {
        this.error = 'Failed to load approval requests.';
        console.error(err);
      }
    });
  }

  mapRoleRequest(req: RoleRequest): ApprovalItem {
    return {
      id: req.id,
      type: 'ROLE_REQUEST',
      title: 'User Role Request',
      subtitle: req.requestedRoles.join(', ').replace(/_/g, ' '),
      requesterName: req.user?.fullName || 'Unknown User',
      requesterEmail: req.user?.email || req.userId,
      status: req.status,
      submittedAt: req.createdAt,
      reviewedBy: req.reviewedBy || undefined,
      reviewedAt: req.reviewedAt || undefined,
      notes: req.decisionNote || undefined,
      originalRequest: req
    };
  }

  mapNsbRequest(req: NsbRegistrationRequest): ApprovalItem {
    return {
      id: req.id || '',
      type: 'NSB_REGISTRATION',
      title: 'NSB Registration',
      subtitle: `${req.nsbOfficialName} (${req.countryName})`,
      requesterName: req.contactPersonName,
      requesterEmail: req.contactEmail,
      status: req.status,
      submittedAt: req.createdAt || '',
      reviewedBy: req.reviewedBy,
      reviewedAt: req.reviewedAt,
      notes: req.remarks,
      originalRequest: req
    };
  }

  setupFilters(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { search, type } = this.filterForm.value;
    const term = (search || '').toLowerCase();

    // First filter by tab
    let list = this.items.filter(item => {
      if (this.activeTab === 'pending') {
        return ['PENDING', 'SUBMITTED', 'UNDER_REVIEW', 'DRAFT'].includes(item.status);
      } else {
        return ['APPROVED', 'REJECTED'].includes(item.status);
      }
    });

    // Then filter by search term
    if (term) {
      list = list.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.subtitle.toLowerCase().includes(term) ||
        item.requesterName.toLowerCase().includes(term) ||
        item.requesterEmail.toLowerCase().includes(term)
      );
    }

    // Then filter by type
    if (type) {
      list = list.filter(item => item.type === type);
    }

    this.filteredItems = list;
  }

  setActiveTab(tab: 'pending' | 'history'): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  // Actions
  openDecisionModal(item: ApprovalItem, action: 'approve' | 'reject'): void {
    this.selectedItem = item;
    this.actionType = action;
    this.decisionNote = '';
    this.modalError = '';
    this.modalSuccess = '';
  }

  closeModal(): void {
    this.selectedItem = null;
    this.actionType = null;
    this.decisionNote = '';
  }

  submitDecision(): void {
    if (!this.selectedItem || !this.actionType) return;

    this.processing = true;
    this.modalError = '';
    
    // Check type and call appropriate service
    if (this.selectedItem.type === 'ROLE_REQUEST') {
      const status = this.actionType === 'approve' ? RoleRequestStatus.APPROVED : RoleRequestStatus.REJECTED;
      this.authService.decideRoleRequest(this.selectedItem.id, {
        status,
        note: this.decisionNote
      }).pipe(finalize(() => this.processing = false))
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.modalError = err.error?.message || 'Failed to process request.'
        });
    } else if (this.selectedItem.type === 'NSB_REGISTRATION') {
      const obs = this.actionType === 'approve' 
        ? this.nsbService.approve(this.selectedItem.id, this.decisionNote)
        : this.nsbService.reject(this.selectedItem.id, this.decisionNote);
        
      obs.pipe(finalize(() => this.processing = false))
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.modalError = err.error?.message || 'Failed to process request.'
        });
    }
  }

  handleSuccess(): void {
    this.modalSuccess = 'Request processed successfully.';
    setTimeout(() => {
      this.closeModal();
      this.loadData(); // Refresh list
    }, 1500);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED': return 'bg-emerald-100 text-emerald-800';
      case 'REJECTED': return 'bg-rose-100 text-rose-800';
      case 'PENDING': 
      case 'SUBMITTED':
      case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  getTypeLabel(type: string): string {
    return type === 'ROLE_REQUEST' ? 'Role Request' : 'NSB Registration';
  }
}

