import BackToResults from "./BackToResults";
import type { MovieDetails } from "@/app/contracts/movie-details";

export default function MovieDetail({ movie, returnTo }: { movie: MovieDetails; returnTo: string }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <BackToResults returnTo={returnTo} />
      <article>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">{movie.title}</h1>
      </article>
    </main>
  );
}
