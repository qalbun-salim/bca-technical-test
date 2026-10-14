import "server-only";

import { cacheLife } from "next/cache";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { discoverMoviesQueryKey } from "@/lib/discover-movie-query";
import { discoverMovies } from "./tmdb-service";

export async function getInitialMovieQueryState(query: string = "") {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });

  // Cache the prefetched data and its hydration timestamps as one snapshot.
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: discoverMoviesQueryKey(query),
    queryFn: () => discoverMovies(query),
    retry: false,
  });

  return dehydrate(queryClient);
}
