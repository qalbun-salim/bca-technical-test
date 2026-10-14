"use client";

import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";
import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import MovieList from "./MovieList";

export default function DiscoverMovieList({
  initialData,
}: {
  initialData: DiscoverMovieResponse;
}) {
  const { data = initialData } = useDiscoverMovies("", initialData);
  return <MovieList movies={data.results} />;
}
