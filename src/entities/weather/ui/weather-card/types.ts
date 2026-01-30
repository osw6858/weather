import type { Weather } from '../../model/schema';
import type { HourForecast } from '../../model/types';

export interface WeatherCardProps {
  data: Weather & { name: string };
  forecast?: {
    todayForecasts: HourForecast[];
    minTemp: number | null;
    maxTemp: number | null;
  };
}
