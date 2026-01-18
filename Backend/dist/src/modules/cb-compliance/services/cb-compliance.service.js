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
exports.CbComplianceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cb_compliance_profile_entity_1 = require("../entities/cb-compliance-profile.entity");
const cb_application_entity_1 = require("../../cb-approval/entities/cb-application.entity");
let CbComplianceService = class CbComplianceService {
    constructor(complianceRepository, cbApplicationRepository) {
        this.complianceRepository = complianceRepository;
        this.cbApplicationRepository = cbApplicationRepository;
    }
    async getProfile(cbApplicationId) {
        const profile = await this.complianceRepository.findOne({ where: { cbApplicationId } });
        if (!profile) {
            throw new common_1.NotFoundException('CB compliance profile not found');
        }
        return profile;
    }
    async upsertProfile(cbApplicationId, dto) {
        const application = await this.cbApplicationRepository.findOne({ where: { id: cbApplicationId } });
        if (!application) {
            throw new common_1.NotFoundException('CB application not found');
        }
        let profile = await this.complianceRepository.findOne({ where: { cbApplicationId } });
        if (!profile) {
            profile = this.complianceRepository.create({ cbApplicationId });
        }
        if (dto.responsiblePersons !== undefined) {
            profile.responsiblePersons = JSON.parse(JSON.stringify(dto.responsiblePersons));
        }
        if (dto.auditorQualifications !== undefined) {
            profile.auditorQualifications = JSON.parse(JSON.stringify(dto.auditorQualifications));
        }
        if (dto.countriesOfCertification !== undefined) {
            profile.countriesOfCertification = dto.countriesOfCertification;
        }
        if (dto.localOffices !== undefined) {
            profile.localOffices = JSON.parse(JSON.stringify(dto.localOffices));
        }
        return this.complianceRepository.save(profile);
    }
};
exports.CbComplianceService = CbComplianceService;
exports.CbComplianceService = CbComplianceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cb_compliance_profile_entity_1.CbComplianceProfile)),
    __param(1, (0, typeorm_1.InjectRepository)(cb_application_entity_1.CbApplication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CbComplianceService);
//# sourceMappingURL=cb-compliance.service.js.map