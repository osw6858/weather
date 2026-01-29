interface CurrentTemperatureProps {
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
}

export const CurrentTemperature = ({
  currentTemp,
  minTemp,
  maxTemp,
}: CurrentTemperatureProps) => (
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
);
