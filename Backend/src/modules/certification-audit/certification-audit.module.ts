import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CertificationAudit,
  CertificationAuditFinding,
  CorrectiveAction,
  SamplingRecord,
  Laboratory,
  TestResult,
} from './entities';
import { CertificationAuditService } from './services/certification-audit.service';
import { CertificationAuditController } from './controllers/certification-audit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CertificationAudit,
      CertificationAuditFinding,
      CorrectiveAction,
      SamplingRecord,
      Laboratory,
      TestResult,
    ]),
  ],
  controllers: [CertificationAuditController],
  providers: [CertificationAuditService],
  exports: [CertificationAuditService],
})
export class CertificationAuditModule {}
