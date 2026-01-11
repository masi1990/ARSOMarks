import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../../../shared/models/reference-data.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegionService {
  private readonly baseUrl = `${environment.apiBase}/reference/regions`;

  constructor(private http: HttpClient) {}

  list(): Observable<Region[]> {
    return this.http.get<Region[]>(this.baseUrl);
  }

  get(id: string): Observable<Region> {
    return this.http.get<Region>(`${this.baseUrl}/${id}`);
  }

  create(payload: Partial<Region>): Observable<Region> {
    return this.http.post<Region>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<Region>): Observable<Region> {
    return this.http.put<Region>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

