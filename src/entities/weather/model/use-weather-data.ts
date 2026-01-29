import { useEffect, useState } from 'react';
import { useGeolocation } from '@/shared/lib/useGeolocation';
import { useCurrentWeatherQuery } from './use-current-weather-query';
import { useWeatherForecastQuery } from './use-weather-forcast-query';
import { useCurrentLocation } from './use-current-location';

const DEFAULT_COORDS = {
  lat: 37.5665,
  lon: 126.978,
};

export const useWeatherData = () => {
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { coords: geoCoords, error: geoError } = useGeolocation();

  useEffect(() => {
    if (geoCoords) {
      setCurrentCoords(geoCoords);
    } else if (geoError) {
      setCurrentCoords(DEFAULT_COORDS);
    }
  }, [geoCoords, geoError]);

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
