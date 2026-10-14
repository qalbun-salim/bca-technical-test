import { cacheLife } from "next/cache";
import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import { getInitialMovieQueryState } from "@/app/service/discover-movie-hydration";
import DiscoverMovieList from "@/components/movieList/DiscoverMovieList";
import MovieFilterCard from "@/components/movieList/MovieFilterCard";
import { MovieFiltersProvider } from "@/components/movieList/MovieFiltersProvider";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getUTCFullYear();
}

async function InitialMovies() {
  let state: DehydratedState;
  try {
    state = await getInitialMovieQueryState();
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

export default async function Home() {
  const [currentYear, initialMovies] = await Promise.all([
    getCurrentYear(),
    InitialMovies(),
  ]);
  return (
    <MovieFiltersProvider>
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <MovieFilterCard currentYear={currentYear} />
      <section aria-labelledby="movie-list-title" className="space-y-4">
        <h1 id="movie-list-title" className="text-2xl font-semibold tracking-tight">
          Discover movies
        </h1>
        {initialMovies}
      </section>
    </main>
    </MovieFiltersProvider>
  );
}
