"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";
import { discoverMoviesQueryKey } from "@/lib/discover-movie-query";

export function useDiscoverMovies(query: string) {
  return useQuery({
    queryKey: discoverMoviesQueryKey(query),
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<DiscoverMovieResponse>(
        `/api/discover/movie${query ? `?${query}` : ""}`,
        { signal },
      );
      return data;
    },
    // SSR reads the hydrated cache; relative API requests run in the browser.
    enabled: typeof window !== "undefined",
    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
