import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductCertificationApplication,
  Product,
  ProductTechnicalSpec,
  ProductEnvironmentalClaim,
  ProductCertificationCbSelection,
  ProductCertificationDeclaration,
  ProductCertificationAgreement,
  ProductCertificationCbChangeRequest,
} from './entities';
import { ProductCertificationService } from './services/product-certification.service';
import { ProductCertificationAgreementUploadService } from './services/product-certification-agreement-upload.service';
import { ProductCertificationController } from './controllers/product-certification.controller';
import { PublicCertifiedProductsController } from './controllers/public-certified-products.controller';
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
      ProductCertificationAgreement,
      ProductCertificationCbChangeRequest,
      Operator,
    ]),
    OperatorModule,
    AuthModule,
  ],
  controllers: [ProductCertificationController, PublicCertifiedProductsController],
  providers: [ProductCertificationService, ProductCertificationAgreementUploadService],
  exports: [ProductCertificationService],
})
export class ProductCertificationModule {}

