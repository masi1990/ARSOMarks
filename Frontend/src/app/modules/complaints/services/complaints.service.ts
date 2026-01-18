import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Appeal,
  Complaint,
  CreateAppealRequest,
  CreateComplaintRequest,
} from '../../../shared/models/complaints.model';

@Injectable({ providedIn: 'root' })
export class ComplaintsService {
  private baseUrl = `${environment.apiBase}/complaints`;

  constructor(private http: HttpClient) {}

  createComplaint(payload: CreateComplaintRequest): Observable<Complaint> {
    return this.http.post<Complaint>(this.baseUrl, payload);
  }

  listComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.baseUrl);
  }

  reviewComplaint(id: string, payload: { status: string; decisionNotes?: string }) {
    return this.http.post<Complaint>(`${this.baseUrl}/${id}/review`, payload);
  }

  createAppeal(payload: CreateAppealRequest): Observable<Appeal> {
    return this.http.post<Appeal>(`${this.baseUrl}/appeals`, payload);
  }

  listAppeals(): Observable<Appeal[]> {
    return this.http.get<Appeal[]>(`${this.baseUrl}/appeals`);
  }

  reviewAppeal(id: string, payload: { status: string; decisionNotes?: string }) {
    return this.http.post<Appeal>(`${this.baseUrl}/appeals/${id}/review`, payload);
  }

  uploadComplaintEvidence(complaintId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/${complaintId}/evidence`, formData);
  }
}
