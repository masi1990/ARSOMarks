import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraceabilityAdminController } from './controllers/traceability-admin.controller';
import { TraceabilityPublicController } from './controllers/traceability-public.controller';
import { TraceabilityService } from './services/traceability.service';
import { CocGeneratorService } from './services/coc-generator.service';
import { QrSigningService } from './services/qr-signing.service';
import { Standard } from './entities/standard.entity';
import { ProductStandard } from './entities/product-standard.entity';
import { Coc } from './entities/coc.entity';
import { QrToken } from './entities/qr-token.entity';
import { CocStatusHistory } from './entities/coc-status-history.entity';
import { ScanLog } from './entities/scan-log.entity';
import { SearchLog } from './entities/search-log.entity';
import { Product } from '../product-certification/entities/product.entity';
import { ProductCertificationApplication } from '../product-certification/entities/product-certification-application.entity';
import { Country } from '../reference-data/entities/country.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Standard,
      ProductStandard,
      Coc,
      QrToken,
      CocStatusHistory,
      ScanLog,
      SearchLog,
      Product,
      ProductCertificationApplication,
      Country,
    ]),
  ],
  controllers: [TraceabilityAdminController, TraceabilityPublicController],
  providers: [TraceabilityService, CocGeneratorService, QrSigningService],
  exports: [TraceabilityService],
})
export class TraceabilityModule {}

