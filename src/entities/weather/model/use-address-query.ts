import { useQuery } from '@tanstack/react-query';
import { getAddressByCoords } from '../api/get-address-by-coords';

export const useAddressQuery = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ['address', lat, lon],
    queryFn: async () => {
      const res = await getAddressByCoords(lat!, lon!);

      if (res.status === 'error') {
        throw new Error(res.error);
      }

      return res.data;
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
