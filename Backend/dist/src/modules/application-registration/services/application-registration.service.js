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
exports.ApplicationRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const enums_1 = require("../../../shared/enums");
let ApplicationRegistrationService = class ApplicationRegistrationService {
    constructor(applicationRegistrationRepository) {
        this.applicationRegistrationRepository = applicationRegistrationRepository;
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
    async createDraft(dto, userId) {
        const cleanedDto = this.removeUndefinedValues(dto);
        const { companyInfo, companySize, ownershipInfo, primaryContact, locations, businessSectors, marketInfo, productionCapacity, preferences, accessibility, consents, productCertification, manufacturerInfo, conformityEvidence, postCertification, cbSelection, countryId } = cleanedDto, flatFields = __rest(cleanedDto, ["companyInfo", "companySize", "ownershipInfo", "primaryContact", "locations", "businessSectors", "marketInfo", "productionCapacity", "preferences", "accessibility", "consents", "productCertification", "manufacturerInfo", "conformityEvidence", "postCertification", "cbSelection", "countryId"]);
        const applicationRegistration = this.applicationRegistrationRepository.create(Object.assign(Object.assign({}, flatFields), { companyInfo: companyInfo || undefined, companySize: companySize || undefined, ownershipInfo: ownershipInfo || undefined, primaryContact: primaryContact || undefined, locations: locations || undefined, businessSectors: businessSectors || undefined, marketInfo: marketInfo || undefined, productionCapacity: productionCapacity || undefined, preferences: preferences || undefined, accessibility: accessibility || undefined, consents: consents || undefined, productCertification: productCertification || undefined, manufacturerInfo: manufacturerInfo || undefined, conformityEvidence: conformityEvidence || undefined, postCertification: postCertification || undefined, cbSelection: cbSelection || undefined, countryId: countryId || undefined, status: enums_1.ApplicationRegistrationStatus.DRAFT, userId: dto.userId || userId, createdBy: userId, updatedBy: userId }));
        return this.applicationRegistrationRepository.save(applicationRegistration);
    }
    async create(dto, userId) {
        const { productCertification, manufacturerInfo, conformityEvidence, postCertification, cbSelection } = dto, flatFields = __rest(dto, ["productCertification", "manufacturerInfo", "conformityEvidence", "postCertification", "cbSelection"]);
        const applicationRegistration = this.applicationRegistrationRepository.create(Object.assign(Object.assign({}, flatFields), { productCertification: productCertification || undefined, manufacturerInfo: manufacturerInfo || undefined, conformityEvidence: conformityEvidence || undefined, postCertification: postCertification || undefined, cbSelection: cbSelection || undefined, status: enums_1.ApplicationRegistrationStatus.DRAFT, userId: dto.userId || userId, createdBy: userId, updatedBy: userId }));
        return this.applicationRegistrationRepository.save(applicationRegistration);
    }
    async update(id, dto, userId) {
        const applicationRegistration = await this.findById(id);
        if (applicationRegistration.status !== enums_1.ApplicationRegistrationStatus.DRAFT) {
            throw new common_1.BadRequestException('Can only update draft registrations');
        }
        const cleanedDto = this.removeUndefinedValues(dto);
        const { companyInfo, companySize, ownershipInfo, primaryContact, locations, businessSectors, marketInfo, productionCapacity, preferences, accessibility, consents, productCertification, manufacturerInfo, conformityEvidence, postCertification, cbSelection, countryId } = cleanedDto, flatFields = __rest(cleanedDto, ["companyInfo", "companySize", "ownershipInfo", "primaryContact", "locations", "businessSectors", "marketInfo", "productionCapacity", "preferences", "accessibility", "consents", "productCertification", "manufacturerInfo", "conformityEvidence", "postCertification", "cbSelection", "countryId"]);
        Object.assign(applicationRegistration, flatFields);
        if (companyInfo !== undefined)
            applicationRegistration.companyInfo = companyInfo;
        if (companySize !== undefined)
            applicationRegistration.companySize = companySize;
        if (ownershipInfo !== undefined)
            applicationRegistration.ownershipInfo = ownershipInfo;
        if (primaryContact !== undefined)
            applicationRegistration.primaryContact = primaryContact;
        if (locations !== undefined)
            applicationRegistration.locations = locations;
        if (businessSectors !== undefined)
            applicationRegistration.businessSectors = businessSectors;
        if (marketInfo !== undefined)
            applicationRegistration.marketInfo = marketInfo;
        if (productionCapacity !== undefined)
            applicationRegistration.productionCapacity = productionCapacity;
        if (preferences !== undefined)
            applicationRegistration.preferences = preferences;
        if (accessibility !== undefined)
            applicationRegistration.accessibility = accessibility;
        if (consents !== undefined)
            applicationRegistration.consents = consents;
        if (productCertification !== undefined)
            applicationRegistration.productCertification = productCertification;
        if (manufacturerInfo !== undefined)
            applicationRegistration.manufacturerInfo = manufacturerInfo;
        if (conformityEvidence !== undefined)
            applicationRegistration.conformityEvidence = conformityEvidence;
        if (postCertification !== undefined)
            applicationRegistration.postCertification = postCertification;
        if (cbSelection !== undefined)
            applicationRegistration.cbSelection = cbSelection;
        if (countryId !== undefined)
            applicationRegistration.countryId = countryId;
        applicationRegistration.updatedBy = userId;
        return this.applicationRegistrationRepository.save(applicationRegistration);
    }
    async submit(id, userId) {
        const applicationRegistration = await this.findById(id);
        if (applicationRegistration.status !== enums_1.ApplicationRegistrationStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft registrations can be submitted');
        }
        if (!applicationRegistration.applicantName) {
            throw new common_1.BadRequestException('Applicant name is required');
        }
        if (!applicationRegistration.applicantType) {
            throw new common_1.BadRequestException('Applicant type is required');
        }
        if (!applicationRegistration.registrationNumber) {
            throw new common_1.BadRequestException('Registration number is required');
        }
        if (!applicationRegistration.contactPerson) {
            throw new common_1.BadRequestException('Contact person is required');
        }
        if (!applicationRegistration.contactEmail) {
            throw new common_1.BadRequestException('Contact email is required');
        }
        if (!applicationRegistration.contactPhone) {
            throw new common_1.BadRequestException('Contact phone is required');
        }
        if (!applicationRegistration.physicalAddress) {
            throw new common_1.BadRequestException('Physical address is required');
        }
        if (!applicationRegistration.city) {
            throw new common_1.BadRequestException('City is required');
        }
        if (!applicationRegistration.regionState) {
            throw new common_1.BadRequestException('Region/State is required');
        }
        if (!applicationRegistration.postalCode) {
            throw new common_1.BadRequestException('Postal code is required');
        }
        if (!applicationRegistration.countryId) {
            throw new common_1.BadRequestException('Country is required');
        }
        if (!applicationRegistration.businessActivity) {
            throw new common_1.BadRequestException('Business activity is required');
        }
        applicationRegistration.status = enums_1.ApplicationRegistrationStatus.SUBMITTED;
        applicationRegistration.submittedAt = new Date();
        applicationRegistration.updatedBy = userId;
        return this.applicationRegistrationRepository.save(applicationRegistration);
    }
    async findById(id) {
        const applicationRegistration = await this.applicationRegistrationRepository.findOne({
            where: { id },
            relations: ['country', 'user'],
        });
        if (!applicationRegistration) {
            throw new common_1.NotFoundException(`Application registration with ID ${id} not found`);
        }
        return applicationRegistration;
    }
    async findByUserId(userId) {
        return this.applicationRegistrationRepository.find({
            where: { userId },
            relations: ['country'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAll(filters) {
        const queryBuilder = this.applicationRegistrationRepository.createQueryBuilder('application');
        if (filters === null || filters === void 0 ? void 0 : filters.status) {
            queryBuilder.andWhere('application.status = :status', { status: filters.status });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.countryId) {
            queryBuilder.andWhere('application.countryId = :countryId', { countryId: filters.countryId });
        }
        const total = await queryBuilder.getCount();
        if ((filters === null || filters === void 0 ? void 0 : filters.skip) !== undefined) {
            queryBuilder.skip(filters.skip);
        }
        if ((filters === null || filters === void 0 ? void 0 : filters.limit) !== undefined) {
            queryBuilder.limit(filters.limit);
        }
        queryBuilder
            .leftJoinAndSelect('application.country', 'country')
            .orderBy('application.createdAt', 'DESC');
        const data = await queryBuilder.getMany();
        return { data, total };
    }
    async delete(id, userId) {
        const applicationRegistration = await this.findById(id);
        if (applicationRegistration.status !== enums_1.ApplicationRegistrationStatus.DRAFT) {
            throw new common_1.BadRequestException('Can only delete draft registrations');
        }
        await this.applicationRegistrationRepository.remove(applicationRegistration);
    }
};
exports.ApplicationRegistrationService = ApplicationRegistrationService;
exports.ApplicationRegistrationService = ApplicationRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ApplicationRegistration)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ApplicationRegistrationService);
//# sourceMappingURL=application-registration.service.js.map