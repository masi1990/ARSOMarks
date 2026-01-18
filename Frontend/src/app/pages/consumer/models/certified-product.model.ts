export interface CertifiedProduct {
  id: string;
  cocNumber: string; // Certificate of Conformity Number
  productName: string;
  brand: string;
  countryOfOrigin: string;
  company: string;
  standards: string[];
  issueDate: string;
  expiryDate: string;
  category: string;
  sector?: string;
  certificationStatus?: 'VALID' | 'EXPIRED' | 'SUSPENDED';
  permitStartDate?: string;
  permitExpiryDate?: string;
  manufacturerName?: string;
  importerName?: string;
  distributorName?: string;
  operatorId?: string;
  operatorName?: string;
  applicationId?: string;
  schemeName?: string;
  issuingBody?: string;
}

