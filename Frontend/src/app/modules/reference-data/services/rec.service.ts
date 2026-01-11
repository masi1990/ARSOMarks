import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionalEconomicCommunity } from '../../../shared/models/reference-data.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecService {
  private readonly baseUrl = `${environment.apiBase}/reference/recs`;

  constructor(private http: HttpClient) {}

  list(): Observable<RegionalEconomicCommunity[]> {
    return this.http.get<RegionalEconomicCommunity[]>(this.baseUrl);
  }

  get(id: string): Observable<RegionalEconomicCommunity> {
    return this.http.get<RegionalEconomicCommunity>(`${this.baseUrl}/${id}`);
  }

  create(payload: Partial<RegionalEconomicCommunity>): Observable<RegionalEconomicCommunity> {
    return this.http.post<RegionalEconomicCommunity>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<RegionalEconomicCommunity>): Observable<RegionalEconomicCommunity> {
    return this.http.put<RegionalEconomicCommunity>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

