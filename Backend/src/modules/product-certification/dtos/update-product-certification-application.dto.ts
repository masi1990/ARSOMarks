import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCertificationApplicationDto } from './create-product-certification-application.dto';

export class UpdateProductCertificationApplicationDto extends PartialType(CreateProductCertificationApplicationDto) {}

