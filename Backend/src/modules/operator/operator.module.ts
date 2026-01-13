import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Operator,
  OperatorContact,
  OperatorLocation,
  OperatorBusinessSector,
  OperatorMarket,
  OperatorProductionCapacity,
  OperatorPreference,
  OperatorAccessibility,
  OperatorConsent,
} from './entities';
import { OperatorService } from './services/operator.service';
import { OperatorController } from './controllers/operator.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Operator,
      OperatorContact,
      OperatorLocation,
      OperatorBusinessSector,
      OperatorMarket,
      OperatorProductionCapacity,
      OperatorPreference,
      OperatorAccessibility,
      OperatorConsent,
    ]),
    AuthModule,
  ],
  controllers: [OperatorController],
  providers: [OperatorService],
  exports: [OperatorService],
})
export class OperatorModule {}

