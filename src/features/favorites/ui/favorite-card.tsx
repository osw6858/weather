import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { FavoriteCardHeader } from './favorite-card-header';
import { FavoriteCardContent } from './favorite-card-content';
import type { FavoriteLocation } from '../model/types';

interface WeatherData {
  currentTemp?: number;
  minTemp?: number | null;
  maxTemp?: number | null;
  iconCode?: string;
  description?: string;
}

interface FavoriteCardProps {
  favorite: FavoriteLocation;
  weather?: WeatherData;
  isLoading?: boolean;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}

export const FavoriteCard = ({
  favorite,
  weather,
  isLoading,
  onRemove,
  onUpdateAlias,
}: FavoriteCardProps) => {
  return (
    <div className="relative flex min-h-[240px] flex-col rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <button
        onClick={() => onRemove(favorite.id)}
        className="absolute top-3 right-3 rounded-full p-1.5 transition-colors hover:bg-gray-100"
        aria-label="즐겨찾기 제거"
      >
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      </button>

      <div className="mb-4">
        <FavoriteCardHeader
          alias={favorite.alias}
          onUpdateAlias={(alias) => onUpdateAlias(favorite.id, alias)}
        />
      </div>

      <Link
        to={`/detail/${encodeURIComponent(favorite.district)}`}
        className="flex flex-1 flex-col"
      >
        <FavoriteCardContent
          currentTemp={weather?.currentTemp}
          minTemp={weather?.minTemp}
          maxTemp={weather?.maxTemp}
          iconCode={weather?.iconCode}
          description={weather?.description}
          isLoading={isLoading}
        />
      </Link>
    </div>
  );
};
