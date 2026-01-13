import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operator, CreateOperatorRegistrationRequest, PagedOperatorResponse } from '../../../shared/models/operator.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OperatorService {
  private readonly baseUrl = `${environment.apiBase}/operators`;

  constructor(private http: HttpClient) {}

  createOperatorRegistration(payload: CreateOperatorRegistrationRequest): Observable<Operator> {
    return this.http.post<Operator>(`${this.baseUrl}/register`, payload);
  }

  getOperatorList(params?: { status?: string; countryId?: string; skip?: number; limit?: number }): Observable<PagedOperatorResponse> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<PagedOperatorResponse>(this.baseUrl, { params: httpParams });
  }

  getOperatorById(id: string): Observable<Operator> {
    return this.http.get<Operator>(`${this.baseUrl}/${id}`);
  }

  getMyOperator(): Observable<Operator | null> {
    return this.http.get<Operator | null>(`${this.baseUrl}/my-operator`);
  }

  updateOperator(id: string, payload: Partial<CreateOperatorRegistrationRequest>): Observable<Operator> {
    return this.http.put<Operator>(`${this.baseUrl}/${id}`, payload);
  }

  submitOperator(id: string): Observable<Operator> {
    return this.http.post<Operator>(`${this.baseUrl}/${id}/submit`, {});
  }

  deleteOperator(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

