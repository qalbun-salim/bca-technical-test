import Image from "next/image";
import { UserRound } from "lucide-react";
import type { MovieDetails } from "@/app/contracts/movie-details";

export default function MovieCast({
  credits,
}: {
  credits: MovieDetails["credits"];
}) {
  const cast = credits?.cast.slice(0, 6) ?? [];

  return (
    <section aria-labelledby="cast-title" className="min-w-0 space-y-4">
      <h2 id="cast-title" className="text-xl font-semibold tracking-tight">
        Top cast
      </h2>
      {cast.length ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cast.map((person) => (
            <li
              key={person.credit_id}
              className="overflow-hidden rounded-xl border bg-card"
            >
              <div className="relative aspect-[4/3] bg-muted">
                {person.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                    className="object-cover object-[center_25%]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <UserRound className="size-10" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="space-y-1 p-3">
                <p className="text-sm font-medium">{person.name}</p>
                {person.character && (
                  <p className="text-xs text-muted-foreground">
                    {person.character}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          Cast information is unavailable.
        </p>
      )}
    </section>
  );
}
