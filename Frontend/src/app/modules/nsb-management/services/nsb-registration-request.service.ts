import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  NsbRegistrationRequest,
  CreateNsbRegistrationRequestDto,
} from '../../../shared/models/nsb-registration-request.model';

@Injectable({
  providedIn: 'root',
})
export class NsbRegistrationRequestService {
  private readonly baseUrl = `${environment.apiBase}/nsb-registration-requests`;

  constructor(private http: HttpClient) {}

  create(dto: CreateNsbRegistrationRequestDto): Observable<NsbRegistrationRequest> {
    return this.http.post<NsbRegistrationRequest>(this.baseUrl, dto);
  }

  get(id: string): Observable<NsbRegistrationRequest> {
    return this.http.get<NsbRegistrationRequest>(`${this.baseUrl}/${id}`);
  }

  list(params?: {
    countryId?: string;
    status?: string;
    search?: string;
    skip?: number;
    limit?: number;
  }): Observable<{ data: NsbRegistrationRequest[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key as keyof typeof params] !== undefined) {
          httpParams = httpParams.set(key, params[key as keyof typeof params]!.toString());
        }
      });
    }
    return this.http.get<{ data: NsbRegistrationRequest[]; total: number }>(this.baseUrl, {
      params: httpParams,
    });
  }

  getMyRequest(countryId?: string): Observable<NsbRegistrationRequest | null> {
    let httpParams = new HttpParams();
    if (countryId) {
      httpParams = httpParams.set('countryId', countryId);
    }
    return this.http.get<NsbRegistrationRequest | null>(`${this.baseUrl}/my-request`, {
      params: httpParams,
    });
  }

  update(id: string, dto: Partial<CreateNsbRegistrationRequestDto>): Observable<NsbRegistrationRequest> {
    return this.http.put<NsbRegistrationRequest>(`${this.baseUrl}/${id}`, dto);
  }

  updateStatus(id: string, status: string, remarks?: string): Observable<NsbRegistrationRequest> {
    return this.http.put<NsbRegistrationRequest>(`${this.baseUrl}/${id}`, { status, remarks });
  }

  submit(id: string): Observable<NsbRegistrationRequest> {
    return this.http.post<NsbRegistrationRequest>(`${this.baseUrl}/${id}/submit`, {});
  }

  approve(id: string, remarks?: string): Observable<NsbRegistrationRequest> {
    return this.http.post<NsbRegistrationRequest>(`${this.baseUrl}/${id}/approve`, { remarks });
  }

  reject(id: string, remarks: string): Observable<NsbRegistrationRequest> {
    return this.http.post<NsbRegistrationRequest>(`${this.baseUrl}/${id}/reject`, { remarks });
  }

  uploadDocument(requestId: string, file: File, documentType: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    return this.http.post(`${this.baseUrl}/${requestId}/documents`, formData);
  }

  deleteDocument(requestId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${requestId}/documents/${documentId}`);
  }

  viewDocument(requestId: string, documentId: string): string {
    return `${environment.apiBase}/nsb-registration-requests/${requestId}/documents/${documentId}/view`;
  }

  getDocumentBlob(requestId: string, documentId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${requestId}/documents/${documentId}/view`, {
      responseType: 'blob',
    });
  }
}

