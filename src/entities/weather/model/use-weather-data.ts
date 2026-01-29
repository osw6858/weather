import { useMemo } from 'react';
import { useGeolocation } from '../lib/use-geolocation';
import { useCurrentWeatherQuery } from './use-current-weather-query';
import { useWeatherForecastQuery } from './use-weather-forcast-query';
import { useCurrentLocation } from './use-current-location';

const DEFAULT_COORDS = {
  lat: 37.5665,
  lon: 126.978,
};

export const useWeatherData = () => {
  const { coords: geoCoords, error: geoError } = useGeolocation();

  const currentCoords = useMemo(() => {
    if (geoCoords) return geoCoords;
    if (geoError) return DEFAULT_COORDS;
    return null;
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

  // 현재 온도를 포함한 최저/최고 재계산
  const adjustedForecast = useMemo(() => {
    if (!forecastQuery.data || !weatherQuery.data) {
      return forecastQuery.data;
    }

    const currentTemp = Math.round(weatherQuery.data.main.temp);
    const { minTemp, maxTemp } = forecastQuery.data;

    const actualMin =
      minTemp !== null ? Math.min(minTemp, currentTemp) : currentTemp;
    const actualMax =
      maxTemp !== null ? Math.max(maxTemp, currentTemp) : currentTemp;

    return {
      ...forecastQuery.data,
      minTemp: actualMin,
      maxTemp: actualMax,
    };
  }, [forecastQuery.data, weatherQuery.data]);

  return {
    coords: currentCoords,
    weather: {
      data: weatherQuery.data,
      isLoading: weatherQuery.isLoading,
      isError: weatherQuery.isError,
      error: weatherQuery.error,
    },
    forecast: {
      data: adjustedForecast,
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
