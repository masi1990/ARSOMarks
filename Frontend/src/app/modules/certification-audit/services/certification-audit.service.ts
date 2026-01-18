import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CertificationAudit,
  CertificationAuditFinding,
  CorrectiveAction,
  SamplingRecord,
  Laboratory,
  TestResult,
} from '../../../shared/models/certification-audit.model';

@Injectable({ providedIn: 'root' })
export class CertificationAuditService {
  private readonly baseUrl = `${environment.apiBase}/certification-audits`;

  constructor(private http: HttpClient) {}

  listAudits(applicationId?: string): Observable<CertificationAudit[]> {
    let params = new HttpParams();
    if (applicationId) {
      params = params.set('applicationId', applicationId);
    }
    return this.http.get<CertificationAudit[]>(this.baseUrl, { params });
  }

  getAudit(id: string): Observable<CertificationAudit> {
    return this.http.get<CertificationAudit>(`${this.baseUrl}/${id}`);
  }

  createAudit(payload: any): Observable<CertificationAudit> {
    return this.http.post<CertificationAudit>(this.baseUrl, payload);
  }

  updateAudit(id: string, payload: any): Observable<CertificationAudit> {
    return this.http.put<CertificationAudit>(`${this.baseUrl}/${id}`, payload);
  }

  completeAudit(id: string): Observable<CertificationAudit> {
    return this.http.post<CertificationAudit>(`${this.baseUrl}/${id}/complete`, {});
  }

  addFinding(payload: any): Observable<CertificationAuditFinding> {
    return this.http.post<CertificationAuditFinding>(`${this.baseUrl}/findings`, payload);
  }

  addCorrectiveAction(payload: any): Observable<CorrectiveAction> {
    return this.http.post<CorrectiveAction>(`${this.baseUrl}/corrective-actions`, payload);
  }

  addSampling(payload: any): Observable<SamplingRecord> {
    return this.http.post<SamplingRecord>(`${this.baseUrl}/sampling`, payload);
  }

  addTestResult(payload: any): Observable<TestResult> {
    return this.http.post<TestResult>(`${this.baseUrl}/test-results`, payload);
  }

  listLaboratories(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(`${this.baseUrl}/laboratories/list`);
  }

  createLaboratory(payload: any): Observable<Laboratory> {
    return this.http.post<Laboratory>(`${this.baseUrl}/laboratories`, payload);
  }
}
