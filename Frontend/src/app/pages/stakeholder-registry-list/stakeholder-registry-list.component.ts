import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NsbService } from '../../modules/nsb-management/services/nsb.service';
import { StakeholderRegistryService } from '../../modules/nsb-management/services/stakeholder-registry.service';
import { Nsb } from '../../shared/models/nsb.model';
import { StakeholderRegistry, MarketSurveillanceAuthority, CustomsBorderAgency, RegulatoryAgency, IndustryAssociation, TestingLaboratory, OtherStakeholderGroup } from '../../shared/models/stakeholder-registry.model';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../shared/models/user.model';

interface StakeholderItem {
  id: string;
  type: 'MSA' | 'CUSTOMS' | 'REGULATORY' | 'INDUSTRY' | 'LABORATORY' | 'OTHER';
  name: string;
  category?: string;
  contactEmail: string;
  contactName: string;
  status: string;
  nsbName: string;
  nsbId: string;
}

@Component({
  selector: 'app-stakeholder-registry-list',
  templateUrl: './stakeholder-registry-list.component.html',
  styleUrls: ['./stakeholder-registry-list.component.scss']
})
export class StakeholderRegistryListComponent implements OnInit {
  stakeholders: StakeholderItem[] = [];
  filteredStakeholders: StakeholderItem[] = [];
  nsbs: Nsb[] = [];
  loading = false;
  error = '';
  searchQuery = '';
  filterType: 'ALL' | 'MSA' | 'CUSTOMS' | 'REGULATORY' | 'INDUSTRY' | 'LABORATORY' | 'OTHER' = 'ALL';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private nsbService: NsbService,
    private stakeholderService: StakeholderRegistryService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStakeholders();
  }

  loadStakeholders(): void {
    this.loading = true;
    this.error = '';
    const user = this.authService.currentUserValue;
    const userRoles = user?.roles || (user?.role ? [user.role] : []);
    const isSuperAdmin = userRoles.includes(UserRole.SUPER_ADMIN) || userRoles.includes(UserRole.ARSO_SECRETARIAT);

    // First load NSBs
    if (isSuperAdmin) {
      this.nsbService.getNsbList({ limit: 1000 }).subscribe({
        next: (response) => {
          this.nsbs = response.data || [];
          this.loadStakeholdersForNsbs();
        },
        error: () => {
          this.error = 'Failed to load NSBs.';
          this.loading = false;
        },
      });
    } else if (userRoles.includes(UserRole.NSB_ADMIN) || userRoles.includes(UserRole.NSB_USER)) {
      this.nsbService.getMyNsb().subscribe({
        next: (nsb) => {
          this.nsbs = nsb ? [nsb] : [];
          this.loadStakeholdersForNsbs();
        },
        error: () => {
          this.error = 'Failed to load your NSB.';
          this.loading = false;
        },
      });
    } else {
      this.error = 'You do not have permission to view stakeholder registries.';
      this.loading = false;
    }
  }

  loadStakeholdersForNsbs(): void {
    this.stakeholders = [];
    const loadPromises = this.nsbs.map(nsb => {
      if (!nsb.id) return Promise.resolve();
      return this.stakeholderService.getStakeholderRegistry(nsb.id).toPromise().then(registry => {
        if (registry) {
          // Flatten all stakeholders into a single array
          if (registry.marketSurveillanceAuthorities) {
            registry.marketSurveillanceAuthorities.forEach(msa => {
              this.stakeholders.push({
                id: msa.id || '',
                type: 'MSA',
                name: msa.agencyName,
                category: 'Market Surveillance',
                contactEmail: msa.contactEmail,
                contactName: msa.contactPersonName,
                status: msa.isActive ? 'ACTIVE' : 'INACTIVE',
                nsbName: nsb.name,
                nsbId: nsb.id
              });
            });
          }
          if (registry.customsBorderAgencies) {
            registry.customsBorderAgencies.forEach(customs => {
              this.stakeholders.push({
                id: customs.id || '',
                type: 'CUSTOMS',
                name: customs.agencyName,
                category: 'Customs & Border',
                contactEmail: customs.coordinatorEmail,
                contactName: customs.primaryContactName,
                status: customs.isActive ? 'ACTIVE' : 'INACTIVE',
                nsbName: nsb.name,
                nsbId: nsb.id
              });
            });
          }
          if (registry.regulatoryAgencies) {
            registry.regulatoryAgencies.forEach(reg => {
              this.stakeholders.push({
                id: reg.id || '',
                type: 'REGULATORY',
                name: reg.agencyName,
                category: 'Regulatory Agency',
                contactEmail: reg.contactEmail || '',
                contactName: reg.contactPersonName || '',
                status: reg.isActive ? 'ACTIVE' : 'INACTIVE',
                nsbName: nsb.name,
                nsbId: nsb.id
              });
            });
          }
          if (registry.industryAssociations) {
            registry.industryAssociations.forEach(industry => {
              this.stakeholders.push({
                id: industry.id || '',
                type: 'INDUSTRY',
                name: industry.associationName,
                category: 'Industry Association',
                contactEmail: industry.contactEmail,
                contactName: industry.contactPersonName,
                status: industry.isActive ? 'ACTIVE' : 'INACTIVE',
                nsbName: nsb.name,
                nsbId: nsb.id
              });
            });
          }
          if (registry.testingLaboratories) {
            registry.testingLaboratories.forEach(lab => {
              this.stakeholders.push({
                id: lab.id || '',
                type: 'LABORATORY',
                name: lab.name,
                category: 'Testing Laboratory',
                contactEmail: lab.contactEmail,
                contactName: lab.acapContactName,
                status: lab.isActive ? 'ACTIVE' : 'INACTIVE',
                nsbName: nsb.name,
                nsbId: nsb.id
              });
            });
          }
          if (registry.otherStakeholderGroups) {
            registry.otherStakeholderGroups.forEach(other => {
              this.stakeholders.push({
                id: other.id || '',
                type: 'OTHER',
                name: other.primaryContactName,
                category: other.stakeholderCategory,
                contactEmail: other.contactEmail,
                contactName: other.primaryContactName,
                status: other.isActive ? 'ACTIVE' : 'INACTIVE',
                nsbName: nsb.name,
                nsbId: nsb.id
              });
            });
          }
        }
      }).catch(() => {
        // Silently fail for NSBs without stakeholder registries
      });
    });

    Promise.all(loadPromises).then(() => {
      this.applyFilters();
      this.loading = false;
    });
  }

  applyFilters(): void {
    let filtered = [...this.stakeholders];

    // Apply type filter
    if (this.filterType !== 'ALL') {
      filtered = filtered.filter((stakeholder) => stakeholder.type === this.filterType);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter((stakeholder) => 
        stakeholder.name?.toLowerCase().includes(query) ||
        stakeholder.category?.toLowerCase().includes(query) ||
        stakeholder.contactEmail?.toLowerCase().includes(query) ||
        stakeholder.nsbName?.toLowerCase().includes(query)
      );
    }

    // Calculate total pages before pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredStakeholders = filtered.slice(startIndex, endIndex);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterTypeChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = Math.min(5, this.totalPages);
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }


  goToPage(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  getDisplayRange(): string {
    const totalFiltered = this.getTotalFilteredCount();
    const start = totalFiltered > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
    const end = Math.min(this.currentPage * this.itemsPerPage, totalFiltered);
    return totalFiltered > 0 ? `${start} to ${end}` : '0';
  }

  getTotalFilteredCount(): number {
    let filtered = [...this.stakeholders];
    if (this.filterType !== 'ALL') {
      filtered = filtered.filter((stakeholder) => stakeholder.type === this.filterType);
    }
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter((stakeholder) => 
        stakeholder.name?.toLowerCase().includes(query) ||
        stakeholder.category?.toLowerCase().includes(query) ||
        stakeholder.contactEmail?.toLowerCase().includes(query) ||
        stakeholder.nsbName?.toLowerCase().includes(query)
      );
    }
    return filtered.length;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'MSA': 'Market Surveillance',
      'CUSTOMS': 'Customs & Border',
      'REGULATORY': 'Regulatory Agency',
      'INDUSTRY': 'Industry Association',
      'LABORATORY': 'Testing Laboratory',
      'OTHER': 'Other Stakeholder'
    };
    return labels[type] || type;
  }

  getTypeBadgeClass(type: string): string {
    const classes: Record<string, string> = {
      'MSA': 'bg-blue-50 text-blue-700 border-blue-200',
      'CUSTOMS': 'bg-purple-50 text-purple-700 border-purple-200',
      'REGULATORY': 'bg-orange-50 text-orange-700 border-orange-200',
      'INDUSTRY': 'bg-green-50 text-green-700 border-green-200',
      'LABORATORY': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'OTHER': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return classes[type] || 'bg-gray-50 text-gray-700 border-gray-200';
  }

  getStatusBadgeClass(status: string): string {
    return status === 'ACTIVE' 
      ? 'bg-green-50 text-green-700 border-green-200' 
      : 'bg-gray-50 text-gray-700 border-gray-200';
  }

  editStakeholder(stakeholder: StakeholderItem): void {
    // Navigate to stakeholder registry form with the stakeholder ID
    this.router.navigate(['/portal/nsb/stakeholder-registry'], { 
      queryParams: { 
        nsbId: stakeholder.nsbId,
        stakeholderId: stakeholder.id,
        type: stakeholder.type
      } 
    });
  }

  deleteStakeholder(stakeholder: StakeholderItem): void {
    if (!confirm(`Are you sure you want to delete ${stakeholder.name}?`)) {
      return;
    }
    // TODO: Implement delete functionality via API
    console.log('Delete stakeholder:', stakeholder);
    // Reload stakeholders after deletion
    this.loadStakeholders();
  }

  viewStakeholder(stakeholder: StakeholderItem): void {
    // Navigate to stakeholder details or registry form
    this.router.navigate(['/portal/nsb/stakeholder-registry'], { 
      queryParams: { 
        nsbId: stakeholder.nsbId,
        stakeholderId: stakeholder.id,
        type: stakeholder.type,
        view: 'true'
      } 
    });
  }

  navigateToRegistryForm(): void {
    this.router.navigate(['/portal/nsb/stakeholder-registry']);
  }
}
