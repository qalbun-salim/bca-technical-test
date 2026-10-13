import { NextResponse } from "next/server";
import type { DiscoverMovieApiResponse } from "@/app/contracts/discover-movie";
import { discoverMovies } from "@/app/service/tmdb-service";

export async function GET(
  request: Request,
): Promise<NextResponse<DiscoverMovieApiResponse>> {
  const query = new URL(request.url).searchParams.toString();
  try {
    const data = await discoverMovies(query);
    return NextResponse.json<DiscoverMovieApiResponse>(data);
  } catch {
    return NextResponse.json<DiscoverMovieApiResponse>(
      {
        error: {
          code: "UPSTREAM_ERROR",
          message: "Unable to retrieve movies from TMDB.",
        },
      },
      { status: 502 },
    );
  }
}
