import {
  isMovieReleaseCategory,
  movieReleaseRegion,
  type MovieCategory,
} from "@/lib/movie-categories";

export interface MovieReleaseWindow {
  minimum: string;
  maximum: string;
}

export function buildDiscoverMovieParams(
  query: string,
  category: MovieCategory,
  releaseWindow?: MovieReleaseWindow,
) {
  const params = new URLSearchParams(query);
  // Category is an app parameter, not a TMDB query parameter.
  params.delete("category");

  if (category === "all") return params;

  params.set("sort_by", "popularity.desc");

  if (category === "top_rated") {
    // Match TMDB's documented Top Rated preset, including its eligibility rules.
    params.set("sort_by", "vote_average.desc");
    params.set("vote_count.gte", "200");
    params.set("without_genres", "99,10755");
  }

  if (isMovieReleaseCategory(category)) {
    if (!releaseWindow) throw new Error("Missing movie release window");
    params.set("region", movieReleaseRegion.code);
    params.set("with_release_type", "2|3");
    params.set("release_date.gte", releaseWindow.minimum);
    params.set("release_date.lte", releaseWindow.maximum);
  }

  return params;
}
