import { useEffect } from 'react';
import {
  WeatherCard,
  WeatherCardSkeleton,
  useWeatherData,
} from '@/entities/weather';
import { toast } from 'sonner';

export const WeatherBoard = () => {
  const { weather, forecast, location, geoError, isLoading, isError } =
    useWeatherData();

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
        <div className="rounded-xl border border-dashed border-white/30 bg-white/10 p-4 text-center text-white/50">
          지역 검색창 (Features)
        </div>
      </div>
      <div className="flex w-full justify-center">
        {isLoading && <WeatherCardSkeleton />}
        {isError && (
          <div className="text-center text-white">
            <p>날씨 데이터를 가져오지 못했습니다.</p>
            <p className="text-sm opacity-70">
              {weather.error instanceof Error
                ? weather.error.message
                : 'Unknown Error'}
            </p>
          </div>
        )}
        {!isLoading && weather.data && location.data && (
          <WeatherCard
            data={{ ...weather.data, name: location.data }}
            forecast={forecast.data}
          />
        )}
      </div>
    </div>
  );
};
