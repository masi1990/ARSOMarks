import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CbComplianceProfile } from './entities/cb-compliance-profile.entity';
import { CbComplianceController } from './controllers/cb-compliance.controller';
import { CbComplianceService } from './services/cb-compliance.service';
import { CbApplication } from '../cb-approval/entities/cb-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CbComplianceProfile, CbApplication])],
  controllers: [CbComplianceController],
  providers: [CbComplianceService],
  exports: [CbComplianceService],
})
export class CbComplianceModule {}
