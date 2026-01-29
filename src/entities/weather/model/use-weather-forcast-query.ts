import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getWeatherForecast } from '../api/get-weather-forecast';

dayjs.extend(utc);

export const useWeatherForecastQuery = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ['weatherForecast', lat, lon],
    queryFn: async () => {
      const res = await getWeatherForecast(lat!, lon!);

      if (res.status === 'error') {
        throw new Error(res.error);
      }

      const todayDateString = dayjs.utc().format('YYYY-MM-DD');

      const todayForecasts = res.data.list.filter((item) => {
        const forecastDate = dayjs.unix(item.dt).utc().format('YYYY-MM-DD');
        return forecastDate === todayDateString;
      });

      const todayTemps = todayForecasts.map((f) => f.main.temp);
      const minTemp =
        todayTemps.length > 0 ? Math.round(Math.min(...todayTemps)) : null;
      const maxTemp =
        todayTemps.length > 0 ? Math.round(Math.max(...todayTemps)) : null;

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
