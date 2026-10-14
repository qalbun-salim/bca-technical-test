import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import { getInitialMovieQueryState } from "@/app/service/discover-movie-hydration";
import { getBrowseState } from "@/lib/browse-context";
import DiscoverMovieList, { MovieListHeading } from "@/components/movieList/DiscoverMovieList";
import MovieFilterCard from "@/components/movieList/MovieFilterCard";
import MovieCardSkeleton from "@/components/movieList/MovieCardSkeleton";
import { MovieFiltersProvider } from "@/components/movieList/MovieFiltersProvider";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getUTCFullYear();
}

async function InitialMovies({ query }: { query: string }) {
  let state: DehydratedState;
  try {
    state = await getInitialMovieQueryState(query);
  } catch {
    return (
      <p role="alert" className="rounded-xl border border-destructive/30 px-6 py-12 text-center text-sm text-destructive">
        Unable to load movies. Please try refreshing the page.
      </p>
    );
  }

  return (
    <HydrationBoundary state={state}>
      <DiscoverMovieList />
    </HydrationBoundary>
  );
}

async function BrowseMovies({ searchParams }: { searchParams: SearchParams }) {
  const rawParams = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(rawParams)) {
    if (typeof value === "string") params.set(key, value);
  }
  const { query } = getBrowseState(params);
  const currentYear = await getCurrentYear();

  return (
    <MovieFiltersProvider>
      <section aria-labelledby="movie-list-title" className="space-y-4">
        <h1 className="text-2xl text-center font-semibold tracking-tight">
          MoviesDB
        </h1>
        <p className="text-center text-muted-foreground">
          Browse your favourite movies!
        </p>
      </section>
      <MovieFilterCard currentYear={currentYear} />
      <section aria-labelledby="movie-list-title" className="space-y-4">
        <MovieListHeading />
        <Suspense fallback={<MoviesSkeleton />}>
          <InitialMovies query={query} />
        </Suspense>
      </section>
    </MovieFiltersProvider>
  );
}

function MoviesSkeleton() {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading movies…</span>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 20 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function BrowseSkeleton() {
  return (
    <div className="space-y-8">
      <Card aria-hidden="true" className="bg-card p-4 sm:p-6">
        <div className="space-y-3">
          <Skeleton className="h-5 w-20 motion-reduce:animate-none" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-10 w-28 motion-reduce:animate-none" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-5 w-24 motion-reduce:animate-none" />
              <Skeleton className="h-9 w-full max-w-48 motion-reduce:animate-none" />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-28 motion-reduce:animate-none" />
          <Skeleton className="h-8 w-20 motion-reduce:animate-none" />
        </div>
      </Card>
      <section aria-labelledby="movie-list-loading-title" className="space-y-4">
        <h1 id="movie-list-loading-title" className="text-2xl font-semibold tracking-tight">
          Discover movies
        </h1>
        <MoviesSkeleton />
      </section>
    </div>
  );
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <Suspense fallback={<BrowseSkeleton />}>
        <BrowseMovies searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
