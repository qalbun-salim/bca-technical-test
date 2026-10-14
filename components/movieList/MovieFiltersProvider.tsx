"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { movieFiltersToQuery, buildMoviePageQuery, type MovieFilterValues } from "@/lib/movie-filters";
import { maxMoviePages } from "@/lib/movie-pagination";
import { discoverMoviesQueryKey } from "@/lib/discover-movie-query";

type MovieFiltersContextValue = {
  query: string;
  applyFilters: (filters: MovieFilterValues) => void;
  clearFilters: () => void;
  goToPage: (page: number) => void;
};

const MovieFiltersContext = createContext<MovieFiltersContextValue | null>(null);

export function MovieFiltersProvider({ children }: { children: ReactNode }) {
  const [filterQuery, setFilterQuery] = useState("");
  const [page, setPage] = useState(1);
  const query = buildMoviePageQuery(filterQuery, page);
  const queryClient = useQueryClient();

  function applyFilters(filters: MovieFilterValues) {
    const nextQuery = movieFiltersToQuery(filters);
    if (nextQuery === query) {
      void queryClient.invalidateQueries({ queryKey: discoverMoviesQueryKey(query), exact: true });
    } else {
      setFilterQuery(nextQuery);
      setPage(1);
    }
  }

  return (
    <MovieFiltersContext.Provider value={{
      query,
      applyFilters,
      clearFilters: () => {
        setFilterQuery("");
        setPage(1);
      },
      goToPage: (nextPage) => {
        if (Number.isInteger(nextPage) && nextPage >= 1 && nextPage <= maxMoviePages) setPage(nextPage);
      },
    }}>
      {children}
    </MovieFiltersContext.Provider>
  );
}

export function useMovieFilters() {
  const context = useContext(MovieFiltersContext);
  if (!context) throw new Error("useMovieFilters must be used inside MovieFiltersProvider");
  return context;
}
