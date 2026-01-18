import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint, Appeal } from './entities';
import { ComplaintsService } from './services/complaints.service';
import { ComplaintUploadService } from './services/complaint-upload.service';
import { ComplaintsController } from './controllers/complaints.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint, Appeal])],
  controllers: [ComplaintsController],
  providers: [ComplaintsService, ComplaintUploadService],
  exports: [ComplaintsService],
})
export class ComplaintsModule {}
