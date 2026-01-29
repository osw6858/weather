import { weatherApi, type ApiResult } from '@/shared/api';
import { weatherForecastSchema, type WeatherForecast } from '../model';

export const getWeatherForecast = async (
  lat: number,
  lon: number,
): Promise<ApiResult<WeatherForecast>> => {
  try {
    const { data: rawData } = await weatherApi.get('/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
        ].join(','),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'sunrise',
          'sunset',
        ].join(','),
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'weather_code',
          'wind_speed_10m',
        ].join(','),
        timezone: 'auto',
        forecast_days: 3,
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
