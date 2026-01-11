import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRequestStatus, UserRole } from '../../../shared/enums';
import { RoleRequest } from '../entities/role-request.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { CreateRoleRequestDto, DecideRoleRequestDto } from '../dtos';
import { EmailService } from './email.service';

@Injectable()
export class RoleRequestService {
  constructor(
    @InjectRepository(RoleRequest) private readonly roleRequestRepo: Repository<RoleRequest>,
    @InjectRepository(SystemUser) private readonly userRepo: Repository<SystemUser>,
    private readonly emailService: EmailService,
  ) {}

  async create(user: SystemUser, dto: CreateRoleRequestDto): Promise<RoleRequest> {
    if (!user.emailVerified) {
      throw new BadRequestException('Verify your email before requesting roles.');
    }

    const uniqueRoles = Array.from(new Set(dto.roles));
    if (uniqueRoles.length === 0) {
      throw new BadRequestException('At least one role is required.');
    }

    const request = this.roleRequestRepo.create({
      userId: user.id,
      requestedRoles: uniqueRoles,
      status: RoleRequestStatus.PENDING,
      decisionNote: dto.note,
    });

    const saved = await this.roleRequestRepo.save(request);

    // Notify user (best effort)
    try {
      await this.emailService.sendRoleRequestSubmitted(user.email, user.fullName, uniqueRoles);
    } catch {
      // ignore email errors
    }

    return saved;
  }

  async listMine(user: SystemUser): Promise<RoleRequest[]> {
    return this.roleRequestRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
    });
  }

  async listAll(): Promise<RoleRequest[]> {
    return this.roleRequestRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async decide(id: string, reviewer: SystemUser, dto: DecideRoleRequestDto): Promise<RoleRequest> {
    const request = await this.roleRequestRepo.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException('Role request not found');
    }

    if (request.status !== RoleRequestStatus.PENDING) {
      throw new BadRequestException('Request already decided');
    }

    request.status = dto.status;
    request.reviewedBy = reviewer.id;
    request.reviewedAt = new Date();
    request.decisionNote = dto.note ?? null;

    const user = await this.userRepo.findOne({ where: { id: request.userId } });
    if (!user) {
      throw new NotFoundException('User not found for this request');
    }

    if (dto.status === RoleRequestStatus.APPROVED) {
      const currentRoles = Array.isArray(user.roles) ? user.roles : [];
      const merged = Array.from(new Set([...currentRoles, ...request.requestedRoles]));
      user.roles = merged;

      // Maintain the legacy single role for compatibility; prefer first approved role if none set.
      if (!user.role || user.role === UserRole.PUBLIC) {
        user.role = request.requestedRoles[0] ?? user.role;
      }

      await this.userRepo.save(user);
    }

    const saved = await this.roleRequestRepo.save(request);

    // Notify user of decision (best effort)
    try {
      await this.emailService.sendRoleRequestDecision(
        user.email,
        user.fullName,
        request.requestedRoles,
        saved.status,
        saved.decisionNote ?? undefined,
      );
    } catch {
      // ignore email errors
    }

    return saved;
  }
}

