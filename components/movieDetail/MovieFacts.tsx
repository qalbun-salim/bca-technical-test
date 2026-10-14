import type { MovieDetails } from "@/app/contracts/movie-details";

export default function MovieFacts({ movie }: { movie: MovieDetails }) {
  const releaseDate = movie.release_date
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${movie.release_date}T00:00:00Z`))
    : "Not announced";

  return (
    <section
      aria-labelledby="details-title"
      className="space-y-4 rounded-xl border bg-card p-5"
    >
      <h2 id="details-title" className="text-lg font-semibold">
        Movie details
      </h2>
      <dl className="space-y-5 text-sm">
        <div className="space-y-1">
          <dt className="text-muted-foreground">Original title</dt>
          <dd className="break-words font-medium">
            {movie.original_title || movie.title}
          </dd>
        </div>
        <div className="space-y-1">
          <dt className="text-muted-foreground">Release date</dt>
          <dd className="font-medium">{releaseDate}</dd>
        </div>
        <div className="space-y-1">
          <dt className="text-muted-foreground">Spoken languages</dt>
          <dd className="font-medium">
            {movie.spoken_languages
              .map((language) => language.english_name)
              .join(", ") || "Not available"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
