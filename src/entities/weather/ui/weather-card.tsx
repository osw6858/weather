import type { Weather } from '../model';

interface WeatherCardProps {
  data: Weather;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  const { main, weather, name } = data;
  const currentTemp = Math.round(main.temp);
  const description = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="flex w-64 flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      <img src={iconUrl} alt={description} className="h-20 w-20" />
      <div className="text-center">
        <span className="text-5xl font-extrabold text-blue-500">
          {currentTemp}°
        </span>
        <p className="mt-1 text-gray-500 capitalize">{description}</p>
      </div>
      <div className="mt-2 flex gap-4 text-sm text-gray-400">
        <span>습도 {main.humidity}%</span>
        <span>체감 {Math.round(main.feels_like)}°</span>
      </div>
    </div>
  );
};
