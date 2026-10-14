import { Suspense } from "react";
import { io } from "next/cache";
import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";
import { discoverMovies } from "@/app/service/tmdb-service";
import DiscoverMovieList from "@/components/movieList/DiscoverMovieList";
import MovieFilterCard from "@/components/movieList/MovieFilterCard";

async function InitialMovies() {
  await io();
  let initialData: DiscoverMovieResponse;
  try {
    initialData = await discoverMovies("");
  } catch {
    return (
      <p role="alert" className="rounded-xl border border-destructive/30 px-6 py-12 text-center text-sm text-destructive">
        Unable to load movies. Please try refreshing the page.
      </p>
    );
  }

  return <DiscoverMovieList initialData={initialData} />;
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <MovieFilterCard />
      <section aria-labelledby="movie-list-title" className="space-y-4">
        <h1 id="movie-list-title" className="text-2xl font-semibold tracking-tight">
          Discover movies
        </h1>
        <Suspense fallback={
          <p role="status" className="rounded-xl border px-6 py-12 text-center text-sm text-muted-foreground">
            Loading movies…
          </p>
        }>
          <InitialMovies />
        </Suspense>
      </section>
    </main>
  );
}
