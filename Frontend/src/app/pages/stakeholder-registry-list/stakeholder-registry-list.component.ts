import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { Nsb } from '../../shared/models/nsb.model';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-stakeholder-registry-list',
  templateUrl: './stakeholder-registry-list.component.html',
  styleUrls: ['./stakeholder-registry-list.component.scss'],
})
export class StakeholderRegistryListComponent implements OnInit {
  nsbs: Nsb[] = [];
  loading = false;
  error = '';
  filterStatus: 'ALL' | 'DRAFT' | 'SUBMITTED' = 'ALL';

  constructor(
    private nsbService: NsbService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadRegistries();
  }

  loadRegistries(): void {
    this.loading = true;
    this.error = '';
    const user = this.authService.currentUserValue;
    const userRoles = user?.roles || (user?.role ? [user.role] : []);
    const isSuperAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    if (isSuperAdmin) {
      // Super admins can see all NSBs
      this.nsbService.getNsbList({ limit: 1000 }).subscribe({
        next: (response) => {
          this.nsbs = response.data || [];
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load stakeholder registries.';
          this.loading = false;
        },
      });
    } else if (userRoles.includes(UserRole.NSB_ADMIN)) {
      // NSB admins can only see their own NSB
      this.nsbService.getMyNsb().subscribe({
        next: (nsb) => {
          this.nsbs = nsb ? [nsb] : [];
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load your stakeholder registry.';
          this.loading = false;
        },
      });
    } else {
      this.error = 'You do not have permission to view stakeholder registries.';
      this.loading = false;
    }
  }

  get filteredNsbs(): Nsb[] {
    if (this.filterStatus === 'ALL') {
      return this.nsbs;
    }
    return this.nsbs.filter((nsb) => nsb.stakeholderRegistryStatus === this.filterStatus);
  }

  getStatusBadgeClass(status?: string): string {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-emerald-100 text-emerald-800';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  }

  getStatusLabel(status?: string): string {
    switch (status) {
      case 'SUBMITTED':
        return 'Submitted';
      case 'DRAFT':
        return 'Draft';
      default:
        return 'Not Started';
    }
  }

  viewRegistry(nsb: Nsb): void {
    // For now, navigate to the form - super admins will see the first NSB's registry
    // In a full implementation, we'd pass the nsbId as a query param
    this.router.navigate(['/nsb/stakeholder-registry']);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}

