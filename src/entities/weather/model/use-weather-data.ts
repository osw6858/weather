import { useMemo } from 'react';
import { useGeolocation } from '../lib/use-geolocation';
import { useCurrentWeatherQuery } from './use-current-weather-query';
import { useWeatherForecastQuery } from './use-weather-forcast-query';
import { useCurrentLocation } from './use-current-location';

const DEFAULT_COORDS = {
  lat: 37.5665,
  lon: 126.978,
};

interface UseWeatherDataParams {
  lat?: number;
  lon?: number;
}

export const useWeatherData = (params?: UseWeatherDataParams) => {
  const { coords: geoCoords, error: geoError } = useGeolocation();

  const currentCoords = useMemo(() => {
    if (params?.lat && params?.lon) {
      return { lat: params.lat, lon: params.lon };
    }
    if (geoCoords) return geoCoords;
    if (geoError) return DEFAULT_COORDS;
    return null;
  }, [params, geoCoords, geoError]);

  const weatherQuery = useCurrentWeatherQuery(
    currentCoords?.lat,
    currentCoords?.lon,
  );

  const forecastQuery = useWeatherForecastQuery(
    currentCoords?.lat,
    currentCoords?.lon,
  );

  const locationQuery = useCurrentLocation(
    currentCoords?.lat,
    currentCoords?.lon,
  );

  return {
    coords: currentCoords,
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
    geoError,
    isLoading:
      weatherQuery.isLoading ||
      forecastQuery.isLoading ||
      locationQuery.isLoading,
    isError:
      weatherQuery.isError || forecastQuery.isError || locationQuery.isError,
  };
};
