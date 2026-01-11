import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemUser } from './system-user.entity';
import { UserRole } from '../../shared/enums';
import { AssignRolesDto } from './dtos/assign-roles.dto';
import { EmailService } from '../auth/services/email.service';

@Injectable()
export class SystemUserService {
  private readonly logger = new Logger(SystemUserService.name);

  constructor(
    @InjectRepository(SystemUser)
    private readonly userRepository: Repository<SystemUser>,
    private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<SystemUser[]> {
    // Only return fields that are safe to expose to the UI.
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'email',
        'fullName',
        'role',
        'roles',
        'organizationType',
        'organizationId',
        'countryId',
        'isActive',
        'emailVerified',
        'createdAt',
        'lastLogin',
      ],
    });
  }

  async assignRoles(userId: string, dto: AssignRolesDto): Promise<SystemUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.roles.length === 0) {
      throw new BadRequestException('At least one role is required');
    }

    // Merge with existing roles and remove duplicates
    const currentRoles = Array.isArray(user.roles) ? user.roles : [];
    const uniqueRoles = Array.from(new Set([...currentRoles, ...dto.roles]));
    user.roles = uniqueRoles;

    // Update the single role field for backward compatibility
    // Set to the first role if no role is set or if current role is PUBLIC
    if (!user.role || user.role === UserRole.PUBLIC) {
      user.role = dto.roles[0];
    } else if (!uniqueRoles.includes(user.role)) {
      // If current role is not in the merged list, set to first new role
      user.role = dto.roles[0];
    }

    await this.userRepository.save(user);

    // Send email notification to user about role assignment
    try {
      const assignedRolesNames = dto.roles.map(role => role.toString());
      await this.emailService.sendRoleAssignmentNotification(
        user.email,
        user.fullName,
        assignedRolesNames,
        dto.note,
      );
    } catch (error) {
      // Log error but don't fail the operation - email notification is not critical
      this.logger.warn(`Failed to send role assignment notification email to ${user.email}: ${error.message}`);
    }

    // Return user with safe fields only
    const { passwordHash, passwordResetToken, passwordResetExpires, ...userWithoutSensitive } = user;
    return userWithoutSensitive as SystemUser;
  }

  async removeRoles(userId: string, rolesToRemove: UserRole[]): Promise<SystemUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentRoles = Array.isArray(user.roles) ? user.roles : [];
    user.roles = currentRoles.filter(role => !rolesToRemove.includes(role));

    // Ensure at least PUBLIC role remains
    if (user.roles.length === 0) {
      user.roles = [UserRole.PUBLIC];
    }

    // Update single role field if removed role matches
    if (rolesToRemove.includes(user.role as UserRole)) {
      user.role = user.roles[0] || UserRole.PUBLIC;
    }

    await this.userRepository.save(user);

    // Return user with safe fields only
    const { passwordHash, passwordResetToken, passwordResetExpires, ...userWithoutSensitive } = user;
    return userWithoutSensitive as SystemUser;
  }
}

