import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TraceableProduct, VerificationResult } from './traceability.models';

type GeoHeaders = { country?: string; city?: string; lat?: number; lon?: number };

@Injectable({ providedIn: 'root' })
export class TraceabilityPublicService {
  private readonly baseUrl = `${environment.apiBase}/public/traceability`;

  constructor(private readonly http: HttpClient) {}

  getProducts(
    params?: { search?: string; category?: string; country?: string; standard?: string; skip?: number; limit?: number },
    geo?: GeoHeaders,
  ): Observable<TraceableProduct[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    const headers = this.buildGeoHeaders(geo);
    return this.http.get<TraceableProduct[]>(`${this.baseUrl}/products`, { params: httpParams, headers });
  }

  getProductDetail(id: string): Observable<TraceableProduct> {
    return this.http.get<TraceableProduct>(`${this.baseUrl}/products/${id}`);
  }

  verifyToken(token: string, geo?: GeoHeaders): Observable<VerificationResult> {
    const params = new HttpParams().set('token', token);
    const headers = this.buildGeoHeaders(geo);
    return this.http.get<VerificationResult>(`${this.baseUrl}/verify`, { params, headers });
  }

  private buildGeoHeaders(geo?: GeoHeaders) {
    let headers = new HttpHeaders();
    if (!geo) return headers;
    if (geo.country) headers = headers.set('x-geo-country', geo.country);
    if (geo.city) headers = headers.set('x-geo-city', geo.city);
    if (geo.lat !== undefined) headers = headers.set('x-geo-lat', String(geo.lat));
    if (geo.lon !== undefined) headers = headers.set('x-geo-lon', String(geo.lon));
    return headers;
  }
}

