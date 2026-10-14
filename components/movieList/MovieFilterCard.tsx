"use client";

import { useId, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FieldLegend, FieldSet } from "../ui/field";
import FilterInputDropdown from "./FilterInputDropdown";
import { useMovieGenres } from "@/hooks/useMovieGenres";
import {
  emptyMovieFilters,
  minimumRatingOptions,
  releaseYearOptions,
  movieFiltersToQuery,
  type MovieFilterValues,
} from "@/lib/movie-filters";
import { useMovieFilters } from "./MovieFiltersProvider";
import { movieCategoryOptions } from "@/lib/movie-categories";

export default function MovieFilterCard({
  currentYear,
}: {
  currentYear: number;
}) {
  const { filters } = useMovieFilters();
  return (
    <MovieFilterForm
      key={movieFiltersToQuery(filters)}
      currentYear={currentYear}
      initialFilters={filters}
    />
  );
}

function MovieFilterForm({
  currentYear,
  initialFilters,
}: {
  currentYear: number;
  initialFilters: MovieFilterValues;
}) {
  const {
    data: genres = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useMovieGenres();
  const [filters, setFilters] = useState(initialFilters);
  const categoryGroupId = useId();
  const { applyFilters, clearFilters } = useMovieFilters();

  return (
    <Card className="bg-card p-4 sm:p-6">
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          applyFilters(filters);
        }}
      >
        <FieldSet>
          <FieldLegend variant="label">Category</FieldLegend>
          <div className="flex flex-wrap gap-2">
            {movieCategoryOptions.map((category) => (
              <label
                key={category.value}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm has-checked:border-primary has-checked:bg-primary/10 focus-within:ring-2 focus-within:ring-ring"
              >
                <input
                  type="radio"
                  name={categoryGroupId}
                  value={category.value}
                  checked={filters.category === category.value}
                  onChange={() => setFilters((previous) => ({ ...previous, category: category.value }))}
                  className="size-4 accent-primary"
                />
                {category.label}
              </label>
            ))}
          </div>
        </FieldSet>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3 xl:grid-cols-[repeat(3,minmax(0,1fr))_auto_auto]">
          <FilterInputDropdown
            label="Genre"
            placeholder={isPending ? "Loading genres…" : "All genres"}
            disabled={isPending || genres.length === 0}
            value={filters.genre}
            onValueChange={(genre) =>
              setFilters((previous) => ({ ...previous, genre }))
            }
            items={[
              { label: "All genres", value: null },
              ...genres.map((genre) => ({
                label: genre.name,
                value: String(genre.id),
              })),
            ]}
            errorMessage={isError ? "Unable to load genres." : undefined}
            onRetry={() => void refetch()}
            retryLoading={isFetching}
          />
          <FilterInputDropdown
            label="Release Year"
            placeholder="All years"
            items={releaseYearOptions(currentYear)}
            value={filters.releaseYear}
            onValueChange={(releaseYear) =>
              setFilters((previous) => ({ ...previous, releaseYear }))
            }
          />
          <FilterInputDropdown
            label="Minimum Rating"
            placeholder="Any rating"
            items={minimumRatingOptions}
            value={filters.minimumRating}
            onValueChange={(minimumRating) =>
              setFilters((previous) => ({ ...previous, minimumRating }))
            }
          />
          <div className="flex flex-wrap gap-2 pt-2 sm:col-span-3 xl:col-span-2 xl:col-start-4 xl:row-start-1 xl:self-end xl:pt-0">
            <Button type="submit">Apply filters</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (movieFiltersToQuery(initialFilters) === "")
                  setFilters(emptyMovieFilters);
                clearFilters();
              }}
            >
              Clear all
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
