import { z } from 'zod';

export const coordsSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

export const weatherSchema = z.object({
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
  sys: z.object({
    sunrise: z.number(),
    sunset: z.number(),
  }),
  name: z.string(),
  dt: z.number(),
});

const forecastItemSchema = z.object({
  dt: z.number(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    sea_level: z.number(),
    grnd_level: z.number(),
    humidity: z.number(),
    temp_kf: z.number(),
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  clouds: z.object({
    all: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
    gust: z.number(),
  }),
  visibility: z.number(),
  pop: z.number(),
  sys: z.object({
    pod: z.string(),
  }),
  dt_txt: z.string(),
});

export const weatherForecastSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(forecastItemSchema),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

const KakaoAddressSchema = z.object({
  address_name: z.string(),
  region_1depth_name: z.string(),
  region_2depth_name: z.string(),
  region_3depth_name: z.string(),
  mountain_yn: z.string(),
  main_address_no: z.string(),
  sub_address_no: z.string(),
  zip_code: z.string(),
});

const KakaoRoadAddressSchema = z
  .object({
    address_name: z.string(),
    region_1depth_name: z.string(),
    region_2depth_name: z.string(),
    region_3depth_name: z.string(),
    road_name: z.string(),
    underground_yn: z.string(),
    main_building_no: z.string(),
    sub_building_no: z.string(),
    building_name: z.string(),
    zone_no: z.string(),
  })
  .nullable();

export const KakaoCoord2AddressResultSchema = z.object({
  address: KakaoAddressSchema,
  road_address: KakaoRoadAddressSchema,
});

export const KakaoCoord2AddressResponseSchema = z.object({
  meta: z.object({
    total_count: z.number(),
  }),
  documents: z.array(KakaoCoord2AddressResultSchema),
});

export type Coords = z.infer<typeof coordsSchema>;
export type Weather = z.infer<typeof weatherSchema>;
export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
export type KakaoCoord2AddressResult = z.infer<
  typeof KakaoCoord2AddressResponseSchema
>;
