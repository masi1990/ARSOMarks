import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUser } from './system-user.entity';
import { SystemUserController } from './system-user.controller';
import { SystemUserService } from './system-user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemUser]),
    AuthModule, // Import AuthModule to access EmailService
  ],
  controllers: [SystemUserController],
  providers: [SystemUserService],
  exports: [SystemUserService],
})
export class SystemUserModule {}

