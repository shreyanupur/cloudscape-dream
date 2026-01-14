import { Skeleton } from '@/components/ui/skeleton';

export const WeatherLoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Current Weather Skeleton */}
      <div className="glass-card p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48 bg-foreground/10" />
          <Skeleton className="h-6 w-36 bg-foreground/10" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="h-24 w-40 bg-foreground/10" />
          <div className="space-y-2">
            <Skeleton className="h-16 w-16 rounded-full bg-foreground/10" />
            <Skeleton className="h-5 w-24 bg-foreground/10" />
          </div>
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-5 w-16 bg-foreground/10" />
          <Skeleton className="h-5 w-16 bg-foreground/10" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-foreground/10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg bg-foreground/10" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-16 bg-foreground/10" />
                <Skeleton className="h-5 w-12 bg-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Skeleton */}
      <div className="glass-card p-6">
        <Skeleton className="h-6 w-36 mb-4 bg-foreground/10" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] p-3">
              <Skeleton className="h-4 w-10 bg-foreground/10" />
              <Skeleton className="h-8 w-8 rounded-full bg-foreground/10" />
              <Skeleton className="h-5 w-10 bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Daily Skeleton */}
      <div className="glass-card p-6">
        <Skeleton className="h-6 w-32 mb-4 bg-foreground/10" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3">
              <Skeleton className="h-5 w-16 bg-foreground/10" />
              <Skeleton className="h-6 w-6 rounded-full bg-foreground/10" />
              <div className="flex-1 flex items-center gap-3">
                <Skeleton className="h-4 w-10 bg-foreground/10" />
                <Skeleton className="h-1.5 flex-1 rounded-full bg-foreground/10" />
                <Skeleton className="h-4 w-10 bg-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
