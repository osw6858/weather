import type { Weather } from './schema';

export interface HourForecast {
  time: string;
  temp_c: number;
  weather_code: number;
  humidity?: number;
  wind_speed?: number;
}

export interface WeatherForecastQueryResult {
  weather: Weather;
  todayForecasts: HourForecast[];
  minTemp: number;
  maxTemp: number;
}
