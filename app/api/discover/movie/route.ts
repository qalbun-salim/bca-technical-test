import { cacheLife } from "next/cache";
import { NextResponse } from "next/server";
import type {
  DiscoverMovieApiResponse,
  DiscoverMovieResponse,
} from "@/app/contracts/discover-movie";
import { callApi } from "@/app/server/api-call";
import { Domain } from "@/app/server/routes";

async function discoverMovies(query: string): Promise<DiscoverMovieResponse> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  const params = new URLSearchParams(query);
  return callApi<DiscoverMovieResponse>(
    Domain.TMDB,
    `/discover/movie?${params}`,
    { method: "GET" },
  );
}

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
