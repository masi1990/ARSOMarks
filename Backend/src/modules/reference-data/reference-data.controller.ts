import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { ReferenceDataService } from './reference-data.service';
import {
  CreateCountryDto,
  CreateRecDto,
  CreateRegionDto,
  UpdateCountryDto,
  UpdateRecDto,
  UpdateRegionDto,
} from './dtos';

@Controller('reference')
export class ReferenceDataController {
  constructor(private readonly service: ReferenceDataService) {}

  @Public()
  @Get('countries')
  getCountries() {
    return this.service.getCountries();
  }

  @Public()
  @Get('countries/:id')
  getCountry(@Param('id') countryId: string) {
    return this.service.getCountry(countryId);
  }

  @Post('countries')
  createCountry(@Body() dto: CreateCountryDto) {
    return this.service.createCountry(dto);
  }

  @Put('countries/:id')
  updateCountry(@Param('id') countryId: string, @Body() dto: UpdateCountryDto) {
    return this.service.updateCountry(countryId, dto);
  }

  @Delete('countries/:id')
  deleteCountry(@Param('id') countryId: string) {
    return this.service.deleteCountry(countryId);
  }

  @Public()
  @Get('regions')
  getRegions() {
    return this.service.getRegions();
  }

  @Public()
  @Get('regions/:id')
  getRegion(@Param('id') regionId: string) {
    return this.service.getRegion(regionId);
  }

  @Post('regions')
  createRegion(@Body() dto: CreateRegionDto) {
    return this.service.createRegion(dto);
  }

  @Put('regions/:id')
  updateRegion(@Param('id') regionId: string, @Body() dto: UpdateRegionDto) {
    return this.service.updateRegion(regionId, dto);
  }

  @Delete('regions/:id')
  deleteRegion(@Param('id') regionId: string) {
    return this.service.deleteRegion(regionId);
  }

  @Public()
  @Get('countries/:countryId/regions')
  getRegionsByCountry(@Param('countryId') countryId: string) {
    return this.service.getRegionsByCountry(countryId);
  }

  @Public()
  @Get('recs')
  getRecs() {
    return this.service.getRecs();
  }

  @Public()
  @Get('recs/:id')
  getRec(@Param('id') recId: string) {
    return this.service.getRec(recId);
  }

  @Post('recs')
  createRec(@Body() dto: CreateRecDto) {
    return this.service.createRec(dto);
  }

  @Put('recs/:id')
  updateRec(@Param('id') recId: string, @Body() dto: UpdateRecDto) {
    return this.service.updateRec(recId, dto);
  }

  @Delete('recs/:id')
  deleteRec(@Param('id') recId: string) {
    return this.service.deleteRec(recId);
  }

  @Public()
  @Get('countries/:countryId/recs')
  getRecMemberships(@Param('countryId') countryId: string) {
    return this.service.getCountryRecMemberships(countryId);
  }

  @Public()
  @Get('acap-schemes')
  getAcapSchemes() {
    return this.service.getAcapSchemes();
  }

  @Public()
  @Get('accreditation-bodies')
  getAccreditationBodies() {
    return this.service.getAccreditationBodies();
  }
}

