export type District = string;

export type DistrictLevel = 1 | 2 | 3;

export interface ParsedDistrict {
  full: string;
  city: string;
  district?: string;
  town?: string;
  level: DistrictLevel;
}
