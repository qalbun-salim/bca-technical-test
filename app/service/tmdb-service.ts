import { cacheLife } from "next/cache";
import { format, isAfter, isValid, parse } from "date-fns";
import type { MovieDetails } from "@/app/contracts/movie-details";
import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";
import type { MovieGenresResponse } from "@/app/contracts/movie-genres";
import { ApiError, callApi } from "@/app/server/api-call";
import { Domain } from "@/app/server/routes";
import {
  getMovieCategory,
  isMovieReleaseCategory,
  movieReleaseRegion,
  type MovieReleaseCategory,
} from "@/lib/movie-categories";
import {
  buildDiscoverMovieParams,
  type MovieReleaseWindow,
} from "./discover-movie-params";

async function getMovieReleaseWindow(category: MovieReleaseCategory): Promise<MovieReleaseWindow> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 7200 });

  // Reuse TMDB's current date window instead of guessing how long a theatrical run lasts.
  const { dates } = await callApi<{ dates: MovieReleaseWindow }>(
    Domain.TMDB,
    `/movie/${category}`,
    { method: "GET", params: { language: "en-US", page: 1, region: movieReleaseRegion.code } },
  );

  if (!dates) {
    throw new Error("Invalid TMDB movie release window");
  }

  const minimum = parse(dates.minimum, "yyyy-MM-dd", new Date(0));
  const maximum = parse(dates.maximum, "yyyy-MM-dd", new Date(0));

  if (!isValid(minimum) || !isValid(maximum) || isAfter(minimum, maximum)) {
    throw new Error("Invalid TMDB movie release window");
  }

  return {
    minimum: format(minimum, "yyyy-MM-dd"),
    maximum: format(maximum, "yyyy-MM-dd"),
  };
}

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
  const category = getMovieCategory(new URLSearchParams(query).get("category"));
  const releaseWindow = isMovieReleaseCategory(category)
    ? await getMovieReleaseWindow(category)
    : undefined;
  const params = buildDiscoverMovieParams(query, category, releaseWindow);
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
