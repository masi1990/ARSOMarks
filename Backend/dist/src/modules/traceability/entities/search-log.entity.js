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
exports.SearchLog = void 0;
const typeorm_1 = require("typeorm");
let SearchLog = class SearchLog {
};
exports.SearchLog = SearchLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SearchLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'query', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SearchLog.prototype, "query", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'filters', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], SearchLog.prototype, "filters", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip', length: 64, nullable: true }),
    __metadata("design:type", String)
], SearchLog.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country', length: 100, nullable: true }),
    __metadata("design:type", String)
], SearchLog.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', length: 100, nullable: true }),
    __metadata("design:type", String)
], SearchLog.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lat', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], SearchLog.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lon', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], SearchLog.prototype, "lon", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], SearchLog.prototype, "createdAt", void 0);
exports.SearchLog = SearchLog = __decorate([
    (0, typeorm_1.Entity)('search_logs')
], SearchLog);
//# sourceMappingURL=search-log.entity.js.map