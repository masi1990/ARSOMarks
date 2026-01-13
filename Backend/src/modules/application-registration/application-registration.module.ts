import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRegistration } from './entities';
import { ApplicationRegistrationService } from './services/application-registration.service';
import { ApplicationRegistrationController } from './controllers/application-registration.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferenceDataModule } from '../reference-data/reference-data.module';
import { Nsb } from '../nsb-management/entities/nsb.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationRegistration, Nsb]),
    AuthModule,
    ReferenceDataModule,
  ],
  controllers: [ApplicationRegistrationController],
  providers: [ApplicationRegistrationService],
  exports: [ApplicationRegistrationService],
})
export class ApplicationRegistrationModule {}

