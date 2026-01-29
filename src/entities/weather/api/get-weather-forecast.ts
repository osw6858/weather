import { weatherApi, type ApiResult } from '@/shared/api';
import { weatherForecastSchema, type WeatherForecast } from '../model';

export const getWeatherForecast = async (
  lat: number,
  lon: number,
): Promise<ApiResult<WeatherForecast>> => {
  try {
    const { data: rawData } = await weatherApi.get('/forecast', {
      params: {
        lat,
        lon,
        units: 'metric',
        lang: 'kr',
        appid: import.meta.env.VITE_WEATHER_API_KEY,
      },
    });

    const result = weatherForecastSchema.safeParse(rawData);

    if (!result.success) {
      console.error('날씨 예보 데이터 파싱 실패:', result.error);
      return {
        status: 'error',
        error: '날씨 예보 데이터 형식이 올바르지 않습니다.',
      };
    }

    return { status: 'success', data: result.data };
  } catch (err) {
    console.error('날씨 예보 API 요청 실패:', err);
    return {
      status: 'error',
      error: '날씨 예보 정보를 가져오는 중 오류가 발생했습니다.',
    };
  }
};
