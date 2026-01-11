import { UserRole } from '../../../shared/enums';
export declare class RegisterDto {
    email: string;
    fullName: string;
    password: string;
    role?: UserRole;
    phone?: string;
    organizationId?: string;
    organizationType?: string;
}
