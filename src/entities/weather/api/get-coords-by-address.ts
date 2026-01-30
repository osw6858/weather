import { kakaoApi, type ApiResult } from '@/shared/api';
import { KakaoAddressSearchSchema, type SimpleCoords } from '../model/schema';

export const getCoordsByAddress = async (
  address: string,
): Promise<ApiResult<SimpleCoords>> => {
  try {
    const { data: rawData } = await kakaoApi.get('/search/address.json', {
      params: {
        query: address,
      },
    });

    const result = KakaoAddressSearchSchema.safeParse(rawData);

    if (!result.success) {
      console.error('Kakao 주소 검색 API 파싱 실패:', result.error);
      return {
        status: 'error',
        error: '주소 데이터 형식이 올바르지 않습니다.',
      };
    }

    if (result.data.documents.length === 0) {
      return {
        status: 'error',
        error: '해당 장소의 정보가 제공되지 않습니다.',
      };
    }

    const firstDoc = result.data.documents[0];
    const coords: SimpleCoords = {
      lat: parseFloat(firstDoc.y),
      lon: parseFloat(firstDoc.x),
    };

    return { status: 'success', data: coords };
  } catch (error) {
    console.error('Kakao API 요청 실패:', error);
    return {
      status: 'error',
      error: 'Kakao API 통신 중 오류가 발생했습니다.',
    };
  }
};
