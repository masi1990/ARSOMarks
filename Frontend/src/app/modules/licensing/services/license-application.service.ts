import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LicenseApplication } from '../../../shared/models/license.model';
import { AcapScheme, AccreditationBody } from '../../../shared/models/reference-data.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LicenseApplicationService {
  private readonly baseUrl = `${environment.apiBase}/licensing`;

  constructor(private http: HttpClient) {}

  createDraftApplication(payload: any): Observable<LicenseApplication> {
    return this.http.post<LicenseApplication>(`${this.baseUrl}/applications/draft`, payload);
  }

  updateDraftApplication(id: string, payload: any): Observable<LicenseApplication> {
    return this.http.put<LicenseApplication>(`${this.baseUrl}/applications/${id}/draft`, payload);
  }

  submitApplication(id: string, payload?: any): Observable<LicenseApplication> {
    return this.http.post<LicenseApplication>(`${this.baseUrl}/applications/${id}/submit`, payload || {});
  }

  getApplicationById(id: string): Observable<LicenseApplication> {
    return this.http.get<LicenseApplication>(`${this.baseUrl}/applications/${id}`);
  }

  getApplicationsByNsb(nsbId: string, includeDrafts = true): Observable<LicenseApplication[]> {
    return this.http.get<LicenseApplication[]>(`${this.baseUrl}/nsb/${nsbId}/applications`, {
      params: { includeDrafts },
    });
  }

  getAcapSchemes(): Observable<AcapScheme[]> {
    return this.http.get<AcapScheme[]>(`${this.baseUrl}/acap-schemes`);
  }

  getAccreditationBodies(): Observable<AccreditationBody[]> {
    return this.http.get<AccreditationBody[]>(`${this.baseUrl}/accreditation-bodies`);
  }
}

