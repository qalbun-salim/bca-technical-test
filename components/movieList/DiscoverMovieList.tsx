"use client";

import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import MovieList from "./MovieList";
import { Button } from "../ui/button";
import { useMovieFilters } from "./MovieFiltersProvider";

export default function DiscoverMovieList() {
  const { query } = useMovieFilters();
  const { data, isPending, isError, isFetching, refetch } = useDiscoverMovies(query);

  return (
    <div className="space-y-4" aria-busy={isFetching}>
      {isFetching && <p role="status" className="text-sm text-muted-foreground">Updating movies…</p>}
      {isError && (
        <div role="alert" className="text-sm text-destructive">
          Unable to load movies for these filters.{" "}
          <Button variant="link" disabled={isFetching} onClick={() => void refetch()}>Retry</Button>
        </div>
      )}
      {isPending && <p role="status">Loading movies…</p>}
      {data && <MovieList movies={data.results} />}
    </div>
  );
}
