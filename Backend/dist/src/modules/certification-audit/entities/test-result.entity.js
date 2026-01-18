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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResult = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../shared/enums");
const sampling_record_entity_1 = require("./sampling-record.entity");
const laboratory_entity_1 = require("./laboratory.entity");
let TestResult = class TestResult {
};
exports.TestResult = TestResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TestResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sampling_id', type: 'uuid' }),
    __metadata("design:type", String)
], TestResult.prototype, "samplingId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sampling_record_entity_1.SamplingRecord, (sampling) => sampling.testResults, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sampling_id' }),
    __metadata("design:type", sampling_record_entity_1.SamplingRecord)
], TestResult.prototype, "sampling", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'laboratory_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], TestResult.prototype, "laboratoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => laboratory_entity_1.Laboratory, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'laboratory_id' }),
    __metadata("design:type", laboratory_entity_1.Laboratory)
], TestResult.prototype, "laboratory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parameters', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], TestResult.prototype, "parameters", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_file_path', length: 500, nullable: true }),
    __metadata("design:type", String)
], TestResult.prototype, "reportFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result_status', type: 'enum', enum: enums_1.TestResultStatus, default: enums_1.TestResultStatus.PASS }),
    __metadata("design:type", String)
], TestResult.prototype, "resultStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tested_at', type: 'date', nullable: true }),
    __metadata("design:type", String)
], TestResult.prototype, "testedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TestResult.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TestResult.prototype, "updatedAt", void 0);
exports.TestResult = TestResult = __decorate([
    (0, typeorm_1.Entity)('test_results')
], TestResult);
//# sourceMappingURL=test-result.entity.js.map