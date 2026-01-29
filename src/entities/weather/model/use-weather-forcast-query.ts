import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getWeatherForecast } from '../api/get-weather-forecast';
import type { HourForecast } from './schema';

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

      const todayForecasts: HourForecast[] = hourlyTimes
        .map((time, index) => ({
          time,
          temp_c: hourlyTemps[index],
          weather_code: hourlyWeatherCodes[index],
          humidity: hourlyHumidity?.[index],
          wind_speed: hourlyWindSpeed?.[index],
        }))
        .filter((item) => dayjs(item.time).isAfter(now))
        .slice(0, 8);

      return {
        todayForecasts,
        minTemp,
        maxTemp,
      };
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60,
  });
};
