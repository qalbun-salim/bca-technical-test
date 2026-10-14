import { NextResponse } from "next/server";
import type { MovieGenresResponse, MovieGenresErrorResponse } from "@/app/contracts/movie-genres";
import { getMovieGenres } from "@/app/service/tmdb-service";

export async function GET(): Promise<NextResponse<MovieGenresResponse | MovieGenresErrorResponse>> {
  try {
    return NextResponse.json(await getMovieGenres());
  } catch {
    return NextResponse.json<MovieGenresErrorResponse>(
      {
        error: {
          code: "UPSTREAM_ERROR",
          message: "Unable to retrieve movie genres from TMDB.",
        },
      },
      { status: 502 },
    );
  }
}
