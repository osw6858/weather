import { Skeleton } from '@/shared/ui/skeleton';

export const WeatherCardSkeleton = () => {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="mb-2 h-9 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>

      <div className="flex items-end gap-8">
        <div>
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="h-20 w-32" />
        </div>
        <div className="mb-4 flex gap-6 text-lg">
          <div>
            <Skeleton className="mb-1 h-4 w-8" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div>
            <Skeleton className="mb-1 h-4 w-8" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-t border-gray-200 pt-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex min-w-[80px] flex-col items-center gap-2 rounded-xl bg-gray-50 p-3"
            >
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
