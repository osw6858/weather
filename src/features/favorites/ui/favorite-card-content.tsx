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
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (currentTemp === undefined) {
    return (
      <div className="flex items-center justify-center py-8 text-center text-sm text-gray-400">
        날씨 정보를 불러올 수 없습니다
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center mb-3">
        {iconUrl && (
          <img src={iconUrl} alt={description} className="h-20 w-20" />
        )}
      </div>

      <div className="text-center mb-4">
        <p className="text-4xl font-bold text-blue-500">{currentTemp}°</p>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>

      <div className="flex justify-center gap-8 text-base">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">최저</p>
          <p className="text-lg font-semibold text-blue-400">{minTemp}°</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">최고</p>
          <p className="text-lg font-semibold text-red-400">{maxTemp}°</p>
        </div>
      </div>
    </>
  );
};
