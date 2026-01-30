interface FavoriteCardContentProps {
  currentTemp?: number;
  minTemp?: number | null;
  maxTemp?: number | null;
  iconCode?: string;
  description?: string;
  isLoading?: boolean;
}

export const FavoriteCardContent = ({
  currentTemp,
  minTemp,
  maxTemp,
  iconCode,
  description,
  isLoading,
}: FavoriteCardContentProps) => {
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4 md:py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 md:h-8 md:w-8" />
      </div>
    );
  }

  if (currentTemp === undefined) {
    return (
      <div className="flex items-center justify-center py-4 text-center text-xs text-gray-400 md:py-8 md:text-sm">
        날씨 정보를 불러올 수 없습니다
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-3 md:flex-col md:gap-0">
      <div className="flex shrink-0 items-center justify-center md:mb-3">
        {iconUrl && (
          <img
            src={iconUrl}
            alt={description}
            className="h-12 w-12 md:h-20 md:w-20"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col md:mb-4 md:text-center">
        <p className="text-2xl font-bold text-blue-500 md:text-4xl">
          {currentTemp}°
        </p>
        <p className="mt-0.5 text-xs text-gray-500 md:mt-2 md:text-sm">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 gap-4 md:justify-center md:gap-8">
        <div className="text-center">
          <p className="mb-0.5 text-xs text-gray-500 md:mb-1 md:text-sm">
            최저
          </p>
          <p className="text-sm font-semibold text-blue-400 md:text-lg">
            {minTemp}°
          </p>
        </div>
        <div className="text-center">
          <p className="mb-0.5 text-xs text-gray-500 md:mb-1 md:text-sm">
            최고
          </p>
          <p className="text-sm font-semibold text-red-400 md:text-lg">
            {maxTemp}°
          </p>
        </div>
      </div>
    </div>
  );
};
