import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRequestStatus, UserRole } from '../../../shared/enums';
import { RoleRequest } from '../entities/role-request.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { CreateRoleRequestDto, DecideRoleRequestDto } from '../dtos';
import { EmailService } from './email.service';
import { RoleRequestType } from '../types/role-request.type';

@Injectable()
export class RoleRequestService {
  constructor(
    @InjectRepository(RoleRequest) private readonly roleRequestRepo: Repository<RoleRequest>,
    @InjectRepository(SystemUser) private readonly userRepo: Repository<SystemUser>,
    private readonly emailService: EmailService,
  ) {}

  async create(user: SystemUser, dto: CreateRoleRequestDto): Promise<RoleRequest[]> {
    if (!user.emailVerified) {
      throw new BadRequestException('Verify your email before requesting roles.');
    }

    const requestType = dto.requestType ?? RoleRequestType.ASSIGN;
    const normalizedRoles = Array.from(new Set(dto.requestedRoles));
    if (normalizedRoles.length === 0) {
      throw new BadRequestException('At least one role is required.');
    }

    const currentRoles = Array.isArray(user.roles) ? user.roles : [];
    const pendingRequests = await this.roleRequestRepo.find({
      where: { userId: user.id, status: RoleRequestStatus.PENDING },
    });
    const pendingRoles = new Set(pendingRequests.flatMap((r) => r.requestedRoles || []));

    const rolesToRequest =
      requestType === RoleRequestType.REMOVE
        ? normalizedRoles.filter((role) => currentRoles.includes(role) && !pendingRoles.has(role))
        : normalizedRoles.filter((role) => !currentRoles.includes(role) && !pendingRoles.has(role));

    if (!rolesToRequest.length) {
      throw new BadRequestException(
        requestType === RoleRequestType.REMOVE ? 'No roles available to remove.' : 'No new roles to request.',
      );
    }

    const createdRequests: RoleRequest[] = [];

    for (const role of rolesToRequest) {
      const notePrefix = requestType === RoleRequestType.REMOVE ? '[REMOVE] ' : '';
      const request = this.roleRequestRepo.create({
        userId: user.id,
        requestedRoles: [role],
        status: RoleRequestStatus.PENDING,
        decisionNote: `${notePrefix}${dto.note ?? ''}`.trim(),
      });

      const savedRequest = await this.roleRequestRepo.save(request);
      savedRequest.requestType = requestType;
      createdRequests.push(savedRequest);
    }

    // Notify user (best effort)
    try {
      await this.emailService.sendRoleRequestSubmitted(
        user.email,
        user.fullName,
        createdRequests.map((req) => req.requestedRoles[0]),
      );
    } catch {
      // ignore email errors
    }

    return createdRequests;
  }

  async listMine(user: SystemUser): Promise<RoleRequest[]> {
    const results = await this.roleRequestRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
    });
    return results.map((r) => this.attachRequestType(r));
  }

  async listAll(): Promise<RoleRequest[]> {
    const results = await this.roleRequestRepo.find({
      order: { createdAt: 'DESC' },
    });
    return results.map((r) => this.attachRequestType(r));
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

    const reqType = this.extractRequestType(request) ?? RoleRequestType.ASSIGN;

    if (dto.status === RoleRequestStatus.APPROVED) {
      const currentRoles = Array.isArray(user.roles) ? user.roles : [];

      if (reqType === RoleRequestType.REMOVE) {
        const updated = currentRoles.filter((r) => !request.requestedRoles.includes(r));
        user.roles = updated;

        // Keep legacy single role aligned; if removed the primary role, fall back to PUBLIC or first remaining
        if (request.requestedRoles.includes(user.role)) {
          user.role = updated[0] || UserRole.PUBLIC;
        }
      } else {
        const merged = Array.from(new Set([...currentRoles, ...request.requestedRoles]));
        user.roles = merged;

        // Maintain the legacy single role for compatibility; prefer first approved role if none set or currently PUBLIC.
        if (!user.role || user.role === UserRole.PUBLIC) {
          user.role = request.requestedRoles[0] ?? user.role;
        }
      }

      await this.userRepo.save(user);
    }

    const saved = await this.roleRequestRepo.save(request);
    saved.requestType = reqType;

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

  private extractRequestType(request: RoleRequest): RoleRequestType {
    if (request.requestType) return request.requestType;
    const note = request.decisionNote || '';
    if (note.startsWith('[REMOVE]')) return RoleRequestType.REMOVE;
    return RoleRequestType.ASSIGN;
  }

  private attachRequestType(request: RoleRequest): RoleRequest {
    request.requestType = this.extractRequestType(request);
    return request;
  }
}

