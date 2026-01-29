import { type ApiResult, geoApi } from '@/shared/api';

export const getAddressByCoords = async (
  lat: number,
  lon: number,
): Promise<ApiResult<string>> => {
  try {
    const { data } = await geoApi.get('/reverse', {
      params: {
        lat,
        lon,
        limit: 1,
        appid: import.meta.env.VITE_WEATHER_API_KEY,
      },
    });

    const koreanName =
      data[0]?.local_names?.ko || data[0]?.name || '알 수 없는 지역';

    return { status: 'success', data: koreanName };
  } catch (err) {
    return { status: 'error', error: `지명을 가져오지 못했습니다. ${err}` };
  }
};
