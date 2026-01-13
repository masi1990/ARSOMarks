import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarkLicenseAsset, RequestAssetsRequest } from '../../../shared/models/mark-license.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MarkAssetService {
  private readonly baseUrl = `${environment.apiBase}/mark-licenses/assets`;

  constructor(private http: HttpClient) {}

  /**
   * Request digital assets
   */
  requestAssets(payload: RequestAssetsRequest): Observable<MarkLicenseAsset> {
    return this.http.post<MarkLicenseAsset>(`${this.baseUrl}/request`, payload);
  }

  /**
   * Deliver assets (mark as delivered)
   */
  deliverAssets(id: string, assetFiles: any[]): Observable<MarkLicenseAsset> {
    return this.http.post<MarkLicenseAsset>(`${this.baseUrl}/${id}/deliver`, { assetFiles });
  }

  /**
   * Track asset download
   */
  trackDownload(id: string, filePath: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/download`, { filePath });
  }

  /**
   * Get asset by ID
   */
  getAssetById(id: string): Observable<MarkLicenseAsset> {
    return this.http.get<MarkLicenseAsset>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get asset library for an agreement
   */
  getAssetLibrary(agreementId: string): Observable<MarkLicenseAsset[]> {
    const params = new HttpParams().set('agreementId', agreementId);
    return this.http.get<MarkLicenseAsset[]>(this.baseUrl, { params });
  }

  /**
   * Get download history for an asset
   */
  getDownloadHistory(assetId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${assetId}/download-history`);
  }
}

