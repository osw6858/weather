import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '../api';

export const useCurrentWeatherQuery = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: async () => {
      const res = await getCurrentWeather(lat!, lon!);

      if (res.status === 'error') {
        throw new Error(res.error);
      }

      return res.data;
    },
    enabled: !!lat && !!lon,
  });
};
