import { useMemo } from 'react';
import { getChoseong } from 'es-hangul';
import { koreaDistricts } from '@/entities/district';
import type { UseSearchDistrictsOptions } from './types';

export const useSearchDistricts = (
  query: string,
  options: UseSearchDistrictsOptions = {},
) => {
  const { minLength = 1, maxResults = 10 } = options;

  const results = useMemo(() => {
    const normalizedQuery = query?.trim() || '';

    if (normalizedQuery.length < minLength) {
      return [];
    }

    const isChosungOnly = /^[ㄱ-ㅎㅏ-ㅣ\s]+$/.test(normalizedQuery);

    if (!isChosungOnly) {
      const matches: string[] = [];
      for (const district of koreaDistricts) {
        if (matches.length >= maxResults) break;

        const displayText = district.replaceAll('-', ' ');
        if (displayText.includes(normalizedQuery)) {
          matches.push(district);
        }
      }
      return matches;
    }

    const queryChosung = getChoseong(normalizedQuery);
    const matches: string[] = [];

    for (const district of koreaDistricts) {
      if (matches.length >= maxResults) break;

      const parts = district.split('-');
      const hasMatch = parts.some((part) => {
        const partChosung = getChoseong(part);
        return partChosung.includes(queryChosung);
      });

      if (hasMatch) {
        matches.push(district);
      }
    }

    return matches;
  }, [query, minLength, maxResults]);

  const normalizedQuery = query?.trim() || '';

  return {
    results,
    count: results.length,
    isEmpty: results.length === 0 && normalizedQuery.length >= minLength,
  };
};
