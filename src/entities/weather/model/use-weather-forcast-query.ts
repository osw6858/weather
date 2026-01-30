import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getWeatherForecast } from '../api/get-weather-forecast';
import type { HourForecast } from './types';

export const useWeatherForecastQuery = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ['weatherForecast', lat, lon],
    queryFn: async () => {
      const res = await getWeatherForecast(lat!, lon!);

      if (res.status === 'error') {
        throw new Error(res.error);
      }

      const now = dayjs();

      const minTemp = Math.round(res.data.daily.temperature_2m_min[0]);
      const maxTemp = Math.round(res.data.daily.temperature_2m_max[0]);

      const hourlyTimes = res.data.hourly.time;
      const hourlyTemps = res.data.hourly.temperature_2m;
      const hourlyWeatherCodes = res.data.hourly.weather_code;
      const hourlyHumidity = res.data.hourly.relative_humidity_2m;
      const hourlyWindSpeed = res.data.hourly.wind_speed_10m;

      const todayForecasts: HourForecast[] = [];

      for (
        let i = 0;
        i < hourlyTimes.length && todayForecasts.length < 8;
        i++
      ) {
        const time = hourlyTimes[i];
        if (dayjs(time).isAfter(now)) {
          todayForecasts.push({
            time,
            temp_c: hourlyTemps[i],
            weather_code: hourlyWeatherCodes[i],
            humidity: hourlyHumidity?.[i],
            wind_speed: hourlyWindSpeed?.[i],
          });
        }
      }

      return {
        weather: {
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          timezone: res.data.timezone,
          timezone_abbreviation: res.data.timezone_abbreviation,
          elevation: res.data.elevation,
          current: res.data.current,
        },
        todayForecasts,
        minTemp,
        maxTemp,
      };
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60,
  });
};
