import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import type { WeatherForecast } from '../../model';

dayjs.extend(utc);
dayjs.extend(timezone);

interface HourlyForecastItemProps {
  time: string;
  temp: number;
  iconUrl: string;
  description: string;
}

const HourlyForecastItem = ({
  time,
  temp,
  iconUrl,
  description,
}: HourlyForecastItemProps) => (
  <div className="flex min-w-[80px] flex-col items-center gap-2 rounded-xl bg-gray-50 p-3">
    <span className="text-sm font-medium text-gray-600">{time}</span>
    <img src={iconUrl} alt={description} className="h-10 w-10" />
    <span className="text-lg font-bold text-gray-800">{temp}°</span>
  </div>
);

interface HourlyForecastProps {
  forecasts: WeatherForecast['list'];
}

export const HourlyForecast = ({ forecasts }: HourlyForecastProps) => {
  if (forecasts.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        오늘의 시간대별 날씨
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {forecasts.map((item) => {
          const time = dayjs.unix(item.dt).tz('Asia/Seoul').format('HH:mm');
          const temp = Math.round(item.main.temp);
          const itemIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

          return (
            <HourlyForecastItem
              key={item.dt}
              time={time}
              temp={temp}
              iconUrl={itemIconUrl}
              description={item.weather[0].description}
            />
          );
        })}
      </div>
    </div>
  );
};
