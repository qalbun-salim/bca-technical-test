import { notFound } from "next/navigation";
import { getMovieDetails } from "@/app/service/tmdb-service";
import MovieDetail from "@/components/movieDetail/MovieDetail";

type Props = {
  params: Promise<{ movieId: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

export default async function MoviePage({ params, searchParams }: Props) {
  const { movieId } = await params;
  const { from } = await searchParams;
  const returnTo = typeof from === "string" ? from : "/";
  const movie = await getMovieDetails(movieId);
  if (!movie) notFound();

  return <MovieDetail movie={movie} returnTo={returnTo} />;
}
