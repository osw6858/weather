import axios from 'axios';

const COMMON_CONFIG = {
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
};

export const weatherApi = axios.create({
  ...COMMON_CONFIG,
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const geoApi = axios.create({
  ...COMMON_CONFIG,
  baseURL: 'https://api.openweathermap.org/geo/1.0',
});

export const kakaoApi = axios.create({
  ...COMMON_CONFIG,
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});
