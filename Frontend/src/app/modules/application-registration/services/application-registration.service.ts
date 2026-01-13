import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApplicationRegistration,
  CreateApplicationRegistrationRequest,
  PagedApplicationRegistrationResponse,
} from '../../../shared/models/application-registration.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApplicationRegistrationService {
  private readonly baseUrl = `${environment.apiBase}/application-registrations`;

  constructor(private http: HttpClient) {}

  /**
   * Save draft - NO VALIDATION - Accepts any data
   */
  saveDraft(payload: any): Observable<ApplicationRegistration> {
    return this.http.post<ApplicationRegistration>(`${this.baseUrl}/draft`, payload);
  }

  /**
   * Create with validation - for final submission
   */
  createApplicationRegistration(payload: CreateApplicationRegistrationRequest): Observable<ApplicationRegistration> {
    return this.http.post<ApplicationRegistration>(this.baseUrl, payload);
  }

  /**
   * Get my application registrations (all applications for the user)
   */
  getMyApplications(): Observable<ApplicationRegistration[]> {
    return this.http.get<ApplicationRegistration[]>(`${this.baseUrl}/my-applications`);
  }

  /**
   * Get my application registration (single - for backward compatibility)
   * @deprecated Use getMyApplications instead
   */
  getMyApplication(): Observable<ApplicationRegistration | null> {
    return this.http.get<ApplicationRegistration | null>(`${this.baseUrl}/my-application`);
  }

  /**
   * Get application by ID
   */
  getApplicationById(id: string): Observable<ApplicationRegistration> {
    return this.http.get<ApplicationRegistration>(`${this.baseUrl}/${id}`);
  }

  /**
   * List all applications (with filters)
   */
  getApplicationList(params?: {
    status?: string;
    countryId?: string;
    skip?: number;
    limit?: number;
  }): Observable<PagedApplicationRegistrationResponse> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<PagedApplicationRegistrationResponse>(this.baseUrl, { params: httpParams });
  }

  /**
   * Update draft - NO VALIDATION - Accepts any data
   */
  updateApplication(id: string, payload: any): Observable<ApplicationRegistration> {
    return this.http.put<ApplicationRegistration>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * Submit application - Validates all required fields
   */
  submitApplication(id: string): Observable<ApplicationRegistration> {
    return this.http.post<ApplicationRegistration>(`${this.baseUrl}/${id}/submit`, {});
  }

  /**
   * Delete draft
   */
  deleteApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Part B: Lookup endpoints
   */
  getAcapSchemes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lookup/acap-schemes`);
  }

  getArsoStandards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lookup/arso-standards`);
  }

  getCertificationBodies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lookup/certification-bodies`);
  }

  getProductionTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lookup/production-types`);
  }

  getTargetMarkets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lookup/target-markets`);
  }

  /**
   * Upload document for application registration
   */
  uploadDocument(applicationId: string, file: File, documentType: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    // Note: In production, this should handle actual file uploads
    // For now, return a mock response
    return this.http.post<any>(`${this.baseUrl}/${applicationId}/documents`, {
      documentType,
      fileName: file.name,
      filePath: `uploads/${applicationId}/${file.name}`,
      fileHash: 'mock-hash',
      fileSize: file.size.toString(),
      mimeType: file.type,
    });
  }
}

