"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import FilterInputDropdown from "./FilterInputDropdown";
import { useMovieGenres } from "@/hooks/useMovieGenres";

export default function MovieFilterCard() {
  const { data: genres = [], isPending, isError, isFetching, refetch } = useMovieGenres();

  return (
    <Card className="bg-card p-16 grid grid-cols-[repeat(3,minmax(0,1fr))_auto_auto] grid-rows-[auto_auto] gap-x-4 gap-y-2">
      <FilterInputDropdown
        label="Genre"
        placeholder={isPending ? "Loading genres…" : "All genres"}
        disabled={isPending || genres.length === 0}
        items={[
          { label: "All genres", value: null },
          ...genres.map((genre) => ({ label: genre.name, value: String(genre.id) })),
        ]}
        errorMessage={isError ? "Unable to load genres." : undefined}
        onRetry={() => void refetch()}
        retryLoading={isFetching}
      />
      <FilterInputDropdown label="Release Year" />
      <FilterInputDropdown label="Minimum Rating" />
      <Button className="col-start-4 row-start-1 self-end">Apply Filters</Button>
      <Button className="col-start-5 row-start-1 self-end">Clear All</Button>
    </Card>
  );
}
