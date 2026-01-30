// 날씨 코드 매핑 (WMO Weather interpretation codes)
export const weatherCodeMap: Record<
  number,
  { description: string; icon: string }
> = {
  0: { description: '맑음', icon: '01d' },
  1: { description: '대체로 맑음', icon: '01d' },
  2: { description: '부분적으로 흐림', icon: '02d' },
  3: { description: '흐림', icon: '03d' },
  45: { description: '안개', icon: '50d' },
  48: { description: '서리 안개', icon: '50d' },
  51: { description: '가벼운 이슬비', icon: '09d' },
  53: { description: '이슬비', icon: '09d' },
  55: { description: '강한 이슬비', icon: '09d' },
  56: { description: '가벼운 어는 이슬비', icon: '13d' },
  57: { description: '강한 어는 이슬비', icon: '13d' },
  61: { description: '약한 비', icon: '10d' },
  63: { description: '비', icon: '10d' },
  65: { description: '강한 비', icon: '10d' },
  66: { description: '약한 어는 비', icon: '13d' },
  67: { description: '강한 어는 비', icon: '13d' },
  71: { description: '약한 눈', icon: '13d' },
  73: { description: '눈', icon: '13d' },
  75: { description: '강한 눈', icon: '13d' },
  77: { description: '진눈깨비', icon: '13d' },
  80: { description: '약한 소나기', icon: '09d' },
  81: { description: '소나기', icon: '09d' },
  82: { description: '강한 소나기', icon: '09d' },
  85: { description: '약한 눈 소나기', icon: '13d' },
  86: { description: '강한 눈 소나기', icon: '13d' },
  95: { description: '뇌우', icon: '11d' },
  96: { description: '약한 우박을 동반한 뇌우', icon: '11d' },
  99: { description: '강한 우박을 동반한 뇌우', icon: '11d' },
};

// 날씨 코드에 해당하는 설명과 아이콘 가져오기
export const getWeatherInfo = (code: number) => {
  return weatherCodeMap[code] || { description: '알 수 없음', icon: '01d' };
};
