import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private readonly baseUrl = `${environment.apiBase}/documents`;

  constructor(private http: HttpClient) {}

  upload(applicationId: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${applicationId}/upload`, formData);
  }

  list(applicationId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${applicationId}`);
  }
}

