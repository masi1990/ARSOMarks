import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MarkLicenseModification,
  CreateLicenseModificationRequest,
} from '../../../shared/models/mark-license.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MarkLicenseModificationService {
  private readonly baseUrl = `${environment.apiBase}/mark-licenses/modifications`;

  constructor(private http: HttpClient) {}

  /**
   * Request a license modification
   */
  requestModification(payload: CreateLicenseModificationRequest): Observable<MarkLicenseModification> {
    return this.http.post<MarkLicenseModification>(this.baseUrl, payload);
  }

  /**
   * Get modification by ID
   */
  getModificationById(id: string): Observable<MarkLicenseModification> {
    return this.http.get<MarkLicenseModification>(`${this.baseUrl}/${id}`);
  }

  /**
   * Approve modification request
   */
  approveModification(
    id: string,
    implementedChanges?: Record<string, any>,
    notes?: string,
  ): Observable<MarkLicenseModification> {
    return this.http.post<MarkLicenseModification>(`${this.baseUrl}/${id}/approve`, {
      implementedChanges,
      notes,
    });
  }

  /**
   * Reject modification request
   */
  rejectModification(id: string, rejectionReason: string): Observable<MarkLicenseModification> {
    return this.http.post<MarkLicenseModification>(`${this.baseUrl}/${id}/reject`, {
      rejectionReason,
    });
  }

  /**
   * Get modification history for a license
   */
  getModificationHistory(licenseId: string): Observable<MarkLicenseModification[]> {
    const params = new HttpParams().set('licenseId', licenseId);
    return this.http.get<MarkLicenseModification[]>(this.baseUrl, { params });
  }
}

