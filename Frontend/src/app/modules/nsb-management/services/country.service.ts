import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, Region, RegionalEconomicCommunity } from '../../../shared/models/reference-data.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly baseUrl = `${environment.apiBase}/reference`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/countries`);
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/regions`);
  }

  getRegionsByCountry(countryId: string): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/countries/${countryId}/regions`);
  }

  getRecs(): Observable<RegionalEconomicCommunity[]> {
    return this.http.get<RegionalEconomicCommunity[]>(`${this.baseUrl}/recs`);
  }

  getCountry(id: string): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/countries/${id}`);
  }

  createCountry(payload: Partial<Country> & { recIds?: string[] }): Observable<Country> {
    return this.http.post<Country>(`${this.baseUrl}/countries`, payload);
  }

  updateCountry(id: string, payload: Partial<Country> & { recIds?: string[] }): Observable<Country> {
    return this.http.put<Country>(`${this.baseUrl}/countries/${id}`, payload);
  }

  deleteCountry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/countries/${id}`);
  }
}

