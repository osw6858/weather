import { useQuery } from '@tanstack/react-query';
import { getCoordsByLocation } from '../api';

export const useCoordsQuery = (locationName: string) => {
  return useQuery({
    queryKey: ['coords', locationName],
    queryFn: async () => {
      const res = await getCoordsByLocation(locationName);

      if (res.status === 'error') {
        throw new Error(res.error);
      }

      return res.data;
    },
    enabled: !!locationName,
    staleTime: 1000 * 60 * 60,
  });
};
