import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import { getInitialMovieQueryState } from "@/app/service/discover-movie-hydration";
import { getBrowseState } from "@/lib/browse-context";
import DiscoverMovieList from "@/components/movieList/DiscoverMovieList";
import MovieFilterCard from "@/components/movieList/MovieFilterCard";
import { MovieFiltersProvider } from "@/components/movieList/MovieFiltersProvider";

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
      <MovieFilterCard currentYear={currentYear} />
      <section aria-labelledby="movie-list-title" className="space-y-4">
        <h1 id="movie-list-title" className="text-2xl font-semibold tracking-tight">
          Discover movies
        </h1>
        <Suspense fallback={<p role="status">Loading movies…</p>}>
          <InitialMovies query={query} />
        </Suspense>
      </section>
    </MovieFiltersProvider>
  );
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <Suspense fallback={<p role="status">Loading browse results…</p>}>
        <BrowseMovies searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
