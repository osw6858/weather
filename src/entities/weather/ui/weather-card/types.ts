import type { Weather, WeatherForecast } from '../../model';

export interface ForecastData {
  todayForecasts: WeatherForecast['list'];
  minTemp: number | null;
  maxTemp: number | null;
}

export interface WeatherCardProps {
  data: Weather;
  forecast?: ForecastData;
}
