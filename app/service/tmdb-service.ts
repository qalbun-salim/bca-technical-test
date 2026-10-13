import { cacheLife } from "next/cache";
import type { DiscoverMovieResponse } from "@/app/contracts/discover-movie";
import { callApi } from "@/app/server/api-call";
import { Domain } from "@/app/server/routes";

export async function discoverMovies(
  query: string,
): Promise<DiscoverMovieResponse> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  const params = new URLSearchParams(query);
  return callApi<DiscoverMovieResponse>(
    Domain.TMDB,
    `/discover/movie?${params}`,
    { method: "GET" },
  );
}
