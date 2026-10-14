import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetailSkeleton() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6" role="status" aria-busy="true">
      <span className="sr-only">Loading movie details…</span>
      <div aria-hidden="true" className="space-y-8">
        <Skeleton className="h-5 w-44 motion-reduce:animate-none" />
        <div className="grid gap-6 rounded-xl border p-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8 sm:p-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <Skeleton className="aspect-[2/3] w-40 motion-reduce:animate-none sm:w-full" />
          <div className="space-y-6 self-center">
            <Skeleton className="h-12 w-4/5 motion-reduce:animate-none" />
            <Skeleton className="h-5 w-40 motion-reduce:animate-none" />
            <Skeleton className="h-7 w-3/5 motion-reduce:animate-none" />
            <Skeleton className="h-11 w-36 motion-reduce:animate-none" />
            <div className="space-y-3">{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-4 w-full motion-reduce:animate-none" />)}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-48 motion-reduce:animate-none" />)}</div>
      </div>
    </main>
  );
}
