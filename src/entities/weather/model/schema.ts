import { z } from 'zod';

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

export type Weather = z.infer<typeof weatherSchema>;
export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
