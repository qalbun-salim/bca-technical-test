import Image from "next/image";
import { Film, Star } from "lucide-react";
import type { MovieDetails } from "@/app/contracts/movie-details";
import { Card } from "@/components/ui/card";

// Format util
function formatRuntime(totalMinutes: number | null) {
  if (!totalMinutes || totalMinutes <= 0) return null;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
}

export default function MovieHero({ movie }: { movie: MovieDetails }) {
  const directors = [
    ...new Set(
      movie.credits?.crew
        .filter((person) => person.job === "Director")
        .map((person) => person.name),
    ),
  ];
  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);

  return (
    <Card className="relative isolate overflow-hidden p-6 sm:p-8">
      {movie.backdrop_path && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt=""
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover opacity-15"
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-r from-card via-card/90 to-card/60" />
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="relative aspect-[2/3] w-40 overflow-hidden rounded-lg border bg-muted shadow-sm sm:w-full">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
              fill
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
              className="object-cover"
              loading="eager"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-sm text-muted-foreground">
              <Film className="size-10" aria-hidden="true" />
              Poster unavailable
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-6 self-center">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {movie.title}
            </h1>
            <ul
              aria-label="Movie facts"
              className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"
            >
              {year && <li>{year}</li>}
              {runtime && <li>{runtime}</li>}
              {movie.status && <li>{movie.status}</li>}
            </ul>
            {movie.genres.length > 0 && (
              <ul aria-label="Genres" className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="rounded-md border bg-background/80 px-2.5 py-1 text-xs font-medium"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Star className="size-5 fill-current" aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-semibold tabular-nums">
                {movie.vote_count > 0 ? (
                  <>
                    {movie.vote_average.toFixed(1)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      / 10
                    </span>
                  </>
                ) : (
                  "Not rated"
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {movie.vote_count > 0
                  ? `${movie.vote_count.toLocaleString("en-US")} TMDB votes`
                  : "No TMDB votes yet"}
              </p>
            </div>
          </div>

          {movie.tagline && (
            <p className="text-base text-muted-foreground italic">
              {movie.tagline}
            </p>
          )}
          <section aria-labelledby="overview-title" className="space-y-2">
            <h2 id="overview-title" className="text-lg font-semibold">
              Overview
            </h2>
            <p className="max-w-prose text-sm leading-7">
              {movie.overview || "No synopsis available yet."}
            </p>
          </section>
          {directors.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {directors.length === 1 ? "Director" : "Directors"}
              </p>
              <p className="text-sm font-medium">{directors.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
