import { useQuery } from '@tanstack/react-query';
import { getCoordsByAddress } from '../api/get-coords-by-address';

export const useCoordsByAddressQuery = (address: string) => {
  return useQuery({
    queryKey: ['coordsByAddress', address],
    queryFn: async () => {
      const res = await getCoordsByAddress(address);

      if (res.status === 'error') {
        throw new Error(res.error);
      }

      return res.data;
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
