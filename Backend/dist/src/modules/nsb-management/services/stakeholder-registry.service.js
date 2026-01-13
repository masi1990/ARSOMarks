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
exports.StakeholderRegistryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nsb_entity_1 = require("../entities/nsb.entity");
const nsb_market_surveillance_authority_entity_1 = require("../entities/nsb-market-surveillance-authority.entity");
const nsb_customs_border_agency_entity_1 = require("../entities/nsb-customs-border-agency.entity");
const nsb_regulatory_agency_entity_1 = require("../entities/nsb-regulatory-agency.entity");
const nsb_industry_association_entity_1 = require("../entities/nsb-industry-association.entity");
const nsb_testing_laboratory_entity_1 = require("../entities/nsb-testing-laboratory.entity");
const enums_1 = require("../../../shared/enums");
let StakeholderRegistryService = class StakeholderRegistryService {
    constructor(nsbRepository, msaRepository, customsRepository, regulatoryRepository, industryRepository, laboratoryRepository, dataSource) {
        this.nsbRepository = nsbRepository;
        this.msaRepository = msaRepository;
        this.customsRepository = customsRepository;
        this.regulatoryRepository = regulatoryRepository;
        this.industryRepository = industryRepository;
        this.laboratoryRepository = laboratoryRepository;
        this.dataSource = dataSource;
    }
    async getStakeholderRegistry(nsbId) {
        const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
        if (!nsb) {
            throw new common_1.NotFoundException(`NSB with ID ${nsbId} not found`);
        }
        const [msas, customs, regulatory, industry, laboratories] = await Promise.all([
            this.msaRepository.find({ where: { nsbId, isActive: true } }),
            this.customsRepository.find({ where: { nsbId, isActive: true } }),
            this.regulatoryRepository.find({ where: { nsbId, isActive: true } }),
            this.industryRepository.find({ where: { nsbId, isActive: true } }),
            this.laboratoryRepository.find({ where: { nsbId, isActive: true } }),
        ]);
        return {
            marketSurveillanceAuthorities: msas.map((m) => ({
                id: m.id,
                agencyName: m.agencyName,
                jurisdiction: m.jurisdiction,
                contactPersonName: m.contactPersonName,
                contactPersonEmail: m.contactPersonEmail,
                contactPersonPhone: m.contactPersonPhone,
                scopeOfAuthority: m.scopeOfAuthority,
                mouStatus: m.mouStatus,
                mouDocumentPath: m.mouDocumentPath,
                mouDocumentHash: m.mouDocumentHash,
                systemAccessLevelRequested: m.systemAccessLevelRequested,
                isActive: m.isActive,
            })),
            customsBorderAgencies: customs.map((c) => ({
                id: c.id,
                agencyName: c.agencyName,
                keyBorderPosts: [],
                acapVerificationContactName: c.acapVerificationContactName,
                acapVerificationContactEmail: c.acapVerificationContactEmail,
                acapVerificationContactPhone: c.acapVerificationContactPhone,
                integrationWithNationalSingleWindow: c.integrationStatus === 'FULLY_INTEGRATED' || c.integrationStatus === 'PARTIAL_INTEGRATION',
                isActive: c.isActive,
            })),
            regulatoryAgencies: regulatory.map((r) => ({
                id: r.id,
                agencyName: r.agencyName,
                agencyType: r.agencyType,
                otherTypeDescription: r.otherTypeDescription,
                contactPersonName: r.contactPersonName,
                contactPersonEmail: r.contactPersonEmail,
                contactPersonPhone: r.contactPersonPhone,
                isActive: r.isActive,
            })),
            industryAssociations: industry.map((i) => ({
                id: i.id,
                associationName: i.associationName,
                sectorIndustry: i.sectorIndustry,
                numberOfMembers: i.numberOfMembers,
                contactPersonName: i.contactPersonName,
                contactPersonEmail: i.contactPersonEmail,
                contactPersonPhone: i.contactPersonPhone,
                willingnessToPromoteAcap: i.willingnessToPromoteAcap,
                isActive: i.isActive,
            })),
            testingLaboratories: laboratories.map((l) => ({
                id: l.id,
                name: l.name,
                accreditationStatus: l.accreditationStatus,
                otherAccreditationDescription: l.otherAccreditationDescription,
                scopeOfAccreditation: l.scopeOfAccreditation,
                contactForAcapReferralsName: l.contactForAcapReferralsName,
                contactForAcapReferralsEmail: l.contactForAcapReferralsEmail,
                contactForAcapReferralsPhone: l.contactForAcapReferralsPhone,
                isActive: l.isActive,
            })),
        };
    }
    async updateStakeholderRegistry(nsbId, dto) {
        const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
        if (!nsb) {
            throw new common_1.NotFoundException(`NSB with ID ${nsbId} not found`);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (dto.marketSurveillanceAuthorities !== undefined) {
                await queryRunner.manager.delete('nsb_market_surveillance_authorities', { nsbId });
                if (dto.marketSurveillanceAuthorities.length > 0) {
                    const msas = dto.marketSurveillanceAuthorities.map((m) => this.msaRepository.create({
                        nsbId,
                        agencyName: m.agencyName,
                        jurisdiction: m.jurisdiction,
                        contactPersonName: m.contactPersonName,
                        contactPersonEmail: m.contactPersonEmail,
                        contactPersonPhone: m.contactPersonPhone,
                        scopeOfAuthority: m.scopeOfAuthority,
                        mouStatus: m.mouStatus,
                        mouDocumentPath: m.mouDocumentPath,
                        mouDocumentHash: m.mouDocumentHash,
                        systemAccessLevelRequested: m.systemAccessLevelRequested,
                        isActive: m.isActive !== undefined ? m.isActive : true,
                    }));
                    await queryRunner.manager.save(msas);
                }
            }
            if (dto.customsBorderAgencies !== undefined) {
                await queryRunner.manager.delete('nsb_customs_border_agencies', { nsbId });
                if (dto.customsBorderAgencies.length > 0) {
                    const customs = dto.customsBorderAgencies.map((c) => this.customsRepository.create({
                        nsbId,
                        agencyName: c.agencyName,
                        acapVerificationContactName: c.acapVerificationContactName,
                        acapVerificationContactEmail: c.acapVerificationContactEmail,
                        acapVerificationContactPhone: c.acapVerificationContactPhone,
                        integrationStatus: c.integrationWithNationalSingleWindow !== undefined
                            ? (c.integrationWithNationalSingleWindow ? 'PARTIAL_INTEGRATION' : 'NO_INTEGRATION')
                            : undefined,
                        isActive: c.isActive !== undefined ? c.isActive : true,
                    }));
                    await queryRunner.manager.save(customs);
                }
            }
            if (dto.regulatoryAgencies !== undefined) {
                await queryRunner.manager.delete('nsb_regulatory_agencies', { nsbId });
                if (dto.regulatoryAgencies.length > 0) {
                    const regulatory = dto.regulatoryAgencies.map((r) => this.regulatoryRepository.create({
                        nsbId,
                        agencyName: r.agencyName,
                        agencyType: r.agencyType,
                        otherTypeDescription: r.otherTypeDescription,
                        contactPersonName: r.contactPersonName,
                        contactPersonEmail: r.contactPersonEmail,
                        contactPersonPhone: r.contactPersonPhone,
                        isActive: r.isActive !== undefined ? r.isActive : true,
                    }));
                    await queryRunner.manager.save(regulatory);
                }
            }
            if (dto.industryAssociations !== undefined) {
                await queryRunner.manager.delete('nsb_industry_associations', { nsbId });
                if (dto.industryAssociations.length > 0) {
                    const industry = dto.industryAssociations.map((i) => this.industryRepository.create({
                        nsbId,
                        associationName: i.associationName,
                        sectorIndustry: i.sectorIndustry,
                        numberOfMembers: i.numberOfMembers,
                        contactPersonName: i.contactPersonName,
                        contactPersonEmail: i.contactPersonEmail,
                        contactPersonPhone: i.contactPersonPhone,
                        willingnessToPromoteAcap: i.willingnessToPromoteAcap !== undefined ? i.willingnessToPromoteAcap : false,
                        isActive: i.isActive !== undefined ? i.isActive : true,
                    }));
                    await queryRunner.manager.save(industry);
                }
            }
            if (dto.testingLaboratories !== undefined) {
                await queryRunner.manager.delete('nsb_testing_laboratories', { nsbId });
                if (dto.testingLaboratories.length > 0) {
                    const laboratories = dto.testingLaboratories.map((l) => this.laboratoryRepository.create({
                        nsbId,
                        name: l.name,
                        accreditationStatus: l.accreditationStatus,
                        otherAccreditationDescription: l.otherAccreditationDescription,
                        scopeOfAccreditation: l.scopeOfAccreditation,
                        contactForAcapReferralsName: l.contactForAcapReferralsName,
                        contactForAcapReferralsEmail: l.contactForAcapReferralsEmail,
                        contactForAcapReferralsPhone: l.contactForAcapReferralsPhone,
                        isActive: l.isActive !== undefined ? l.isActive : true,
                    }));
                    await queryRunner.manager.save(laboratories);
                }
            }
            await queryRunner.commitTransaction();
            return this.getStakeholderRegistry(nsbId);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async saveDraft(nsbId, dto, userId) {
        const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
        if (!nsb) {
            throw new common_1.NotFoundException(`NSB with ID ${nsbId} not found`);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.updateStakeholderRegistryData(nsbId, dto, queryRunner);
            await queryRunner.manager.update('nsb', { id: nsbId }, {
                stakeholderRegistryStatus: enums_1.StakeholderRegistryStatus.DRAFT,
                stakeholderRegistrySubmittedAt: null,
                stakeholderRegistrySubmittedBy: null,
            });
            await queryRunner.commitTransaction();
            return this.getStakeholderRegistry(nsbId);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async submitRegistry(nsbId, dto, userId) {
        const nsb = await this.nsbRepository.findOne({ where: { id: nsbId } });
        if (!nsb) {
            throw new common_1.NotFoundException(`NSB with ID ${nsbId} not found`);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.updateStakeholderRegistryData(nsbId, dto, queryRunner);
            await queryRunner.manager.update('nsb', { id: nsbId }, {
                stakeholderRegistryStatus: enums_1.StakeholderRegistryStatus.SUBMITTED,
                stakeholderRegistrySubmittedAt: new Date(),
                stakeholderRegistrySubmittedBy: userId,
            });
            await queryRunner.commitTransaction();
            return this.getStakeholderRegistry(nsbId);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateStakeholderRegistryData(nsbId, dto, queryRunner) {
        if (dto.marketSurveillanceAuthorities !== undefined) {
            await queryRunner.manager.delete('nsb_market_surveillance_authorities', { nsbId });
            if (dto.marketSurveillanceAuthorities.length > 0) {
                const msas = dto.marketSurveillanceAuthorities.map((m) => this.msaRepository.create({
                    nsbId,
                    agencyName: m.agencyName,
                    jurisdiction: m.jurisdiction,
                    contactPersonName: m.contactPersonName,
                    contactPersonEmail: m.contactPersonEmail,
                    contactPersonPhone: m.contactPersonPhone,
                    scopeOfAuthority: m.scopeOfAuthority,
                    mouStatus: m.mouStatus,
                    mouDocumentPath: m.mouDocumentPath,
                    mouDocumentHash: m.mouDocumentHash,
                    systemAccessLevelRequested: m.systemAccessLevelRequested,
                    isActive: m.isActive !== undefined ? m.isActive : true,
                }));
                await queryRunner.manager.save(msas);
            }
        }
        if (dto.customsBorderAgencies !== undefined) {
            await queryRunner.manager.delete('nsb_customs_border_agencies', { nsbId });
            if (dto.customsBorderAgencies.length > 0) {
                const customs = dto.customsBorderAgencies.map((c) => this.customsRepository.create({
                    nsbId,
                    agencyName: c.agencyName,
                    acapVerificationContactName: c.acapVerificationContactName,
                    acapVerificationContactEmail: c.acapVerificationContactEmail,
                    acapVerificationContactPhone: c.acapVerificationContactPhone,
                    integrationStatus: c.integrationWithNationalSingleWindow !== undefined
                        ? (c.integrationWithNationalSingleWindow ? 'PARTIAL_INTEGRATION' : 'NO_INTEGRATION')
                        : undefined,
                    isActive: c.isActive !== undefined ? c.isActive : true,
                }));
                await queryRunner.manager.save(customs);
            }
        }
        if (dto.regulatoryAgencies !== undefined) {
            await queryRunner.manager.delete('nsb_regulatory_agencies', { nsbId });
            if (dto.regulatoryAgencies.length > 0) {
                const regulatory = dto.regulatoryAgencies.map((r) => this.regulatoryRepository.create({
                    nsbId,
                    agencyName: r.agencyName,
                    agencyType: r.agencyType,
                    otherTypeDescription: r.otherTypeDescription,
                    contactPersonName: r.contactPersonName,
                    contactPersonEmail: r.contactPersonEmail,
                    contactPersonPhone: r.contactPersonPhone,
                    isActive: r.isActive !== undefined ? r.isActive : true,
                }));
                await queryRunner.manager.save(regulatory);
            }
        }
        if (dto.industryAssociations !== undefined) {
            await queryRunner.manager.delete('nsb_industry_associations', { nsbId });
            if (dto.industryAssociations.length > 0) {
                const industry = dto.industryAssociations.map((i) => this.industryRepository.create({
                    nsbId,
                    associationName: i.associationName,
                    sectorIndustry: i.sectorIndustry,
                    numberOfMembers: i.numberOfMembers,
                    contactPersonName: i.contactPersonName,
                    contactPersonEmail: i.contactPersonEmail,
                    contactPersonPhone: i.contactPersonPhone,
                    willingnessToPromoteAcap: i.willingnessToPromoteAcap !== undefined ? i.willingnessToPromoteAcap : false,
                    isActive: i.isActive !== undefined ? i.isActive : true,
                }));
                await queryRunner.manager.save(industry);
            }
        }
        if (dto.testingLaboratories !== undefined) {
            await queryRunner.manager.delete('nsb_testing_laboratories', { nsbId });
            if (dto.testingLaboratories.length > 0) {
                const laboratories = dto.testingLaboratories.map((l) => this.laboratoryRepository.create({
                    nsbId,
                    name: l.name,
                    accreditationStatus: l.accreditationStatus,
                    otherAccreditationDescription: l.otherAccreditationDescription,
                    scopeOfAccreditation: l.scopeOfAccreditation,
                    contactForAcapReferralsName: l.contactForAcapReferralsName,
                    contactForAcapReferralsEmail: l.contactForAcapReferralsEmail,
                    contactForAcapReferralsPhone: l.contactForAcapReferralsPhone,
                    isActive: l.isActive !== undefined ? l.isActive : true,
                }));
                await queryRunner.manager.save(laboratories);
            }
        }
    }
};
exports.StakeholderRegistryService = StakeholderRegistryService;
exports.StakeholderRegistryService = StakeholderRegistryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nsb_entity_1.Nsb)),
    __param(1, (0, typeorm_1.InjectRepository)(nsb_market_surveillance_authority_entity_1.NsbMarketSurveillanceAuthority)),
    __param(2, (0, typeorm_1.InjectRepository)(nsb_customs_border_agency_entity_1.NsbCustomsBorderAgency)),
    __param(3, (0, typeorm_1.InjectRepository)(nsb_regulatory_agency_entity_1.NsbRegulatoryAgency)),
    __param(4, (0, typeorm_1.InjectRepository)(nsb_industry_association_entity_1.NsbIndustryAssociation)),
    __param(5, (0, typeorm_1.InjectRepository)(nsb_testing_laboratory_entity_1.NsbTestingLaboratory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], StakeholderRegistryService);
//# sourceMappingURL=stakeholder-registry.service.js.map