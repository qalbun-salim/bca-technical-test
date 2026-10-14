"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { MovieGenresResponse } from "@/app/contracts/movie-genres";

export function useMovieGenres() {
  return useQuery({
    queryKey: ["movie-genres", "en"],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<MovieGenresResponse>("/api/genre/movie", {
        signal,
      });
      return data.genres;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
}
