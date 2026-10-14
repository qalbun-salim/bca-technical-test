import type { DiscoverMovie } from "@/app/contracts/discover-movie";
import MovieList from "@/components/movieList/MovieList";
import MovieFilterCard from "@/components/movieList/MovieFilterCard";

const mockMovie: DiscoverMovie = {
  id: 157336,
  title: "Interstellar",
  original_title: "Interstellar",
  original_language: "en",
  overview:
    "A team of explorers travels beyond our galaxy to discover whether mankind has a future among the stars.",
  poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  backdrop_path: null,
  release_date: "2014-11-05",
  genre_ids: [12, 18, 878],
  vote_average: 8.4,
  vote_count: 1000,
  popularity: 100,
  adult: false,
  video: false,
};

const mockMovies: DiscoverMovie[] = [
  mockMovie,
  {
    ...mockMovie,
    id: 2,
    title: "The Last Signal",
    original_title: "The Last Signal",
    overview: "",
    poster_path: null,
    release_date: "2024-04-12",
    vote_average: 7.6,
  },
  {
    ...mockMovie,
    id: 3,
    title: "Beyond Tomorrow",
    original_title: "Beyond Tomorrow",
    overview: "",
    poster_path: null,
    release_date: "",
    vote_average: 0,
    vote_count: 0,
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <MovieFilterCard />
      <section aria-labelledby="movie-preview-title" className="space-y-4">
        <div>
          <h1 id="movie-preview-title" className="text-2xl font-semibold tracking-tight">
            Movie list preview
          </h1>
          <p className="text-sm text-muted-foreground">Mock movie data</p>
        </div>
        <MovieList movies={mockMovies} />
      </section>
    </main>
  );
}
