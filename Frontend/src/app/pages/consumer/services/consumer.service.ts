import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CertifiedProduct } from '../models/certified-product.model';

@Injectable({ providedIn: 'root' })
export class ConsumerService {
  private readonly baseUrl = `${environment.apiBase}/public/certified-products`;

  constructor(private http: HttpClient) {}

  getCertifiedProducts(params?: {
    search?: string;
    category?: string;
    country?: string;
    skip?: number;
    limit?: number;
  }): Observable<CertifiedProduct[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return this.http.get<CertifiedProduct[]>(this.baseUrl, { params: httpParams });
  }

  getCertifiedProductByCoc(cocNumber: string): Observable<CertifiedProduct> {
    return this.http.get<CertifiedProduct>(`${this.baseUrl}/${cocNumber}`);
  }
}

