import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CbComplianceProfile, UpsertCbComplianceProfileRequest } from '../../../shared/models/cb-compliance.model';

@Injectable({ providedIn: 'root' })
export class CbComplianceService {
  private readonly baseUrl = `${environment.apiBase}/cb-compliance`;

  constructor(private http: HttpClient) {}

  getProfile(cbApplicationId: string): Observable<CbComplianceProfile> {
    return this.http.get<CbComplianceProfile>(`${this.baseUrl}/${cbApplicationId}`);
  }

  upsertProfile(
    cbApplicationId: string,
    payload: UpsertCbComplianceProfileRequest,
  ): Observable<CbComplianceProfile> {
    return this.http.post<CbComplianceProfile>(`${this.baseUrl}/${cbApplicationId}`, payload);
  }
}
