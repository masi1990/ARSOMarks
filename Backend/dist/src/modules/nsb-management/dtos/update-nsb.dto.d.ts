import { CreateNsbDto } from './create-nsb.dto';
declare class UpdateNsbProfileDto {
    websiteUrl?: string;
    socialMediaHandles?: Record<string, string>;
    totalStaff?: number;
    keyDepartments?: string[];
    nationalStandardsActLink?: string;
    nationalConformityAssessmentPolicyLink?: string;
    nationalQualityPolicyLink?: string;
}
declare const UpdateNsbDto_base: import("@nestjs/mapped-types").MappedType<UpdateNsbProfileDto & Partial<CreateNsbDto>>;
export declare class UpdateNsbDto extends UpdateNsbDto_base {
}
export {};
