"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { movieFiltersToQuery, buildMoviePageQuery, type MovieFilterValues } from "@/lib/movie-filters";
import { browseHref, getBrowseState } from "@/lib/browse-context";
import { maxMoviePages } from "@/lib/movie-pagination";
import { discoverMoviesQueryKey } from "@/lib/discover-movie-query";

type MovieFiltersContextValue = {
  query: string;
  filters: MovieFilterValues;
  applyFilters: (filters: MovieFilterValues) => void;
  clearFilters: () => void;
  goToPage: (page: number) => void;
};

const MovieFiltersContext = createContext<MovieFiltersContextValue | null>(null);

export function MovieFiltersProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const { query, filters, sort } = getBrowseState(searchParams);
  const queryClient = useQueryClient();

  function navigate(nextQuery: string) {
    if (nextQuery === query) {
      void queryClient.invalidateQueries({ queryKey: discoverMoviesQueryKey(query), exact: true });
    } else {
      // Next.js synchronizes native history with useSearchParams without a server navigation.
      window.history.pushState(null, "", browseHref(nextQuery));
    }
  }

  function applyFilters(nextFilters: MovieFilterValues) {
    const params = new URLSearchParams(movieFiltersToQuery(nextFilters));
    if (sort) params.set("sort_by", sort);
    navigate(params.toString());
  }

  return (
    <MovieFiltersContext.Provider value={{
      query,
      filters,
      applyFilters,
      clearFilters: () => navigate(sort ? new URLSearchParams({ sort_by: sort }).toString() : ""),
      goToPage: (nextPage) => {
        if (Number.isInteger(nextPage) && nextPage >= 1 && nextPage <= maxMoviePages) {
          navigate(buildMoviePageQuery(query, nextPage));
        }
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
