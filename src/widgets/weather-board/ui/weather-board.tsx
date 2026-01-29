import { useEffect, useState } from 'react';
import { useCurrentWeatherQuery, WeatherCard } from '@entities/weather';
import { useGeolocation } from '@/shared/lib/useGeolocation';

// 나중에 만들 feature를 위한 자리
// import { SearchLocation } from '@/features/search-location';

export const WeatherBoard = () => {
  const [coords, setCoords] = useState({ lat: 37.5665, lon: 126.978 }); //서울 좌표

  const { data, isLoading, isError, error } = useCurrentWeatherQuery(
    coords.lat,
    coords.lon,
  );

  const { location } = useGeolocation();

  useEffect(() => {
    if (location) {
      setCoords(location);
    }
  }, [location]);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-dashed border-white/30 bg-white/10 p-4 text-center text-white/50">
          지역 검색창 (Features)
        </div>
      </div>

      <div className="flex w-full justify-center">
        {isLoading && (
          <div className="h-80 w-64 animate-pulse rounded-3xl bg-white/20" />
        )}

        {isError && (
          <div className="text-center text-white">
            <p>데이터를 가져오지 못했습니다.</p>
            <p className="text-sm opacity-70">
              {error instanceof Error ? error.message : 'Unknown'}
            </p>
          </div>
        )}

        {data && <WeatherCard data={data} />}
      </div>
    </div>
  );
};
