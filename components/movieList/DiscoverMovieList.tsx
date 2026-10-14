"use client";

import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import MovieList from "./MovieList";
import { Button } from "../ui/button";
import { useMovieFilters } from "./MovieFiltersProvider";
import MoviePagination from "./MoviePagination";

export default function DiscoverMovieList() {
  const { query, goToPage } = useMovieFilters();
  const { data, isPending, isError, isFetching, refetch } = useDiscoverMovies(query);

  return (
    <div className="space-y-4" aria-busy={isFetching}>
      {isError && (
        <div role="alert" className="text-sm text-destructive">
          Unable to load movies for these filters.{" "}
          <Button variant="link" disabled={isFetching} onClick={() => void refetch()}>Retry</Button>
        </div>
      )}
      {isPending && <p role="status">Loading movies…</p>}
      {data && (
        <>
          <MovieList movies={data.results} />
          <MoviePagination page={data.page} totalPages={data.total_pages} isLoading={isFetching} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}
