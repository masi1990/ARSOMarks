import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TraceabilityPublicService } from './traceability-public.service';
import { VerificationResult } from './traceability.models';

@Component({
  selector: 'app-traceability-verify',
  templateUrl: 'traceability-verify.component.html',
  styleUrls: ['traceability-verify.component.scss'],
})
export class TraceabilityVerifyComponent implements OnInit {
  tokenControl = new FormControl('');
  result?: VerificationResult;
  loading = false;
  error = '';
  geoHeaders: { lat?: number; lon?: number; country?: string; city?: string } = {};

  constructor(private readonly route: ActivatedRoute, private readonly api: TraceabilityPublicService) {}

  ngOnInit(): void {
    this.tryGeo();
    const tokenFromQuery = this.route.snapshot.queryParamMap.get('token');
    if (tokenFromQuery) {
      const cleaned = this.extractToken(tokenFromQuery);
      this.tokenControl.setValue(cleaned);
      this.verify(cleaned);
    }
  }

  verify(token?: string | null) {
    const value = token ?? this.tokenControl.value;
    if (!value) {
      this.error = 'Provide a token from the QR code link.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.api.verifyToken(this.extractToken(value), this.geoHeaders).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Verification failed.';
        this.loading = false;
      },
    });
  }

  statusColor(status?: string) {
    switch (status) {
      case 'VALID':
      case 'ISSUED':
        return 'text-green-700 bg-green-50';
      case 'EXPIRED':
        return 'text-amber-700 bg-amber-50';
      case 'REVOKED':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  }

  qrImage(url?: string) {
    if (!url) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;
  }

  private extractToken(raw: string): string {
    if (!raw) return raw;
    if (raw.includes('token=')) {
      const url = new URL(raw, window.location.origin);
      return url.searchParams.get('token') || raw;
    }
    return raw;
  }

  private tryGeo() {
    if (!navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.geoHeaders = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      },
      () => {},
      { maximumAge: 300000, timeout: 3000 },
    );
  }
}

