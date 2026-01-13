import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StakeholderRegistry } from '../../../shared/models/stakeholder-registry.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StakeholderRegistryService {
  private readonly baseUrl = `${environment.apiBase}/nsb`;

  constructor(private http: HttpClient) {}

  getStakeholderRegistry(nsbId: string): Observable<StakeholderRegistry> {
    return this.http.get<StakeholderRegistry>(`${this.baseUrl}/${nsbId}/stakeholder-registry`);
  }

  updateStakeholderRegistry(nsbId: string, payload: StakeholderRegistry): Observable<StakeholderRegistry> {
    return this.http.put<StakeholderRegistry>(`${this.baseUrl}/${nsbId}/stakeholder-registry`, payload);
  }

  saveDraft(nsbId: string, payload: StakeholderRegistry): Observable<StakeholderRegistry> {
    return this.http.post<StakeholderRegistry>(`${this.baseUrl}/${nsbId}/stakeholder-registry/draft`, payload);
  }

  submitRegistry(nsbId: string, payload: StakeholderRegistry): Observable<StakeholderRegistry> {
    return this.http.post<StakeholderRegistry>(`${this.baseUrl}/${nsbId}/stakeholder-registry/submit`, payload);
  }
}

