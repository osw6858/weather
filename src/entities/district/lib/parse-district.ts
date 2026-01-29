import type { ParsedDistrict, DistrictLevel } from '../model/types';

export const parseDistrict = (district: string): ParsedDistrict => {
  const parts = district.split('-');
  const level = parts.length as DistrictLevel;

  return {
    full: district,
    city: parts[0],
    district: parts[1],
    town: parts[2],
    level,
  };
};

export const formatDistrict = (district: string): string => {
  return district.split('-').join(' ');
};

export const getDistrictLevel = (
  district: string,
  level: DistrictLevel,
): string | undefined => {
  const parts = district.split('-');
  return parts[level - 1];
};
