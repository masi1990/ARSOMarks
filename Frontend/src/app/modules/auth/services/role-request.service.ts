import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateRoleRequest,
  DecideRoleRequest,
  RoleRequest,
  RoleRequestStatus,
  UserRole,
  RoleRequestType,
} from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleRequestService {
  private baseUrl = `${environment.apiBase}/auth/role-requests`;

  constructor(private http: HttpClient) {}

  createRequest(requestedRoles: UserRole[], note?: string, requestType: RoleRequestType = RoleRequestType.ASSIGN): Observable<RoleRequest[]> {
    const payload: CreateRoleRequest = {
      requestedRoles,
      note,
      requestType,
    };
    return this.http.post<RoleRequest[]>(this.baseUrl, payload);
  }

  getMyRequests(): Observable<RoleRequest[]> {
    return this.http.get<RoleRequest[]>(`${this.baseUrl}/me`);
  }

  listAll(): Observable<RoleRequest[]> {
    return this.http.get<RoleRequest[]>(this.baseUrl);
  }

  decide(id: string, payload: DecideRoleRequest): Observable<RoleRequest> {
    return this.http.post<RoleRequest>(`${this.baseUrl}/${id}/decision`, payload);
  }
}
