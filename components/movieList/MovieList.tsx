import type { DiscoverMovie } from "@/app/contracts/discover-movie";
import MovieCardItem from "@/components/movieList/MovieCardItem";

export default function MovieList({
  movies,
}: {
  movies: readonly DiscoverMovie[];
}) {
  if (movies.length === 0) {
    return (
      <p className="rounded-xl border border-dashed bg-muted/50 px-6 py-12 text-center text-sm text-muted-foreground">
        No movies found.
      </p>
    );
  }

  return (
    <ul
      role="list"
      aria-label="Movies"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
    >
      {movies.map((movie) => (
        <li key={movie.id} className="min-w-0">
          <MovieCardItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}
