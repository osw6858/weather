import { useEffect } from 'react';
import {
  WeatherCard,
  WeatherCardSkeleton,
  useCurrentWeatherData,
} from '@/entities/weather';
import { SearchLocation } from '@/features/search-location';
import { FavoritesGrid, useFavoritesStore } from '@/features/favorites';
import { toast } from 'sonner';

export const WeatherBoard = () => {
  const { favorites } = useFavoritesStore();

  const { weather, forecast, location, geoError, isLoading, isError } =
    useCurrentWeatherData();

  const finalLocationName = location.data || '현재 위치';

  useEffect(() => {
    if (geoError) {
      toast('위치 정보를 가져올 수 없어요', {
        description: '정확한 날씨를 위해 브라우저 설정을 확인해 주세요',
        descriptionClassName: '!text-gray-700 !dark:text-white',
        action: {
          label: '확인',
          onClick: () => {},
        },
      });
    }
  }, [geoError]);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="w-full max-w-sm">
        <SearchLocation />
      </div>

      <div className="flex w-full justify-center">
        {isLoading && <WeatherCardSkeleton />}
        {isError && (
          <div className="rounded-xl bg-white/10 p-8 text-center text-white">
            <p className="font-semibold">
              해당 장소의 정보가 제공되지 않습니다.
            </p>
            <p className="mt-2 text-sm opacity-70">다른 장소를 검색해보세요</p>
          </div>
        )}
        {!isLoading && weather.data && (
          <WeatherCard
            data={{ ...weather.data, name: finalLocationName }}
            forecast={forecast.data}
          />
        )}
      </div>

      {favorites.length > 0 && (
        <div className="mt-8 w-full max-w-6xl">
          <FavoritesGrid />
        </div>
      )}
    </div>
  );
};
