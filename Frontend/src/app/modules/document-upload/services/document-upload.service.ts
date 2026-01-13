import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  OperatorDocument,
  ProductTestReport,
  ProductExistingCertificate,
  SupplyChainDocument,
  EnvironmentalDocument,
  UploadDocumentRequest,
  UploadTestReportRequest,
  UploadCertificateRequest,
  DocumentUploadResponse,
} from '../../../shared/models/document-upload.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentUploadService {
  private readonly baseUrl = `${environment.apiBase}/document-upload`;

  constructor(private http: HttpClient) {}

  // Operator Documents (Section A)
  getOperatorDocuments(operatorId: string): Observable<OperatorDocument[]> {
    return this.http.get<OperatorDocument[]>(`${this.baseUrl}/operators/${operatorId}/documents`);
  }

  uploadOperatorDocument(operatorId: string, request: UploadDocumentRequest): Observable<DocumentUploadResponse> {
    const formData = this.createDocumentFormData(request);
    return this.http.post<DocumentUploadResponse>(`${this.baseUrl}/operators/${operatorId}/documents`, formData);
  }

  deleteOperatorDocument(operatorId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/operators/${operatorId}/documents/${documentId}`);
  }

  downloadOperatorDocument(operatorId: string, documentId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/operators/${operatorId}/documents/${documentId}/download`, {
      responseType: 'blob',
    });
  }

  // Test Reports (Section B)
  getTestReports(params?: { productId?: string; applicationId?: string }): Observable<ProductTestReport[]> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<ProductTestReport[]>(`${this.baseUrl}/test-reports`, { params: httpParams });
  }

  uploadTestReport(request: UploadTestReportRequest): Observable<DocumentUploadResponse> {
    const formData = this.createTestReportFormData(request);
    return this.http.post<DocumentUploadResponse>(`${this.baseUrl}/test-reports`, formData);
  }

  deleteTestReport(reportId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/test-reports/${reportId}`);
  }

  // Existing Certificates (Section B)
  getExistingCertificates(params?: { productId?: string; applicationId?: string }): Observable<ProductExistingCertificate[]> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<ProductExistingCertificate[]>(`${this.baseUrl}/certificates`, { params: httpParams });
  }

  uploadCertificate(request: UploadCertificateRequest): Observable<DocumentUploadResponse> {
    const formData = this.createCertificateFormData(request);
    return this.http.post<DocumentUploadResponse>(`${this.baseUrl}/certificates`, formData);
  }

  deleteCertificate(certificateId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/certificates/${certificateId}`);
  }

  // Supply Chain Documents (Section C)
  getSupplyChainDocuments(params?: { operatorId?: string; productId?: string }): Observable<SupplyChainDocument[]> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<SupplyChainDocument[]>(`${this.baseUrl}/supply-chain`, { params: httpParams });
  }

  uploadSupplyChainDocument(request: UploadDocumentRequest): Observable<DocumentUploadResponse> {
    const formData = this.createDocumentFormData(request);
    return this.http.post<DocumentUploadResponse>(`${this.baseUrl}/supply-chain`, formData);
  }

  deleteSupplyChainDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supply-chain/${documentId}`);
  }

  // Environmental Documents (Section D - EMA Only)
  getEnvironmentalDocuments(params?: { productId?: string; applicationId?: string }): Observable<EnvironmentalDocument[]> {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<EnvironmentalDocument[]>(`${this.baseUrl}/environmental`, { params: httpParams });
  }

  uploadEnvironmentalDocument(request: UploadDocumentRequest): Observable<DocumentUploadResponse> {
    const formData = this.createDocumentFormData(request);
    return this.http.post<DocumentUploadResponse>(`${this.baseUrl}/environmental`, formData);
  }

  deleteEnvironmentalDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/environmental/${documentId}`);
  }

  // Helper methods to create FormData
  private createDocumentFormData(request: UploadDocumentRequest): FormData {
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('documentCategory', request.documentCategory);
    formData.append('documentType', request.documentType);
    formData.append('documentName', request.documentName);
    if (request.description) {
      formData.append('description', request.description);
    }
    if (request.expiryDate) {
      formData.append('expiryDate', request.expiryDate);
    }
    if (request.operatorId) {
      formData.append('operatorId', request.operatorId);
    }
    if (request.productId) {
      formData.append('productId', request.productId);
    }
    if (request.applicationId) {
      formData.append('applicationId', request.applicationId);
    }
    return formData;
  }

  private createTestReportFormData(request: UploadTestReportRequest): FormData {
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('testLabName', request.testLabName);
    formData.append('labAccreditation', request.labAccreditation);
    formData.append('testStandard', request.testStandard);
    formData.append('testDate', request.testDate);
    formData.append('sampleDescription', request.sampleDescription);
    formData.append('testParameters', request.testParameters);
    formData.append('testResultsSummary', request.testResultsSummary);
    formData.append('passFail', request.passFail);
    if (request.productId) {
      formData.append('productId', request.productId);
    }
    if (request.applicationId) {
      formData.append('applicationId', request.applicationId);
    }
    return formData;
  }

  private createCertificateFormData(request: UploadCertificateRequest): FormData {
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('certificateName', request.certificateName);
    formData.append('certificateNumber', request.certificateNumber);
    formData.append('issuingBody', request.issuingBody);
    formData.append('issueDate', request.issueDate);
    formData.append('expiryDate', request.expiryDate);
    formData.append('certificateScope', request.certificateScope);
    if (request.productId) {
      formData.append('productId', request.productId);
    }
    if (request.applicationId) {
      formData.append('applicationId', request.applicationId);
    }
    return formData;
  }
}

