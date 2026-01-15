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
  
  // Filter options
  categories: string[] = [];
  countries: string[] = [];

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
}

