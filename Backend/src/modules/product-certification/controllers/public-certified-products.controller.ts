import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Public } from '../../../common/decorators/public.decorator';
import { ProductCertificationApplication } from '../entities/product-certification-application.entity';
import { Product } from '../entities/product.entity';
import { ProductTechnicalSpec } from '../entities/product-technical-spec.entity';
import { ProductCertificationStatus } from '../../../shared/enums';
import { Operator } from '../../operator/entities/operator.entity';
import { TraceabilityService } from '../../traceability/services/traceability.service';
import { GenerateCocDto } from '../../traceability/dtos/generate-coc.dto';

@Controller('public/certified-products')
export class PublicCertifiedProductsController {
  constructor(
    @InjectRepository(ProductCertificationApplication)
    private readonly applicationRepository: Repository<ProductCertificationApplication>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTechnicalSpec)
    private readonly technicalSpecRepository: Repository<ProductTechnicalSpec>,
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
    private readonly traceabilityService: TraceabilityService,
  ) {}

  @Public()
  @Get()
  async getCertifiedProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('country') country?: string,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
  ) {
    // Query applications with CERTIFIED status
    const queryBuilder = this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.products', 'products')
      .leftJoinAndSelect('products.technicalSpec', 'technicalSpec')
      .leftJoinAndSelect('application.operator', 'operator')
      .where('application.status = :status', { status: ProductCertificationStatus.CERTIFIED })
      .andWhere('application.certificateNumber IS NOT NULL')
      .andWhere('application.certifiedAt IS NOT NULL');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(products.productName ILIKE :search OR products.brandName ILIKE :search OR application.certificateNumber ILIKE :search OR operator.companyLegalName ILIKE :search OR operator.tradingName ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category) {
      queryBuilder.andWhere('products.productCategory = :category', { category });
    }

    if (country) {
      queryBuilder.andWhere('operator.countryId = :countryId', { countryId: country });
    }

    // Get total count before pagination
    const total = await queryBuilder.getCount();

    // Apply pagination - convert string query params to numbers
    const skipNum = skip ? parseInt(skip, 10) : undefined;
    const limitNum = limit ? parseInt(limit, 10) : undefined;

    if (skipNum !== undefined && !isNaN(skipNum)) {
      queryBuilder.skip(skipNum);
    }
    if (limitNum !== undefined && !isNaN(limitNum)) {
      queryBuilder.limit(limitNum);
    }

    // Order by certification date (most recent first)
    queryBuilder.orderBy('application.certifiedAt', 'DESC');

    const applications = await queryBuilder.getMany();

    // Transform to the format expected by frontend
    const certifiedProducts = [];
    for (const application of applications) {
      if (application.products && application.products.length > 0) {
        for (const product of application.products) {
          // Ensure a COC/QR exists for the certified product
          const cocPayload: GenerateCocDto = {
            applicationId: application.id,
            productId: product.id,
            originCountryId: application.operator?.countryId || null,
          };
          await this.traceabilityService.issueCoc(cocPayload);

          // Get operator details
          const operator = application.operator || await this.operatorRepository.findOne({ where: { id: application.operatorId } });

          // Extract standards from technical spec if available
          const standards: string[] = [];
          if (product.technicalSpec) {
            if (product.technicalSpec.applicableStandards) {
              standards.push(...product.technicalSpec.applicableStandards);
            }
            if (product.technicalSpec.mandatoryStandards) {
              standards.push(...product.technicalSpec.mandatoryStandards);
            }
            if (product.technicalSpec.voluntaryStandards) {
              standards.push(...product.technicalSpec.voluntaryStandards);
            }
          }

          certifiedProducts.push({
            id: product.id,
            cocNumber: application.certificateNumber || '',
            productName: product.productName,
            brand: product.brandName,
            countryOfOrigin: operator?.countryId || '',
            company: operator?.companyLegalName || operator?.tradingName || '',
            standards: standards,
            issueDate: application.certifiedAt?.toISOString() || application.createdAt.toISOString(),
            expiryDate: application.certifiedAt ? this.calculateExpiryDate(application.certifiedAt).toISOString() : null,
            category: product.productCategory,
            operatorId: application.operatorId,
            operatorName: operator?.companyLegalName || operator?.tradingName,
            applicationId: application.id,
          });
        }
      }
    }

    return certifiedProducts;
  }

  @Public()
  @Get(':cocNumber')
  async getCertifiedProductByCoc(@Param('cocNumber') cocNumber: string) {
    const application = await this.applicationRepository.findOne({
      where: {
        certificateNumber: cocNumber,
        status: ProductCertificationStatus.CERTIFIED,
      },
      relations: ['products', 'products.technicalSpec', 'operator'],
    });

    if (!application || !application.products || application.products.length === 0) {
      return null;
    }

    // Return the first product (or you could return all products for this certificate)
    const product = application.products[0];
    const operator = application.operator;

    // Extract standards from technical spec if available
    const standards: string[] = [];
    if (product.technicalSpec) {
      if (product.technicalSpec.applicableStandards) {
        standards.push(...product.technicalSpec.applicableStandards);
      }
      if (product.technicalSpec.mandatoryStandards) {
        standards.push(...product.technicalSpec.mandatoryStandards);
      }
      if (product.technicalSpec.voluntaryStandards) {
        standards.push(...product.technicalSpec.voluntaryStandards);
      }
    }

    return {
      id: product.id,
      cocNumber: application.certificateNumber || '',
      productName: product.productName,
      brand: product.brandName,
      countryOfOrigin: operator?.countryId || '',
      company: operator?.companyLegalName || operator?.tradingName || '',
      standards: standards,
      issueDate: application.certifiedAt?.toISOString() || application.createdAt.toISOString(),
      expiryDate: application.certifiedAt ? this.calculateExpiryDate(application.certifiedAt).toISOString() : null,
      category: product.productCategory,
      operatorId: application.operatorId,
      operatorName: operator?.companyLegalName || operator?.tradingName,
      applicationId: application.id,
    };
  }

  // Helper method to calculate expiry date (typically 3 years from certification)
  private calculateExpiryDate(certifiedAt: Date): Date {
    const expiryDate = new Date(certifiedAt);
    expiryDate.setFullYear(expiryDate.getFullYear() + 3);
    return expiryDate;
  }
}

