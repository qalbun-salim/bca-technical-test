export function discoverMoviesQueryKey(query: string) {
  return ["discover-movies", query] as const;
}
