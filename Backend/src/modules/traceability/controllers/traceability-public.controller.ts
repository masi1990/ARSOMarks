import { Controller, Get, Query, Param, Req } from '@nestjs/common';
import { Public } from '../../../common/decorators/public.decorator';
import { TraceabilityService } from '../services/traceability.service';
import { VerifyTokenDto } from '../dtos/verify-token.dto';

@Controller('public/traceability')
export class TraceabilityPublicController {
  constructor(private readonly traceabilityService: TraceabilityService) {}

  @Public()
  @Get('products')
  async listProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('country') country?: string,
    @Query('standard') standard?: string,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Req() req?: any,
  ) {
    const filters = {
      search,
      category,
      country,
      standardCode: standard,
      skip: skip ? parseInt(skip, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    };

    await this.traceabilityService.logSearch(search, filters, {
      ip: this.getIp(req),
      country: req?.headers?.['x-geo-country'],
      city: req?.headers?.['x-geo-city'],
      lat: this.parseNumber(req?.headers?.['x-geo-lat']),
      lon: this.parseNumber(req?.headers?.['x-geo-lon']),
    });

    return this.traceabilityService.publicProducts(filters);
  }

  @Public()
  @Get('products/:id')
  async productDetail(@Param('id') id: string) {
    return this.traceabilityService.publicProductDetail(id);
  }

  @Public()
  @Get('verify')
  async verify(@Query('token') token: string, @Req() req: any) {
    const dto: VerifyTokenDto = {
      token,
      country: req?.headers?.['x-geo-country'],
      city: req?.headers?.['x-geo-city'],
      lat: this.parseNumber(req?.headers?.['x-geo-lat']),
      lon: this.parseNumber(req?.headers?.['x-geo-lon']),
    };
    return this.traceabilityService.verifyToken(dto, {
      ip: this.getIp(req),
      userAgent: req?.headers?.['user-agent'],
    });
  }

  private getIp(req: any): string | undefined {
    if (!req) return undefined;
    const forwarded = req.headers?.['x-forwarded-for'];
    if (Array.isArray(forwarded)) return forwarded[0];
    if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim();
    return req.ip;
  }

  private parseNumber(value: any): number | undefined {
    if (value === undefined || value === null) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
}

