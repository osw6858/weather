import { cn } from '@/shared/lib';
import { WeatherHeader } from './weather-header';
import { CurrentTemperature } from './current-temperature';
import { WeatherDetails } from './weather-details';
import { HourlyForecast } from './hourly-forecast';
import { getWeatherInfo } from '../../model';
import type { WeatherCardProps } from './types';
import type { HTMLAttributes } from 'react';

export interface WeatherCardComponentProps {
  maxForecastItems?: number;
}

export const WeatherCard = ({
  data,
  forecast,
  className,
  maxForecastItems = 6,
  ...props
}: WeatherCardProps &
  WeatherCardComponentProps &
  HTMLAttributes<HTMLDivElement>) => {
  const { current } = data;
  const currentTemp = Math.round(current.temperature_2m);
  const weatherInfo = getWeatherInfo(current.weather_code);
  const description = weatherInfo.description;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
  const name = data.name;

  const minTemp = forecast?.minTemp ?? currentTemp;
  const maxTemp = forecast?.maxTemp ?? currentTemp;
  const todayForecasts = forecast?.todayForecasts || [];

  return (
    <div
      className={cn(
        'flex w-full max-w-2xl flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl',
        className,
      )}
      {...props}
    >
      <WeatherHeader name={name} description={description} iconUrl={iconUrl} />
      <CurrentTemperature
        currentTemp={currentTemp}
        minTemp={minTemp}
        maxTemp={maxTemp}
      />
      <WeatherDetails
        humidity={current.relative_humidity_2m}
        feelsLike={Math.round(current.apparent_temperature)}
        windSpeed={current.wind_speed_10m}
      />
      <HourlyForecast forecasts={todayForecasts} maxItems={maxForecastItems} />
    </div>
  );
};
