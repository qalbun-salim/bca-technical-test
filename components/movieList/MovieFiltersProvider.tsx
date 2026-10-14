"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { movieFiltersToQuery, type MovieFilterValues } from "@/lib/movie-filters";
import { discoverMoviesQueryKey } from "@/lib/discover-movie-query";

type MovieFiltersContextValue = {
  query: string;
  applyFilters: (filters: MovieFilterValues) => void;
  clearFilters: () => void;
};

const MovieFiltersContext = createContext<MovieFiltersContextValue | null>(null);

export function MovieFiltersProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();

  function applyFilters(filters: MovieFilterValues) {
    const nextQuery = movieFiltersToQuery(filters);
    if (nextQuery === query) {
      void queryClient.invalidateQueries({ queryKey: discoverMoviesQueryKey(query), exact: true });
    } else {
      setQuery(nextQuery);
    }
  }

  return (
    <MovieFiltersContext.Provider value={{
      query,
      applyFilters,
      clearFilters: () => {
        setQuery("");
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
