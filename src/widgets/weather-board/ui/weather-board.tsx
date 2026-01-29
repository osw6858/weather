import { useEffect, useState } from 'react';
import { useCurrentWeatherQuery, WeatherCard } from '@/entities/weather'; // 경로 별칭 확인
import { toast } from 'sonner';
import { useGeolocation } from '@/shared/lib/useGeolocation';

export const WeatherBoard = () => {
  const [currentCoords, setCurrentCoords] = useState({
    lat: 37.5665,
    lon: 126.978,
  });

  const { coords: geoCoords, error: geoError } = useGeolocation();
  const {
    data: weatherData,
    isLoading,
    isError,
    error: weatherError,
  } = useCurrentWeatherQuery(currentCoords.lat, currentCoords.lon);

  useEffect(() => {
    if (geoCoords) {
      setCurrentCoords(geoCoords);
    }

    if (geoError) {
      toast('위치 정보를 가져올 수 없어 서울 날씨를 보여드려요', {
        description: '정확한 날씨를 위해 브라우저 설정을 확인해 주세요',
        descriptionClassName: '!text-gray-700 !dark:text-white',
        action: {
          label: '확인',
          onClick: () => {},
        },
      });
    }
  }, [geoCoords, geoError]);

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
            <p>날씨 데이터를 가져오지 못했습니다.</p>
            <p className="text-sm opacity-70">
              {weatherError instanceof Error
                ? weatherError.message
                : 'Unknown Error'}
            </p>
          </div>
        )}
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
};
