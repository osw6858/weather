import { useMemo } from 'react';
import { getChoseong } from 'es-hangul';
import { koreaDistricts } from '@/entities/district';
import type { UseSearchDistrictsOptions } from './types';

const matchesChosung = (text: string, query: string): boolean => {
  const textChosung = getChoseong(text);
  const queryChosung = getChoseong(query);
  return textChosung.includes(queryChosung);
};

export const useSearchDistricts = (
  query: string,
  options: UseSearchDistrictsOptions = {},
) => {
  const { minLength = 1, maxResults = 10 } = options;

  const results = useMemo(() => {
    if (!query || query.trim().length < minLength) {
      return [];
    }

    const normalizedQuery = query.trim();
    const isChosungOnly = /^[ㄱ-ㅎㅏ-ㅣ\s]+$/.test(normalizedQuery);

    if (!isChosungOnly) {
      const matches = koreaDistricts.filter((district) => {
        const displayText = district.split('-').join(' ');
        return displayText.includes(normalizedQuery);
      });
      return matches.slice(0, maxResults);
    }

    const chosungMatches = koreaDistricts.filter((district) => {
      const parts = district.split('-');
      return parts.some((part) => matchesChosung(part, normalizedQuery));
    });

    return chosungMatches.slice(0, maxResults);
  }, [query, minLength, maxResults]);

  return {
    results,
    count: results.length,
    isEmpty: results.length === 0 && query.trim().length >= minLength,
  };
};
