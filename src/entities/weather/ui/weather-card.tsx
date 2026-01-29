import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import type { Weather, WeatherForecast } from '../model';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ForecastData {
  todayForecasts: WeatherForecast['list'];
  minTemp: number | null;
  maxTemp: number | null;
}

interface WeatherCardProps {
  data: Weather;
  forecast?: ForecastData;
}

export const WeatherCard = ({ data, forecast }: WeatherCardProps) => {
  const { main, weather, name } = data;
  const currentTemp = Math.round(main.temp);
  const description = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const minTemp = forecast?.minTemp ?? Math.round(main.temp_min);
  const maxTemp = forecast?.maxTemp ?? Math.round(main.temp_max);
  const todayForecasts = forecast?.todayForecasts || [];

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <p className="mt-1 text-lg text-gray-500">{description}</p>
        </div>
        <img src={iconUrl} alt={description} className="h-24 w-24" />
      </div>

      <div className="flex items-end gap-8">
        <div>
          <p className="text-sm text-gray-500">현재 기온</p>
          <span className="text-7xl font-extrabold text-blue-500">
            {currentTemp}°
          </span>
        </div>
        <div className="mb-4 flex gap-6 text-lg">
          <div>
            <p className="text-sm text-gray-500">최저</p>
            <span className="font-semibold text-blue-400">{minTemp}°</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">최고</p>
            <span className="font-semibold text-red-400">{maxTemp}°</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-t border-gray-200 pt-4 text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-sm">습도</span>
          <span className="font-semibold">{main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">체감 온도</span>
          <span className="font-semibold">{Math.round(main.feels_like)}°</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">풍속</span>
          <span className="font-semibold">{data.wind.speed}m/s</span>
        </div>
      </div>

      {todayForecasts.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            오늘의 시간대별 날씨
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {todayForecasts.map((item) => {
              const time = dayjs.unix(item.dt).format('HH:mm');
              const temp = Math.round(item.main.temp);
              const itemIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

              return (
                <div
                  key={item.dt}
                  className="flex min-w-[80px] flex-col items-center gap-2 rounded-xl bg-gray-50 p-3"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {time}
                  </span>
                  <img
                    src={itemIconUrl}
                    alt={item.weather[0].description}
                    className="h-10 w-10"
                  />
                  <span className="text-lg font-bold text-gray-800">
                    {temp}°
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
