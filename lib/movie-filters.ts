import type { MovieCategory } from "./movie-categories";

export interface MovieFilterValues {
  category: MovieCategory;
  genre: string | null;
  releaseYear: string | null;
  minimumRating: string | null;
}

export const emptyMovieFilters: MovieFilterValues = {
  category: "all",
  genre: null,
  releaseYear: null,
  minimumRating: null,
};

export function movieFiltersToQuery(filters: MovieFilterValues): string {
  const params = new URLSearchParams();
  if (filters.category !== "all") params.set("category", filters.category);
  if (filters.genre !== null) params.set("with_genres", filters.genre);
  if (filters.releaseYear !== null) params.set("primary_release_year", filters.releaseYear);
  if (filters.minimumRating !== null) params.set("vote_average.gte", filters.minimumRating);
  return params.toString();
}

export function buildMoviePageQuery(query: string, page: number): string {
  const params = new URLSearchParams(query);
  if (page > 1) params.set("page", String(page));
  else params.delete("page");
  return params.toString();
}

export function releaseYearOptions(currentYear: number) {
  const latestYear = currentYear + 1;
  return [
    { label: "All years", value: null },
    ...Array.from({ length: latestYear - 1900 + 1 }, (_, index) => {
      const year = String(latestYear - index);
      return { label: year, value: year };
    }),
  ];
}

export const minimumRatingOptions = [
  { label: "Any rating", value: null },
  ...Array.from({ length: 10 }, (_, index) => ({
    label: `${index + 1}+`,
    value: String(index + 1),
  })),
];
