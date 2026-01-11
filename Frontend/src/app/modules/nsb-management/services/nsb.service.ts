import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nsb, PagedNsbResponse, NsbDocument, NsbProfileDocumentType } from '../../../shared/models/nsb.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NsbService {
  private readonly baseUrl = `${environment.apiBase}/nsb`;

  constructor(private http: HttpClient) {}

  getNsbList(params?: { countryId?: string; regionId?: string; search?: string; skip?: number; limit?: number }): Observable<PagedNsbResponse> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<PagedNsbResponse>(this.baseUrl, { params: httpParams });
  }

  getNsbById(id: string): Observable<Nsb> {
    return this.http.get<Nsb>(`${this.baseUrl}/${id}`);
  }

  getMyNsb(): Observable<Nsb> {
    return this.http.get<Nsb>(`${this.baseUrl}/my-nsb`);
  }

  createNsb(payload: Partial<Nsb>): Observable<Nsb> {
    return this.http.post<Nsb>(this.baseUrl, payload);
  }

  updateNsb(id: string, payload: Partial<Nsb>): Observable<Nsb> {
    return this.http.put<Nsb>(`${this.baseUrl}/${id}`, payload);
  }

  uploadDocument(nsbId: string, file: File, documentType: NsbProfileDocumentType): Observable<NsbDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    return this.http.post<NsbDocument>(`${this.baseUrl}/${nsbId}/documents`, formData);
  }

  getDocuments(nsbId: string): Observable<NsbDocument[]> {
    return this.http.get<NsbDocument[]>(`${this.baseUrl}/${nsbId}/documents`);
  }

  deleteDocument(nsbId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${nsbId}/documents/${documentId}`);
  }

  viewDocument(nsbId: string, documentId: string): string {
    return `${environment.apiBase}/nsb/${nsbId}/documents/${documentId}/view`;
  }
}

