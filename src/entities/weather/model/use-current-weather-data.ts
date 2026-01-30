import { useMemo } from 'react';
import { useGeolocation } from '../lib/use-geolocation';
import { useCurrentWeatherQuery } from './use-current-weather-query';
import { useWeatherForecastQuery } from './use-weather-forcast-query';
import { useCurrentLocation } from './use-current-location';

const DEFAULT_COORDS = {
  lat: 37.5665,
  lon: 126.978,
};

export const useCurrentWeatherData = () => {
  const {
    coords: geoCoords,
    error: geoError,
    isLoading: geoLoading,
  } = useGeolocation();

  const currentCoords = useMemo(() => {
    if (geoLoading) return null;
    if (!geoCoords) return DEFAULT_COORDS;
    return geoCoords;
  }, [geoCoords, geoLoading]);

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
      isLoading: weatherQuery.isLoading || geoLoading,
      isError: weatherQuery.isError,
      error: weatherQuery.error,
    },
    forecast: {
      data: forecastQuery.data,
      isLoading: forecastQuery.isLoading || geoLoading,
      isError: forecastQuery.isError,
    },
    location: {
      data: locationQuery.data,
      isLoading: locationQuery.isLoading || geoLoading,
      isError: locationQuery.isError,
    },
    geoError,
    isLoading:
      geoLoading ||
      weatherQuery.isLoading ||
      forecastQuery.isLoading ||
      locationQuery.isLoading,
    isError:
      weatherQuery.isError || forecastQuery.isError || locationQuery.isError,
  };
};

