import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraceabilityPublicService } from './traceability-public.service';
import { TraceableProduct } from './traceability.models';

@Component({
  selector: 'app-traceability-detail',
  templateUrl: './traceability-detail.component.html',
  styleUrls: ['./traceability-detail.component.scss'],
})
export class TraceabilityDetailComponent implements OnInit {
  product?: TraceableProduct;
  loading = false;
  error = '';

  constructor(private readonly route: ActivatedRoute, private readonly api: TraceabilityPublicService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetch(id);
    }
  }

  fetch(id: string) {
    this.loading = true;
    this.api.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Unable to load product.';
        this.loading = false;
      },
    });
  }

  qrImage(url?: string) {
    if (!url) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;
  }

  formatDate(dateString?: string | null) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  }
}

