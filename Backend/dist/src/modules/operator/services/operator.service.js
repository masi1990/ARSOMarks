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
    removeUndefinedValues(obj) {
        const cleaned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
                cleaned[key] = obj[key];
            }
        }
        return cleaned;
    }
    async createOperatorRegistration(dto, userId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
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
            const operatorData = {
                status: enums_1.OperatorStatus.DRAFT,
                userId: dto.userId || userId,
                createdBy: userId,
                updatedBy: userId,
            };
            if (((_a = dto.companyInfo) === null || _a === void 0 ? void 0 : _a.operatorType) !== undefined)
                operatorData.operatorType = dto.companyInfo.operatorType;
            if (((_b = dto.companyInfo) === null || _b === void 0 ? void 0 : _b.companyLegalName) !== undefined)
                operatorData.companyLegalName = dto.companyInfo.companyLegalName;
            if (((_c = dto.companyInfo) === null || _c === void 0 ? void 0 : _c.tradingName) !== undefined)
                operatorData.tradingName = dto.companyInfo.tradingName;
            if (((_d = dto.companyInfo) === null || _d === void 0 ? void 0 : _d.registrationNumberBusiness) !== undefined)
                operatorData.registrationNumberBusiness = dto.companyInfo.registrationNumberBusiness;
            if (((_e = dto.companyInfo) === null || _e === void 0 ? void 0 : _e.legalRegistrationNumberType) !== undefined) {
                operatorData.legalRegistrationNumberType = dto.companyInfo.legalRegistrationNumberType;
            }
            if (((_f = dto.companyInfo) === null || _f === void 0 ? void 0 : _f.legalRegistrationNumber) !== undefined) {
                operatorData.legalRegistrationNumber = dto.companyInfo.legalRegistrationNumber;
            }
            if (((_g = dto.companyInfo) === null || _g === void 0 ? void 0 : _g.taxId) !== undefined)
                operatorData.taxId = dto.companyInfo.taxId;
            if (((_h = dto.companyInfo) === null || _h === void 0 ? void 0 : _h.vatNumber) !== undefined)
                operatorData.vatNumber = dto.companyInfo.vatNumber;
            if (((_j = dto.companyInfo) === null || _j === void 0 ? void 0 : _j.yearEstablished) !== undefined)
                operatorData.yearEstablished = dto.companyInfo.yearEstablished;
            if (((_k = dto.companyInfo) === null || _k === void 0 ? void 0 : _k.legalStructure) !== undefined)
                operatorData.legalStructure = dto.companyInfo.legalStructure;
            if (((_l = dto.companyInfo) === null || _l === void 0 ? void 0 : _l.businessActivity) !== undefined)
                operatorData.businessActivity = dto.companyInfo.businessActivity;
            if (((_m = dto.companySize) === null || _m === void 0 ? void 0 : _m.employeeCount) !== undefined)
                operatorData.employeeCount = dto.companySize.employeeCount;
            if (((_o = dto.companySize) === null || _o === void 0 ? void 0 : _o.annualTurnover) !== undefined)
                operatorData.annualTurnover = dto.companySize.annualTurnover;
            if (((_p = dto.companySize) === null || _p === void 0 ? void 0 : _p.annualRevenue) !== undefined)
                operatorData.annualRevenue = dto.companySize.annualRevenue;
            if (((_q = dto.companySize) === null || _q === void 0 ? void 0 : _q.exportPercentage) !== undefined)
                operatorData.exportPercentage = dto.companySize.exportPercentage;
            if (((_r = dto.companySize) === null || _r === void 0 ? void 0 : _r.importPercentage) !== undefined)
                operatorData.importPercentage = dto.companySize.importPercentage;
            if (((_s = dto.companySize) === null || _s === void 0 ? void 0 : _s.capitalInvestment) !== undefined)
                operatorData.capitalInvestment = dto.companySize.capitalInvestment;
            if (((_t = dto.ownershipInfo) === null || _t === void 0 ? void 0 : _t.ownershipType) !== undefined)
                operatorData.ownershipType = dto.ownershipInfo.ownershipType;
            if (((_u = dto.ownershipInfo) === null || _u === void 0 ? void 0 : _u.majorityOwnerNationality) !== undefined)
                operatorData.majorityOwnerNationality = dto.ownershipInfo.majorityOwnerNationality;
            if (((_v = dto.ownershipInfo) === null || _v === void 0 ? void 0 : _v.womenOwned) !== undefined)
                operatorData.womenOwned = dto.ownershipInfo.womenOwned;
            if (((_w = dto.ownershipInfo) === null || _w === void 0 ? void 0 : _w.youthOwned) !== undefined)
                operatorData.youthOwned = dto.ownershipInfo.youthOwned;
            if (((_x = dto.ownershipInfo) === null || _x === void 0 ? void 0 : _x.blackOwnedPercentage) !== undefined)
                operatorData.blackOwnedPercentage = dto.ownershipInfo.blackOwnedPercentage;
            if (((_y = dto.ownershipInfo) === null || _y === void 0 ? void 0 : _y.beneficialOwnersCount) !== undefined)
                operatorData.beneficialOwnersCount = dto.ownershipInfo.beneficialOwnersCount;
            if (((_z = dto.ownershipInfo) === null || _z === void 0 ? void 0 : _z.pepInvolved) !== undefined)
                operatorData.pepInvolved = dto.ownershipInfo.pepInvolved;
            if (((_0 = dto.ownershipInfo) === null || _0 === void 0 ? void 0 : _0.pepDetails) !== undefined)
                operatorData.pepDetails = dto.ownershipInfo.pepDetails;
            if (dto.isGroup !== undefined)
                operatorData.isGroup = dto.isGroup;
            if (dto.groupManagerId !== undefined)
                operatorData.groupManagerId = dto.groupManagerId;
            if (dto.groupMembers !== undefined)
                operatorData.groupMembers = dto.groupMembers;
            if (dto.schemeType !== undefined)
                operatorData.schemeType = dto.schemeType;
            if (dto.schemePayload !== undefined)
                operatorData.schemePayload = dto.schemePayload;
            if (dto.countryId !== undefined)
                operatorData.countryId = dto.countryId;
            const operator = this.operatorRepository.create(operatorData);
            const savedOperatorResult = await queryRunner.manager.getRepository(entities_1.Operator).save(operator);
            const savedOperator = Array.isArray(savedOperatorResult) ? savedOperatorResult[0] : savedOperatorResult;
            if (dto.primaryContact) {
                const cleanedContact = this.removeUndefinedValues(dto.primaryContact);
                if (Object.keys(cleanedContact).length > 0 || cleanedContact.primaryContact || cleanedContact.contactEmail) {
                    const primaryContact = this.contactRepository.create(Object.assign(Object.assign({}, cleanedContact), { operatorId: savedOperator.id, isPrimary: true, contactType: dto.primaryContact.contactType || enums_1.OperatorContactType.PRIMARY }));
                    await queryRunner.manager.save(primaryContact);
                }
            }
            if (dto.locations && dto.locations.length > 0) {
                const locations = dto.locations
                    .map((loc) => {
                    const cleanedLoc = this.removeUndefinedValues(loc);
                    const hasData = Object.keys(cleanedLoc).some(key => {
                        const value = cleanedLoc[key];
                        return value !== undefined && value !== null && value !== '';
                    });
                    if (!hasData) {
                        return null;
                    }
                    return this.locationRepository.create(Object.assign(Object.assign({}, cleanedLoc), { operatorId: savedOperator.id, locationType: loc.locationType ? loc.locationType : undefined, factoryType: loc.factoryType ? loc.factoryType : undefined }));
                })
                    .filter(loc => loc !== null && loc !== undefined);
                if (locations.length > 0) {
                    await queryRunner.manager.save(locations);
                }
            }
            if (dto.businessSectors && dto.businessSectors.length > 0) {
                const sectors = dto.businessSectors.map((sector) => {
                    const cleanedSector = this.removeUndefinedValues(sector);
                    return this.businessSectorRepository.create(Object.assign(Object.assign({}, cleanedSector), { operatorId: savedOperator.id, mainSector: sector.mainSector ? sector.mainSector : undefined }));
                });
                await queryRunner.manager.save(sectors);
            }
            if (dto.marketInfo) {
                const _1 = dto.marketInfo, { primaryExportMarket } = _1, marketData = __rest(_1, ["primaryExportMarket"]);
                const cleanedMarket = this.removeUndefinedValues(marketData);
                const market = this.marketRepository.create(Object.assign(Object.assign({}, cleanedMarket), { operatorId: savedOperator.id, domesticMarkets: dto.marketInfo.domesticMarkets || [], exportMarkets: dto.marketInfo.exportMarkets || [], importSources: dto.marketInfo.importSources || [], primaryExportMarketId: primaryExportMarket || undefined }));
                await queryRunner.manager.save(market);
            }
            if (dto.productionCapacity) {
                const cleanedCapacity = this.removeUndefinedValues(dto.productionCapacity);
                const productionCapacity = this.productionCapacityRepository.create(Object.assign(Object.assign({}, cleanedCapacity), { operatorId: savedOperator.id, qmsType: dto.productionCapacity.qmsType ? dto.productionCapacity.qmsType : undefined }));
                await queryRunner.manager.save(productionCapacity);
            }
            if (dto.preferences) {
                const cleanedPreferences = this.removeUndefinedValues(dto.preferences);
                const preferences = this.preferenceRepository.create(Object.assign(Object.assign({}, cleanedPreferences), { operatorId: savedOperator.id, preferredLanguage: dto.preferences.preferredLanguage ? dto.preferences.preferredLanguage : undefined, communicationPreferences: dto.preferences.communicationPreferences || [], notificationFrequency: dto.preferences.notificationFrequency ? dto.preferences.notificationFrequency : undefined }));
                await queryRunner.manager.save(preferences);
            }
            if (dto.accessibility) {
                const cleanedAccessibility = this.removeUndefinedValues(dto.accessibility);
                const accessibility = this.accessibilityRepository.create(Object.assign(Object.assign({}, cleanedAccessibility), { operatorId: savedOperator.id, disabilityTypes: dto.accessibility.disabilityTypes || [], literacyLevel: dto.accessibility.literacyLevel ? dto.accessibility.literacyLevel : undefined, internetAccess: dto.accessibility.internetAccess ? dto.accessibility.internetAccess : undefined, deviceType: dto.accessibility.deviceType ? dto.accessibility.deviceType : undefined }));
                await queryRunner.manager.save(accessibility);
            }
            if (dto.consents) {
                const cleanedConsents = this.removeUndefinedValues(dto.consents);
                const consents = this.consentRepository.create(Object.assign(Object.assign({}, cleanedConsents), { operatorId: savedOperator.id }));
                await queryRunner.manager.save(consents);
            }
            await queryRunner.commitTransaction();
            return this.findById(savedOperator.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error creating operator registration:', error);
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            }
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
                    legalRegistrationNumberType: dto.companyInfo.legalRegistrationNumberType,
                    legalRegistrationNumber: dto.companyInfo.legalRegistrationNumber,
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
            if (dto.isGroup !== undefined) {
                operator.isGroup = dto.isGroup;
            }
            if (dto.groupManagerId !== undefined) {
                operator.groupManagerId = dto.groupManagerId;
            }
            if (dto.groupMembers !== undefined) {
                operator.groupMembers = dto.groupMembers;
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
        if (!operator.legalRegistrationNumberType || !operator.legalRegistrationNumber) {
            throw new common_1.BadRequestException('Legal registration number type and number are required');
        }
        if (operator.locations && operator.locations.length > 0) {
            for (const location of operator.locations) {
                if (location.geoLat === null ||
                    location.geoLat === undefined ||
                    location.geoLng === null ||
                    location.geoLng === undefined ||
                    location.geoAccuracyM === null ||
                    location.geoAccuracyM === undefined) {
                    throw new common_1.BadRequestException('Geo coordinates and accuracy are required for all locations');
                }
                if (Number(location.geoAccuracyM) > 10) {
                    throw new common_1.BadRequestException('Geo accuracy must be within 10 meters');
                }
            }
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