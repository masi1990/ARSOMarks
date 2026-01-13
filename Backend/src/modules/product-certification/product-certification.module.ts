import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductCertificationApplication,
  Product,
  ProductTechnicalSpec,
  ProductEnvironmentalClaim,
  ProductCertificationCbSelection,
  ProductCertificationDeclaration,
} from './entities';
import { ProductCertificationService } from './services/product-certification.service';
import { ProductCertificationController } from './controllers/product-certification.controller';
import { OperatorModule } from '../operator/operator.module';
import { AuthModule } from '../auth/auth.module';
import { Operator } from '../operator/entities/operator.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCertificationApplication,
      Product,
      ProductTechnicalSpec,
      ProductEnvironmentalClaim,
      ProductCertificationCbSelection,
      ProductCertificationDeclaration,
      Operator,
    ]),
    OperatorModule,
    AuthModule,
  ],
  controllers: [ProductCertificationController],
  providers: [ProductCertificationService],
  exports: [ProductCertificationService],
})
export class ProductCertificationModule {}

