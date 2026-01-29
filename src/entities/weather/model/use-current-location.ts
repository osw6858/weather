import { useQuery } from '@tanstack/react-query';
import { getCurrentLocation } from '../api/get-current-location';

export const useCurrentLocation = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['currentLocation', lat, lon],
    queryFn: async () => {
      const res = await getCurrentLocation(lat, lon);

      if (res.status === 'error') {
        throw new Error(res.error);
      }

      const firstDocument = res.data.documents[0];
      if (!firstDocument) {
        throw new Error('주소 정보를 찾을 수 없습니다.');
      }

      const locationName =
        `${firstDocument.address.region_2depth_name} ${firstDocument.address.region_3depth_name}`.trim();
      return locationName;
    },

    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60,
  });
};
