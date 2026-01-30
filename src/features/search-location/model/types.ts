import type { District } from '@/entities/district';

export interface SearchResult {
  district: District;
  matched: boolean;
}

export interface UseSearchDistrictsOptions {
  minLength?: number;
  maxResults?: number;
}
