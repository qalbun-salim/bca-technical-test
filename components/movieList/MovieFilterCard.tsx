"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import FilterInputDropdown from "./FilterInputDropdown";
import { useMovieGenres } from "@/hooks/useMovieGenres";
import { emptyMovieFilters, minimumRatingOptions, releaseYearOptions } from "@/lib/movie-filters";

export default function MovieFilterCard({ currentYear }: { currentYear: number }) {
  const { data: genres = [], isPending, isError, isFetching, refetch } = useMovieGenres();
  const [filters, setFilters] = useState(emptyMovieFilters);

  return (
    <Card className="bg-card p-16 grid grid-cols-[repeat(3,minmax(0,1fr))_auto_auto] grid-rows-[auto_auto] gap-x-4 gap-y-2">
      <FilterInputDropdown
        label="Genre"
        placeholder={isPending ? "Loading genres…" : "All genres"}
        disabled={isPending || genres.length === 0}
        value={filters.genre}
        onValueChange={(genre) => setFilters((previous) => ({ ...previous, genre }))}
        items={[
          { label: "All genres", value: null },
          ...genres.map((genre) => ({ label: genre.name, value: String(genre.id) })),
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
        onValueChange={(releaseYear) => setFilters((previous) => ({ ...previous, releaseYear }))}
      />
      <FilterInputDropdown
        label="Minimum Rating"
        placeholder="Any rating"
        items={minimumRatingOptions}
        value={filters.minimumRating}
        onValueChange={(minimumRating) => setFilters((previous) => ({ ...previous, minimumRating }))}
      />
      <Button className="col-start-4 row-start-1 self-end">Apply Filters</Button>
      <Button className="col-start-5 row-start-1 self-end">Clear All</Button>
    </Card>
  );
}
