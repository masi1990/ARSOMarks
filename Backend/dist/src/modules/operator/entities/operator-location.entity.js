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
exports.OperatorLocation = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
const country_entity_1 = require("../../reference-data/entities/country.entity");
const enums_1 = require("../../../shared/enums");
let OperatorLocation = class OperatorLocation {
};
exports.OperatorLocation = OperatorLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperatorLocation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', type: 'uuid' }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.Operator, (operator) => operator.locations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", operator_entity_1.Operator)
], OperatorLocation.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location_type', type: 'enum', enum: enums_1.OperatorLocationType, default: enums_1.OperatorLocationType.REGISTERED_ADDRESS }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "locationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'physical_address', type: 'text' }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "physicalAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line1', length: 100 }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "addressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line2', length: 100, nullable: true }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "addressLine2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', length: 20 }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_town', length: 100 }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "cityTown", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'region_state', length: 100 }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "regionState", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'uuid' }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], OperatorLocation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gps_coordinates', length: 50, nullable: true }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "gpsCoordinates", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'factory_location_same', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], OperatorLocation.prototype, "factoryLocationSame", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'factory_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "factoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'factory_type', type: 'enum', enum: enums_1.FactoryType, nullable: true }),
    __metadata("design:type", String)
], OperatorLocation.prototype, "factoryType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'factory_size', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], OperatorLocation.prototype, "factorySize", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OperatorLocation.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorLocation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OperatorLocation.prototype, "updatedAt", void 0);
exports.OperatorLocation = OperatorLocation = __decorate([
    (0, typeorm_1.Entity)('operator_locations')
], OperatorLocation);
//# sourceMappingURL=operator-location.entity.js.map