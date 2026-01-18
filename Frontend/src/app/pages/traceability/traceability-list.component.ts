import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { TraceabilityPublicService } from './traceability-public.service';
import { TraceableProduct } from './traceability.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traceability-list',
  templateUrl: './traceability-list.component.html',
  styleUrls: ['./traceability-list.component.scss'],
})
export class TraceabilityListComponent implements OnInit, OnDestroy {
  products: TraceableProduct[] = [];
  filtered: TraceableProduct[] = [];
  categories: string[] = [];
  countries: string[] = [];
  standards: string[] = [];

  search = new FormControl('');
  categoryFilter = '';
  countryFilter = '';
  standardFilter = '';
  loading = false;
  error = '';

  private destroy$ = new Subject<void>();
  private geoHeaders: { lat?: number; lon?: number; country?: string; city?: string } = {};

  constructor(private readonly api: TraceabilityPublicService, private readonly router: Router) {}

  ngOnInit(): void {
    this.tryCollectGeo();
    this.search.valueChanges.pipe(debounceTime(250), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => {
      this.applyFilters();
    });
    this.load();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.api
      .getProducts(
        {
          search: this.search.value || undefined,
          category: this.categoryFilter || undefined,
          country: this.countryFilter || undefined,
          standard: this.standardFilter || undefined,
        },
        this.geoHeaders,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data;
          this.filtered = data;
          this.extractFilters(data);
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Unable to load traceability directory.';
          this.products = [];
          this.filtered = [];
          this.loading = false;
        },
      });
  }

  applyFilters() {
    const term = (this.search.value || '').toString().toLowerCase();
    this.filtered = this.products.filter((p) => {
      const matchesSearch =
        !term ||
        p.cocNumber?.toLowerCase().includes(term) ||
        p.productName?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term) ||
        p.standards?.some((s) => s?.toLowerCase().includes(term));
      const matchesCategory = !this.categoryFilter || p.category === this.categoryFilter;
      const matchesCountry = !this.countryFilter || p.countryOfOrigin === this.countryFilter;
      const matchesStandard = !this.standardFilter || p.standards?.includes(this.standardFilter);
      return matchesSearch && matchesCategory && matchesCountry && matchesStandard;
    });
  }

  extractFilters(data: TraceableProduct[]) {
    this.categories = Array.from(new Set(data.map((p) => p.category).filter(Boolean) as string[]));
    this.countries = Array.from(new Set(data.map((p) => p.countryOfOrigin).filter(Boolean) as string[]));
    const standards = data.flatMap((p) => p.standards || []);
    this.standards = Array.from(new Set(standards));
  }

  clearFilters() {
    this.search.setValue('');
    this.categoryFilter = '';
    this.countryFilter = '';
    this.standardFilter = '';
    this.applyFilters();
  }

  isExpired(expiry?: string | null) {
    if (!expiry) return false;
    return new Date(expiry) < new Date();
  }

  formatDate(dateString?: string | null) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  viewProduct(product: TraceableProduct) {
    this.router.navigate(['/traceability/product', product.id]);
  }

  private tryCollectGeo() {
    if (!navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.geoHeaders = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
      },
      () => {
        this.geoHeaders = {};
      },
      { maximumAge: 300000, timeout: 3000 },
    );
  }
}

