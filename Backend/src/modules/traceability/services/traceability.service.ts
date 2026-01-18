import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Standard } from '../entities/standard.entity';
import { ProductStandard } from '../entities/product-standard.entity';
import { Coc, CocStatus } from '../entities/coc.entity';
import { QrToken } from '../entities/qr-token.entity';
import { CocStatusHistory } from '../entities/coc-status-history.entity';
import { ScanLog } from '../entities/scan-log.entity';
import { SearchLog } from '../entities/search-log.entity';
import { Product } from '../../product-certification/entities/product.entity';
import { ProductCertificationApplication } from '../../product-certification/entities/product-certification-application.entity';
import { Country } from '../../reference-data/entities/country.entity';
import { CreateStandardDto } from '../dtos/create-standard.dto';
import { AssignStandardsDto } from '../dtos/assign-standards.dto';
import { GenerateCocDto } from '../dtos/generate-coc.dto';
import { CocGeneratorService } from './coc-generator.service';
import { QrSigningService } from './qr-signing.service';
import { VerifyTokenDto } from '../dtos/verify-token.dto';
import { UpdateCocStatusDto } from '../dtos/update-coc-status.dto';
import { ProductCertificationStatus } from '../../../shared/enums';

@Injectable()
export class TraceabilityService {
  constructor(
    @InjectRepository(Standard) private readonly standardRepo: Repository<Standard>,
    @InjectRepository(ProductStandard) private readonly productStandardRepo: Repository<ProductStandard>,
    @InjectRepository(Coc) private readonly cocRepo: Repository<Coc>,
    @InjectRepository(QrToken) private readonly qrTokenRepo: Repository<QrToken>,
    @InjectRepository(CocStatusHistory) private readonly historyRepo: Repository<CocStatusHistory>,
    @InjectRepository(ScanLog) private readonly scanLogRepo: Repository<ScanLog>,
    @InjectRepository(SearchLog) private readonly searchLogRepo: Repository<SearchLog>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductCertificationApplication)
    private readonly applicationRepo: Repository<ProductCertificationApplication>,
    @InjectRepository(Country) private readonly countryRepo: Repository<Country>,
    private readonly cocGenerator: CocGeneratorService,
    private readonly qrSigning: QrSigningService,
  ) {}

  // Standards
  async createStandard(dto: CreateStandardDto): Promise<Standard> {
    const exists = await this.standardRepo.findOne({ where: { code: dto.code } });
    if (exists) {
      throw new BadRequestException('Standard code already exists');
    }
    const standard = this.standardRepo.create(dto);
    return this.standardRepo.save(standard);
  }

  async assignStandards(dto: AssignStandardsDto): Promise<ProductStandard[]> {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const standards = await this.standardRepo.findBy({ id: In(dto.standardIds) });
    if (standards.length !== dto.standardIds.length) {
      throw new BadRequestException('One or more standards not found');
    }

    const records = standards.map((s) =>
      this.productStandardRepo.create({
        productId: product.id,
        standardId: s.id,
        certificationApplicationId: dto.certificationApplicationId,
      }),
    );
    return this.productStandardRepo.save(records);
  }

  // COC issuance
  async issueCoc(dto: GenerateCocDto, actorId?: string) {
    const application = await this.applicationRepo.findOne({
      where: { id: dto.applicationId },
      relations: ['products'],
    });
    if (!application) throw new NotFoundException('Application not found');
    if (application.status !== ProductCertificationStatus.CERTIFIED) {
      throw new BadRequestException('Application must be certified before issuing COC');
    }
    if (!application.products || application.products.length === 0) {
      throw new BadRequestException('Application has no products to issue COC for');
    }

    const product =
      (dto.productId && application.products.find((p) => p.id === dto.productId)) || application.products[0];
    if (!product) {
      throw new NotFoundException('Product not found on application');
    }

    // Ensure no duplicate COC for product/application
    const existing = await this.cocRepo.findOne({
      where: { applicationId: application.id, productId: product.id },
    });
    if (existing) {
      return existing;
    }

    const { cocNumber, checksum } = this.cocGenerator.generateNumber();
    const issuedAt = new Date();
    const expiresAt = dto.validityDays
      ? new Date(Date.now() + dto.validityDays * 24 * 60 * 60 * 1000)
      : this.defaultExpiry(application.certifiedAt || issuedAt);

    const payload = {
      cocNumber,
      productId: product.id,
      applicationId: application.id,
      exp: expiresAt.getTime(),
      ts: Date.now(),
    };
    const { token, signature } = this.qrSigning.signPayload(payload);
    const publicUrl = this.qrSigning.buildPublicUrl(token);

    const coc = this.cocRepo.create({
      cocNumber,
      checksum,
      productId: product.id,
      applicationId: application.id,
      issuedAt,
      expiresAt,
      status: CocStatus.VALID,
      qrPayloadSig: signature,
      publicUrl,
      originCountryId: dto.originCountryId || product.originCountryId,
    });

    const saved = await this.cocRepo.save(coc);
    await this.qrTokenRepo.save(
      this.qrTokenRepo.create({
        cocId: saved.id,
        token,
        expiresAt,
      }),
    );

    await this.historyRepo.save(
      this.historyRepo.create({
        cocId: saved.id,
        applicationId: application.id,
        event: CocStatus.VALID,
        actorId,
      }),
    );

    return { ...saved, token, publicUrl };
  }

  async revokeCoc(dto: UpdateCocStatusDto, actorId?: string) {
    const coc = await this.cocRepo.findOne({ where: { id: dto.cocId } });
    if (!coc) throw new NotFoundException('COC not found');
    coc.status = dto.status;
    coc.revokedAt = dto.status === CocStatus.REVOKED ? new Date() : coc.revokedAt;
    await this.cocRepo.save(coc);
    await this.historyRepo.save(
      this.historyRepo.create({
        cocId: coc.id,
        applicationId: coc.applicationId,
        event: dto.status,
        reason: dto.reason,
        actorId,
      }),
    );
    return coc;
  }

  async verifyToken(dto: VerifyTokenDto, meta: { ip?: string; userAgent?: string }) {
    const payload = this.qrSigning.verify(dto.token);
    if (!payload) {
      await this.logScan(null, null, null, dto, meta, 'TAMPERED');
      return { valid: false, status: 'INVALID_SIGNATURE' };
    }

    const coc = await this.cocRepo.findOne({
      where: { cocNumber: payload.cocNumber },
      relations: ['product', 'product.originCountry', 'application'],
    });
    if (!coc) {
      await this.logScan(null, null, null, dto, meta, 'NOT_FOUND');
      return { valid: false, status: 'NOT_FOUND' };
    }

    const now = Date.now();
    let status = coc.status;
    if (coc.expiresAt && coc.expiresAt.getTime() < now) {
      status = CocStatus.EXPIRED;
      if (coc.status !== CocStatus.EXPIRED) {
        coc.status = CocStatus.EXPIRED;
        await this.cocRepo.save(coc);
        await this.historyRepo.save(
          this.historyRepo.create({
            cocId: coc.id,
            applicationId: coc.applicationId,
            event: CocStatus.EXPIRED,
          }),
        );
      }
    }

    await this.qrTokenRepo
      .createQueryBuilder()
      .update()
      .set({ lastUsedAt: new Date() })
      .where({ cocId: coc.id, token: dto.token })
      .execute();

    const standards = await this.productStandardRepo.find({
      where: { productId: coc.productId },
      relations: ['standard'],
    });

    await this.logScan(
      coc,
      coc.productId,
      coc.applicationId,
      dto,
      meta,
      status === CocStatus.EXPIRED ? 'EXPIRED' : status,
    );

    return {
      valid: status === CocStatus.VALID || status === CocStatus.ISSUED,
      status,
      cocNumber: coc.cocNumber,
      product: {
        id: coc.product?.id,
        name: coc.product?.productName,
        brand: coc.product?.brandName,
        originCountry: coc.originCountry || coc.product?.originCountry,
      },
      applicationId: coc.applicationId,
      expiresAt: coc.expiresAt,
      standards: standards.map((ps) => ps.standard),
      publicUrl: coc.publicUrl,
    };
  }

  async publicProducts(filters: {
    search?: string;
    category?: string;
    country?: string;
    standardCode?: string;
    skip?: number;
    limit?: number;
  }) {
    const qb = this.cocRepo
      .createQueryBuilder('coc')
      .leftJoinAndSelect('coc.product', 'product')
      .leftJoinAndSelect('product.originCountry', 'originCountry')
      .leftJoin('coc.application', 'application')
      .leftJoinAndSelect('product.standards', 'productStandards')
      .leftJoinAndSelect('productStandards.standard', 'standard')
      .where('application.status = :status', { status: ProductCertificationStatus.CERTIFIED });

    if (filters.search) {
      const term = `%${filters.search}%`;
      qb.andWhere(
        '(coc.coc_number ILIKE :term OR product.product_name ILIKE :term OR product.brand_name ILIKE :term OR standard.code ILIKE :term)',
        { term },
      );
    }
    if (filters.category) {
      qb.andWhere('product.product_category = :category', { category: filters.category });
    }
    if (filters.country) {
      qb.andWhere('originCountry.id = :country', { country: filters.country });
    }
    if (filters.standardCode) {
      qb.andWhere('standard.code = :standardCode', { standardCode: filters.standardCode });
    }

    qb.orderBy('coc.issuedAt', 'DESC');
    if (filters.skip !== undefined) qb.skip(filters.skip);
    if (filters.limit !== undefined) qb.take(filters.limit);

    const data = await qb.getMany();

    return data.map((coc) => ({
      id: coc.productId,
      cocNumber: coc.cocNumber,
      productName: coc.product?.productName,
      brand: coc.product?.brandName,
      countryOfOrigin: coc.originCountryId || coc.product?.originCountryId,
      originCountryName: coc.originCountry?.name || coc.product?.originCountry?.name,
      standards: coc.product?.standards?.map((ps) => ps.standard?.code).filter(Boolean) || [],
      issueDate: coc.issuedAt?.toISOString(),
      expiryDate: coc.expiresAt?.toISOString(),
      category: coc.product?.productCategory,
      applicationId: coc.applicationId,
      qrUrl: coc.publicUrl,
    }));
  }

  async publicProductDetail(id: string) {
    const coc = await this.cocRepo.findOne({
      where: { productId: id },
      relations: ['product', 'product.originCountry', 'product.standards', 'product.standards.standard', 'application'],
    });
    if (!coc) throw new NotFoundException('Product not found');
    return {
      id: coc.productId,
      cocNumber: coc.cocNumber,
      productName: coc.product?.productName,
      brand: coc.product?.brandName,
      countryOfOrigin: coc.originCountryId || coc.product?.originCountryId,
      originCountryName: coc.originCountry?.name || coc.product?.originCountry?.name,
      standards: coc.product?.standards?.map((ps) => ps.standard?.code).filter(Boolean) || [],
      issueDate: coc.issuedAt?.toISOString(),
      expiryDate: coc.expiresAt?.toISOString(),
      category: coc.product?.productCategory,
      applicationId: coc.applicationId,
      qrUrl: coc.publicUrl,
    };
  }

  async logSearch(query: string | undefined, filters: Record<string, any>, geo?: { ip?: string; country?: string; city?: string; lat?: number; lon?: number }) {
    const entry = this.searchLogRepo.create({
      query,
      filters,
      ip: geo?.ip,
      country: geo?.country,
      city: geo?.city,
      lat: geo?.lat,
      lon: geo?.lon,
    });
    await this.searchLogRepo.save(entry);
  }

  private async logScan(
    coc: Coc | null,
    productId: string | null,
    applicationId: string | null,
    dto: VerifyTokenDto,
    meta: { ip?: string; userAgent?: string },
    result: string,
  ) {
    await this.scanLogRepo.save(
      this.scanLogRepo.create({
        cocId: coc?.id,
        productId: productId || undefined,
        applicationId: applicationId || undefined,
        token: dto.token,
        ip: meta.ip,
        userAgent: meta.userAgent,
        country: dto.country,
        city: dto.city,
        lat: dto.lat,
        lon: dto.lon,
        result,
      }),
    );
  }

  private defaultExpiry(certifiedAt?: Date) {
    const start = certifiedAt ? new Date(certifiedAt) : new Date();
    start.setFullYear(start.getFullYear() + 3);
    return start;
  }
}

