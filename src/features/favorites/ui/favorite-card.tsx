import { Link } from 'react-router-dom';
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
}

export const FavoriteCard = ({
  favorite,
  weather,
  isLoading,
}: FavoriteCardProps) => {
  return (
    <div className="relative flex min-h-[140px] flex-col rounded-2xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg md:min-h-[240px] md:p-6">
      <div className="mb-2 md:mb-4">
        <FavoriteCardHeader favoriteId={favorite.id} alias={favorite.alias} />
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
