import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { formatDistrict } from '@/entities/district';
import type { FavoritesState, FavoriteLocation } from './types';
import { MAX_FAVORITES } from './types';
import type { District } from '@/entities/district';

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (district: District, alias?: string) => {
        const { favorites, isFavorite } = get();

        if (isFavorite(district)) {
          return false;
        }

        if (favorites.length >= MAX_FAVORITES) {
          return false;
        }

        const newFavorite: FavoriteLocation = {
          id: `${district}-${Date.now()}`,
          district,
          alias: alias || formatDistrict(district),
          addedAt: Date.now(),
        };

        set({ favorites: [...favorites, newFavorite] });
        return true;
      },

      removeFavorite: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        }));
      },

      updateAlias: (id: string, alias: string) => {
        set((state) => ({
          favorites: state.favorites.map((fav) =>
            fav.id === id ? { ...fav, alias } : fav,
          ),
        }));
      },

      isFavorite: (district: District) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.district === district);
      },

      getFavoriteByDistrict: (district: District) => {
        const { favorites } = get();
        return favorites.find((fav) => fav.district === district);
      },
    }),
    {
      name: 'weather-favorites',
    },
  ),
);
