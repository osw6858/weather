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

  // 알 수 있는 최대 범위의 최저/최고 계산
  const adjustedForecast = useMemo(() => {
    if (!forecastQuery.data || !weatherQuery.data) {
      return forecastQuery.data;
    }

    const currentTemp = Math.round(weatherQuery.data.main.temp);
    const weatherMinTemp = Math.round(weatherQuery.data.main.temp_min);
    const weatherMaxTemp = Math.round(weatherQuery.data.main.temp_max);
    const { minTemp: forecastMin, maxTemp: forecastMax } = forecastQuery.data;

    // 모든 온도를 고려하여 최대 범위 계산
    const temps = [currentTemp, weatherMinTemp, weatherMaxTemp];
    if (forecastMin !== null) temps.push(forecastMin);
    if (forecastMax !== null) temps.push(forecastMax);

    const actualMin = Math.min(...temps);
    const actualMax = Math.max(...temps);

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
