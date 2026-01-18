export interface CbComplianceProfile {
  id: string;
  cbApplicationId: string;
  responsiblePersons?: Record<string, any>[];
  auditorQualifications?: Record<string, any>[];
  countriesOfCertification?: string[];
  localOffices?: Record<string, any>[];
  createdAt: string;
  updatedAt: string;
}

export interface UpsertCbComplianceProfileRequest {
  responsiblePersons?: Record<string, any>[];
  auditorQualifications?: Record<string, any>[];
  countriesOfCertification?: string[];
  localOffices?: Record<string, any>[];
}
