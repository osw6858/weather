import { Link, useParams, Navigate } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import {
  WeatherCard,
  WeatherCardSkeleton,
  useCoordsByAddressQuery,
  useWeatherForecastQuery,
} from '@/entities/weather';
import { ArrowLeft } from 'lucide-react';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const district = id ? decodeURIComponent(id) : '';
  const address = district.split('-').join(' ');

  const {
    data: coords,
    isLoading: coordsLoading,
    isError: coordsError,
  } = useCoordsByAddressQuery(address);

  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useWeatherForecastQuery(coords?.lat, coords?.lon);

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const isLoading = coordsLoading || weatherLoading;
  const isError = coordsError || weatherError;
  const displayName = address;

  return (
    <div className="min-h-screen from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            className="rounded-full border-none bg-transparent shadow-none hover:bg-slate-200"
            size="sm"
            asChild
          >
            <Link to="/">
              <ArrowLeft />
            </Link>
          </Button>
        </div>

        <div className="flex justify-center">
          {isLoading && <WeatherCardSkeleton />}

          {isError && (
            <div className="rounded-xl bg-white/10 p-12 text-center">
              <p className="mb-2 text-xl font-semibold">
                해당 장소의 정보가 제공되지 않습니다.
              </p>
              <p className="mb-6 text-sm opacity-70">
                다른 장소를 검색해보세요
              </p>

              <Button
                asChild
                variant="outline"
                className="cursor-pointer bg-white text-black"
              >
                <Link to="/">메인으로 돌아가기</Link>
              </Button>
            </div>
          )}

          {!isLoading && weatherData?.weather && !coordsError && (
            <WeatherCard
              data={{ ...weatherData.weather, name: displayName }}
              forecast={weatherData}
              maxForecastItems={6}
            />
          )}
        </div>
      </div>
    </div>
  );
};
