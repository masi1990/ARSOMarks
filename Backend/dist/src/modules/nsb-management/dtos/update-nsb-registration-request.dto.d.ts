import { CreateNsbRegistrationRequestDto } from './create-nsb-registration-request.dto';
import { NsbRegistrationRequestStatus } from '../../../shared/enums';
declare const UpdateNsbRegistrationRequestDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateNsbRegistrationRequestDto>>;
export declare class UpdateNsbRegistrationRequestDto extends UpdateNsbRegistrationRequestDto_base {
    status?: NsbRegistrationRequestStatus;
    remarks?: string;
    nsbId?: string;
}
export {};
