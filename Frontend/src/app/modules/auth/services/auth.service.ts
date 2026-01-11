import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  CreateRoleRequest,
  DecideRoleRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
  VerifyEmailRequest,
  RoleRequest,
  RoleRequestStatus,
  AssignRolesRequest,
  RemoveRolesRequest,
} from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBase}/auth`;
  private systemUserUrl = `${environment.apiBase}/system-users`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Load user from localStorage on service initialization
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('currentUser');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (e) {
        this.logout();
      }
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem('accessToken');
  }

  register(registerData: RegisterRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, registerData);
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        this.setAuthData(response);
      }),
    );
  }

  logout(redirect = true): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    if (redirect) {
      this.router.navigate(['/auth/login']);
    }
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/forgot-password`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password`, data);
  }

  verifyEmail(data: VerifyEmailRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/verify-email`, data);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
    );
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    const roles = user?.roles || (user?.role ? [user.role] : []);
    return roles.includes(role as RoleRequestStatus | any);
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    const userRoles = user?.roles || (user?.role ? [user.role] : []);
    return userRoles.some((r) => roles.includes(r as string));
  }

  requestRoles(payload: CreateRoleRequest): Observable<RoleRequest> {
    return this.http.post<RoleRequest>(`${this.apiUrl}/role-requests`, payload);
  }

  getMyRoleRequests(): Observable<RoleRequest[]> {
    return this.http.get<RoleRequest[]>(`${this.apiUrl}/role-requests/me`);
  }

  listRoleRequests(): Observable<RoleRequest[]> {
    return this.http.get<RoleRequest[]>(`${this.apiUrl}/role-requests`);
  }

  decideRoleRequest(id: string, payload: DecideRoleRequest): Observable<RoleRequest> {
    return this.http.post<RoleRequest>(`${this.apiUrl}/role-requests/${id}/decision`, payload);
  }

  // System users (admin view)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.systemUserUrl);
  }

  assignRolesToUser(userId: string, payload: AssignRolesRequest): Observable<User> {
    return this.http.post<User>(`${this.systemUserUrl}/${userId}/roles`, payload);
  }

  removeRolesFromUser(userId: string, payload: RemoveRolesRequest): Observable<User> {
    return this.http.patch<User>(`${this.systemUserUrl}/${userId}/roles`, payload);
  }

  private setAuthData(response: LoginResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }
}

