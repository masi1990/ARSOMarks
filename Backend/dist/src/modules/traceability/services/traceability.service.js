"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceabilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const standard_entity_1 = require("../entities/standard.entity");
const product_standard_entity_1 = require("../entities/product-standard.entity");
const coc_entity_1 = require("../entities/coc.entity");
const qr_token_entity_1 = require("../entities/qr-token.entity");
const coc_status_history_entity_1 = require("../entities/coc-status-history.entity");
const scan_log_entity_1 = require("../entities/scan-log.entity");
const search_log_entity_1 = require("../entities/search-log.entity");
const product_entity_1 = require("../../product-certification/entities/product.entity");
const product_certification_application_entity_1 = require("../../product-certification/entities/product-certification-application.entity");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const coc_generator_service_1 = require("./coc-generator.service");
const qr_signing_service_1 = require("./qr-signing.service");
const enums_1 = require("../../../shared/enums");
let TraceabilityService = class TraceabilityService {
    constructor(standardRepo, productStandardRepo, cocRepo, qrTokenRepo, historyRepo, scanLogRepo, searchLogRepo, productRepo, applicationRepo, countryRepo, cocGenerator, qrSigning) {
        this.standardRepo = standardRepo;
        this.productStandardRepo = productStandardRepo;
        this.cocRepo = cocRepo;
        this.qrTokenRepo = qrTokenRepo;
        this.historyRepo = historyRepo;
        this.scanLogRepo = scanLogRepo;
        this.searchLogRepo = searchLogRepo;
        this.productRepo = productRepo;
        this.applicationRepo = applicationRepo;
        this.countryRepo = countryRepo;
        this.cocGenerator = cocGenerator;
        this.qrSigning = qrSigning;
    }
    async createStandard(dto) {
        const exists = await this.standardRepo.findOne({ where: { code: dto.code } });
        if (exists) {
            throw new common_1.BadRequestException('Standard code already exists');
        }
        const standard = this.standardRepo.create(dto);
        return this.standardRepo.save(standard);
    }
    async assignStandards(dto) {
        const product = await this.productRepo.findOne({ where: { id: dto.productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const standards = await this.standardRepo.findBy({ id: (0, typeorm_2.In)(dto.standardIds) });
        if (standards.length !== dto.standardIds.length) {
            throw new common_1.BadRequestException('One or more standards not found');
        }
        const records = standards.map((s) => this.productStandardRepo.create({
            productId: product.id,
            standardId: s.id,
            certificationApplicationId: dto.certificationApplicationId,
        }));
        return this.productStandardRepo.save(records);
    }
    async issueCoc(dto, actorId) {
        const application = await this.applicationRepo.findOne({
            where: { id: dto.applicationId },
            relations: ['products'],
        });
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        if (application.status !== enums_1.ProductCertificationStatus.CERTIFIED) {
            throw new common_1.BadRequestException('Application must be certified before issuing COC');
        }
        if (!application.products || application.products.length === 0) {
            throw new common_1.BadRequestException('Application has no products to issue COC for');
        }
        const product = (dto.productId && application.products.find((p) => p.id === dto.productId)) || application.products[0];
        if (!product) {
            throw new common_1.NotFoundException('Product not found on application');
        }
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
            status: coc_entity_1.CocStatus.VALID,
            qrPayloadSig: signature,
            publicUrl,
            originCountryId: dto.originCountryId || product.originCountryId,
        });
        const saved = await this.cocRepo.save(coc);
        await this.qrTokenRepo.save(this.qrTokenRepo.create({
            cocId: saved.id,
            token,
            expiresAt,
        }));
        await this.historyRepo.save(this.historyRepo.create({
            cocId: saved.id,
            applicationId: application.id,
            event: coc_entity_1.CocStatus.VALID,
            actorId,
        }));
        return Object.assign(Object.assign({}, saved), { token, publicUrl });
    }
    async revokeCoc(dto, actorId) {
        const coc = await this.cocRepo.findOne({ where: { id: dto.cocId } });
        if (!coc)
            throw new common_1.NotFoundException('COC not found');
        coc.status = dto.status;
        coc.revokedAt = dto.status === coc_entity_1.CocStatus.REVOKED ? new Date() : coc.revokedAt;
        await this.cocRepo.save(coc);
        await this.historyRepo.save(this.historyRepo.create({
            cocId: coc.id,
            applicationId: coc.applicationId,
            event: dto.status,
            reason: dto.reason,
            actorId,
        }));
        return coc;
    }
    async verifyToken(dto, meta) {
        var _a, _b, _c, _d;
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
            status = coc_entity_1.CocStatus.EXPIRED;
            if (coc.status !== coc_entity_1.CocStatus.EXPIRED) {
                coc.status = coc_entity_1.CocStatus.EXPIRED;
                await this.cocRepo.save(coc);
                await this.historyRepo.save(this.historyRepo.create({
                    cocId: coc.id,
                    applicationId: coc.applicationId,
                    event: coc_entity_1.CocStatus.EXPIRED,
                }));
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
        await this.logScan(coc, coc.productId, coc.applicationId, dto, meta, status === coc_entity_1.CocStatus.EXPIRED ? 'EXPIRED' : status);
        return {
            valid: status === coc_entity_1.CocStatus.VALID || status === coc_entity_1.CocStatus.ISSUED,
            status,
            cocNumber: coc.cocNumber,
            product: {
                id: (_a = coc.product) === null || _a === void 0 ? void 0 : _a.id,
                name: (_b = coc.product) === null || _b === void 0 ? void 0 : _b.productName,
                brand: (_c = coc.product) === null || _c === void 0 ? void 0 : _c.brandName,
                originCountry: coc.originCountry || ((_d = coc.product) === null || _d === void 0 ? void 0 : _d.originCountry),
            },
            applicationId: coc.applicationId,
            expiresAt: coc.expiresAt,
            standards: standards.map((ps) => ps.standard),
            publicUrl: coc.publicUrl,
        };
    }
    async publicProducts(filters) {
        const qb = this.cocRepo
            .createQueryBuilder('coc')
            .leftJoinAndSelect('coc.product', 'product')
            .leftJoinAndSelect('product.originCountry', 'originCountry')
            .leftJoin('coc.application', 'application')
            .leftJoinAndSelect('product.standards', 'productStandards')
            .leftJoinAndSelect('productStandards.standard', 'standard')
            .where('application.status = :status', { status: enums_1.ProductCertificationStatus.CERTIFIED });
        if (filters.search) {
            const term = `%${filters.search}%`;
            qb.andWhere('(coc.coc_number ILIKE :term OR product.product_name ILIKE :term OR product.brand_name ILIKE :term OR standard.code ILIKE :term)', { term });
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
        if (filters.skip !== undefined)
            qb.skip(filters.skip);
        if (filters.limit !== undefined)
            qb.take(filters.limit);
        const data = await qb.getMany();
        return data.map((coc) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return ({
                id: coc.productId,
                cocNumber: coc.cocNumber,
                productName: (_a = coc.product) === null || _a === void 0 ? void 0 : _a.productName,
                brand: (_b = coc.product) === null || _b === void 0 ? void 0 : _b.brandName,
                countryOfOrigin: coc.originCountryId || ((_c = coc.product) === null || _c === void 0 ? void 0 : _c.originCountryId),
                originCountryName: ((_d = coc.originCountry) === null || _d === void 0 ? void 0 : _d.name) || ((_f = (_e = coc.product) === null || _e === void 0 ? void 0 : _e.originCountry) === null || _f === void 0 ? void 0 : _f.name),
                standards: ((_h = (_g = coc.product) === null || _g === void 0 ? void 0 : _g.standards) === null || _h === void 0 ? void 0 : _h.map((ps) => { var _a; return (_a = ps.standard) === null || _a === void 0 ? void 0 : _a.code; }).filter(Boolean)) || [],
                issueDate: (_j = coc.issuedAt) === null || _j === void 0 ? void 0 : _j.toISOString(),
                expiryDate: (_k = coc.expiresAt) === null || _k === void 0 ? void 0 : _k.toISOString(),
                category: (_l = coc.product) === null || _l === void 0 ? void 0 : _l.productCategory,
                applicationId: coc.applicationId,
                qrUrl: coc.publicUrl,
            });
        });
    }
    async publicProductDetail(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const coc = await this.cocRepo.findOne({
            where: { productId: id },
            relations: ['product', 'product.originCountry', 'product.standards', 'product.standards.standard', 'application'],
        });
        if (!coc)
            throw new common_1.NotFoundException('Product not found');
        return {
            id: coc.productId,
            cocNumber: coc.cocNumber,
            productName: (_a = coc.product) === null || _a === void 0 ? void 0 : _a.productName,
            brand: (_b = coc.product) === null || _b === void 0 ? void 0 : _b.brandName,
            countryOfOrigin: coc.originCountryId || ((_c = coc.product) === null || _c === void 0 ? void 0 : _c.originCountryId),
            originCountryName: ((_d = coc.originCountry) === null || _d === void 0 ? void 0 : _d.name) || ((_f = (_e = coc.product) === null || _e === void 0 ? void 0 : _e.originCountry) === null || _f === void 0 ? void 0 : _f.name),
            standards: ((_h = (_g = coc.product) === null || _g === void 0 ? void 0 : _g.standards) === null || _h === void 0 ? void 0 : _h.map((ps) => { var _a; return (_a = ps.standard) === null || _a === void 0 ? void 0 : _a.code; }).filter(Boolean)) || [],
            issueDate: (_j = coc.issuedAt) === null || _j === void 0 ? void 0 : _j.toISOString(),
            expiryDate: (_k = coc.expiresAt) === null || _k === void 0 ? void 0 : _k.toISOString(),
            category: (_l = coc.product) === null || _l === void 0 ? void 0 : _l.productCategory,
            applicationId: coc.applicationId,
            qrUrl: coc.publicUrl,
        };
    }
    async logSearch(query, filters, geo) {
        const entry = this.searchLogRepo.create({
            query,
            filters,
            ip: geo === null || geo === void 0 ? void 0 : geo.ip,
            country: geo === null || geo === void 0 ? void 0 : geo.country,
            city: geo === null || geo === void 0 ? void 0 : geo.city,
            lat: geo === null || geo === void 0 ? void 0 : geo.lat,
            lon: geo === null || geo === void 0 ? void 0 : geo.lon,
        });
        await this.searchLogRepo.save(entry);
    }
    async logScan(coc, productId, applicationId, dto, meta, result) {
        await this.scanLogRepo.save(this.scanLogRepo.create({
            cocId: coc === null || coc === void 0 ? void 0 : coc.id,
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
        }));
    }
    defaultExpiry(certifiedAt) {
        const start = certifiedAt ? new Date(certifiedAt) : new Date();
        start.setFullYear(start.getFullYear() + 3);
        return start;
    }
};
exports.TraceabilityService = TraceabilityService;
exports.TraceabilityService = TraceabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(standard_entity_1.Standard)),
    __param(1, (0, typeorm_1.InjectRepository)(product_standard_entity_1.ProductStandard)),
    __param(2, (0, typeorm_1.InjectRepository)(coc_entity_1.Coc)),
    __param(3, (0, typeorm_1.InjectRepository)(qr_token_entity_1.QrToken)),
    __param(4, (0, typeorm_1.InjectRepository)(coc_status_history_entity_1.CocStatusHistory)),
    __param(5, (0, typeorm_1.InjectRepository)(scan_log_entity_1.ScanLog)),
    __param(6, (0, typeorm_1.InjectRepository)(search_log_entity_1.SearchLog)),
    __param(7, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(8, (0, typeorm_1.InjectRepository)(product_certification_application_entity_1.ProductCertificationApplication)),
    __param(9, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        coc_generator_service_1.CocGeneratorService,
        qr_signing_service_1.QrSigningService])
], TraceabilityService);
//# sourceMappingURL=traceability.service.js.map