export interface TraceableProduct {
  id: string;
  cocNumber: string;
  productName?: string;
  brand?: string;
  countryOfOrigin?: string;
  originCountryName?: string;
  standards: string[];
  issueDate?: string;
  expiryDate?: string;
  category?: string;
  applicationId?: string;
  qrUrl?: string;
}

export interface VerificationResult {
  valid: boolean;
  status: string;
  cocNumber?: string;
  product?: {
    id?: string;
    name?: string;
    brand?: string;
    originCountry?: { id?: string; name?: string };
  };
  applicationId?: string;
  expiresAt?: string | Date | null;
  standards?: { id?: string; code?: string; name?: string }[];
  publicUrl?: string;
}

