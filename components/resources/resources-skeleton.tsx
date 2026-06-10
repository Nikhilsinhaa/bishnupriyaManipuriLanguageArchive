import { Skeleton } from "@/components/ui/skeleton";

export function ResourcesSkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2, 3].map((group) => (
        <div key={group}>
          <Skeleton className="mb-6 h-8 w-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
