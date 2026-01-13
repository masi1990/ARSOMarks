import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MarkLicenseAgreement,
  CreateMarkLicenseAgreementRequest,
  SignAgreementRequest,
} from '../../../shared/models/mark-license.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MarkLicenseAgreementService {
  private readonly baseUrl = `${environment.apiBase}/mark-licenses/agreements`;

  constructor(private http: HttpClient) {}

  /**
   * Generate agreement from approved application
   */
  generateAgreement(payload: CreateMarkLicenseAgreementRequest): Observable<MarkLicenseAgreement> {
    return this.http.post<MarkLicenseAgreement>(this.baseUrl, payload);
  }

  /**
   * Get agreement by ID
   */
  getAgreementById(id: string): Observable<MarkLicenseAgreement> {
    return this.http.get<MarkLicenseAgreement>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get agreement by agreement ID
   */
  getAgreementByAgreementId(agreementId: string): Observable<MarkLicenseAgreement> {
    return this.http.get<MarkLicenseAgreement>(`${this.baseUrl}/by-agreement-id/${agreementId}`);
  }

  /**
   * NSB sign agreement
   */
  signAgreement(id: string, payload: SignAgreementRequest): Observable<MarkLicenseAgreement> {
    return this.http.post<MarkLicenseAgreement>(`${this.baseUrl}/${id}/sign`, payload);
  }

  /**
   * ARSO sign agreement
   */
  arsoSignAgreement(
    id: string,
    arsoSignerName: string,
    arsoSignerTitle: string,
  ): Observable<MarkLicenseAgreement> {
    return this.http.post<MarkLicenseAgreement>(`${this.baseUrl}/${id}/arso-sign`, {
      arsoSignerName,
      arsoSignerTitle,
    });
  }

  /**
   * Get active agreements for NSB
   */
  getActiveAgreementsByNsb(nsbId: string): Observable<MarkLicenseAgreement[]> {
    const params = new HttpParams().set('nsbId', nsbId);
    return this.http.get<MarkLicenseAgreement[]>(this.baseUrl, { params });
  }

  /**
   * Check for expiring agreements
   */
  getExpiringAgreements(daysBeforeExpiry: number = 30): Observable<MarkLicenseAgreement[]> {
    const params = new HttpParams().set('daysBeforeExpiry', daysBeforeExpiry.toString());
    return this.http.get<MarkLicenseAgreement[]>(`${this.baseUrl}/expiring`, { params });
  }
}

