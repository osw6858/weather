interface WeatherHeaderProps {
  name: string;
  description: string;
  iconUrl: string;
}

export const WeatherHeader = ({
  name,
  description,
  iconUrl,
}: WeatherHeaderProps) => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
      <p className="mt-1 text-lg text-gray-500">{description}</p>
    </div>
    <img src={iconUrl} alt={description} className="h-24 w-24" />
  </div>
);
