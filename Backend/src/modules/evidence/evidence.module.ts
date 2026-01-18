import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './evidence.service';
import { EvidenceFile } from './entities/evidence-file.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([EvidenceFile])],
  controllers: [EvidenceController],
  providers: [EvidenceService],
  exports: [EvidenceService],
})
export class EvidenceModule {}
