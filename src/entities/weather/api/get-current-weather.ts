import type { ApiResult } from '@shared/api';
import { weatherApi } from '@shared/api';
import { type Weather, weatherSchema } from '../model';

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<ApiResult<Weather>> => {
  try {
    const { data: rawData } = await weatherApi.get('/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        lang: 'kr',
        appid: import.meta.env.VITE_WEATHER_API_KEY,
      },
    });

    const result = weatherSchema.safeParse(rawData);

    if (!result.success) {
      console.error('날씨 데이터 파싱 실패:', result.error);
      return {
        status: 'error',
        error: '날씨 데이터 형식이 올바르지 않습니다.',
      };
    }

    return { status: 'success', data: result.data };
  } catch (err) {
    return {
      status: 'error',
      error: `날씨 정보를 가져오는 중 오류가 발생했습니다. ${err}`,
    };
  }
};
