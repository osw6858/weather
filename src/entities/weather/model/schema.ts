import { z } from 'zod';

// Kakao API

export const coordsSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

export const simpleCoordsSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export type SimpleCoords = z.infer<typeof simpleCoordsSchema>;

export const KakaoAddressSearchSchema = z.object({
  documents: z.array(
    z.object({
      address_name: z.string(),
      x: z.string(),
      y: z.string(),
    }),
  ),
  meta: z.object({
    total_count: z.number(),
  }),
});

export const kakaoAddressSchema = z.object({
  documents: z.array(
    z.object({
      address: z
        .object({
          address_name: z.string(),
          region_1depth_name: z.string(),
          region_2depth_name: z.string(),
          region_3depth_name: z.string(),
        })
        .optional(),
      road_address: z
        .object({
          address_name: z.string(),
          region_1depth_name: z.string(),
          region_2depth_name: z.string(),
          region_3depth_name: z.string(),
        })
        .optional(),
    }),
  ),
  meta: z.object({
    total_count: z.number(),
  }),
});

export const KakaoCoord2AddressResponseSchema = z.object({
  meta: z.object({
    total_count: z.number(),
  }),
  documents: z.array(
    z.object({
      road_address: z
        .object({
          address_name: z.string(),
          region_1depth_name: z.string(),
          region_2depth_name: z.string(),
          region_3depth_name: z.string(),
          region_3depth_h_name: z.string().optional(),
          zone_no: z.string().optional(),
        })
        .nullable(),
      address: z.object({
        address_name: z.string(),
        region_1depth_name: z.string(),
        region_2depth_name: z.string(),
        region_3depth_name: z.string(),
        region_3depth_h_name: z.string().optional(),
        mountain_yn: z.string().optional(),
        main_address_no: z.string().optional(),
        sub_address_no: z.string().optional(),
        zip_code: z.string().optional(),
      }),
    }),
  ),
});

export type KakaoCoord2AddressResult = z.infer<
  typeof KakaoCoord2AddressResponseSchema
>;

export type Coords = z.infer<typeof coordsSchema>;

// Open-Meteo API

const currentWeatherSchema = z.object({
  time: z.string(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number(),
  apparent_temperature: z.number(),
  weather_code: z.number(),
  wind_speed_10m: z.number(),
  wind_direction_10m: z.number().optional(),
});

const dailyForecastSchema = z.object({
  time: z.array(z.string()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
  weather_code: z.array(z.number()),
  sunrise: z.array(z.string()).optional(),
  sunset: z.array(z.string()).optional(),
});

const hourlyForecastSchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  relative_humidity_2m: z.array(z.number()).optional(),
  weather_code: z.array(z.number()),
  wind_speed_10m: z.array(z.number()).optional(),
});

export const weatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string().optional(),
  elevation: z.number().optional(),
  current: currentWeatherSchema,
});

export const weatherForecastSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string().optional(),
  elevation: z.number().optional(),
  current: currentWeatherSchema,
  daily: dailyForecastSchema,
  hourly: hourlyForecastSchema,
});

export const weatherCodeMap: Record<number, { description: string; icon: string }> = {
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

export const getWeatherInfo = (code: number) => {
  return weatherCodeMap[code] || { description: '알 수 없음', icon: '01d' };
};

export type Weather = z.infer<typeof weatherSchema>;
export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
export type CurrentWeather = z.infer<typeof currentWeatherSchema>;
export type DailyForecast = z.infer<typeof dailyForecastSchema>;
export type HourlyForecast = z.infer<typeof hourlyForecastSchema>;

export interface HourForecast {
  time: string;
  temp_c: number;
  weather_code: number;
  humidity?: number;
  wind_speed?: number;
}
