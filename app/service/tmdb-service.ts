import { cacheLife } from "next/cache";
import type { MovieDetails } from "@/app/contracts/movie-details";
import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";
import type { MovieGenresResponse } from "@/app/contracts/movie-genres";
import { ApiError, callApi } from "@/app/server/api-call";
import { Domain } from "@/app/server/routes";

export async function getMovieGenres(): Promise<MovieGenresResponse> {
  "use cache";
  cacheLife("days");
  return callApi<MovieGenresResponse>(Domain.TMDB, "/genre/movie/list", {
    method: "GET",
    params: { language: "en" },
  });
}

export async function discoverMovies(
  query: string,
): Promise<DiscoverMovieResponse> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  const params = new URLSearchParams(query);
  return callApi<DiscoverMovieResponse>(
    Domain.TMDB,
    `/discover/movie?${params}`,
    { method: "GET" },
  );
}

export async function searchMovies(
  query: string,
  page: number = 1,
): Promise<DiscoverMovieResponse> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  return callApi<DiscoverMovieResponse>(Domain.TMDB, "/search/movie", {
    method: "GET",
    params: { query, page, language: "en-US" },
  });
}

export async function getMovieDetails(movieId: string): Promise<MovieDetails | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  try {
    return await callApi<MovieDetails>(Domain.TMDB, `/movie/${encodeURIComponent(movieId)}`, {
      method: "GET",
      params: { language: "en-US", append_to_response: "credits" },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
