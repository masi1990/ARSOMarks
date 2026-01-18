import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccreditationBody, AcapScheme, Region } from '../../../shared/models/reference-data.model';
import { CbApplication, CbApplicationDocument } from '../../../shared/models/cb-application.model';

@Injectable({ providedIn: 'root' })
export class CbApplicationService {
  private readonly baseUrl = `${environment.apiBase}/cb-applications`;

  constructor(private http: HttpClient) {}

  saveDraft(payload: any): Observable<CbApplication> {
    return this.http.post<CbApplication>(`${this.baseUrl}/draft`, payload);
  }

  create(payload: any): Observable<CbApplication> {
    return this.http.post<CbApplication>(this.baseUrl, payload);
  }

  update(id: string, payload: any): Observable<CbApplication> {
    return this.http.put<CbApplication>(`${this.baseUrl}/${id}`, payload);
  }

  submit(id: string): Observable<CbApplication> {
    return this.http.post<CbApplication>(`${this.baseUrl}/${id}/submit`, {});
  }

  getMyApplications(): Observable<CbApplication[]> {
    return this.http.get<CbApplication[]>(`${this.baseUrl}/my-applications`);
  }

  getById(id: string): Observable<CbApplication> {
    return this.http.get<CbApplication>(`${this.baseUrl}/${id}`);
  }

  list(params?: { status?: string; search?: string; skip?: number; limit?: number }) {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<{ data: CbApplication[]; total: number }>(this.baseUrl, { params: httpParams });
  }

  uploadDocument(applicationId: string, file: File, documentType: string): Observable<CbApplicationDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    return this.http.post<CbApplicationDocument>(`${this.baseUrl}/${applicationId}/documents`, formData);
  }

  listDocuments(applicationId: string): Observable<CbApplicationDocument[]> {
    return this.http.get<CbApplicationDocument[]>(`${this.baseUrl}/${applicationId}/documents`);
  }

  getAccreditationBodies(): Observable<AccreditationBody[]> {
    return this.http.get<AccreditationBody[]>(`${environment.apiBase}/reference/accreditation-bodies`);
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${environment.apiBase}/reference/regions`);
  }

  getAcapSchemes(): Observable<AcapScheme[]> {
    return this.http.get<AcapScheme[]>(`${environment.apiBase}/reference/acap-schemes`);
  }
}
