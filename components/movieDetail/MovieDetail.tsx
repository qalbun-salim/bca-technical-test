import BackToResults from "./BackToResults";
import type { MovieDetails } from "@/app/contracts/movie-details";
import MovieHero from "./MovieHero";
import MovieCast from "./MovieCast";

export default function MovieDetail({ movie, returnTo }: { movie: MovieDetails; returnTo: string }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <BackToResults returnTo={returnTo} />

      <article className="space-y-10">
        <MovieHero movie={movie} />
        <MovieCast credits={movie.credits} />
      </article>
    </main>
  );
}
