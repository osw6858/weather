import axios from 'axios';

const COMMON_CONFIG = {
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
};

export const weatherApi = axios.create({
  ...COMMON_CONFIG,
  baseURL: 'https://api.open-meteo.com/v1',
});

export const kakaoApi = axios.create({
  ...COMMON_CONFIG,
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});
