import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConsumerService } from './services/consumer.service';
import { CertifiedProduct } from './models/certified-product.model';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss'],
})
export class ConsumerComponent implements OnInit {
  loading = false;
  error = '';
  products: CertifiedProduct[] = [];
  filteredProducts: CertifiedProduct[] = [];
  
  searchControl = new FormControl('');
  
  // Filters
  searchTerm = '';
  categoryFilter = '';
  countryFilter = '';
  statusFilter = '';
  sectorFilter = '';
  
  // Filter options
  categories: string[] = [];
  countries: string[] = [];
  statuses: string[] = [];
  sectors: string[] = [];

  constructor(private consumerService: ConsumerService) {}

  ngOnInit(): void {
    this.loadProducts();
    
    // Setup search with debounce
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.searchTerm = value || '';
        this.applyFilters();
      });
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    
    this.consumerService.getCertifiedProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.extractFilterOptions();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load certified products.';
        this.products = [];
        this.filteredProducts = [];
        this.loading = false;
      },
    });
  }

  extractFilterOptions(): void {
    // Extract unique categories and countries for filters
    this.categories = [...new Set(this.products.map((p) => p.category).filter(Boolean))];
    this.countries = [...new Set(this.products.map((p) => p.countryOfOrigin).filter(Boolean))];
    this.statuses = [...new Set(this.products.map((p) => p.certificationStatus).filter(Boolean) as string[])];
    this.sectors = [...new Set(this.products.map((p) => p.sector).filter(Boolean) as string[])];
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.cocNumber?.toLowerCase().includes(searchLower) ||
          p.productName?.toLowerCase().includes(searchLower) ||
          p.brand?.toLowerCase().includes(searchLower) ||
          p.company?.toLowerCase().includes(searchLower) ||
          p.standards?.some((s) => s.toLowerCase().includes(searchLower)),
      );
    }

    // Category filter
    if (this.categoryFilter) {
      filtered = filtered.filter((p) => p.category === this.categoryFilter);
    }

    // Country filter
    if (this.countryFilter) {
      filtered = filtered.filter((p) => p.countryOfOrigin === this.countryFilter);
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter((p) => (p.certificationStatus || '').toLowerCase() === this.statusFilter.toLowerCase());
    }

    // Sector filter
    if (this.sectorFilter) {
      filtered = filtered.filter((p) => (p.sector || '').toLowerCase() === this.sectorFilter.toLowerCase());
    }

    this.filteredProducts = filtered;
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onCountryChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.searchTerm = '';
    this.categoryFilter = '';
    this.countryFilter = '';
    this.statusFilter = '';
    this.sectorFilter = '';
    this.applyFilters();
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  isExpired(expiryDate: string | null | undefined): boolean {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  }

  formatStatus(status?: string | null): string {
    if (!status) return 'Unknown';
    return status.replace(/_/g, ' ').toUpperCase();
  }
}

