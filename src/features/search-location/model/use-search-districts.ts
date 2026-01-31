import { useMemo } from 'react';
import { getChoseong } from 'es-hangul';
import { koreaDistricts } from '@/entities/district';
import type { UseSearchDistrictsOptions } from './types';
import { useDebounce } from '@/shared/lib/use-debounce';

const PROCESSED_DISTRICTS = koreaDistricts.map((district) => ({
  original: district,
  display: district.replaceAll('-', ' '),
  parts: district.split('-'),
}));

export const useSearchDistricts = (
  query: string,
  options: UseSearchDistrictsOptions = {},
) => {
  const { minLength = 1, maxResults = 10 } = options;

  const debouncedQuery = useDebounce(query, 300);

  const normalizedQuery = debouncedQuery?.trim() || '';

  const results = useMemo(() => {
    if (normalizedQuery.length < minLength) {
      return [];
    }

    const isChosungOnly = /^[ㄱ-ㅎㅏ-ㅣ\s]+$/.test(normalizedQuery);
    const matches: string[] = [];

    if (!isChosungOnly) {
      for (const item of PROCESSED_DISTRICTS) {
        if (matches.length >= maxResults) break;

        if (item.display.includes(normalizedQuery)) {
          matches.push(item.original);
        }
      }
    } else {
      const queryChosung = normalizedQuery;

      for (const item of PROCESSED_DISTRICTS) {
        if (matches.length >= maxResults) break;

        const hasMatch = item.parts.some((part) => {
          const partChosung = getChoseong(part);
          return partChosung.includes(queryChosung);
        });

        if (hasMatch) {
          matches.push(item.original);
        }
      }
    }

    return matches;
  }, [normalizedQuery, minLength, maxResults]);

  return {
    results,
    count: results.length,
    isEmpty: results.length === 0 && normalizedQuery.length >= minLength,
    isSearching: query !== debouncedQuery,
  };
};
