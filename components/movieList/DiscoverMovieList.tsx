"use client";

import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import MovieList from "./MovieList";

export default function DiscoverMovieList() {
  const { data } = useDiscoverMovies("");
  return data ? <MovieList movies={data.results} /> : null;
}
