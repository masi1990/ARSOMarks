import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../shared/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    // Check both the single role field and the roles array
    const userRoles: UserRole[] = [];
    
    // Add single role if present
    if (user.role) {
      userRoles.push(user.role);
    }
    
    // Add roles from array if present
    if (Array.isArray(user.roles) && user.roles.length > 0) {
      userRoles.push(...user.roles);
    }

    // Check if user has any of the required roles
    return requiredRoles.some(role => userRoles.includes(role));
  }
}

