import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ProductCertificationApplication,
  CreateProductCertificationApplicationRequest,
  PagedProductCertificationResponse,
  ProductCertificationAgreement,
  CertificationAgreementType,
  ProductCertificationCbChangeRequest,
} from '../../../shared/models/product-certification.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductCertificationService {
  private readonly baseUrl = `${environment.apiBase}/product-certifications`;

  constructor(private http: HttpClient) {}

  createApplication(payload: CreateProductCertificationApplicationRequest): Observable<ProductCertificationApplication> {
    return this.http.post<ProductCertificationApplication>(`${this.baseUrl}/applications`, payload);
  }

  getApplicationList(params?: {
    operatorId?: string;
    status?: string;
    skip?: number;
    limit?: number;
  }): Observable<PagedProductCertificationResponse> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<PagedProductCertificationResponse>(`${this.baseUrl}/applications`, { params: httpParams });
  }

  getApplicationById(id: string): Observable<ProductCertificationApplication> {
    return this.http.get<ProductCertificationApplication>(`${this.baseUrl}/applications/${id}`);
  }

  updateApplication(id: string, payload: Partial<CreateProductCertificationApplicationRequest>): Observable<ProductCertificationApplication> {
    return this.http.put<ProductCertificationApplication>(`${this.baseUrl}/applications/${id}`, payload);
  }

  submitApplication(id: string): Observable<ProductCertificationApplication> {
    return this.http.post<ProductCertificationApplication>(`${this.baseUrl}/applications/${id}/submit`, {});
  }

  uploadAgreement(
    applicationId: string,
    agreementType: CertificationAgreementType,
    file: File,
    payload?: { signedByName?: string; contractStart?: string; contractEnd?: string },
  ): Observable<ProductCertificationAgreement> {
    const formData = new FormData();
    formData.append('file', file);
    if (payload?.signedByName) {
      formData.append('signedByName', payload.signedByName);
    }
    if (payload?.contractStart) {
      formData.append('contractStart', payload.contractStart);
    }
    if (payload?.contractEnd) {
      formData.append('contractEnd', payload.contractEnd);
    }
    return this.http.post<ProductCertificationAgreement>(
      `${this.baseUrl}/applications/${applicationId}/agreements/${agreementType}/upload`,
      formData,
    );
  }

  listAgreements(applicationId: string): Observable<ProductCertificationAgreement[]> {
    return this.http.get<ProductCertificationAgreement[]>(`${this.baseUrl}/applications/${applicationId}/agreements`);
  }

  createCbChangeRequest(
    applicationId: string,
    payload: { currentCbId?: string; requestedCbId?: string; justification: string; penaltyPolicy?: string },
  ): Observable<ProductCertificationCbChangeRequest> {
    return this.http.post<ProductCertificationCbChangeRequest>(
      `${this.baseUrl}/applications/${applicationId}/cb-change-requests`,
      payload,
    );
  }

  deleteApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/applications/${id}`);
  }
}

