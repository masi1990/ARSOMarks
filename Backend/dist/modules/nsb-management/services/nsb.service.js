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
exports.NsbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nsb_entity_1 = require("../entities/nsb.entity");
const nsb_contact_entity_1 = require("../entities/nsb-contact.entity");
const nsb_location_entity_1 = require("../entities/nsb-location.entity");
const enums_1 = require("../../../shared/enums");
let NsbService = class NsbService {
    constructor(nsbRepository, contactRepository, locationRepository, dataSource) {
        this.nsbRepository = nsbRepository;
        this.contactRepository = contactRepository;
        this.locationRepository = locationRepository;
        this.dataSource = dataSource;
    }
    async createNsb(createDto, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingNsb = await this.nsbRepository.findOne({
                where: { countryId: createDto.countryId, status: enums_1.NsbStatus.ACTIVE },
            });
            if (existingNsb) {
                throw new common_1.ConflictException('An active NSB already exists for this country');
            }
            const nsb = this.nsbRepository.create(Object.assign(Object.assign({}, createDto), { createdBy: userId, updatedBy: userId }));
            const savedNsb = await queryRunner.manager.save(nsb);
            const contacts = createDto.contacts.map((contact) => this.contactRepository.create(Object.assign(Object.assign({}, contact), { nsbId: savedNsb.id })));
            await queryRunner.manager.save(contacts);
            if (createDto.locations && createDto.locations.length > 0) {
                const locations = createDto.locations.map((location) => this.locationRepository.create(Object.assign(Object.assign({}, location), { nsbId: savedNsb.id })));
                await queryRunner.manager.save(locations);
            }
            await queryRunner.commitTransaction();
            return this.findById(savedNsb.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateNsb(id, updateDto, userId) {
        const nsb = await this.nsbRepository.findOne({ where: { id } });
        if (!nsb) {
            throw new common_1.NotFoundException(`NSB with ID ${id} not found`);
        }
        Object.assign(nsb, Object.assign(Object.assign({}, updateDto), { updatedBy: userId, updatedAt: new Date() }));
        if (updateDto.contacts) {
            await this.contactRepository.delete({ nsbId: id });
            const contacts = updateDto.contacts.map((contact) => this.contactRepository.create(Object.assign(Object.assign({}, contact), { nsbId: id })));
            await this.contactRepository.save(contacts);
        }
        if (updateDto.locations) {
            await this.locationRepository.delete({ nsbId: id });
            const locations = updateDto.locations.map((location) => this.locationRepository.create(Object.assign(Object.assign({}, location), { nsbId: id })));
            await this.locationRepository.save(locations);
        }
        return this.nsbRepository.save(nsb);
    }
    async findById(id) {
        const nsb = await this.nsbRepository.findOne({
            where: { id },
            relations: ['contacts', 'locations', 'country', 'country.region', 'country.recMemberships', 'country.recMemberships.rec'],
        });
        if (!nsb) {
            throw new common_1.NotFoundException(`NSB with ID ${id} not found`);
        }
        return nsb;
    }
    async findAll(filter = {}) {
        const query = this.nsbRepository
            .createQueryBuilder('nsb')
            .leftJoinAndSelect('nsb.contacts', 'contacts')
            .leftJoinAndSelect('nsb.locations', 'locations')
            .leftJoinAndSelect('nsb.country', 'country')
            .leftJoinAndSelect('country.region', 'region')
            .leftJoinAndSelect('country.recMemberships', 'recMemberships')
            .leftJoinAndSelect('recMemberships.rec', 'rec')
            .where('nsb.status = :status', { status: enums_1.NsbStatus.ACTIVE });
        if (filter.countryId) {
            query.andWhere('nsb.countryId = :countryId', { countryId: filter.countryId });
        }
        if (filter.regionId) {
            query.andWhere('country.regionId = :regionId', { regionId: filter.regionId });
        }
        if (filter.search) {
            query.andWhere('(nsb.name ILIKE :search OR nsb.shortName ILIKE :search)', {
                search: `%${filter.search}%`,
            });
        }
        const [data, total] = await query.skip(filter.skip).take(filter.limit).getManyAndCount();
        return { data, total };
    }
};
exports.NsbService = NsbService;
exports.NsbService = NsbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nsb_entity_1.Nsb)),
    __param(1, (0, typeorm_1.InjectRepository)(nsb_contact_entity_1.NsbContact)),
    __param(2, (0, typeorm_1.InjectRepository)(nsb_location_entity_1.NsbLocation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], NsbService);
//# sourceMappingURL=nsb.service.js.map