import { WeatherBoard } from '@/widgets/weather-board';

export const HomePage = () => {
  return (
    <div className="min-h-screen from-indigo-500 via-purple-500 to-pink-500 p-6">
      <header className="mx-auto mb-10 max-w-md pt-10 text-center">
        <h1 className="text-3xl font-bold tracking-widest text-white uppercase">
          Sky Cast
        </h1>
      </header>

      <main className="mx-auto max-w-md">
        <WeatherBoard />
      </main>
    </div>
  );
};
