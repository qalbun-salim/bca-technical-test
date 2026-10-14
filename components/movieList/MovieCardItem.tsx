import Image from "next/image";
import { Film, Star } from "lucide-react";
import type { DiscoverMovie } from "@/app/contracts/discover-movie";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MovieCardItem({ movie }: { movie: DiscoverMovie }) {
  const releaseYear = movie.release_date?.slice(0, 4);
  const hasRating = movie.vote_count > 0;

  return (
    <article className="min-w-0">
      <Card className="gap-0 py-0 shadow-sm">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-muted-foreground">
              <Film className="size-10" aria-hidden="true" />
              <span className="text-sm">Poster unavailable</span>
            </div>
          )}
        </div>

        <CardHeader className="gap-2 p-3">
          <CardTitle>
            <h3 className="line-clamp-2 min-h-[2lh]">{movie.title}</h3>
          </CardTitle>
          <div className="flex min-h-9 flex-col items-start justify-end gap-1 sm:min-h-4 sm:flex-row sm:items-center sm:justify-between">
            <CardDescription className="w-full truncate text-xs sm:w-auto">
              {releaseYear || "Release date unavailable"}
            </CardDescription>
            {hasRating ? (
              <span
                className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium tabular-nums"
                aria-label={`Rating ${movie.vote_average.toFixed(1)} out of 10`}
              >
                <Star
                  className="size-3.5 fill-primary/15 text-primary"
                  aria-hidden="true"
                />
                {movie.vote_average.toFixed(1)}
                <span className="font-normal text-muted-foreground">/ 10</span>
              </span>
            ) : (
              <span className="whitespace-nowrap text-xs text-muted-foreground">Not rated</span>
            )}
          </div>
        </CardHeader>
      </Card>
    </article>
  );
}
