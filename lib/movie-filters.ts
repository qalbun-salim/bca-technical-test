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
