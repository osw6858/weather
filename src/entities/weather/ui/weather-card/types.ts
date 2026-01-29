import type { Weather, HourForecast } from '../../model';

export interface ForecastData {
  todayForecasts: HourForecast[];
  minTemp: number | null;
  maxTemp: number | null;
}

export interface WeatherCardProps {
  data: Weather & { name: string };
  forecast?: ForecastData;
}
