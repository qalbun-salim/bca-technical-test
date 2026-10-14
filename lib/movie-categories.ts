export const movieCategoryOptions = [
  { value: "all", label: "All movies" },
  { value: "now_playing", label: "Now playing" },
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top rated" },
  { value: "upcoming", label: "Upcoming" },
] as const;

export type MovieCategory = (typeof movieCategoryOptions)[number]["value"];
export type MovieReleaseCategory = Extract<MovieCategory, "now_playing" | "upcoming">;

export const movieReleaseRegion = { code: "ID", label: "Indonesia" } as const;

export function getMovieCategory(value: string | null): MovieCategory {
  return movieCategoryOptions.find((option) => option.value === value)?.value ?? "all";
}

export function isMovieReleaseCategory(category: MovieCategory): category is MovieReleaseCategory {
  return category === "now_playing" || category === "upcoming";
}
