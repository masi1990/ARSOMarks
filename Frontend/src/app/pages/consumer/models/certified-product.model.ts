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
  operatorId?: string;
  operatorName?: string;
  applicationId?: string;
}

