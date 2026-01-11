import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUser } from '../system-user/system-user.entity';
import { AuthService } from './services/auth.service';
import { EmailService } from './services/email.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RoleRequest } from './entities/role-request.entity';
import { RoleRequestService } from './services/role-request.service';
import { RoleRequestController } from './controllers/role-request.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemUser, RoleRequest]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key-change-in-production',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '7d',
        },
      }),
    }),
  ],
  controllers: [AuthController, RoleRequestController],
  providers: [AuthService, EmailService, JwtStrategy, LocalStrategy, RoleRequestService],
  exports: [AuthService, EmailService],
})
export class AuthModule {}

