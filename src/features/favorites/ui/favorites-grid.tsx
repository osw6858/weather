import { FavoriteCardWithData } from './favorite-card-with-data';
import { useFavoritesStore, MAX_FAVORITES } from '../model';

export const FavoritesGrid = () => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-gray-400">즐겨찾기한 장소가 없습니다</p>
        <p className="mt-1 text-xs text-gray-300">
          검색해서 별표를 눌러 추가해보세요
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between md:mb-4">
        <h2 className="text-lg font-semibold md:text-xl">
          즐겨찾기 ({favorites.length}/{MAX_FAVORITES})
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {favorites.map((favorite) => (
          <FavoriteCardWithData key={favorite.id} favorite={favorite} />
        ))}
      </div>
    </div>
  );
};
