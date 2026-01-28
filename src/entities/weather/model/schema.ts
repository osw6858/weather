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

export type Coords = z.infer<typeof coordsSchema>;
export type Weather = z.infer<typeof weatherSchema>;
