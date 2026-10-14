"use client";

import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import MovieList from "./MovieList";
import { Button } from "../ui/button";
import { useMovieFilters } from "./MovieFiltersProvider";
import MoviePagination from "./MoviePagination";
import { isMovieReleaseCategory, movieCategoryOptions, movieReleaseRegion } from "@/lib/movie-categories";

export function MovieListHeading() {
  const { filters } = useMovieFilters();
  const category = movieCategoryOptions.find((option) => option.value === filters.category);

  return (
    <div className="space-y-1">
      <h2 id="movie-list-title" className="text-2xl font-semibold tracking-tight">
        {filters.category === "all" ? "Discover movies" : category?.label}
      </h2>
      {isMovieReleaseCategory(filters.category) && (
        <p className="text-sm text-muted-foreground">Theatrical releases · {movieReleaseRegion.label}</p>
      )}
    </div>
  );
}

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
      <p role="status" className="min-h-5 text-right text-sm text-muted-foreground">
        {isPending ? "Loading movies…" : isFetching ? "Updating movies…" : ""}
      </p>
      {data && (
        <>
          <MovieList movies={data.results} returnTo={query ? `/?${query}` : "/"} />
          <MoviePagination page={data.page} totalPages={data.total_pages} isLoading={isFetching} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}
