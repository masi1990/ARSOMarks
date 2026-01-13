import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MarkLicenseUsageReport,
  CreateMarkUsageReportRequest,
} from '../../../shared/models/mark-license.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MarkUsageReportService {
  private readonly baseUrl = `${environment.apiBase}/mark-licenses/reports`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new usage report
   */
  createReport(payload: CreateMarkUsageReportRequest): Observable<MarkLicenseUsageReport> {
    return this.http.post<MarkLicenseUsageReport>(this.baseUrl, payload);
  }

  /**
   * Get report by ID
   */
  getReportById(id: string): Observable<MarkLicenseUsageReport> {
    return this.http.get<MarkLicenseUsageReport>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a draft report
   */
  updateReport(
    id: string,
    payload: Partial<CreateMarkUsageReportRequest>,
  ): Observable<MarkLicenseUsageReport> {
    return this.http.put<MarkLicenseUsageReport>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * Submit report for review
   */
  submitReport(id: string): Observable<MarkLicenseUsageReport> {
    return this.http.post<MarkLicenseUsageReport>(`${this.baseUrl}/${id}/submit`, {});
  }

  /**
   * Get all reports for a license
   */
  getReportsByLicense(licenseId: string): Observable<MarkLicenseUsageReport[]> {
    const params = new HttpParams().set('licenseId', licenseId);
    return this.http.get<MarkLicenseUsageReport[]>(this.baseUrl, { params });
  }
}

