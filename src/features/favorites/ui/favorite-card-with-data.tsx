import { FavoriteCard } from './favorite-card';
import {
  useCoordsByAddressQuery,
  useWeatherForecastQuery,
  getWeatherInfo,
} from '@/entities/weather';
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

  const { data: forecastData, isLoading: forecastLoading } =
    useWeatherForecastQuery(coords?.lat, coords?.lon);

  const isLoading = coordsLoading || forecastLoading;

  const weatherData = forecastData?.weather
    ? {
        currentTemp: Math.round(forecastData.weather.current.temperature_2m),
        minTemp: forecastData.minTemp,
        maxTemp: forecastData.maxTemp,
        iconCode: getWeatherInfo(forecastData.weather.current.weather_code)
          .icon,
        description: getWeatherInfo(forecastData.weather.current.weather_code)
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
