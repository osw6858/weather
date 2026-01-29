import { cn } from '@/shared/lib';
import { WeatherHeader } from './weather-header';
import { CurrentTemperature } from './current-temperature';
import { WeatherDetails } from './weather-details';
import { HourlyForecast } from './hourly-forecast';
import type { WeatherCardProps } from './types';
import type { HTMLAttributes } from 'react';

export const WeatherCard = ({
  data,
  forecast,
  className,
  ...props
}: WeatherCardProps & HTMLAttributes<HTMLDivElement>) => {
  const { main, weather, name } = data;
  const currentTemp = Math.round(main.temp);
  const description = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const minTemp = forecast?.minTemp ?? Math.round(main.temp_min);
  const maxTemp = forecast?.maxTemp ?? Math.round(main.temp_max);
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
        humidity={main.humidity}
        feelsLike={Math.round(main.feels_like)}
        windSpeed={data.wind.speed}
      />
      <HourlyForecast forecasts={todayForecasts} />
    </div>
  );
};
