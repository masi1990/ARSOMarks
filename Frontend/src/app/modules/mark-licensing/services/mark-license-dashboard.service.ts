import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardOverview,
  DashboardAnalytics,
  DashboardCalendar,
} from '../../../shared/models/mark-license.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MarkLicenseDashboardService {
  private readonly baseUrl = `${environment.apiBase}/mark-licenses/dashboard`;

  constructor(private http: HttpClient) {}

  /**
   * Get dashboard overview
   */
  getOverview(nsbId: string): Observable<DashboardOverview> {
    const params = new HttpParams().set('nsbId', nsbId);
    return this.http.get<DashboardOverview>(`${this.baseUrl}/overview`, { params });
  }

  /**
   * Get usage analytics
   */
  getAnalytics(nsbId: string): Observable<DashboardAnalytics> {
    const params = new HttpParams().set('nsbId', nsbId);
    return this.http.get<DashboardAnalytics>(`${this.baseUrl}/analytics`, { params });
  }

  /**
   * Get compliance calendar
   */
  getCalendar(nsbId: string): Observable<DashboardCalendar> {
    const params = new HttpParams().set('nsbId', nsbId);
    return this.http.get<DashboardCalendar>(`${this.baseUrl}/calendar`, { params });
  }
}

