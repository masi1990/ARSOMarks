export interface Region {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface Country {
  id: string;
  isoCode: string;
  name: string;
  regionId?: string;
  continent?: string;
  region?: Region;
}

export interface RegionalEconomicCommunity {
  id: string;
  code: string;
  name: string;
  description?: string;
  headquartersCountryId?: string;
  establishedDate?: string;
}

export interface AcapScheme {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  applicableStandards?: any;
  requirements?: any;
  isActive: boolean;
}

export interface AccreditationBody {
  id: string;
  name: string;
  countryId?: string;
  isFracMraSignatory: boolean;
  mraScope?: any;
  contactDetails?: any;
  isActive: boolean;
}

