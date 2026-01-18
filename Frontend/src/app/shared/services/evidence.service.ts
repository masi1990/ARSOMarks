import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EvidenceFile, EvidenceParentType } from '../models/evidence.model';

@Injectable({ providedIn: 'root' })
export class EvidenceService {
  private readonly baseUrl = `${environment.apiBase}/evidence`;

  constructor(private http: HttpClient) {}

  list(parentType: EvidenceParentType, parentId: string): Observable<EvidenceFile[]> {
    return this.http.get<EvidenceFile[]>(`${this.baseUrl}/${parentType}/${parentId}`);
  }

  upload(
    parentType: EvidenceParentType,
    parentId: string,
    files: File[],
    description?: string,
  ): Observable<EvidenceFile[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    if (description) {
      formData.append('description', description);
    }
    return this.http.post<EvidenceFile[]>(`${this.baseUrl}/${parentType}/${parentId}`, formData);
  }

  getDownloadUrl(id: string): string {
    return `${this.baseUrl}/${id}/download`;
  }
}
