interface WeatherDetailsProps {
  humidity: number;
  feelsLike: number;
  windSpeed: number;
}

export const WeatherDetails = ({
  humidity,
  feelsLike,
  windSpeed,
}: WeatherDetailsProps) => (
  <div className="flex gap-6 border-t border-gray-200 pt-4 text-gray-600">
    <div className="flex items-center gap-2">
      <span className="text-sm">습도</span>
      <span className="font-semibold">{humidity}%</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm">체감 온도</span>
      <span className="font-semibold">{feelsLike}°</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm">풍속</span>
      <span className="font-semibold">{windSpeed}m/s</span>
    </div>
  </div>
);
