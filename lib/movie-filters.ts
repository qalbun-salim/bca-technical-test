export interface MovieFilterValues {
  genre: string | null;
  releaseYear: string | null;
  minimumRating: string | null;
}

export const emptyMovieFilters: MovieFilterValues = {
  genre: null,
  releaseYear: null,
  minimumRating: null,
};

export function movieFiltersToQuery(filters: MovieFilterValues): string {
  const params = new URLSearchParams();
  if (filters.genre !== null) params.set("with_genres", filters.genre);
  if (filters.releaseYear !== null) params.set("primary_release_year", filters.releaseYear);
  if (filters.minimumRating !== null) params.set("vote_average.gte", filters.minimumRating);
  return params.toString();
}

export function releaseYearOptions(currentYear: number) {
  return [
    { label: "All years", value: null },
    ...Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
      const year = String(currentYear - index);
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
