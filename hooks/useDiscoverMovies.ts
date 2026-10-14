"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";

export function useDiscoverMovies(query: string, initialData?: DiscoverMovieResponse) {
  return useQuery({
    queryKey: ["discover-movies", query],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<DiscoverMovieResponse>(
        `/api/discover/movie${query ? `?${query}` : ""}`,
        { signal },
      );
      return data;
    },
    initialData,
    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
