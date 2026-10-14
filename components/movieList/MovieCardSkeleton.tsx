import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCardSkeleton() {
  return (
    <Card aria-hidden="true" className="min-w-0 gap-0 py-0 shadow-sm">
      <Skeleton className="aspect-[2/3] rounded-none motion-reduce:animate-none" />
      <CardHeader className="gap-2 p-3">
        <CardTitle className="flex min-h-[2lh] flex-col justify-center gap-2">
          <Skeleton className="h-4 w-5/6 motion-reduce:animate-none" />
          <Skeleton className="h-4 w-3/5 motion-reduce:animate-none" />
        </CardTitle>
        <div className="flex min-h-9 flex-col items-start justify-end gap-1 sm:min-h-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-4 w-10 motion-reduce:animate-none" />
          <Skeleton className="h-4 w-16 motion-reduce:animate-none" />
        </div>
      </CardHeader>
    </Card>
  );
}
