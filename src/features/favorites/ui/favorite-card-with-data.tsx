import { FavoriteCard } from './favorite-card';
import { useCoordsByAddressQuery, useWeatherData } from '@/entities/weather';
import { getWeatherInfo } from '@/entities/weather/model/schema';
import type { FavoriteLocation } from '../model/types';

interface FavoriteCardWithDataProps {
  favorite: FavoriteLocation;
}

export const FavoriteCardWithData = ({
  favorite,
}: FavoriteCardWithDataProps) => {
  const address = favorite.district.split('-').join(' ');
  const { data: coords, isLoading: coordsLoading } =
    useCoordsByAddressQuery(address);

  const { weather, forecast } = useWeatherData({
    lat: coords?.lat,
    lon: coords?.lon,
  });

  const isLoading = coordsLoading || weather.isLoading || forecast.isLoading;

  const weatherData = weather.data
    ? {
        currentTemp: Math.round(weather.data.current.temperature_2m),
        minTemp: forecast.data?.minTemp,
        maxTemp: forecast.data?.maxTemp,
        iconCode: getWeatherInfo(weather.data.current.weather_code).icon,
        description: getWeatherInfo(weather.data.current.weather_code)
          .description,
      }
    : undefined;

  return (
    <FavoriteCard
      favorite={favorite}
      weather={weatherData}
      isLoading={isLoading}
    />
  );
};
