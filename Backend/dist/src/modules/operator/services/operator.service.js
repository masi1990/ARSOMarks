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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const enums_1 = require("../../../shared/enums");
let OperatorService = class OperatorService {
    constructor(operatorRepository, contactRepository, locationRepository, businessSectorRepository, marketRepository, productionCapacityRepository, preferenceRepository, accessibilityRepository, consentRepository, dataSource) {
        this.operatorRepository = operatorRepository;
        this.contactRepository = contactRepository;
        this.locationRepository = locationRepository;
        this.businessSectorRepository = businessSectorRepository;
        this.marketRepository = marketRepository;
        this.productionCapacityRepository = productionCapacityRepository;
        this.preferenceRepository = preferenceRepository;
        this.accessibilityRepository = accessibilityRepository;
        this.consentRepository = consentRepository;
        this.dataSource = dataSource;
    }
    async createOperatorRegistration(dto, userId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (dto.businessSectors && dto.businessSectors.length > 0) {
                let totalRevenue = 0;
                for (const sector of dto.businessSectors) {
                    const percentage = sector === null || sector === void 0 ? void 0 : sector.percentageRevenue;
                    if (typeof percentage === 'number') {
                        totalRevenue += percentage;
                    }
                }
                if (Math.abs(totalRevenue - 100) > 0.01) {
                    throw new common_1.BadRequestException('Total revenue percentage across all sectors must equal 100%');
                }
            }
            const operator = this.operatorRepository.create({
                operatorType: (_a = dto.companyInfo) === null || _a === void 0 ? void 0 : _a.operatorType,
                companyLegalName: (_b = dto.companyInfo) === null || _b === void 0 ? void 0 : _b.companyLegalName,
                tradingName: (_c = dto.companyInfo) === null || _c === void 0 ? void 0 : _c.tradingName,
                registrationNumberBusiness: (_d = dto.companyInfo) === null || _d === void 0 ? void 0 : _d.registrationNumberBusiness,
                taxId: (_e = dto.companyInfo) === null || _e === void 0 ? void 0 : _e.taxId,
                vatNumber: (_f = dto.companyInfo) === null || _f === void 0 ? void 0 : _f.vatNumber,
                yearEstablished: (_g = dto.companyInfo) === null || _g === void 0 ? void 0 : _g.yearEstablished,
                legalStructure: (_h = dto.companyInfo) === null || _h === void 0 ? void 0 : _h.legalStructure,
                businessActivity: (_j = dto.companyInfo) === null || _j === void 0 ? void 0 : _j.businessActivity,
                employeeCount: (_k = dto.companySize) === null || _k === void 0 ? void 0 : _k.employeeCount,
                annualTurnover: (_l = dto.companySize) === null || _l === void 0 ? void 0 : _l.annualTurnover,
                annualRevenue: (_m = dto.companySize) === null || _m === void 0 ? void 0 : _m.annualRevenue,
                exportPercentage: (_o = dto.companySize) === null || _o === void 0 ? void 0 : _o.exportPercentage,
                importPercentage: (_p = dto.companySize) === null || _p === void 0 ? void 0 : _p.importPercentage,
                capitalInvestment: (_q = dto.companySize) === null || _q === void 0 ? void 0 : _q.capitalInvestment,
                ownershipType: (_r = dto.ownershipInfo) === null || _r === void 0 ? void 0 : _r.ownershipType,
                majorityOwnerNationality: (_s = dto.ownershipInfo) === null || _s === void 0 ? void 0 : _s.majorityOwnerNationality,
                womenOwned: (_t = dto.ownershipInfo) === null || _t === void 0 ? void 0 : _t.womenOwned,
                youthOwned: (_u = dto.ownershipInfo) === null || _u === void 0 ? void 0 : _u.youthOwned,
                blackOwnedPercentage: (_v = dto.ownershipInfo) === null || _v === void 0 ? void 0 : _v.blackOwnedPercentage,
                beneficialOwnersCount: (_w = dto.ownershipInfo) === null || _w === void 0 ? void 0 : _w.beneficialOwnersCount,
                pepInvolved: (_x = dto.ownershipInfo) === null || _x === void 0 ? void 0 : _x.pepInvolved,
                pepDetails: (_y = dto.ownershipInfo) === null || _y === void 0 ? void 0 : _y.pepDetails,
                status: enums_1.OperatorStatus.DRAFT,
                userId: dto.userId || userId,
                countryId: dto.countryId,
                createdBy: userId,
                updatedBy: userId,
            });
            const savedOperator = await queryRunner.manager.save(operator);
            if (dto.primaryContact) {
                const primaryContact = this.contactRepository.create(Object.assign(Object.assign({}, dto.primaryContact), { operatorId: savedOperator.id, isPrimary: true, contactType: dto.primaryContact.contactType || enums_1.OperatorContactType.PRIMARY }));
                await queryRunner.manager.save(primaryContact);
            }
            if (dto.locations && dto.locations.length > 0) {
                const locations = dto.locations.map((loc) => this.locationRepository.create(Object.assign(Object.assign({}, loc), { operatorId: savedOperator.id, locationType: loc.locationType || undefined, factoryType: loc.factoryType ? loc.factoryType : undefined })));
                await queryRunner.manager.save(locations);
            }
            if (dto.businessSectors && dto.businessSectors.length > 0) {
                const sectors = dto.businessSectors.map((sector) => this.businessSectorRepository.create(Object.assign(Object.assign({}, sector), { operatorId: savedOperator.id, mainSector: sector.mainSector })));
                await queryRunner.manager.save(sectors);
            }
            if (dto.marketInfo) {
                const _z = dto.marketInfo, { primaryExportMarket } = _z, marketData = __rest(_z, ["primaryExportMarket"]);
                const market = this.marketRepository.create(Object.assign(Object.assign({}, marketData), { operatorId: savedOperator.id, domesticMarkets: dto.marketInfo.domesticMarkets || [], exportMarkets: dto.marketInfo.exportMarkets || [], importSources: dto.marketInfo.importSources || [], primaryExportMarketId: primaryExportMarket || undefined }));
                await queryRunner.manager.save(market);
            }
            if (dto.productionCapacity) {
                const productionCapacity = this.productionCapacityRepository.create(Object.assign(Object.assign({}, dto.productionCapacity), { operatorId: savedOperator.id, qmsType: dto.productionCapacity.qmsType ? dto.productionCapacity.qmsType : undefined }));
                await queryRunner.manager.save(productionCapacity);
            }
            if (dto.preferences) {
                const preferences = this.preferenceRepository.create(Object.assign(Object.assign({}, dto.preferences), { operatorId: savedOperator.id, preferredLanguage: dto.preferences.preferredLanguage, communicationPreferences: dto.preferences.communicationPreferences || [], notificationFrequency: dto.preferences.notificationFrequency }));
                await queryRunner.manager.save(preferences);
            }
            if (dto.accessibility) {
                const accessibility = this.accessibilityRepository.create(Object.assign(Object.assign({}, dto.accessibility), { operatorId: savedOperator.id, disabilityTypes: dto.accessibility.disabilityTypes || [], literacyLevel: dto.accessibility.literacyLevel, internetAccess: dto.accessibility.internetAccess, deviceType: dto.accessibility.deviceType }));
                await queryRunner.manager.save(accessibility);
            }
            if (dto.consents) {
                const consents = this.consentRepository.create(Object.assign(Object.assign({}, dto.consents), { operatorId: savedOperator.id }));
                await queryRunner.manager.save(consents);
            }
            await queryRunner.commitTransaction();
            return this.findById(savedOperator.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateOperatorRegistration(id, dto, userId) {
        const operator = await this.findById(id);
        if (operator.status !== enums_1.OperatorStatus.DRAFT) {
            throw new common_1.BadRequestException('Can only update draft registrations');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (dto.companyInfo) {
                Object.assign(operator, {
                    operatorType: dto.companyInfo.operatorType,
                    companyLegalName: dto.companyInfo.companyLegalName,
                    tradingName: dto.companyInfo.tradingName,
                    registrationNumberBusiness: dto.companyInfo.registrationNumberBusiness,
                    taxId: dto.companyInfo.taxId,
                    vatNumber: dto.companyInfo.vatNumber,
                    yearEstablished: dto.companyInfo.yearEstablished,
                    legalStructure: dto.companyInfo.legalStructure,
                    businessActivity: dto.companyInfo.businessActivity,
                });
            }
            if (dto.companySize) {
                Object.assign(operator, {
                    employeeCount: dto.companySize.employeeCount,
                    annualTurnover: dto.companySize.annualTurnover,
                    annualRevenue: dto.companySize.annualRevenue,
                    exportPercentage: dto.companySize.exportPercentage,
                    importPercentage: dto.companySize.importPercentage,
                    capitalInvestment: dto.companySize.capitalInvestment,
                });
            }
            if (dto.ownershipInfo) {
                Object.assign(operator, {
                    ownershipType: dto.ownershipInfo.ownershipType,
                    majorityOwnerNationality: dto.ownershipInfo.majorityOwnerNationality,
                    womenOwned: dto.ownershipInfo.womenOwned,
                    youthOwned: dto.ownershipInfo.youthOwned,
                    blackOwnedPercentage: dto.ownershipInfo.blackOwnedPercentage,
                    beneficialOwnersCount: dto.ownershipInfo.beneficialOwnersCount,
                    pepInvolved: dto.ownershipInfo.pepInvolved,
                    pepDetails: dto.ownershipInfo.pepDetails,
                });
            }
            operator.updatedBy = userId;
            await queryRunner.manager.save(operator);
            if (dto.primaryContact) {
                await queryRunner.manager.delete(entities_1.OperatorContact, { operatorId: id, isPrimary: true });
                const primaryContact = this.contactRepository.create(Object.assign(Object.assign({}, dto.primaryContact), { operatorId: id, isPrimary: true, contactType: dto.primaryContact.contactType || enums_1.OperatorContactType.PRIMARY }));
                await queryRunner.manager.save(primaryContact);
            }
            if (dto.locations) {
                await queryRunner.manager.delete(entities_1.OperatorLocation, { operatorId: id });
                const locations = dto.locations.map((loc) => this.locationRepository.create(Object.assign(Object.assign({}, loc), { operatorId: id, locationType: loc.locationType || undefined, factoryType: loc.factoryType ? loc.factoryType : undefined })));
                await queryRunner.manager.save(locations);
            }
            if (dto.businessSectors) {
                const totalRevenue = dto.businessSectors.reduce((sum, sector) => sum + sector.percentageRevenue, 0);
                if (Math.abs(totalRevenue - 100) > 0.01) {
                    throw new common_1.BadRequestException('Total revenue percentage across all sectors must equal 100%');
                }
                await queryRunner.manager.delete(entities_1.OperatorBusinessSector, { operatorId: id });
                const sectors = dto.businessSectors.map((sector) => this.businessSectorRepository.create(Object.assign(Object.assign({}, sector), { operatorId: id, mainSector: sector.mainSector })));
                await queryRunner.manager.save(sectors);
            }
            if (dto.marketInfo) {
                await queryRunner.manager.delete(entities_1.OperatorMarket, { operatorId: id });
                const _a = dto.marketInfo, { primaryExportMarket } = _a, marketData = __rest(_a, ["primaryExportMarket"]);
                const market = this.marketRepository.create(Object.assign(Object.assign({}, marketData), { operatorId: id, domesticMarkets: dto.marketInfo.domesticMarkets || [], exportMarkets: dto.marketInfo.exportMarkets || [], importSources: dto.marketInfo.importSources || [], primaryExportMarketId: primaryExportMarket || undefined }));
                await queryRunner.manager.save(market);
            }
            if (dto.productionCapacity) {
                await queryRunner.manager.delete(entities_1.OperatorProductionCapacity, { operatorId: id });
                const productionCapacity = this.productionCapacityRepository.create(Object.assign(Object.assign({}, dto.productionCapacity), { operatorId: id, qmsType: dto.productionCapacity.qmsType ? dto.productionCapacity.qmsType : undefined }));
                await queryRunner.manager.save(productionCapacity);
            }
            if (dto.preferences) {
                await queryRunner.manager.delete(entities_1.OperatorPreference, { operatorId: id });
                const preferences = this.preferenceRepository.create(Object.assign(Object.assign({}, dto.preferences), { operatorId: id, preferredLanguage: dto.preferences.preferredLanguage, communicationPreferences: dto.preferences.communicationPreferences || [], notificationFrequency: dto.preferences.notificationFrequency }));
                await queryRunner.manager.save(preferences);
            }
            if (dto.accessibility) {
                await queryRunner.manager.delete(entities_1.OperatorAccessibility, { operatorId: id });
                const accessibility = this.accessibilityRepository.create(Object.assign(Object.assign({}, dto.accessibility), { operatorId: id, disabilityTypes: dto.accessibility.disabilityTypes || [], literacyLevel: dto.accessibility.literacyLevel, internetAccess: dto.accessibility.internetAccess, deviceType: dto.accessibility.deviceType }));
                await queryRunner.manager.save(accessibility);
            }
            if (dto.consents) {
                await queryRunner.manager.delete(entities_1.OperatorConsent, { operatorId: id });
                const consents = this.consentRepository.create(Object.assign(Object.assign({}, dto.consents), { operatorId: id }));
                await queryRunner.manager.save(consents);
            }
            await queryRunner.commitTransaction();
            return this.findById(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async submitOperatorRegistration(id, userId) {
        var _a, _b;
        const operator = await this.findById(id);
        if (operator.status !== enums_1.OperatorStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft registrations can be submitted');
        }
        if (!operator.contacts || operator.contacts.length === 0) {
            throw new common_1.BadRequestException('Primary contact is required');
        }
        if (!operator.locations || operator.locations.length === 0) {
            throw new common_1.BadRequestException('At least one location is required');
        }
        if (!operator.businessSectors || operator.businessSectors.length === 0) {
            throw new common_1.BadRequestException('At least one business sector is required');
        }
        if (!((_a = operator.consents) === null || _a === void 0 ? void 0 : _a.dataConsent) || !((_b = operator.consents) === null || _b === void 0 ? void 0 : _b.termsAcceptance)) {
            throw new common_1.BadRequestException('Data consent and terms acceptance are required');
        }
        operator.status = enums_1.OperatorStatus.SUBMITTED;
        operator.submittedAt = new Date();
        operator.updatedBy = userId;
        return this.operatorRepository.save(operator);
    }
    async findById(id) {
        const operator = await this.operatorRepository.findOne({
            where: { id },
            relations: [
                'contacts',
                'locations',
                'businessSectors',
                'markets',
                'productionCapacity',
                'preferences',
                'accessibility',
                'consents',
                'country',
                'user',
            ],
        });
        if (!operator) {
            throw new common_1.NotFoundException(`Operator with ID ${id} not found`);
        }
        return operator;
    }
    async findByUserId(userId) {
        return this.operatorRepository.findOne({
            where: { userId },
            relations: [
                'contacts',
                'locations',
                'businessSectors',
                'markets',
                'productionCapacity',
                'preferences',
                'accessibility',
                'consents',
                'country',
            ],
        });
    }
    async findAll(filters) {
        const queryBuilder = this.operatorRepository.createQueryBuilder('operator');
        if (filters === null || filters === void 0 ? void 0 : filters.status) {
            queryBuilder.andWhere('operator.status = :status', { status: filters.status });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.countryId) {
            queryBuilder.andWhere('operator.countryId = :countryId', { countryId: filters.countryId });
        }
        const total = await queryBuilder.getCount();
        if ((filters === null || filters === void 0 ? void 0 : filters.skip) !== undefined) {
            queryBuilder.skip(filters.skip);
        }
        if ((filters === null || filters === void 0 ? void 0 : filters.limit) !== undefined) {
            queryBuilder.limit(filters.limit);
        }
        queryBuilder
            .leftJoinAndSelect('operator.contacts', 'contacts')
            .leftJoinAndSelect('operator.locations', 'locations')
            .leftJoinAndSelect('operator.country', 'country')
            .orderBy('operator.createdAt', 'DESC');
        const data = await queryBuilder.getMany();
        return { data, total };
    }
    async deleteOperator(id, userId) {
        const operator = await this.findById(id);
        if (operator.status !== enums_1.OperatorStatus.DRAFT) {
            throw new common_1.BadRequestException('Can only delete draft registrations');
        }
        await this.operatorRepository.remove(operator);
    }
};
exports.OperatorService = OperatorService;
exports.OperatorService = OperatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Operator)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.OperatorContact)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.OperatorLocation)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.OperatorBusinessSector)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.OperatorMarket)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.OperatorProductionCapacity)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.OperatorPreference)),
    __param(7, (0, typeorm_1.InjectRepository)(entities_1.OperatorAccessibility)),
    __param(8, (0, typeorm_1.InjectRepository)(entities_1.OperatorConsent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], OperatorService);
//# sourceMappingURL=operator.service.js.map