export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ARSO_COUNCIL = 'ARSO_COUNCIL',
  CACO_MEMBER = 'CACO_MEMBER',
  ARSO_SECRETARIAT = 'ARSO_SECRETARIAT',
  ADVISORY_COMMITTEE = 'ADVISORY_COMMITTEE',
  SMC_MEMBER = 'SMC_MEMBER',
  NSB_ADMIN = 'NSB_ADMIN',
  NSB_USER = 'NSB_USER',
  CB_ADMIN = 'CB_ADMIN',
  CB_USER = 'CB_USER',
  OPERATOR = 'OPERATOR',
  ACCREDITATION_BODY = 'ACCREDITATION_BODY',
  PUBLIC = 'PUBLIC',
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role?: UserRole;
  roles?: UserRole[];
  isActive: boolean;
  emailVerified: boolean;
  phone?: string;
  organizationId?: string;
  organizationType?: string;
  countryId?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export enum RoleRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface RoleRequest {
  id: string;
  userId: string;
  user?: User;
  requestedRoles: UserRole[];
  status: RoleRequestStatus;
  decisionNote?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest {
  requestedRoles: UserRole[];
  note?: string;
  requestType?: RoleRequestType;
}
export enum RoleRequestType {
  ASSIGN = 'ASSIGN',
  REMOVE = 'REMOVE',
}

export interface DecideRoleRequest {
  status: RoleRequestStatus.APPROVED | RoleRequestStatus.REJECTED;
  note?: string;
}

export interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
  role?: UserRole;
  phone?: string;
  organizationId?: string;
  organizationType?: string;
  countryId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface AssignRolesRequest {
  roles: UserRole[];
  note?: string;
}

export interface RemoveRolesRequest {
  roles: UserRole[];
}

