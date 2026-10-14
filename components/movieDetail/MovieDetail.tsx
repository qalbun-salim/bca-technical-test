import BackToResults from "./BackToResults";
import type { MovieDetails } from "@/app/contracts/movie-details";
import MovieHero from "./MovieHero";
import MovieCast from "./MovieCast";
import MovieFacts from "./MovieFacts";

export default function MovieDetail({ movie, returnTo }: { movie: MovieDetails; returnTo: string }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <BackToResults returnTo={returnTo} />

      <article className="space-y-10">
        <MovieHero movie={movie} />
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <MovieCast credits={movie.credits} />
          <MovieFacts movie={movie} />
        </div>
      </article>
    </main>
  );
}
