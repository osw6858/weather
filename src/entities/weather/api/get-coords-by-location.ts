import type { ApiResult } from '@/shared/api/api-result';
import { geoApi } from '@/shared/api/base';
import { coordsSchema, type Coords } from '../model';

export const getCoordsByLocation = async (
  locationName: string,
): Promise<ApiResult<Coords>> => {
  try {
    const { data: rawData } = await geoApi.get('/geo/1.0/direct', {
      params: {
        q: locationName,
        limit: 1,
        appid: import.meta.env.VITE_WEATHER_API_KEY,
      },
    });

    if (!rawData || rawData.length === 0) {
      return { status: 'error', error: '해당 지역을 찾을 수 없습니다.' };
    }

    const result = coordsSchema.safeParse(rawData[0]);

    if (!result.success) {
      return {
        status: 'error',
        error: '위치 데이터 형식이 올바르지 않습니다.',
      };
    }

    return { status: 'success', data: result.data };
  } catch (err) {
    return { status: 'error', error: '네트워크 통신 중 오류가 발생했습니다.' };
  }
};
