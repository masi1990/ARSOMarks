import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MarkMisuseIncident, MarkSanctionType } from '../../../shared/models/mark-license.model';

@Injectable({ providedIn: 'root' })
export class MarkMisuseService {
  private baseUrl = `${environment.apiBase}/mark-licenses/applications`;

  constructor(private http: HttpClient) {}

  reportMisuse(payload: { licenseId?: string; description: string }): Observable<MarkMisuseIncident> {
    return this.http.post<MarkMisuseIncident>(`${this.baseUrl}/misuse`, payload);
  }

  listMisuse(): Observable<MarkMisuseIncident[]> {
    return this.http.get<MarkMisuseIncident[]>(`${this.baseUrl}/misuse/list`);
  }

  reviewMisuse(id: string, payload: { status: string; decisionNotes?: string }): Observable<MarkMisuseIncident> {
    return this.http.post<MarkMisuseIncident>(`${this.baseUrl}/misuse/${id}/review`, payload);
  }

  addSanction(
    incidentId: string,
    payload: { sanctionType: MarkSanctionType; startDate?: string; endDate?: string; notes?: string },
  ) {
    return this.http.post(`${this.baseUrl}/misuse/${incidentId}/sanctions`, payload);
  }

  uploadEvidence(incidentId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/misuse/${incidentId}/evidence`, formData);
  }
}
