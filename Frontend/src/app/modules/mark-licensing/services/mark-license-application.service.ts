import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MarkLicenseApplication,
  CreateMarkLicenseApplicationRequest,
} from '../../../shared/models/mark-license.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MarkLicenseApplicationService {
  private readonly baseUrl = `${environment.apiBase}/mark-licenses/applications`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new mark license application
   */
  createApplication(payload: CreateMarkLicenseApplicationRequest): Observable<MarkLicenseApplication> {
    return this.http.post<MarkLicenseApplication>(this.baseUrl, payload);
  }

  /**
   * Get application by ID
   */
  getApplicationById(id: string): Observable<MarkLicenseApplication> {
    return this.http.get<MarkLicenseApplication>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a draft application
   */
  updateApplication(
    id: string,
    payload: Partial<CreateMarkLicenseApplicationRequest>,
  ): Observable<MarkLicenseApplication> {
    return this.http.put<MarkLicenseApplication>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * Submit application for review
   */
  submitApplication(id: string, notes?: string): Observable<MarkLicenseApplication> {
    return this.http.post<MarkLicenseApplication>(`${this.baseUrl}/${id}/submit`, {
      confirmSubmission: true,
      notes,
    });
  }

  /**
   * Get all applications for an NSB
   */
  getApplicationsByNsb(nsbId: string, includeDrafts: boolean = true): Observable<MarkLicenseApplication[]> {
    const params = new HttpParams()
      .set('nsbId', nsbId)
      .set('includeDrafts', includeDrafts.toString());
    return this.http.get<MarkLicenseApplication[]>(this.baseUrl, { params });
  }

  getAllApplications(includeDrafts: boolean = true): Observable<MarkLicenseApplication[]> {
    const params = new HttpParams().set('includeDrafts', includeDrafts.toString());
    return this.http.get<MarkLicenseApplication[]>(this.baseUrl, { params });
  }

  /**
   * Delete a draft application
   */
  deleteDraft(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  approveApplication(id: string): Observable<MarkLicenseApplication> {
    return this.http.post<MarkLicenseApplication>(`${this.baseUrl}/${id}/approve`, {});
  }

  rejectApplication(id: string, reason?: string): Observable<MarkLicenseApplication> {
    return this.http.post<MarkLicenseApplication>(`${this.baseUrl}/${id}/reject`, { reason });
  }

  uploadSupportingDocument(
    id: string,
    payload: { documentType: string; fileName: string; filePath?: string; otherDocumentName?: string },
  ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/documents`, payload);
  }

  listSupportingDocuments(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/documents`);
  }

  deleteSupportingDocument(id: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/documents/${documentId}`);
  }
}

