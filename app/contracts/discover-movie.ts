import type { MovieCategory } from "@/lib/movie-categories";

export const movieSortOptions = [
  "popularity.desc",
  "vote_average.desc",
  "primary_release_date.desc",
  "primary_release_date.asc",
] as const;

export type MovieSortBy = (typeof movieSortOptions)[number];

export interface DiscoverMovieQuery {
  category?: MovieCategory;
  page?: number;
  language?: string;
  sort_by?: MovieSortBy;
  with_genres?: string;
  primary_release_year?: number;
  "vote_average.gte"?: number;
}

export interface DiscoverMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DiscoverMovieResponse {
  page: number;
  results: DiscoverMovie[];
  total_pages: number;
  total_results: number;
}

export interface DiscoverMovieErrorResponse {
  error: {
    code: "INVALID_QUERY" | "SERVER_CONFIGURATION_ERROR" | "UPSTREAM_ERROR";
    message: string;
  };
}

export type DiscoverMovieApiResponse =
  | DiscoverMovieResponse
  | DiscoverMovieErrorResponse;
