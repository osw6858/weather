import { useMemo } from 'react';
import { getChoseong } from 'es-hangul';
import { koreaDistricts } from '@/entities/district';
import type { UseSearchDistrictsOptions } from './types';

export const useSearchDistricts = (
  query: string,
  options: UseSearchDistrictsOptions = {},
) => {
  const { minLength = 1, maxResults = 10 } = options;
  const normalizedQuery = query?.trim() || '';

  // TODO: 10개가 넘어가면 break를 걸고 있지만 결과를 더 많이 반환하게 된다면 webworker로 처리하는 것이 좋을 수 있음
  const results = useMemo(() => {
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

    const queryChosung = normalizedQuery;
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
  }, [normalizedQuery, minLength, maxResults]);

  return {
    results,
    count: results.length,
    isEmpty: results.length === 0 && normalizedQuery.length >= minLength,
  };
};
