import { kakaoApi, type ApiResult } from '@/shared/api';
import {
  KakaoCoord2AddressResponseSchema,
  type KakaoCoord2AddressResult,
} from '../model';

export const getCurrentLocation = async (
  lat: number,
  lon: number,
): Promise<ApiResult<KakaoCoord2AddressResult>> => {
  try {
    const { data: rawData } = await kakaoApi.get('/geo/coord2address.json', {
      params: {
        x: lon,
        y: lat,
      },
    });

    const result = KakaoCoord2AddressResponseSchema.safeParse(rawData);

    if (!result.success) {
      console.error('카카오 API 파싱 실패:', result.error);
      return {
        status: 'error',
        error: '카카오 위치 데이터 형식이 올바르지 않습니다.',
      };
    }

    return {
      status: 'success',
      data: result.data,
    };
  } catch (error) {
    console.error('카카오 API 요청 실패:', error);
    return {
      status: 'error',
      error: '카카오 API 통신 중 오류가 발생했습니다.',
    };
  }
};
