import { useCurrentLocation } from './use-current-location';
import { useCurrentWeatherQuery } from './use-current-weather-query';
import { useWeatherForecastQuery } from './use-weather-forcast-query';

export const useWeatherDataByCoords = (lat?: number, lon?: number) => {
  const weatherQuery = useCurrentWeatherQuery(lat, lon);
  const forecastQuery = useWeatherForecastQuery(lat, lon);
  const locationQuery = useCurrentLocation(lat, lon);

  return {
    coords: lat && lon ? { lat, lon } : null,
    weather: {
      data: weatherQuery.data,
      isLoading: weatherQuery.isLoading,
      isError: weatherQuery.isError,
      error: weatherQuery.error,
    },
    forecast: {
      data: forecastQuery.data,
      isLoading: forecastQuery.isLoading,
      isError: forecastQuery.isError,
    },
    location: {
      data: locationQuery.data,
      isLoading: locationQuery.isLoading,
      isError: locationQuery.isError,
    },
    isLoading:
      weatherQuery.isLoading ||
      forecastQuery.isLoading ||
      locationQuery.isLoading,
    isError:
      weatherQuery.isError || forecastQuery.isError || locationQuery.isError,
  };
};
