import type { District } from '@/entities/district';

export interface FavoriteLocation {
  id: string;
  district: District;
  alias: string;
  addedAt: number;
}

export interface FavoritesState {
  favorites: FavoriteLocation[];
  addFavorite: (district: District, alias?: string) => boolean;
  removeFavorite: (id: string) => void;
  updateAlias: (id: string, alias: string) => void;
  isFavorite: (district: District) => boolean;
  getFavoriteByDistrict: (district: District) => FavoriteLocation | undefined;
}

export const MAX_FAVORITES = 6;
