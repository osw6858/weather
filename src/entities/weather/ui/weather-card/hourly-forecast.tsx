import dayjs from 'dayjs';
import { getWeatherInfo } from '../../model';
import type { HourForecast } from '../../model';

interface HourlyForecastProps {
  forecasts: HourForecast[];
  maxItems?: number;
}

export const HourlyForecast = ({
  forecasts,
  maxItems = 4,
}: HourlyForecastProps) => {
  if (forecasts.length === 0) return null;

  const displayForecasts = forecasts.slice(0, maxItems);

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        시간대별 날씨
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {displayForecasts.map((item) => {
          const time = dayjs(item.time).format('HH:mm');
          const temp = Math.round(item.temp_c);
          const weatherInfo = getWeatherInfo(item.weather_code);
          const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}.png`;
          const description = weatherInfo.description;

          return (
            <div
              key={item.time}
              className="flex min-w-[80px] flex-col items-center gap-2 rounded-xl bg-gray-50 p-3"
            >
              <span className="text-sm font-medium text-gray-600">{time}</span>
              <img src={iconUrl} alt={description} className="h-10 w-10" />
              <span className="text-lg font-bold text-gray-800">{temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
